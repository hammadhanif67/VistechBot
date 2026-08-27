import { useState } from "react";
import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import PricingHero from "../components/pricing/PricingHero";
import PricingMatrix from "../components/pricing/PricingMatrix";
import TrialTerms from "../components/pricing/TrialTerms";
import DataHandling from "../components/pricing/DataHandling";
import PricingFAQ from "../components/pricing/PricingFAQ";
import CallToAction from "../components/common/CallToAction";
import { plans, pricingFaqs } from "../data/pricingData";
import {
  breadcrumbSchema,
  faqSchema,
  softwareApplicationSchema,
} from "../components/seo/structuredData";

/**
 * Pricing.
 *
 * The billing cycle is owned here and handed to the matrix, which renders both
 * the switch and the prices it controls.
 *
 * Structured data publishes offers for the cycle currently on screen, so the
 * markup always matches what a visitor can actually see.
 */
export default function Pricing() {
  const [billing, setBilling] = useState("monthly");
  usePageMotion();

  const offers = plans.map((plan) => ({
    name: plan.name,
    price: String(billing === "yearly" ? plan.yearly : plan.monthly),
    period: billing === "yearly" ? "yearly" : "monthly",
  }));

  return (
    <main className="page page--pricing" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          softwareApplicationSchema({ offers }),
          faqSchema(pricingFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />

      <PricingHero />
      <PricingMatrix billing={billing} setBilling={setBilling} />
      <TrialTerms />
      <DataHandling />
      <PricingFAQ />
      <CallToAction
        eyebrow="Still deciding"
        title={<>Not sure which tier <em>fits?</em></>}
        text="Tell us roughly how many conversations you handle a month and we will point at the right tier. Often it is the cheaper one."
        primaryLabel="Talk to us"
        secondaryLabel="Read the FAQ"
        secondaryTo="/help#help-faq"
      />
    </main>
  );
}
