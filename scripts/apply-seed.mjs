// =============================================================================
// Apply .emdash/seed.json to the configured database (Turso/libSQL).
// =============================================================================
// The EmDash CLI `seed` command only supports better-sqlite3 for local files,
// and the runtime auto-seed only runs on an EMPTY database. Our Turso DB already
// has the schema, so we apply the seed directly through EmDash's `applySeed()`
// using a libSQL-backed Kysely instance — the same dialect the runtime uses.
//
// Usage:
//   node --env-file=.env scripts/apply-seed.mjs            (skip → update existing)
//   node --env-file=.env scripts/apply-seed.mjs --conflict=update
//
// Content is always included. Default conflict strategy is "update" so re-runs
// keep the DB in sync with the JSON source during the migration phase.
// =============================================================================

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { applySeed, validateSeed } from "emdash/seed";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const conflictArg =
  process.argv.find((a) => a.startsWith("--conflict="))?.split("=")[1] || "update";

const seedPath = resolve(root, ".emdash", "seed.json");
const seed = JSON.parse(readFileSync(seedPath, "utf-8"));

const validation = validateSeed(seed);
if (!validation.valid) {
  console.error("Seed is invalid:\n" + validation.errors.join("\n"));
  process.exit(1);
}

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error("TURSO_DATABASE_URL is not set. Run with: node --env-file=.env scripts/apply-seed.mjs");
  process.exit(1);
}

const db = new Kysely({
  dialect: new LibsqlDialect({ url, authToken: process.env.TURSO_AUTH_TOKEN }),
});

console.log(`Applying seed to ${new URL(url).host} (onConflict=${conflictArg})...`);

try {
  const result = await applySeed(db, seed, {
    includeContent: true,
    onConflict: conflictArg,
    // Content keeps {city}/{state}/{business} placeholders and external image
    // URLs/paths as-is; no media download/storage needed at seed time.
    skipMediaDownload: true,
  });

  console.log("\nSeed applied:");
  console.log("  collections:", JSON.stringify(result.collections));
  console.log("  fields:     ", JSON.stringify(result.fields));
  if (result.content) console.log("  content:    ", JSON.stringify(result.content));
  console.log("\nDone. ✅");
} catch (err) {
  console.error("\nFailed to apply seed:");
  console.error(err);
  process.exitCode = 1;
} finally {
  await db.destroy();
}
