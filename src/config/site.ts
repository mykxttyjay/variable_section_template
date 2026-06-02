// ===========================================
// SITE CONFIGURATION
// Reads from src/data/settings/site.json
// Edit settings via Pages CMS
// ===========================================

import siteData from '../data/settings/site.json';

const socialData = (siteData.social ?? {}) as Partial<
  Record<"facebook" | "instagram" | "linkedin" | "twitter" | "youtube", string>
>;

export const siteConfig = {
  // Business Information
  business: {
    name: siteData.business?.name || "LinktoThrive",
    fullName: siteData.business?.fullName || "LinktoThrive",
    tagline: siteData.business?.tagline || "Your Trusted Marketing Partner",
    description: siteData.business?.description || "Denver's trusted digital marketing agency.",
  },

  // Location
  location: {
    city: siteData.location?.city || "Denver",
    state: siteData.location?.state || "Colorado",
    address: siteData.location?.address || "Denver, CO",
    fullAddress: siteData.location?.fullAddress || "Denver, CO",
  },

  // Contact
  contact: {
    email: siteData.contact?.email || "info@linktothrive.com",
    phone: siteData.contact?.phone || "9093257576",
    phoneFormatted: siteData.contact?.phoneFormatted || "(909) 325-7576",
  },

  // Brand Colors (used in CSS variables)
  // primary = main brand color (dark shades auto-derived)
  // secondary = accent color
  // tertiary = eyebrow/highlight color (gold)
  // quaternary = light background color (white)
  colors: {
    primary: siteData.colors?.primary || "#0D2A63",
    secondary: siteData.colors?.secondary || "#F5BF3A",
    tertiary: siteData.colors?.tertiary || "#DDAE05",
    quaternary: siteData.colors?.quaternary || "#ffffff",
    ...((siteData.colors as Record<string, string>)?.primaryDark && { primaryDark: (siteData.colors as Record<string, string>).primaryDark }),
    ...((siteData.colors as Record<string, string>)?.primaryDarker && { primaryDarker: (siteData.colors as Record<string, string>).primaryDarker }),
    ...((siteData.colors as Record<string, string>)?.primaryLight && { primaryLight: (siteData.colors as Record<string, string>).primaryLight }),
    ...((siteData.colors as Record<string, string>)?.primaryLighter && { primaryLighter: (siteData.colors as Record<string, string>).primaryLighter }),
    ...((siteData.colors as Record<string, string>)?.eyebrow && { eyebrow: (siteData.colors as Record<string, string>).eyebrow }),
  },

  // Logo
  logo: {
    src: siteData.logo?.src || "/images/logo/dealer-logo.svg",
    alt: siteData.logo?.alt || "LinktoThrive Logo",
  },

  // Social Media (optional)
  social: {
    facebook: socialData.facebook || "",
    instagram: socialData.instagram || "",
    linkedin: socialData.linkedin || "",
    twitter: socialData.twitter || "",
    youtube: socialData.youtube || "",
  },

  // SEO
  seo: {
    siteName: siteData.seo?.siteName || "LinktoThrive",
    defaultTitle: siteData.seo?.defaultTitle || "LinktoThrive | Digital Marketing in Denver",
    defaultDescription: siteData.seo?.defaultDescription || "Denver marketing agency: web design, social media, indoor billboards & PPC. Grow your business with proven solutions.",
    keywords: siteData.seo?.keywords || "Denver marketing agency, digital marketing Denver",
    siteUrl: siteData.seo?.siteUrl || "https://www.linktothrive.com",
    ogImage: siteData.seo?.ogImage || "/favicon.svg",
    twitterHandle: siteData.seo?.twitterHandle || "@linktothrive",
  },

  // Analytics
  analytics: {
    googleAnalyticsId: siteData.analytics?.googleAnalyticsId || "",
    agencyGoogleAnalyticsId: siteData.analytics?.agencyGoogleAnalyticsId || "",
  },

  // Template Info (not editable via CMS)
  template: {
    id: "2",
    name: "LinktoThrive Template",
  },
}

// Helper to get location-aware text
export function getLocationText(text: string) {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{business}", siteConfig.business.name)
}

// Recursively replace {city}, {state}, {business} in all string values of an object/array
export function localizeData<T>(data: T): T {
  if (typeof data === "string") return getLocationText(data) as T
  if (Array.isArray(data)) return data.map(item => localizeData(item)) as T
  if (data !== null && typeof data === "object") {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data)) {
      result[key] = localizeData(value)
    }
    return result as T
  }
  return data
}
