import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import AboutHero from "../components/about/AboutHero";
import AboutPrinciples from "../components/about/AboutPrinciples";
import AboutTimeline from "../components/about/AboutTimeline";
import AboutTeam from "../components/about/AboutTeam";
import AboutFacts from "../components/about/AboutFacts";
import CallToAction from "../components/common/CallToAction";
import { aboutContentIsSample } from "../data/aboutData";
import { breadcrumbSchema, organizationSchema } from "../components/seo/structuredData";

/**
 * Company.
 *
 * Positions, then what has shipped, then who is behind it, then the plain
 * facts.
 *
 * The security specification that used to close this page has gone back to the
 * home page, where it belongs to the product argument. Repeating it here made
 * two pages read as one.
 */
export default function About() {
  usePageMotion();

  return (
    <main className="page page--about" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Company", path: "/about" },
          ]),
        ]}
      />

      <AboutHero />

      {aboutContentIsSample && (
        <div className="shell">
          <p className="notice aboutDisclosure">
            The milestones and team profiles on this page are sample content
            included with the site, not verified company records.
          </p>
        </div>
      )}

      <AboutPrinciples />
      <AboutTimeline />
      <AboutTeam />
      <AboutFacts />
      <CallToAction
        eyebrow="Work with us"
        title={
          <>
            Tell us what your queue <em>looks like.</em>
          </>
        }
        text="We will tell you honestly whether this is the right tool for it. Sometimes the answer is no."
        primaryLabel="Get in touch"
      />
    </main>
  );
}
