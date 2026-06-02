import type { CollectionEntry } from "astro:content";

export interface ContentSection {
  section: string;
  title: string;
  description: string;
  eyebrow?: string;
  image?: string;
  features?: Array<{
    title: string;
    description: string;
    image?: string;
    icon?: string;
  }>;
  ctaText?: string;
  ctaLink?: string;
  order?: number;
  category?: string;
}

export interface ParsedContent {
  sections: ContentSection[];
  hasMultipleSections: boolean;
  metadata: {
    title: string;
    description: string;
    category?: string;
  };
}

/**
 * Parses MDX frontmatter that contains multiple sections
 * Handles both single section format and multi-section format
 */
export function parseContentSections(
  entry: CollectionEntry<"solutions"> | CollectionEntry<"indoor-billboards">
): ParsedContent {
  const frontmatter = entry.data as any;

  // Check if the frontmatter has a 'sections' array (new format)
  if (frontmatter.sections && Array.isArray(frontmatter.sections)) {
    const sections = frontmatter.sections
      .map((section: any) => ({
        section: section.section || "default",
        title: section.title || "",
        description: section.description || "",
        eyebrow: section.eyebrow,
        image: section.image,
        features: section.features,
        ctaText: section.ctaText,
        ctaLink: section.ctaLink,
        order: section.order || 1,
      }))
      .sort(
        (a: ContentSection, b: ContentSection) =>
          (a.order || 0) - (b.order || 0)
      );

    return {
      sections,
      hasMultipleSections: true,
      metadata: {
        title: frontmatter.title,
        description: frontmatter.description,
        category: frontmatter.category,
      },
    };
  }

  // If the frontmatter has a 'section' field, it's using the old multi-section format
  if (frontmatter.section) {
    // This is a multi-section format - we need to parse it differently
    // For now, we'll extract the sections from the raw frontmatter
    const sections: ContentSection[] = [];

    // Extract Hero section
    if (frontmatter.section === "Hero" || frontmatter.title) {
      sections.push({
        section: "Hero",
        title: frontmatter.title,
        description: frontmatter.description,
        ctaText: frontmatter.ctaText,
        ctaLink: frontmatter.ctaLink,
        order: frontmatter.order || 1,
      });
    }

    // For the website-design.mdx file, we know it has multiple sections
    // We'll need to handle this more dynamically in a real implementation
    return {
      sections,
      hasMultipleSections: false,
      metadata: {
        title: frontmatter.title,
        description: frontmatter.description,
        category: frontmatter.category,
      },
    };
  }

  // Standard single-section format
  const sections: ContentSection[] = [
    {
      section: "Hero",
      title: frontmatter.title,
      description: frontmatter.description,
      image: frontmatter.image,
      ctaText: frontmatter.ctaText,
      ctaLink: frontmatter.ctaLink,
      order: 1,
    },
  ];

  return {
    sections,
    hasMultipleSections: false,
    metadata: {
      title: frontmatter.title,
      description: frontmatter.description,
      category: frontmatter.category,
    },
  };
}

/**
 * Determines the appropriate variant for a content section
 */
export function getSectionVariant(
  sectionType: string
): "hero" | "overview" | "features" | "value-proposition" | "default" {
  switch (sectionType.toLowerCase()) {
    case "hero":
      return "hero";
    case "overview":
      return "overview";
    case "features":
      return "features";
    case "value proposition":
    case "value-proposition":
      return "value-proposition";
    default:
      return "default";
  }
}

/**
 * Validates that a content section has required fields
 */
export function validateContentSection(section: ContentSection): boolean {
  return !!(section.title && section.description);
}

/**
 * Sanitizes content section data to prevent XSS
 */
export function sanitizeContentSection(
  section: ContentSection
): ContentSection {
  return {
    ...section,
    title: section.title?.replace(/<[^>]*>/g, "") || "",
    description: section.description?.replace(/<[^>]*>/g, "") || "",
  };
}
