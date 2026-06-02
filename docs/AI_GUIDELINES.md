# AI Content Management Guidelines

This document explains how to update content on this Astro website. Follow these guidelines when making changes.

---

## 📁 Project Structure

```
/
├── src/
│   ├── config.yaml              ← Edit site-wide settings here
│   ├── navigation.ts            ← Edit navigation structure here
│   ├── content/                 ← Edit page content here
│   │   ├── solutions/
│   │   │   ├── foundational/
│   │   │   │   ├── website-design.mdx
│   │   │   │   ├── google-business-profile.mdx
│   │   │   │   ├── social-media-management.mdx
│   │   │   │   └── design-services.mdx
│   │   │   └── lead-gen/
│   │   │       ├── social-media-advertising.mdx
│   │   │       └── pay-per-click.mdx
│   │   └── indoor-billboards/
│   │       ├── become-a-venue-partner.mdx
│   │       ├── locations.mdx
│   │       └── screen-advertising.mdx
│   └── pages/
│       └── index.astro          ← Edit homepage here
└── docs/
    └── AI_GUIDELINES.md         ← This file
```

---

## 🎯 Common Tasks

### 1. Update Site Settings (Name, URL, SEO)

**File:** `src/config.yaml`

```yaml
site:
  name: DEALER TEMPLATE # Change brand name
  site: "https://www.linktothrive.com" # Change website URL
  trailingSlash: false

metadata:
  title:
    default: DEALER TEMPLATE # Default page title
    template: "%s — DEALER TEMPLATE" # Title template (%s = page name)
  description: "We are a local marketing company in Denver. Premium marketing solutions including website design, social media management, and indoor billboard advertising."
  keywords: "Denver marketing agency, digital marketing Denver, marketing services Denver CO, indoor billboard advertising, social media management, website design Denver, PPC advertising, Google Business Profile, local marketing Denver, Denver advertising agency"

  robots:
    index: true
    follow: true

  openGraph:
    site_name: DEALER TEMPLATE
    images:
      - url: "/favicon.svg" # Use existing favicon (default.png doesn't exist)
        width: 1200
        height: 628
    type: website

  twitter:
    handle: "@dealertemplate"
    site: "@dealertemplate"
    cardType: summary_large_image
```

**What updates automatically:**

- All page titles
- Meta descriptions
- Open Graph tags
- Twitter cards
- Canonical URLs

---

### 2. Add/Edit Service Pages

**Location:** `src/content/solutions/foundational/` or `src/content/solutions/lead-gen/`

**Example:** Add a new foundational service

1. Create file: `src/content/solutions/foundational/email-marketing.mdx`

```mdx
---
title: "Email Marketing Services"
description: "Engage your audience with targeted email campaigns"
category: "foundational"
order: 5
ctaText: "Get Started"
ctaLink: "/contact"
---

## Email Marketing That Converts

Your content here...

### Our Approach

- Strategy development
- Campaign creation
- Performance tracking
```

2. The page automatically appears at: `/solutions/foundational/email-marketing`
3. Navigation updates automatically

**Frontmatter Fields:**

- `title` (required) - Page title
- `description` (required) - SEO description
- `category` (required) - Either "foundational" or "lead-gen"
- `order` (optional) - Sort order in navigation (lower = first)
- `ctaText` (optional) - Call-to-action button text
- `ctaLink` (optional) - Call-to-action button URL
- `image` (optional) - Featured image path

---

### 3. Add/Edit Indoor Billboard Pages

**Location:** `src/content/indoor-billboards/`

**Example:** Add a new billboard page

```mdx
---
title: "Premium Locations"
description: "Our billboard locations in high-traffic areas"
order: 4
---

## Premium Billboard Locations

Content here...
```

URL: `/indoor-billboards/premium-locations`

---

### 4. Update Homepage

**File:** `src/pages/index.astro`

Edit the Hero, Features, and CallToAction sections:

```astro
<Hero
  tagline="Marketing Excellence"
  title="Your New Title Here"
  subtitle="Your new subtitle"
  actions={[
    { text: 'Get Started', href: '/solutions', variant: 'primary' },
  ]}
/>

<Features
  title="Why Choose Us"
  features={[
    {
      title: 'Feature Name',
      description: 'Feature description',
      icon: '🎨',
    },
    // Add more features...
  ]}
/>
```

---

### 5. Update Navigation

**File:** `src/navigation.ts`

The navigation auto-populates from content, but you can customize structure:

```ts
export const headerData = {
  links: [
    {
      text: "Home",
      href: getPermalink("/"),
    },
    {
      text: "Indoor Billboards",
      href: getPermalink("/indoor-billboards"),
      links: "auto", // Auto-populated from content
    },
    {
      text: "Solutions",
      href: getPermalink("/solutions"),
      links: [
        {
          text: "Foundational",
          href: getPermalink("/solutions/foundational"),
          links: "auto", // Auto-populated
        },
        {
          text: "Lead Gen",
          href: getPermalink("/solutions/lead-gen"),
          links: "auto", // Auto-populated
        },
      ],
    },
  ],
  actions: [{ text: "Get In Touch", href: getPermalink("/contact") }],
};
```

**Footer links:**

```ts
export const footerData = {
  links: [
    {
      title: "Solutions",
      links: [
        {
          text: "Foundational Services",
          href: getPermalink("/solutions/foundational"),
        },
        { text: "Lead Generation", href: getPermalink("/solutions/lead-gen") },
      ],
    },
    // Add more sections...
  ],
  socialLinks: [
    { ariaLabel: "X", icon: "tabler:brand-x", href: "#" },
    { ariaLabel: "Instagram", icon: "tabler:brand-instagram", href: "#" },
  ],
};
```

---

## ✍️ Content Writing Guidelines

### MDX Formatting

```mdx
---
title: "Page Title"
description: "SEO description"
---

# Main Heading (H1)

Paragraph text here.

## Section Heading (H2)

### Subsection (H3)

- Bullet point
- Another point

**Bold text**
_Italic text_

[Link text](https://example.com)
```

### SEO Best Practices

1. **Title**: 50-60 characters
2. **Description**: 150-160 characters
3. **Headings**: Use H2 for main sections, H3 for subsections
4. **Keywords**: Include naturally in content
5. **Links**: Use descriptive anchor text

---

## 🎨 Animations

All widgets now have scroll-triggered animations! The following animation types are available:

- `data-animate="fade-up"` - Fades in from bottom
- `data-animate="fade-down"` - Fades in from top
- `data-animate="fade-left"` - Slides in from right
- `data-animate="fade-right"` - Slides in from left
- `data-animate="zoom-in"` - Zooms in
- `data-animate="zoom-out"` - Zooms out
- `data-animate="fade"` - Simple fade
- `data-animate-stagger` - Staggers child animations

Animations respect `prefers-reduced-motion` for accessibility.

---

## 🚫 What NOT to Change

**Do not modify these files unless you know what you're doing:**

- `src/content/config.ts` - Content collection schemas
- `src/layouts/*.astro` - Layout templates
- `src/components/widgets/*.astro` - UI components (now with animations!)
- `src/utils/*.ts` - Utility functions
- `src/styles/global.css` - Global styles and animation definitions
- `vendor/` - Config integration
- `astro.config.mjs` - Astro configuration
- `package.json` - Dependencies

---

## 📝 Quick Reference

### Add New Service Page

1. Create MDX file in `src/content/solutions/foundational/` or `lead-gen/`
2. Add frontmatter (title, description, category, order)
3. Write content in Markdown
4. Save - navigation updates automatically

### Update Site Info

1. Edit `src/config.yaml`
2. Change name, URL, description, social handles
3. Save - updates everywhere automatically

### Update Homepage

1. Edit `src/pages/index.astro`
2. Modify Hero, Features, CallToAction props
3. Save

### Update Navigation

1. Edit `src/navigation.ts`
2. Modify headerData or footerData
3. Save

---

## 🔍 Testing Changes

After making changes:

1. Check the page renders correctly
2. Verify navigation links work
3. Test on mobile view
4. Check SEO meta tags in browser inspector

---

## 📞 Need Help?

If you encounter issues:

1. Check this guide first
2. Verify file paths are correct
3. Ensure frontmatter syntax is valid
4. Check for typos in YAML/MDX files

---

## 🎨 Animations

All widgets now have scroll-triggered animations! The following animation types are available:

**Animation Attributes:**

- `data-animate="fade-up"` - Fades in from bottom
- `data-animate="fade-down"` - Fades in from top
- `data-animate="fade-left"` - Slides in from right
- `data-animate="fade-right"` - Slides in from left
- `data-animate="zoom-in"` - Zooms in
- `data-animate="zoom-out"` - Zooms out
- `data-animate="fade"` - Simple fade
- `data-animate-stagger` - Staggers child animations with delays

**Delay Modifiers:**

- `data-animate-delay="100"` - 0.1s delay
- `data-animate-delay="200"` - 0.2s delay
- `data-animate-delay="300"` - 0.3s delay
- etc.

**Accessibility:**

- Animations respect `prefers-reduced-motion` for users who prefer reduced motion
- All animations are smooth and performant using CSS transforms

**Widgets with Animations:**

- Hero, Features, Benefits, CallToAction
- ContentWithImage, ContentWithKeypoints, ContentWithVideo
- ServicesGrid, FAQs, LogoSlider
- BoostVisibility, CTALight, DesignSkillsGrid
- FeaturesSection, FeaturesWithImage, ContentSection
- FormSection, MapSection, NetworksSection

---

## 🆕 Recent Updates

### Latest Changes

1. **Animations System** - All widgets now animate on scroll
2. **Metadata Fix** - Added keywords field to MetaData type
3. **Image Fix** - Changed default image from missing default.png to /favicon.svg
4. **Config Update** - Updated config.yaml with proper DEALER TEMPLATE branding

### Project Details

- **Brand:** DEALER TEMPLATE
- **Location:** Denver, Colorado
- **Website:** https://www.linktothrive.com
- **Services:** Digital Marketing, Web Design, Social Media, Indoor Billboard Advertising
- **Target Market:** Local Denver businesses

### Key Features

- Content-driven architecture with MDX
- Auto-generated navigation from content collections
- SEO-optimized with proper metadata
- Responsive design with mobile-first approach
- Scroll-triggered animations throughout
- Accessibility compliant (WCAG AA)
