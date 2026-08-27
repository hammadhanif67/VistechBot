import Eyebrow from "../common/Eyebrow";
import { contactDetails } from "../../data/siteData";

/**
 * The panel beside the form.
 *
 * Direct channels, then what happens after you send. The previous version put
 * four equal contact cards above the form — including a "Live chat, available
 * 24/7" card that opened nothing — plus a testimonial from the company's own
 * CEO. All three problems are gone.
 *
 * The email here read `support@vistechai.com` while the footer said
 * `support@vistechbot.com`. Both now come from one source.
 *
 * An "Elsewhere" block used to close the panel with four social buttons.
 * There are no profiles behind them, so it was four links to nowhere under a
 * heading promising somewhere.
 */
const NEXT_STEPS = [
  "We read it and work out who should answer.",
  "You get a reply by email, usually the same working day.",
  "If a call would be faster, we suggest a time rather than a form.",
];

export default function ContactChannels() {
  return (
    <aside className="contactAside" aria-label="Other ways to reach us">
      <div className="contactAside__block">
        <Eyebrow as="h2">Direct</Eyebrow>
        <dl className="metaList">
          <div className="metaRow">
            <dt>Email</dt>
            <dd>
              <a className="contactAside__link" href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </dd>
          </div>
          <div className="metaRow">
            <dt>Phone</dt>
            <dd>
              <a className="contactAside__link" href={contactDetails.phoneHref}>
                {contactDetails.phone}
              </a>
            </dd>
          </div>
          <div className="metaRow">
            <dt>Office</dt>
            <dd>
              <address>{contactDetails.location}</address>
              <span className="contactAside__note">Visits by appointment</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="contactAside__block">
        <Eyebrow as="h2">What happens next</Eyebrow>
        <ol className="contactAside__steps">
          {NEXT_STEPS.map((step, index) => (
            <li key={step}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
