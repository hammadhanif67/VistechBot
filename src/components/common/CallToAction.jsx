import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "./Eyebrow";

/**
 * The closing block, shared by every page.
 *
 * A full-bleed statement with two ranked actions — one commitment, one
 * lower-friction alternative.
 *
 * No canvas behind it. This block closes every page, and a moving background
 * under the final ask was the thing most likely to pull attention away from the
 * button it exists to get clicked.
 */
export default function CallToAction({
  eyebrow = "Get started",
  title = (
    <>
      Put your routine conversations <em>on autopilot.</em>
    </>
  ),
  text = "Launch AI chat, voice automation and analytics from one platform. Ten-day trial, no card required.",
  primaryLabel = "Start free trial",
  primaryTo = "/contact",
  secondaryLabel = "View pricing",
  secondaryTo = "/pricing",
}) {
  return (
    <section className="cta" aria-labelledby="cta-heading">

      <div className="shell cta__inner">
        <Eyebrow>{eyebrow}</Eyebrow>

        <h2 className="display cta__title" id="cta-heading" data-anim="rise" data-anim-delay="1">
          {title}
        </h2>

        <p className="cta__text" data-anim="rise" data-anim-delay="2">
          {text}
        </p>

        <div className="cta__actions" data-anim="stack" data-anim-delay="3">
          <Link className="btn btn--primary" to={primaryTo}>
            {primaryLabel} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link className="btn btn--ghost" to={secondaryTo}>
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
