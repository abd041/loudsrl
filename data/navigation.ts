export const mainNav = [
  { label: "Think.", href: "/pillars/think", withPeriod: true },
  { label: "Design.", href: "/pillars/design", withPeriod: true },
  { label: "Develop.", href: "/pillars/develop", withPeriod: true },
  { label: "Manifesto", href: "/manifesto", withPeriod: false },
  { label: "Studio", href: "/studio", withPeriod: false },
] as const;

export const footerNav = {
  loud: [
    { label: "Think", href: "/pillars/think" },
    { label: "Design", href: "/pillars/design" },
    { label: "Develop", href: "/pillars/develop" },
    { label: "Manifesto", href: "/manifesto" },
    { label: "Studio", href: "/studio" },
  ],
  contact: [
    { label: "Careers", href: "/contact-us?c=career" },
    { label: "Contact Us", href: "/contact-us?c=business" },
    { label: "Start a company", href: "/contact-us?c=startup" },
  ],
  social: [
    { label: "Linkedin", href: "https://www.linkedin.com/company/loudsrl/" },
    { label: "Instagram", href: "https://www.instagram.com/loudsrl/" },
  ],
};
