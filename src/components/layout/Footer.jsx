import { useEffect, useRef } from "react";
import { ArrowRight, Mail, MapPin, Phone, Radio } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { footerLinks } from "../../data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const gridRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.to(".footerAdvancedGlow", {
        x: "random(-40, 40)", y: "random(-30, 30)",
        scale: "random(0.9, 1.1)",
        duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="advancedFooter" ref={footerRef}>
      <div className="footerAdvancedGlow" />
      <div className="footerMatrixGrid" />

      <div className="footerGrid" ref={gridRef}>
        {/* BRAND COLUMN */}
        <div className="footerBrandCol">
          <Link to="/" className="footerLogoGroup">
            <div className="brandIconWrapper">
              <Radio size={20} className="coreSignalIcon" />
              <div className="pulseRing" />
            </div>
            <h3>VistechBot</h3>
          </Link>

          <p className="brandDesc">
            Professional AI voice agent and chatbot platform for modern businesses.
            Build smart support, automate workflows, and scale faster.
          </p>

          <div className="footerContactList">
            <a href="mailto:support@vistechbot.com" className="contactRow">
              <Mail size={14} /> <span>support@vistechbot.com</span>
            </a>
            <a href="tel:+1234567890" className="contactRow">
              <Phone size={14} /> <span>+1 234 567 890</span>
            </a>
            <div className="contactRow nonClickable">
              <MapPin size={14} /> <span>Global AI Solutions Inc.</span>
            </div>
          </div>

          <div className="socialContainer">
            {[
              { href: "https://x.com",         icon: FaTwitter,   label: "Twitter",   size: 14 },
              { href: "https://linkedin.com",   icon: FaLinkedinIn,label: "LinkedIn",  size: 14 },
              { href: "https://facebook.com",   icon: FaFacebookF, label: "Facebook",  size: 14 },
              { href: "https://youtube.com",    icon: FaYoutube,   label: "YouTube",   size: 15 },
            ].map(({ href, icon: Icon, label, size }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="socialIconBtn">
                <Icon size={size} />
              </a>
            ))}
          </div>
        </div>

        {/* NAV LINK COLUMNS */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div className="footerCol" key={heading}>
            <div className="colHeader">
              <h4>{heading}</h4>
              <div className="headerIndicator" />
            </div>
            <div className="linkWrapperStack">
              {links.map(([label, path]) => (
                <Link to={path} key={label} className="animatedFooterLink">
                  <span className="linkText">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* NEWSLETTER */}
        <div className="footerNewsletter">
          <div className="colHeader">
            <h4>Stay Updated</h4>
            <div className="headerIndicator" />
          </div>
          <p>Get elite product updates, AI strategic advice, and automation concepts.</p>
          <div className="newsletterBoxContainer">
            <input type="email" placeholder="Enter business email" aria-label="Email address" />
            <button aria-label="Subscribe" className="newsletterSubmitBtn">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <p className="copyrightText">© 2026 VistechBot platform. Powered by AI Core.</p>
        <div className="bottomPolicyLinks">
          <Link to="/docs" className="subLink">Privacy Policy</Link>
          <Link to="/docs" className="subLink">Terms of Service</Link>
          <Link to="/contact" className="subLink">System Status</Link>
        </div>
      </div>
    </footer>
  );
}
