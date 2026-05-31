export type IndustryProblem = {
  text: string;
  solution: string;
  projectSlug: string;
  background: string;
  backgroundHover: string;
  ctaLabel?: string;
};

export type IndustryTestimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
  projectSlug?: string;
  ctaLabel?: string;
};

export type IndustryPage = {
  slug: string;
  title: string;
  eyebrow: string;
  heroLine: string;
  homeDescription: string;
  tags: string[];
  badgeColor: string;
  imageBackground: string;
  gallery: string[];
  marqueeText: string;
  methodologyIntro: string;
  thinkLabel: string;
  thinkItems: string[];
  designLabel: string;
  designItems: string[];
  developLabel: string;
  developItems: string[];
  problems: IndustryProblem[];
  testimonial: IndustryTestimonial | null;
  related: string[];
  agencyCta: string;
  nextSlug: string;
};

export const industryPages: IndustryPage[] = [
  {
    slug: "ai",
    title: "Artificial Intelligence",
    eyebrow: "LOUD x AI",
    heroLine:
      "We build custom AI architectures and autonomous agents that automate complex decisions and scale your business intelligence beyond human limits.",
    homeDescription:
      "We engineer custom AI architectures that transform raw data into automated decisions. Intelligent agents designed to optimize operations and scale human potential.",
    tags: ["Efficiency", "Data-Driven", "Secure"],
    badgeColor: "#F58E6BB3",
    imageBackground: "/media/cover-ai-loud.jpg",
    gallery: [
      "/media/cover-ai-loud.jpg",
      "/media/witz-ai-worlds.jpg",
      "/media/aste360-preview.jpg",
      "/media/preview-shiftpilot.jpg",
    ],
    marqueeText: "Lots of problems, endless opportunities",
    methodologyIntro:
      "Through our Think-Design-Develop methodology, we help you turn every data point into a competitive advantage and every operational bottleneck into an automated workflow.",
    thinkLabel: "THINK",
    thinkItems: [
      "Data Strategy & Audit",
      "Feasibility Analysis",
      "Algorithm Selection",
      "Process Automation Strategy",
      "Ethics & Compliance",
      "Predictive Modeling",
    ],
    designLabel: "DESIGN",
    designItems: [
      "Conversational UI",
      "Prompt Engineering",
      "Data Visualization",
      "Voice User Interface (VUI)",
      "Human-in-the-loop Flows",
      "Agent Personality Design",
    ],
    developLabel: "ENGINEERING",
    developItems: [
      "LLM Fine-Tuning",
      "RAG Pipelines",
      "Python & Torch Frameworks",
      "Vector Databases",
      "On-premise AI Deployment",
      "Architecture & Tech Stack",
    ],
    problems: [
      {
        text: "Creating and maintaining high-quality quiz content is slow and expensive, so most games cover only generic topics and leave huge gaps in niche and local trivia.",
        solution:
          "WITZ delivers high-quality, uniquely tailored quiz content for specific themes and under-served markets that competitors ignore, delivering it in a scalable way and making it accessible to everyone.",
        projectSlug: "witz",
        background: "/media/home-witz.webp",
        backgroundHover: "/media/witz-ai-worlds.jpg",
      },
      {
        text: "Balancing operational needs, legal constraints, and employee availability manually results in errors, burnout, and wasted management hours.",
        solution:
          "We built an AI-driven optimization engine that solves the scheduling matrix in seconds — a smart platform that predicts coverage needs and automates conflict resolution.",
        projectSlug: "shiftpilot",
        background: "/media/shiftpilot-project-preview.png",
        backgroundHover: "/media/preview-shiftpilot.jpg",
      },
      {
        text: "The judicial auction market in Italy is extremely fragmented and complex, with approximately 245,000 annual procedures spread across various courts.",
        solution:
          "We developed the first aggregation, monitoring, and evaluation system that centralizes all auctions in Italy.",
        projectSlug: "aste360",
        background: "/media/aste360-project-preview.png",
        backgroundHover: "/media/aste360-preview.jpg",
      },
    ],
    testimonial: {
      quote:
        "I've been playing for months and it never gets boring. The AI generates completely new topics every single week, it's crazy. One day I'm answering questions about 80s rock, the next about quantum physics. Best trivia game on Android, hands down",
      name: "Android User",
      role: "Google Play Store",
      image: "/media/home-witz.webp",
      projectSlug: "witz",
    },
    related: ["shiftpilot", "aste360"],
    agencyCta: "Want to evolve your real estate company?",
    nextSlug: "e-commerce",
  },
  {
    slug: "e-commerce",
    title: "E-Commerce",
    eyebrow: "LOUD x E-COMMERCE",
    heroLine:
      "From first-click to check-out, we leverage headless architectures to build robust, fast, high-converting shopping experiences designed to handle peak traffic and scale with your business.",
    homeDescription:
      "We build high-performance headless commerce platforms for ambitious brands. A scalable infrastructure designed to maximize conversion rates and handle global traffic.",
    tags: ["Headless", "Sales", "Growth"],
    badgeColor: "#d9cbcab3",
    imageBackground: "/media/loud-cover-ecommerce.png",
    gallery: [
      "/media/library-korea.jpg",
      "/media/bike-shop.jpg",
      "/media/preview-ecommerce-cart.jpg",
    ],
    marqueeText: "Lots of problems, endless opportunities",
    methodologyIntro:
      "Through our Think-Design-Develop methodology, we help you turn every visitor into a customer and every transaction challenge into a scalable global sales opportunity.",
    thinkLabel: "THINK",
    thinkItems: [
      "Market Analysis",
      "Conversion Rate Optimization (CRO)",
      "Omnichannel Strategy",
      "Tech Stack Selection",
      "Customer Journey Mapping",
      "Loyalty Logic",
    ],
    designLabel: "DESIGN",
    designItems: [
      "UX/UI Design",
      "Mobile-First Commerce",
      "Design Systems",
      "Micro-interactions",
      "Checkout Optimization",
      "User Testing",
    ],
    developLabel: "ENGINEERING",
    developItems: [
      "Headless Architecture",
      "Frontend Development",
      "Custom API Integrations",
      "PWA (Progressive Web Apps)",
      "ERP & WMS Synchronization",
      "Payment Gateway Integration",
    ],
    problems: [
      {
        text: "The second-hand market for high-end bikes suffers from a massive trust gap. How do you scale a business where shipping is complex and every item requires certification?",
        solution:
          "We engineered a custom operational ecosystem, not just a shop. A headless platform that orchestrates certification, global logistics, and payments, turning a complex trade-in model into a frictionless, scalable e-commerce experience.",
        projectSlug: "bike-room",
        background: "/media/bike-room-not-hover.jpg",
        backgroundHover: "/media/bike-room-hover.jpg",
        ctaLabel: "Case studio - BikeRoom",
      },
      {
        text: "Relying on off-the-shelf Shopify apps for complex e-commerce operations inevitably creates frontend bloat and rigid technical limits.",
        solution:
          "We engineer custom private apps and headless architectures — offloading complex business logic to a secure backend for uncompromising performance and seamless integrations.",
        projectSlug: "shopify-tech",
        background: "/media/island-not-hover.jpg",
        backgroundHover: "/media/island-bridge-hover.jpg",
        ctaLabel: "Case studio - Shopify Tech",
      },
      {
        text: "Managing third-party services like theater tickets natively within Shopify creates disjointed accounting workflows and severe vendor management bottlenecks.",
        solution:
          "We engineered a robust external middleware platform connected via webhooks and APIs to seamlessly automate CRM synchronization, complex invoicing, and dedicated vendor portals.",
        projectSlug: "ennevolte",
        background: "/media/ennevolte-not-hover.jpg",
        backgroundHover: "/media/ennevolte-hover.jpg",
        ctaLabel: "Case studio - Ennevolte",
      },
    ],
    testimonial: {
      quote:
        "They engineered our entire business backbone. We moved from a standard e-commerce to a custom operational ecosystem that now manages over €8 million in sales effortlessly.",
      name: "Matteo M.",
      role: "CEO - Bike-Room",
      image: "/media/bikeroom-cover.webp",
      projectSlug: "bike-room",
      ctaLabel: "Case studio - BikeRoom",
    },
    related: ["bike-room", "shopify-tech", "ennevolte"],
    agencyCta: "Want to evolve your real estate company?",
    nextSlug: "mobile-apps",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    eyebrow: "LOUD x MOBILE APPS",
    heroLine:
      "From performance to reliability, we leverage the full power of the mobile ecosystem to deliver fast, secure and scalable app experiences.",
    homeDescription:
      "We build iOS and Android apps used by thousands of users, designed to scale and perform at any size.",
    tags: ["Scalability", "Engagement & Design", "Product"],
    badgeColor: "#300A75B3",
    imageBackground: "/media/mobile-apps.jpg",
    gallery: [
      "/media/loudsrl-our-apps.jpg",
      "/media/shift2cal-3-screen.jpg",
      "/media/home-witz.webp",
    ],
    marqueeText: "Lots of problems, endless opportunities",
    methodologyIntro:
      "Through our Think—Design—Develop methodology, we help you turn every iOS and Android challenge into a scalable product and a real business opportunity.",
    thinkLabel: "THINK",
    thinkItems: [
      "Market Analysis",
      "Product Management",
      "User Engagement & Retention",
      "Customer Segmentation",
      "Trend Identification",
    ],
    designLabel: "DESIGN",
    designItems: [
      "UX/UI Design",
      "Design Systems",
      "Ideation & Prototyping",
      "User Testing",
      "Usability Experiments",
    ],
    developLabel: "DEVELOP",
    developItems: [
      "Architectural Concept Development",
      "Backend Development",
      "Flutter for iOS and Android",
      "AI Integration",
      "Architecture & Tech Stack",
    ],
    problems: [
      {
        text: "Most shift workers still receive their schedules in the worst possible format for everyday life: paper pinned to a wall, a PDF in an email, a photo in WhatsApp or Telegram, a spreadsheet hidden in some portal.",
        solution:
          "Shift2Cal is built exactly to remove this manual copy-and-paste layer between “how schedules are sent” and “how people actually plan their lives”.",
        projectSlug: "shift2cal",
        background: "/media/shift2cal-3-screen.jpg",
        backgroundHover: "/media/preview-home-shift2cal-2.jpg",
      },
      {
        text: "There was no dedicated way to track visited countries, compare them with others, and access reliable country info in one place.",
        solution:
          "Balloon turns your travels into a personal world map with stats, friend comparison and curated country data, a space we’ve been leading.",
        projectSlug: "balloon",
        background: "/media/preview-balloon-1.jpg",
        backgroundHover: "/media/preview-balloon-5.jpg",
      },
      {
        text: "Creating and maintaining high-quality quiz content is slow and expensive, so most games cover only generic topics and leave huge gaps in niche and local trivia.",
        solution:
          "WITZ delivers high-quality, uniquely tailored quiz content for specific themes and under-served markets that competitors ignore, delivering it in a scalable way and making it accessible to everyone.",
        projectSlug: "witz",
        background: "/media/home-witz.webp",
        backgroundHover: "/media/witz-ai-worlds.jpg",
      },
    ],
    testimonial: {
      quote:
        "My name is Tommaso and I am visually impaired. WITZ is very accessible even for users with visual disabilities, and for this reason the developers deserve a lot of praise. Keep up the great work!",
      name: "Tommaso Battista",
      role: "WITZ User - AppStore",
      image: "/media/review-witz-flat-background.png",
      projectSlug: "witz",
    },
    related: ["shift2cal", "balloon", "witz"],
    agencyCta: "Want to evolve your real estate company?",
    nextSlug: "real-estate",
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    eyebrow: "LOUD x REAL ESTATE",
    heroLine:
      "We build the smartest digital tools for the Italian Real Estate industry.",
    homeDescription:
      "We're building the most powerful data-driven ecosystem for the Italian Real Estate market. A complete suite of tools designed for agencies, investors and professionals.",
    tags: ["Smart Decisions", "Efficiency", "Infrastructure"],
    badgeColor: "#F5E76BB3",
    imageBackground: "/media/real-estate-industry.jpg",
    gallery: [
      "/media/aste360-1.png",
      "/media/ai-cercacasa-home-1.png",
    ],
    marqueeText: "Lots of problems, endless opportunities",
    methodologyIntro:
      "Through our Think–Design–Develop methodology, we help you turn every challenge in the Real Estate world into a real business opportunity.",
    thinkLabel: "THINK",
    thinkItems: [
      "Market Analysis",
      "Product Management",
      "User Engagement & Retention",
      "UX Research & Testing",
      "SEO Optimization",
    ],
    designLabel: "DESIGN",
    designItems: [
      "UX/UI Design",
      "Design Systems",
      "Ideation & Prototyping",
      "User Testing",
      "Usability Experiments",
    ],
    developLabel: "DEVELOP",
    developItems: [
      "Frontend Development",
      "Backend Development",
      "Flutter for iOS and Android",
      "AI Integration",
      "Architecture & Tech Stack",
    ],
    problems: [
      {
        text: "The Real Estate world is fragmented and opaque. Accessing reliable property data takes time, effort and endless manual checks.",
        solution:
          "Whuis turns scattered information into a single, trusted source — delivering instant access to verified property data, documents and insights.",
        projectSlug: "whuis",
        background: "/media/whuis-1.jpg",
        backgroundHover: "/media/whuis-project-preview.png",
      },
      {
        text: "Online property search in Italy suffers from duplicated listings, unverified agents and outdated platforms that slow down decision-making.",
        solution:
          "Cercacasa introduces a modern, transparent marketplace powered by verified professionals and real-time data for a cleaner, safer search experience.",
        projectSlug: "cercacasa",
        background: "/media/cercacasa-project-preview.webp",
        backgroundHover: "/media/cercacasa-project-preview.png",
      },
      {
        text: "Property records and cadastral data are locked behind slow, manual systems that make due diligence and valuation inefficient and error-prone.",
        solution:
          "Catasto 2.0 centralizes, enriches and automates access to millions of cadastral records — transforming hours of work into instant, actionable insights.",
        projectSlug: "catasto-20",
        background: "/media/catasto-project-preview.webp",
        backgroundHover: "/media/catasto-project-preview.png",
      },
    ],
    testimonial: {
      quote:
        "Working with LOUD was a real game-changer. Their ability to combine design, technology and strategy allowed us to turn a complex idea into a powerful product that users truly love.",
      name: "Daniele Mancini",
      role: "Founder & CEO - GO NEXT GROUP",
      image: "/media/menu-preview-industry-real-estate.jpg",
      projectSlug: "whuis",
    },
    related: ["whuis", "cercacasa", "catasto-20"],
    agencyCta: "Want to evolve your real estate company?",
    nextSlug: "ai",
  },
];

const slugAliases: Record<string, string> = {
  "artificial-intelligence": "ai",
};

export function getIndustry(slug: string) {
  const resolved = slugAliases[slug] ?? slug;
  return industryPages.find((i) => i.slug === resolved);
}

export function getNextIndustry(slug: string) {
  const industry = getIndustry(slug);
  if (!industry) return industryPages[0];
  return industryPages.find((i) => i.slug === industry.nextSlug) ?? industryPages[0];
}

export function getIndustryIndex(slug: string) {
  const resolved = slugAliases[slug] ?? slug;
  return industryPages.findIndex((i) => i.slug === resolved);
}
