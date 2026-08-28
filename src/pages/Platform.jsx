import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import PlatformHero from "../components/features/PlatformHero";
import CapabilityStack from "../components/features/CapabilityStack";
import PlatformOutcomes from "../components/features/PlatformOutcomes";
import PlatformDelivery from "../components/features/PlatformDelivery";
import PlatformChannels from "../components/features/PlatformChannels";
import CallToAction from "../components/common/CallToAction";
import {
  breadcrumbSchema,
  itemListSchema,
  softwareApplicationSchema,
} from "../components/seo/structuredData";
import { advancedCapabilities } from "../data/featuresData";

/**
 * Platform.
 *
 * The capability stack is the page: three groups, nine numbered modules,
 * continuous indexing, each group over its own scene. Outcomes, delivery and
 * surface area follow as supporting argument.
 *
 * Nothing here is shared with another page. The use-case index that used to sit
 * at the bottom is on the home page only now — repeating it made the two pages
 * feel interchangeable.
 */
export default function Platform() {
  usePageMotion();

  return (
    <main className="page page--platform" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          softwareApplicationSchema(),
          // Mirrors the nine modules rendered below, in the same order.
          itemListSchema({
            id: "capabilities",
            name: "VistechBot platform capabilities",
            items: advancedCapabilities.map((item) => ({
              name: item.title,
              description: item.text,
            })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform" },
          ]),
        ]}
      />

      <PlatformHero />
      <CapabilityStack />
      <PlatformOutcomes />
      <PlatformDelivery />
      <PlatformChannels />
      <CallToAction
        eyebrow="Next step"
        title={<>See it running on <em>your own content.</em></>}
        text="Point it at your help centre and we will show you the answers it gives before you commit to anything."
        primaryLabel="Book a demo"
      />
    </main>
  );
}
