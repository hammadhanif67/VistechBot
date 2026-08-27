import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTES } from "../../data/routes";

/**
 * Cross-route housekeeping: scroll position, assistive-tech focus, and
 * ScrollTrigger measurement.
 *
 * This used to also run a generic GSAP reveal over every `<section>`, which
 * collided with the per-page animation each page already had. Motion now lives
 * in `usePageMotion`; this component only does the things a client-side router
 * breaks that a real page load would have handled for free.
 */
export default function RouteChangeHandler() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // A browser navigation moves focus to the new document. A client-side route
    // change does not, so a keyboard or screen-reader user would otherwise stay
    // parked wherever they were in the old page's tab order.
    if (!firstRender.current) {
      const main = document.getElementById("main-content");
      main?.focus({ preventScroll: true });
    }

    firstRender.current = false;

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <RouteAnnouncer pathname={pathname} />;
}

/**
 * Speaks the new page name after navigation. Without it a route change is
 * silent to a screen reader — the URL updates but nothing is announced.
 */
function RouteAnnouncer({ pathname }) {
  const label = ROUTES.find((route) => route.path === pathname)?.label ?? "Page";

  return (
    <div className="visuallyHidden" role="status" aria-live="polite" aria-atomic="true">
      {`${label} page loaded`}
    </div>
  );
}
