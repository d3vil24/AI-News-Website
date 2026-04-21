
import { NEWS_SOURCES } from "@/lib/source-registry";

export type ProviderAdapter = {
  id: string;
  label: string;
  mode: "rss" | "api" | "manual";
  sourceIds: string[];
};

export const PROVIDER_ADAPTERS: ProviderAdapter[] = [
  {
    id: "default-rss",
    label: "Default RSS Poller",
    mode: "rss",
    sourceIds: NEWS_SOURCES.map((source) => source.id),
  },
  {
    id: "manual-seeding",
    label: "Manual Draft Seeding",
    mode: "manual",
    sourceIds: [],
  },
];

export function getProviderAdapter(id: string) {
  return PROVIDER_ADAPTERS.find((adapter) => adapter.id === id) ?? null;
}
