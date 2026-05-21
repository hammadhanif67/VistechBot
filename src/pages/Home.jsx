import Hero from "../components/home/Hero";
import StatsBar from "../components/home/StatsBar";
import IndustrySolutions from "../components/home/IndustrySolutions";
import WorkflowStrip from "../components/home/WorkflowStrip";
import BenefitsSection from "../components/home/BenefitsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import SiteCTA from "../components/ui/SiteCTA";

export default function Home() {
  return (
    <main className="homePage">
      <Hero />
      <StatsBar />
      <IndustrySolutions />
      <WorkflowStrip />
      <BenefitsSection />
      <TestimonialsSection />
      <SiteCTA />
    </main>
  );
}