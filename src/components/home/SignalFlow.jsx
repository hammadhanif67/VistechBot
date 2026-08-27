import { MessageSquare, BrainCircuit, Zap, CheckSquare } from "lucide-react";
import SectionHead from "../common/SectionHead";

/**
 * How a conversation moves through the system.
 *
 * Four stages on one continuous line, with a signal travelling along it — the
 * same left-to-right, narrowing logic as the mark and the 3D scene. Not a
 * flowchart: no boxes with arrows between them, no decision diamonds. The line
 * is the diagram, and the panels hang off it.
 *
 * The travelling pulse is CSS-only, so it costs nothing and stops on its own
 * when the visitor has asked for reduced motion.
 */
const STAGES = [
  {
    icon: MessageSquare,
    title: "It arrives",
    text: "A question comes in on web chat, WhatsApp, Messenger or the phone. Same queue, same rules, whichever door it came through.",
    meta: "Any channel",
  },
  {
    icon: BrainCircuit,
    title: "It is understood",
    text: "Intent is read from what the customer actually meant, then matched against your documentation, policies and product data.",
    meta: "Grounded in your content",
  },
  {
    icon: Zap,
    title: "It is acted on",
    text: "It answers, books, checks an order, updates a record. Then it stops at the line you drew and hands over instead of guessing.",
    meta: "Within your rules",
  },
  {
    icon: CheckSquare,
    title: "It is closed out",
    text: "The outcome goes back to your CRM. The transcript follows any handoff. If the conversation exposed a gap in your content, it shows up in analytics.",
    meta: "Recorded and measurable",
  },
];

export default function SignalFlow() {
  return (
    <section className="flow section" aria-labelledby="flow-heading">
      <div className="shell">
        <SectionHead
          eyebrow="How it works"
          id="flow-heading"
          title={
            <>
              One line from question <em>to resolution</em>
            </>
          }
          lead="No routing menus. No triage queue. No waiting for a shift to start. Four stages, and a person only enters when a person is genuinely needed."
        />

        <ol className="flow__track">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <li className="flow__step" key={stage.title} data-anim="rise" data-anim-delay={index}>
                <span className="flow__node" aria-hidden="true" />

                <div className="flow__panel">
                  <span className="flow__index">{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={20} className="flow__icon" aria-hidden="true" />
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                  <span className="flow__meta">{stage.meta}</span>
                </div>
              </li>
            );
          })}

          {/* The line the stages hang off, with a signal running along it. */}
          <span className="flow__line" aria-hidden="true">
            <span className="flow__pulse" />
          </span>
        </ol>
      </div>
    </section>
  );
}
