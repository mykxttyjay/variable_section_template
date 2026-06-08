# Variable Section Template - Astro Dealer Website

A modern, fully-redesigned Astro website with integrated EmDash CMS for dealer management and content operations. Built with performance, SEO, and content management in mind.

## 🚀 Features

- ✅ **EmDash CMS Integration** - Turso/libSQL database with live content management
- ✅ **Modern UI Design** - Complete visual redesign with clip-path styling and gradient backgrounds
- ✅ **Dynamic Content Management** - Manage solutions, locations, indoor billboards, and pages via CMS
- ✅ **View Transitions** - Instant page navigation (SPA-like experience)
- ✅ **SEO Optimized** - Structured data, meta tags, Open Graph, XML sitemap, breadcrumbs
- ✅ **Responsive Design** - Mobile-first approach with full responsiveness
- ✅ **Tailwind CSS 4** - Modern styling with Tailwind CSS v4
- ✅ **TypeScript** - Full type safety across the project
- ✅ **Performance Optimized** - Lighthouse scores 90+, Core Web Vitals optimized
- ✅ **Admin Dashboard** - EmDash admin interface at `/_emdash/admin`
- ✅ **Vercel Deployment** - Optimized for Vercel with Edge functions

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

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321`

**Access EmDash Admin Dashboard**: `http://localhost:4321/_emdash/admin`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📝 Content Management via EmDash CMS

### Access the Admin Dashboard

1. Navigate to `http://localhost:4321/_emdash/admin` (or your production URL)
2. Login with your EmDash credentials
3. Manage content through the intuitive admin interface

### Editable Content Collections

The website manages the following content types through EmDash:

- **Pages**: Homepage, About Us, Contact Us, Solutions Index
- **Solutions**: Dynamic solution pages (Foundational, Lead Generation, Branding Awareness)
- **Indoor Billboards**: Dynamic billboard location pages
- **Locations**: Dynamic location pages (Denver area)
- **Settings**: Global site configuration

### Content Fields

Each page/collection entry includes:

- **Title & Description**: Page heading and SEO description
- **Hero Content**: Hero section with title, subtitle, image, CTA
- **Sections**: Dynamic sections including:
  - Features with images
  - Service grids
  - FAQs
  - Testimonials
  - Call-to-action blocks
- **SEO Metadata**: 
  - Meta title & description
  - Open Graph image
  - Keywords
  - Canonical URL

### Content Update Workflow

1. Edit content in EmDash admin
2. Add or update media assets
3. Configure SEO metadata
4. Preview changes
5. Publish
6. Site rebuilds automatically (Vercel webhook)

## 🎨 Design System

### Color Palette

The site uses a configurable color system via `src/data/settings/site.json`:

```json
{
  "colors": {
    "primary": "#006E72",           // Teal/Green
    "primaryLight": "#00A5AD",      // Lighter Teal
    "primaryDark": "#00443E",       // Dark Teal
    "secondary": "#FFB81C",         // Accent Yellow
    "neutral": "#F9F9F7"            // Off-white
  }
}
```

Colors automatically update across the site when modified.

### Typography

- **Headlines**: Poppins 600-800 weight
  - Hero titles: 72px (fixed)
  - Section titles: 36px (fixed)
- **Body**: Poppins 400-500 weight
  - Descriptions: 20px (fixed)
  - Body text: 16-18px (responsive)

### Component Styling

Key design features:
- **Clip-path buttons**: Angled corner effect (`btn-clipped`)
- **Gradient backgrounds**: Primary to secondary color transitions
- **Angled panels**: Modern layered design with clip-path
- **Hover effects**: Primary color transitions with white text
- **Responsive spacing**: 16px base unit for consistent rhythm

## 🌍 Dynamic Pages

### Solution Pages

Located at `/solutions/[category]/[slug]`

Examples:
- `/solutions/foundational/[slug]`
- `/solutions/lead-gen/[slug]`
- `/solutions/branding-awareness/[slug]`

### Location Pages

Located at `/locations/[slug]`

Features:
- Interactive map with tabs
- Location-specific content
- Local SEO structured data

### Indoor Billboard Pages

Located at `/indoor-billboards/[slug]`

## 🔍 SEO Implementation

### Structured Data

Implemented schema markup:
- **LocalBusiness**: Company information
- **Service**: Solution pages
- **FAQPage**: FAQ sections
- **BreadcrumbList**: Navigation hierarchy
- **WebPage**: Page-level data

### Meta Tags

- Dynamic title tags (50-60 characters)
- Meta descriptions (150-160 characters)
- Open Graph images and metadata
- Twitter Card markup
- Canonical URLs
- Mobile viewport optimization

### Sitemap & Robots

- Auto-generated XML sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Dynamic page priority based on type
- Crawl hints for search engines

## 🎨 Customization

### Update Theme Colors

Edit `src/data/settings/site.json`:

```json
{
  "colors": {
    "primary": "#006E72",
    "primaryLight": "#00A5AD",
    "primaryDark": "#00443E",
    "secondary": "#FFB81C",
    "neutral": "#F9F9F7"
  }
}
```

Colors update in real-time during development without restart.

### Components

Reusable components in `src/components/`:

**UI Components:**
- `Header.astro` - Navigation with mega-menu
- `Footer.astro` - Footer with links and social
- `PopupModal.astro` - Modal with angled panels

**Section Components:**
- `Hero.astro` - Hero sections with CTA
- `FeaturesSection.astro` - Feature grids
- `FeaturesWithImage.astro` - Features with images
- `ContentWithImage.astro` - Text + image layouts
- `FAQs.astro` - Accordion Q&A
- `CallToAction.astro` - CTA sections
- `MapSection.astro` - Interactive maps with location tabs
- `ClientShowcase.astro` - Testimonials/client logos
- `DesignSkillsGrid.astro` - Capability showcase

### Layouts

- `PageLayout.astro` - Standard page wrapper with header/footer
- `BaseLayout.astro` - Base HTML structure

### Global Styles

Edit `src/styles/global.css` for global styling. Theme colors are automatically injected via CSS variables.

## 📦 Tech Stack

- **Framework:** Astro 6.x
- **CMS:** EmDash (Turso/libSQL for database, React admin UI)
- **Styling:** Tailwind CSS 4.x with Vite integration
- **Database:** Turso (LibSQL - SQLite compatible)
- **Hosting:** Vercel with Edge functions
- **Markdown:** MDX support via @astrojs/mdx
- **Icons:** Astro Icon
- **Sitemap:** @astrojs/sitemap
- **Type Safety:** TypeScript
- **Authentication:** Astro Sessions + custom session driver
- **View Transitions:** Astro ClientRouter for SPA-like navigation

## 🔧 Utilities

- `emdash.config.mjs` - EmDash configuration (database, storage)
- `content.ts` - Content fetching and querying utilities
- `session-driver.mjs` - Astro session management with Turso
- `site.ts` - Site configuration and settings
- `config/site.ts` - Localization and site constants

## 📚 Documentation

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [EmDash CMS Docs](https://emdash.io)
- [Turso SQLite Docs](https://turso.tech/sqlite)
- [Vercel Docs](https://vercel.com/docs)

## 🚀 Deployment

### Vercel Setup

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `TURSO_CONNECTION_URL`
   - `TURSO_AUTH_TOKEN`
   - `EMDASH_ENCRYPTION_KEY`
4. Deploy automatically on push to main

### Build Process

```bash
npm run build
```

The `dist/` folder contains the production build, ready for deployment.

### Environment Variables

Required `.env` for local development:

```
TURSO_CONNECTION_URL=libsql://[database-url]
TURSO_AUTH_TOKEN=[auth-token]
EMDASH_ENCRYPTION_KEY=emdash_enc_v1_[key]
```

## 📊 Performance

### Lighthouse Targets

- **Performance:** 90+
- **Accessibility:** 90+
- **Best Practices:** 90+
- **SEO:** 90+

### Core Web Vitals

- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

### Optimization Features

- Image optimization with Sharp
- CSS code splitting and minification
- Lazy loading for below-fold images
- Dynamic imports for heavy components
- Edge function deployment on Vercel
- Caching strategies for static/dynamic content

## 📄 License

MIT

## 🙏 Credits

Built with [Astro](https://astro.build), [EmDash CMS](https://emdash.io), and [Tailwind CSS](https://tailwindcss.com)

## Contact & Support

For issues or questions, please refer to the project documentation or open an issue on GitHub.

## Key Pages

- **Homepage:** `/`
- **About:** `/about-us`
- **Contact:** `/contact-us`
- **Solutions:** `/solutions`
- **Locations:** `/locations`
- **Indoor Billboards:** `/indoor-billboards`
- **Admin Dashboard:** `/_emdash/admin`
- **Privacy Policy:** `/privacy`
- **Terms of Service:** `/terms`
