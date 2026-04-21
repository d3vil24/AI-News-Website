export function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-slate-400">{description}</p> : null}
    </div>
  );
}
