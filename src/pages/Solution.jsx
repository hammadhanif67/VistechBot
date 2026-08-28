import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import Eyebrow from "../components/common/Eyebrow";
import SectionHead from "../components/common/SectionHead";
import CallToAction from "../components/common/CallToAction";
import NotFound from "./NotFound";
import { solutionBySlug } from "../data/solutionsData";
import { advancedCapabilities } from "../data/featuresData";
import { breadcrumbSchema } from "../components/seo/structuredData";

/**
 * One industry, eight times over.
 *
 * A single template rather than eight page components. The sections are the
 * same questions in the same order — what the queue is made of, what the
 * platform does about it, which capabilities carry it, what the flow looks
 * like, what changes — and every answer comes from `solutionsData.js`. Eight
 * copies of this file would have been eight places to fix a layout bug.
 *
 * Capabilities are looked up by id rather than restated, so a capability's
 * wording lives in `featuresData.js` alone and each mention links back to it on
 * /platform. That is the Platform/Solutions boundary made structural: this page
 * cannot describe a capability, only point at one.
 *
 * An unknown slug renders the 404 rather than an empty shell, so a mistyped
 * industry cannot become an indexable page with a heading and no content.
 */
export default function Solution() {
  const { slug } = useParams();
  const solution = solutionBySlug[slug];

  usePageMotion();

  if (!solution) return <NotFound />;

  const { name, short, hero, problem, solution: answer, workflow, benefits, jobs, note } = solution;
  const capabilities = solution.capabilities
    .map((id) => advancedCapabilities.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <main className="page page--solution" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name, path: `/solutions/${slug}` },
          ]),
        ]}
      />

      <section className="pageHero pageHero--solution" aria-labelledby="solution-heading">
        <div className="shell pageHero__inner">
          {/* Visible, and the only reason the BreadcrumbList above is honest. */}
          <nav className="solutionCrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">VistechBot</Link>
              </li>
              <li>
                <Link to="/solutions">Solutions</Link>
              </li>
              <li aria-current="page">{name}</li>
            </ol>
          </nav>

          <h1 className="display pageHero__title" id="solution-heading">
            {hero.headline.map((line, index) => (
              <span className="lineMask" key={line}>
                <span data-anim="mask" data-anim-now data-anim-delay={index + 1}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="pageHero__lead" data-anim="rise" data-anim-now data-anim-delay="4">
            {hero.lead}
          </p>

          <div className="pageHero__actions" data-anim="stack" data-anim-now data-anim-delay="5">
            <Link className="btn btn--primary" to="/contact">
              Talk to us <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link className="btn btn--ghost" to="/pricing">
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Problem and answer sit as one two-column argument: the second column
          only means anything against the first. */}
      <section className="section solutionCase" aria-labelledby="solution-case-heading">
        <div className="shell">
          <SectionHead
            eyebrow="The problem"
            id="solution-case-heading"
            title={
              <>
                What the queue is <em>actually made of</em>
              </>
            }
            lead={short}
          />

          <div className="solutionCase__grid" data-anim="stack">
            <article className="solutionCase__col">
              <h3>Today</h3>
              <p>{problem}</p>
            </article>

            <article className="solutionCase__col solutionCase__col--answer">
              <h3>With VistechBot</h3>
              <p>{answer}</p>
            </article>
          </div>

          {note && (
            <p className="notice solutionCase__note" data-anim="rise">
              {note}
            </p>
          )}
        </div>
      </section>

      <section className="section solutionCaps" aria-labelledby="solution-caps-heading">
        <div className="shell">
          <SectionHead
            eyebrow="What carries it"
            id="solution-caps-heading"
            title={
              <>
                The capabilities <em>this leans on</em>
              </>
            }
            lead="Three of the nine, described once on the platform page rather than restated here."
            action={
              <Link className="linkArrow" to="/platform">
                All nine capabilities <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            }
          />

          <ul className="solutionCaps__list" data-anim="stack">
            {capabilities.map(({ id, icon: Icon, title, text }) => (
              <li key={id}>
                <Link className="panel panel--hover solutionCaps__item" to={`/platform#${id}`}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="solutionCaps__go">
                    On the platform <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section solutionFlow" aria-labelledby="solution-flow-heading">
        <div className="shell">
          <SectionHead
            eyebrow="How it works"
            id="solution-flow-heading"
            title={
              <>
                One conversation, <em>start to handoff</em>
              </>
            }
          />

          <ol className="solutionFlow__steps" data-anim="stack">
            {workflow.map((step, index) => (
              <li key={step}>
                <span className="solutionFlow__index">{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section solutionGains" aria-labelledby="solution-gains-heading">
        <div className="shell">
          <SectionHead
            eyebrow="What changes"
            id="solution-gains-heading"
            title={
              <>
                What the team <em>gets back</em>
              </>
            }
          />

          <div className="solutionGains__grid" data-anim="stack">
            <ul className="solutionGains__list">
              {benefits.map(([heading, detail]) => (
                <li key={heading}>
                  <h3>{heading}</h3>
                  <p>{detail}</p>
                </li>
              ))}
            </ul>

            <aside className="panel solutionGains__jobs">
              <Eyebrow as="h3">Handled day one</Eyebrow>
              <ul>
                {jobs.map((job) => (
                  <li key={job}>
                    <Check size={14} aria-hidden="true" />
                    {job}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <CallToAction
        eyebrow="Next step"
        title={
          <>
            See it on <em>your own content.</em>
          </>
        }
        text={`Point it at what you already publish and we will show you the answers it gives for ${name.toLowerCase()} before you commit to anything.`}
        primaryLabel="Book a demo"
        secondaryLabel="Other industries"
        secondaryTo="/solutions"
      />
    </main>
  );
}
