import SectionHead from "../common/SectionHead";
import { team } from "../../data/aboutData";

/**
 * The team.
 *
 * Portraits used to come from a random-avatar service — generated faces of
 * people with no connection to the company, presented under real-sounding
 * names. They are initials now: no external request, and nobody's likeness is
 * borrowed for a profile that does not exist. The per-person social links went
 * for the same reason; they pointed at platform home pages, not at these
 * people.
 */
export default function AboutTeam() {
  return (
    <section className="section team" id="about-team" aria-labelledby="team-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Team"
          id="team-heading"
          title={
            <>
              Who is <em>building it</em>
            </>
          }
          lead="The people responsible for the product, the platform it runs on, and the support behind both."
        />

        <ul className="team__grid" data-anim="stack">
          {team.map((person) => (
            <li key={person.name}>
              <article className="panel panel--hover team__card">
                <span className="team__initials" aria-hidden="true">
                  {person.initials}
                </span>
                <h3>{person.name}</h3>
                <p className="team__role">{person.role}</p>
                <p>{person.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
