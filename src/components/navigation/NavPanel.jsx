import { useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";

/**
 * A navigation item that opens a floating panel.
 *
 * The trigger is a button, not a link. It has to be: it opens something rather
 * than going somewhere, and a link that does not navigate is a lie to anyone
 * using a screen reader or middle-clicking. The destination is still one click
 * away — it is the action at the foot of the panel.
 *
 * Hover opens it on a pointer device, but hover is never the only way in:
 * click, Enter and Space all work, Escape closes and returns focus, and Tab
 * moving out of the panel closes it. A control that only responds to hover is
 * unreachable by keyboard and unusable by touch.
 *
 * Only rendered on desktop. The mobile overlay uses its own expandable list —
 * a floating panel on a phone is a mega-menu in a space that has no room for
 * one.
 */
export default function NavPanel({ panel, label, isOpen, onOpen, onClose }) {
  const id = useId();
  const panelId = `nav-panel-${id}`;
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  /* A short close delay for the pointer travelling from the trigger down into
     the panel: without it the gap between the two counts as a mouse-out and the
     panel shuts before it can be reached. */
  const closeTimer = useRef(null);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, 120);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      onClose();
      triggerRef.current?.focus();
    };

    const onPointerDown = (event) => {
      if (panelRef.current?.contains(event.target)) return;
      if (triggerRef.current?.contains(event.target)) return;
      onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen, onClose]);

  // Tabbing past the last link in the panel should close it, not leave an open
  // panel behind the focus ring.
  const onBlurCapture = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    onClose();
  };

  return (
    <div
      className={`navPanel${isOpen ? " isOpen" : ""}`}
      onMouseEnter={() => { cancelClose(); onOpen(); }}
      onMouseLeave={closeSoon}
      onBlurCapture={onBlurCapture}
    >
      <button
        ref={triggerRef}
        type="button"
        className="nav__link navPanel__trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {label}
        <ChevronDown size={13} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="navPanel__sheet" id={panelId} ref={panelRef}>
          <div className="navPanel__head">
            <p className="navPanel__eyebrow">{panel.eyebrow}</p>
            <p className="navPanel__heading">{panel.heading}</p>
          </div>

          <div className="navPanel__body" data-groups={panel.groups.length}>
            {panel.groups.map((group) => (
              <div className="navPanel__group" key={group.id}>
                <p className="navPanel__groupLabel">{group.label}</p>

                <ul>
                  {group.items.map(({ id: itemId, icon: Icon, title, text, to }) => (
                    <li key={itemId}>
                      <Link to={to} onClick={onClose}>
                        <Icon size={18} aria-hidden="true" />
                        <span>
                          <b>{title}</b>
                          <small>{text}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link className="navPanel__action" to={panel.action.to} onClick={onClose}>
            {panel.action.label}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
