# Variable Section Template - Astro Dealer Website

A modern, production-ready Astro website with server-side rendering (SSR) and integrated EmDash CMS for real-time content management. Built for performance, SEO, and seamless content updates.

## 🚀 Features

- ✅ **Server-Side Rendering (SSR)** - On-demand rendering via Vercel Edge Functions
- ✅ **EmDash CMS Integration** - Real-time content management with Turso/libSQL database (no rebuild required)
- ✅ **Modern UI Design** - Clip-path styling, gradient backgrounds, glassmorphism effects
- ✅ **Dynamic Content Management** - Manage solutions, locations, billboards, and pages via CMS
- ✅ **Real-Time Theming** - Dynamic color updates from site.json with CSS variables
- ✅ **SEO Optimized** - Structured data, meta tags, Open Graph, XML sitemap, breadcrumbs
- ✅ **View Transitions** - SPA-like navigation without full page reloads
- ✅ **Responsive Design** - Mobile-first approach with full accessibility
- ✅ **Tailwind CSS 4** - Dynamic theming with real-time color sync
- ✅ **TypeScript** - Full type safety across the project
- ✅ **Performance Optimized** - Lighthouse 90+, Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- ✅ **Admin Dashboard** - EmDash admin at `/_emdash/admin`
- ✅ **Vercel Deployment** - Optimized for serverless with Edge caching

## 📁 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/                  # UI components (Header, Footer, PopupModal, etc.)
│   │   ├── sections/            # Page section components (Hero, Features, Services, etc.)
│   │   └── seo/                 # SEO components (StructuredData, Meta tags)
│   ├── pages/                   # Dynamic routes (solutions, locations, billboards)
│   ├── layouts/                 # Page layouts (PageLayout, BaseLayout)
│   ├── lib/
│   │   ├── emdash.config.mjs    # EmDash CMS configuration
│   │   ├── content.ts           # Content utility functions
│   │   └── session-driver.mjs   # Astro session management
│   ├── data/
│   │   ├── pages/               # Static page data (JSON)
│   │   ├── settings/            # Site configuration and theme colors
│   │   └── media/               # Media assets
│   ├── config/                  # Site configuration
│   ├── styles/                  # Global CSS with theme variables
│   └── middleware.ts            # EmDash authentication middleware
├── .emdash/
│   └── seed.json                # EmDash database seed data
├── scripts/                     # Utility scripts for EmDash
│   ├── apply-seed.mjs
│   ├── generate-seed.mjs
│   └── check-state.mjs
├── public/                      # Static assets
├── astro.config.mjs             # Astro configuration with EmDash setup
├── tailwind.config.cjs          # Tailwind CSS configuration
└── vercel.json                  # Vercel deployment configuration
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 22.12.0 - 24.x
- npm or yarn
- Turso account (for production)
- Vercel account (for deployment)

### Installation

```bash
npm install

# Generate EmDash encryption key
npm run cms:secret
# Copy output to .env as EMDASH_ENCRYPTION_KEY

# Initialize EmDash database
npm run cms:init

# Start development server
npm run dev
```

**Access:**
- Website: `http://localhost:3000`
- EmDash Admin: `http://localhost:3000/_emdash/admin`

### Build & Deploy

```bash
npm run build    # Local build → .vercel/output/
git push         # Auto-deploys to Vercel
```

## 📝 Content Management

### EmDash CMS - No Rebuilds Required

Content updates are **live immediately** without rebuild:

1. Navigate to `http://localhost:3000/_emdash/admin` (dev) or `https://yourdomain.com/_emdash/admin` (prod)
2. Edit content in collections
3. Publish → Changes appear instantly on live site

### Collections

| Collection | Purpose | Features |
|-----------|---------|----------|
| **Pages** | Homepage, about, contact | Title, description, sections, SEO metadata |
| **Solutions** | Services with 3 categories | Category, icon, thumbnail, CTA, order |
| **Locations** | Location-specific pages | `{city}`, `{state}`, `{business}` token replacement |
| **Indoor Billboards** | Billboard products | Icon, thumbnail, CTA, order |

### Dynamic Token Replacement

All content supports auto-replacement:
- `{city}` → Denver
- `{state}` → Colorado  
- `{business}` → LinktoThrive

Perfect for location-based landing pages.

### Publishing Workflow

Draft → Preview → (Optional) Schedule → Publish → **Live**

## 🎨 Design & Customization

### Real-Time Theme Colors

Edit `src/data/settings/site.json` to update colors instantly (no rebuild):

```json
{
  "colors": {
    "primary": "#4A8D2A",
    "primaryLight": "#7CB342",
    "primaryDark": "#2D5016",
    "secondary": "#FFB81C",
    "neutral": "#F9F9F7"
  }
}
```

CSS variables auto-sync via Vite plugin.

### Section Components (20+)

Flexible, reusable components for content:
- **Hero**, **ServicesGrid**, **Features**, **FeaturesWithImage**
- **ContentWithImage**, **ContentWithKeypoints**, **FAQs**, **MapSection**
- **CallToAction**, **TeamSection**, **FormSection**, **ClientShowcase**
- And more...

### Key Design Features

- **Angled/Clipped Elements** - Modern geometric styling
- **Gradient Backgrounds** - Visual hierarchy with brand colors
- **Glassmorphism** - Backdrop filters for premium feel
- **Animations** - Scroll-triggered on desktop, disabled on mobile (accessibility)

## 🌍 Routes

- `/solutions/[category]/[slug]` - Foundational, lead-gen, branding-awareness
- `/locations/[slug]` - Location-specific pages  
- `/indoor-billboards/[slug]` - Billboard products

## 📚 Tech Stack

- **Framework:** Astro 6.0.8 (SSR via Vercel)
- **CMS:** EmDash 0.16.1 (real-time content management)
- **Database:** Turso (libSQL) + SQLite (dev)
- **Styling:** Tailwind CSS 4.3.0 with dynamic theming
- **Hosting:** Vercel (serverless Edge Functions)
- **Language:** TypeScript 5.9.3
- **Image Optimization:** Sharp 0.34.5
- **UI:** React 19 (EmDash admin only)
- **Icons:** Astro Icon
- **Sitemap:** @astrojs/sitemap
- **Node:** 22.12.0 - 24.x

## 📄 Available Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build locally
npm run cms:secret       # Generate encryption key
npm run cms:init         # Initialize EmDash
npm run cms:seed         # Seed initial data
npm run cms:export       # Export content
```

## 📖 Learn More

See [DOCUMENTATION.md](./DOCUMENTATION.md) for complete technical details on design approach, major changes, EmDash integration, performance optimization, and deployment.

- [Astro Docs](https://docs.astro.build)
- [EmDash Docs](https://emdash.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Turso](https://turso.tech)
- [Vercel](https://vercel.com/docs)

## 🚀 Deployment on Vercel

### Environment Variables

**Required** (set in Vercel):
```
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-auth-token
EMDASH_ENCRYPTION_KEY=your-encryption-key
```

**Optional** (S3 media storage):
```
S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY
```

### Setup Turso Database

```bash
turso db create linktothrive
turso db tokens create linktothrive
turso db show linktothrive --http  # Get connection string
npm run cms:init                   # Create schema in Turso
```

### Deploy

```bash
git push origin main  # Vercel webhook auto-deploys
# Or manual: vercel deploy
```

### URLs

- **Production**: `https://www.linktothrive.com`
- **Admin**: `https://www.linktothrive.com/_emdash/admin`
- **Preview**: `https://[branch]---[project].vercel.app`

### Security Headers

Configured in `vercel.json`:
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- CSP for public pages, relaxed CSP for admin
- Admin routes: noindex, nofollow

## ⚡ Performance Optimizations

### Core Targets

- **Lighthouse**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **LCP**: < 2.5s | **FID**: < 100ms | **CLS**: < 0.1

### Key Techniques

1. **Single CSS Bundle** - No code splitting for better compression
2. **Image Optimization** - Sharp service with AVIF conversion and lazy loading
3. **Dynamic Imports** - Heavy components loaded on-demand
4. **Font Strategy** - Preloading with `display: swap`
5. **View Transitions** - SPA-like navigation without full reloads
6. **Request/Response Streaming** - Progressive HTML rendering
7. **1-Year Caching** - Static assets cached with hash-based filenames
8. **Mobile-First Animations** - No animations on mobile, scroll-triggered on desktop

### Monitoring

Use [Google PageSpeed Insights](https://pagespeed.web.dev) for real-world Core Web Vitals.

## 📄 License & Support

MIT License. For issues or detailed documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md).
