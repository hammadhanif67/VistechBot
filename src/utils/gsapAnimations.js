import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export function getRevealVars(direction = "up") {
  const distance = 30;
  const map = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  };

  return {
    autoAlpha: 0,
    filter: "blur(8px)",
    scale: 0.985,
    ...(map[direction] || map.up),
  };
}

export function animateHero(root) {
  const hero = root.querySelector(
    ".heroSection, .featuresHero, .pricingHero, .docsHero, .aboutHero, .contactHero, section:first-child"
  );

  if (!hero) return null;

  const heroItems = hero.querySelectorAll(
    ".pill, .heroGlowTag, h1, h2, p, .heroActions, .pricingToggle, .heroRight, .docsHeroSearch, .heroCard, .contactHeroPanel"
  );

  return gsap.timeline({ defaults: { ease: "power3.out" } }).fromTo(
    heroItems.length ? heroItems : hero,
    { autoAlpha: 0, y: 24, filter: "blur(10px)" },
    {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.72,
      stagger: 0.055,
      clearProps: "filter,transform,opacity,visibility",
    }
  );
}

export function animateRevealItems(root, options = {}) {
  const {
    selector = "[data-reveal]",
    triggerSelector = null,
    once = true,
    start = "top 86%",
  } = options;

  const items = gsap.utils.toArray(selector, root);
  if (!items.length) return [];

  return items.map((item) => {
    const direction = item.dataset.revealDir || "up";
    const delay = Number(item.dataset.revealDelay || 0) * 0.045;
    const trigger = triggerSelector ? item.closest(triggerSelector) || item : item;

    return gsap.fromTo(item, getRevealVars(direction), {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.72,
      delay,
      ease: "power3.out",
      clearProps: "filter,transform,opacity,visibility",
      scrollTrigger: {
        trigger,
        start,
        once,
      },
    });
  });
}

export function animateSectionGroups(root) {
  const sections = gsap.utils.toArray("section", root).slice(1);

  return sections.map((section) => {
    const targets = section.querySelectorAll(
      "article:not([data-reveal]), .leaderCard:not([data-reveal]), .priceCard:not([data-reveal]), .benefitCard:not([data-reveal]), .contactWayCard:not([data-reveal]), .docsQuickCard:not([data-reveal]), .docsFeatureCard:not([data-reveal]), .faqRow:not([data-reveal]), .videoCard:not([data-reveal]), .workflowItem:not([data-reveal])"
    );

    const fallback = [...section.children].filter((child) => !child.hasAttribute("data-reveal"));
    const animTargets = targets.length ? targets : fallback;

    if (!animTargets.length) return null;

    return gsap.fromTo(
      animTargets,
      { autoAlpha: 0, y: 26, scale: 0.988, filter: "blur(6px)" },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.68,
        stagger: 0.055,
        ease: "power3.out",
        clearProps: "filter,transform,opacity,visibility",
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
          once: true,
        },
      }
    );
  });
}
