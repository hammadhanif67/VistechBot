import { Mic, Radio, ShieldCheck, User } from "lucide-react";
import Eyebrow from "../common/Eyebrow";

/**
 * The product showcase.
 *
 * Built in markup rather than dropped in as a screenshot: there is no captured
 * UI in this repository, and a stock render presented as one would be a
 * fabricated product image. This is drawn from the same tokens as the rest of
 * the site, labelled as an illustration, and annotated with callouts pointing
 * at the parts of the flow the copy has already described.
 *
 * Edge to edge, no frame, no rounded panel — the composition is cropped by the
 * viewport, which is what stops it reading as a picture of software sitting
 * inside a card.
 */
const TRANSCRIPT = [
  { from: "customer", who: "Customer", text: "Hi, order 48-2219 hasn't arrived and the tracking hasn't moved since Tuesday." },
  { from: "agent", who: "VistechBot", text: "It left the Leeds depot Tuesday and is showing a carrier delay. I've requested a re-scan and moved your delivery window to Friday.", meta: "Order lookup · 0.9s" },
  { from: "customer", who: "Customer", text: "Can I get a refund if it doesn't turn up?" },
  { from: "agent", who: "VistechBot", text: "Refunds need a person to approve. I'm passing this to the team now with everything above attached.", meta: "Escalation rule: refunds", handoff: true },
];

const CALLOUTS = [
  { icon: Radio, label: "Channel", value: "Web chat · same rules as voice" },
  { icon: ShieldCheck, label: "Boundary", value: "Refunds escalate by design" },
  { icon: Mic, label: "Handoff", value: "Transcript travels with the case" },
];

export default function ProductSurface() {
  return (
    <section className="surface" aria-labelledby="surface-heading">
      <div className="shell">
        <Eyebrow>In practice</Eyebrow>

        <h2 className="surface__title" id="surface-heading" data-anim="rise" data-anim-delay="1">
          One conversation, <em>start to handoff</em>
        </h2>
      </div>

      <div className="surface__stage" data-anim="rise" data-anim-delay="2">
        <div className="surface__console">
          <div className="surface__bar">
            <span className="surface__barLabel">Conversation 48-2219</span>
            <span className="surface__barState">
              <i aria-hidden="true" /> Live
            </span>
          </div>

          <ol className="surface__thread">
            {TRANSCRIPT.map((line, index) => (
              <li className={`surface__line surface__line--${line.from}`} key={index}>
                <span className="surface__who">
                  {line.from === "customer" ? (
                    <User size={14} aria-hidden="true" />
                  ) : (
                    <Radio size={14} aria-hidden="true" />
                  )}
                  {line.who}
                </span>

                <p className={line.handoff ? "surface__text isHandoff" : "surface__text"}>
                  {line.text}
                </p>

                {line.meta && <span className="surface__meta">{line.meta}</span>}
              </li>
            ))}
          </ol>
        </div>

        <ul className="surface__callouts">
          {CALLOUTS.map(({ icon: Icon, label, value }) => (
            <li key={label}>
              <Icon size={16} aria-hidden="true" />
              <span>
                <b>{label}</b>
                <small>{value}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="shell">
        <p className="surface__note">
          Interface illustration. A representative exchange, not a screen
          capture.
        </p>
      </div>
    </section>
  );
}
