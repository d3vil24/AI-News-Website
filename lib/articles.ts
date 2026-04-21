
import { Article, ArticleStatus } from "@/lib/types";
import { slugify } from "@/lib/utils";
import {
  findArticleBySlug,
  getApprovedArticles,
  readArticles,
  upsertArticle as saveArticle,
} from "@/lib/storage";

export async function listPublishedArticles(limit = 20): Promise<Article[]> {
  const items = await getApprovedArticles();
  return items.slice(0, limit);
}

export async function listAdminArticles(status?: ArticleStatus): Promise<Article[]> {
  const items = await readArticles();
  const filtered = status ? items.filter((item) => item.status === status) : items;

  return [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return findArticleBySlug(slug);
}

export async function upsertArticle(input: Partial<Article> & { title: string }): Promise<Article> {
  const now = new Date().toISOString();

  const article: Article = {
    id: input.id ?? crypto.randomUUID(),
    slug: input.slug ?? slugify(input.title),
    title: input.title,
    summary: input.summary ?? null,
    content: input.content ?? null,
    contentType: input.contentType ?? "article",
    status: input.status ?? "draft",
    sourceName: input.sourceName ?? null,
    sourceUrl: input.sourceUrl ?? null,
    company: input.company ?? null,
    topic: input.topic ?? null,
    publishedAt: input.publishedAt ?? now,
    createdAt: input.createdAt ?? now,
    updatedAt: now,
    imageUrl: input.imageUrl ?? null,
    authorName: input.authorName ?? "AI Pulse Desk",
  };

  return saveArticle(article);
}

export async function updateArticle(id: string, patch: Partial<Article>): Promise<Article> {
  const items = await readArticles();
  const existing = items.find((item) => item.id === id);

  if (!existing) {
    throw new Error("Article not found");
  }

  const updated: Article = {
    ...existing,
    ...patch,
    slug: patch.slug ?? (patch.title ? slugify(patch.title) : existing.slug),
    updatedAt: new Date().toISOString(),
  };

  return saveArticle(updated);
}
