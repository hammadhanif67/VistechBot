import { BarChart3, Bot, Headphones, ShieldCheck } from "lucide-react";

const pricingValueCards = [
  [Bot, "AI Support Suite", "Smart chatbot, voice flows, and automation tools in one clean workspace."],
  [BarChart3, "Growth Insights", "Track conversations, response quality, and team performance without bulky pricing cards."],
  [ShieldCheck, "Secure Setup", "Enterprise-ready access control, data safety, and scalable configuration."],
  [Headphones, "Guided Onboarding", "Get help choosing the right package before committing to a monthly or yearly plan."],
];

export default function PricingReplacement() {
  return (
    <section className="pricingValueSection" aria-label="Pricing overview">
      <div className="pricingValueIntro">
        <span>Plans paused for review</span>
        <h2>Flexible AI support packages built around your workflow.</h2>
        <p>
          The old monthly/yearly toggle and pricing cards are kept in comments for later use.
          For now, this section keeps the pricing page clean, professional, and conversion-focused.
        </p>
      </div>

      <div className="pricingValueGrid">
        {pricingValueCards.map(([Icon, title, text]) => (
          <article className="pricingValueCard" key={title}>
            <Icon size={22} strokeWidth={2.1} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
