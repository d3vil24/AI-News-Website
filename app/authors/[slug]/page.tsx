type PageProps = { params: Promise<{ slug: string }> };

function humanize(slug: string) {
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const name = humanize(slug);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">Author</div>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{name}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">Author profile scaffold for contributor bios, published work, and editorial focus.</p>
      </div>
    </main>
  );
}
