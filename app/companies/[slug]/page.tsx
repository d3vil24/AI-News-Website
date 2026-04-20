export const dynamic = 'force-dynamic';

import { getApprovedArticles } from '@/lib/storage';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const companyName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const articles = (await getApprovedArticles()).filter(
    (item) => (item.company ?? '').toLowerCase() === slug.toLowerCase()
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">{companyName}</h1>
      <p className="mt-2 text-slate-400">
        Latest approved stories related to {companyName}.
      </p>

      <div className="mt-8 space-y-6">
        {articles.length === 0 ? (
          <p className="text-slate-400">No articles found for this company yet.</p>
        ) : (
          articles.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-semibold text-white">{article.title}</h2>
              <p className="mt-2 text-slate-300">{article.summary}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
