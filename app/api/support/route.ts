import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const categories = ["Examination", "Attendance", "Assignment", "Technical Issue", "General Academic"];

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { category?: unknown; subject?: unknown; description?: unknown } | null;
  if (typeof body?.category !== "string" || !categories.includes(body.category) || typeof body.subject !== "string" || !body.subject.trim() || typeof body.description !== "string" || body.description.trim().length < 10 || body.description.length > 3000) {
    return NextResponse.json({ error: "Please provide a valid category, subject, and description." }, { status: 400 });
  }
  try {
    const user = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    const supabase = await createSupabaseServerClient();
    const { data: student } = await supabase.from("students").select("id").eq("auth_user_id", user.id).maybeSingle();
    if (!student) return NextResponse.json({ error: "Student profile not found." }, { status: 404 });
    const { error } = await supabase.from("support_requests").insert({ student_id: student.id, category: body.category, subject: body.subject.trim(), description: body.description.trim() });
    if (error) throw error;
    return NextResponse.json({ data: { submitted: true } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/support failed", error);
    return NextResponse.json({ error: "Unable to submit your support request right now." }, { status: 503 });
  }
}
