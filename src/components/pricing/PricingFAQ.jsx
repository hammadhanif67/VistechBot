import SectionHead from "../common/SectionHead";
import { pricingFaqs } from "../../data/pricingData";

/**
 * Pricing FAQ.
 *
 * Answers are always visible. An accordion here would hide the exact content
 * the page exists to provide, and the previous build shipped `aria-expanded` on
 * rows that never expanded — a disclosure that only pretended to be one.
 *
 * Always-visible answers are also what makes the FAQPage structured data on
 * this route legitimate: the markup matches what a visitor can read.
 */
export default function PricingFAQ() {
  return (
    <section className="section faq" id="pricing-faq" aria-labelledby="pricing-faq-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Questions"
          id="pricing-faq-heading"
          title={<>Before you <em>decide</em></>}
          lead="Trials, billing, cancellation, what counts as a conversation, and how your data is handled."
        />

        <dl className="faq__list" data-anim="stack">
          {pricingFaqs.map((item, index) => (
            <div className="faq__row" key={item.question}>
              <span className="faq__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
