"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

type Article = {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  contentType: string | null;
  status: "draft" | "approved" | "published" | "rejected";
  topic: string | null;
  company: string | null;
  sourceUrl: string | null;
  publishedAt: string | null;
  authorName?: string | null;
};

export default function AdminReviewPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function loadArticles() {
    try {
      setLoading(true);
      const response = await fetch("/api/articles", { cache: "no-store" });
      const data = await response.json();

      const items = Array.isArray(data) ? data : data.articles || [];
      setArticles(items);
    } catch (error) {
      console.error("Failed to load admin articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  async function handleAction(
    id: string,
    action: "draft" | "approved" | "published" | "rejected"
  ) {
    try {
      setProcessingId(id);

      const response = await fetch("/api/admin-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data?.error || "Failed to update article");
      }

      await loadArticles();
    } catch (error) {
      console.error("Admin action failed:", error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
          Admin
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Newsroom Review Queue
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
          Review drafts, approve publishing candidates, reject weak stories,
          and manage the automated intake pipeline.
        </p>
      </div>

      <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Automation status
        </div>
        <div className="mt-3 grid gap-2 text-sm text-slate-300">
          <div>• Draft ingestion scaffold is active</div>
          <div>• Duplicate detection scaffold is active</div>
          <div>• Auto-tagging scaffold is active</div>
          <div>
            • Source fetch route available at <code>/api/fetch-sources</code>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-slate-400">
          Loading articles...
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/10"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span>
                      {(article.contentType ?? "article").replace(/_/g, " ")}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span>{article.status}</span>
                    <span className="text-slate-600">•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  <h2 className="text-2xl font-semibold text-white">
                    {article.title}
                  </h2>

                  {article.summary ? (
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {article.summary}
                    </p>
                  ) : null}

                  {article.content ? (
                    <div className="mt-4 max-h-48 overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300 whitespace-pre-wrap">
                      {article.content}
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.topic ? (
                      <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                        {article.topic}
                      </span>
                    ) : null}

                    {article.company ? (
                      <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                        {article.company}
                      </span>
                    ) : null}

                    {article.sourceUrl ? (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 hover:border-white/20"
                      >
                        Source →
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="border-t border-white/10 p-6 lg:border-l lg:border-t-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Actions
                  </div>

                  <div className="mt-4 grid gap-3">
                    {(["draft", "approved", "published", "rejected"] as const).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => handleAction(article.id, status)}
                          disabled={processingId === article.id}
                          className="w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {processingId === article.id
                            ? "Processing..."
                            : `Mark as ${status}`}
                        </button>
                      )
                    )}
                  </div>

                  <div className="mt-6 text-xs leading-6 text-slate-500">
                    Author: {article.authorName || "AI Pulse Desk"}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {!articles.length ? (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-slate-500">
              No articles found in the newsroom queue.
            </div>
          ) : null}
        </div>
      )}
    </main>
  );
}