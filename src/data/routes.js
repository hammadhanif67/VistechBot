/* Extension included: the Vite config loads this file in Node, where a
   bare specifier does not resolve. */
import { SOLUTIONS_SEO } from "./seoContent.js";

/**
 * The site's route table.
 *
 * Free of `import.meta` and of anything that pulls in React, so the Vite config
 * can import it at build time to emit `sitemap.xml` and one HTML file per
 * route. One list, so a new page cannot be added to the router and forgotten by
 * the sitemap.
 *
 * The eight solution routes are derived rather than typed out: adding an
 * industry to `SOLUTIONS_SEO` gives it a route, a sitemap entry and a
 * pre-rendered HTML file with no edit here.
 */
const CORE = [
  { path: "/", label: "Home", changefreq: "weekly", priority: "1.0" },
  { path: "/platform", label: "Platform", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions", label: "Solutions", changefreq: "monthly", priority: "0.9" },
  { path: "/pricing", label: "Pricing", changefreq: "monthly", priority: "0.9" },
  { path: "/help", label: "Help Centre", changefreq: "monthly", priority: "0.8" },
  { path: "/about", label: "About", changefreq: "yearly", priority: "0.6" },
  { path: "/contact", label: "Contact", changefreq: "yearly", priority: "0.7" },
];

const SOLUTION_ROUTES = SOLUTIONS_SEO.map(({ slug, name }) => ({
  path: `/solutions/${slug}`,
  label: name,
  changefreq: "monthly",
  priority: "0.7",
}));

export const ROUTES = [...CORE, ...SOLUTION_ROUTES];

/**
 * Routes that have moved, and where they went.
 *
 * `/features` became `/platform` when the architecture split "what the product
 * does" from "who it is for". The old path is kept as a redirect rather than
 * deleted: it was in a published sitemap, and a 404 where a page used to be is
 * the one migration mistake that costs real traffic.
 *
 * These are not in `ROUTES`, so they never reach the sitemap.
 */
export const REDIRECTS = [{ from: "/features", to: "/platform" }];
