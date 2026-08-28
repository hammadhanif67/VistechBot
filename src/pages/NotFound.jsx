import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "../components/seo/Seo";
import { notFoundSeo } from "../data/seoData";
import Eyebrow from "../components/common/Eyebrow";

const SUGGESTIONS = [
  ["Platform", "/platform", "Capabilities, integrations and security"],
  ["Pricing", "/pricing", "Plans, trials and what each tier includes"],
  ["Help centre", "/help", "Setup, configuration reference and FAQs"],
  ["Contact", "/contact", "Talk to the team or book a demo"],
];

export default function NotFound() {
  return (
    <main className="page page--notFound" id="main-content" tabIndex={-1}>
      <Seo {...notFoundSeo} />

      <section className="pageHero pageHero--notFound" aria-labelledby="notfound-heading">

        <div className="shell pageHero__inner">
          <Eyebrow now>Not found</Eyebrow>

          <h1 className="display pageHero__title" id="notfound-heading">
            <span className="lineMask">
              <span data-anim="mask" data-anim-now data-anim-delay="1">
                This page
              </span>
            </span>
            <span className="lineMask">
              <span data-anim="mask" data-anim-now data-anim-delay="2">
                <em>does not</em> exist
              </span>
            </span>
          </h1>

          <p className="pageHero__lead" data-anim="rise" data-anim-now data-anim-delay="4">
            The link may be out of date, or the address may have a typo.
            Everything below is a working part of the site.
          </p>

          <div className="pageHero__actions" data-anim="rise" data-anim-now data-anim-delay="5">
            <Link className="btn btn--primary" to="/">
              Back to home <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* An h2 here keeps the outline continuous: without it the page jumped
          straight from its h1 to the footer's column headings. */}
      <section className="section notFound__links" aria-labelledby="notfound-links-heading">
        <div className="shell">
          <Eyebrow as="h2" id="notfound-links-heading">
            Try one of these
          </Eyebrow>

          <ul className="moduleList" data-anim="stack">
            {SUGGESTIONS.map(([label, path, description], index) => (
              <li className="module" key={path}>
                <span className="module__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="module__body">
                  <h3 className="module__title">
                    <Link to={path}>
                      {label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </h3>
                  <p className="module__text">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
