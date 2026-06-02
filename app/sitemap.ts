import type { MetadataRoute } from "next";
import { caseStudyOrder } from "@/data/caseStudies";
import { industryPages } from "@/data/industryPages";
import { pillars } from "@/data/pillars";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://loudsrl.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/manifesto",
    "/studio",
    "/contact-us",
    "/contact-us?c=startup",
    "/contact-us?c=career",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const pillarRoutes = pillars.map((pillar) => ({
    url: `${siteUrl}/pillars/${pillar.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const industryRoutes = industryPages.map((page) => ({
    url: `${siteUrl}/industries/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseRoutes = caseStudyOrder.map((slug) => ({
    url: `${siteUrl}/case-studies/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...pillarRoutes, ...industryRoutes, ...caseRoutes];
}
