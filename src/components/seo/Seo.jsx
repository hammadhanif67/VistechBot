import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  routeSeo,
} from "../../data/seoData";
import {
  buildGraph,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "./structuredData";

/**
 * Per-route document metadata.
 *
 * React 19 hoists `<title>`, `<meta>` and `<link>` out of the component tree
 * into `<head>` on its own, so this needs no helmet-style dependency and no
 * imperative DOM writing — the tags are just part of each page's render.
 *
 * The build also bakes these same values into a static HTML file per route
 * (see `seoFilesPlugin` in vite.config.js) and marks them `data-static-seo`;
 * `main.jsx` drops that copy before the first render so a page never carries
 * two titles. What this component adds on top is correctness across
 * client-side navigation, which static HTML cannot do.
 *
 * @param {object} [override] page-specific values, defaults come from `routeSeo`
 * @param {Array}  [schemas]  extra JSON-LD nodes for this page (FAQ, offers, …)
 */
export default function Seo({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  schemas = [],
  ogType = "website",
}) {
  const { pathname } = useLocation();

  const defaults = routeSeo[pathname] ?? {};
  const pageTitle = title ?? defaults.title ?? SITE_NAME;
  const pageDescription = description ?? defaults.description ?? "";

  /* Canonicals point at the clean path - no query string, no trailing slash -
     so campaign-tagged and paginated URLs consolidate onto one address. Root
     is the exception and keeps its slash, matching the sitemap entry, the
     static HTML the build emits, and the URL a server actually serves. */
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;

  const graph = buildGraph([
    organizationSchema(),
    websiteSchema(),
    webPageSchema({ url: canonical, title: pageTitle, description: pageDescription }),
    ...schemas,
  ]);

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {/* A noindex page has no business advertising a canonical: it would
          name a URL the same document has just asked to be left out. */}
      {!noindex && <link rel="canonical" href={canonical} />}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME}: ${pageTitle}`} />
      <meta property="og:locale" content="en_US" />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      <script
        type="application/ld+json"
        // Serialised once per route change; the content mirrors what the page
        // actually renders, which is the condition for the markup being valid.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </>
  );
}
