export const dynamic = 'force-dynamic';

import { ArticleCard } from '@/components/article-card';
import { SectionTitle } from '@/components/section-title';
import { getApprovedArticles } from '@/lib/storage';

export const metadata = {
  title: 'Live Alerts',
  description: 'Latest approved live alerts for AI news.',
};

export default async function AlertsPage() {
  const alerts = (await getApprovedArticles()).filter((item) => item.contentType === 'live_alert');

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionTitle title="AI Live Alerts" description="Fast, reviewable updates for the latest AI stories." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {alerts.map((article) => <ArticleCard key={article.id} article={article} />)}
      </div>
    </div>
  );
}
