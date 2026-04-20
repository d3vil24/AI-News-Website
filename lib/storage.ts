function mapDbToArticle(row: DbArticle): Article {
  const now = new Date().toISOString();
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    content: row.content,
    contentType: row.contenttype,
    status: row.status,
    sourceName: row.sourcename ?? 'Unknown source',
    sourceUrl: row.sourceurl ?? '#',
    company: row.company || '',
    topic: row.topic || '',
    publishedAt: row.publishedat ?? now,
    createdAt: row.createdat ?? now,
    updatedAt: row.updatedat ?? now,
  };
}
