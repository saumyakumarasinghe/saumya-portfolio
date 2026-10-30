import localFont from "next/font/local";

/**
 * Field Notes type system — three self-hosted families (SIL OFL 1.1).
 *
 * The files live next to this module and are served from our own domain,
 * so builds never depend on a font CDN and no request leaves the site.
 * Each family exposes a CSS variable that `globals.css` maps onto Tailwind's
 * `font-display`, `font-sans` and `font-mono` utilities.
 */

/** Display — Instrument Serif. Headlines, field-note titles, readouts. */
export const instrumentSerif = localFont({
  src: [
    { path: "./instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * Body & UI — Instrument Sans, variable weight (400–700) and width (75–100%).
 * Upright only: every italic on the site is set in the display serif.
 */
export const instrumentSans = localFont({
  src: [{ path: "./instrument-sans-latin-standard-normal.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-instrument-sans",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

/** Field labels & annotations — DM Mono. Used sparingly, always small, always regular weight. */
export const dmMono = localFont({
  src: [{ path: "./dm-mono-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-dm-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

/** All font variables, ready for the <html> className. */
export const fontVariables = [instrumentSerif.variable, instrumentSans.variable, dmMono.variable].join(" ");
