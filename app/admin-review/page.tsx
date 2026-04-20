export const dynamic = 'force-dynamic';

import { getDraftArticles } from '@/lib/storage';
import { formatDate } from '@/lib/utils';

export default async function AdminReviewPage() {
  const drafts = await getDraftArticles();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold text-white">Draft Review Queue</h1>
      <p className="mt-3 text-slate-400">This page is your starter internal queue before wiring real auth, Notion sync, and role permissions.</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-black/10 text-sm text-slate-300">
            {drafts.map((draft) => (
              <tr key={draft.id}>
                <td className="px-4 py-4 font-medium text-white">{draft.title}</td>
                <td className="px-4 py-4">{draft.contentType}</td>
                <td className="px-4 py-4">{draft.status}</td>
                <td className="px-4 py-4">{draft.sourceName}</td>
                <td className="px-4 py-4">{formatDate(draft.createdAt)}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <a href={`/article/${draft.slug}`} className="rounded-lg border border-white/10 px-3 py-2 hover:border-white/20">View</a>
                    <button className="rounded-lg bg-emerald-500/20 px-3 py-2 text-emerald-300">Approve</button>
                    <button className="rounded-lg bg-rose-500/20 px-3 py-2 text-rose-300">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
