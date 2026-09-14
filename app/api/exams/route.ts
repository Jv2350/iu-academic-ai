import { NextResponse } from "next/server";
import { exams } from "@/data/exams";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { authenticationRequired, serviceUnavailable } from "@/lib/services/api-response";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return authenticationRequired();
    return NextResponse.json({ data: exams });
  } catch (error) {
    console.error("GET /api/exams failed", error);
    return serviceUnavailable();
  }
}
