import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import BrandButton from "../ui/BrandButton";
import HeroAtmosphere from "../ui/HeroAtmosphere";

const heroWords = ["FAST", "RELIABLE", "HUMAN-FIRST", "SECURE", "SMART", "TRUSTED"];

export default function AboutHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".aboutSpeedWord", {
        x: -160,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
      });

      gsap.from(".aboutHeroContent > *", {
        y: 34,
        autoAlpha: 0,
        duration: 0.78,
        stagger: 0.09,
        delay: 0.22,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="aboutHero cleanHero" ref={sectionRef}>
      <HeroAtmosphere variant="about" />

      <div className="aboutSpeedPanel" aria-hidden="true">
        {heroWords.map((word) => (
          <div className="aboutSpeedWord" key={word}>
            <span>{word}</span>
            <i />
          </div>
        ))}
      </div>

      <div className="aboutHeroContent cleanHeroContent">
        <span className="aboutBadge">
          <Sparkles size={15} /> Trusted by modern support teams
        </span>

        <h1>
          Building AI that feels{" "}
          <span>useful, human, and reliable</span>
        </h1>

        <div className="aboutTitleLine" />

        <p>
          VistechBot helps teams replace repetitive support work with fast,
          measurable, and trustworthy AI automation for real customer operations.
        </p>

        <div className="aboutHeroButtons">
          <BrandButton as="button" type="button" variant="primary" className="primaryBtn">
            Get in touch <ArrowRight size={18} />
          </BrandButton>

          <BrandButton as="button" type="button" variant="ghost" className="secondaryBtn">
            View Pricing
          </BrandButton>
        </div>
      </div>
    </section>
  );
}