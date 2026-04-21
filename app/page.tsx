
import Link from "next/link";
import { getApprovedArticles } from "@/lib/storage";
import { ArticleCard } from "@/components/article-card";
import { SectionTitle } from "@/components/section-title";
import { NewsletterCard } from "@/components/newsletter-card";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const articles = await getApprovedArticles();

  const lead = articles[0];
  const sideLeads = articles.slice(1, 4);
  const latest = articles.slice(4, 10);

  const agentStories = articles
    .filter((item) =>
      [item.topic, item.company, item.title, item.summary]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes("agent")
    )
    .slice(0, 3);

  const bigTech = articles
    .filter((item) =>
      ["openai", "google", "microsoft", "meta", "anthropic", "amazon"].some((name) =>
        [item.company, item.title, item.summary]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(name)
      )
    )
    .slice(0, 4);

  const weekly = articles.filter((item) => item.contentType === "weekly_issue").slice(0, 3);
  const alerts = articles.filter((item) => item.contentType === "live_alert").slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <section className="mb-10 border-b border-white/10 pb-8">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
          AI Newsroom
        </div>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          The AI industry, covered like a real newsroom.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
          Breaking AI product launches, startup moves, funding signals, agent workflows, and deep editorial coverage.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#newsletter"
            className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Join newsletter
          </Link>
          <Link
            href="/editorial"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
          >
            Read analysis
          </Link>
        </div>
      </section>

      {lead ? (
        <section className="mb-14 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              <span>Lead Story</span>
              <span className="text-slate-600">•</span>
              <span>{formatDate(lead.publishedAt)}</span>
            </div>

            <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              <Link href={`/article/${lead.slug}`}>{lead.title}</Link>
            </h2>

            {lead.summary ? (
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {lead.summary}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {lead.topic ? (
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                  {lead.topic}
                </span>
              ) : null}
              {lead.company ? (
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                  {lead.company}
                </span>
              ) : null}
            </div>

            <div className="mt-8">
              <Link
                href={`/article/${lead.slug}`}
                className="inline-flex rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Read lead story
              </Link>
            </div>
          </article>

          <div className="grid gap-6">
            {sideLeads.map((article) => (
              <ArticleCard key={article.id} article={article} compact />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mb-16">
        <SectionTitle
          eyebrow="Now"
          title="Latest AI News"
          subtitle="The most recent stories across launches, research, models, agents, and startup momentum."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionTitle
          eyebrow="Category"
          title="AI Agents"
          subtitle="Workflows, agent stacks, orchestration layers, and the products shaping autonomous software."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {agentStories.map((article) => (
            <ArticleCard key={article.id} article={article} compact />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionTitle
          eyebrow="Power"
          title="Big Tech AI"
          subtitle="OpenAI, Google, Microsoft, Anthropic, Meta, and other major players shaping the market."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {bigTech.map((article) => (
            <ArticleCard key={article.id} article={article} compact />
          ))}
        </div>
      </section>

      <section className="mb-16 grid gap-8 xl:grid-cols-2">
        <div>
          <SectionTitle
            eyebrow="Digest"
            title="Weekly Issues"
            subtitle="Editorial roundups and curated weekly intelligence."
            href="/weekly"
          />
          <div className="grid gap-6">
            {weekly.map((article) => (
              <ArticleCard key={article.id} article={article} compact />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle
            eyebrow="Pulse"
            title="Live Alerts"
            subtitle="Fast-moving updates and short-form breaking items."
            href="/alerts"
          />
          <div className="grid gap-6">
            {alerts.map((article) => (
              <ArticleCard key={article.id} article={article} compact />
            ))}
          </div>
        </div>
      </section>

      <div id="newsletter">
        <NewsletterCard />
      </div>
    </main>
  );
}
