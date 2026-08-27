import SectionHead from "../common/SectionHead";
import { journey } from "../../data/aboutData";

/**
 * Timeline.
 *
 * Product milestones, not financial events. The previous version asserted a
 * five-million-dollar Series A, which is exactly the kind of claim that should
 * not be invented for a placeholder company story.
 */
export default function AboutTimeline() {
  return (
    <section className="section timeline" aria-labelledby="timeline-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Timeline"
          id="timeline-heading"
          title={
            <>
              What we have <em>shipped</em>
            </>
          }
          lead="Where the product has gone since the first version, in the order it happened."
        />

        <ol className="timeline__list" data-anim="stack">
          {journey.map((item) => {
            const Icon = item.icon;

            return (
              <li className="timeline__row" key={item.title}>
                <span className="timeline__year">{item.year}</span>
                <span className="timeline__marker" aria-hidden="true" />
                <div className="timeline__body">
                  <h3>
                    <Icon size={16} aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p>{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
