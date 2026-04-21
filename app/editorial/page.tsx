export default function EditorialPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-semibold text-white">Editorial Policy</h1>
      <div className="prose-custom mt-8">
        <p>AI Pulse uses AI for discovery, clustering, summaries, and draft preparation. Sensitive stories should be reviewed before publication.</p>
        <p>Primary-source links should be retained in every story. Corrections and updates should be logged with timestamps.</p>
        <p>Do not auto-publish rumors, legal disputes, policy changes, safety incidents, or unsupported benchmark claims.</p>
      </div>
    </div>
  );
}
