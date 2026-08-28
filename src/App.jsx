import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ContactDock from "./components/layout/ContactDock";
import RouteChangeHandler from "./components/routing/RouteChangeHandler";
import RouteFallback from "./components/routing/RouteFallback";
import Home from "./pages/Home";
import { REDIRECTS } from "./data/routes";

/**
 * Home ships in the entry bundle because it is the landing route and its LCP
 * should not wait on a second request. Every other page is split out, so a
 * first-time visitor downloads the marketing homepage and nothing else.
 */
const Platform = lazy(() => import("./pages/Platform"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Solution = lazy(() => import("./pages/Solution"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Help = lazy(() => import("./pages/Help"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <>
      {/* First tab stop on every page — lets keyboard users jump the nav. */}
      <a className="skipLink" href="#main-content">
        Skip to main content
      </a>

      <RouteChangeHandler />
      <Navbar />

      <Suspense fallback={<RouteFallback />}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />

      {/* Fixed, so it is reachable from any scroll position on any route. */}
      <ContactDock />
    </>
  );
}
