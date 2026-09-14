import { NextResponse } from "next/server";

export function authenticationRequired() {
  return NextResponse.json(
    { error: "Your session has expired. Please sign in again." },
    { status: 401 },
  );
}

export function serviceUnavailable() {
  return NextResponse.json(
    { error: "Unable to load academic data right now." },
    { status: 503 },
  );
}
