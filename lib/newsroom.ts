
import { Article } from "@/lib/types";
import { excerpt, slugify } from "@/lib/utils";

type DraftArticleInput = {
  title: string;
  summary?: string | null;
  content?: string | null;
  contentType?: Article["contentType"];
  sourceName?: string | null;
  sourceUrl?: string | null;
  company?: string | null;
  topic?: string | null;
  imageUrl?: string | null;
  authorName?: string | null;
};

export function buildDraftArticle(input: DraftArticleInput): Article {
  const now = new Date().toISOString();
  const content = input.content ?? null;

  return {
    id: crypto.randomUUID(),
    slug: slugify(input.title),
    title: input.title.trim(),
    summary: input.summary?.trim() || excerpt(content, 180) || null,
    content,
    contentType: input.contentType ?? "article",
    status: "draft",
    sourceName: input.sourceName ?? null,
    sourceUrl: input.sourceUrl ?? null,
    company: input.company ?? null,
    topic: input.topic ?? null,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    imageUrl: input.imageUrl ?? null,
    authorName: input.authorName ?? "AI Pulse Desk",
  };
}

export function buildWhyItMatters(article: Pick<Article, "company" | "topic" | "title" | "summary">) {
  const signals = [
    article.company ? `${article.company} is part of the competitive signal here.` : null,
    article.topic ? `${article.topic} remains an active AI category with product and market relevance.` : null,
    article.summary ? "This update may influence tooling choices, strategy, buyer expectations, or market positioning." : null,
  ].filter(Boolean);

  return signals.join(" ");
}
