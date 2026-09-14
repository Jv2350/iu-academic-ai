import { NextResponse } from "next/server";
import { attendance } from "@/data/attendance";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { authenticationRequired, serviceUnavailable } from "@/lib/services/api-response";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return authenticationRequired();
    return NextResponse.json({ data: attendance });
  } catch (error) {
    console.error("GET /api/attendance failed", error);
    return serviceUnavailable();
  }
}
