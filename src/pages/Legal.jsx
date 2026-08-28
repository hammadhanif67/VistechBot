import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import NotFound from "./NotFound";
import { legalEntity, legalPages } from "../data/legalData";
import { breadcrumbSchema } from "../components/seo/structuredData";

/**
 * The three legal pages, from one template.
 *
 * They describe what this site verifiably does rather than what a generic SaaS
 * privacy policy says — no analytics, no cookies, one local preference key —
 * because a short accurate policy is worth more than a long invented one. The
 * facts behind each claim are listed in `legalData.js`.
 *
 * While `legalEntity.needsReview` is true the pages carry a visible notice
 * saying the company details are unset and a lawyer has not read them. That is
 * deliberate: an incomplete legal document that looks finished is worse than
 * one that admits what it is missing.
 */
/*
   The slug arrives as a prop, not from `useParams`. Each legal page is a
   literal route (`/privacy`, not `/:slug`), because a parameterised path here
   would match every unmatched URL on the site and swallow the 404. A literal
   route has no params to read, so the router passes the slug in.
*/
export default function Legal({ slug }) {
  const page = legalPages[slug];

  usePageMotion();

  if (!page) return <NotFound />;

  return (
    <main className="page page--legal" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: `/${page.slug}` },
          ]),
        ]}
      />

      <article className="shell legal">
        <header className="legal__head">
          <nav className="solutionCrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">VistechBot</Link>
              </li>
              <li aria-current="page">{page.title}</li>
            </ol>
          </nav>

          <h1 className="legal__title" data-anim="rise" data-anim-now>
            {page.title}
          </h1>

          <p className="legal__lead" data-anim="rise" data-anim-now data-anim-delay="1">
            {page.lead}
          </p>

          <p className="legal__meta" data-anim="rise" data-anim-now data-anim-delay="2">
            {legalEntity.effectiveDate
              ? `In force from ${legalEntity.effectiveDate}.`
              : "Not yet in force — see the note below."}
          </p>
        </header>

        {legalEntity.needsReview && (
          <p className="notice legal__notice">
            <b>Draft.</b> This page describes how the website actually behaves, and
            those parts are accurate. What it does not yet carry is the legal
            entity name, the governing jurisdiction, a registered address or an
            effective date, and it has not been reviewed by a lawyer. Set those in{" "}
            <code>src/data/legalData.js</code> and have the text checked before
            treating this as a published policy.
          </p>
        )}

        <div className="legal__body">
          {page.sections.map(({ heading, body }) => (
            <section key={heading}>
              <h2>{heading}</h2>
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          {legalEntity.name && (
            <section>
              <h2>Who we are</h2>
              <p>
                {legalEntity.name}
                {legalEntity.registeredAddress ? `, ${legalEntity.registeredAddress}` : ""}.
                {legalEntity.jurisdiction ? ` These terms are governed by ${legalEntity.jurisdiction}.` : ""}
              </p>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
