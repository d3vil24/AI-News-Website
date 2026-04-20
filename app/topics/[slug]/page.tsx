import Link from 'next/link';
import { getApprovedArticles } from '@/lib/storage';

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = slug.replace(/-/g, ' ');
  const articles = (await getApprovedArticles()).filter((item) => item.topic.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-semibold capitalize text-white">{topic}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Use topic hubs to build search authority around AI themes like agents, pricing, policy, and infrastructure.</p>
      <div className="mt-8 grid gap-4">
        {articles.length ? articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-violet-400/40">
            <div className="font-medium text-white">{article.title}</div>
            <p className="mt-2 text-sm text-slate-400">{article.summary}</p>
          </Link>
        )) : <p className="text-slate-400">No published articles yet for this topic.</p>}
      </div>
    </div>
  );
}
