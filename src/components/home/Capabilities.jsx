import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "../common/SectionHead";
import { advancedCapabilities } from "../../data/featuresData";

/**
 * Capabilities as an indexed editorial list.
 *
 * Deliberately not a card grid. Nine equal rectangles side by side make every
 * capability look identical and force the copy down to one line each; a list
 * gives the titles a hard left edge to run down, room for a real sentence, and
 * a hairline that lights across the row on hover.
 *
 * Content comes from the shared features data, so this page and the platform
 * page can never describe the product differently.
 */
export default function Capabilities() {
  const items = advancedCapabilities.slice(0, 6);

  return (
    <section className="section capabilities" aria-labelledby="capabilities-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Capabilities"
          id="capabilities-heading"
          title={
            <>
              What it does <em>on day one</em>
            </>
          }
          lead="Chat and voice, grounded in your own documentation, wired into the tools your team already has open."
          action={
            <Link className="linkArrow" to="/platform">
              All capabilities <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          }
        />

        <ol className="moduleList">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <li className="module" key={item.title} data-anim="rise" data-anim-delay={index % 3}>
                <span className="module__index">{String(index + 1).padStart(2, "0")}</span>

                <div className="module__body">
                  <h3 className="module__title">
                    <Icon size={20} aria-hidden="true" />
                    {item.title}
                  </h3>

                  <div>
                    <p className="module__text">{item.text}</p>
                    <span className="module__meta">{item.meta}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
