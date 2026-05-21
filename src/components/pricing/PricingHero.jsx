import { Sparkles } from "lucide-react";
import BrandButton from "../ui/BrandButton";
import HeroAtmosphere from "../ui/HeroAtmosphere";
import { heroStats } from "../../data/heroData";

export default function PricingHero({ billing, setBilling }) {
  // Prevent unnecessary tree re-renders if clicking the already active mode
  const toggleBilling = (mode) => {
    if (billing !== mode) setBilling(mode);
  };

  return (
    <section className="pricingHero advancedHeroLayout" aria-label="Pricing Hero Section">
      {/* Retained safely for architectural visual integrity */}
      <HeroAtmosphere variant="pricing" />

      <div className="heroMainFrame gridTwoColumns">
        
        {/* Left Side: Content & Action Triggers */}
        <div className="heroIntelBlock">
          <div className="premiumBadge animateFade">
            <Sparkles size={14} className="sparkleIconEffect" />
            <span>Pricing Engine v2.0</span>
          </div>

          <h1 className="heroDisplayHeading">
            Predictable Pricing.
            <span className="gradientAccent textSplit">Engineered for Scale.</span>
          </h1>

          <p className="heroSubText">
            Transparent, infrastructure-driven pricing designed for hyper-growth teams. 
            Deploy models instantly, scale workloads seamlessly, and optimize operational spend without hidden overheads.
          </p>

          <div className="billingControlWrapper">
            <div className="segmentedControl" role="radiogroup" aria-label="Billing Cycle Selection">
              <button 
                type="button" 
                role="radio"
                aria-checked={billing === "monthly"}
                className={`controlSwitch ${billing === "monthly" ? "isCurrent" : ""}`} 
                onClick={() => toggleBilling("monthly")}
              >
                Monthly Plan
              </button>
              <button 
                type="button" 
                role="radio"
                aria-checked={billing === "yearly"}
                className={`controlSwitch ${billing === "yearly" ? "isCurrent" : ""}`} 
                onClick={() => toggleBilling("yearly")}
              >
                Yearly Cycle
              </button>
            </div>
            <span className="discountIndicatorLabel">Save 20% Alpha</span>
          </div>
        </div>

        {/* Right Side: Data Analytics Showcase Panel */}
        <div className="heroShowcasePanel" aria-label="System Performance Operational Metrics">
          <div className="panelContextBar">
            <span className="contextLabel">Deployment Metrics</span>
            <span className="contextStatusPulse">Active Infrastructure</span>
          </div>

          {/* Secure Loop Execution Layer */}
          <div className="metricAnalyticsGrid">
            {Array.isArray(heroStats?.pricing) && heroStats.pricing.map((item, index) => (
              <div className="metricTelemetryBlock" key={item.label || index}>
                <span className="telemetryValueDisplay">{item.value}</span>
                <label className="telemetryLabelText">{item.label}</label>
              </div>
            ))}
          </div>

          <ul className="guaranteeFeatureMatrix">
            <li className="matrixItem">
              <span className="checkGraphic">✦</span>
              <p>Dynamic compute auto-scaling architecture</p>
            </li>
            <li className="matrixItem">
              <span className="checkGraphic">✦</span>
              <p>Granular enterprise governance controls</p>
            </li>
            <li className="matrixItem">
              <span className="checkGraphic">✦</span>
              <p>Soc2 Type II compliance & advanced analytics layer</p>
            </li>
          </ul>

          <BrandButton as="a" href="#pricing-cards" variant="secondary" className="ctaAnchorAction">
            Launch Comparison Matrix
          </BrandButton>
        </div>

      </div>
    </section>
  );
}