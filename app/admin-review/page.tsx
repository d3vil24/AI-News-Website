import { getDraftArticles, updateArticleStatus } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import { revalidatePath } from "next/cache";

async function updateStatus(formData: FormData) {
  "use server";

  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as
    | "draft"
    | "approved"
    | "published"
    | "rejected";

  await updateArticleStatus(id, status);

  revalidatePath("/admin-review");
  revalidatePath("/");
  revalidatePath("/alerts");
  revalidatePath("/weekly");
}

export default async function AdminReviewPage() {
  const articles = await getDraftArticles();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Review</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review draft stories, approve them for publishing, or reject low-quality
          submissions.
        </p>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{article.title}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  {(article.contentType ?? "article").replace(/_/g, " ")}
                  {article.topic ? ` • Topic: ${article.topic}` : ""}
                  {article.company ? ` • Company: ${article.company}` : ""}
                  {article.publishedAt
                    ? ` • ${formatDate(article.publishedAt)}`
                    : ""}
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                {article.status}
              </span>
            </div>

            {article.summary ? (
              <p className="mb-3 text-sm text-gray-700">{article.summary}</p>
            ) : null}

            {article.content ? (
              <div className="mb-4 max-h-48 overflow-auto rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-800 whitespace-pre-wrap">
                {article.content}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <form action={updateStatus}>
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="status" value="approved" />
                <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
                  Approve
                </button>
              </form>

              <form action={updateStatus}>
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="status" value="rejected" />
                <button className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white">
                  Reject
                </button>
              </form>

              <form action={updateStatus}>
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="status" value="published" />
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  Publish
                </button>
              </form>

              {article.sourceUrl ? (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Open source
                </a>
              ) : null}
            </div>
          </article>
        ))}

        {!articles.length ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">
            No draft articles found.
          </div>
        ) : null}
      </div>
    </main>
  );
}