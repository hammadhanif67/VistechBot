import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "../../data/seoData";
import { organizationNode, websiteNode, webPageNode } from "../../data/seoContent";

/**
 * JSON-LD builders.
 *
 * Rule of thumb applied throughout: only emit a schema when the page actually
 * shows the thing it describes. Marking up content that is not on the page is
 * a manual-action risk, not an optimisation.
 *
 * The three nodes every page carries — Organization, WebSite, WebPage — are
 * defined in `data/seoContent.js` and only bound to the origin here, because
 * the Vite config builds the same nodes when it bakes JSON-LD into the static
 * HTML for each route. One definition, two callers.
 */

/**
 * No `sameAs`. The social URLs in `siteData.js` carry a "PLACEHOLDER HANDLES"
 * note, and a profile list is a claim about accounts the company controls —
 * not somewhere to guess. `organizationNode` takes the list the moment those
 * handles are confirmed real.
 */
export function organizationSchema() {
  return organizationNode(SITE_URL);
}

export function websiteSchema() {
  return websiteNode(SITE_URL);
}

export function webPageSchema({ url, title, description }) {
  return webPageNode(SITE_URL, { url, title, description });
}

/**
 * Describes the product itself. `offers` is only included on the pricing page,
 * where the prices are actually visible to a visitor.
 */
export function softwareApplicationSchema({ offers } = {}) {
  const schema = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Customer Support Automation",
    operatingSystem: "Web",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    description:
      "AI customer support platform with chat and voice agents, knowledge base automation, analytics and CRM integrations.",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  if (offers?.length) {
    schema.offers = offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "USD",
      category: offer.period,
      url: `${SITE_URL}/pricing`,
    }));
  }

  return schema;
}

/** Only valid where the questions and answers are both rendered on the page. */
export function faqSchema(items) {
  if (!items?.length) return null;

  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * An ordered list of the capabilities the platform page renders.
 *
 * Only valid on that page: the names and descriptions here are the exact ones
 * in the module list, which is the condition for the markup being honest.
 */
export function itemListSchema({ id, name, items }) {
  if (!items?.length) return null;

  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#${id}`,
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
    })),
  };
}

export function breadcrumbSchema(trail) {
  if (!trail?.length) return null;

  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/**
 * Wraps a set of node schemas into a single `@graph` document.
 *
 * Deduplicates by `@id`: pages that add `organizationSchema()` explicitly were
 * emitting the Organization node twice, once from the base graph and once from
 * their own list. Two nodes sharing an `@id` in one graph is invalid.
 */
export function buildGraph(nodes) {
  const seen = new Set();

  const graph = nodes.filter(Boolean).filter((node) => {
    const id = node["@id"];
    if (!id) return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  return { "@context": "https://schema.org", "@graph": graph };
}
