export type ContentType = 'live_alert' | 'analysis' | 'weekly_issue' | 'guide';
export type ArticleStatus = 'draft' | 'approved' | 'rejected';

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
  contentType: ContentType;
  status: ArticleStatus;
  company: string;
  topic: string;
  publishedAt: string;
  createdAt: string;
}
