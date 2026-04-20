import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';
import { upsertArticle } from '@/lib/storage';
import { Article } from '@/lib/types';

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const required = ['title', 'slug', 'summary', 'content', 'sourceName', 'sourceUrl', 'contentType'];
  const missing = required.filter((key) => !body[key]);

  if (missing.length) {
    return NextResponse.json({ success: false, error: `Missing fields: ${missing.join(', ')}` }, { status: 400 });
  }

  const article: Article = {
  id: body.id ?? crypto.randomUUID(),
  title: body.title,
  slug: body.slug,
  summary: body.summary,
  content: body.content,
  sourceName: body.sourceName,
  sourceUrl: body.sourceUrl,
  contentType: body.contentType,
  status: body.status ?? 'approved',
  company: body.company ?? '',
  topic: body.topic ?? '',
  publishedAt: body.publishedAt ?? new Date().toISOString(),
  createdAt: body.createdAt ?? new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
  const saved = await upsertArticle(article);

  return NextResponse.json({ success: true, article: saved });
}
