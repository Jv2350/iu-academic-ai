import { NextResponse } from "next/server";
import { assignments } from "@/data/assignment";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { authenticationRequired, serviceUnavailable } from "@/lib/services/api-response";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return authenticationRequired();
    return NextResponse.json({ data: assignments });
  } catch (error) {
    console.error("GET /api/assignments failed", error);
    return serviceUnavailable();
  }
}
