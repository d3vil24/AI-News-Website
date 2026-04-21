
import { getApprovedArticles } from "@/lib/storage";
import { ArticleCard } from "@/components/article-card";
import { SectionTitle } from "@/components/section-title";

export default async function AlertsPage() {
  const alerts = (await getApprovedArticles()).filter((item) => item.contentType === "live_alert");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle
        eyebrow="Pulse"
        title="Live Alerts"
        subtitle="Fast-moving updates on launches, funding, product changes, and major AI ecosystem moments."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {alerts.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
