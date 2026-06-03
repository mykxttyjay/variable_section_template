import { defineMiddleware } from "astro:middleware";

// NOTE: EmDash registers its own middleware automatically via the Astro
// integration (emdash/middleware, .../auth, .../setup, .../request-context),
// all with order: "pre". We must NOT add `emdash/middleware` here too, or the
// CMS runtime would initialize twice per request. This file only adds the
// site's security headers on top of EmDash's middleware chain.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Don't impose the public-site security headers on EmDash admin/API routes.
  // The admin uses iframes for preview (X-Frame-Options: DENY would break it)
  // and must never be indexed. CSP/robots for /_emdash are handled in vercel.json.
  if (context.url.pathname.startsWith("/_emdash")) {
    return response;
  }

  // Security headers for Best Practices score.
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );
  response.headers.set("X-Robots-Tag", "index, follow");

  return response;
});
