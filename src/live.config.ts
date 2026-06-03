// =============================================================================
// Live content collections (Astro)
// =============================================================================
// Live collections are queried at request time (not built ahead of time), which
// is exactly what we need so edits in the EmDash admin reflect on the site
// immediately. Astro requires live collections to live in `src/live.config.ts`.
//
// The `_emdash` collection is backed by EmDash's loader; query it via the
// `getEmDashCollection()` / `getEmDashEntry()` helpers (see src/lib/content.ts).
// =============================================================================

import { defineLiveCollection } from "astro:content";
import { emdashLoader } from "emdash/runtime";

const _emdash = defineLiveCollection({
  loader: emdashLoader(),
});

export const collections = {
  _emdash,
};
