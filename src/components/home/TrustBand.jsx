import { FileClock, KeyRound, Lock, ScrollText, SplitSquareVertical, UserCog } from "lucide-react";
import SectionHead from "../common/SectionHead";

/**
 * Security and data handling, presented as a specification rather than a row of
 * badges.
 *
 * Every line here describes something the product does. There are no
 * certification marks: SOC 2 and an uptime percentage were asserted in the
 * previous build, and neither is a claim this project can substantiate. Add
 * real badges once there are real audits behind them.
 */
const CONTROLS = [
  [Lock, "Encryption", "Conversations are encrypted in transit and at rest."],
  [UserCog, "Access", "Role-based permissions per workspace, so an agent sees only their own queue."],
  [KeyRound, "Sources", "You choose which documents and data the assistant is allowed to read."],
  [FileClock, "Retention", "Conversation retention windows are configurable and exportable on request."],
  [SplitSquareVertical, "Handoff", "Rules define where the assistant must stop and pass a case to a person."],
  [ScrollText, "Audit", "Every automated action is recorded against the conversation that triggered it."],
];

export default function TrustBand() {
  return (
    <section className="section trust" aria-labelledby="trust-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Security"
          id="trust-heading"
          title={
            <>
              Customer conversations are <em>business records</em>
            </>
          }
          lead="Treated as such by default, not as a setting you have to find. These controls apply on every plan, not only at the top tier."
        />

        <dl className="metaList metaList--icons trust__list" data-anim="stack">
          {CONTROLS.map(([Icon, term, detail]) => (
            <div className="metaRow" key={term}>
              <dt>
                <Icon size={16} aria-hidden="true" />
                {term}
              </dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
