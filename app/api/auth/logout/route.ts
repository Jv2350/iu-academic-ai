import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({ error: "Unable to sign out." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
