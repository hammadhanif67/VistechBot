import { platformMetrics } from "../../data/siteData";
import Eyebrow from "../common/Eyebrow";

/**
 * The scale band: the numbers set large, on their own.
 *
 * It sits between the product illustration and the use cases — the point where
 * the argument moves from "what it does" to "at what volume". There is no
 * canvas behind it any more: figures this size do not need help, and a moving
 * background under them just made them harder to read.
 *
 * The figures describe the product, not the business. The two that described
 * the business — customer count and lifetime conversation volume — were sample
 * content and are gone; a disclaimer under an invented number is still an
 * invented number.
 */
export default function ScaleBand() {
  return (
    <section className="scale" aria-labelledby="scale-heading">

      <div className="shell scale__inner">
        <Eyebrow>At scale</Eyebrow>

        <h2 className="display scale__title" id="scale-heading">
          <span className="lineMask">
            <span data-anim="mask">Built for the</span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-delay="1">
              <em>busiest</em> week.
            </span>
          </span>
        </h2>

        <dl className="statRow scale__stats" data-anim="stack" data-anim-delay="2">
          {platformMetrics.map((metric) => (
            <div className="stat" key={metric.label}>
              <dt className="visuallyHidden">{metric.label}</dt>
              <dd>
                <span className="stat__value">{metric.value}</span>
                <span className="stat__label">{metric.label}</span>
                <span className="stat__note">{metric.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
