/**
 * The label that opens every section.
 *
 * Just the words, with a rule that draws itself underneath as the section comes
 * into view. The previous version put a short dash *before* the text and a
 * two-digit index in front of that — the numbering made the page read like a
 * generated document rather than something written, and the leading dash was
 * decoration standing in for hierarchy.
 *
 * The rule is a real element rather than a `::after`, because GSAP cannot
 * animate a pseudo-element and the draw has to run off the shared `data-anim`
 * system like everything else. It carries its own animation, one step behind
 * the text, so the words land first and the line is drawn under them.
 *
 * @param {React.ElementType} [as] element to render as — `h2` where the label
 *   is genuinely the heading of the block it opens
 * @param {boolean} [now] run on load instead of waiting for scroll
 * @param {number}  [delay] stagger step, matching the shared motion system
 */
export default function Eyebrow({
  children,
  as: Tag = "p",
  now = false,
  delay = 0,
  className = "",
  ...props
}) {
  const timing = now ? { "data-anim-now": "" } : {};

  return (
    <Tag className={`eyebrow ${className}`.trim()} {...props}>
      <span className="eyebrow__text" data-anim="rise" data-anim-delay={delay} {...timing}>
        {children}
      </span>
      <i
        className="eyebrow__rule"
        aria-hidden="true"
        data-anim="rule"
        data-anim-delay={delay + 1}
        {...timing}
      />
    </Tag>
  );
}
