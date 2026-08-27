import { trialPoints } from "../../data/pricingData";

/**
 * The reassurance strip directly under the matrix — the point where "what does
 * it cost" turns into "what happens if I am wrong".
 */
export default function TrialTerms() {
  return (
    <section className="section section--tight trialTerms" aria-label="Trial terms">
      <div className="shell">
        <ul className="trialTerms__grid" data-anim="stack">
          {trialPoints.map(([Icon, title, text]) => (
            <li className="trialTerms__item" key={title}>
              <Icon size={20} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
