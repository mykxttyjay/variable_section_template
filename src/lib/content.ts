// =============================================================================
// Content access layer — reads page content from EmDash collections.
// =============================================================================
// Replaces the old `import x from "~/data/pages/*.json"` pattern. Pages call
// these helpers, which query EmDash at request time so edits made in the admin
// UI reflect live (no rebuild needed). The {city}/{state}/{business} tokens are
// interpolated here via localizeData(), keeping site.json as the source of truth.
// =============================================================================

import { getEmDashEntry, getEmDashCollection } from "emdash";
import { localizeData, getLocationText } from "~/config/site";
import { getPageTitle } from "~/lib/config";

export interface PageEntry {
  title: string;
  description: string;
  sections: any[];
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    [key: string]: unknown;
  };
  // Extra fields present on some collections
  category?: string;
  order?: number;
  icon?: string;
  thumbnail?: string;
  cta_text?: string;
  cta_link?: string;
  location?: string;
  [key: string]: unknown;
}

/** Sort sections by their `order` property (ascending, missing → 0). */
function sortSections(sections: any[] = []): any[] {
  return [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Fetch a single entry from a collection by slug, localized.
 * Returns null if not found (caller should 404).
 */
export async function getEntry(
  collection: string,
  slug: string
): Promise<PageEntry | null> {
  let result;
  try {
    result = await getEmDashEntry(collection, slug);
  } catch (err: any) {
    if (isNotFound(err)) return null;
    throw err;
  }
  const { entry, error } = result;
  // getEmDashEntry returns a "not found" error rather than throwing; treat it
  // as a 404 (null) instead of a hard error.
  if (error && !isNotFound(error)) throw error;
  if (!entry) return null;
  const data = localizeData(entry.data) as PageEntry;
  data.sections = sortSections(data.sections);
  return data;
}

/** True when an error represents a missing entry (vs a real failure). */
function isNotFound(err: any): boolean {
  const name = err?.name ?? err?.constructor?.name ?? "";
  const msg = String(err?.message ?? "");
  return name === "LiveEntryNotFoundError" || msg.includes("was not found");
}

/**
 * Fetch all published entries from a collection, localized.
 * Each item keeps its `slug` alongside the localized data.
 */
export async function getEntries(
  collection: string
): Promise<Array<{ slug: string; data: PageEntry }>> {
  const { entries, error } = await getEmDashCollection(collection, {
    status: "published",
  });
  if (error) throw error;
  return entries.map((e: any) => {
    const data = localizeData(e.data) as PageEntry;
    data.sections = sortSections(data.sections);
    return { slug: e.slug ?? e.data?.slug ?? e.id, data };
  });
}

/**
 * Build the standard metadata object pages pass to PageLayout/BaseLayout,
 * mirroring the previous fallback behavior.
 */
export function buildMetadata(entry: PageEntry) {
  return {
    title: entry.metadata?.title || getPageTitle(entry.title),
    description: entry.metadata?.description || entry.description,
    keywords: entry.metadata?.keywords,
    canonical: entry.metadata?.canonical,
  };
}

export { getLocationText };
