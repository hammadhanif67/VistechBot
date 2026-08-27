import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "../common/SectionHead";
import { customSolutions, customizationProcess } from "../../data/featuresData";

/**
 * How a rollout actually runs.
 *
 * Two columns: what gets built on the left, the four stages of building it on
 * the right. The stages previously repeated the same sentence four times —
 * each now describes what happens at that specific point, which is the only
 * reason to list stages at all.
 */
export default function PlatformDelivery() {
  return (
    <section className="section delivery" aria-labelledby="delivery-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Delivery"
          id="delivery-heading"
          title={
            <>
              Every support operation <em>is different</em>
            </>
          }
          lead="We start from the queue you have today, not from a template. Four stages, and you see working conversations before the last one."
          action={
            <Link className="linkArrow" to="/contact">
              Talk to the team <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          }
        />

        <div className="delivery__layout">
          <div className="delivery__col" data-anim="rise">
            <h3 className="delivery__colTitle">What gets built</h3>
            <dl className="metaList">
              {customSolutions.map((item) => (
                <div className="metaRow" key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="delivery__col" data-anim="rise" data-anim-delay="1">
            <h3 className="delivery__colTitle">How it is delivered</h3>
            <ol className="delivery__steps">
              {customizationProcess.map((step, index) => (
                <li key={step.title}>
                  <span className="delivery__stepIndex">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
