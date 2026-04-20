import { NextResponse } from 'next/server';
import { getApprovedArticles } from '@/lib/storage';

export async function GET() {
  const articles = await getApprovedArticles();
  return NextResponse.json({ success: true, articles });
}
