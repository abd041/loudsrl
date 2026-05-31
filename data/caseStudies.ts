/* Auto-generated from scripts/case-studies-live.json — do not edit by hand */

export type CaseStudyMedia = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CaseStudyFunctionality = {
  title: string;
  layout: string;
  description: string;
  secondDescription: string | null;
  gallery: CaseStudyMedia[];
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  loudX: string;
  link: string | null;
  linkLabel: string | null;
  projectTypeLabel: string;
  stageLabel: string;
  deliverablesLabel: string;
  projectType: string[];
  stage: string;
  deliverables: string[];
  status: string;
  numberOfUsers: string;
  introduction: string;
  previewImage: string;
  mainPic: CaseStudyMedia | null;
  functionalities: CaseStudyFunctionality[];
  testimonial: CaseStudyTestimonial | null;
  metaTitle: string;
  metaDescription: string;
  /** Legacy fields used by cards / rows */
  services: string[];
  platform: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
};

export const caseStudyOrder = ["aste360","balloon","bike-room","catasto-20","cercacasa","ennevolte","shift2cal","shiftpilot","shopify-tech","whuis","witz"] as const;

export const allCaseStudies = [
  {
    "slug": "aste360",
    "name": "Aste360"
  },
  {
    "slug": "balloon",
    "name": "Balloon"
  },
  {
    "slug": "bike-room",
    "name": "Bike-Room"
  },
  {
    "slug": "catasto-20",
    "name": "Catasto 2.0"
  },
  {
    "slug": "cercacasa",
    "name": "Cercacasa"
  },
  {
    "slug": "ennevolte",
    "name": "Ennevolte"
  },
  {
    "slug": "shift2cal",
    "name": "Shift2Cal"
  },
  {
    "slug": "shiftpilot",
    "name": "ShiftPilot"
  },
  {
    "slug": "shopify-tech",
    "name": "Shopify Tech"
  },
  {
    "slug": "whuis",
    "name": "Whuis"
  },
  {
    "slug": "witz",
    "name": "WITZ"
  }
] as const;

export const caseStudies = [
  {
    "slug": "aste360",
    "title": "Aste360",
    "subtitle": "Smart real estate auction monitoring",
    "industry": "Real Estate & Artificial Intelligence",
    "loudX": "ASTE360",
    "link": null,
    "linkLabel": null,
    "projectTypeLabel": "DATA STRATEGY",
    "stageLabel": "CORE ENGINE",
    "deliverablesLabel": "CORE TECH",
    "projectType": [
      "AI Scraping",
      "Market Analysis Tools",
      "Database Management",
      "Data Visualization"
    ],
    "stage": "Smart real estate auction monitoring",
    "deliverables": [
      "Auction Aggregation",
      "Monitoring Platform"
    ],
    "status": "",
    "numberOfUsers": "",
    "introduction": "Created with the mission to provide a leading platform for reliability and efficiency in the Italian judicial real estate sector. Powered by a comprehensive database, the project aims to intercept a potential market of over 723,000 clients, including lawyers, real estate agencies, and small private investors.",
    "previewImage": "/media/aste360-project-preview.png",
    "mainPic": {
      "url": "/media/aste360-cover-1.png",
      "alt": "aste360-cover.png",
      "width": 1920,
      "height": 960
    },
    "functionalities": [
      {
        "title": "AI Data Scraping & Aggregation",
        "layout": "layout-1",
        "description": "We employ advanced data mining technologies to scan and aggregate all auctions nationwide in real-time.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/aste360-1.webp",
            "alt": "aste360-1",
            "width": 2240,
            "height": 1680
          },
          {
            "url": "/media/aste360-2.webp",
            "alt": "aste360-2",
            "width": 3200,
            "height": 1840
          },
          {
            "url": "/media/aste360-3.webp",
            "alt": "aste360-3",
            "width": 2240,
            "height": 1680
          }
        ]
      },
      {
        "title": "Market Analysis & OMI Evaluation Tools",
        "layout": "layout-2",
        "description": "The platform integrates advanced market analysis tools, including OMI (Osservatorio del Mercato Immobiliare) evaluations and price comparisons.",
        "secondDescription": "Unlike competitors that offer simple listings, ASTE360 provides in-depth analytics that allow users to instantly assess the profitability of every lot.",
        "gallery": [
          {
            "url": "/media/aste360-4.webp",
            "alt": "aste360-4",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/aste360-5.webp",
            "alt": "aste360-5",
            "width": 1680,
            "height": 2240
          }
        ]
      },
      {
        "title": "Scalable Professional Solutions",
        "layout": "layout-3",
        "description": "We structured flexible pricing plans to suit different user types, from private individuals to large notary firms.",
        "secondDescription": "The solution is scaled to serve a Serviceable Addressable Market (SAM) with a potential value of €84 million, offering intuitive interfaces for both occasional users and institutional investors.",
        "gallery": [
          {
            "url": "/media/aste360-6.webp",
            "alt": "aste360-6",
            "width": 2400,
            "height": 3200
          },
          {
            "url": "/media/aste360-7.png",
            "alt": "aste360-7.png",
            "width": 1280,
            "height": 960
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“Thanks to ASTE360, we have reduced the time spent on manual procedure research by 70%. The precision of the integrated OMI data allows us to present our clients with granular, professional investment analyses that previously took days of work.”",
      "author": "MARCO VALERI",
      "role": "Partner at Studio Legale Immobiliare Associati"
    },
    "metaTitle": "Aste360 | Smart real estate auction monitoring | LOUD",
    "metaDescription": "created with the mission to provide a leading platform for reliability and efficiency in the Italian judicial real estate sector. Powered by a comprehensive database, the project aims to intercept a potential market of over 723,000 clients, including lawyers, real estate agencies, and small private investors.",
    "services": [
      "Auction Aggregation",
      "Monitoring Platform"
    ],
    "platform": "AI Scraping",
    "year": "",
    "description": "Created with the mission to provide a leading platform for reliability and efficiency in the Italian judicial real estate sector. Powered by a comprehensive database, the project aims to intercept a potential market of over 723,000 clients, including lawyers, real estate agencies, and small private investors.",
    "challenge": "We employ advanced data mining technologies to scan and aggregate all auctions nationwide in real-time.",
    "solution": "The platform integrates advanced market analysis tools, including OMI (Osservatorio del Mercato Immobiliare) evaluations and price comparisons."
  },
  {
    "slug": "balloon",
    "title": "Balloon",
    "subtitle": "iOS & Android",
    "industry": "Mobile Apps",
    "loudX": "Balloon",
    "link": "https://balloon.travel",
    "linkLabel": "Download it",
    "projectTypeLabel": "FOCUS AREAS",
    "stageLabel": "PRODUCT CATEGORY",
    "deliverablesLabel": "EXPERTISE",
    "projectType": [
      "Marketing",
      "Mobile App",
      "Intelligence"
    ],
    "stage": "Travel App",
    "deliverables": [
      "Product Design",
      "Engineering",
      "Mobile App"
    ],
    "status": "Live Now",
    "numberOfUsers": "+30k Download",
    "introduction": "Born in 2020, at a time when travelling was largely impossible due to COVID and people could only dream about new destinations. Instead of planning the next trip, travellers wanted a way to reconnect with the journeys they had already made.",
    "previewImage": "/media/preview-project-balloon.jpg",
    "mainPic": {
      "url": "/media/home-preview-balloon-1.jpg",
      "alt": "home-preview-balloon.jpg",
      "width": 6000,
      "height": 3000
    },
    "functionalities": [
      {
        "title": "Personalized",
        "layout": "layout-1",
        "description": "From the very first screen, Balloon adapts to you. We ask what matters most in your trips – luxury, family travel, accessibility needs, or other priorities – and use those choices to guide your entire experience. This way every country insight, suggestion and detail feels more relevant to how you actually travel, not to some generic tourist.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/preview-balloon-1.jpg",
            "alt": "preview-balloon-1.jpg",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/preview-balloon-2.jpg",
            "alt": "preview-balloon-2.jpg",
            "width": 6000,
            "height": 3000
          },
          {
            "url": "/media/preview-balloon-3.jpg",
            "alt": "preview-balloon-3.jpg",
            "width": 3200,
            "height": 2400
          }
        ]
      },
      {
        "title": "Country Insights",
        "layout": "layout-2",
        "description": "For every country – whether it’s one you’ve already visited or one Balloon suggests – you get a structured, professional profile instead of just a pin on the map.",
        "secondDescription": "The travel industry is no stranger to disruption. And in the post-pandemic world, travel companies must continuously reinvent to outwit unforeseen circumstances, while providing cohesive, elevated experiences for customers.",
        "gallery": [
          {
            "url": "/media/preview-balloon-4.jpg",
            "alt": "preview-balloon-4.jpg",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/preview-balloon-6.jpg",
            "alt": "preview-balloon-6.jpg",
            "width": 3200,
            "height": 2400
          }
        ]
      },
      {
        "title": "Innovation on Mobile Platforms",
        "layout": "layout-3",
        "description": "At LOUD, we systematically adopt new operating system releases wherever they create real value for users",
        "secondDescription": "Features such as widgets, dark mode, “liquid glass” effects and other native capabilities are evaluated and implemented across our apps when they enhance clarity, usability and engagement.",
        "gallery": [
          {
            "url": "/media/preview-balloon-5.jpg",
            "alt": "preview-balloon-5.jpg",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/preview-balloon-7.jpg",
            "alt": "preview-balloon-7.jpg",
            "width": 3200,
            "height": 2400
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“It’s a great app and they have the best customer service of all time. I had a tiny problem and they did everything they can to solve it and now I can use this great app thanks to Balloon Team.”",
      "author": "OZGUNOCAKLI",
      "role": "Balloon Travel - AppStore"
    },
    "metaTitle": "Balloon | Travel App | LOUD",
    "metaDescription": "Born in 2020, at a time when travelling was largely impossible due to COVID and people could only dream about new destinations. Instead of planning the next trip, travellers wanted a way to reconnect with the journeys they had already made.",
    "services": [
      "Product Design",
      "Engineering",
      "Mobile App"
    ],
    "platform": "Marketing",
    "year": "",
    "description": "Born in 2020, at a time when travelling was largely impossible due to COVID and people could only dream about new destinations. Instead of planning the next trip, travellers wanted a way to reconnect with the journeys they had already made.",
    "challenge": "From the very first screen, Balloon adapts to you. We ask what matters most in your trips – luxury, family travel, accessibility needs, or other priorities – and use those choices to guide your entire experience. This way every country insight, suggestion and detail feels more relevant to how you actually travel, not to some generic tourist.",
    "solution": "For every country – whether it’s one you’ve already visited or one Balloon suggests – you get a structured, professional profile instead of just a pin on the map."
  },
  {
    "slug": "bike-room",
    "title": "Bike-Room",
    "subtitle": "From Zero to Exit: Scaling E-commerce",
    "industry": "E-Commerce",
    "loudX": "LOUD x BIKE-ROOM",
    "link": "https://bike-room.com",
    "linkLabel": "Website",
    "projectTypeLabel": "TECH STRATEGY",
    "stageLabel": "BUSINESS MILESTONE",
    "deliverablesLabel": "VENTURE SERVICES",
    "projectType": [
      "Shopify API Middleware",
      "Co-founding",
      "Tech Strategy",
      "Custom BI Software",
      "Multi-Warehouse Sync"
    ],
    "stage": "From Zero to Exit: Scaling E-commerce",
    "deliverables": [
      "Venture Building",
      "Shopify Custom App",
      "API Middleware",
      "Business Intelligence Tool"
    ],
    "status": "Live Now",
    "numberOfUsers": "+100 Monthly Orders",
    "introduction": "Bike-room is a success story of technical co-founding. We engineered the entire tech stack from day zero, scaling it to millions in turnover and a successful exit. We transformed a standard Shopify setup into a high-performance marketplace hub, integrating external partners and automating the entire supply chain via custom APIs.",
    "previewImage": "/media/bikeroom-project-preview.webp",
    "mainPic": {
      "url": "/media/bikeroom-cover.webp",
      "alt": "bikeroom-cover",
      "width": 2160,
      "height": 1080
    },
    "functionalities": [
      {
        "title": "API-Driven Marketplace Infrastructure",
        "layout": "layout-1",
        "description": "We developed a custom external platform that serves as the \"brain\" of the operation, connected to Shopify via webhooks and high-speed APIs.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/bikeroom-1.webp",
            "alt": "bikeroom-1",
            "width": 2560,
            "height": 1920
          },
          {
            "url": "/media/bikeroom-2.webp",
            "alt": "bikeroom-2",
            "width": 3200,
            "height": 1840
          },
          {
            "url": "/media/bikeroom-3.webp",
            "alt": "bikeroom-3",
            "width": 2560,
            "height": 1920
          }
        ]
      },
      {
        "title": "Automated Multi-Partner Synchronization",
        "layout": "layout-2",
        "description": "Managing prices and stock levels across diverse partners requires surgical precision and zero manual entry.",
        "secondDescription": "We built an automated synchronization engine that updates quantities and dynamic pricing every night via API. This ensures that the global stock from various warehouses is always accurate, preventing overselling and pricing errors in a volatile market.",
        "gallery": [
          {
            "url": "/media/bikeroom-4.webp",
            "alt": "bikeroom-4",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/bikeroom-5.webp",
            "alt": "bikeroom-5",
            "width": 1680,
            "height": 2240
          }
        ]
      },
      {
        "title": "BI & Technical Data Asset Management",
        "layout": "layout-3",
        "description": "Beyond the sale, we built a comprehensive technical database of bicycle specifications and a custom Business Intelligence suite.",
        "secondDescription": "By aggregating data from the marketplace and external ERPs, we provided the leadership team with real-time insights into profitability and inventory forecasting, turning raw data into the company’s most valuable asset for the exit.",
        "gallery": [
          {
            "url": "/media/bikeroom-6.webp",
            "alt": "bikeroom-6",
            "width": 1200,
            "height": 1600
          },
          {
            "url": "/media/bikeroom-7.webp",
            "alt": "bikeroom-7",
            "width": 3200,
            "height": 2400
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“They engineered our entire business backbone. We moved from a standard e-commerce to a custom operational ecosystem that now manages over €8 million in sales effortlessly.”",
      "author": "MATTEO M.",
      "role": "CEO - Bike-Room"
    },
    "metaTitle": "Bike-room | From Zero to Exit: Scaling E-commerce | LOUD",
    "metaDescription": "Bike-room is a success story of technical co-founding. We engineered the entire tech stack from day zero, scaling it to millions in turnover and a successful exit.",
    "services": [
      "Venture Building",
      "Shopify Custom App",
      "API Middleware",
      "Business Intelligence Tool"
    ],
    "platform": "Shopify API Middleware",
    "year": "",
    "description": "Bike-room is a success story of technical co-founding. We engineered the entire tech stack from day zero, scaling it to millions in turnover and a successful exit. We transformed a standard Shopify setup into a high-performance marketplace hub, integrating external partners and automating the entire supply chain via custom APIs.",
    "challenge": "We developed a custom external platform that serves as the \"brain\" of the operation, connected to Shopify via webhooks and high-speed APIs.",
    "solution": "Managing prices and stock levels across diverse partners requires surgical precision and zero manual entry."
  },
  {
    "slug": "catasto-20",
    "title": "Catasto 2.0",
    "subtitle": "Real-Time Data Warehouse",
    "industry": "Real Estate",
    "loudX": "CATASTO 2.0",
    "link": null,
    "linkLabel": null,
    "projectTypeLabel": "DATA ASSETS",
    "stageLabel": "DATA INFRA",
    "deliverablesLabel": "ENGINEERING",
    "projectType": [
      "Data Warehouse",
      "Analytics Dashboard"
    ],
    "stage": "Real-Time Data Warehouse",
    "deliverables": [
      "Data Architecture",
      "AI Development",
      "API Engineering"
    ],
    "status": "",
    "numberOfUsers": "80+ Milions Data Points",
    "introduction": "A new, modern data layer for the entire Real Estate industry, centralizing millions of records, enriching them with real-time updates and unlocking API access to information previously obtainable only through manual requests",
    "previewImage": "/media/catasto-preview.jpg",
    "mainPic": {
      "url": "/media/preview-catasto-home-1.jpg",
      "alt": "preview-catasto-home.jpg",
      "width": 2400,
      "height": 1800
    },
    "functionalities": [
      {
        "title": "Unified Data Layer",
        "layout": "layout-1",
        "description": "Public and proprietary records are merged into a single, coherent database—providing complete visibility over every property in Italy.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/preview-catasto-3.jpg",
            "alt": "preview-catasto-3.jpg",
            "width": 1920,
            "height": 2961
          },
          {
            "url": "/media/jaron-nix-Cc2iy_f8RQ8-unsplash (1) (3).jpg",
            "alt": "preview-catasto-2.jpg",
            "width": 4210,
            "height": 2631
          },
          {
            "url": "/media/kaspars-upmanis-Z0AcAo2luII-unsplash (2) (2).jpg",
            "alt": "cover-catasto.jpg",
            "width": 1920,
            "height": 2880
          }
        ]
      },
      {
        "title": "Real-Time Ownership Updates",
        "layout": "layout-2",
        "description": "The system tracks every change in ownership or cadastral status, notifying clients as soon as new information becomes available.",
        "secondDescription": "This real-time visibility allows companies to anticipate market movements, identify opportunities early and operate with fully up-to-date data.",
        "gallery": [
          {
            "url": "/media/preview-catasto-8.jpg",
            "alt": "preview-catasto-8.jpg",
            "width": 1920,
            "height": 2880
          },
          {
            "url": "/media/catasto-hover.jpg",
            "alt": "catasto-hover.jpg",
            "width": 2000,
            "height": 2000
          }
        ]
      },
      {
        "title": "Automated Document Engine",
        "layout": "layout-3",
        "description": "Visure, floor plans and official acts are retrieved through a fully automated workflow, eliminating manual requests and human bottlenecks.",
        "secondDescription": "By streamlining document acquisition, the platform reduces delivery times from hours to seconds, ensuring faster due-diligence and smoother integrations.",
        "gallery": [
          {
            "url": "/media/preview-catasto-6.jpg",
            "alt": "preview-catasto-6.jpg",
            "width": 1920,
            "height": 1080
          },
          {
            "url": "/media/preview-catasto-7.jpg",
            "alt": "preview-catasto-7.jpg",
            "width": 3264,
            "height": 2448
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“The Italian cadastral system has been stuck in the past for decades. We’re rewriting the rules — turning a slow, fragmented bureaucracy into a modern, intelligent data infrastructure.”",
      "author": "ANGELA CHIOFALO",
      "role": "Real Estate Expert"
    },
    "metaTitle": "CATASTO 2.0 | Real-Time Data  Warehouse | LOUD",
    "metaDescription": "A new, modern data layer for the entire Real Estate industry, centralizing millions of records, enriching them with real-time updates and unlocking API access to information previously obtainable only through manual requests.",
    "services": [
      "Data Architecture",
      "AI Development",
      "API Engineering"
    ],
    "platform": "Data Warehouse",
    "year": "",
    "description": "A new, modern data layer for the entire Real Estate industry, centralizing millions of records, enriching them with real-time updates and unlocking API access to information previously obtainable only through manual requests",
    "challenge": "Public and proprietary records are merged into a single, coherent database—providing complete visibility over every property in Italy.",
    "solution": "The system tracks every change in ownership or cadastral status, notifying clients as soon as new information becomes available."
  },
  {
    "slug": "cercacasa",
    "title": "Cercacasa",
    "subtitle": "Real Estate Search Engine",
    "industry": "Real Estate",
    "loudX": "LOUD x CERCACASA",
    "link": "https://cercacasa.it",
    "linkLabel": "Website",
    "projectTypeLabel": "CHANNELS",
    "stageLabel": "ENGINE TYPE",
    "deliverablesLabel": "CORE SERVICES",
    "projectType": [
      "Website",
      "Mobile App",
      "Dashboard"
    ],
    "stage": "Real Estate Search Engine",
    "deliverables": [
      "Product Design",
      "Engineering",
      "Architecture"
    ],
    "status": "Live Now",
    "numberOfUsers": "200.000k+ Monthly Users",
    "introduction": "Cercacasa introduces a new generation of marketplace functionality. From verified agent onboarding to MLS collaboration, geolocated search and automated listing validation, every feature is crafted to improve trust and reduce friction.",
    "previewImage": "/media/ai-cercacasa-home-1.jpg",
    "mainPic": {
      "url": "/media/home-cercacasa.jpg",
      "alt": "home-cercacasa.jpg",
      "width": 3639,
      "height": 2585
    },
    "functionalities": [
      {
        "title": "Verified Professionals",
        "layout": "layout-1",
        "description": "Certified agent and agency validation ensures the platform hosts only trusted, authorized operators—bringing transparency and reliability to every listing.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/preview-cercacasa-app-2.jpg",
            "alt": "preview-cercacasa-app-2.jpg",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/ai-cercacasa-home-1.jpg",
            "alt": "ai-cercacasa-home-1.jpg",
            "width": 2000,
            "height": 2000
          },
          {
            "url": "/media/preview-cercacasa-app-1.jpg",
            "alt": "preview-cercacasa-app-1.jpg",
            "width": 3200,
            "height": 2400
          }
        ]
      },
      {
        "title": "MLS Collaboration",
        "layout": "layout-2",
        "description": "The MLS system enables agencies to share and manage listings within a unified environment, eliminating duplicates and improving the overall quality of available properties.",
        "secondDescription": "By centralizing collaboration, the platform increases transparency and accelerates transactions, giving agencies a scalable way to expand their portfolio and reach more clients.",
        "gallery": [
          {
            "url": "/media/preview-cercacasa-app-3.jpg",
            "alt": "preview-cercacasa-app-3.jpg",
            "width": 1970,
            "height": 2030
          },
          {
            "url": "/media/preview-cercacasa-web-3.jpg",
            "alt": "preview-cercacasa-web-3.jpg",
            "width": 3200,
            "height": 2400
          }
        ]
      },
      {
        "title": "Intelligent Lead Routing",
        "layout": "layout-3",
        "description": "Cercacasa automatically directs each request to the most relevant local professional, ensuring users receive faster, more accurate support.",
        "secondDescription": "This smart distribution system enhances conversion rates and helps agencies focus on high-value opportunities by matching leads to expertise, location and availability.",
        "gallery": [
          {
            "url": "/media/preview-cercacasa-web-2.jpg",
            "alt": "preview-cercacasa-web-2.jpg",
            "width": 2678,
            "height": 3140
          },
          {
            "url": "/media/cercacasa-context.jpg",
            "alt": "cercacasa-context.jpg",
            "width": 1920,
            "height": 1440
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“Thanks to LOUD we redefined online property search in Italy: a modern, transparent platform fully connected to the national Real Estate data ecosystem.”",
      "author": "PAOLO RIGHI",
      "role": "Founder & CEO  -  The Business Partners"
    },
    "metaTitle": "Cercacasa.it | Real Estate Search Engine | LOUD",
    "metaDescription": "Cercacasa introduces a new generation of marketplace functionality. From verified agent onboarding to MLS collaboration, geolocated search and automated listing validation, every feature is crafted to improve trust and reduce friction.",
    "services": [
      "Product Design",
      "Engineering",
      "Architecture"
    ],
    "platform": "Website",
    "year": "",
    "description": "Cercacasa introduces a new generation of marketplace functionality. From verified agent onboarding to MLS collaboration, geolocated search and automated listing validation, every feature is crafted to improve trust and reduce friction.",
    "challenge": "Certified agent and agency validation ensures the platform hosts only trusted, authorized operators—bringing transparency and reliability to every listing.",
    "solution": "The MLS system enables agencies to share and manage listings within a unified environment, eliminating duplicates and improving the overall quality of available properties."
  },
  {
    "slug": "ennevolte",
    "title": "Ennevolte",
    "subtitle": "Custom Middleware & Ticketing Platform",
    "industry": "E-Commerce",
    "loudX": "LOUD x Ennevolte",
    "link": "https://ennevolte.com",
    "linkLabel": "Website",
    "projectTypeLabel": "INTEGRATIONS",
    "stageLabel": "ARCHITECTURE",
    "deliverablesLabel": "TECH DELIVERABLES",
    "projectType": [
      "Marketing Website",
      "Mobile App",
      "Real-Time Dashboard"
    ],
    "stage": "-----",
    "deliverables": [
      "Shopify Integration",
      "Custom Middleware",
      "Vendor Portal"
    ],
    "status": "Live Now",
    "numberOfUsers": "",
    "introduction": "We designed a custom tech ecosystem that bridges the Ennevolte Shopify store with external accounting software and CRM systems. By developing a dedicated external platform, we enabled automated invoicing and provided theaters with a secure, independent portal to manage ticket sales.",
    "previewImage": "/media/ennevolte-project-preview.webp",
    "mainPic": {
      "url": "/media/ennevolte-cover.webp",
      "alt": "ennevolte-cover",
      "width": 1920,
      "height": 960
    },
    "functionalities": [
      {
        "title": "API Middleware & Webhook Architecture",
        "layout": "layout-1",
        "description": "We built a secure, event-driven middleware that listens to Shopify webhooks in real-time to capture order and customer data.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/ennevolte-1.webp",
            "alt": "ennevolte-1",
            "width": 2560,
            "height": 1920
          },
          {
            "url": "/media/ennevolte-2.webp",
            "alt": "ennevolte-2",
            "width": 3200,
            "height": 1840
          },
          {
            "url": "/media/ennevolte-3.webp",
            "alt": "ennevolte-3",
            "width": 2240,
            "height": 1680
          }
        ]
      },
      {
        "title": "CRM & Automated Invoicing Integration",
        "layout": "layout-2",
        "description": "The custom platform automatically maps incoming Shopify order data directly to the company's existing CRM and billing software.",
        "secondDescription": "This eliminates manual data entry and ensures that complex tax rules, invoicing requirements, and customer records are perfectly synchronized across all platforms.",
        "gallery": [
          {
            "url": "/media/ennevolte-4.webp",
            "alt": "ennevolte-4",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/ennevolte-5.webp",
            "alt": "ennevolte-5",
            "width": 1680,
            "height": 2240
          }
        ]
      },
      {
        "title": "Dedicated Vendor Portals (Theater Management)",
        "layout": "layout-3",
        "description": "We developed a secure, external dashboard specifically for theaters and event organizers to independently track ticket sales and validate access.",
        "secondDescription": "Vendors can log in to view real-time capacities and manage attendee lists, completely removing the need to grant them access to the main Shopify admin panel.",
        "gallery": [
          {
            "url": "/media/ennevolte-6.webp",
            "alt": "ennevolte-6",
            "width": 2400,
            "height": 3200
          },
          {
            "url": "/media/ennevolte-7.webp",
            "alt": "ennevolte-7",
            "width": 3200,
            "height": 2400
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“Before LOUD, managing theater ticketing and complex invoicing through standard Shopify apps was incredibly inefficient. Their custom middleware completely automated our workflow, perfectly syncing our CRM and giving our partners the independent access they needed.”",
      "author": "IVANO ARCA",
      "role": "Digital Marketing Manager - Ennevolte"
    },
    "metaTitle": "Ennevolte | Custom Middleware & Ticketing Platform | LOUD",
    "metaDescription": "We designed a custom tech ecosystem that bridges the Ennevolte Shopify store with external accounting software and CRM systems. By developing a dedicated external platform, we enabled automated invoicing and provided theaters with a secure, independent portal to manage ticket sales.",
    "services": [
      "Shopify Integration",
      "Custom Middleware",
      "Vendor Portal"
    ],
    "platform": "Marketing Website",
    "year": "",
    "description": "We designed a custom tech ecosystem that bridges the Ennevolte Shopify store with external accounting software and CRM systems. By developing a dedicated external platform, we enabled automated invoicing and provided theaters with a secure, independent portal to manage ticket sales.",
    "challenge": "We built a secure, event-driven middleware that listens to Shopify webhooks in real-time to capture order and customer data.",
    "solution": "The custom platform automatically maps incoming Shopify order data directly to the company's existing CRM and billing software."
  },
  {
    "slug": "shift2cal",
    "title": "Shift2Cal",
    "subtitle": "Shift App Manager Intelligence Platform",
    "industry": "Mobile Apps",
    "loudX": "Shift2Cal",
    "link": "https://shift2cal.com",
    "linkLabel": "Download it",
    "projectTypeLabel": "CORE FEATURES",
    "stageLabel": "MISSION",
    "deliverablesLabel": "DELIVERABLES",
    "projectType": [
      "Marketing",
      "Mobile App",
      "Intelligence"
    ],
    "stage": "Shift App Manager Intelligence Platform",
    "deliverables": [
      "Product Design",
      "Engineering",
      "Mobile App"
    ],
    "status": "Live Now",
    "numberOfUsers": "+50.000 Shift Converted",
    "introduction": "Many people today manage shifts with photos in WhatsApp, Telegram or other messaging apps, or with sheets pinned to a board and random screenshots. That’s exactly where this app comes in open that, frame the shift image, and it takes care of the rest.",
    "previewImage": "/media/shift2cal-project-preview.webp",
    "mainPic": {
      "url": "/media/shift2cal-cover.webp",
      "alt": "shift2cal-cover",
      "width": 2400,
      "height": 1200
    },
    "functionalities": [
      {
        "title": "AI-Powered Calendar",
        "layout": "layout-1",
        "description": "Designed to turn unstructured schedule files into clean, reliable calendar data. It combines OCR, table parsing and pattern recognition to interpret photos, PDFs and CSV exports, automatically detecting dates, times, shift labels and, when available, employee names.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/shift2cal-1.webp",
            "alt": "shift2cal-1",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/shift2cal-2.webp",
            "alt": "shift2cal-2",
            "width": 3200,
            "height": 1840
          },
          {
            "url": "/media/shift2cal-3.webp",
            "alt": "shift2cal-3",
            "width": 3200,
            "height": 2400
          }
        ]
      },
      {
        "title": "Works with Apple, Google and Microsoft",
        "layout": "layout-2",
        "description": "Built around a tight integration with the main calendar ecosystems, so imported shifts become first-class events rather than a parallel system. After connection to Apple Calendar, Google Calendar or Outlook via the native account on the device or secure sign-in.",
        "secondDescription": "Each shift is converted into a proper event with start/end time, title, notes and optional alerts, respecting the device time zone and the default notification settings of the chosen calendar.",
        "gallery": [
          {
            "url": "/media/shift2cal-4.webp",
            "alt": "shift2cal-4",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/shift2cal-5.webp",
            "alt": "shift2cal-5",
            "width": 2400,
            "height": 3200
          }
        ]
      },
      {
        "title": "Sharing Model",
        "layout": "layout-3",
        "description": "When a rota includes multiple people, the app can derive a per-person schedule and let each user see who else is on shift for a given day or time slot",
        "secondDescription": "Because shifts are saved as standard calendar events, users can also share their work calendar through existing Apple Calendar, Google Calendar or Outlook sharing features, or export a snapshot of upcoming shifts when they need to coordinate with a team lead or coworker outside the app.",
        "gallery": [
          {
            "url": "/media/shift2cal-6.webp",
            "alt": "shift2cal-6",
            "width": 2400,
            "height": 3200
          },
          {
            "url": "/media/shift2cal-7.webp",
            "alt": "shift2cal-7",
            "width": 2560,
            "height": 1920
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“Before this app I used to spend half an hour every month copying everything into my calendar, and I still made mistakes.”",
      "author": "ANDROID USER",
      "role": "Shift2Cal - Google Play Store"
    },
    "metaTitle": "Shift2Cal | Shift App Manager Intelligence Platform | LOUD",
    "metaDescription": "Many people today manage shifts with photos in WhatsApp, Telegram or other messaging apps, or with sheets pinned to a board and random screenshots. That’s exactly where this app comes in open that, frame the shift image, and it takes care of the rest.",
    "services": [
      "Product Design",
      "Engineering",
      "Mobile App"
    ],
    "platform": "Marketing",
    "year": "",
    "description": "Many people today manage shifts with photos in WhatsApp, Telegram or other messaging apps, or with sheets pinned to a board and random screenshots. That’s exactly where this app comes in open that, frame the shift image, and it takes care of the rest.",
    "challenge": "Designed to turn unstructured schedule files into clean, reliable calendar data. It combines OCR, table parsing and pattern recognition to interpret photos, PDFs and CSV exports, automatically detecting dates, times, shift labels and, when available, employee names.",
    "solution": "Built around a tight integration with the main calendar ecosystems, so imported shifts become first-class events rather than a parallel system. After connection to Apple Calendar, Google Calendar or Outlook via the native account on the device or secure sign-in."
  },
  {
    "slug": "shiftpilot",
    "title": "ShiftPilot",
    "subtitle": "AI Workforce Scheduling Platform",
    "industry": "Artificial Intelligence",
    "loudX": "ShiftPilot",
    "link": "https://shiftcalendar.it",
    "linkLabel": "Website",
    "projectTypeLabel": "AI SCOPE",
    "stageLabel": "PLATFORM TYPE",
    "deliverablesLabel": "SERVICES",
    "projectType": [
      "Marketing Website",
      "Mobile App",
      "Real-Time Dashboard"
    ],
    "stage": "AI Workforce Scheduling Platform",
    "deliverables": [
      "Product Design",
      "Marketing Site",
      "Engineering"
    ],
    "status": "WIP",
    "numberOfUsers": "",
    "introduction": "Powered by a hybrid AI system, it combines language models with deterministic optimization algorithms to generate the best shift plans in seconds. It drastically reduces the time spent on Excel, minimizes errors, and makes last-minute changes effortless. ShiftPilot takes into account contracts, employee preferences, skills, and coverage needs across every role and time slot.",
    "previewImage": "/media/shiftpilot-project-preview.webp",
    "mainPic": {
      "url": "/media/shiftpilot-cover.webp",
      "alt": "shiftpilot-cover",
      "width": 1920,
      "height": 960
    },
    "functionalities": [
      {
        "title": "Custom Rules for Team Performance",
        "layout": "layout-1",
        "description": "Build schedules based on advanced rules tailored to your organization: who works best together, role requirements, rotations, and specific business constraints. ShiftPilot optimizes not only coverage, but also collaboration and balance within the team.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/shiftpilot-1.webp",
            "alt": "shiftpilot-1",
            "width": 1800,
            "height": 2400
          },
          {
            "url": "/media/shiftpilot-8.webp",
            "alt": "shiftpilot-2",
            "width": 3200,
            "height": 1840
          },
          {
            "url": "/media/shiftpilot-3.webp",
            "alt": "shiftpilot-3",
            "width": 1800,
            "height": 2400
          }
        ]
      },
      {
        "title": "Natural Language Request Management",
        "layout": "layout-2",
        "description": "Employees can submit vacation requests, shift swaps, or last-minute absences through simple chat messages or a bot — no complicated forms",
        "secondDescription": "Managers receive everything in a structured workflow, approve in one click, and schedules update instantly with automatic notifications.",
        "gallery": [
          {
            "url": "/media/shiftpilot-4.webp",
            "alt": "shiftpilot-4",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/shiftpilot-5.webp",
            "alt": "shiftpilot-5",
            "width": 2400,
            "height": 3200
          }
        ]
      },
      {
        "title": "Smart Scheduling Aligned with Labor Contracts",
        "layout": "layout-3",
        "description": "Shift Pilot automatically respects contract limits, rest periods, overtime rules, and national labor compliance requirements.",
        "secondDescription": "Every schedule is generated to avoid violations, reduce extra costs, and ensure fair, sustainable workloads for everyone.",
        "gallery": [
          {
            "url": "/media/shiftpilot-6.webp",
            "alt": "shiftpilot-6",
            "width": 2400,
            "height": 3200
          },
          {
            "url": "/media/shiftpilot-7.webp",
            "alt": "shiftpilot-7",
            "width": 3200,
            "height": 2400
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“ShiftPilot completely changed the way we manage shifts. What used to take hours now takes minutes — schedules are fairer, fully compliant, and our team feels much more supported. Handling absences and last-minute changes is finally stress-free.”",
      "author": "INTIMISSIMI ROMA",
      "role": "Retail Operations Manager"
    },
    "metaTitle": "ShiftPilot | AI Workforce Scheduling Platform | LOUD",
    "metaDescription": "An intelligent platform that transforms workforce scheduling for retail stores and complex operational teams",
    "services": [
      "Product Design",
      "Marketing Site",
      "Engineering"
    ],
    "platform": "Marketing Website",
    "year": "",
    "description": "Powered by a hybrid AI system, it combines language models with deterministic optimization algorithms to generate the best shift plans in seconds. It drastically reduces the time spent on Excel, minimizes errors, and makes last-minute changes effortless. ShiftPilot takes into account contracts, employee preferences, skills, and coverage needs across every role and time slot.",
    "challenge": "Build schedules based on advanced rules tailored to your organization: who works best together, role requirements, rotations, and specific business constraints. ShiftPilot optimizes not only coverage, but also collaboration and balance within the team.",
    "solution": "Employees can submit vacation requests, shift swaps, or last-minute absences through simple chat messages or a bot — no complicated forms"
  },
  {
    "slug": "shopify-tech",
    "title": "Shopify Tech",
    "subtitle": "Shopify Custom Development",
    "industry": "E-Commerce",
    "loudX": "LOUD x Shopify",
    "link": null,
    "linkLabel": null,
    "projectTypeLabel": "ECOSYSTEM",
    "stageLabel": "CORE CHALLENGE",
    "deliverablesLabel": "SOLUTIONS",
    "projectType": [
      "Shopify Custom App",
      "Headless Commerce",
      "Systems Integrations"
    ],
    "stage": "----",
    "deliverables": [
      "--"
    ],
    "status": "",
    "numberOfUsers": "",
    "introduction": "We architect custom e-commerce ecosystems for scaling brands that have outgrown standard Shopify capabilities. By developing private apps, middleware, and headless solutions, we resolve complex operational bottlenecks while maintaining a fast, flexible infrastructure.",
    "previewImage": "/media/shopify-tech-project-preview.webp",
    "mainPic": {
      "url": "/media/shopify-tech-cover-1.webp",
      "alt": "shopify-tech-cover",
      "width": 2400,
      "height": 1200
    },
    "functionalities": [
      {
        "title": "Custom App Development & Backend Logic",
        "layout": "layout-1",
        "description": "We engineer private Shopify applications to handle advanced business rules like dynamic pricing algorithms, custom bundling, and conditional shipping.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/shopify-tech-1.webp",
            "alt": "shopify-tech-1",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/shopify-tech-2.webp",
            "alt": "shopify-tech-2",
            "width": 2400,
            "height": 3200
          },
          {
            "url": "/media/shopify-tech-3.webp",
            "alt": "shopify-tech-3",
            "width": 3200,
            "height": 2400
          }
        ]
      },
      {
        "title": "System Integration & Data Synchronization",
        "layout": "layout-2",
        "description": "Enterprise operations require real-time, automated data communication between Shopify and internal software infrastructures.",
        "secondDescription": "We build custom middleware and API connectors to seamlessly sync data with your ERP, CRM, or PIM systems. This ensures data integrity and eliminates manual entry for multi-warehouse inventories and complex B2B/B2C order routing.",
        "gallery": [
          {
            "url": "/media/shopify-tech-4.webp",
            "alt": "shopify-tech-4",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/shopify-tech-5.webp",
            "alt": "shopify-tech-5",
            "width": 2400,
            "height": 3200
          }
        ]
      },
      {
        "title": "Data Visualization & Analytics",
        "layout": "layout-3",
        "description": "Standard Shopify reporting often lacks the granular depth required to analyze complex, multi-channel e-commerce operations.",
        "secondDescription": "We engineer custom dashboards and real-time data pipelines that aggregate your storefront metrics with external ERP or marketing sources. This provides a centralized, accurate view of profitability, customer cohorts, and inventory forecasting.",
        "gallery": [
          {
            "url": "/media/shopify-tech-6.webp",
            "alt": "shopify-tech-6",
            "width": 2400,
            "height": 3200
          },
          {
            "url": "/media/shopify-tech-7.webp",
            "alt": "shopify-tech-7",
            "width": 3200,
            "height": 2400
          }
        ]
      }
    ],
    "testimonial": null,
    "metaTitle": "Shopify Tech | Shopify Custom Development | LOUD",
    "metaDescription": "We architect custom e-commerce ecosystems for scaling brands that have outgrown standard Shopify capabilities.",
    "services": [
      "--"
    ],
    "platform": "Shopify Custom App",
    "year": "",
    "description": "We architect custom e-commerce ecosystems for scaling brands that have outgrown standard Shopify capabilities. By developing private apps, middleware, and headless solutions, we resolve complex operational bottlenecks while maintaining a fast, flexible infrastructure.",
    "challenge": "We engineer private Shopify applications to handle advanced business rules like dynamic pricing algorithms, custom bundling, and conditional shipping.",
    "solution": "Enterprise operations require real-time, automated data communication between Shopify and internal software infrastructures."
  },
  {
    "slug": "whuis",
    "title": "Whuis",
    "subtitle": "Real Estate Intelligence Platform",
    "industry": "Real Estate",
    "loudX": "LOUD x WHUIS",
    "link": "https://whuis.com",
    "linkLabel": "Website",
    "projectTypeLabel": "TECH STACK",
    "stageLabel": "PRODUCT GOAL",
    "deliverablesLabel": "DELIVERABLES",
    "projectType": [
      "Marketing Website",
      "Mobile App",
      "Real-Time Dashboard"
    ],
    "stage": "Real Estate Intelligence Platform",
    "deliverables": [
      "Product Design",
      "Marketing Site",
      "Engineering"
    ],
    "status": "Live Now",
    "numberOfUsers": "+25.000 Monthly Users",
    "introduction": "Born to streamline complex verification processes, Whuis brings data, documents, and insights together into a single, intelligent platform. Designed for professionals and everyday users alike, it transforms slow, fragmented workflows into a seamless, transparent experience.",
    "previewImage": "/media/whuis-1.jpg",
    "mainPic": {
      "url": "/media/whuis-cover-1.jpg",
      "alt": "whuis-cover.jpg",
      "width": 2400,
      "height": 1350
    },
    "functionalities": [
      {
        "title": "Real-Time Monitoring",
        "layout": "layout-1",
        "description": "Whuis tracks changes in property ownership and official records, notifying users instantly and unlocking new opportunities ahead of the market.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/whuis-1.jpg",
            "alt": "whuis-1.jpg",
            "width": 1920,
            "height": 1280
          },
          {
            "url": "/media/whuis-2.png",
            "alt": "whuis-2.png",
            "width": 1600,
            "height": 1200
          },
          {
            "url": "/media/whuis-3.jpg",
            "alt": "whuis-3.jpg",
            "width": 1920,
            "height": 2880
          }
        ]
      },
      {
        "title": "Territorial Insights",
        "layout": "layout-2",
        "description": "Whuis lets you explore any area with precision, mapping property ownership, asset distribution and key territorial patterns. A powerful way to unlock insights that traditional tools can’t reveal.",
        "secondDescription": "Through advanced geographic queries, you can instantly identify owners within a selected zone, monitor changes and discover opportunities before competitors. Location data becomes a strategic advantage.",
        "gallery": [
          {
            "url": "/media/whuis-4.png",
            "alt": "whuis-4.png",
            "width": 1600,
            "height": 1200
          },
          {
            "url": "/media/whuis-5.jpg",
            "alt": "whuis-5.jpg",
            "width": 1728,
            "height": 1152
          }
        ]
      },
      {
        "title": "Instant Property & Documents Verification",
        "layout": "layout-2",
        "description": "Whuis centralizes ownership details, cadastral data, and official records into a single view—making property checks faster, clearer, and fully reliable.",
        "secondDescription": "Title deeds, floor plans, appraisals and official records are retrieved automatically from certified sources, reducing hours of manual work to just a few seconds.",
        "gallery": [
          {
            "url": "/media/whuis-6.png",
            "alt": "whuis-6.png",
            "width": 1339,
            "height": 1570
          },
          {
            "url": "/media/whuis-7.jpg",
            "alt": "whuis-7.jpg",
            "width": 1920,
            "height": 1280
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“Working with LOUD was a real game-changer. Their ability to combine design, technology and strategy allowed us to turn a complex idea into a powerful product that users truly love.”",
      "author": "DANIELE MANCINI",
      "role": "Founder & CEO  -  GO NEXT GROUP"
    },
    "metaTitle": "Whuis.com | Real Estate Intelligence Platform | LOUD",
    "metaDescription": "Born to streamline complex verification processes, Whuis brings data, documents, and insights together into a single, intelligent platform. Designed for professionals and everyday users alike, it transforms slow, fragmented workflows into a seamless, transparent experience.",
    "services": [
      "Product Design",
      "Marketing Site",
      "Engineering"
    ],
    "platform": "Marketing Website",
    "year": "",
    "description": "Born to streamline complex verification processes, Whuis brings data, documents, and insights together into a single, intelligent platform. Designed for professionals and everyday users alike, it transforms slow, fragmented workflows into a seamless, transparent experience.",
    "challenge": "Whuis tracks changes in property ownership and official records, notifying users instantly and unlocking new opportunities ahead of the market.",
    "solution": "Whuis lets you explore any area with precision, mapping property ownership, asset distribution and key territorial patterns. A powerful way to unlock insights that traditional tools can’t reveal."
  },
  {
    "slug": "witz",
    "title": "WITZ",
    "subtitle": "AI-Powered Quiz Game",
    "industry": "Mobile Apps & Artificial Intelligence",
    "loudX": "WITZ",
    "link": "https://witzapp.com/",
    "linkLabel": "Download it",
    "projectTypeLabel": "FOCUS AREAS",
    "stageLabel": "GAME CONCEPT",
    "deliverablesLabel": "SERVICES",
    "projectType": [
      "Marketing",
      "Mobile App"
    ],
    "stage": "AI-Powered Quiz Game ",
    "deliverables": [
      "Product Design",
      "Engineering",
      "Mobile App",
      "Marketing"
    ],
    "status": "Live Now",
    "numberOfUsers": "+5.000 Daily Game Played",
    "introduction": "Multiplayer trivia game that lets you challenge friends with constantly updated quizzes on topics tailored to your interests",
    "previewImage": "/media/home-witz.jpg",
    "mainPic": {
      "url": "/media/home-witz.jpg",
      "alt": "home-witz.jpg",
      "width": 3140,
      "height": 1570
    },
    "functionalities": [
      {
        "title": "Thematic Quizzes",
        "layout": "layout-1",
        "description": "Curated quiz packs on specific topics – from geography and sports to TV series and niche local culture. Players don’t just answer random questions: they “specialize” in the themes they care about and collect rewards as they master each one.",
        "secondDescription": null,
        "gallery": [
          {
            "url": "/media/with-preview-home.jpg",
            "alt": "with-preview-home.jpg",
            "width": 3200,
            "height": 2400
          },
          {
            "url": "/media/witz-preview-shop-themes.jpg",
            "alt": "witz-preview-shop-themes.jpg",
            "width": 3140,
            "height": 1570
          },
          {
            "url": "/media/with-preview-theme-4.jpg",
            "alt": "with-preview-theme-4.jpg",
            "width": 3938,
            "height": 2400
          }
        ]
      },
      {
        "title": "Subscription & Purchases",
        "layout": "layout-2",
        "description": "We combines ads, in-app purchases, and subscriptions to keep both the player experience and the business sustainable. Light, well-timed ads let casual users play for free and discover new themes.",
        "secondDescription": "Targeted in-app purchases unlock specific quiz packs, cosmetics, or special modes people actually care about, instead of generic paywalls. On top of that, a subscription tier gives power users access to premium themes, fewer interruptions, and early access to new content drops.",
        "gallery": [
          {
            "url": "/media/with-preview-shop-2.jpg",
            "alt": "with-preview-shop-2.jpg",
            "width": 2786,
            "height": 3278
          },
          {
            "url": "/media/with-preview-shop-sub.jpg",
            "alt": "with-preview-shop-sub.jpg",
            "width": 3200,
            "height": 2400
          }
        ]
      },
      {
        "title": "AI-Powered",
        "layout": "layout-3",
        "description": "AI as a content engine to power highly specific and local quiz topics that traditional trivia games rarely touch.",
        "secondDescription": "That helps us generate and update structured questions on niche themes, adapt them to each market’s language and references, and keep them fresh over time by adding new facts and retiring outdated ones.",
        "gallery": [
          {
            "url": "/media/witz-ai-worlds.jpg",
            "alt": "witz-ai-worlds.jpg",
            "width": 3140,
            "height": 1570
          },
          {
            "url": "/media/witz-ai-worlds-ui.jpg",
            "alt": "witz-ai-worlds-ui.jpg",
            "width": 2708,
            "height": 3416
          }
        ]
      }
    ],
    "testimonial": {
      "quote": "“My name is Tommaso and I am visually impaired. This quiz game is very accessible even for users with visual disabilities, and for this reason the developers deserve a lot of praise. Keep up the great work!”",
      "author": "TOMMASO BATTISTA",
      "role": "WITZ - AppStore"
    },
    "metaTitle": "WITZ | AI-Powered Quiz Game | LOUD",
    "metaDescription": "Multiplayer trivia game that lets you challenge friends with constantly updated quizzes on topics tailored to your interests",
    "services": [
      "Product Design",
      "Engineering",
      "Mobile App",
      "Marketing"
    ],
    "platform": "Marketing",
    "year": "",
    "description": "Multiplayer trivia game that lets you challenge friends with constantly updated quizzes on topics tailored to your interests",
    "challenge": "Curated quiz packs on specific topics – from geography and sports to TV series and niche local culture. Players don’t just answer random questions: they “specialize” in the themes they care about and collect rewards as they master each one.",
    "solution": "We combines ads, in-app purchases, and subscriptions to keep both the player experience and the business sustainable. Light, well-timed ads let casual users play for free and discover new themes."
  }
] as const satisfies readonly CaseStudy[];

export type CaseStudySlug = (typeof caseStudies)[number]["slug"];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const idx = caseStudyOrder.indexOf(slug as CaseStudySlug);
  if (idx === -1) return caseStudies[0];
  return caseStudies[(idx + 1) % caseStudies.length];
}
