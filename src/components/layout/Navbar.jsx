import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import Wordmark from "../brand/Wordmark";
import ThemeToggle from "./ThemeToggle";
import Eyebrow from "../common/Eyebrow";
import { navItems } from "../../data/siteData";

const MENU_ID = "site-menu";

/**
 * Site navigation.
 *
 * Rebuilt as a hairline bar rather than a floating pill row: the logo sits hard
 * left, the links are uppercase micro-type in the centre, and one CTA closes the
 * right edge. Active state is an accent underline drawn along the item's own
 * baseline — no capsule, no fill.
 *
 * On small screens it becomes a full-height overlay with the routes set as an
 * indexed editorial list, which is the same typographic system the pages use.
 *
 * The theme control sits in the bar on desktop and moves into the overlay on
 * small screens, where the bar has only room for the wordmark and the menu
 * button. Both copies read the same store, so they cannot disagree.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close on navigation — including a browser back button, which the old
  // per-link onClick never caught. Adjusting during render rather than in an
  // effect avoids a frame where the new page shows behind an open menu.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Focus returns to the control that opened the panel so the tab order
      // resumes where the visitor left it.
      toggleRef.current?.focus();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    let ctx;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".menuRow",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.62, stagger: 0.055, ease: "power4.out" }
        );
        gsap.fromTo(
          ".menuAside > *",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.2, ease: "power3.out" }
        );
      }, panelRef);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      ctx?.revert();
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " isScrolled" : ""}${open ? " isOpen" : ""}`}>
      <div className="nav__inner">
        <Wordmark size={26} animated />

        <nav className="nav__links" aria-label="Main">
          <ul>
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) => (isActive ? "nav__link isActive" : "nav__link")}
                  aria-current={pathname === path ? "page" : undefined}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <ThemeToggle className="nav__theme" />

          <Link className="btn btn--primary btn--sm nav__cta" to="/contact">
            Get started <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="nav__toggleBars" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="nav__toggleLabel">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Full-height overlay. Rendered only when open so its links are not in
          the tab order the rest of the time. */}
      {open && (
        <div className="menu" id={MENU_ID} ref={panelRef}>
          <div className="menu__inner">
            <nav className="menu__nav" aria-label="Site">
              <ul>
                {navItems.map(({ label, path }, index) => (
                  <li key={path} className="menuRowClip">
                    <NavLink
                      to={path}
                      end={path === "/"}
                      className={({ isActive }) =>
                        isActive ? "menuRow menu__link isActive" : "menuRow menu__link"
                      }
                      aria-current={pathname === path ? "page" : undefined}
                    >
                      <span className="menu__index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="menu__label">{label}</span>
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="menuAside">
              <div className="menuAside__theme">
                <Eyebrow>Theme</Eyebrow>
                <ThemeToggle />
              </div>

              <Eyebrow>Start a conversation</Eyebrow>
              <a className="menu__contact" href="mailto:support@vistechbot.com">
                support@vistechbot.com
              </a>
              <Link className="btn btn--accent btn--block" to="/contact">
                Get started <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
