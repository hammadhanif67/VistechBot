import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Copy, Terminal } from "lucide-react";
import { configReference, faqs, quickStartSteps } from "./docsData";
import { contactDetails } from "../../data/siteData";

/**
 * The help centre body.
 *
 * One component per page rather than five, because the sections here are short
 * and share a heading rhythm — splitting them would have meant five files that
 * each render a `<section>` and nothing else.
 *
 * A "Capabilities" section used to sit between the setup guide and the
 * configuration reference. It was a condensed restatement of the nine modules
 * on /features: two pages describing the same thing, competing for the same
 * query and neither being the better answer. The platform page owns that
 * subject now, and this page links to it.
 *
 * Deliberately under-animated. This page is read, not watched: no reveal
 * timelines and no floating icons, which is what the previous version spent
 * most of its JavaScript on.
 */
export default function DocsContent() {
  return (
    <div className="docsBody">
      <Overview />
      <QuickStart />
      <Reference />
      <Faq />
      <Support />
    </div>
  );
}

function Overview() {
  return (
    <section className="docsSection" id="help-overview" aria-labelledby="help-overview-title">
      <h2 id="help-overview-title">Overview</h2>

      <p className="docsLead">
        VistechBot answers customer questions on chat and voice using your own
        documentation, acts inside rules you define, and hands anything else to
        your team with the conversation attached.
      </p>

      <p>
        There are three ways to integrate. Most teams start with the widget,
        which needs one script tag and no backend work. The REST API is for
        answering inside your own product surface. Events let your systems react
        when a conversation is escalated or when the knowledge base comes up
        short.
      </p>

      {/* The capability list this page used to carry lived on /features too.
          One link is worth more than a second copy of it. */}
      <Link className="linkArrow" to="/platform">
        What the platform can do <ArrowUpRight size={14} aria-hidden="true" />
      </Link>

      <dl className="metaList">
        <div className="metaRow">
          <dt>Time to first answer</dt>
          <dd>Under an hour for the widget, once your help centre is connected.</dd>
        </div>
        <div className="metaRow">
          <dt>Prerequisites</dt>
          <dd>A workspace, an API key from Settings → Install, and content for the assistant to read.</dd>
        </div>
        <div className="metaRow">
          <dt>Environments</dt>
          <dd>Each workspace is its own environment. Use a separate one for staging.</dd>
        </div>
      </dl>
    </section>
  );
}

function QuickStart() {
  const [copiedId, setCopiedId] = useState(null);

  const copy = async (step) => {
    try {
      await navigator.clipboard.writeText(step.code);
      setCopiedId(step.id);
      setTimeout(() => setCopiedId((current) => (current === step.id ? null : current)), 2000);
    } catch {
      // Clipboard access can be blocked by permissions or an insecure origin.
      // The code is selectable either way, so there is nothing to recover from.
      setCopiedId(null);
    }
  };

  return (
    <section className="docsSection" id="help-start" aria-labelledby="help-start-title">
      <h2 id="help-start-title">Getting started</h2>

      <p className="docsLead">
        Three steps to a working integration. Replace the workspace id and API
        key with your own.
      </p>

      <ol className="docsSteps">
        {quickStartSteps.map((step, index) => (
          <li key={step.id}>
            <div className="docsSteps__head">
              <span className="docsSteps__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.text}</p>
              </div>
            </div>

            <div className="codeBlock">
              <div className="codeBlock__bar">
                <span className="codeBlock__lang">
                  <Terminal size={14} aria-hidden="true" /> {step.language}
                </span>

                <button
                  type="button"
                  className="codeBlock__copy"
                  onClick={() => copy(step)}
                  aria-label={`Copy the ${step.language} snippet for ${step.label}`}
                >
                  {copiedId === step.id ? (
                    <>
                      <Check size={14} aria-hidden="true" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} aria-hidden="true" /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* tabIndex makes the block scrollable by keyboard, which an
                  overflowing <pre> otherwise is not. */}
              <pre tabIndex={0}>
                <code>{step.code}</code>
              </pre>
            </div>
          </li>
        ))}
      </ol>

      <p className="notice notice--accent">
        Hosts and keys shown here are illustrative. Check Settings → Install in
        your workspace for the exact values.
      </p>
    </section>
  );
}

function Reference() {
  return (
    <section className="docsSection" id="help-config" aria-labelledby="help-config-title">
      <h2 id="help-config-title">Configuration</h2>

      <p className="docsLead">
        Attributes, endpoints and events, in the form you will actually type
        them.
      </p>

      {configReference.map(({ group, icon: Icon, rows }) => (
        <div className="docsRefGroup" key={group}>
          <h3>
            <Icon size={16} aria-hidden="true" />
            {group}
          </h3>

          <dl className="metaList">
            {rows.map(([key, value]) => (
              <div className="metaRow" key={key}>
                <dt>
                  <code>{key}</code>
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </section>
  );
}

function Faq() {
  return (
    <section className="docsSection" id="help-faq" aria-labelledby="help-faq-title">
      <h2 id="help-faq-title">Frequently asked questions</h2>

      {/* Answers stay visible. The previous build put `aria-expanded` on rows
          that never expanded — a disclosure that only pretended to be one — and
          keeping them open is what makes the FAQPage markup on this route
          match what a visitor can read. */}
      <dl className="docsFaq">
        {faqs.map((item) => (
          <div className="docsFaq__row" key={item.question}>
            <span className="tag docsFaq__tag">{item.tag}</span>
            <div>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Support() {
  return (
    <section className="docsSection" id="help-support" aria-labelledby="help-support-title">
      <h2 id="help-support-title">Support</h2>

      <p className="docsLead">
        If the answer is not here, a person will get it for you.
      </p>

      <dl className="metaList">
        <div className="metaRow">
          <dt>Email</dt>
          <dd>
            <a className="docsLink" href={`mailto:${contactDetails.email}`}>
              {contactDetails.email}
            </a>
          </dd>
        </div>
        <div className="metaRow">
          <dt>Phone</dt>
          <dd>
            <a className="docsLink" href={contactDetails.phoneHref}>
              {contactDetails.phone}
            </a>
          </dd>
        </div>
        <div className="metaRow">
          <dt>Implementation help</dt>
          <dd>
            Knowledge base setup, channel configuration, escalation rules.{" "}
            <Link className="docsLink" to="/contact">
              Send us the details
            </Link>
            .
          </dd>
        </div>
      </dl>
    </section>
  );
}
