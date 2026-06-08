// =============================================================================
// Generate .emdash/seed.json from the existing static JSON content.
// =============================================================================
// This reads src/data/{pages,locations}/*.json and produces an EmDash seed
// describing 4 collections (pages, solutions, indoor-billboards, locations)
// plus their content entries.
//
// Design choices:
// - `sections` and `metadata` are stored as `json` fields so the exact nested
//   structure is preserved and stays editable in the admin.
// - Placeholder tokens ({city}/{state}/{business}) are kept as-is in the data;
//   they are interpolated at render time via localizeData(), so site settings
//   remain the single source of truth.
// - Slugs match the route slugs the pages expect (NOT the filenames):
//     solutions:         design-services, website-design, pay-per-click, ...
//                        (the route path prefix folder is rebuilt from `category`)
//     indoor-billboards: become-a-venue-partner, locations, screen-advertising
//                        (note: billboard-locations.json -> slug "locations")
//     locations:         lakewood, aurora, arvada, centennial
//     pages:             home, about-us, contact-us, solutions
//
// Run with: node scripts/generate-seed.mjs
// =============================================================================

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dataDir = resolve(root, "src", "data");

function readJson(relPath) {
  return JSON.parse(readFileSync(resolve(dataDir, relPath), "utf-8"));
}

// ---------------------------------------------------------------------------
// Shared field definitions
// ---------------------------------------------------------------------------

/** Fields shared by every content collection. */
const baseFields = [
  { slug: "title", label: "Title", type: "string", required: true, searchable: true },
  { slug: "description", label: "Meta Description", type: "text", required: true, searchable: true },
  { slug: "sections", label: "Page Sections", type: "json" },
  { slug: "metadata", label: "SEO Metadata", type: "json" },
];

const solutionExtraFields = [
  { slug: "category", label: "Category", type: "select", validation: { options: ["foundational", "lead-gen", "branding-awareness"] } },
  { slug: "order", label: "Order", type: "integer" },
  { slug: "icon", label: "Icon", type: "string" },
  { slug: "thumbnail", label: "Thumbnail", type: "image" },
  { slug: "cta_text", label: "CTA Text", type: "string" },
  { slug: "cta_link", label: "CTA Link", type: "string" },
];

const billboardExtraFields = [
  { slug: "order", label: "Order", type: "integer" },
  { slug: "icon", label: "Icon", type: "string" },
  { slug: "thumbnail", label: "Thumbnail", type: "image" },
  { slug: "cta_text", label: "CTA Text", type: "string" },
  { slug: "cta_link", label: "CTA Link", type: "string" },
];

const locationExtraFields = [
  { slug: "location", label: "Location Name", type: "string", required: true, searchable: true },
  { slug: "cta_text", label: "CTA Text", type: "string" },
  { slug: "cta_link", label: "CTA Link", type: "string" },
];

const supports = ["drafts", "revisions", "preview", "search", "seo"];

const collections = [
  {
    slug: "pages",
    label: "Pages",
    labelSingular: "Page",
    description: "Top-level marketing pages (home, about, contact, solutions index).",
    icon: "file",
    supports,
    fields: baseFields,
  },
  {
    slug: "solutions",
    label: "Solutions",
    labelSingular: "Solution",
    description: "Solution detail pages grouped by category.",
    icon: "sparkles",
    supports,
    fields: [...baseFields, ...solutionExtraFields],
  },
  {
    slug: "indoor_billboards",
    label: "Indoor Billboards",
    labelSingular: "Indoor Billboard Page",
    description: "Indoor billboard product pages.",
    icon: "monitor",
    supports,
    fields: [...baseFields, ...billboardExtraFields],
  },
  {
    slug: "locations",
    label: "Location Pages",
    labelSingular: "Location Page",
    description: "Location-specific landing pages.",
    icon: "map-pin",
    supports,
    fields: [...baseFields, ...locationExtraFields],
  },
];

// ---------------------------------------------------------------------------
// Content entries: [collectionSlug, routeSlug, file, extraDataKeys]
// ---------------------------------------------------------------------------

// pages collection
const pageEntries = [
  ["home", "home.json"],
  ["about-us", "about-us.json"],
  ["contact-us", "contact-us.json"],
  ["solutions", "solutions.json"],
];

// solutions collection (route slug = bare name; category drives the URL folder)
const solutionEntries = [
  ["design-services", "design-services.json"],
  ["google-business-profile", "google-business-profile.json"],
  ["social-media-management", "social-media-management.json"],
  ["website-design", "website-design.json"],
  ["pay-per-click", "pay-per-click.json"],
  ["social-media-advertising", "social-media-advertising.json"],
  ["connected-tv", "connected-tv.json"],
  ["display-geofencing", "display-geofencing.json"],
  ["streaming-audio", "streaming-audio.json"],
];

// indoor-billboards collection (note billboard-locations.json -> slug "locations")
const billboardEntries = [
  ["become-a-venue-partner", "become-a-venue-partner.json"],
  ["locations", "billboard-locations.json"],
  ["screen-advertising", "screen-advertising.json"],
];

// locations collection (slug == filename)
const locationEntries = [
  ["lakewood", "lakewood.json"],
  ["aurora", "aurora.json"],
  ["arvada", "arvada.json"],
  ["centennial", "centennial.json"],
];

/** Build a content entry from a page-style JSON file. */
function buildEntry(slug, raw, { extraKeys = [] } = {}) {
  const data = {
    title: raw.title,
    description: raw.description,
    sections: raw.sections ?? [],
    metadata: raw.metadata ?? {},
  };
  // extraKeys maps a snake_case field slug to the camelCase JSON source key.
  for (const [fieldSlug, jsonKey] of extraKeys) {
    if (raw[jsonKey] !== undefined) data[fieldSlug] = raw[jsonKey];
  }
  return {
    id: `${slug}`,
    slug,
    status: "published",
    data,
  };
}

const content = {
  pages: pageEntries.map(([slug, file]) =>
    buildEntry(slug, readJson(`pages/${file}`))
  ),
  solutions: solutionEntries.map(([slug, file]) =>
    buildEntry(slug, readJson(`pages/${file}`), {
      extraKeys: [
        ["category", "category"],
        ["order", "order"],
        ["icon", "icon"],
        ["thumbnail", "thumbnail"],
        ["cta_text", "ctaText"],
        ["cta_link", "ctaLink"],
      ],
    })
  ),
  indoor_billboards: billboardEntries.map(([slug, file]) =>
    buildEntry(slug, readJson(`pages/${file}`), {
      extraKeys: [
        ["order", "order"],
        ["icon", "icon"],
        ["thumbnail", "thumbnail"],
        ["cta_text", "ctaText"],
        ["cta_link", "ctaLink"],
      ],
    })
  ),
  locations: locationEntries.map(([slug, file]) =>
    buildEntry(slug, readJson(`locations/${file}`), {
      extraKeys: [
        ["location", "location"],
        ["cta_text", "ctaText"],
        ["cta_link", "ctaLink"],
      ],
    })
  ),
};

const seed = {
  $schema: "https://emdashcms.com/schema/seed.json",
  version: "1",
  meta: {
    name: "LinkToThrive content",
    description: "Migrated from static src/data JSON files.",
  },
  collections,
  content,
};

const outDir = resolve(root, ".emdash");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, "seed.json");
writeFileSync(outPath, JSON.stringify(seed, null, 2), "utf-8");

const counts = Object.entries(content)
  .map(([k, v]) => `${k}=${v.length}`)
  .join(", ");
console.log(`Wrote ${outPath}`);
console.log(`Collections: ${collections.length} | Content entries: ${counts}`);
