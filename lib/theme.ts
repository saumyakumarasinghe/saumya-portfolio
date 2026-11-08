/**
 * Theme model: "mist" (light, default) and "night" (dark).
 *
 * The chosen theme lives on <html data-theme>. A first visit always opens in
 * mist, whatever the system setting; once a visitor picks a theme it is
 * remembered in localStorage.
 */
export const THEMES = ["mist", "night"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "mist";
export const THEME_STORAGE_KEY = "sk-theme";

export function isTheme(value: unknown): value is Theme {
  return value === "mist" || value === "night";
}

/**
 * Runs in <head> before first paint, so the page never flashes the wrong
 * theme. Kept tiny and dependency-free; it is inlined as a string.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="mist"&&t!=="night"){t="${DEFAULT_THEME}"}d.setAttribute("data-theme",t)}catch(e){}})()`;
