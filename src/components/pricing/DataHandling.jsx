import SectionHead from "../common/SectionHead";

/**
 * How data is handled, and what happens if the plan does not work out.
 *
 * The badges this replaces asserted "SOC 2 Compliant" and a "99.9% Uptime"
 * figure. Both are audited claims and nothing in this project substantiates
 * either, so they are stated as capabilities instead. Put real badges back when
 * there are real audits behind them.
 */
const TERMS = [
  ["Refund window", "Tell us inside the first 30 days of a paid plan and we refund it. No forms to chase."],
  ["Encryption", "Conversations are encrypted in transit and at rest."],
  ["Access control", "Role-based permissions per workspace, applied on every plan rather than only the top tier."],
  ["Data sources", "You choose which documents and records the assistant is allowed to read."],
  ["Export", "Conversations and knowledge base content can be exported on request."],
  ["Contract", "No setup fee, no minimum term, cancel or downgrade from the dashboard."],
];

export default function DataHandling() {
  return (
    <section className="section handling" aria-labelledby="handling-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Terms"
          id="handling-heading"
          title={<>What you are actually <em>signing up to</em></>}
          lead="The commercial and data terms that apply on every tier, stated plainly rather than linked to."
        />

        <dl className="metaList" data-anim="stack">
          {TERMS.map(([term, detail]) => (
            <div className="metaRow" key={term}>
              <dt>{term}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
