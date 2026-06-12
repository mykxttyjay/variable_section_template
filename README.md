# Variable Section Template - Modern Marketing Website

A production-ready Astro website with **server-side rendering (SSR)**, **real-time CMS**, and **high-performance optimizations**. Built for marketing agencies and dealerships managing multiple locations and dynamic content.

## ✨ Key Features

- ✅ **Server-Side Rendering (SSR)** - On-demand rendering via Vercel Edge Functions (no static generation)
- ✅ **EmDash CMS** - Real-time content management (no rebuilds, live updates)
- ✅ **Turso Database** - Edge-accessible libSQL with Vercel integration
- ✅ **20+ Section Components** - Pre-built: Hero, Features, FAQs, Forms, Services, CTAs, etc.
- ✅ **Performance Optimized** - Lighthouse 90+, LCP < 2.5s, CLS < 0.1 (Core Web Vitals)
- ✅ **Image Optimization** - Sharp + AVIF, lazy loading, 1-year caching
- ✅ **Dynamic Theming** - Real-time brand color updates from site.json
- ✅ **SEO Ready** - Structured data, meta tags, XML sitemap, Open Graph
- ✅ **Modern Design** - Glassmorphism, clip-path elements, smooth animations
- ✅ **Mobile-First** - Fully responsive with accessibility compliance
- ✅ **View Transitions** - SPA-like navigation between pages
- ✅ **TypeScript** - Full type safety throughout

## 🛠️ Quick Start

### Prerequisites
- Node.js 22.12.0 - 24.x
- Vercel account (for deployment)
- Turso account (for production database)

### Installation & Setup
```bash
# Install dependencies
npm install

# Generate EmDash encryption key (add to .env)
npm run cms:secret

# Initialize database
npm run cms:init

# Start development server
npm run dev
```

**Access:**
- Website: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/_emdash/admin`

### Build & Deploy
```bash
npm run build              # Local production build
git push origin main       # Auto-deploys to Vercel
```

## 📝 Content Management (EmDash CMS)

### No Rebuilds Required
Content updates are **live immediately** without rebuilding the site.

**Workflow:** Edit in Admin → Publish → Live

### Collections
| Collection | Purpose | Key Fields |
|-----------|---------|-----------|
| **Pages** | Homepage, about, contact | Title, description, sections, SEO |
| **Solutions** | Services (3 categories) | Category, icon, thumbnail, CTA |
| **Locations** | Location-specific pages | `{city}`, `{state}` token replacement |
| **Indoor Billboards** | Product pages | Icon, thumbnail, CTA, order |

### Admin Access
Navigate to `http://yoursite.com/_emdash/admin` to manage all content.

## 🎨 Customization

### Dynamic Theme Colors
Edit `src/data/settings/site.json` to instantly update brand colors (no rebuild):
```json
{
  "colors": {
    "primary": "#0D2A63",
    "primaryLight": "#F5BF3A",
    "secondary": "#00adb5"
  }
}
```

### Section Components
20+ pre-built components: Hero, Features, FAQs, Forms, Services, CTAs, Maps, and more.

### Design Features
- Modern clip-path elements & gradient backgrounds
- Glassmorphism effects with backdrop blur
- Scroll animations (desktop only, respects accessibility)

## 🌍 Routes

- `/solutions/[category]/[slug]` - Foundational, lead-gen, branding-awareness
- `/locations/[slug]` - Location-specific pages  
- `/indoor-billboards/[slug]` - Billboard products

## 📚 Tech Stack

- **Framework:** Astro 6 (SSR via Vercel)
- **CMS:** EmDash 0.16.1
- **Database:** Turso (libSQL)
- **Styling:** Tailwind CSS 4
- **Hosting:** Vercel Edge Functions
- **Language:** TypeScript 5.9.3
- **Node:** 22.12.0 - 24.x

## 📋 Available Commands

```bash
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview build
npm run cms:secret       # Generate encryption key
npm run cms:init         # Initialize CMS
npm run cms:seed         # Seed initial data
```

## 🚀 Deployment

### Set Environment Variables (Vercel)
```
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-auth-token
EMDASH_ENCRYPTION_KEY=your-key
```

### Deploy
```bash
git push origin main    # Auto-deploys to Vercel
```

**URLs:**
- Production: `https://www.linktothrive.com`
- Admin: `https://www.linktothrive.com/_emdash/admin`

## 🔗 Learn More

- [Full Documentation](./DOCUMENTATION.md)
- [Astro Docs](https://docs.astro.build)
- [EmDash CMS](https://emdash.dev)
- [Turso Database](https://turso.tech)
- [Vercel Docs](https://vercel.com/docs)

## ⚡ Performance Optimizations

**Core Web Vitals Targets:** LCP < 2.5s | FID < 100ms | CLS < 0.1 | Lighthouse 90+

**Key Techniques:**
- Image optimization (Sharp + AVIF, lazy loading, 1-year cache)
- Single CSS bundle (no code splitting, inlined styles)
- HTML compression & minification
- Browser/CDN caching (Vercel Edge)
- View Transitions (SPA-like navigation)
- Font strategy (`display: swap` prevents layout shift)
- Server-side rendering (on-demand)
- Mobile-first design (animations disabled on mobile)
- Security headers configured in vercel.json

**Monitor:** [Google PageSpeed Insights](https://pagespeed.web.dev)
