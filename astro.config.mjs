// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { readingTimeRemarkPlugin } from "./src/lib/frontmatter";
import configIntegration from "./vendor/integration/index";
import icon from "astro-icon";
import { EnumChangefreq } from "sitemap";
import vercel from "@astrojs/vercel";
import emdash from "emdash/astro";
import react from "@astrojs/react";
import { emdashDatabase, emdashStorage } from "./src/lib/emdash.config.mjs";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import { fileURLToPath } from "url";
import { unified } from "@astrojs/markdown-remark";
const siteJsonAbsolute = resolve("./src/data/settings/site.json");
const siteData = JSON.parse(readFileSync(siteJsonAbsolute, "utf-8"));

/**
 * Post-build integration: strip style hashes from CSP meta tags.
 * Astro auto-adds sha256 hashes for inline <style> blocks, which causes
 * 'unsafe-inline' to be ignored per the CSP spec. This removes the hashes
 * so 'unsafe-inline' works for style attributes set via JS/HTML.
 */
function stripCspStyleHashes() {
  return /** @type {import('astro').AstroIntegration} */ ({
    name: "strip-csp-style-hashes",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const distPath = fileURLToPath(dir);
        const htmlFiles = [];

        function walk(/** @type {string} */ d) {
          for (const entry of readdirSync(d)) {
            const full = join(d, entry);
            if (statSync(full).isDirectory()) walk(full);
            else if (entry.endsWith(".html")) htmlFiles.push(full);
          }
        }

        walk(distPath);

        for (const file of htmlFiles) {
          let html = readFileSync(file, "utf-8");
          // Replace style-src directive: keep 'self' and 'unsafe-inline', strip all sha256 hashes
          const updated = html.replace(
            /style-src\s+'self'\s+'unsafe-inline'(?:\s+'sha256-[A-Za-z0-9+/=]+')+/g,
            "style-src 'self' 'unsafe-inline'"
          );
          if (updated !== html) {
            writeFileSync(file, updated, "utf-8");
          }
        }
      },
    },
  });
}

// Helper: adjust a hex color by a factor (same logic as ThemeProvider)
function adjustColor(/** @type {string} */ hex, /** @type {number} */ factor) {
  const h = hex.replace("#", "");
  const r = Math.min(
    255,
    Math.max(0, Math.round(parseInt(h.substring(0, 2), 16) * factor))
  );
  const g = Math.min(
    255,
    Math.max(0, Math.round(parseInt(h.substring(2, 4), 16) * factor))
  );
  const b = Math.min(
    255,
    Math.max(0, Math.round(parseInt(h.substring(4, 6), 16) * factor))
  );
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Reads site.json fresh (never cached) for dev server hot reload
function getThemeColors() {
  const fresh = JSON.parse(readFileSync(siteJsonAbsolute, "utf-8"));
  const c = fresh.colors || {};
  const p = c.primary || "#0D2A63";
  const s = c.secondary || "#F5BF3A";
  const t = c.tertiary || adjustColor(s, 0.85);
  const q = c.quaternary || "#ffffff";
  return {
    primary: p,
    primaryDark: c.primaryDark || adjustColor(p, 0.6),
    primaryLight: c.primaryLight || s,
    neutral: q,
    primaryDarker: c.primaryDarker || adjustColor(p, 0.35),
    primaryLighter: c.primaryLighter || adjustColor(s, 1.2),
    eyebrow: c.eyebrow || adjustColor(t, 0.45),
    neutralDark: c.neutralDark || adjustColor(q, 0.9),
    neutralDarker: c.neutralDarker || adjustColor(q, 0.8),
  };
}

function applyThemeColors(/** @type {string} */ code) {
  const tc = getThemeColors();
  return code
    .replace(/--color-primary-dark:\s*#[0-9a-fA-F]+/g, `--color-primary-dark: ${tc.primaryDark}`)
    .replace(/--color-primary:\s*#[0-9a-fA-F]+/g, `--color-primary: ${tc.primary}`)
    .replace(/--color-primary-light:\s*#[0-9a-fA-F]+/g, `--color-primary-light: ${tc.primaryLight}`)
    .replace(/--color-neutral:\s*#[0-9a-fA-F]+/g, `--color-neutral: ${tc.neutral}`)
    .replace(/--color-eyebrow:\s*#[0-9a-fA-F]+/g, `--color-eyebrow: ${tc.eyebrow}`)
    .replace(/--color-primary-darker:\s*#[0-9a-fA-F]+/g, `--color-primary-darker: ${tc.primaryDarker}`)
    .replace(/--color-primary-lighter:\s*#[0-9a-fA-F]+/g, `--color-primary-lighter: ${tc.primaryLighter}`)
    .replace(/--color-neutral-dark:\s*#[0-9a-fA-F]+/g, `--color-neutral-dark: ${tc.neutralDark}`)
    .replace(/--color-neutral-darker:\s*#[0-9a-fA-F]+/g, `--color-neutral-darker: ${tc.neutralDarker}`)
    .replace(/--color-primary-50:\s*#[0-9a-fA-F]+/g, `--color-primary-50: ${tc.neutral}`);
}

/**
 * Vite plugin: syncs site.json brand colors into @theme at build + dev time.
 * Watches site.json and invalidates all CSS modules so Tailwind re-processes
 * the @theme block with fresh colors on every save ΓÇö no restart needed.
 */
function themeColorsPlugin() {
  return {
    name: "site-theme-colors",
    enforce: /** @type {const} */ ("pre"),
    configureServer(/** @type {import("vite").ViteDevServer} */ server) {
      server.watcher.add(siteJsonAbsolute);
      server.watcher.on("change", /** @param {string} changedPath */ (changedPath) => {
        const norm = changedPath.replace(/\\/g, "/");
        if (!norm.endsWith("data/settings/site.json")) return;
        // Invalidate ALL modules ΓÇö site.json, site.ts, config.ts,
        // every .astro component, and all CSS so everything re-reads fresh data
        for (const [, mods] of server.moduleGraph.fileToModulesMap) {
          for (const mod of mods) {
            server.moduleGraph.invalidateModule(mod);
          }
        }
        // Full reload so Astro SSR re-renders all pages with fresh siteConfig
        server.hot.send({ type: "full-reload" });
      });
    },
    transform(/** @type {string} */ code, /** @type {string} */ id) {
      const norm = id.replace(/\\/g, "/");
      if (!norm.includes("styles/global.css")) return;
      return applyThemeColors(code);
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: siteData.seo?.siteUrl || "https://www.linktothrive.com",
  adapter: vercel({
    webAnalytics: {
      enabled: process.env.NODE_ENV === "production",
    },
  }),
  // CSP is set via vercel.json headers to avoid Astro auto-hashing
  // (auto-hashes cause 'unsafe-inline' to be ignored per CSP spec)
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Poppins",
      cssVariable: "--font-poppins",
      fallbacks: ["system-ui", "sans-serif"],
      optimizedFallbacks: true,
      display: "swap",
      weights: ["300", "400", "500", "600", "700", "800"],
      styles: ["normal", "italic"],
    },
  ],
  integrations: [
    mdx(),
    icon(),
    sitemap({
      lastmod: new Date(),
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        // Homepage ΓÇö highest priority, crawled daily
        if (/\/$/.test(item.url) && !item.url.replace(/https?:\/\/[^/]+/, "").replace(/\/$/, "")) {
          return { ...item, changefreq: EnumChangefreq.DAILY, priority: 1.0 };
        }
        // Location pages
        if (item.url.includes("/locations/")) {
          return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 0.9 };
        }
        // Solution pages (lead-gen, branding-awareness, foundational)
        if (item.url.includes("/solutions/")) {
          return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 0.8 };
        }
        // Indoor billboards pages
        if (item.url.includes("/indoor-billboards/")) {
          return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 0.8 };
        }
        // About, Contact
        if (item.url.includes("/about-us") || item.url.includes("/contact-us")) {
          return { ...item, changefreq: EnumChangefreq.MONTHLY, priority: 0.7 };
        }
        // Privacy, Terms ΓÇö low priority
        if (item.url.includes("/privacy") || item.url.includes("/terms")) {
          return { ...item, changefreq: EnumChangefreq.YEARLY, priority: 0.3 };
        }
        return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 0.7 };
      },
    }),
    configIntegration(),
    // React renderer required by EmDash's admin panel (TipTap, react-query, etc.)
    react(),
    emdash({
      database: emdashDatabase(),
      storage: emdashStorage(),
    }),
    stripCspStyleHashes(),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },
  build: {
    inlineStylesheets: "always",
    assets: "_astro",
  },
  scopedStyleStrategy: "where",
  compressHTML: true,
  // EmDash (admin panel, REST API, live content) requires on-demand rendering.
  // Individual marketing pages can still opt back into prerendering with
  // `export const prerender = true` once their content is sourced statically.
  output: "server",
  // EmDash auth uses Astro sessions. The Vercel adapter does not provide a
  // default session driver, so we store sessions in the same Turso/libSQL DB.
  // Object form (Astro v6+): entrypoint is an absolute path to our custom driver.
  session: {
    driver: {
      entrypoint: fileURLToPath(
        new URL("./src/lib/session-driver.mjs", import.meta.url)
      ),
    },
  },
  vite: {
    plugins: [themeColorsPlugin(), tailwindcss()],
    resolve: {
      alias: {
        "~": "/src",
      },
    },
    build: {
      cssCodeSplit: false, // Bundle all CSS into one file to reduce render blocking
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === "UNUSED_EXTERNAL_IMPORT" &&
            warning.message?.includes("@astrojs/internal-helpers/remote")
          ) {
            return;
          }

          warn(warning);
        },
      },
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      syntaxHighlight: false,
    }),
  },
});
