import Eyebrow from "./Eyebrow";

/**
 * The section head used across every page.
 *
 * Two columns by default — statement left, supporting copy right. The asymmetry
 * is the point; a centred head would flatten the hierarchy.
 *
 * The two-digit section index has gone. Numbering every section made the pages
 * read like a generated document, and it only ever described the order the
 * sections already appeared in.
 *
 * @param {string} eyebrow  short uppercase label
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [lead]  supporting paragraph, right column
 * @param {React.ReactNode} [action] optional link or button under the lead
 */
export default function SectionHead({ eyebrow, title, lead, action, id, split = true }) {
  return (
    <header className={`sectionHead${split && (lead || action) ? " sectionHead--split" : ""}`}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className="sectionHead__title" data-anim="rise" data-anim-delay="1">
          {title}
        </h2>
      </div>

      {(lead || action) && (
        <div className="sectionHead__aside" data-anim="rise" data-anim-delay="2">
          {lead && <p className="sectionHead__lead">{lead}</p>}
          {action}
        </div>
      )}
    </header>
  );
}
