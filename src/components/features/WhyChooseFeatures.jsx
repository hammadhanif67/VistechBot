import { whyChooseCards } from "../../data/featuresData";

export default function WhyChooseFeatures() {
  return (
    <section className="whyChooseSection">
      <div className="whyChooseContainer">
        <div className="featuresSectionHeader">
          <span>Why Choose VistechBot?</span>
          <h2>
            Transform your business with AI that actually works for your
            industry
          </h2>
        </div>

        <div className="whyChooseGrid">
          {whyChooseCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="whyChooseCard" key={card.title}>
                <div className="whyChooseIcon">
                  <Icon size={24} />
                </div>

                <div className="whyChooseContent">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}