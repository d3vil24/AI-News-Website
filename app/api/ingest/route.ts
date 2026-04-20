import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';
import { upsertArticle } from '@/lib/storage';
import { Article } from '@/lib/types';

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const article: Article = {
  id: body.id ?? crypto.randomUUID(),
  title: body.title ?? 'Untitled Draft',
  slug: body.slug ?? `draft-${Date.now()}`,
  summary: body.summary ?? '',
  content: body.content ?? '',
  sourceName: body.sourceName ?? 'Unknown Source',
  sourceUrl: body.sourceUrl ?? '#',
  contentType: body.contentType ?? 'live_alert',
  status: 'draft',
  company: body.company ?? '',
  topic: body.topic ?? '',
  publishedAt: body.publishedAt ?? new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
  const saved = await upsertArticle(article);

  return NextResponse.json({ success: true, article: saved });
}
