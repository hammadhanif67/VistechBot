import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import BillingToggle from "./BillingToggle";
import { PLAN_ROWS, plans, yearlySaving } from "../../data/pricingData";

/**
 * One feature line on a plan card.
 *
 * A tick and a label when the plan includes it, a dash and dimmed text when it
 * does not. The icons are decorative, so an excluded row also carries the words
 * for anyone who cannot see them.
 */
function PlanFeature({ label, value }) {
  const included = value !== false;

  return (
    <li className={included ? undefined : "isExcluded"}>
      {included ? (
        <Check size={14} className="planCard__tick" aria-hidden="true" />
      ) : (
        <Minus size={14} className="planCard__cross" aria-hidden="true" />
      )}

      <span className="planCard__feature">
        <b>{label}</b>
        {typeof value === "string" && <small>{value}</small>}
      </span>

      {!included && <span className="visuallyHidden">Not included</span>}
    </li>
  );
}

/**
 * The plan cards.
 *
 * One card definition: four across on a desktop, two on a tablet, one on a
 * phone. It replaces a build that rendered a comparison table above 900px and a
 * separate set of cards below it — two components describing the same four
 * plans, drifting apart every time either was touched.
 *
 * Every card answers the same questions in the same order: what it is, what it
 * costs, how to buy, what you get. Holding that order is what lets someone
 * compare by scanning across rather than by memorising one plan while reading
 * the next.
 */
export default function PricingMatrix({ billing, setBilling }) {
  const isYearly = billing === "yearly";

  return (
    <section className="section matrix" id="plans" aria-labelledby="plans-heading">
      <div className="shell">
        {/* The switch sits with the prices it changes. In the hero it was a
            screen away from them, so flipping it looked like it did nothing. */}
        <header className="sectionHead sectionHead--split matrix__head">
          <div>
            <Eyebrow>Compare</Eyebrow>
            <h2 id="plans-heading" data-anim="rise" data-anim-delay="1">
              {isYearly ? "Yearly plans" : "Monthly plans"}
            </h2>
          </div>

          <div className="matrix__control" data-anim="rise" data-anim-delay="2">
            <BillingToggle billing={billing} setBilling={setBilling} />
          </div>
        </header>

        <ul className="planCards" data-anim="stack">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isEnterprise = plan.cta === "Contact sales";

            return (
              <li key={plan.id}>
                <article className={`planCard${plan.featured ? " isFeatured" : ""}`}>
                  {plan.featured && <p className="planCard__flag">Recommended</p>}

                  <header className="planCard__head">
                    <span className="planCard__icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>

                    <h3>{plan.name}</h3>
                    <p className="planCard__desc">{plan.desc}</p>
                  </header>

                  <p className="planCard__price">
                    <b>${isYearly ? plan.yearly.toLocaleString() : plan.monthly}</b>
                    <small>{isYearly ? "/year" : "/month"}</small>
                  </p>

                  {/* The alternative cycle is shown either way, so the saving is
                      visible before anyone touches the switch. */}
                  {isYearly ? (
                    <p className="planCard__saving">
                      Save ${yearlySaving(plan).toLocaleString()} a year
                    </p>
                  ) : (
                    <p className="planCard__saving planCard__saving--muted">
                      ${plan.yearly.toLocaleString()} billed yearly
                    </p>
                  )}

                  <Link
                    className={`btn btn--sm btn--block ${
                      plan.featured ? "btn--accent" : "btn--ghost"
                    }`}
                    to="/contact"
                  >
                    {plan.cta}
                    <span className="visuallyHidden"> for the {plan.name} plan</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>

                  <p className="planCard__note">
                    {isEnterprise ? "Priority support included" : "10-day trial, no card required"}
                  </p>

                  <ul className="planCard__features">
                    {PLAN_ROWS.map((row) => (
                      <PlanFeature key={row.key} label={row.label} value={plan.values[row.key]} />
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
