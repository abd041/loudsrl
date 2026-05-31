export type ManifestoPrinciple = {
  title: string;
  cta: string;
  images: string[];
};

export type ManifestoDeliverable = {
  title: string;
  desc: string;
  icon: string;
  href?: string;
};

export const manifestoPrinciples: ManifestoPrinciple[] = [
  {
    title: "Making something that people want",
    cta: "Discover Design Process",
    images: [
      "/media/last-shot-shift2cal.png",
      "/media/review-witz-flat-background.png",
      "/media/preview-home-shift2cal-2.png",
    ],
  },
  {
    title: "Living With the Product",
    cta: "Discover Design Process",
    images: [
      "/media/with-preview-home.png",
      "/media/menu-preview-industry-real-estate.png",
      "/media/preview-balloon-5.png",
    ],
  },
  {
    title: "Make a unique contribution",
    cta: "Discover Design Process",
    images: [
      "/media/whuis-hover.png",
      "/media/whuis-not-hover.png",
      "/media/preview-balloon-2.png",
    ],
  },
  {
    title: "Being in the details",
    cta: "Discover Design Process",
    images: [
      "/media/preview-balloon-1.png",
      "/media/witz-ai-worlds-ui.png",
      "/media/shift2cal-3-screen.png",
    ],
  },
  {
    title: "Taking ownership",
    cta: "Discover Design Process",
    images: [
      "/media/loudsrl-teams.png",
      "/media/witz-preview-shop-themes.png",
    ],
  },
];

export const manifestoDeliverables: ManifestoDeliverable[] = [
  {
    title: "E-commerce",
    desc: "The online shop where you can sell your products.",
    icon: "/media/deliverables/add_shopping_cart.png",
    href: "/industries/e-commerce",
  },
  {
    title: "WEBSITE",
    desc: "The place where your brand meets visitors.",
    icon: "/media/deliverables/ad.png",
    href: "/industries/e-commerce",
  },
  {
    title: "AI TOOL",
    desc: "The smart layer that turns data into actions.",
    icon: "/media/deliverables/desktop_mac.png",
    href: "/industries/ai",
  },
  {
    title: "WEB APP",
    desc: "The online workspace where real work happens.",
    icon: "/media/deliverables/captive_portal.png",
    href: "/industries/e-commerce",
  },
  {
    title: "MOBILE APP",
    desc: "The product experience users keep on hand.",
    icon: "/media/deliverables/mobile.png",
    href: "/industries/e-commerce",
  },
  {
    title: "CMS AND SAAS",
    desc: "The tool where teams run content and services.",
    icon: "/media/deliverables/mobile.png",
    href: "/industries/e-commerce",
  },
  {
    title: "WATCH & TV APP",
    desc: "The app that brings your product to TV or smartwatch.",
    icon: "/media/deliverables/fitness_trackers.png",
    href: "/industries/e-commerce",
  },
  {
    title: "IOT",
    desc: "The layer that connects devices with your product.",
    icon: "/media/deliverables/doorbell.png",
    href: "/industries/e-commerce",
  },
];

export const featuredCaseStudies = ["whuis", "cercacasa", "catasto-20"];

export const manifestoServicesOverview =
  "LOUD designs, validates and builds digital products end to end, offering strategy, design, engineering and AI services that turn business ideas into scalable, user-loved experiences.";
