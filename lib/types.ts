export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  contentType: 'live_alert' | 'news_brief' | 'weekly_issue' | 'analysis';
  status: 'draft' | 'approved' | 'rejected';
  sourceName: string;
  sourceUrl: string;
  company?: string;
  topic?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};
