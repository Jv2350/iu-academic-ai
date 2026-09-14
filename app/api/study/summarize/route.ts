import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { generateStudyResponse } from "@/lib/ai/study";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  const topic = (body as { topic?: unknown })?.topic;
  if (typeof topic !== "string" || !topic.trim()) {
    return NextResponse.json({ error: "topic is required." }, { status: 400 });
  }
  try {
    if (!(await getAuthenticatedUser())) {
      return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    }
    const answer = await generateStudyResponse("summarize", topic.trim());
    return NextResponse.json({ data: { answer, topic: topic.trim(), action: "summarize" } });
  } catch (error) {
    console.error("POST /api/study/summarize failed", error);
    return NextResponse.json({ error: "I'm having trouble connecting to the academic AI service. Please try again." }, { status: 503 });
  }
}
