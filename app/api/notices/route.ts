import { NextResponse } from "next/server";
import { notices } from "@/data/notices";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { authenticationRequired, serviceUnavailable } from "@/lib/services/api-response";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return authenticationRequired();
    return NextResponse.json({ data: notices });
  } catch (error) {
    console.error("GET /api/notices failed", error);
    return serviceUnavailable();
  }
}
