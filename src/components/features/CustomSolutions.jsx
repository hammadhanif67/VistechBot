import { CheckCircle2 } from "lucide-react";
import brainImage from "../../assets/images/brain_transparent.png";

import { customSolutions, customizationProcess } from "../../data/featuresData";

export default function CustomSolutions() {
  return (
    <section className="customSolutionsSection">
      <div className="featuresContainer">
        <div className="featuresSectionHeader">
          <span>Custom Solutions for Your Business</span>
          <h2>Every business is unique. We build solutions that fit your needs.</h2>
        </div>

        <div className="customSolutionsGrid">
          <div className="customListCard">
            {customSolutions.map((item) => (
              <div className="customListItem" key={item.title}>
                <div className="customListIcon">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="customProcessCard">
            <h3>Our Customization Process</h3>
            {customizationProcess.map((step, index) => (
              <div className="processItem" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step}</h4>
                  <p>
                    We plan, design, implement, and optimize your AI solution for
                    maximum performance.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="customBrainWrap">
            <img src={brainImage} alt="AI Brain" />
          </div>
        </div>

        <div className="customQuoteBox">
          <div>
            <h3>Ready to Get Started?</h3>
            <p>Contact our team to discuss your specific needs and get a customized solution for your business.</p>
          </div>
          <button className="featuresPrimaryBtn">
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
