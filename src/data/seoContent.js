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

export const SITE_NAME = "VistechBot";
export const TWITTER_HANDLE = "@vistechbot";
export const OG_IMAGE_PATH = "/og-image.jpg";

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
  "/features": {
    title: "AI Chat, Voice Agents & Automation | VistechBot",
    description:
      "Nine capabilities across chat, voice, knowledge and operations. Voice agents, smart chatbots, knowledge base AI, analytics and CRM integrations, all on one platform.",
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
