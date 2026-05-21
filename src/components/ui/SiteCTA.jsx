import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SiteCTA({
  eyebrow = "AI Support Automation",
  title = "Build faster customer support with VistechBot.",
  text = "Launch smart chat, voice automation, analytics, and support workflows from one clean AI platform.",
  primaryLabel = "Start Free Trial",
  primaryTo = "/contact",
  secondaryLabel = "View Pricing",
  secondaryTo = "/pricing",
}) {
  return (
    <section className="minimalCtaCard premiumSlimCTA" aria-label="VistechBot call to action">
      <div className="ambientRay" />
      <div className="ctaGlowDot ctaGlowOne" />
      <div className="ctaGlowDot ctaGlowTwo" />

      <div className="ctaTextSide">
        <span className="monoBadge">
          <Sparkles size={14} /> {eyebrow}
        </span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>

      <div className="minimalActions">
        <Link className="actionBtn solid" to={primaryTo}>
          {primaryLabel} <ArrowRight size={16} />
        </Link>
        <Link className="actionBtn link" to={secondaryTo}>
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
