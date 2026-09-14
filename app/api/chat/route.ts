import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLlmProvider } from "@/lib/ai/provider";
import { classifyIntent } from "@/lib/ai/intent";
import { ACADEMIC_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { getDemoAcademicContext } from "@/lib/academic/demo-data";

const UNAVAILABLE =
  "I couldn't find reliable information about that in the available academic data.";

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
        answer: UNAVAILABLE,
        intent,
        sources: [],
      });
    }

    const context = getDemoAcademicContext(intent, user.id);
    const provider = getLlmProvider();
    const answer = await provider.generateText({
      messages: [
        {
          role: "system",
          content: `${ACADEMIC_ASSISTANT_SYSTEM_PROMPT}

Detected intent: ${intent}

Retrieved context:
${context.text || UNAVAILABLE}`,
        },
        { role: "user", content: message.trim() },
      ],
    });

    return NextResponse.json({
      answer,
      intent,
      sources: context.sources,
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return NextResponse.json(
      { error: "Unable to complete the academic assistant request." },
      { status: 503 },
    );
  }
}
