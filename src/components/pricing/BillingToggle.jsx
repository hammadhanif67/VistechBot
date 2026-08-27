/**
 * Monthly / yearly switch.
 *
 * A two-button radiogroup rather than a checkbox styled as a slider: a slider
 * has no accessible name for either state, and screen-reader users hear "on"
 * or "off" instead of which cycle they just chose.
 */
export default function BillingToggle({ billing, setBilling }) {
  return (
    <div className="billing">
      <div className="billing__control" role="radiogroup" aria-label="Billing cycle">
        <button
          type="button"
          role="radio"
          aria-checked={billing === "monthly"}
          className={`billing__option${billing === "monthly" ? " isCurrent" : ""}`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={billing === "yearly"}
          className={`billing__option${billing === "yearly" ? " isCurrent" : ""}`}
          onClick={() => setBilling("yearly")}
        >
          Yearly
        </button>
      </div>

      <span className="billing__note">Yearly billing costs 20% less</span>
    </div>
  );
}
