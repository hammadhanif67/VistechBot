import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function RouteChangeHandler() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });


    const main = document.querySelector("main");
    if (!main) return undefined;

    gsap.set(main, { autoAlpha: 1, clearProps: "transform" });

    if (reduceMotion()) {
      ScrollTrigger.refresh(true);
      return undefined;
    }

    const ctx = gsap.context(() => {
      const hero = main.querySelector("section:first-child, .heroSection, .featuresHero, .pricingHero, .docsHero, .aboutHero, .contactHero");
      const sections = gsap.utils.toArray("section", main).slice(1);

      if (hero) {
        gsap.fromTo(
          hero,
          { autoAlpha: 0, y: 18, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out" }
        );
      }

      sections.forEach((section) => {
        const cards = section.querySelectorAll("article, .leaderCard, .priceCard, .benefitCard, .contactWayCard, .docsQuickCard, .docsFeatureCard, .faqRow, .videoCard");
        const targets = cards.length ? cards : section.children;

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 34, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            stagger: 0.055,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              once: true,
            },
          }
        );
      });
    }, main);

    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh(true));

    return () => {
      window.cancelAnimationFrame(refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
