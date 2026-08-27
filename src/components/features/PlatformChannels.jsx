import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "../common/SectionHead";
import { channels, integrations } from "../../data/featuresData";

/**
 * Channels and integrations.
 *
 * The platform page's own section. The home page answers "who is this for" with
 * the use-case index; this answers "what does it plug into", which is the
 * question a technical evaluator actually arrives with.
 *
 * Rendering the same industry list on both pages was the reason they felt
 * interchangeable, so that list now lives on the home page only.
 */
export default function PlatformChannels() {
  return (
    <section className="section channels" id="feature-channels" aria-labelledby="channels-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Surface area"
          id="channels-heading"
          title={
            <>
              Where it runs, and <em>what it connects to</em>
            </>
          }
          lead="Every channel shares one knowledge base and one set of escalation rules, so an answer does not change depending on the door the customer came through."
          action={
            <Link className="linkArrow" to="/help#help-start">
              Integration guide <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          }
        />

        <div className="channels__layout">
          <div className="channels__col">
            <h3 className="channels__colTitle">Channels</h3>

            <ul className="channels__list" data-anim="stack">
              {channels.map(({ icon: Icon, name, detail, status }) => (
                <li className="channels__item" key={name}>
                  <span className="channels__icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <span className="channels__body">
                    <b>{name}</b>
                    <small>{detail}</small>
                  </span>
                  <span className="tag tag--accent channels__status">{status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="channels__col">
            <h3 className="channels__colTitle">Integrations</h3>

            <ul className="channels__list" data-anim="stack" data-anim-delay="1">
              {integrations.map(({ icon: Icon, name, detail }) => (
                <li className="channels__item" key={name}>
                  <span className="channels__icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <span className="channels__body">
                    <b>{name}</b>
                    <small>{detail}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
