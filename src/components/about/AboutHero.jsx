import Eyebrow from "../common/Eyebrow";

/**
 * About hero.
 *
 * A single position, set as display type, over the orbit scene: separate parts
 * held in one system, which is what a company is and what the sections below
 * describe. The previous version ran a sliding word panel down the left edge —
 * FAST, RELIABLE, SECURE — six adjectives standing in for a point of view.
 */
export default function AboutHero() {
  return (
    <section className="pageHero pageHero--about" aria-labelledby="about-heading">

      <div className="shell pageHero__inner">
        <Eyebrow now>Company</Eyebrow>

        <h1 className="display pageHero__title" id="about-heading">
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="1">
              We build the
            </span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="2">
              <em>quiet</em> half of
            </span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="3">
              customer support
            </span>
          </span>
        </h1>

        <p className="pageHero__lead" data-anim="rise" data-anim-now data-anim-delay="5">
          The repetitive questions nobody enjoys answering, handled properly, so
          the conversations that need a person reach one sooner.
        </p>
      </div>
    </section>
  );
}
