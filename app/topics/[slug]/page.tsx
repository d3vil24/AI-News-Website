export const dynamic = 'force-dynamic';

import { getApprovedArticles } from '@/lib/storage';

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const topic = slug.replace(/-/g, ' ');

  const articles = (await getApprovedArticles()).filter(
    (item) =>
      (item.topic ?? '')
        .toLowerCase()
        .replace(/\s+/g, '-') === slug.toLowerCase()
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">{topic}</h1>

      <div className="mt-8 space-y-6">
        {articles.length === 0 ? (
          <p>No topic articles found.</p>
        ) : (
          articles.map((article) => (
            <article key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
