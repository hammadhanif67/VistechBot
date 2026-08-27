import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle, MessagesSquare, Phone, X } from "lucide-react";
import { contactDetails } from "../../data/siteData";

/**
 * Every way to reach the team, in one place.
 *
 * Each row is a real destination the site can actually honour. There is no
 * social row here because there are no social accounts yet — a dock of dead
 * links is worse than a shorter dock.
 */
const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    Icon: MessagesSquare,
    label: "WhatsApp",
    value: contactDetails.phone,
    href: contactDetails.whatsappHref,
    external: true,
  },
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
  },
  {
    id: "phone",
    Icon: Phone,
    label: "Call",
    value: contactDetails.phone,
    href: contactDetails.phoneHref,
  },
];

/**
 * The contact dock.
 *
 * A fixed control in the bottom corner that opens a short list of channels.
 * It exists because the contact details were reachable from exactly two places
 * — the footer, at the bottom of the page, and the contact route — and someone
 * mid-way through the pricing table had to leave what they were reading to find
 * either.
 *
 * Deliberately not a chat widget. It does not pretend a conversation is
 * starting; it hands over an address, a number, and the form.
 */
export default function ContactDock() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Focus goes back to the control that opened the panel, so the tab order
      // resumes where it left off rather than at the top of the document.
      triggerRef.current?.focus();
    };

    // A click anywhere outside closes it. `pointerdown` rather than `click` so
    // the panel is gone before the underlying element reacts.
    const onPointerDown = (event) => {
      if (panelRef.current?.contains(event.target)) return;
      if (triggerRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className={`dock${open ? " isOpen" : ""}`}>
      {open && (
        <div className="dock__panel" ref={panelRef} id="contact-dock-panel">
          <p className="dock__title">Talk to us</p>

          <ul className="dock__list">
            {CONTACT_CHANNELS.map(({ id, Icon, label, value, href, external }) => (
              <li key={id}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className="dock__channel">
                    <b>{label}</b>
                    <small>{value}</small>
                  </span>
                </a>
              </li>
            ))}

            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                <ArrowUpRight size={18} aria-hidden="true" />
                <span className="dock__channel">
                  <b>Send a message</b>
                  <small>Tell us about your queue</small>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        className="dock__trigger"
        aria-expanded={open}
        aria-controls="contact-dock-panel"
        aria-label={open ? "Close contact options" : "Contact options"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <MessageCircle size={20} aria-hidden="true" />}
      </button>
    </div>
  );
}
