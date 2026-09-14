import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { getPracticeQuestions } from "@/lib/study/question-bank";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  const subject = (body as { subject?: unknown })?.subject;
  const difficulty = (body as { difficulty?: unknown })?.difficulty;
  const count = (body as { count?: unknown })?.count ?? 3;
  if (
    typeof subject !== "string" ||
    !subject.trim() ||
    typeof difficulty !== "string" ||
    !["easy", "medium", "hard"].includes(difficulty) ||
    typeof count !== "number" ||
    !Number.isInteger(count) ||
    count < 1 ||
    count > 10
  ) {
    return NextResponse.json({ error: "subject, difficulty, and a count between 1 and 10 are required." }, { status: 400 });
  }
  try {
    if (!(await getAuthenticatedUser())) {
      return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    }
    return NextResponse.json({
      data: {
        subject: subject.trim(),
        difficulty,
        questions: getPracticeQuestions(subject, count),
      },
    });
  } catch (error) {
    console.error("POST /api/study/mcq failed", error);
    return NextResponse.json({ error: "Unable to generate practice questions." }, { status: 503 });
  }
}
