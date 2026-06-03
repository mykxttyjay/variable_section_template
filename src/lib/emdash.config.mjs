// =============================================================================
// EmDash CMS configuration
// =============================================================================
// Centralizes the EmDash integration setup so astro.config.mjs stays readable.
// - Database: Turso / libSQL (file URL in dev, libsql:// in production)
// - Storage:  S3-compatible media backend when configured, else local FS in dev
// =============================================================================

import { libsql } from "emdash/db";
import { s3, local } from "emdash/astro";

/**
 * Build the database descriptor from environment.
 * Local dev defaults to a SQLite file; production uses Turso (libsql://).
 */
export function emdashDatabase() {
  const url = process.env.TURSO_DATABASE_URL || "file:./data.db";
  const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
  return libsql({ url, authToken });
}

/**
 * Build the media storage descriptor from environment.
 *
 * If an S3 bucket is configured we use the S3-compatible adapter (AWS S3,
 * Cloudflare R2, MinIO, etc.). Remaining S3_* fields are resolved from env at
 * runtime by the adapter. Otherwise we fall back to local filesystem storage,
 * which is fine for development but does NOT support signed upload URLs.
 */
export function emdashStorage() {
  const hasS3 = Boolean(process.env.S3_BUCKET && process.env.S3_ENDPOINT);
  if (hasS3) {
    // Explicit values take precedence; anything omitted is read from S3_* env.
    return s3({
      publicUrl: process.env.S3_PUBLIC_URL || undefined,
    });
  }
  return local({
    directory: "./.emdash/uploads",
    baseUrl: "/_emdash/api/media/file",
  });
}
