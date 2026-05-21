import { useState } from "react";
import { ArrowRight, Headphones } from "lucide-react";
import { useDocsReveal } from "./useDocsReveal";
import { faqs, helpItems } from "./docsData";

const matches = (item, query) => !query || `${item.tag} ${item.question} ${item.answer}`.toLowerCase().includes(String(query).trim().toLowerCase());

export default function DocsFAQ({ query = "" }) {
  const ref = useDocsReveal({ itemSelector: ".faqRow, .helpFeature" });
  const [open, setOpen] = useState(0);

  return (
    <section className="docsFaqSection docsReveal" ref={ref} id="docs-faq">
      <div className="docsSectionHead splitHead">
        <div>
          <span className="docsSectionEyebrow">Answers</span>
          <h2>Frequently Asked Questions</h2>
          <p>Clear answers for setup, billing, integrations, privacy and account management.</p>
        </div>
      </div>

      <div className="docsFaqLayout">
        <div className="docsFaqList">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <article className={`faqRow ${isOpen ? "active" : ""} ${matches(item, query) ? "isVisible" : "isDimmed"}`} key={item.question}>
                <span className={`faqTag ${item.color}`}>{item.tag}</span>
                <button className="faqContent" type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </button>
              </article>
            );
          })}
        </div>

        <aside className="docsHelpCard" id="docs-help">
          <div className="helpOrb"><Headphones size={62} /></div>
          <h2>Still Need Help?</h2>
          <p>Get real human support for technical setup, product configuration and onboarding.</p>
          <div className="helpFeatureList">
            {helpItems.map(({ icon: Icon, title, text }) => (
              <div className="helpFeature" key={title}>
                <Icon size={22} />
                <span><b>{title}</b><small>{text}</small></span>
              </div>
            ))}
          </div>
          <button className="docsPrimaryBtn" type="button">Contact Support <ArrowRight size={16} /></button>
        </aside>
      </div>
    </section>
  );
}
