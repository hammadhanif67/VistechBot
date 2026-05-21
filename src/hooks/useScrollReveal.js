import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function useScrollReveal(rootSelector = "main") {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.querySelector(rootSelector) || document;
    const elements = [...root.querySelectorAll("[data-reveal]")];

    if (!elements.length) return undefined;

    elements.forEach((el) => el.classList.remove("is-visible"));

    if (prefersReducedMotion()) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname, rootSelector]);
}
