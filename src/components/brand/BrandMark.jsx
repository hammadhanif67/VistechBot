import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * The VistechBot mark.
 *
 * One stroke: two paths converging into a single point. Many conversations,
 * one answer, and the letterform of the name in the same shape.
 *
 * It used to carry three square nodes on the V's endpoints and a signal bar
 * across its narrowest point. Each was drawn after the V in the reveal, so the
 * animation ended by stacking four more shapes onto a mark that had already
 * finished saying what it had to say — and at 26px in the navbar, which is the
 * size it is actually seen at, the nodes were four indistinct dots. The V alone
 * survives the small sizes, and it is the whole idea anyway.
 *
 * The stroke is `currentColor`, so the mark follows the theme without knowing
 * one exists. `public/favicon.svg` and the Open Graph card draw the identical
 * path.
 *
 * @param {"light"|"dark"|"mono"} tone  palette for the surface it sits on
 * @param {boolean} animated            draw the stroke once on mount
 */
export default function BrandMark({ size = 32, tone = "light", animated = false, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!animated) return undefined;
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const path = root.querySelector(".markPath");
      const length = path?.getTotalLength?.() ?? 0;

      // The V draws itself, down one side and up the other, as if the
      // connection were being established. Then it stops.
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 0.7, ease: "power3.out" }
      );
    }, root);

    return () => ctx.revert();
  }, [animated]);

  return (
    <svg
      ref={ref}
      className={`brandMark tone-${tone} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <path
        className="markPath"
        d="M4 4 L16 27 L28 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
