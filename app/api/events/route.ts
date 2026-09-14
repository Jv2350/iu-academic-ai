import { NextResponse } from "next/server";
import { events } from "@/data/events";
import { getAuthenticatedUser } from "@/lib/services/auth";
import { authenticationRequired, serviceUnavailable } from "@/lib/services/api-response";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return authenticationRequired();
    return NextResponse.json({ data: events });
  } catch (error) {
    console.error("GET /api/events failed", error);
    return serviceUnavailable();
  }
}
