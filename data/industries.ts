import { industryPages } from "./industryPages";

export type IndustryDoc = {
  name: string;
  slug: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  badge: {
    areas: string[];
  };
  homeDescription: string;
};

/** Homepage industry hover docs — sourced from audited industry page data. */
export const industryDocs: IndustryDoc[] = industryPages.map((page) => ({
  name: page.title,
  slug: page.slug,
  image: {
    url: page.imageBackground,
    alt: page.title,
    width: imageDimensions(page.slug).width,
    height: imageDimensions(page.slug).height,
  },
  badge: {
    areas: [...page.tags],
  },
  homeDescription: page.homeDescription,
}));

function imageDimensions(slug: string): { width: number; height: number } {
  switch (slug) {
    case "mobile-apps":
      return { width: 900, height: 1200 };
    case "ai":
      return { width: 1400, height: 900 };
    case "e-commerce":
      return { width: 1400, height: 880 };
    case "real-estate":
      return { width: 1400, height: 900 };
    default:
      return { width: 1200, height: 800 };
  }
}

/** @deprecated Use industryDocs for homepage hover; kept for cards/marquee. */
export const industries = industryDocs.map((doc) => ({
  title: doc.name,
  slug: doc.slug,
  tags: doc.badge.areas.join(", "),
  description: doc.homeDescription,
  image: doc.image.url,
}));

export const industryMarqueeItems = industryDocs.map((i) =>
  i.name === "E-Commerce" ? "E-COMMERCE" : i.name.toUpperCase()
);
