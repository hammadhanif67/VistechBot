import { useRef, useState } from "react";
import { AlertCircle, ArrowUpRight, Check } from "lucide-react";
import { contactDetails } from "../../data/siteData";

/**
 * Where a submission goes.
 *
 * Set `VITE_CONTACT_ENDPOINT` to a form handler and the message is POSTed
 * there. With nothing configured — which is the state this project ships in —
 * the form does not pretend to have sent anything: it validates, then hands
 * over a prefilled email. The previous version logged to the console and told
 * the visitor "we received your message", which was not true.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";

const EMPTY = { name: "", email: "", company: "", volume: "", message: "" };
const MESSAGE_LIMIT = 600;

function validate({ name, email, message }) {
  const errors = {};

  if (!name.trim()) errors.name = "Enter your name so we know who we are replying to.";
  else if (name.trim().length < 2) errors.name = "That name looks too short.";

  if (!email.trim()) errors.email = "We need an email address to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
    errors.email = "That does not look like a valid email address.";

  if (!message.trim()) errors.message = "Tell us a little about what you need.";
  else if (message.trim().length < 15)
    errors.message = "A sentence or two helps us route this to the right person.";

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | manual | failed
  const successRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear a field's error as soon as the visitor starts fixing it, rather
    // than making them submit again to find out.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const mailtoHref = () => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : null,
      form.volume ? `Monthly conversations: ${form.volume}` : null,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${contactDetails.email}?subject=${encodeURIComponent(
      `Enquiry from ${form.name}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];

    if (firstInvalid) {
      // Move focus to the first problem, so a keyboard or screen-reader user is
      // not left guessing why nothing happened. Looked up by id rather than
      // held in a ref, because which field is first depends on the render that
      // has not happened yet.
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus("manual");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus("sent");
      setForm(EMPTY);
      successRef.current?.focus();
    } catch {
      setStatus("failed");
    }
  };

  const field = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  if (status === "sent") {
    return (
      <div className="contactForm panel" tabIndex={-1} ref={successRef}>
        <Check size={28} className="contactForm__tick" aria-hidden="true" />
        <h2>Message sent</h2>
        <p>Thanks. We have it, and we will come back to you by email.</p>
      </div>
    );
  }

  return (
    <form className="contactForm panel" onSubmit={handleSubmit} noValidate>
      <h2 id="contact-form-heading">Send a message</h2>
      <p className="contactForm__intro">
        Tell us what you are trying to solve and we will point you at the right
        thing.
      </p>

      <div className="contactForm__row">
        <div className="field">
          <label htmlFor="name">
            Name <span aria-hidden="true">*</span>
            <span className="visuallyHidden">(required)</span>
          </label>
          <input type="text" autoComplete="name" placeholder="Jordan Ellis" required {...field("name")} />
          {errors.name && (
            <p className="fieldError" id="name-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span aria-hidden="true">*</span>
            <span className="visuallyHidden">(required)</span>
          </label>
          <input type="email" autoComplete="email" placeholder="you@company.com" required {...field("email")} />
          {errors.email && (
            <p className="fieldError" id="email-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="contactForm__row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input type="text" autoComplete="organization" placeholder="Optional" {...field("company")} />
        </div>

        <div className="field">
          <label htmlFor="volume">Monthly conversations</label>
          <select {...field("volume")}>
            <option value="">Not sure yet</option>
            <option value="under-1000">Under 1,000</option>
            <option value="1000-10000">1,000 – 10,000</option>
            <option value="10000-50000">10,000 – 50,000</option>
            <option value="over-50000">Over 50,000</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">
          Message <span aria-hidden="true">*</span>
          <span className="visuallyHidden">(required)</span>
        </label>
        <textarea
          maxLength={MESSAGE_LIMIT}
          rows={6}
          placeholder="What does your support queue look like today?"
          required
          {...field("message")}
        />
        <span className="fieldCount" aria-hidden="true">
          {form.message.length} / {MESSAGE_LIMIT}
        </span>
        {errors.message && (
          <p className="fieldError" id="message-error">
            <AlertCircle size={14} aria-hidden="true" /> {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Send message"}
        <ArrowUpRight size={16} aria-hidden="true" />
      </button>

      {/* One live region for every outcome, so a screen reader hears the result
          without it being duplicated across states. */}
      <div role="status" aria-live="polite">
        {status === "manual" && (
          <p className="notice notice--accent">
            This form is not connected to a mailbox yet.{" "}
            <a href={mailtoHref()}>Send it as an email instead</a>. Your answers
            are already filled in.
          </p>
        )}
        {status === "failed" && (
          <p className="notice notice--warn">
            That did not go through. Please <a href={mailtoHref()}>email us directly</a>{" "}
            and we will pick it up.
          </p>
        )}
      </div>

      <p className="contactForm__note">
        We use your details to reply to this enquiry, nothing else.
      </p>
    </form>
  );
}
