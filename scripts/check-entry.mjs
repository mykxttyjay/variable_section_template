import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const r = await client.execute("SELECT slug, title, status, sections, metadata FROM ec_pages WHERE slug = 'home'");
const row = r.rows[0];
console.log("slug:", row.slug);
console.log("title:", row.title);
console.log("status:", row.status);
const sections = JSON.parse(row.sections);
console.log("sections count:", sections.length);
console.log("section types:", sections.map((s) => s.section).join(", "));
console.log("first section keys:", Object.keys(sections[0]).join(", "));
const meta = JSON.parse(row.metadata);
console.log("metadata keys:", Object.keys(meta).join(", "));

// solutions: check category preserved
const s = await client.execute("SELECT slug, category, cta_text FROM ec_solutions WHERE slug = 'website-design'");
console.log("\nsolutions/website-design category:", s.rows[0].category, "| cta_text:", s.rows[0].cta_text);

// locations: check location field
const l = await client.execute("SELECT slug, location FROM ec_locations WHERE slug = 'lakewood'");
console.log("locations/lakewood location:", l.rows[0].location);

client.close();
