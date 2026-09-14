import { NextResponse } from "next/server";
import { getLlmProvider } from "@/lib/ai/provider";
import type { ChatMessage } from "@/lib/ai/types";

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" ||
      message.role === "assistant" ||
      message.role === "system") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const messages = (body as { messages?: unknown })?.messages;

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 50 ||
    !messages.every(isChatMessage)
  ) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  try {
    const answer = await getLlmProvider().generateText({
      messages: [
        {
          role: "system",
          content:
            "You are IU Academic AI, an academic copilot. Identify whether the request is about exams, timetable, attendance, assignments, notices, study planning, or general academic support. Answer only from the supplied academic context or conversation. Never invent dates, venues, grades, policies, or student information. If reliable information is unavailable, say exactly: \"I couldn't find reliable information about that in the available academic data.\" Keep responses clear and action-oriented. When context includes a source, name it under a final Sources line.",
        },
        ...messages,
      ],
    });
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat request failed", error);
    return NextResponse.json(
      { error: "Unable to complete the chat request" },
      { status: 503 },
    );
  }
}