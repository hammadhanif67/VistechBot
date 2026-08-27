import Eyebrow from "../common/Eyebrow";

/**
 * Pricing hero.
 *
 * No controls here. The monthly/yearly switch used to sit in the hero, a long
 * way from the prices it changed: you flipped it, the numbers moved somewhere
 * below the fold, and nothing appeared to happen. It now sits directly above
 * the plans.
 *
 * The scene behind it is the tier variant: four columns of stacked volume that
 * charge in order, left to right. It is saying the same thing the headline
 * says — you are buying volume, not features — and it is the calmest of the
 * service scenes, because on a pricing page the numbers are the content.
 *
 * The copy that used to open this page ("Pricing Engine v2.0", "SOC 2 Type II
 * compliance") has gone. One of those was noise; the other was an audited claim
 * the project cannot substantiate.
 */
export default function PricingHero() {
  return (
    <section className="pageHero pageHero--pricing" aria-labelledby="pricing-heading">

      <div className="shell pageHero__inner">
        <Eyebrow now>Pricing</Eyebrow>

        <h1 className="display pageHero__title" id="pricing-heading">
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="1">
              Priced by
            </span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="2">
              <em>volume,</em> not seats
            </span>
          </span>
        </h1>

        <p className="pageHero__lead" data-anim="rise" data-anim-now data-anim-delay="4">
          Four plans on the same platform. Higher tiers add conversation
          allowance, channels and storage. They do not unlock core features,
          because nothing important is locked. Ten-day trial on every tier, and
          it never asks for a card.
        </p>
      </div>
    </section>
  );
}
