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
 *
 * Hash navigation is one of those things, and it was broken in both directions:
 * the effect scrolled to the top on every path change, which threw away the
 * fragment on a link like `/platform#cap-voice`, and it only watched `pathname`,
 * so clicking that same link while already on /platform did nothing at all. The
 * navigation panels are built out of exactly those links.
 */
export default function RouteChangeHandler() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduced || isFirst ? "auto" : "smooth";

    let frame = 0;
    let timer = 0;

    if (hash) {
      /*
         The target usually exists already — a panel link to a section of the page
         you are on, which is most of them — so the first attempt is synchronous.
         A route reached from another page mounts behind `Suspense`, and there
         the section does not exist for a tick or two, so failures retry.

         Retries are on a timer rather than `requestAnimationFrame`: rAF is
         suspended entirely while a document is hidden, so a link opened into a
         background tab would never scroll at all. A timer is only throttled.

         Offsetting for the sticky header is not done here — `[id]` carries
         `scroll-margin-top` in layout.css, which `scrollIntoView` honours.
      */
      const id = decodeURIComponent(hash.slice(1));
      let attempts = 0;

      const findAndScroll = () => {
        const target = document.getElementById(id);

        if (!target) {
          if (attempts++ < 25) timer = window.setTimeout(findAndScroll, 40);
          return;
        }

        /* Measure before moving, not after. `ScrollTrigger.refresh()` records
           the scroll position and restores it when it finishes, so running it
           after the scroll can undo the scroll it was meant to follow. */
        ScrollTrigger.refresh();
        target.scrollIntoView({ behavior, block: "start" });

        /* Send focus with the viewport, or a keyboard user is moved visually
           and left in the old tab position.

           Deferred, and conditional: sections revealed by `data-anim` start at
           `visibility: hidden` and only become visible when their trigger
           fires on the way past. Calling `focus()` on a hidden element fails
           silently, so this waits for the reveal and gives up rather than
           pretending it worked. */
        if (!isFirst) {
          timer = window.setTimeout(() => {
            if (getComputedStyle(target).visibility === "hidden") return;
            if (!target.matches("a, button, input, [tabindex]")) target.tabIndex = -1;
            target.focus({ preventScroll: true });
          }, 450);
        }
      };

      findAndScroll();
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // A browser navigation moves focus to the new document. A client-side route
    // change does not, so a keyboard or screen-reader user would otherwise stay
    // parked wherever they were in the old page's tab order.
    if (!isFirst) {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }

    frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

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
