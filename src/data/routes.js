/**
 * The site's route table.
 *
 * Deliberately dependency-free and free of `import.meta` so the Vite config can
 * import it at build time to emit `sitemap.xml`. One list, so a new page cannot
 * be added to the router and forgotten by the sitemap.
 */
export const ROUTES = [
  { path: "/", label: "Home", changefreq: "weekly", priority: "1.0" },
  { path: "/features", label: "Features", changefreq: "monthly", priority: "0.9" },
  { path: "/pricing", label: "Pricing", changefreq: "monthly", priority: "0.9" },
  { path: "/help", label: "Help Centre", changefreq: "monthly", priority: "0.8" },
  { path: "/about", label: "About", changefreq: "yearly", priority: "0.6" },
  { path: "/contact", label: "Contact", changefreq: "yearly", priority: "0.7" },
];
