import { useSyncExternalStore } from "react";

/**
 * Whether a media query currently matches.
 *
 * `useSyncExternalStore` rather than `useState` + an effect: the matcher is
 * external state that can change between render and commit, and subscribing to
 * it directly is the API built for exactly that. It also means the first render
 * already has the right answer instead of flipping on mount.
 *
 * @param {string} query a CSS media query, e.g. "(max-width: 900px)"
 */
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    // No DOM to measure before hydration; the desktop layout is the default.
    () => false
  );
}
