import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDocsReveal } from "./useDocsReveal";
import { platformFeatures } from "./docsData";

const matches = (item, query) => !query || `${item.title} ${item.text}`.toLowerCase().includes(String(query).trim().toLowerCase());

export default function DocsPlatformFeatures({ query = "" }) {
  const ref = useDocsReveal({ itemSelector: ".docsFeatureCard" });

  return (
    <section className="docsPanel docsReveal" ref={ref} id="docs-features">
      <div className="docsSectionHead splitHead">
        <div>
          <span className="docsSectionEyebrow">Core Platform</span>
          <h2>Platform Features</h2>
          <p>Production-ready AI tools for support, automation, knowledge management and analytics.</p>
        </div>
        <Link className="docsHeadLink" to="/features">View all features <ArrowRight size={15} /></Link>
      </div>

      <div className="docsFeatureGrid">
        {platformFeatures.map(({ icon: Icon, title, text, color }, index) => (
          <article className={`docsFeatureCard ${color} ${matches({ title, text }, query) ? "isVisible" : "isDimmed"}`} key={title} style={{ "--card-index": index }}>
            <span className={`docsIcon ${color}`}><Icon size={24} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <Link to="/features">Learn more <ArrowRight size={14} /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
