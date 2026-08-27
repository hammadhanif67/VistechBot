import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { capabilityGroups } from "../../data/featuresData";
import Eyebrow from "../common/Eyebrow";

/**
 * Platform hero.
 *
 * The page's title, then a jump index. Type carries the page on its own here:
 * the scene that used to sit behind this hero, and the one behind each
 * capability group, are gone — they fought the text they sat under.
 *
 * Under it, a jump index into the three capability groups. Long pages need a
 * way in that is not "scroll and hope".
 */
export default function PlatformHero() {
  return (
    <section className="pageHero pageHero--platform" aria-labelledby="platform-heading">

      <div className="shell pageHero__inner">
        <Eyebrow now>Platform</Eyebrow>

        <h1 className="display pageHero__title" id="platform-heading">
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="1">
              The VistechBot
            </span>
          </span>
          <span className="lineMask">
            <span data-anim="mask" data-anim-now data-anim-delay="2">
              intelligence <em>stack</em>
            </span>
          </span>
        </h1>

        <p className="pageHero__lead" data-anim="rise" data-anim-now data-anim-delay="4">
          Nine capabilities across three layers. How customers reach you, where
          the answers come from, and how the whole operation gets run and
          measured.
        </p>

        <div className="pageHero__actions" data-anim="stack" data-anim-now data-anim-delay="5">
          <Link className="btn btn--primary" to="/contact">
            Start free trial <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link className="btn btn--ghost" to="/pricing">
            Compare plans
          </Link>
        </div>

        <nav className="pageHero__index" aria-label="Capability groups" data-anim="stack" data-anim-now data-anim-delay="7">
          {capabilityGroups.map((group, index) => (
            <a className="pageHero__indexLink" href={`#${group.id}`} key={group.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{group.label}</b>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
