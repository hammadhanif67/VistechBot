import { CheckCircle2 } from "lucide-react";
import { featureIndustries } from "../../data/featuresData";

export default function IndustrySolutions() {
  return (
    <section className="industrySolutionsSection">
      <div className="featuresContainer">
        <div className="featuresSectionHeader">
          <span>Industry-Specific Solutions</span>
          <h2>Tailored AI Solutions for Every Industry</h2>
          <p>
            Our AI solutions are customized for specific industries, ensuring
            relevant and accurate responses for your business.
          </p>
        </div>

        <div className="industrySolutionsGrid">
          {featureIndustries.map((industry) => {
            const Icon = industry.icon;

            return (
              <article className="industrySolutionCard" key={industry.title}>
                <div className="industryCardTop">
                  <div className="industryIcon">
                    <Icon size={22} />
                  </div>

                  <div className="industryCardContent">
                    <h3>{industry.title}</h3>
                    <p>{industry.text}</p>
                  </div>
                </div>

                <div className="industryPoints">
                  {industry.points.map((point) => (
                    <span key={point}>
                      <CheckCircle2 size={14} />
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}