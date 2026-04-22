import fs from "fs";
import path from "path";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";
import { Article } from "@/lib/types";

const filePath = path.join(process.cwd(), "data", "articles.json");
const tableName = "articles";

type DbArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string | null;
  contenttype: Article["contentType"];
  status: Article["status"];
  sourcename?: string | null;
  sourceurl?: string | null;
  company?: string | null;
  topic?: string | null;
  publishedat?: string | null;
  createdat?: string | null;
  updatedat?: string | null;
  imageurl?: string | null;
  authorname?: string | null;
};

function readLocalArticles(): Article[] {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Article[];
  } catch {
    return [];
  }
}

function writeLocalArticles(articles: Article[]) {
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
}

function sortByPublishedDate(items: Article[]) {
  return [...items].sort(
    (a, b) =>
      new Date(b.publishedAt ?? 0).getTime() -
      new Date(a.publishedAt ?? 0).getTime()
  );
}

function mapDbToArticle(row: DbArticle): Article {
  const now = new Date().toISOString();

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? null,
    content: row.content ?? null,
    contentType: row.contenttype ?? "article",
    status: row.status,
    sourceName: row.sourcename ?? "Unknown source",
    sourceUrl: row.sourceurl ?? "#",
    company: row.company ?? null,
    topic: row.topic ?? null,
    publishedAt: row.publishedat ?? now,
    createdAt: row.createdat ?? now,
    updatedAt: row.updatedat ?? now,
    imageUrl: row.imageurl ?? null,
    authorName: row.authorname ?? "AI Pulse Desk",
  };
}

function mapArticleToDb(article: Article) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    content: article.content,
    contenttype: article.contentType,
    status: article.status,
    sourcename: article.sourceName,
    sourceurl: article.sourceUrl,
    company: article.company,
    topic: article.topic,
    publishedat: article.publishedAt,
    createdat: article.createdAt,
    updatedat: article.updatedAt,
    imageurl: article.imageUrl ?? null,
    authorname: article.authorName ?? "AI Pulse Desk",
  };
}

export async function readArticles(): Promise<Article[]> {
  if (!hasSupabaseConfig()) {
    return readLocalArticles();
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order("publishedat", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapDbToArticle(row as DbArticle));
}

export async function writeArticles(articles: Article[]) {
  if (!hasSupabaseConfig()) {
    writeLocalArticles(articles);
    return;
  }

  const supabase = getSupabaseAdmin();
  const payload = articles.map(mapArticleToDb);

  const { error } = await supabase.from(tableName).upsert(payload, {
    onConflict: "id",
  });

  if (error) {
    throw error;
  }
}

export async function getApprovedArticles(): Promise<Article[]> {
  const items = await readArticles();
  return sortByPublishedDate(items.filter((item) => item.status === "approved"));
}

export async function getDraftArticles(): Promise<Article[]> {
  const items = await readArticles();
  return sortByPublishedDate(items.filter((item) => item.status === "draft"));
}

export async function findArticleBySlug(slug: string): Promise<Article | null> {
  if (!hasSupabaseConfig()) {
    return readLocalArticles().find((item) => item.slug === slug) ?? null;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapDbToArticle(data as DbArticle) : null;
}

export async function upsertArticle(article: Article): Promise<Article> {
  if (!hasSupabaseConfig()) {
    const items = readLocalArticles();
    const index = items.findIndex(
      (item) => item.id === article.id || item.slug === article.slug
    );

    if (index >= 0) {
      items[index] = article;
    } else {
      items.unshift(article);
    }

    writeLocalArticles(items);
    return article;
  }

  const supabase = getSupabaseAdmin();
  const payload = mapArticleToDb(article);

  const { data, error } = await supabase
    .from(tableName)
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapDbToArticle(data as DbArticle);
}

export async function updateArticleStatus(
  id: string,
  status: Article["status"]
): Promise<Article | null> {
  if (!hasSupabaseConfig()) {
    const items = readLocalArticles();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    items[index].status = status;
    items[index].updatedAt = new Date().toISOString();
    writeLocalArticles(items);

    return items[index];
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from(tableName)
    .update({
      status,
      updatedat: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapDbToArticle(data as DbArticle) : null;
}
