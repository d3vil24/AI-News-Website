import Link from 'next/link';
import { getApprovedArticles } from '@/lib/storage';

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const companyName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const articles = (await getApprovedArticles()).filter((item) => item.company.toLowerCase() === slug.toLowerCase());

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-semibold text-white">{companyName}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Use this company hub for entity-level SEO, internal linking, and tracking major developments around {companyName}.</p>
      <div className="mt-8 grid gap-4">
        {articles.length ? articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-violet-400/40">
            <div className="font-medium text-white">{article.title}</div>
            <p className="mt-2 text-sm text-slate-400">{article.summary}</p>
          </Link>
        )) : <p className="text-slate-400">No published articles yet for this company.</p>}
      </div>
    </div>
  );
}
