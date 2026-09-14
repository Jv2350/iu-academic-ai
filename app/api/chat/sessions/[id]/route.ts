import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/services/auth";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("chat_messages").select("id,role,content,created_at").eq("session_id", id).order("created_at");
    if (error) throw error;
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("GET /api/chat/sessions/:id failed", error);
    return NextResponse.json({ error: "Unable to load conversation." }, { status: 503 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = (await request.json().catch(() => null)) as { title?: unknown } | null;
  if (typeof body?.title !== "string" || !body.title.trim() || body.title.length > 80) return NextResponse.json({ error: "A valid title is required." }, { status: 400 });
  try {
    if (!(await getAuthenticatedUser())) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("chat_sessions").update({ title: body.title.trim() }).eq("id", (await params).id).select("id,title,created_at").single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    console.error("PATCH /api/chat/sessions/:id failed", error);
    return NextResponse.json({ error: "Unable to rename conversation." }, { status: 503 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await getAuthenticatedUser())) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("chat_sessions").delete().eq("id", (await params).id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/chat/sessions/:id failed", error);
    return NextResponse.json({ error: "Unable to delete conversation." }, { status: 503 });
  }
}
