import { NextResponse } from "next/server";
import { timetable } from "@/data/timetable";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { authenticationRequired, serviceUnavailable } from "@/lib/services/api-response";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return authenticationRequired();
    return NextResponse.json({ data: timetable });
  } catch (error) {
    console.error("GET /api/timetable failed", error);
    return serviceUnavailable();
  }
}
