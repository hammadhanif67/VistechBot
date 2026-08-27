import { Monitor, Moon, Sun } from "lucide-react";
import useTheme, { THEMES } from "../../hooks/useTheme";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

/**
 * Theme control.
 *
 * A three-way segmented control rather than a cycling button: with three states
 * a single toggle can only say what it will do next, never what is currently
 * on, and "system" is invisible in that pattern — you cannot tell a system-dark
 * page from a chosen-dark one.
 *
 * Built as a radiogroup, so the whole control is one tab stop and the arrow
 * keys move between options. That is the native behaviour for a set of mutually
 * exclusive choices, and it keeps the navbar's tab order to three stops rather
 * than five.
 *
 * Each option is icon-only, so each carries its own accessible name.
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();

  const onKeyDown = (event) => {
    const index = THEMES.indexOf(theme);
    if (index < 0) return;

    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % THEMES.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + THEMES.length) % THEMES.length;
    if (next === null) return;

    event.preventDefault();
    setTheme(THEMES[next]);
  };

  return (
    <div
      className={`themeToggle ${className}`.trim()}
      role="radiogroup"
      aria-label="Colour theme"
      onKeyDown={onKeyDown}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const checked = theme === value;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={checked}
            /* Only the selected option is in the tab order; the arrow keys
               reach the others, which is how a radio group is meant to work. */
            tabIndex={checked ? 0 : -1}
            className={checked ? "themeToggle__option isActive" : "themeToggle__option"}
            onClick={() => setTheme(value)}
          >
            <Icon size={16} aria-hidden="true" />
            <span className="visuallyHidden">{label} theme</span>
          </button>
        );
      })}
    </div>
  );
}
