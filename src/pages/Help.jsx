import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocsContent from "../components/docs/DocsContent";
import { faqs } from "../components/docs/docsData";
import { breadcrumbSchema, faqSchema } from "../components/seo/structuredData";

/**
 * Help centre.
 *
 * Was "Documentation", which promised a developer platform and delivered a
 * page that is mostly answers to customer questions. The name now matches what
 * is on it: an overview, a setup guide, the configuration reference, the FAQ,
 * and how to reach a person. Its largest section by some distance is the FAQ,
 * which is also what people arrive searching for.
 *
 * The quietest page on the site. It exists to be read, so nothing here moves
 * on scroll and nothing sits behind the body copy. Layout is a sticky sidebar
 * beside a single content column; the sidebar is the way in, listing every
 * section and tracking which one you are reading.
 */
export default function Help() {
  usePageMotion();

  return (
    <main className="page page--help" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help centre", path: "/help" },
          ]),
        ]}
      />

      <header className="docsHead">
        <div className="shell">
          <nav className="docsCrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">VistechBot</Link>
              </li>
              <li aria-current="page">Help centre</li>
            </ol>
          </nav>

          <h1 className="docsTitle" data-anim="rise" data-anim-now>
            Help centre
          </h1>

          <p className="docsIntro" data-anim="rise" data-anim-now data-anim-delay="1">
            Answers to the questions that come up most, a three-step setup
            guide, and the configuration reference.
          </p>
        </div>
      </header>

      <div className="shell docsLayout">
        <DocsSidebar />
        <DocsContent />
      </div>
    </main>
  );
}
