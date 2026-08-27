import { Building2, Clock, Globe2, Users, Wrench } from "lucide-react";
import SectionHead from "../common/SectionHead";

/**
 * Company facts.
 *
 * Replaces the security specification that used to be repeated here from the
 * home page. That block belongs on the home page, where the argument is about
 * the product; this page needs facts about the company, which is a different
 * question and a different answer.
 *
 * Everything here is verifiable from the site itself — where the team is, how
 * to reach it, what it works on — rather than invented figures.
 */
const FACTS = [
  {
    icon: Building2,
    term: "Founded",
    detail: "2023, building customer support automation from the first release.",
  },
  {
    icon: Wrench,
    term: "What we work on",
    detail: "One product. AI chat and voice agents that answer from a customer's own documentation.",
  },
  {
    icon: Globe2,
    term: "Where we are",
    detail: "San Francisco, with the rest of the team spread across time zones so support cover is not one shift.",
  },
  {
    icon: Users,
    term: "Who we build for",
    detail: "Support teams of every size, from a first hire to an established service desk. Not enterprise only.",
  },
  {
    icon: Clock,
    term: "How we ship",
    detail: "Small, frequent releases. Breaking changes are versioned and announced before they land.",
  },
];

export default function AboutFacts() {
  return (
    <section className="section facts" aria-labelledby="facts-heading">
      <div className="shell">
        <SectionHead
          eyebrow="The basics"
          id="facts-heading"
          title={
            <>
              The short version, <em>on the record</em>
            </>
          }
          lead="What the company is, who it builds for, and how it works. No padding."
        />

        <ul className="facts__list" data-anim="stack">
          {FACTS.map(({ icon: Icon, term, detail }) => (
            <li className="facts__row" key={term}>
              <span className="facts__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="facts__term">{term}</span>
              <span className="facts__detail">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
