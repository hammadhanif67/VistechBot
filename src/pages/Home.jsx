import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import Hero from "../components/home/Hero";
import IntelligenceStatement from "../components/home/IntelligenceStatement";
import SignalFlow from "../components/home/SignalFlow";
import Capabilities from "../components/home/Capabilities";
import ProductSurface from "../components/home/ProductSurface";
import ScaleBand from "../components/home/ScaleBand";
import UseCases from "../components/home/UseCases";
import TrustBand from "../components/home/TrustBand";
import Voices from "../components/home/Voices";
import CallToAction from "../components/common/CallToAction";
import { softwareApplicationSchema } from "../components/seo/structuredData";

/**
 * Home.
 *
 * The page makes one argument, in order, and each section is a step in it:
 *
 *   01 hero          what this is
 *   02 statement     why it matters
 *   03 signal flow   how it works
 *   04 capabilities  what it does
 *   05 surface       what it looks like in use
 *   06 scale         at what volume
 *   07 use cases     who it is for
 *   08 trust         how the data is handled
 *   09 voices        what it changed
 *   →  call to action
 *
 * Every section is type, rule and space. The scenes that once ran behind the
 * hero and the scale band are gone, so nothing on this page competes with the
 * argument it is making.
 */
export default function Home() {
  usePageMotion();

  return (
    <main className="page page--home" id="main-content" tabIndex={-1}>
      <Seo schemas={[softwareApplicationSchema()]} />

      <Hero />
      <IntelligenceStatement />
      <SignalFlow />
      <Capabilities />
      <ProductSurface />
      <ScaleBand />
      <UseCases />
      <TrustBand />
      <Voices />
      <CallToAction />
    </main>
  );
}
