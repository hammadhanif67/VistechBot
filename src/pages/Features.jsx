import AdvancedCapabilities from "../components/features/AdvancedCapabilities";
import FeaturesStats from "../components/features/FeaturesStats";
import WhyChooseFeatures from "../components/features/WhyChooseFeatures";
import IndustrySolutions from "../components/features/IndustrySolutions";
import CustomSolutions from "../components/features/CustomSolutions";
import SiteCTA from "../components/ui/SiteCTA";

export default function Features() {
  return (
    <main className="featuresPage">
      <AdvancedCapabilities />
      <FeaturesStats />
      <WhyChooseFeatures />
      <IndustrySolutions />
      <CustomSolutions />
      <SiteCTA />
    </main>
  );
}
