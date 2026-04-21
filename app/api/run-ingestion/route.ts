import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Scheduled ingestion scaffold is ready",
    note: "Trigger this route from Vercel Cron or GitHub Actions after connecting feed/API fetchers.",
  });
}
