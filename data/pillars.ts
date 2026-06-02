export type PillarSlug = "think" | "design" | "develop";

export type PillarHeroTableGroup = {
  title: string;
  items: string[];
};

export type PillarPotentialCard = {
  title: string;
  summary: string;
  items: string[];
  itemDescriptions: string[];
  itemIcons?: string[];
};

export type PillarShowcaseLayout = "tagline-first" | "projects-first";

export type PillarData = {
  slug: PillarSlug;
  navLabel: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  marqueeText: string;
  heroTable: PillarHeroTableGroup[];
  consultingLabel: string;
  consultingText: string;
  heroImage: string;
  potentialTitle: string;
  potentialIntro: string;
  potentialCards: PillarPotentialCard[];
  caseStudySlugs: string[];
  showcaseLayout?: PillarShowcaseLayout;
  agencyCta?: string;
};

export const PILLAR_HERO_TABLE_NOTE =
  "Each individual step involves reiterative processes, depending on feedback from Stakeholders and Users.";

export const pillars: PillarData[] = [
  {
    slug: "think",
    navLabel: "Think.",
    eyebrow: "PRODUCT STRATEGY",
    heroTitle: "Making something\nthat people want.",
    heroBody:
      "Design the right digital product before you build it: LOUD turns ideas, data and user insight into a clear, validated product direction.",
    marqueeText: "Complex problems to a product plan",
    heroTable: [
      {
        title: "Product Vision & Strategy",
        items: [
          "Market Research",
          "Stakeholder Interviews",
          "Product Vision",
          "Product Strategy",
        ],
      },
      {
        title: "Product Design",
        items: [
          "User Interviews",
          "Workflows",
          "User Journey",
          "Technical Recommendations",
        ],
      },
      {
        title: "Prototyping",
        items: [
          "Figma Prototyping",
          "Visual Design Research",
          "User Testing",
          "Engeneering Validations",
        ],
      },
      {
        title: "Delivery & Planning",
        items: [
          "Visual Design Approval",
          "Roadmap",
          "Deliverables",
          "Milestones",
        ],
      },
    ],
    consultingLabel: "PRODUCT CONSULTING",
    consultingText:
      "Choose a Think consultancy with LOUD to turn scattered ideas, market insight and stakeholder needs into a sharp, validated product strategy that reduces risk and maximizes business impact.",
    heroImage: "/media/think-hero.webp",
    potentialTitle: "Unleash Your Product's Potential",
    potentialIntro:
      "Unleash your product's potential by grounding every decision in research, strategy and real user needs, so you only invest in digital products the market actually wants.",
    potentialCards: [
      {
        title: "Product Vision",
        summary:
          "Define a sharp digital product vision grounded in market reality. LOUD aligns stakeholders, data and business goals to shape a winning product strategy.",
        items: [
          "Market Research",
          "Stakeholder Interviews",
          "Product Vision",
          "Product Strategy",
        ],
        itemIcons: ["search", "interview", "vision", "strategy"],
        itemDescriptions: [
          "We analyze your market, competitors and benchmarks to reveal real opportunities for your digital product. Our insights highlight gaps, trends and risks, so you can invest in features that create value and differentiation from day one.",
          "We collect business, technical and user-side input from the people shaping the product. This helps align expectations, constraints and priorities before the product direction is defined.",
          "We turn business goals, user needs and market context into a clear product vision. This gives the team a shared direction and a stronger foundation for every decision that follows.",
          "We define the strategic path for the product: positioning, priorities, core value, roadmap logic and decision criteria. This makes the product easier to design, build and scale.",
        ],
      },
      {
        title: "Product Design",
        summary:
          "Turn strategy into user-centric experiences. LOUD maps journeys, workflows and UX foundations that make your digital product intuitive and effective.",
        items: [
          "User Interviews",
          "Workflows",
          "User Journey",
          "Technical Recommendations",
        ],
        itemIcons: ["users", "workflow", "journey", "technical"],
        itemDescriptions: [
          "We speak with real or potential users to understand goals, habits, expectations and blockers. These insights help shape a product experience based on actual behavior rather than assumptions.",
          "We map how users, teams and systems move through the product. This helps simplify complexity, remove friction and make the product logic easier to design and develop.",
          "We define the key steps users take before, during and after using the product. This reveals moments of value, confusion and opportunity across the full experience.",
          "We translate product needs into practical technical direction. This helps the team choose the right architecture, integrations, tools and development approach before production starts.",
        ],
      },
      {
        title: "Prototyping",
        summary:
          "Prototype fast, learn fast. LOUD builds realistic product prototypes to validate ideas, UX and technology before you commit development resources.",
        items: [
          "Figma Prototyping",
          "Visual Design Research",
          "User Testing",
          "Engeneering Validations",
        ],
        itemIcons: ["figma", "visual", "testing", "validation"],
        itemDescriptions: [
          "We create interactive Figma prototypes to test flows, screens and product logic before development. This helps validate the experience quickly and reduce expensive changes later.",
          "We explore visual references, interface patterns and brand directions to define the right look and feel for the product. This ensures the visual system supports the product strategy.",
          "We test the prototype with users or stakeholders to identify friction, confusion and missing value. The feedback helps refine the product before it moves into build.",
          "We review the proposed product experience with engineering constraints in mind. This ensures the idea is feasible, scalable and ready for a realistic development plan.",
        ],
      },
      {
        title: "Delivery & Planning",
        summary:
          "From concept to delivery, LOUD structures plans, assets and milestones so your teams can build the product with clarity, speed and alignment.",
        items: [
          "Visual Design Approval",
          "Roadmap",
          "Deliverables",
          "Milestones",
        ],
        itemIcons: ["approval", "roadmap", "deliverables", "milestones"],
        itemDescriptions: [
          "We finalize and approve the visual direction before moving into production. This creates alignment around the look, feel and interface quality expected from the product.",
          "We define the product roadmap with clear phases, priorities and dependencies. This gives the team a structured path from idea to launch.",
          "We define the concrete outputs needed for design, development and launch. This makes scope, responsibilities and expectations clear before execution begins.",
          "We break the roadmap into measurable milestones. This helps track progress, reduce uncertainty and keep the product moving toward launch.",
        ],
      },
    ],
    caseStudySlugs: ["cercacasa", "shiftpilot", "bike-room"],
    showcaseLayout: "projects-first",
  },
  {
    slug: "design",
    navLabel: "Design.",
    eyebrow: "PRODUCT DESIGN",
    heroTitle: "Living with the product.",
    heroBody:
      "Shape a product identity users recognize, trust and enjoy every day across brand, interface and system design.",
    marqueeText: "Complex problems to a product plan",
    heroTable: [
      {
        title: "Branding",
        items: [
          "Brand Positioning",
          "Product Narrative",
          "Visual Identity System",
          "Voice and Tone",
        ],
      },
      {
        title: "UI Design",
        items: [
          "Information Architecture",
          "Interaction Design",
          "Responsive Layouts",
          "Microinteractions",
        ],
      },
      {
        title: "Design System",
        items: [
          "Design Tokens",
          "Component Library",
          "Usage Guidelines",
          "Design Ops Support",
        ],
      },
      {
        title: "Ideation & Prototyping",
        items: [
          "Concept Workshops",
          "Rapid Wireframing",
          "Interactive Prototypes",
          "Usability Experiments",
        ],
      },
    ],
    consultingLabel: "PRODUCT CONSULTING",
    consultingText:
      "Choose a Design consultancy with LOUD to transform your strategy into a living product experience, where brand, UI and systems work together to keep users engaged every day.",
    heroImage: "/media/design-hero.webp",
    potentialTitle: "Unleash Your Product's Potential",
    potentialIntro:
      "Unleash your product's potential by shaping a cohesive brand, interface and design system that makes every interaction clear, consistent and unmistakably yours.",
    potentialCards: [
      {
        title: "BRANDING",
        summary:
          "We build product brands that feel native to your market: clear positioning, strong storytelling and visuals that users remember inside and outside the app.",
        items: [
          "Brand Positioning",
          "Product Narrative",
          "Visual Identity System",
          "Voice and Tone",
        ],
        itemIcons: ["strategy", "vision", "visual", "interview"],
        itemDescriptions: [
          "We define where the product sits in the market and what makes it different. This gives the brand a clear role, audience and point of view.",
          "We shape the product story so users and stakeholders understand what the product does, why it matters and how it creates value.",
          "We define the visual identity system that supports the digital product, including typography, colors, visual direction and reusable brand elements.",
          "We define how the product speaks across interface, marketing and communication touchpoints, so the experience feels consistent and recognizable.",
        ],
      },
      {
        title: "UI DESIGN",
        summary:
          "We design intuitive interfaces that turn your brand and strategy into clear screens, flows and interactions that users understand without a manual.",
        items: [
          "Information Architecture",
          "Interaction Design",
          "Responsive Layouts",
          "Microinteractions",
        ],
        itemIcons: ["journey", "workflow", "figma", "testing"],
        itemDescriptions: [
          "We organize content, navigation and product structure so users can understand where they are and what to do next.",
          "We define how users interact with the product across screens, states and flows, making the experience intuitive and smooth.",
          "We design layouts that adapt across desktop, tablet and mobile without losing clarity, hierarchy or usability.",
          "We design small interaction details that make the interface feel responsive, polished and alive.",
        ],
      },
      {
        title: "DESIGN SYSTEM",
        summary:
          "We create scalable design systems that align product, design and engineering, speeding up delivery while keeping every release visually consistent.",
        items: [
          "Design Tokens",
          "Component Library",
          "Usage Guidelines",
          "Design Ops Support",
        ],
        itemIcons: ["deliverables", "figma", "approval", "technical"],
        itemDescriptions: [
          "We define shared design variables such as color, type, spacing and radius so the interface can scale consistently.",
          "We create reusable UI components that can be used across product screens and handed off to development.",
          "We document how components, patterns and styles should be used so future design decisions remain aligned.",
          "We support the team in organizing, maintaining and evolving the design system as the product grows.",
        ],
      },
      {
        title: "IDEATION & PROTOTYPING",
        summary:
          "We turn ideas into tangible product experiences through collaborative workshops, fast prototypes and tests that validate what really works.",
        items: [
          "Concept Workshops",
          "Rapid Wireframing",
          "Interactive Prototypes",
          "Usability Experiments",
        ],
        itemIcons: ["users", "figma", "testing", "validation"],
        itemDescriptions: [
          "We run focused workshops to generate, compare and refine ideas before committing to a single design direction.",
          "We quickly sketch and structure screen flows to explore possible product solutions with low investment.",
          "We create clickable prototypes that make the product experience testable before development starts.",
          "We test usability assumptions and interaction ideas to discover friction before the product is built.",
        ],
      },
    ],
    caseStudySlugs: ["catasto-20", "witz", "shift2cal"],
    showcaseLayout: "tagline-first",
    agencyCta: "Want to evolve your own website company?",
  },
  {
    slug: "develop",
    navLabel: "Develop.",
    eyebrow: "ENGINEERING",
    heroTitle: "Being in the Details.",
    heroBody:
      "Ship reliable digital products end to end: LOUD turns thoughtful engineering, mobile excellence and AI automation into scalable products ready for real-world operations.",
    marqueeText: "From problems to a product plan",
    heroTable: [
      {
        title: "Web Development",
        items: [
          "Application & SaaS",
          "Backend Development",
          "Performance & Scalability",
          "API Integration",
        ],
      },
      {
        title: "Design Systems",
        items: [
          "API Layer & Data",
          "Frontend Architecture",
          "Security Compliance",
          "Testing & Code Quality",
        ],
      },
      {
        title: "Mobile Development",
        items: [
          "Native iOS & Android",
          "Cross-platform Frameworks",
          "Mobile UX Optimization",
          "Store Release & Maintenance",
        ],
      },
      {
        title: "AI Automation",
        items: [
          "Opportunity Assessment",
          "Data Modelling",
          "Workflow Automation Design",
          "Integration & Training",
        ],
      },
    ],
    consultingLabel: "PRODUCT CONSULTING",
    consultingText:
      "Choose a Develop consultancy with LOUD to turn concepts into resilient, scalable software, built with full-stack precision so your digital product performs flawlessly in the real world.",
    heroImage: "/media/develop-hero.webp",
    potentialTitle: "Unleash Your Product's Potential",
    potentialIntro:
      "Unleash your product's potential by engineering every detail with mobile, AI and automation to deliver faster, smarter and more reliable experiences to your users.",
    potentialCards: [
      {
        title: "Product Architecture",
        summary:
          "We design resilient product architecture that connects frontend, backend, data and integrations, giving your digital product a stable foundation for growth.",
        items: [
          "Application & SaaS",
          "Backend Development",
          "Performance & Scalability",
          "API Integration",
        ],
        itemIcons: ["technical", "database", "milestones", "strategy"],
        itemDescriptions: [
          "We implement product interfaces using modern frontend architecture and production-ready code.",
          "We build APIs that connect the product interface, database and external services in a clean and scalable way.",
          "We optimize rendering, loading and interaction performance so the product feels fast and reliable.",
          "We connect the product with external platforms, services and APIs to extend its functionality.",
        ],
      },
      {
        title: "Web & Mobile Apps",
        summary:
          "We build web and mobile applications that feel fast, native and reliable across devices, turning product requirements into polished experiences users rely on every day.",
        items: [
          "Native iOS & Android",
          "Cross-platform Frameworks",
          "Mobile UX Optimization",
          "Store Release & Maintenance",
        ],
        itemIcons: ["smartphone", "workflow", "journey", "deliverables"],
        itemDescriptions: [
          "We craft high-performance mobile apps that feel native, reliable and aligned with your product vision.",
          "We build cross-platform experiences that preserve quality while reducing duplicate engineering effort.",
          "We optimize mobile flows for clarity, speed and usability across devices and screen sizes.",
          "We prepare apps for store release, maintenance and ongoing product iteration after launch.",
        ],
      },
      {
        title: "Cloud Infrastructure",
        summary:
          "We engineer secure, scalable cloud infrastructure and production systems so your product stays stable, observable and ready to grow under real-world load.",
        items: [
          "API Layer & Data",
          "Frontend Architecture",
          "Security Compliance",
          "Testing & Code Quality",
        ],
        itemIcons: ["database", "figma", "validation", "testing"],
        itemDescriptions: [
          "We design database structures that support product data, relationships, permissions and future growth.",
          "We build responsive screens that work across desktop, tablet and mobile while preserving the intended design quality.",
          "We implement secure authentication and access logic for users, teams and administrators.",
          "We test key flows, edge cases, responsiveness and integration behavior before launch.",
        ],
      },
      {
        title: "AI and Data Science",
        summary:
          "We integrate AI and data science into your product to automate workflows, surface insights and create smarter experiences that reduce manual work.",
        items: [
          "Opportunity Assessment",
          "Data Modelling",
          "Workflow Automation Design",
          "Integration & Training",
        ],
        itemIcons: ["search", "vision", "workflow", "bot"],
        itemDescriptions: [
          "We add AI-powered features only where they improve the actual product experience or workflow.",
          "We define data and model strategies that support reliable, useful automation inside the product.",
          "We automate repeated tasks and operational flows to reduce manual work and increase speed.",
          "We integrate AI workflows into the product and help teams adopt them with confidence.",
        ],
      },
    ],
    caseStudySlugs: ["whuis", "witz", "cercacasa"],
    showcaseLayout: "projects-first",
    agencyCta: "Want to build software that scales with your business?",
  },
];

export function getPillar(slug: string): PillarData | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getNextPillar(slug: string): PillarData {
  const idx = pillars.findIndex((p) => p.slug === slug);
  if (idx === -1) return pillars[0];
  return pillars[(idx + 1) % pillars.length];
}

export function getPrevPillar(slug: string): PillarData {
  const idx = pillars.findIndex((p) => p.slug === slug);
  if (idx === -1) return pillars[pillars.length - 1];
  return pillars[(idx - 1 + pillars.length) % pillars.length];
}
