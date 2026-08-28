import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import useMediaQuery from "./useMediaQuery";
import {
  initPageMotion,
  prefersReducedMotion,
  refreshTriggers,
  registerGsapPlugins,
} from "../utils/gsapAnimations";

registerGsapPlugins();

/**
 * Runs the declarative motion system over the current page.
 *
 * Called once per page component. Everything else is markup: an element opts in
 * with `data-anim` and this wires it. Re-runs on route change so each page gets
 * its animations without the router having to reach into it.
 *
 * It also re-runs when the viewport crosses 900px, because that is where the
 * scroll gating is dropped. Reading the breakpoint once at mount meant a tablet
 * rotated from landscape to portrait kept whichever wiring it happened to start
 * with until the next navigation.
 */
/** The breakpoint the navigation and the use-case accordion also switch at. */
const NARROW = "(max-width: 900px)";

export default function usePageMotion() {
  const { pathname } = useLocation();
  const narrowScreen = useMediaQuery(NARROW);

  useLayoutEffect(() => {
    const root = document.querySelector("main");
    if (!root) return undefined;

    if (prefersReducedMotion()) {
      refreshTriggers();
      return undefined;
    }

    const ctx = initPageMotion(root, { narrowScreen });

    // Measure after the browser has laid the page out, not during the effect,
    // or trigger positions are computed against a half-built DOM.
    const frame = requestAnimationFrame(refreshTriggers);

    return () => {
      cancelAnimationFrame(frame);
      ctx.revert();
    };
  }, [pathname, narrowScreen]);
}
