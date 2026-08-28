import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ContactDock from "./components/layout/ContactDock";
import RouteChangeHandler from "./components/routing/RouteChangeHandler";
import Home from "./pages/Home";
import { REDIRECTS } from "./data/routes";
import { LEGAL_SEO } from "./data/seoContent";

/**
 * Every page is imported directly.
 *
 * They used to be `lazy()`, on the reasoning that a first-time visitor should
 * download the landing page and nothing else. The numbers do not support it:
 * all nine route chunks together are 24 kB gzipped, against 148 kB of React,
 * GSAP and the router that load before anything paints. The split saved a
 * sixth of the first load and charged a Suspense fallback -- an empty screen
 * where the page had been -- on every single navigation afterwards.
 *
 * For an eight-page marketing site people click through, that is the wrong
 * trade. Navigation is now instant and there is no loading state to see.
 */
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import Solution from "./pages/Solution";
import Pricing from "./pages/Pricing";
import Help from "./pages/Help";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      {/* First tab stop on every page — lets keyboard users jump the nav. */}
      <a className="skipLink" href="#main-content">
        Skip to main content
      </a>

      <RouteChangeHandler />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/solutions" element={<Solutions />} />
        {/* One route for eight industries. The component reads the slug and
            renders the 404 for anything not in `solutionsData`, so a mistyped
            industry cannot become an indexable page. */}
        <Route path="/solutions/:slug" element={<Solution />} />

        {/* Moved routes, from the same table the sitemap is built from, so a
            redirect cannot be added in one and forgotten in the other. A 404
            where a page used to be is the one migration mistake that costs
            real traffic. `replace` keeps the old path out of history. */}
        {REDIRECTS.map(({ from, to }) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Privacy, terms and cookies, one template, three explicit paths.
            React Router 7 has no regex in path patterns, and a bare `/:slug`
            here would swallow every unmatched URL on the site. */}
        {LEGAL_SEO.map(({ slug }) => (
          <Route key={slug} path={`/${slug}`} element={<Legal slug={slug} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      {/* Fixed, so it is reachable from any scroll position on any route. */}
      <ContactDock />
    </>
  );
}
