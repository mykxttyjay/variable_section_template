# Deployment: Vercel + EmDash CMS + Turso + Cloudinary

This site runs as a **server-rendered Astro app** on Vercel. Public marketing
pages are prerendered to static HTML at build time; the EmDash CMS (admin panel,
REST API, auth) runs on demand in a single Vercel serverless function.

- **CMS:** [EmDash](https://www.emdashcms.dev/) `0.16.x` (Astro integration, beta)
- **Database:** Turso / libSQL (`@libsql/client`)
- **Media storage:** S3-compatible backend for EmDash's media library, with
  Cloudinary as the optional public delivery/optimization layer
- **Admin panel:** `/_emdash/admin`

> EmDash is in beta. The `emdash` dependency is pinned to an exact version on
> purpose. Re-test the admin panel after any version bump.

---

## 1. Local development

```bash
bun install
bun run dev
```

On first boot the EmDash runtime auto-migrates the schema into a local SQLite
file (`data.db`, via the libSQL adapter — no native build needed). Then:

1. Open `http://localhost:4321/_emdash/admin`
2. Complete the setup wizard to create the first admin (passkey by default)
3. Build collections/content in the admin, or seed via the CLI

`.env` (gitignored) is created for you with a dev `EMDASH_ENCRYPTION_KEY` and a
local `file:./data.db` database. See `.env.example` for every variable.

### Useful scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `bun run dev`          | Dev server + admin at `/_emdash/admin`              |
| `bun run build`        | Production build (static pages + serverless `_render`) |
| `bun run cms:secret`   | Generate a new `EMDASH_ENCRYPTION_KEY`              |
| `bun run cms:types`    | Generate TS types from the live schema              |
| `bun run cms:doctor`   | Diagnose database health                            |
| `bun run cms:export-seed` | Export schema + content to a seed file           |

> The EmDash **CLI** (`cms:init`/`cms:seed`) only supports `better-sqlite3` for
> local `file:` DBs and is not used in our flow — the runtime handles migrations
> against libSQL automatically. `better-sqlite3` may fail to compile on Windows
> without Visual Studio C++ tools; that's expected and harmless here.

---

## 2. Turso database (production)

1. Create a database in [Turso](https://turso.tech/) and grab its URL + token:
   ```bash
   turso db create linktothrive
   turso db show linktothrive --url        # -> libsql://...turso.io
   turso db tokens create linktothrive     # -> auth token
   ```
2. Set in Vercel (see section 5):
   - `TURSO_DATABASE_URL=libsql://<db>-<org>.turso.io`
   - `TURSO_AUTH_TOKEN=<token>`

The schema is created/migrated automatically by the EmDash runtime on first
request. Sessions are also stored in this database (`astro_sessions` table) via
`src/lib/session-driver.mjs`.

---

## 3. Media storage (S3-compatible) + Cloudinary

EmDash's media library uploads via **signed URLs to an S3-compatible store**
(AWS S3, Cloudflare R2, MinIO, ...). Cloudinary is **not** S3-compatible, so it
can't be the upload target directly. The split we use:

- **Upload/origin:** an S3-compatible bucket (R2 recommended). Configure with
  `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`,
  `S3_REGION`.
- **Delivery/optimization (optional):** put Cloudinary in front for transforms,
  then point `S3_PUBLIC_URL` at the Cloudinary delivery URL so public asset URLs
  are optimized.

If no `S3_BUCKET`/`S3_ENDPOINT` is set, storage falls back to the local
filesystem (`.emdash/uploads`) — fine for dev, **not usable on Vercel** (no
persistent disk). Configure S3 before going live.

> Storage/DB selection lives in `src/lib/emdash.config.mjs`.

---

## 4. Encryption key (production)

Generate a dedicated production key (do not reuse the dev one):

```bash
bun run cms:secret
```

Set `EMDASH_ENCRYPTION_KEY` in Vercel. Losing it means losing every secret
encrypted with it (OAuth client secrets, API tokens, etc.).

---

## 5. Vercel environment variables

Set these for Production (and Preview if used):

```
EMDASH_ENCRYPTION_KEY      = emdash_enc_v1_...
TURSO_DATABASE_URL         = libsql://<db>-<org>.turso.io
TURSO_AUTH_TOKEN           = <token>
S3_ENDPOINT                = https://<account>.r2.cloudflarestorage.com
S3_BUCKET                  = <bucket>
S3_ACCESS_KEY_ID           = <key>
S3_SECRET_ACCESS_KEY       = <secret>
S3_REGION                  = auto
S3_PUBLIC_URL              = https://res.cloudinary.com/<cloud>/...   (optional)
PUBLIC_CLOUDINARY_CLOUD_NAME = <cloud>                                (optional)
```

Deploy as usual (Git integration or `vercel deploy`). The build emits:

- `.vercel/output/static/**` — prerendered marketing pages + assets
- `.vercel/output/functions/_render.func` — EmDash admin/API/auth (SSR)

---

## Architecture notes

- **`output: "server"`** is required for EmDash. Marketing pages opt back into
  static generation with `export const prerender = true` (already applied to
  `index`, `about-us`, `contact-us`, `privacy`, `terms`, `404`, `solutions`, and
  all `[slug]` routes). Add the same flag to new public pages to keep them fast.
- **Middleware:** EmDash auto-registers its own middleware via the integration.
  `src/middleware.ts` only adds the public-site security headers and skips them
  for `/_emdash/*`. Do **not** import `emdash/middleware` manually.
- **CSP:** `vercel.json` keeps the strict site CSP for everything except
  `/_emdash/*`, which gets a relaxed (and `noindex`) policy for the admin SPA.
- **Content today** still loads from `src/data/**` JSON imports. Migrating that
  content into EmDash collections (and switching pages to `getEmDashCollection`)
  is the next phase — the infrastructure is now in place for it.
```
