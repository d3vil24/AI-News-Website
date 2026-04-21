import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string };
    if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, message: "Newsletter signup captured successfully", email: body.email });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to capture newsletter signup" }, { status: 500 });
  }
}
