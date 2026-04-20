import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';
import { readArticles, writeArticles } from '@/lib/storage';

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }

  const items = await readArticles();
  const index = items.findIndex((item) => item.id === body.id);
  if (index === -1) {
    return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
  }

  items[index] = {
    ...items[index],
    ...body,
  };

  await writeArticles(items);
  return NextResponse.json({ success: true, article: items[index] });
}
