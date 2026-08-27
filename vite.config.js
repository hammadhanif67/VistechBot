import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ROUTES } from "./src/data/routes.js";
import {
  OG_IMAGE_PATH,
  SITE_NAME,
  TWITTER_HANDLE,
  notFoundSeo,
  organizationNode,
  routeSeo,
  webPageNode,
  websiteNode,
} from "./src/data/seoContent.js";

const SITE_URL = (process.env.VITE_SITE_URL || "https://www.vistechbot.com").replace(/\/$/, "");

/** Where the per-route `<head>` block is spliced into index.html. */
const MARKER = "<!--seo-head-->";

/** Text destined for an HTML attribute or a text node. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * The `<head>` block for one route.
 *
 * These are the same values `components/seo/Seo.jsx` renders at runtime. They
 * are written into the HTML as well because the two consumers that matter most
 * never run the app's JavaScript:
 *
 *   - Social scrapers (Slack, LinkedIn, X, Facebook, WhatsApp) read the shipped
 *     HTML and nothing else. Before this, a shared link had no og:image, no
 *     og:title and no description of the page it actually pointed at.
 *   - A crawler's first pass indexes the raw HTML and only queues the page for
 *     JavaScript rendering afterwards. Every route used to arrive carrying the
 *     home page's title and description.
 */
function headFor({ pathname, title, description, noindex }) {
  // Root keeps its slash so the canonical, the sitemap entry and the served
  // URL are the same string.
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const image = `${SITE_URL}${OG_IMAGE_PATH}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(SITE_URL),
      websiteNode(SITE_URL),
      webPageNode(SITE_URL, { url: canonical, title, description }),
    ],
  };

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  ];

  if (noindex) {
    // No canonical on a noindex page: it would be advertising a URL that the
    // same document has just asked search engines to leave out.
    tags.push(`<meta name="robots" content="noindex, follow" />`);
  } else {
    tags.push(`<link rel="canonical" href="${canonical}" />`);
    tags.push(`<meta name="robots" content="index, follow, max-image-preview:large" />`);
  }

  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(`${SITE_NAME}: ${title}`)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${TWITTER_HANDLE}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    // JSON-LD is inert data, but a `</script>` inside a string would still end
    // the element early.
    `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`
  );

  // Marked so the app can drop them the moment React mounts its own copies;
  // without that every page would carry two titles and two descriptions.
  return tags.map((tag) => `    ${tag.replace(/^<(\w+)/, '<$1 data-static-seo=""')}`).join("\n");
}

/**
 * Emits everything a crawler needs that the SPA cannot produce on its own:
 * `sitemap.xml`, `robots.txt`, a `_redirects` fallback, and one real HTML
 * document per route.
 *
 * The route table is the single source for all of it, so a new page cannot be
 * added to the router and forgotten by the sitemap.
 */
function seoFilesPlugin() {
  let outDir = "dist";

  return {
    name: "vistechbot-seo-files",
    /* Active for `build`, which is where the files are written, and for
       `preview`, which needs the middleware below to serve them the way a
       static host would. Not for `dev`: there is no build output to route
       to, and the router handles paths itself. */
    apply: (config, env) => env.command === "build" || Boolean(env.isPreview),

    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },

    /*
       `vite preview` is an SPA server: it answers every HTML request with the
       root `index.html`, so `npm run preview` would show the home page's title
       and Open Graph tags on every route and hide exactly the thing this plugin
       exists to produce. A real static host resolves `/pricing` to
       `pricing/index.html` first. This makes the preview do the same, so what
       you inspect locally is what a crawler will be served.
    */
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url || "/").split("?")[0];
        if (req.method !== "GET" || pathname.includes(".")) return next();

        const file = path.join(outDir, pathname, "index.html");
        if (!file.startsWith(outDir) || !fs.existsSync(file)) return next();

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fs.readFileSync(file));
      });
    },

    generateBundle() {
      const lastmod = new Date().toISOString().split("T")[0];

      const urls = ROUTES.map(
        ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${routePath === "/" ? "/" : routePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
      ).join("\n");

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
      });

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
      });

      /*
         Netlify and Cloudflare Pages read this. Both serve a matching static
         file before consulting these rules, and every route now ships as its
         own `index.html`, so the only rule needed is the fallback — and it is
         served with a real 404 rather than a 200, which is what stops a
         mistyped URL being indexed as a working page.
      */
      this.emitFile({
        type: "asset",
        fileName: "_redirects",
        source: `/*    /404.html    404\n`,
      });
    },

    /*
       One real HTML document per route: the same shell with its own SEO block
       swapped in. Identical scripts and styles, so there is one app and one
       cache entry, not seven — the only thing that differs is the `<head>`.

       `writeBundle` rather than `closeBundle`, and the shell comes from the
       bundle object rather than from disk. Under Vite 8 this plugin never
       receives `transformIndexHtml` at all, and `closeBundle` fires before the
       output has been written, so both of the obvious ways to get at the
       finished HTML are wrong here. The bundle asset is the document Vite is
       about to write, which is exactly what these routes should be built from.
    */
    writeBundle(options, bundle) {
      const asset = bundle["index.html"];
      if (!asset) this.error("seoFilesPlugin: index.html is not in the bundle");

      const shell =
        typeof asset.source === "string"
          ? asset.source
          : Buffer.from(asset.source).toString("utf8");

      if (!shell.includes(MARKER)) {
        this.error(
          `seoFilesPlugin: ${MARKER} is missing from index.html. Without it ` +
            `every route would be written carrying the home page metadata.`
        );
      }

      const write = (file, seo) => {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, shell.replace(MARKER, headFor(seo)));
      };

      for (const { path: routePath } of ROUTES) {
        const seo = routeSeo[routePath];
        if (!seo) continue;

        const file =
          routePath === "/"
            ? path.join(outDir, "index.html")
            : path.join(outDir, routePath.slice(1), "index.html");

        write(file, { pathname: routePath, ...seo });
      }

      // GitHub Pages, Cloudflare Pages, Firebase and S3 all serve `404.html`
      // for an unmatched path, with a real 404 status. The SPA boots from it
      // and renders the branded not-found route.
      write(path.join(outDir, "404.html"), { pathname: "/404", ...notFoundSeo });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFilesPlugin()],
  build: {
    // Nothing here should approach this now that three.js is gone; the largest
    // chunk is React itself. A warning above it means something got bundled
    // that should have been split.
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        /**
         * Split the heavy, rarely-changing libraries out of the app chunk so a
         * copy change never invalidates the vendor cache.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("gsap")) return "gsap";
          if (id.includes("react-router")) return "router";
          if (id.includes("react-dom") || id.includes("/react/")) return "react";
          return undefined;
        },
      },
    },
  },
});
