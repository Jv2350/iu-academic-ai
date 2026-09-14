import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    const supabase = await createSupabaseServerClient();
    const { data: student } = await supabase.from("students").select("id").eq("auth_user_id", user.id).maybeSingle();
    if (!student) return NextResponse.json({ data: [] });
    const { data, error } = await supabase.from("chat_sessions").select("id,title,created_at").eq("student_id", student.id).order("created_at", { ascending: false }).limit(30);
    if (error) throw error;
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("GET /api/chat/sessions failed", error);
    return NextResponse.json({ error: "Unable to load chat history." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { title?: unknown } | null;
  if (body?.title !== undefined && (typeof body.title !== "string" || body.title.length > 80)) {
    return NextResponse.json({ error: "Invalid conversation title." }, { status: 400 });
  }
  try {
    const user = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    const supabase = await createSupabaseServerClient();
    const { data: student } = await supabase.from("students").select("id").eq("auth_user_id", user.id).single();
    if (!student) return NextResponse.json({ error: "Student profile not found." }, { status: 404 });
    const { data, error } = await supabase.from("chat_sessions").insert({ student_id: student.id, title: body?.title || "New conversation" }).select("id,title,created_at").single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("POST /api/chat/sessions failed", error);
    return NextResponse.json({ error: "Unable to create conversation." }, { status: 503 });
  }
}
