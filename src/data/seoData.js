/**
 * Route-level SEO, bound to the runtime origin.
 *
 * The copy itself and the core schema nodes live in `seoContent.js`, which is
 * free of `import.meta` so the Vite config can import it and bake the same
 * values into static HTML at build time. This module is the browser-side face
 * of it: it resolves the origin from the environment and re-exports everything
 * else unchanged, so page code has one import and there is one copy of every
 * string.
 *
 * The origin is read from the environment so preview and production deploys
 * emit their own canonical URLs instead of hard-coding one domain.
 */
import { FALLBACK_SITE_URL } from "./seoContent";

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || FALLBACK_SITE_URL
).replace(/\/$/, "");

export {
  SITE_NAME,
  TWITTER_HANDLE,
  routeSeo,
  notFoundSeo,
} from "./seoContent";

import { OG_IMAGE_PATH } from "./seoContent";

export const DEFAULT_OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;

/** Re-exported so page code has one import for everything SEO-related. */
export { ROUTES } from "./routes";
