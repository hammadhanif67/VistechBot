import { CheckCircle2 } from "lucide-react";
import { pricingFaqs } from "../../data/pricingData";

export default function PricingFAQ() {
  return (
    <section className="pricingFAQ" aria-labelledby="pricing-faq-title">
      <div className="faqHeading">
        <span>Pricing clarity</span>
        <h2 id="pricing-faq-title">Frequently Asked Questions</h2>
        <p>Clear answers about trials, billing, cancellation, and data security.</p>
      </div>

      <div className="faqGrid">
        {pricingFaqs.map((item, index) => (
          <article className="faqCard" key={item.question}>
            <div className="faqNumber">{String(index + 1).padStart(2, "0")}</div>
            <div className="faqContentBlock">
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </div>
            <CheckCircle2 className="faqStatusIcon" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
