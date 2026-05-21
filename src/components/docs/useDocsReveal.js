import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useDocsReveal({
  itemSelector = "article",
  start = "top 82%",
} = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;

    // SAFETY BASELINE: always visible before animation starts
    gsap.set(section, { autoAlpha: 1, visibility: "visible", opacity: 1 });
    const allItems = gsap.utils.toArray(itemSelector, section);
    gsap.set(allItems, { autoAlpha: 1, visibility: "visible", opacity: 1, y: 0, scale: 1 });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(itemSelector, section);
      const headings = section.querySelectorAll(".docsSectionHead > *");
      const floatingItems = section.querySelectorAll(
        ".docsIcon, .helpOrb, .videoPlayBtn"
      );

      if (headings.length) {
        gsap.fromTo(
          headings,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.78,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (items.length) {
        gsap.fromTo(
          items,
          { y: 56, autoAlpha: 0, scale: 0.94 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.82,
            stagger: { each: 0.08, from: "start" },
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (floatingItems.length) {
        gsap.to(floatingItems, {
          y: -7,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.16,
        });
      }
    }, section);

    // Failsafe: after 1.5s force visibility if ScrollTrigger hasn't fired
    const safetyTimer = setTimeout(() => {
      if (!section) return;
      const items = gsap.utils.toArray(itemSelector, section);
      gsap.set(section, { autoAlpha: 1, opacity: 1, visibility: "visible" });
      gsap.set(items, { autoAlpha: 1, opacity: 1, visibility: "visible", y: 0, scale: 1 });
      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      ctx.revert();
      clearTimeout(safetyTimer);
    };
  }, [itemSelector, start]);

  return ref;
}
