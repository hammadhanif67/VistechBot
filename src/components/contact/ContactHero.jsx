import Eyebrow from "../common/Eyebrow";

/**
 * Contact hero.
 *
 * The Contact page previously imported its hero behind a comment, so it shipped
 * with no `h1` and opened straight into a grid of contact cards. This restores
 * the opening as an editorial statement.
 *
 * The relay scene behind it is the only one on the site with two centres of
 * mass — two clusters trading signals across a gap. Every other scene describes
 * one system; this page is about a conversation between two.
 */
export default function ContactHero() {
  return (
    <section className="pageHero pageHero--contact" aria-labelledby="contact-heading">

      <div className="shell pageHero__inner">
        <Eyebrow now>Contact</Eyebrow>

        <h1 className="display pageHero__title" id="contact-heading">
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="1">
              Let us build
            </span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="2">
              <em>intelligence</em>
            </span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="3">
              together.
            </span>
          </span>
        </h1>

        <p className="pageHero__lead" data-anim="rise" data-anim-now data-anim-delay="5">
          Book a demo, ask about an integration, or get implementation help.
          Tell us what your support queue looks like and we will tell you
          honestly whether we can help.
        </p>
      </div>
    </section>
  );
}
