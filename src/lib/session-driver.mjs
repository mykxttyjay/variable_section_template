// =============================================================================
// Astro session driver backed by Turso / libSQL
// =============================================================================
// The Vercel adapter does NOT auto-configure a session storage driver, and
// Vercel serverless functions have no persistent filesystem — so the default
// `fs` driver cannot be used for admin auth sessions.
//
// This driver stores Astro sessions in the SAME Turso/libSQL database the CMS
// uses. It is intentionally self-contained and reads connection details from
// environment variables at runtime (TURSO_DATABASE_URL / TURSO_AUTH_TOKEN),
// so nothing non-serializable is passed through Astro's session config.
//
// Configured in astro.config.mjs:
//   session: { driver: "./src/lib/session-driver.mjs" }
// =============================================================================

import { createClient } from "@libsql/client";
import { defineDriver } from "unstorage";

const DRIVER_NAME = "libsql-session";
const TABLE = "astro_sessions";

let clientPromise;

/** Lazily create (once) the libSQL client and ensure the session table exists. */
async function getClient() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const url = process.env.TURSO_DATABASE_URL || "file:./data.db";
      const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
      const client = createClient({ url, authToken });
      await client.execute(
        `CREATE TABLE IF NOT EXISTS ${TABLE} (key TEXT PRIMARY KEY, value TEXT NOT NULL)`
      );
      return client;
    })();
  }
  return clientPromise;
}

export default defineDriver(() => {
  return {
    name: DRIVER_NAME,

    async hasItem(key) {
      const db = await getClient();
      const res = await db.execute({
        sql: `SELECT 1 FROM ${TABLE} WHERE key = ? LIMIT 1`,
        args: [key],
      });
      return res.rows.length > 0;
    },

    async getItem(key) {
      const db = await getClient();
      const res = await db.execute({
        sql: `SELECT value FROM ${TABLE} WHERE key = ? LIMIT 1`,
        args: [key],
      });
      return res.rows.length > 0 ? res.rows[0].value : null;
    },

    async setItem(key, value) {
      const db = await getClient();
      await db.execute({
        sql: `INSERT INTO ${TABLE} (key, value) VALUES (?, ?)
              ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
        args: [key, value],
      });
    },

    async removeItem(key) {
      const db = await getClient();
      await db.execute({ sql: `DELETE FROM ${TABLE} WHERE key = ?`, args: [key] });
    },

    async getKeys(base) {
      const db = await getClient();
      const prefix = base ? `${base}%` : "%";
      const res = await db.execute({
        sql: `SELECT key FROM ${TABLE} WHERE key LIKE ?`,
        args: [prefix],
      });
      return res.rows.map((r) => r.key);
    },

    async clear(base) {
      const db = await getClient();
      const prefix = base ? `${base}%` : "%";
      await db.execute({ sql: `DELETE FROM ${TABLE} WHERE key LIKE ?`, args: [prefix] });
    },
  };
});
