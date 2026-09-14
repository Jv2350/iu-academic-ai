import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLlmProvider } from "@/lib/ai/provider";
import { classifyIntent } from "@/lib/ai/intent";
import { ACADEMIC_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { getDemoAcademicContext } from "@/lib/academic/demo-data";
import { formatKnowledgeContext, searchKnowledge } from "@/lib/knowledge";
import type { SourceCitation } from "@/lib/rag/types";

const UNAVAILABLE =
  "I couldn't find reliable information about that in the available academic data.";

const UNSUPPORTED =
  "I'm designed primarily to assist with academic information. I don't have reliable information for that request.";

export async function POST(request: Request) {
  let body: unknown;

  // ---------------------------------------------------------
  // 1. Parse request body
  // ---------------------------------------------------------
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const typedBody = body as {
    message?: unknown;
    sessionId?: unknown;
    context?: unknown;
  };

  const message = typedBody.message;
  const requestedSessionId = typedBody.sessionId;
  const requestContext = typedBody.context;

  // ---------------------------------------------------------
  // 2. Validate message
  // ---------------------------------------------------------
  if (
    typeof message !== "string" ||
    message.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "Please enter a question." },
      { status: 400 },
    );
  }

  if (message.length > 2000) {
    return NextResponse.json(
      {
        error:
          "Message must be under 2000 characters.",
      },
      { status: 400 },
    );
  }

  // ---------------------------------------------------------
  // 3. Validate optional page context
  // ---------------------------------------------------------
  if (
    requestContext !== undefined &&
    (
      typeof requestContext !== "string" ||
      requestContext.length > 5000
    )
  ) {
    return NextResponse.json(
      { error: "Invalid page context." },
      { status: 400 },
    );
  }

  try {
    // -------------------------------------------------------
    // 4. Authenticate user
    // -------------------------------------------------------
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    // -------------------------------------------------------
    // 5. Classify user intent
    // -------------------------------------------------------
    const intent = classifyIntent(message.trim());

    // Reject unrelated questions before calling the LLM.
    if (intent === "unsupported") {
      return NextResponse.json({
        message: UNSUPPORTED,
        intent,
        sources: [],
      });
    }

    // -------------------------------------------------------
    // 6. Retrieve student-specific academic information
    // -------------------------------------------------------
    const studentContext = getDemoAcademicContext(
      intent,
      user.id,
    );

    // -------------------------------------------------------
    // 7. Search academic knowledge base
    // -------------------------------------------------------
    const knowledgeChunks = await searchKnowledge(
      message.trim(),
    );

    const knowledgeContext =
      formatKnowledgeContext(knowledgeChunks);

    // -------------------------------------------------------
    // 8. Build source citations
    // -------------------------------------------------------
    const sources: SourceCitation[] = [
      ...studentContext.sources,

      ...knowledgeChunks.map((chunk) => ({
        title: chunk.title,
        section: chunk.section,
        href: chunk.href,
        type: "academic_document" as const,
      })),
    ];

    // -------------------------------------------------------
    // 9. Build retrieved context
    // -------------------------------------------------------
    const retrievedContext = [
      studentContext.text,
      knowledgeContext,
    ]
      .filter(Boolean)
      .join("\n\n");

    // If there is no reliable academic information,
    // do not ask the LLM to guess.
    if (!retrievedContext.trim()) {
      return NextResponse.json({
        message: UNAVAILABLE,
        intent,
        sources: [],
      });
    }

    // -------------------------------------------------------
    // 10. Get Gemini provider
    // -------------------------------------------------------
    const provider = getLlmProvider();

    // -------------------------------------------------------
    // 11. Build page context
    // -------------------------------------------------------
    const pageContext =
      typeof requestContext === "string"
        ? requestContext
        : "None provided";

    // -------------------------------------------------------
    // 12. Send request to Gemini
    // -------------------------------------------------------
    const answer = await provider.generateText({
      messages: [
        {
          role: "system",
          content: `${ACADEMIC_ASSISTANT_SYSTEM_PROMPT}

Detected intent:
${intent}

Retrieved academic context:
${retrievedContext}

Current page context:
${pageContext}`,
        },

        {
          role: "user",
          content: message.trim(),
        },
      ],
    });

    // -------------------------------------------------------
    // 13. Save conversation
    // -------------------------------------------------------
    let sessionId: string | undefined =
      typeof requestedSessionId === "string"
        ? requestedSessionId
        : undefined;

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (student) {
      // Create a new chat session if necessary.
      if (!sessionId) {
        const { data: session } = await supabase
          .from("chat_sessions")
          .insert({
            student_id: student.id,
            title: message.trim().slice(0, 60),
          })
          .select("id")
          .single();

        sessionId = session?.id;
      }

      // Save user + assistant messages.
      if (sessionId) {
        await supabase
          .from("chat_messages")
          .insert([
            {
              session_id: sessionId,
              role: "user",
              content: message.trim(),
            },
            {
              session_id: sessionId,
              role: "assistant",
              content: answer,
            },
          ]);
      }
    }

    // -------------------------------------------------------
    // 14. Return response
    // -------------------------------------------------------
    return NextResponse.json({
      message: answer,
      intent,
      sources,

      ...(sessionId
        ? { sessionId }
        : {}),
    });
  } catch (error) {
    // -------------------------------------------------------
    // 15. Server-side error handling
    // -------------------------------------------------------
    console.error(
      "Chat request failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "I'm having trouble connecting to the academic AI service. Please try again.",
      },
      { status: 503 },
    );
  }
}
