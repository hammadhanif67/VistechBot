import { ArrowRight } from "lucide-react";
import { useDocsReveal } from "./useDocsReveal";
import { quickNavigation } from "./docsData";

const matches = (item, query) => {
  const value = String(query || "").trim().toLowerCase();

  if (!value) return true;

  return `${item.title} ${item.text}`.toLowerCase().includes(value);
};

export default function DocsQuickNavigation({ query = "" }) {
  const ref = useDocsReveal({ itemSelector: ".docsQuickCard" });

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="docsPanel docsReveal" ref={ref} id="docs-navigation">
      <div className="docsSectionHead centerHead">
        <h2>Quick Navigation</h2>
        <p>Find what you’re looking for quickly</p>
      </div>

      <div className="docsQuickGrid">
        {quickNavigation.map(({ icon: Icon, title, text, color, target }) => (
          <article
            className={`docsQuickCard ${
              matches({ title, text }, query) ? "isVisible" : "isDimmed"
            }`}
            key={title}
            onClick={() => jumpTo(target)}
          >
            <span className={`docsIcon ${color}`}>
              <Icon size={18} strokeWidth={2.1} />
            </span>

            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>

            <button type="button" aria-label={`Open ${title}`}>
              <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}