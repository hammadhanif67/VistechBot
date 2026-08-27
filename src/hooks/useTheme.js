import { useCallback, useEffect, useSyncExternalStore } from "react";

const KEY = "vistechbot-theme";

/** The three things a visitor can choose. `system` follows the OS. */
export const THEMES = ["light", "dark", "system"];

/*
   One store outside React, rather than `useState` inside the hook.

   The control is rendered twice — once in the navbar, once inside the mobile
   menu — and with per-instance state those two copies would hold separate
   opinions about the current theme the moment either was used. A module-level
   value with `useSyncExternalStore` means every caller reads the same thing and
   re-renders together, and a `storage` event keeps other tabs in step too.
*/
let preference = readStored();
const listeners = new Set();

function readStored() {
  try {
    const stored = localStorage.getItem(KEY);
    return THEMES.includes(stored) ? stored : "dark";
  } catch {
    // Private mode, or storage blocked. The site works; the choice just does
    // not survive a reload.
    return "dark";
  }
}

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function resolve(pref) {
  return pref === "system" ? systemTheme() : pref;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  // Another tab changed the preference.
  const onStorage = (event) => {
    if (event.key !== KEY) return;
    preference = readStored();
    apply(resolve(preference));
    notify();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Snapshots must be stable across calls, so this returns the string itself. */
const getPreference = () => preference;
const getServerPreference = () => "dark";

/**
 * Put a resolved theme on the document.
 *
 * `data-theme` only ever holds `light` or `dark`, never `system`, so the
 * stylesheet needs a single light block and no `prefers-color-scheme` branch.
 */
function apply(resolved) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === resolved) return;

  /* No transition. A theme switch is a state change, not a journey — the
     palette flips on the same frame as the click. An earlier version eased it
     over 200ms and then 110ms; both read as the control hesitating before
     obeying. Nothing here waits on a timer. */
  root.setAttribute("data-theme", resolved);

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", resolved === "light" ? "#eef1f7" : "#05070f");
}

/**
 * Theme preference, and the palette that follows from it.
 *
 * The inline script in index.html has already resolved and applied a theme
 * before React mounts, so this hook starts in agreement with what is on screen
 * rather than causing a second paint.
 *
 * @returns {{theme: string, resolved: string, setTheme: (next: string) => void}}
 */
export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getPreference, getServerPreference);

  // Follow the OS while the preference is `system`, so changing it there takes
  // effect without a reload.
  useEffect(() => {
    if (theme !== "system") return undefined;

    const query = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => {
      apply(systemTheme());
      notify();
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (!THEMES.includes(next) || next === preference) return;

    preference = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Nothing to do — the theme still applies for this session.
    }

    apply(resolve(next));
    notify();
  }, []);

  return { theme, resolved: resolve(theme), setTheme };
}
