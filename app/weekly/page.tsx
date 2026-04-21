export const dynamic = 'force-dynamic';

import { ArticleCard } from '@/components/article-card';
import { SectionTitle } from '@/components/section-title';
import { getApprovedArticles } from '@/lib/storage';

export default async function WeeklyPage() {
  const issues = (await getApprovedArticles()).filter((item) => item.contentType === 'weekly_issue');

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionTitle title="Weekly Issue Archive" description="Archive-style issue pages ready for newsletter republishing and sponsorship placement." />
      <div className="grid gap-6 md:grid-cols-2">
        {issues.map((article) => <ArticleCard key={article.id} article={article} />)}
      </div>
    </div>
  );
}
