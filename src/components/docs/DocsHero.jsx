import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Headphones,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import docsHeroLeft from "../../assets/images/docs-hero-left-section.png";
import docsHeroRight from "../../assets/images/docs-hero-right-section.png";
import { searchableDocs } from "./docsData";

const resolveTarget = (item) => {
  if (item.target) return item.target;
  if (item.id) return item.id;
  if (item.question) return "docs-faq";
  if (item.level) return "docs-videos";
  return "docs-features";
};

export default function DocsHero({ query, setQuery }) {
  const heroRef = useRef(null);
  const searchRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    return searchableDocs
      .map((item) => {
        const haystack = `${item.title || ""} ${item.text || ""} ${item.question || ""} ${item.answer || ""} ${item.tag || ""} ${item.level || ""}`.toLowerCase();
        return {
          ...item,
          targetId: resolveTarget(item),
          score: haystack.startsWith(value) ? 2 : haystack.includes(value) ? 1 : 0,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [query]);

  const jumpTo = (id) => {
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setFocused(false);
  };

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Always set visible first
    gsap.set(
      [
        ".docsHeroArtLeft",
        ".docsHeroArtRight",
        ".docsHeroBadge",
        ".docsHeroTitle",
        ".docsHeroText",
        ".docsSearchWrap",
        ".docsHeroBtn",
      ],
      { opacity: 1, visibility: "visible", x: 0, y: 0 }
    );

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.fromTo(".docsHeroArtLeft", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 })
        .fromTo(".docsHeroArtRight", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 }, "<")
        .fromTo(".docsHeroBadge", { y: -20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8")
        .fromTo(".docsHeroTitle", { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.6")
        .fromTo(".docsHeroText", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
        .fromTo(".docsSearchWrap", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
        .fromTo(".docsHeroBtn", { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.4");

      gsap.to([".docsHeroArtLeft img", ".docsHeroArtRight img"], {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      gsap.to(".docsFloatIcon", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (focused) {
      gsap.to(".docsSearchWrap", { borderColor: "#6366f1", boxShadow: "0 0 25px rgba(99,102,241,0.2)", duration: 0.3 });
    } else {
      gsap.to(".docsSearchWrap", { borderColor: "rgba(255,255,255,0.12)", boxShadow: "0 18px 55px rgba(0,0,0,0.32)", duration: 0.3 });
    }
  }, [focused]);

  useEffect(() => {
    if (focused && results.length > 0) {
      gsap.fromTo(
        ".searchResultItem",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: "power2.out", overwrite: "auto" }
      );
    }
  }, [results, focused]);


  useEffect(() => {
    const close = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setFocused(false);
    };
    const shortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.getElementById("docsSearch")?.focus();
      }
    };
    document.addEventListener("mousedown", close);
    window.addEventListener("keydown", shortcut);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("keydown", shortcut);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((c) => (c + 1) % results.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((c) => (c - 1 + results.length) % results.length); }
    if (e.key === "Enter") { e.preventDefault(); if (results[activeIndex]) jumpTo(results[activeIndex].targetId); }
    if (e.key === "Escape") setFocused(false);
  };

  return (
    <section className="docsHero" ref={heroRef} id="docs-top">
      <div className="docsHeroGlow" />

      {/* Left Artwork */}
      <div className="docsHeroArt docsHeroArtLeft" aria-hidden="true">
        <img src={docsHeroLeft} alt="" />
        <span className="docsFloatIcon book"><BookOpen size={22} /></span>
        <span className="docsFloatIcon code"><Code2 size={20} /></span>
      </div>

      {/* Center Content */}
      <div className="docsHeroCenter">
        <span className="docsHeroBadge">
          <BookOpen size={14} /> Complete Documentation &amp; Support
        </span>

        <h1 className="docsHeroTitle">
          Documentation &amp; <span className="highlightText">Help Center</span>
        </h1>

        <p className="docsHeroText">
          Everything you need to know about VistechBot. From getting started to advanced features, we've got you covered.
        </p>

        {/* Search Bar */}
        <div className="docsSearchWrap" ref={searchRef}>
          <label className="docsSearchBox" htmlFor="docsSearch">
            <Search size={18} />
            <input
              id="docsSearch"
              value={query}
              onChange={(e) => { setActiveIndex(0); setQuery(e.target.value); }}
              onFocus={() => setFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              autoComplete="off"
            />
            {query ? (
              <button type="button" className="clearBtn" onClick={() => { setActiveIndex(0); setQuery(""); }} aria-label="Clear">
                <X size={15} />
              </button>
            ) : (
              <kbd className="docsKbdShortcut">⌘K</kbd>
            )}
          </label>

          {focused && query && (
            <div className="docsSearchResults" role="listbox">
              {results.length ? (
                results.map((item, index) => (
                  <button
                    className={`searchResultItem ${activeIndex === index ? "active" : ""}`}
                    key={`${item.title || item.question}-${index}`}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => jumpTo(item.targetId)}
                  >
                    <span className="resultIcon"><BookOpen size={16} /></span>
                    <span className="resultContent">
                      <b>{item.title || item.question}</b>
                      <small>{item.text || item.answer || item.level}</small>
                    </span>
                    <ArrowRight size={16} />
                  </button>
                ))
              ) : (
                <div className="noResultsBox">
                  <p>No result found for <b>{query}</b></p>
                  <small>Try "setup", "billing", "voice" or "support".</small>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="docsHeroActions">
          <button className="docsPrimaryBtn docsHeroBtn" type="button" onClick={() => jumpTo("docs-navigation")}>
            Explore Features <ArrowRight size={18} />
          </button>
          <button className="docsOutlineBtn docsHeroBtn" type="button" onClick={() => jumpTo("docs-help")}>
            <Headphones size={18} /> Contact Support
          </button>
        </div>
      </div>

      {/* Right Artwork */}
      <div className="docsHeroArt docsHeroArtRight" aria-hidden="true">
        <img src={docsHeroRight} alt="" />
        <span className="docsFloatIcon chat"><MessageCircle size={22} /></span>
        <span className="docsFloatIcon help"><Headphones size={20} /></span>
      </div>
    </section>
  );
}
