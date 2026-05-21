/**
 * Reusable section header with optional pill badge, heading, and description.
 *
 * @param {string}  [badge]         - Pill label text
 * @param {React.ElementType} [badgeIcon] - Icon for pill (default: Zap)
 * @param {React.ReactNode} heading  - Main heading (can include <span> for gradient)
 * @param {string}  [description]   - Subtitle paragraph
 * @param {"left"|"center"} [align] - Text alignment (default: "left")
 */
import Pill from "./Pill";

export default function SectionHeader({ badge, badgeIcon, heading, description, align = "left" }) {
  return (
    <div className={`sectionHeader${align === "center" ? " centerHeader" : ""}`}>
      {badge && <Pill icon={badgeIcon}>{badge}</Pill>}
      {heading && <h2>{heading}</h2>}
      {description && <p>{description}</p>}
    </div>
  );
}
