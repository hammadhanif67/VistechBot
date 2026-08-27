import { useEffect, useRef, useState } from "react";
import Eyebrow from "../common/Eyebrow";
import { HELP_SECTIONS } from "./docsData";

/**
 * Sticky help centre navigation.
 *
 * Tracks which section is on screen and marks it `aria-current`, so the sidebar
 * says where you are rather than only where you could go. Uses one observer
 * across all sections with a narrow band near the top of the viewport - that
 * band is what makes the highlight change at the moment a heading reaches the
 * reading position, instead of when a section merely becomes partly visible.
 *
 * On a phone the same list is a horizontal strip, and there the highlight alone
 * was not enough: the strip stayed parked at the start, so someone reading
 * Configuration still saw Overview and Quick start sitting in front of them.
 * The strip now follows the reading position.
 */
export default function DocsSidebar() {
  const [active, setActive] = useState(HELP_SECTIONS[0].id);
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    /*
       An observer callback only carries the sections whose state just changed.
       Deciding from that batch alone gets it wrong when one section leaves the
       band while another is already sitting inside it: the batch holds only the
       leaving entry, nothing is intersecting in it, and the highlight stays on
       the section you have just finished reading. Keeping the full picture here
       and reading it after every batch means the answer always comes from every
       section, not from whichever ones happened to move.
    */
    const onScreen = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        });

        const current = HELP_SECTIONS.find(({ id }) => onScreen.has(id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    HELP_SECTIONS.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  /*
     Bring the active chip into the middle of the strip.

     Only runs when the list is actually a horizontal scroller, which is the
     phone and tablet layout - on a desktop the list is a vertical column with
     nothing to scroll, so this is a no-op there without needing to ask the
     viewport how wide it is.

     Scrolling is measured from bounding rects rather than `offsetLeft`, because
     the sticky wrapper changes what counts as the offset parent. `scrollBy` on
     the list moves only the list; `scrollIntoView` would have dragged the page
     itself vertically to reach a chip that was already in view.
  */
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;

    const chip = list.querySelector(".isActive");
    if (!chip) return;

    const strip = list.getBoundingClientRect();
    const box = chip.getBoundingClientRect();
    const delta = box.left - strip.left - (strip.width - box.width) / 2;

    if (Math.abs(delta) < 2) return;

    list.scrollBy({
      left: delta,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [active]);

  return (
    <nav className="docsNav" aria-label="Help centre sections">
      <Eyebrow className="docsNav__title">On this page</Eyebrow>

      <ul ref={listRef}>
        {HELP_SECTIONS.map((section, index) => {
          const Icon = section.icon;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`docsNav__link${active === section.id ? " isActive" : ""}`}
                aria-current={active === section.id ? "location" : undefined}
              >
                <span className="docsNav__index">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={14} aria-hidden="true" />
                <span>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
