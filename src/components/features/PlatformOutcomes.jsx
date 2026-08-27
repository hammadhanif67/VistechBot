import SectionHead from "../common/SectionHead";
import { whyChooseCards } from "../../data/featuresData";

/**
 * What changes once the stack is running.
 *
 * Four claims, set as a two-column pair of bordered panels rather than a
 * four-across card row: each one needs a paragraph to be worth reading, and a
 * four-column grid would have forced them down to a headline apiece.
 */
export default function PlatformOutcomes() {
  return (
    <section className="section outcomes" aria-labelledby="outcomes-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Outcomes"
          id="outcomes-heading"
          title={
            <>
              What changes once <em>it is running</em>
            </>
          }
          lead="Not projections. These are the four things teams notice inside the first month, in the order they tend to notice them."
        />

        <ul className="outcomes__grid" data-anim="stack">
          {whyChooseCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <li key={card.title}>
                <article className="panel panel--hover outcomes__card">
                  <span className="outcomes__index">{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={20} className="outcomes__icon" aria-hidden="true" />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
