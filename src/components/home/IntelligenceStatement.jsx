import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";

/**
 * The editorial statement that follows the hero.
 *
 * One idea, set as large as the viewport allows, with the supporting argument
 * held back to a narrow column beneath it. The point of the section is the
 * pause: after a hero dense with motion and controls, a page that goes quiet
 * and states its position reads as confidence.
 *
 * Each line rises out of its own clip in sequence, so the sentence assembles
 * rather than fading in as a block.
 */
export default function IntelligenceStatement() {
  return (
    <section className="statement" aria-labelledby="statement-heading">
      <div className="shell">
        <Eyebrow>The premise</Eyebrow>

        <h2 className="display statement__title" id="statement-heading">
          <span className="lineMask">
            <span data-anim="mask">Intelligence</span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-delay="1">
              for <em>every</em>
            </span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-delay="2">
              <mark>conversation.</mark>
            </span>
          </span>
        </h2>

        <div className="statement__body">
          <p data-anim="rise" data-anim-delay="3">
            Most support queues are the same handful of questions asked
            thousands of different ways. Order status. Password resets. Opening
            hours. Where is my refund. Your team spends the day on those, and
            the conversations that genuinely need a person wait in line behind
            them.
          </p>
          <p data-anim="rise" data-anim-delay="4">
            VistechBot takes the repetitive half and answers it properly.
            From your documentation, in your tone, in whatever language the
            customer opened with. What is left reaches a human sooner, and it
            arrives with the whole conversation attached.
          </p>
          <Link className="linkArrow" to="/platform" data-anim="rise" data-anim-delay="5">
            See how it works <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
