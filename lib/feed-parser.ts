
import { normalizeUrl } from "@/lib/ingestion";

export type ParsedFeedItem = {
  title: string;
  url: string;
  summary?: string | null;
  publishedAt?: string | null;
};

function getTagValue(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}>([\s\S]*?)</${tag}>`, "i"));
  return match ? match[1].trim() : null;
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function parseRssXml(xml: string): ParsedFeedItem[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return items
    .map((item) => {
      const title = getTagValue(item, "title");
      const link = getTagValue(item, "link");
      const description = getTagValue(item, "description");
      const pubDate = getTagValue(item, "pubDate");

      if (!title || !link) return null;

      return {
        title: decodeXml(title),
        url: normalizeUrl(decodeXml(link)),
        summary: description ? decodeXml(description).replace(/<[^>]+>/g, "").trim() : null,
        publishedAt: pubDate ?? null,
      };
    })
    .filter(Boolean) as ParsedFeedItem[];
}
