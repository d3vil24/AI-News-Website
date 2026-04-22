
export type ParsedFeedItem = {
  title: string;
  url: string;
  summary?: string | null;
  publishedAt?: string | null;
  imageUrl?: string | null;
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getTagValue(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\s[^>]*)?>([\s\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1].trim()) : null;
}

function getTagAttr(block: string, tag: string, attr: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["'][^>]*>`, "i"));
  return match ? decodeXml(match[1].trim()) : null;
}

function getMediaContentUrl(block: string) {
  return getTagAttr(block, "media:content", "url") || getTagAttr(block, "enclosure", "url");
}

function parseRssItems(xml: string): ParsedFeedItem[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  return items.map((item) => {
    const title = getTagValue(item, "title");
    const link = getTagValue(item, "link") || getTagValue(item, "guid");
    const description = getTagValue(item, "description") || getTagValue(item, "content:encoded");
    const pubDate = getTagValue(item, "pubDate");
    const imageUrl = getMediaContentUrl(item);
    if (!title || !link) return null;
    return {
      title: stripHtml(title),
      url: link.trim(),
      summary: description ? stripHtml(description).slice(0, 500) : null,
      publishedAt: pubDate ?? null,
      imageUrl,
    };
  }).filter(Boolean) as ParsedFeedItem[];
}

function parseAtomEntries(xml: string): ParsedFeedItem[] {
  const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];
  return entries.map((entry) => {
    const title = getTagValue(entry, "title");
    const link = getTagAttr(entry, "link", "href") || getTagValue(entry, "id") || getTagValue(entry, "guid");
    const summary = getTagValue(entry, "summary") || getTagValue(entry, "content") || getTagValue(entry, "content:encoded");
    const publishedAt = getTagValue(entry, "updated") || getTagValue(entry, "published") || getTagValue(entry, "pubDate");
    const imageUrl = getMediaContentUrl(entry);
    if (!title || !link) return null;
    return {
      title: stripHtml(title),
      url: link.trim(),
      summary: summary ? stripHtml(summary).slice(0, 500) : null,
      publishedAt: publishedAt ?? null,
      imageUrl,
    };
  }).filter(Boolean) as ParsedFeedItem[];
}

export function parseRssXml(xml: string): ParsedFeedItem[] {
  const rssItems = parseRssItems(xml);
  if (rssItems.length) return rssItems;
  const atomEntries = parseAtomEntries(xml);
  if (atomEntries.length) return atomEntries;
  return [];
}
