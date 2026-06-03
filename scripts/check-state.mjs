import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const cols = await client.execute("SELECT slug, label FROM _emdash_collections ORDER BY slug");
console.log("Collections:", cols.rows.length);
for (const r of cols.rows) console.log("  -", r.slug, "|", r.label);

const fields = await client.execute("SELECT COUNT(*) AS n FROM _emdash_fields");
console.log("Fields total:", fields.rows[0].n);

// Content tables are named ec_<slug>; check each
for (const r of cols.rows) {
  const table = `ec_${String(r.slug).replace(/-/g, "_")}`;
  try {
    const c = await client.execute(`SELECT COUNT(*) AS n FROM ${table}`);
    console.log(`  ${table}: ${c.rows[0].n} rows`);
  } catch (e) {
    console.log(`  ${table}: (no table) ${e.message}`);
  }
}

client.close();
