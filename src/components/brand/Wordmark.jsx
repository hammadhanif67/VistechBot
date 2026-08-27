import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";

/**
 * The full lockup: mark plus wordmark.
 *
 * `Vistech` sits at weight 700 and `Bot` at 300 — the split reads as one word at
 * a glance and as two ideas on a second look, which is the whole point of the
 * name. Tracking is negative and tight so the wordmark holds together against
 * the mark's hard geometry.
 *
 * @param {"full"|"mark"} variant  full lockup, or the mark on its own
 * @param {"light"|"dark"|"mono"} tone
 */
export default function Wordmark({
  variant = "full",
  tone = "light",
  size = 30,
  to = "/",
  animated = false,
  className = "",
}) {
  const content = (
    <>
      <BrandMark size={size} tone={tone} animated={animated} />
      {variant === "full" && (
        <span className="wordmarkText">
          <b>Vistech</b>
          <i>Bot</i>
        </span>
      )}
    </>
  );

  if (!to) {
    return <span className={`wordmark tone-${tone} ${className}`.trim()}>{content}</span>;
  }

  return (
    <Link to={to} className={`wordmark tone-${tone} ${className}`.trim()} aria-label="VistechBot, home">
      {content}
    </Link>
  );
}
