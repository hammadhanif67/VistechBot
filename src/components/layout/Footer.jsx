import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Wordmark from "../brand/Wordmark";
import { contactDetails, footerLinks, footerPlaceholders } from "../../data/siteData";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer.
 *
 * Rebuilt for density. The previous version ran to 975px on a desktop screen
 * and most of that was air: a 186px sign-off statement repeating the home
 * page's own headline word for word, a three-column assurance strip giving 432
 * pixels each to a two-line claim, and link columns stretched to 490px to match
 * the tallest cell beside them.
 *
 * Three bands now, each sized by its content:
 *   1. identity and the newsletter, on one row
 *   2. four link columns, top-aligned so short ones stay short
 *   3. the legal bar
 */
export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer__brand, .footer__signup, .footer__col",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%", once: true },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__inner">
        {/* --- Identity + signup --- */}
        <div className="footer__head">
          <div className="footer__brand">
            <Wordmark size={24} />
            <p>
              AI chat and voice agents that answer from your own documentation
              and stay inside your rules.
            </p>
            <Link className="btn btn--ghost btn--sm" to="/contact">
              Start free trial <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <NewsletterForm />
        </div>

        {/* --- Link columns --- */}
        <div className="footer__grid">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <nav className="footer__col" key={heading} aria-label={heading}>
              <h2 className="footer__colTitle">{heading}</h2>
              <ul>
                {links.map(([label, path]) => (
                  <li key={label}>
                    <Link to={path}>
                      <span>{label}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col">
            <h2 className="footer__colTitle">Contact</h2>

            <address className="footer__contact">
              <a href={`mailto:${contactDetails.email}`}>
                <Mail size={14} aria-hidden="true" />
                <span>{contactDetails.email}</span>
              </a>
              <a href={contactDetails.phoneHref}>
                <Phone size={14} aria-hidden="true" />
                <span>{contactDetails.phone}</span>
              </a>
              <span className="footer__contactStatic">
                <MapPin size={14} aria-hidden="true" />
                <span>{contactDetails.location}</span>
              </span>
            </address>
          </div>
        </div>

        {/* --- Legal bar --- */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} VistechBot. All rights reserved.</p>

          <ul className="footer__legal">
            {/* Marked as placeholders rather than pointed at an unrelated page. */}
            {footerPlaceholders.map((label) => (
              <li key={label}>
                <span className="isPlaceholder" aria-disabled="true">
                  {label} <em>soon</em>
                </span>
              </li>
            ))}
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/**
 * Newsletter capture.
 *
 * No mailing-list backend is wired up, so the form validates the address and
 * then says plainly that it is not connected, rather than showing a success
 * message for a submission that went nowhere.
 */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus({ state: "error", message: "Enter a valid email address." });
      return;
    }

    setStatus({
      state: "info",
      message: "Signup is not connected yet. Email us and we will add you.",
    });
  };

  return (
    <form className="footer__signup" onSubmit={handleSubmit} noValidate>
      <label className="footer__signupLabel" htmlFor="newsletter-email">
        Product updates
      </label>

      <div className="footer__signupRow">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Work email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status) setStatus(null);
          }}
          aria-describedby="newsletter-status"
          aria-invalid={status?.state === "error" || undefined}
        />
        <button type="submit" aria-label="Subscribe to product updates">
          {status?.state === "info" ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      <span
        className="footer__status"
        id="newsletter-status"
        role="status"
        data-state={status?.state}
      >
        {status?.message}
      </span>
    </form>
  );
}
