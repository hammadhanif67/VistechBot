import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import SectionHead from "../common/SectionHead";
import useMediaQuery from "../../hooks/useMediaQuery";
import { solutions } from "../../data/solutionsData";

/** Below this the two-column pattern has nowhere to put its second column. */
const NARROW = "(max-width: 900px)";

/**
 * Use cases, in whichever shape the screen can actually carry.
 *
 * On a wide screen: a list of industries on the left driving a detail panel on
 * the right. Hovering or focusing a row swaps the panel. It replaced eight
 * near-identical cards that said little more than the industry name, and it
 * lets each entry carry the four concrete jobs the assistant does there.
 *
 * The eight have pages of their own under /solutions now, so this is the
 * teaser rather than the destination: it reads the same `solutionsData` the
 * directory does — there is no second copy of an industry's line — and every
 * entry ends in a link to the page that can make the full argument.
 *
 * On a phone that pattern falls apart, and it did. With no hover, the only way
 * through it was: tap a row, scroll down to the panel, read, scroll back up,
 * tap the next row. The detail card was a desktop column stranded at the bottom
 * of a single-column page, and it showed one industry's worth of content no
 * matter which of the eight you were looking at.
 *
 * So below 900px the same data renders as an accordion: the detail opens
 * directly under the row you tapped, and closes again. One component, one list,
 * two patterns — and each gets the ARIA that actually describes it, which is
 * why this branches in JavaScript rather than hiding one of them in CSS.
 */
export default function UseCases() {
  const [active, setActive] = useState(0);
  const isNarrow = useMediaQuery(NARROW);

  return (
    <section className="section useCases" aria-labelledby="usecases-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Where it runs"
          id="usecases-heading"
          title={
            <>
              The same platform, <em>tuned to your sector</em>
            </>
          }
          lead="The vocabulary, the escalation rules and the systems it connects to change. The way it works does not."
          action={
            <Link className="linkArrow" to="/solutions">
              All eight industries <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          }
        />

        {isNarrow ? (
          <Accordion active={active} setActive={setActive} />
        ) : (
          <Tabs active={active} setActive={setActive} />
        )}
      </div>
    </section>
  );
}

/** The wide layout: an index that drives a panel beside it. */
function Tabs({ active, setActive }) {
  const current = solutions[active];
  const Icon = current.icon;

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setActive((index) => (index + 1) % solutions.length);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((index) => (index - 1 + solutions.length) % solutions.length);
    }
  };

  return (
    <div className="useCases__layout">
      <ul
        className="useCases__list"
        role="tablist"
        aria-label="Industries"
        aria-orientation="vertical"
        onKeyDown={handleKeyDown}
        data-anim="stack"
      >
        {solutions.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              role="tab"
              id={`usecase-tab-${index}`}
              aria-selected={active === index}
              aria-controls="usecase-panel"
              tabIndex={active === index ? 0 : -1}
              className={`useCases__row${active === index ? " isActive" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span className="useCases__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="useCases__name">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <div
        className="useCases__panel panel"
        id="usecase-panel"
        role="tabpanel"
        aria-labelledby={`usecase-tab-${active}`}
        tabIndex={0}
        data-anim="rise"
        data-anim-delay="1"
      >
        {/* Keyed on the active name so React swaps the subtree rather than
            mutating it — the CSS entrance replays on every change. */}
        <div className="useCases__panelInner" key={current.name}>
          <Icon size={28} className="useCases__panelIcon" aria-hidden="true" />
          <h3>{current.name}</h3>
          <p className="useCases__lead">{current.short}</p>

          <ul className="useCases__points">
            {current.jobs.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <Link className="linkArrow" to={`/solutions/${current.slug}`}>
            {current.name} in full <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * The narrow layout: detail opens under the row it belongs to.
 *
 * One open at a time. Eight industries expanded at once is a section a thumb
 * cannot get past, and the point of the list is to let someone find their own
 * sector rather than read all eight.
 */
function Accordion({ active, setActive }) {
  return (
    <ul className="useCases__accordion" data-anim="stack">
      {solutions.map((item, index) => {
        const Icon = item.icon;
        const open = active === index;

        return (
          <li key={item.name}>
            <h3>
              <button
                type="button"
                className={`useCases__toggle${open ? " isOpen" : ""}`}
                aria-expanded={open}
                aria-controls={`usecase-detail-${index}`}
                /* Tapping the open row closes it, so the list can be collapsed
                   back to eight lines without leaving the section. */
                onClick={() => setActive(open ? -1 : index)}
              >
                <span className="useCases__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="useCases__name">{item.name}</span>
                <Plus size={16} aria-hidden="true" />
              </button>
            </h3>

            {open && (
              <div className="useCases__detail" id={`usecase-detail-${index}`}>
                <Icon size={22} className="useCases__panelIcon" aria-hidden="true" />
                <p className="useCases__lead">{item.short}</p>
                <ul className="useCases__points">
                  {item.jobs.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <Link className="linkArrow" to={`/solutions/${item.slug}`}>
                  {item.name} in full <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
