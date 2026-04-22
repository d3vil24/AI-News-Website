
import { NextRequest, NextResponse } from "next/server";
import { updateArticle } from "@/lib/articles";
import { isAdminAuthorized } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...patch } = await request.json();

    if (!id) {
      return NextResponse.json({ ok: false, error: "Article id is required" }, { status: 400 });
    }

    const article = await updateArticle(id, patch);

    return NextResponse.json({ ok: true, article });
  } catch (error) {
    console.error("POST /api/update-story failed", error);
    return NextResponse.json({ ok: false, error: "Failed to update article" }, { status: 500 });
  }
}
