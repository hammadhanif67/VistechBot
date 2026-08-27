import { Quote } from "lucide-react";
import SectionHead from "../common/SectionHead";
import { testimonials, testimonialsAreSampleContent } from "../../data/siteData";

/**
 * Customer quotes as a bordered grid, not a carousel.
 *
 * The old version auto-rotated on a timer through nine slides, which meant a
 * reader could lose a quote mid-sentence and had no way back except waiting.
 * Showing six at once removes the timer, the pause-on-hover logic, the dots
 * and the inert off-screen slides — and a reader can compare them.
 *
 * The quotes are sample content shipped with the template, which the page says
 * plainly rather than leaving to assumption.
 */
export default function Voices() {
  return (
    <section className="section voices" aria-labelledby="voices-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Voices"
          id="voices-heading"
          title={
            <>
              What changes for <em>the team</em>
            </>
          }
          lead={
            testimonialsAreSampleContent
              ? "Sample content. Illustrative quotes included with this site, not verified customer feedback."
              : undefined
          }
        />

        <ul className="voices__grid" data-anim="stack">
          {testimonials.map((item) => (
            <li key={item.name}>
              <figure className="panel panel--hover voices__card">
                <Quote size={20} className="voices__quote" aria-hidden="true" />

                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>

                <figcaption className="voices__person">
                  <span className="voices__initials" aria-hidden="true">
                    {item.initials}
                  </span>
                  <span>
                    <b>{item.name}</b>
                    <small>
                      {item.role}, {item.company}
                    </small>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
