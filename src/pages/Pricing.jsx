import PricingBenefits from "../components/pricing/PricingBenefits";
import PricingInfo from "../components/pricing/PricingInfo";
import PricingFAQ from "../components/pricing/PricingFAQ";
import SiteCTA from "../components/ui/SiteCTA";
import PricingReplacement from "../components/pricing/PricingReplacement";

export default function Pricing() {
  return (
    <main className="pricingPage">
      <div className="pricingContainer">
        <PricingReplacement />
        <PricingBenefits />
        <PricingInfo />
        <PricingFAQ />
        <SiteCTA />
      </div>
    </main>
  );
}
