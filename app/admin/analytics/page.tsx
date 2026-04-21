export default function AdminAnalyticsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">Admin</div>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Analytics Dashboard</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">This page is a scaffold for traffic, article performance, newsletter growth, sponsor performance, and editorial output metrics.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {["Pageviews", "Newsletter signups", "Published stories", "Sponsor clicks"].map((label) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-3xl font-semibold text-white">—</div>
          </div>
        ))}
      </div>
    </main>
  );
}
