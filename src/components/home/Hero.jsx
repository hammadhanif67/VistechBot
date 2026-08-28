import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";

/**
 * Home hero.
 *
 * Type and nothing else. It has been through a WebGL scene and then a static
 * lattice drawing, and both were decoration sitting where the argument should
 * be. What is left is the headline, the claim under it, two actions, and a
 * strip of specifics along the bottom edge.
 *
 * That strip is where the eye lands after the buttons, and it is the last
 * chance to answer "is this serious", so it carries numbers rather than
 * adjectives.
 */
const HERO_META = [
  ["Coverage", "24/7, every channel"],
  ["Languages", "100+, auto-detected"],
  ["First response", "Under a second"],
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">

      <div className="shell hero__inner">

        <div className="hero__content">
          <Eyebrow className="hero__eyebrow" now>
            AI customer support platform
          </Eyebrow>

          {/* Three short lines rather than two long ones: each has to fit on a
              single line for the masked reveal to read as a line rising, and a
              wrapped line inside a clip just slides two rows at once. */}
          <h1 className="hero__title" id="hero-heading">
            <span className="lineMask">
              <span data-anim="mask" data-anim-now data-anim-delay="1">
                Answer every
              </span>
            </span>
            <span className="lineMask">
              <span data-anim="mask" data-anim-now data-anim-delay="2">
                customer
              </span>
            </span>
            <span className="lineMask">
              <span data-anim="mask" data-anim-now data-anim-delay="3">
                <em>instantly.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lead" data-anim="rise" data-anim-now data-anim-delay="5">
            VistechBot runs AI chat and voice agents that resolve routine
            questions in seconds and hand the rest to your team with the full
            conversation attached. From your first ticket to your busiest week.
          </p>

          <div className="hero__actions" data-anim="stack" data-anim-now data-anim-delay="6">
            <Link className="btn btn--primary" to="/contact">
              Start free trial <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link className="btn btn--ghost" to="/platform">
              See the platform
            </Link>
          </div>
        </div>

        <dl className="hero__meta" data-anim="stack" data-anim-now data-anim-delay="8">
          {HERO_META.map(([term, value]) => (
            <div className="hero__metaItem" key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
