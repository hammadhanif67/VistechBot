import SectionHead from "../common/SectionHead";
import { principles } from "../../data/aboutData";

/**
 * What we believe, stated as positions rather than values.
 *
 * Each one is arguable — which is the test. "Innovation first" and "customer
 * success", the two the previous version led with, are not positions, because
 * nobody holds the opposite.
 */
export default function AboutPrinciples() {
  return (
    <section className="section principles" aria-labelledby="principles-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Principles"
          id="principles-heading"
          title={
            <>
              How we think about <em>the problem</em>
            </>
          }
          lead="Four positions that shape what the product does and, more usefully, what it refuses to do."
        />

        <ol className="moduleList" data-anim="stack">
          {principles.map((item, index) => (
            <li className="module" key={item.title}>
              <span className="module__index">{String(index + 1).padStart(2, "0")}</span>
              <div className="module__body">
                <h3 className="module__title">{item.title}</h3>
                <p className="module__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
