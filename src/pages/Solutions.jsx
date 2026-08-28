import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import Eyebrow from "../components/common/Eyebrow";
import CallToAction from "../components/common/CallToAction";
import { solutions } from "../data/solutionsData";
import { breadcrumbSchema, itemListSchema } from "../components/seo/structuredData";

/**
 * The solutions directory.
 *
 * A destination, not a menu. The eight industries were a hover-driven index on
 * the home page and nothing else — no URL of their own, nothing for a search
 * result to land on, no room to say more than a sentence each.
 *
 * The home page keeps a short version that links here. This page is the index,
 * and each card is the entrance to a page that can actually make the argument.
 *
 * Every card's line is its own: `short` is written for scanning and is not the
 * lead the industry page opens with.
 */
export default function Solutions() {
  usePageMotion();

  return (
    <main className="page page--solutions" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          itemListSchema({
            id: "solutions",
            name: "VistechBot solutions by industry",
            items: solutions.map((s) => ({ name: s.name, description: s.short })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
        ]}
      />

      <section className="pageHero pageHero--solutions" aria-labelledby="solutions-heading">
        <div className="shell pageHero__inner">
          <Eyebrow now>Solutions</Eyebrow>

          <h1 className="display pageHero__title" id="solutions-heading">
            <span className="lineMask">
              <span data-anim="mask" data-anim-now data-anim-delay="1">
                Built around
              </span>
            </span>
            <span className="lineMask">
              <span data-anim="mask" data-anim-now data-anim-delay="2">
                <em>your</em> queue
              </span>
            </span>
          </h1>

          <p className="pageHero__lead" data-anim="rise" data-anim-now data-anim-delay="4">
            The platform is the same in every one of these. What changes is the
            vocabulary, the systems it reads, and the point at which it has to
            stop and hand over. Eight industries, and what the support queue is
            actually made of in each.
          </p>

          <div className="pageHero__actions" data-anim="stack" data-anim-now data-anim-delay="5">
            <Link className="btn btn--primary" to="/contact">
              Talk to us <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link className="btn btn--ghost" to="/platform">
              See the platform
            </Link>
          </div>
        </div>
      </section>

      <section className="section solutionsIndex" aria-labelledby="solutions-index-heading">
        <div className="shell">
          <Eyebrow as="h2" id="solutions-index-heading">
            Eight industries
          </Eyebrow>

          <ul className="solutionsGrid" data-anim="stack">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;

              return (
                <li key={solution.slug}>
                  {/* The whole card is the link. A card with a link inside it
                      gives a pointer two targets for one destination. */}
                  <Link className="solutionCard" to={`/solutions/${solution.slug}`}>
                    <span className="solutionCard__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="solutionCard__icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>

                    <h3 className="solutionCard__name">{solution.name}</h3>
                    <p className="solutionCard__text">{solution.short}</p>

                    <span className="solutionCard__action">
                      Explore solution
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CallToAction
        eyebrow="Not on the list"
        title={
          <>
            Your queue is <em>not that unusual.</em>
          </>
        }
        text="These eight are where the platform is pointed most often, not the limit of it. Tell us what your volume looks like and we will say honestly whether this fits."
        primaryLabel="Talk to us"
        secondaryLabel="Compare plans"
        secondaryTo="/pricing"
      />
    </main>
  );
}
