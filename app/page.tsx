export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ArticleCard } from '@/components/article-card';
import { NewsletterCard } from '@/components/newsletter-card';
import { SectionTitle } from '@/components/section-title';
import { getApprovedArticles } from '@/lib/storage';

export default async function HomePage() {
  const approved = await getApprovedArticles();
  const alerts = approved.filter((item) => item.contentType === 'live_alert').slice(0, 3);
  const issues = approved.filter((item) => item.contentType === 'weekly_issue').slice(0, 2);
  const companies = ['OpenAI', 'Anthropic', 'Google', 'Meta'];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-slate-900 to-cyan-500/10 p-8 md:p-12">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-violet-200">
            Automated AI news workflow
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            AI news website starter with live alerts, weekly issues, and publish APIs.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Use this as the frontend and backend base for an automated AI publication powered by n8n, Notion, multiple LLMs, and Supabase.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/alerts" className="rounded-xl bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
              View Live Alerts
            </Link>
            <Link href="/admin-review" className="rounded-xl border border-white/10 px-5 py-3 font-medium text-slate-200 hover:border-white/20 hover:text-white">
              Open Review Queue
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <SectionTitle title="Latest Live Alerts" description="High-velocity AI updates ready for your homepage feed." />
        <div className="grid gap-6 md:grid-cols-3">
          {alerts.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section className="mt-14">
        <SectionTitle title="Weekly Issues" description="Longer editorial roundups you can sponsor or turn into newsletter archives." />
        <div className="grid gap-6 md:grid-cols-2">
          {issues.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionTitle title="Tracked Companies" description="Create SEO-friendly company hubs around major AI players." />
          <div className="grid gap-4 sm:grid-cols-2">
            {companies.map((company) => (
              <Link key={company} href={`/companies/${company.toLowerCase()}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white hover:border-violet-400/40">
                <div className="text-lg font-medium">{company}</div>
                <p className="mt-2 text-sm text-slate-400">Latest updates, topic mapping, and related coverage.</p>
              </Link>
            ))}
          </div>
        </div>
        <NewsletterCard />
      </section>
    </div>
  );
}
