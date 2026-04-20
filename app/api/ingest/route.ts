import { NextRequest, NextResponse } from 'next/server';
import { upsertArticle } from '@/lib/storage';
import { Article } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (apiKey !== process.env.PUBLISH_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const now = new Date().toISOString();

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
      publishedAt: body.publishedAt ?? now,
      createdAt: body.createdAt ?? now,
      updatedAt: now,
    };

    const saved = await upsertArticle(article);

    return NextResponse.json({
      success: true,
      message: 'Draft ingested successfully',
      article: saved,
    });
  } catch (error) {
    console.error('Ingest API error:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
