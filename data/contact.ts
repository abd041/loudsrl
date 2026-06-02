export const contactTabs = [
  { id: "business", label: "Evolve my Business", href: "/contact-us" },
  { id: "startup", label: "Start a company", href: "/contact-us?c=startup" },
  { id: "career", label: "Career", href: "/contact-us?c=career" },
] as const;

export type ContactTabId = (typeof contactTabs)[number]["id"];

/**
 * Featured row slugs — match loudsrl.com/contact-us per tab (live DOM, May 2026).
 */
export const contactFeatured: Record<ContactTabId, string[]> = {
  business: ["bike-room", "shopify-tech", "aste360"],
  startup: ["shift2cal", "ennevolte", "bike-room"],
  career: ["shiftpilot", "cercacasa", "witz"],
};

export const contactFieldPlaceholders = {
  projectType: "Full Project, Future Improvements, Maintenance",
  industry: "Real Estate, E-commerce, Music",
  description:
    "What challenge are we solving? Let's find the best solution together",
  email: "Type here your email",
  fullName: "Mario Rossi",
  country: "Italy",
  careerDescription:
    "Tell us why you'd love to join the team or what makes you a great fit.",
} as const;

export const careerPositionOptions = [
  "Frontend developer",
  "Backend developer",
  "Product designer",
  "Project manager",
] as const;

export const contactSteps = [
  {
    title: "Send us a message.",
    text: "This is like our first date, and we appreciate you are taking the first step.",
  },
  {
    title: "We will get back to you soon.",
    text: "We have a few elves helping out with correspondence, so we usually respond to inquiries very fast. Unless, you know, the elves are busy.",
  },
  {
    title: "Meet and proposal.",
    text: "We meet. We scope. We issue a proposal. We negotiate. We discuss. We agree. We get started. Simple as that!",
  },
  {
    title: "Let\u2019s collaborate!",
    text: "\u201cI think this is the beginning of a beautiful friendship\u201d. We, too, believe the best is yet to come.",
  },
];

export const budgetOptions = [
  "Under €10k",
  "€10k – €25k",
  "€25k – €50k",
  "€50k – €100k",
  "€100k+",
];

export const projectTypes = [
  "New Product",
  "Product Evolution",
  "Consulting",
  "Other",
];

export const deliverableOptions = [
  "Product Design",
  "Development",
  "UI",
  "UX",
];
