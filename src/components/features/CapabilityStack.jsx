import { capabilityGroups } from "../../data/featuresData";
import Eyebrow from "../common/Eyebrow";

/**
 * The capability stack.
 *
 * Three groups, each its own `<section>` with a heading, each rendering its
 * capabilities as an indexed module list. Numbering runs continuously across
 * groups — 01 through 09 — so the page reads as one stack rather than three
 * restarts.
 *
 * No WebGL behind the groups. A canvas running under a list of nine
 * capabilities competed with the text for attention and made the reading
 * harder, which is the opposite of what a capability list is for.
 *
 * Group and capability anchors are real ids, which is what lets the hero index
 * and the footer link into specific parts of the page.
 */
export default function CapabilityStack() {
  // Running offsets so numbering continues across groups (01–09) without
  // mutating a counter mid-render.
  const offsets = capabilityGroups.reduce(
    (acc, group) => [...acc, acc[acc.length - 1] + group.items.length],
    [0]
  );

  return (
    <>
      {capabilityGroups.map((group, groupIndex) => (
        <section
          className="section stack"
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
        >
          <div className="shell stack__inner">
            <header className="sectionHead sectionHead--split">
              <div>
                <Eyebrow>{group.label}</Eyebrow>
                <h2 id={`${group.id}-title`} data-anim="rise" data-anim-delay="1">
                  {group.title}
                </h2>
              </div>
              <div data-anim="rise" data-anim-delay="2">
                <p className="sectionHead__lead">{group.text}</p>
              </div>
            </header>

            <ol className="moduleList">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const number = offsets[groupIndex] + itemIndex + 1;

                return (
                  <li
                    className="module"
                    key={item.title}
                    id={item.id}
                    data-anim="rise"
                    data-anim-delay={itemIndex}
                  >
                    <span className="module__index">{String(number).padStart(2, "0")}</span>

                    <div className="module__body">
                      <h3 className="module__title">
                        <Icon size={20} aria-hidden="true" />
                        {item.title}
                        {item.tag && <span className="tag tag--accent">{item.tag}</span>}
                      </h3>

                      <div>
                        <p className="module__text">{item.text}</p>
                        <span className="module__meta">{item.meta}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ))}
    </>
  );
}
