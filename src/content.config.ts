// =============================================================================
// Content collections
// =============================================================================
// All page content now lives in the EmDash CMS (Turso/libSQL) and is queried
// at request time. The EmDash *live* collection is registered separately in
// `src/live.config.ts` (Astro requires live collections in that file).
//
// No build-time `data`/`content` collections remain — the previous static
// collections (solutions, indoor-billboards, pages, locations) were migrated
// into EmDash collections of the same names. See scripts/generate-seed.mjs.
// =============================================================================

export const collections = {};
