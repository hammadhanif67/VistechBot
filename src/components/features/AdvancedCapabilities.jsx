import { ArrowUpRight } from "lucide-react";
import { advancedCapabilities } from "../../data/featuresData";

export default function AdvancedCapabilities() {
  return (
    <section className="advancedCapabilitiesSection">
      <div className="featuresContainer">
        <div className="featuresSectionHeader advancedHeader">
          <span>AI Features</span>

          <h2>Advanced AI Capabilities</h2>

          <p>
            Cutting-edge AI technology that makes your business more efficient
            and customer-friendly.
          </p>
        </div>

        <div className="advancedCapabilitiesGrid">
          {advancedCapabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article className="capabilityFeatureCard" key={item.title}>
                {item.tag && (
                  <div className="capabilityTag">{item.tag}</div>
                )}

                <div className="capabilityTop">
                  <div className="capabilityIcon">
                    <Icon size={20} />
                  </div>

                  <ArrowUpRight size={18} className="capabilityArrow" />
                </div>

                <div className="capabilityContent">
                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <strong>{item.meta}</strong>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}