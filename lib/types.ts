
export type ArticleStatus =
  | "draft"
  | "approved"
  | "published"
  | "rejected";

export type ArticleContentType =
  | "article"
  | "live_alert"
  | "weekly_issue"
  | "weekly_roundup"
  | "editorial"
  | "company_update"
  | "topic_update";

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string | null;
  contentType: ArticleContentType | null;
  status: ArticleStatus;
  sourceName: string | null;
  sourceUrl: string | null;
  company: string | null;
  topic: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string | null;
  authorName?: string | null;
}
