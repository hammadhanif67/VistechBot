/**
 * Route-level SEO copy and the schema builders that depend on it.
 *
 * Deliberately dependency-free and free of `import.meta`, for the same reason
 * `routes.js` is: the Vite config imports this at build time to bake per-route
 * `<title>`, description, canonical, Open Graph and JSON-LD into static HTML.
 * Anything reaching for `import.meta.env` here would crash the build, so the
 * origin arrives as an argument instead of being read from the environment.
 *
 * `seoData.js` re-exports all of it bound to the runtime origin, so page code
 * still has one import and there is one copy of every string.
 */

/**
 * The origin used when `VITE_SITE_URL` is not set.
 *
 * It is a placeholder, not a confirmed production domain. It lived in two
 * files — `seoData.js` reading `import.meta.env` and `vite.config.js` reading
 * `process.env` — which meant the two could be changed apart and the canonicals
 * would stop matching the sitemap. They read this instead.
 *
 * The build prints a warning whenever it falls back to this, because a
 * placeholder origin that ships silently is the failure mode: every canonical,
 * `og:url` and sitemap entry would point at a domain nobody owns.
 */
export const FALLBACK_SITE_URL = "https://www.vistechbot.com";

export const SITE_NAME = "VistechBot";
export const TWITTER_HANDLE = "@vistechbot";
export const OG_IMAGE_PATH = "/og-image.jpg";

/**
 * Solutions, for the build.
 *
 * Slug, name and metadata only — no icons and no page copy, because this file
 * has to stay importable by `vite.config.js` and by `routes.js`, neither of
 * which can pull in a React icon library. `solutionsData.js` reads these and
 * adds the icon and the page content on top, so a title is written once and
 * reaches the router, the sitemap, the static HTML and the page from here.
 */
export const SOLUTIONS_SEO = [
  {
    slug: "ecommerce",
    name: "E-commerce",
    title: "AI Customer Support for E-commerce | VistechBot",
    description:
      "Answer order status, returns and sizing questions the moment they are asked, on every channel. VistechBot handles the repeat traffic a retail queue is mostly made of.",
  },
  {
    slug: "saas-technology",
    name: "SaaS & Technology",
    title: "AI Customer Support for SaaS & Technology | VistechBot",
    description:
      "Answer setup, error and billing questions from your own documentation, in the product. VistechBot escalates with the full conversation attached when a human is needed.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    title: "AI Patient Support & Scheduling | VistechBot",
    description:
      "Handle appointments, pre-visit questions and intake with an assistant that answers only from what you allow it to read, and stops where clinical judgement begins.",
  },
  {
    slug: "finance",
    name: "Finance",
    title: "AI Support for Financial Services | VistechBot",
    description:
      "Answer application status, account and transaction questions from your own systems, with an explicit handoff wherever the conversation turns into advice.",
  },
  {
    slug: "education",
    name: "Education",
    title: "AI Student & Admissions Support | VistechBot",
    description:
      "Answer admissions, deadline and course questions around the clock, in the applicant's own language, through the intake peaks a fixed help desk cannot staff for.",
  },
  {
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    title: "AI Guest & Traveller Support | VistechBot",
    description:
      "Handle bookings, changes and disruption in the traveller's own language, at the hour it happens. VistechBot covers the night no rota covers well.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    title: "AI Lead Response & Viewing Scheduling | VistechBot",
    description:
      "Respond to listing enquiries the moment they arrive, qualify them against your own criteria and book viewings into a real calendar, at any hour.",
  },
  {
    slug: "logistics",
    name: "Logistics",
    title: "AI Shipment & Delivery Support | VistechBot",
    description:
      "Answer tracking, delivery window and exception questions from live shipment data, on chat and voice, without routing every caller through a menu.",
  },
];

/** `/solutions/<slug>` metadata, folded into `routeSeo` below. */
const solutionRouteSeo = Object.fromEntries(
  SOLUTIONS_SEO.map(({ slug, title, description }) => [
    `/solutions/${slug}`,
    { title, description },
  ])
);

/**
 * Titles stay under ~60 characters and descriptions under ~155 so search
 * engines show them whole. Each one is written for a person scanning results,
 * not padded with keywords.
 *
 * There is no `keywords` field. The meta tag it fed has been ignored by every
 * major search engine for well over a decade, and carrying it meant every page
 * shipped a line of markup that did nothing. A page's search intent lives in
 * its title, its description and its actual copy.
 */
export const routeSeo = {
  "/": {
    title: "VistechBot | AI Customer Support Platform",
    description:
      "AI chat and voice agents that answer customers in seconds, at any hour. VistechBot handles the repetitive half of your support queue and routes the rest to your team.",
  },
  "/platform": {
    title: "Platform: AI Chat, Voice & Automation | VistechBot",
    description:
      "Nine capabilities across chat, voice, knowledge and operations. Voice agents, smart chatbots, knowledge base AI, analytics and CRM integrations, all on one platform.",
  },
  "/solutions": {
    title: "Solutions by Industry | VistechBot",
    description:
      "Eight industries, and what the support queue is actually made of in each. See how VistechBot is pointed at retail, software, healthcare, finance, education, travel, property and logistics.",
  },
  "/pricing": {
    title: "Pricing from $49/month | VistechBot",
    description:
      "Four plans, billed monthly or yearly. Compare Starter, Business, Premium and Enterprise side by side. Every tier gets a 10-day trial and no card is required.",
  },
  "/help": {
    title: "Help Centre: Setup, FAQ & Support | VistechBot",
    description:
      "Answers to the questions that come up most, a three-step setup guide, and the configuration reference. If it is not here, the support team will get it for you.",
  },
  "/about": {
    title: "About the Team | VistechBot",
    description:
      "VistechBot builds AI support automation for teams who care what their customers actually experience. Read what we believe, what we have shipped, and who builds it.",
  },
  "/contact": {
    title: "Contact & Demo Requests | VistechBot",
    description:
      "Book a demo, ask about an integration, or get implementation help. Tell us what your support queue looks like and we will say honestly whether we can help.",
  },
};

/* The eight solution routes carry their own metadata, generated from
   SOLUTIONS_SEO above so no title is written twice. */
Object.assign(routeSeo, solutionRouteSeo);

/**
 * Legal routes.
 *
 * Indexable but low priority. They are short, factual and genuinely describe
 * this site, so there is no reason to hide them — a privacy page that turns up
 * in search is doing its job.
 */
export const LEGAL_SEO = [
  {
    slug: "privacy",
    name: "Privacy Policy",
    title: "Privacy Policy | VistechBot",
    description:
      "What this website collects, which is very little. No analytics, no tracking and no cookies; one local preference key, and whatever you choose to send through the contact form.",
  },
  {
    slug: "terms",
    name: "Terms of Use",
    title: "Terms of Use | VistechBot",
    description:
      "The terms for using the VistechBot website: what the information here is and is not, how prices on the pricing page work, and what belongs to whom.",
  },
  {
    slug: "cookies",
    name: "Cookie Policy",
    title: "Cookie Policy | VistechBot",
    description:
      "This site sets no cookies at all. It stores one colour-theme preference in local storage, which never leaves your device. That is the whole policy.",
  },
];

Object.assign(
  routeSeo,
  Object.fromEntries(
    LEGAL_SEO.map(({ slug, title, description }) => [`/${slug}`, { title, description }])
  )
);

export const notFoundSeo = {
  title: "Page Not Found | VistechBot",
  description: "This page does not exist. The platform, pricing and documentation pages are all working.",
  noindex: true,
};

/* -------------------------------------------------------------------------
   CORE SCHEMA NODES

   The three nodes every page carries. They live here rather than in
   `structuredData.js` because the build needs them too, and two
   implementations of the same graph would drift.
   ------------------------------------------------------------------------- */

export function organizationNode(siteUrl, sameAs = []) {
  const node = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/favicon.svg`,
    },
    description:
      "VistechBot builds AI chat and voice agents that automate customer support for modern businesses.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@vistechbot.com",
      availableLanguage: ["en"],
    },
  };

  /* Callers pass `sameAs` only once the profiles are real. The handles in
     `siteData.js` are still marked as placeholders, and asserting an account
     that may not exist is the kind of unverifiable claim that gets structured
     data ignored. Pass the URLs here the day they are confirmed. */
  if (sameAs.length) node.sameAs = sameAs;

  return node;
}

export function websiteNode(siteUrl) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_NAME,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function webPageNode(siteUrl, { url, title, description }) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
  };
}
