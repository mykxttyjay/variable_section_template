# Variable Section Template - Documentation

## Design Approach

- **Modern UI**: Angled/clipped elements, gradient backgrounds, glassmorphism effects
- **Component-Based**: 20+ reusable section components (Hero, ServicesGrid, Features, FAQs, Map, CTA, Forms, etc.)
- **Dynamic Sections**: JSON-based sections loaded from EmDash CMS at request time
- **SEO-Optimized**: JSON-LD structured data, auto-generated sitemaps, metadata management
- **Accessible**: ARIA labels, semantic HTML, respects `prefers-reduced-motion`, WCAG AA compliant

---

## Major Changes Made

1. **SSR Migration**: Switched from static site generation (SSG) to server-side rendering (SSR) via Vercel Edge Functions
   - Real-time content updates without rebuilds
   - Live preview in EmDash admin
   - Dynamic localization support

2. **EmDash CMS Integration**: Added headless CMS for real-time content management
   - 4 collections: Pages, Solutions, Indoor Billboards, Locations
   - No rebuild required for content changes

3. **Vercel Deployment**: Moved to serverless edge functions
   - Zero cold starts, global CDN, auto-scaling

4. **Turso Database**: Migrated to libSQL with local SQLite fallback
   - Edge-accessible database
   - Production: Turso, Development: Local SQLite

5. **Tailwind CSS 4 with Real-Time Theming**: Dynamic color synchronization from `site.json`
   - CSS variables auto-update without page reload

6. **Performance Optimizations**:
   - Single CSS bundle (no code splitting) for better compression
   - Image optimization with Sharp and AVIF
   - View transitions for SPA-like navigation
   - Lazy loading and request/response streaming

7. **Security Enhancements**: Middleware-based security headers (X-Frame-Options, CSP, etc.)

---

## EmDash Integration Process

### Setup
```bash
npm run cms:secret       # Generate encryption key → add to .env
npm run cms:init        # Initialize EmDash database
npm run cms:seed        # Optional: seed initial content
npm run dev             # Start dev server
# Access admin: http://localhost:3000/_emdash/admin
```

### Collections
- **Pages**: Homepage, about, contact with title, description, sections, metadata
- **Solutions**: Services with category (foundational, lead-gen, branding-awareness), icon, thumbnail, CTA
- **Indoor Billboards**: Similar to Solutions
- **Locations**: Location-specific pages with `{city}`, `{state}`, `{business}` token replacement

### Content Access
```typescript
const entry = await getEntry('_emdash', 'slug');
const entries = await getEntries('_emdash');
const localized = localizeData(entry.data); // Replaces {city}, {state}, {business}
```

### Section Rendering
Sections are JSON objects: `{ "section": "Hero", "order": 1, ...properties }`
- Each section type maps to a component: Hero → `<Hero />`, FAQs → `<FAQs />`, etc.

### Publishing Workflow
Draft → Preview → (Optional) Schedule → Publish → Live (no rebuild needed)

### Media Management
- Dev: Local filesystem (`.emdash/uploads/`)
- Prod: S3-compatible storage (AWS S3, Cloudflare R2, etc.)

---

## Performance Optimization Techniques

1. **Core Web Vitals Targets**:
   - LCP < 2.5s, FID < 100ms, CLS < 0.1
   - Lighthouse 90+ (Performance, Accessibility, Best Practices, SEO)

2. **CSS Optimization**:
   - Single monolithic bundle (no code splitting) for fewer requests + better compression
   - Inlined into HTML response
   - Scoped styles with `:where()` (zero specificity)
   - Dynamic theme colors via CSS variables

3. **Image Optimization**:
   - Sharp service with AVIF conversion
   - Lazy loading for below-the-fold images
   - 1-year immutable cache headers for hash-based filenames

4. **Font Strategy**:
   - Google Fonts with `display: swap` for fast fallbacks
   - Preloading to start download early

5. **Lazy Loading**: Native browser lazy loading + dynamic imports for heavy components

6. **View Transitions**: SPA-like navigation without full page reloads

7. **Request/Response Streaming**: Progressive HTML rendering via Vercel

8. **HTML Compression**: Minified output

9. **Caching Strategy**:
   - Browser: 1-year for static assets (via hash-based filenames)
   - Vercel CDN: Global edge caching
   - Server: Dynamic content caching

10. **Animation Optimization**:
    - Mobile: No animations (lower performance)
    - Desktop: Scroll-triggered with staggered delays
    - Respects `prefers-reduced-motion`

---

## Deployment Notes

### Platform: Vercel

**Why**: Native Astro support, edge functions for SSR, global CDN, automatic git deployments, built-in security headers

### Configuration

**astro.config.mjs**:
```javascript
adapter: vercel({ webAnalytics: { enabled: true } })
```

**vercel.json**:
- Routes: Public pages → SSR, static assets (_astro/, images, fonts) → CDN (1-year cache)
- Redirects: `link-to-thrive-seven.vercel.app` → `www.linktothrive.com`
- Security Headers: X-Content-Type-Options, X-Robots-Tag, CSP, Referrer-Policy

### Environment Variables (Production)
```
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
EMDASH_ENCRYPTION_KEY=your-key
S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY (optional)
```

### Database Setup (Turso)
```bash
turso db create linktothrive
turso db tokens create linktothrive
turso db show linktothrive --http  # Get connection string
npm run cms:init                   # Create schema
```

### Deployment Process
```bash
npm run build              # Local build → outputs .vercel/output/
git push origin main       # Vercel webhook triggers build automatically
# Or manual: vercel deploy
```

### Deployment URLs
- Production: `https://www.linktothrive.com`
- Preview: `https://[branch]---[project].vercel.app`

### Notable Steps
1. DNS: Point domain to Vercel (CNAME or nameservers)
2. SSL/TLS: Auto-provisioned (Let's Encrypt)
3. Security Headers: Set in vercel.json, applied at edge
4. EmDash Admin: Create strong admin password at `/_emdash/admin` post-deployment
5. Monitoring: Vercel analytics + Google PageSpeed Insights for Core Web Vitals

### Troubleshooting
| Issue | Solution |
|-------|----------|
| EmDash admin not loading | Ensure `@astrojs/react` in astro.config |
| Database connection error | Verify TURSO_DATABASE_URL format |
| Media uploads fail | Add S3_* environment variables |
| Deployment fails | Check Vercel logs, verify env vars, test `npm run build` locally |

### Rollback
```bash
vercel ls                  # View deployments
vercel rollback --yes      # Rollback to previous
# Or via Vercel Dashboard: Deployments → Click previous → "Promote to Production"
```

---

**Stack**: Astro 6, Tailwind CSS 4, EmDash CMS, Turso, Vercel, Node 22.12.0+
