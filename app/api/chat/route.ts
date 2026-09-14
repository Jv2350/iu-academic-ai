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
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const message = (body as { message?: unknown })?.message;
  if (typeof message !== "string" || message.trim().length < 2 || message.length > 2000) {
    return NextResponse.json(
      { error: "message must be a non-empty string under 2000 characters." },
      { status: 400 },
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const intent = classifyIntent(message);
    if (intent === "unsupported") {
      return NextResponse.json({
        answer: UNSUPPORTED,
        intent,
        sources: [],
      });
    }

    const studentContext = getDemoAcademicContext(intent, user.id);
    const knowledgeChunks = await searchKnowledge(message);
    const knowledgeContext = formatKnowledgeContext(knowledgeChunks);
    const sources: SourceCitation[] = [
      ...studentContext.sources,
      ...knowledgeChunks.map((chunk) => ({
        title: chunk.title,
        section: chunk.section,
        href: chunk.href,
        type: "academic_document" as const,
      })),
    ];
    const retrievedContext = [studentContext.text, knowledgeContext]
      .filter(Boolean)
      .join("\n\n");
    if (!retrievedContext) {
      return NextResponse.json({
        answer: UNAVAILABLE,
        intent,
        sources: [],
      });
    }

    const provider = getLlmProvider();
    const answer = await provider.generateText({
      messages: [
        {
          role: "system",
          content: `${ACADEMIC_ASSISTANT_SYSTEM_PROMPT}

Detected intent: ${intent}

Retrieved context:
${retrievedContext}`,
        },
        { role: "user", content: message.trim() },
      ],
    });

    return NextResponse.json({
      answer,
      intent,
      sources,
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return NextResponse.json(
      { error: "Unable to complete the academic assistant request." },
      { status: 503 },
    );
  }
}
