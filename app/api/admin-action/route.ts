import { NextRequest, NextResponse } from "next/server";
import { updateArticle } from "@/lib/articles";
import { isAdminAuthorized } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, action } = await req.json();

    if (!id || !action) {
      return NextResponse.json(
        { ok: false, error: "Missing data" },
        { status: 400 }
      );
    }

    const patch: {
      status?: "draft" | "approved" | "published" | "rejected";
      publishedAt?: string;
    } = {};

    if (action === "draft") patch.status = "draft";
    if (action === "approved") patch.status = "approved";
    if (action === "published") {
      patch.status = "published";
      patch.publishedAt = new Date().toISOString();
    }
    if (action === "rejected") patch.status = "rejected";

    const updated = await updateArticle(id, patch);

    return NextResponse.json({ ok: true, article: updated });
  } catch (error) {
    console.error("ADMIN ACTION ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}