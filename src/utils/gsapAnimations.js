import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The site's GSAP layer.
 *
 * Motion is declared in markup with a single attribute and read from here, so
 * a component never writes its own timeline for something the system already
 * does. Four behaviours cover the whole site:
 *
 *   data-anim="mask"    a line rises out of an overflow clip (display type)
 *   data-anim="rise"    fade and lift (body copy, panels, controls)
 *   data-anim="rule"    a hairline draws left to right (separators)
 *   data-anim="stack"   direct children rise in sequence (lists, grids)
 *
 * `data-anim-delay` offsets any of them; `data-anim-now` opts an element into
 * running on load instead of waiting for scroll, which is what the first
 * screen needs.
 *
 * Responsibilities are split two ways and the lanes do not overlap: GSAP owns
 * scroll-driven DOM motion, and CSS owns hover, focus and state transitions.
 * Nothing is animated by two systems at once.
 */

let pluginsReady = false;

export function registerGsapPlugins() {
  if (!pluginsReady) {
    gsap.registerPlugin(ScrollTrigger);
    pluginsReady = true;
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const FROM = {
  mask: { yPercent: 108 },
  rise: { autoAlpha: 0, y: 26 },
  rule: { scaleX: 0, transformOrigin: "left center" },
  stack: { autoAlpha: 0, y: 22 },
};

const TO = {
  mask: { yPercent: 0, duration: 0.95, ease: "power4.out" },
  rise: { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
  rule: { scaleX: 1, duration: 1.05, ease: "power3.inOut" },
  stack: { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out" },
};

/**
 * Wires every `[data-anim]` element inside `root`.
 *
 * Each animation clears its own inline styles when it finishes, so the settled
 * page is exactly what the stylesheet describes — hover states, focus rings and
 * responsive rules all take over cleanly with nothing left overriding them.
 *
 * @param {HTMLElement} root
 * @param {{narrowScreen?: boolean}} options  narrow screens skip the scroll
 *   gating entirely; the caller passes this so a resize across the breakpoint
 *   re-wires rather than keeping whatever was true when the page mounted.
 * @returns {gsap.Context} revert this to undo everything it created
 */
export function initPageMotion(root, { narrowScreen = false } = {}) {
  // A background tab throttles requestAnimationFrame to a couple of frames a
  // minute, which would leave an entrance tween parked on its `from` state —
  // above-the-fold copy invisible until the tab is focused. If the document is
  // hidden at init, the immediate elements skip straight to their end state.
  const documentHidden = typeof document !== "undefined" && document.hidden;



  return gsap.context(() => {
    gsap.utils.toArray("[data-anim]", root).forEach((element) => {
      const kind = element.dataset.anim;
      const from = FROM[kind];
      if (!from) return;

      const immediate = element.hasAttribute("data-anim-now");

      /*
         A delay sequences the first screen, where several things arrive at once
         and the order is the point. Further down it is time added to content
         that has already been scrolled to, so scroll-triggered delays are
         halved: enough to keep a section's internal order readable, not enough
         to be a wait.
      */
      const step = immediate ? 0.08 : 0.04;
      const delay = Number(element.dataset.animDelay || 0) * step;

      const targets =
        kind === "stack" ? Array.from(element.children) : element;

      if (kind === "stack" && !targets.length) return;

      const vars = {
        ...TO[kind],
        delay,
        clearProps: "transform,opacity,visibility",
        /* 0.07 was fine for a four-item row and long for a nine-item column,
           which is what a stack becomes on a phone: the last child waited
           0.63s after the first. */
        ...(kind === "stack" ? { stagger: 0.045 } : {}),
      };

      /*
         Above-the-fold elements run on load. Anything gated behind a scroll
         trigger up here would sit invisible until the visitor moved.

         Below that, on a narrow screen, nothing is gated at all: the content is
         simply there.

         A reveal is a desktop flourish. It works when the viewport is tall
         enough that a section enters well before you read it, and the motion is
         something you notice at the edge of vision. A phone has none of that.
         Everything is one tall column, each section fills the screen, and the
         effect becomes a rule that most of the page stays invisible until you
         scroll onto it -- which reads as the site being slow rather than as
         anything having been designed.

         Moving the trigger line does not fix it. `top 88%` and `top bottom-=80`
         are 17px apart on an 812px viewport; the reveal already fires about
         326px before the element reaches the middle of the screen. The problem
         is the gate, not where the gate sits.
      */
      if (!immediate && narrowScreen) {
        gsap.set(targets, { clearProps: "transform,opacity,visibility" });
        return;
      }

      if (!immediate) {
        vars.scrollTrigger = {
          trigger: element,
          start: "top bottom-=80",
          once: true,
        };
      }

      if (immediate && documentHidden) {
        gsap.set(targets, { clearProps: "transform,opacity,visibility" });
        return;
      }

      gsap.fromTo(targets, from, vars);
    });
  }, root);
}

/** Recomputes trigger positions after layout settles. */
export function refreshTriggers() {
  ScrollTrigger.refresh();
}
