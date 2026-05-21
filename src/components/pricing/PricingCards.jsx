import { useMemo } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { monthlyPlans, yearlyMeta } from "../../data/pricingData";

// Pure helper function declared outside component scope to save memory allocations on re-renders
const getButtonProps = (buttonText) => {
  const text = buttonText?.toLowerCase() || "";
  if (text.includes("contact")) return { className: "outlineBtn", variant: "enterprise" };
  if (text.includes("start") || text.includes("choose")) return { className: "primaryBtn", variant: "action" };
  return { className: "standardBtn", variant: "default" };
};

export default function PricingCards({ billing, setBilling }) {
  
  // 1. Memory Memoization Layer: Prevents expensive re-mapping loops on superficial parent tree re-renders
  const optimizedPlans = useMemo(() => {
    if (!Array.isArray(monthlyPlans)) return [];
    
    if (billing !== "yearly") return monthlyPlans;

    return monthlyPlans.map((plan, index) => {
      // Safe extraction strategy using fallback position mapping
      const metaTuple = Array.isArray(yearlyMeta) ? yearlyMeta[index] : null;
      
      if (!metaTuple) return plan;

      return {
        ...plan,
        name: metaTuple[0] ?? plan.name,
        price: metaTuple[1] ?? plan.price,
        period: metaTuple[2] ?? plan.period,
        save: metaTuple[3] ?? "",
      };
    });
  }, [billing]);

  return (
    <section className="pricingMatrixSection" id="pricing-cards" aria-label="Product Pricing Matrix">
      <div className="pricingCycleHeader">
        <div>
          <span className="pricingCycleEyebrow">Flexible billing</span>
          <h2>Choose monthly or yearly cycle</h2>
          <p>Switch plans instantly and compare savings without changing the page layout.</p>
        </div>

        <div className="pricingCycleToggle" role="radiogroup" aria-label="Billing cycle">
          <button
            type="button"
            role="radio"
            aria-checked={billing !== "yearly"}
            className={billing !== "yearly" ? "active" : ""}
            onClick={() => setBilling?.("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={billing === "yearly"}
            className={billing === "yearly" ? "active" : ""}
            onClick={() => setBilling?.("yearly")}
          >
            Yearly <span>Save 20%</span>
          </button>
        </div>
      </div>

      <div className="advancedPricingEngine">
      {optimizedPlans.map((plan, index) => {
        const IconComponent = plan.icon;
        
        // 2. Defensive Data Isolation
        const safeFeatures = Array.isArray(plan.features) ? plan.features : [];
        const visibleFeatures = safeFeatures.slice(0, 7);
        const hiddenCount = Math.max(safeFeatures.length - visibleFeatures.length, 0);
        
        // Dynamic class extraction based on runtime string semantics
        const buttonConfig = getButtonProps(plan.button);
        const hasPrioritySupport = plan.button?.toLowerCase().includes("contact");

        return (
          <article
            className={`pricingCard pricingProCard adaptiveCardCore ${plan.color ?? ""} ${plan.popular ? "popularHighlight" : ""}`}
            key={plan.id ?? plan.name ?? `plan-${index}`}
            data-plan-tier={plan.name?.toLowerCase()}
          >
            {plan.popular && (
              <div className="popularBadge anchorBadge" role="status">
                <Sparkles size={12} aria-hidden="true" />
                <span>Most Popular</span>
              </div>
            )}

            <header className="pricingProHead">
              {IconComponent && (
                <div className="planIconWrapper" aria-hidden="true">
                  <IconComponent size={28} />
                </div>
              )}
              <div className="tierIdentity">
                <h3>{plan.name}</h3>
                <p className="descriptionText">{plan.desc}</p>
              </div>
            </header>

            <div className="planPriceContainer">
              <span className="currencySystem">
                <strong className="priceAmount">{plan.price}</strong>
                <small className="billingPeriod">{plan.period}</small>
              </span>
              {plan.save && <span className="saveBadgePill">{plan.save}</span>}
            </div>

            {/* 3. Performance & Layout Core Structure */}
            <ul className="planFeaturesList">
              {visibleFeatures.map((feature, fIndex) => {
                // Polymorphic data resolution (supports string arrays or raw tuple matrix arrays)
                const featureTitle = Array.isArray(feature) ? feature[0] : feature;
                if (!featureTitle) return null;

                return (
                  <li key={`${featureTitle}-${fIndex}`} className="featureItem">
                    <CheckCircle2 size={16} className="featureCheckSvg" />
                    <span className="featureLabel">{featureTitle}</span>
                  </li>
                );
              })}

              {hiddenCount > 0 && (
                <li className="featureItem inclusiveMetrics" data-hidden-count={hiddenCount}>
                  <CheckCircle2 size={16} className="featureCheckSvg opaqueIcon" />
                  <span className="featureLabel mutedLabel">{hiddenCount} more included features</span>
                </li>
              )}
            </ul>

            <footer className="cardActionFooter">
              <button 
                className={`actionTriggerBtn ${buttonConfig.className}`}
                type="button"
                data-variant={buttonConfig.variant}
              >
                <span>{plan.button}</span>
                <ArrowRight size={15} className="arrowTransitionIcon" />
              </button>

              <div className="planFooterMetaLayout">
                {plan.trial && <span className="trialDurationText">{plan.trial}</span>}
                <span className="metaDividerDot" aria-hidden="true" />
                <span className="supportTierText">
                  {hasPrioritySupport ? "Priority Support" : "No Credit Card Required"}
                </span>
              </div>
            </footer>
          </article>
        );
      })}
      </div>
    </section>
  );
}