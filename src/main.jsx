import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

/* Order matters: fonts and tokens, then base, then structure, then components,
   then the page-level compositions that build on all of it.

   Urbanist is self-hosted from `public/fonts` (see styles/fonts.css). That
   replaces the `@import url(fonts.googleapis.com…)` at the top of the old
   index.css, which was render-blocking and serialised: parse the CSS, open a
   connection to Google, fetch a second stylesheet, and only then paint text. */
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./index.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/navbar_footer.css";
import "./styles/home.css";
import "./styles/features.css";
import "./styles/solutions.css";
import "./styles/pricing.css";
import "./styles/docs.css";
import "./styles/about.css";
import "./styles/contact.css";

/*
   Drop the metadata the build baked into this document's <head>.

   Each route ships as a real HTML file carrying its own title, description,
   canonical and Open Graph tags, which is what social scrapers and a crawler's
   first pass read. React 19 then hoists the same tags from `Seo.jsx` — but it
   appends rather than replaces, so leaving the static ones in place gave every
   page two titles and two descriptions, and after a client-side navigation the
   stale pair described the page the visitor had come from.

   Removing them here, before the first render, leaves exactly one of each.
   Anything that never runs this script — every non-JS crawler — still sees the
   full static block.
*/
document.querySelectorAll("head [data-static-seo]").forEach((tag) => tag.remove());

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
