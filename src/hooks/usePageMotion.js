import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
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
 * with `data-anim` and this wires it. Re-runs on route change so a lazily
 * mounted page gets its animations without the router having to reach into it.
 */
export default function usePageMotion() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.querySelector("main");
    if (!root) return undefined;

    if (prefersReducedMotion()) {
      refreshTriggers();
      return undefined;
    }

    const ctx = initPageMotion(root);

    // Measure after the browser has laid the page out, not during the effect,
    // or trigger positions are computed against a half-built DOM.
    const frame = requestAnimationFrame(refreshTriggers);

    return () => {
      cancelAnimationFrame(frame);
      ctx.revert();
    };
  }, [pathname]);
}
