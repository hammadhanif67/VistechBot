import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Mail, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import BrandButton from "../ui/BrandButton";
import HeroAtmosphere from "../ui/HeroAtmosphere";

const contactHighlights = [
  { icon: MessageCircle, label: "Live routing", text: "Fast support handoff" },
  { icon: ShieldCheck, label: "Secure support", text: "Protected conversations" },
  { icon: Sparkles, label: "Smart guidance", text: "Clear next steps" },
];

export default function ContactHero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".contactHeroContent > *", {
        y: 26,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
      });

      gsap.from(".contactHeroChip", {
        y: 18,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.to(".contactHeroOrb", {
        y: -12,
        x: 7,
        repeat: -1,
        yoyo: true,
        duration: 3.4,
        stagger: 0.25,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contactHero contactHeroSolo cleanHero" ref={heroRef}>
      <HeroAtmosphere variant="contact" />

      <span className="contactHeroOrb orbOne" />
      <span className="contactHeroOrb orbTwo" />
      <span className="contactHeroOrb orbThree" />

      <div className="contactHeroContent cleanHeroContent">
        <span className="contactBadge">
          <Mail size={14} />
          Support command center
        </span>

        <h1>
          Talk to the team that builds
          <span>AI support systems</span>
        </h1>

        <p>
          Get implementation guidance, product support, and integration answers
          through a focused contact experience built around clear actions.
        </p>

        <div className="contactHeroActions">
          <BrandButton href="#contact-form" variant="primary" className="contactPrimaryBtn">
            Start a conversation <ArrowRight size={18} />
          </BrandButton>

          <BrandButton as={Link} to="/docs" variant="ghost" className="contactSecondaryBtn">
            <BookOpen size={18} /> Read docs
          </BrandButton>
        </div>

        <div className="contactHeroChips" aria-label="Contact support highlights">
          {contactHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <span className="contactHeroChip" key={item.label}>
                <Icon size={17} />
                <span>
                  <b>{item.label}</b>
                  <small>{item.text}</small>
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}