import useScrollReveal from "../hooks/useScrollReveal";
import AboutHero from "../components/about/AboutHero";
import AboutStats from "../components/about/AboutStats";
import AboutStory from "../components/about/AboutStory";
import AboutJourney from "../components/about/AboutJourney";
import AboutLeadership from "../components/about/AboutLeadership";

import SiteCTA from "../components/ui/SiteCTA";

export default function About() {
  useScrollReveal();

  return (
    <main className="aboutPage">
      <AboutHero />
      <AboutStats />
      <section className="aboutStoryJourney">
        <AboutStory />
        <AboutJourney />
      </section>
      <AboutLeadership />
      <SiteCTA />
    </main>
  );
}
