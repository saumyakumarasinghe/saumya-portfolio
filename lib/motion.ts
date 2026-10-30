/**
 * Motion tokens for JavaScript (GSAP). They mirror the CSS custom properties
 * in app/globals.css so CSS transitions and timelines feel like one system.
 */
export const ease = {
  /** Reveals and headline lines settling into place. */
  settle: "expo.out",
  /** Strokes drawing, theme wipe. */
  draw: "power3.inOut",
  /** Hover, press, toggles. */
  respond: "power2.out",
} as const;

/** Seconds, as GSAP expects. */
export const duration = {
  respond: 0.2,
  settle: 0.9,
  draw: 1.2,
} as const;

/** Delay between staggered items, in seconds. */
export const stagger = 0.06;

/** CSS easing strings for the View Transitions / Web Animations API. */
export const cssEase = {
  settle: "cubic-bezier(0.16, 1, 0.3, 1)",
  draw: "cubic-bezier(0.65, 0, 0.35, 1)",
  respond: "cubic-bezier(0.2, 0, 0, 1)",
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs `callback` once the main thread is idle. Safari has no requestIdleCallback,
 * so it falls back to a short timeout. Returns a function that cancels it.
 */
export function whenIdle(callback: () => void, timeout = 1500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(callback, 200);
  return () => window.clearTimeout(id);
}

/**
 * Runs `callback` after the page has loaded and gone quiet, so decoration never
 * competes with hydration or the first paint. Returns a function that cancels it.
 */
export function afterLoad(callback: () => void): () => void {
  let cancelled = false;
  let cancelIdle = () => {};
  const run = () => {
    if (!cancelled) cancelIdle = whenIdle(callback);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    cancelled = true;
    cancelIdle();
    window.removeEventListener("load", run);
  };
}
