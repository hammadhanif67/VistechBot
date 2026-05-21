import { ArrowRight, Play, Sparkles } from "lucide-react";
import featureRobot from "../../assets/images/feature-right-robo.png";


export default function FeaturesHero() {
  return (
    <section className="featuresHero">
      <div className="heroGlow heroGlowOne"></div>
      <div className="heroGlow heroGlowTwo"></div>

      <div className="featuresHeroContainer">
        <div className="featuresHeroContent">
          <div className="featuresHeroBadge">
            <Sparkles size={16} />
            <span>Enterprise-Grade AI Solutions</span>
          </div>

          <h1 className="featuresHeroTitle">
            <span className="titleWhite">AI That</span>
            <span className="titleGradient">Understands</span>
            <span className="titleWhite">Your Business</span>
          </h1>

          <p className="featuresHeroText">
            Industry-specific AI solutions that learn your business, speak your
            language, and deliver results that matter. From healthcare to
            finance, we’ve got you covered.
          </p>

          <div className="featuresHeroActions">
            <button className="heroBtn primaryBtn">
              Start Free Trial <ArrowRight size={18} />
            </button>

            <button className="heroBtn secondaryBtn">
              <Play size={18} />
              Watch Demo
            </button>
          </div>
        </div>

        <div className="featuresHeroVisual">
          <div className="orbit orbitOne"></div>
          <div className="orbit orbitTwo"></div>

          <div className="stars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="robotWrap">
            <img src={featureRobot} alt="AI Robot" className="featureRobot" />
          </div>

          <div className="energyBase"></div>
        </div>
      </div>
    </section>
  );
}