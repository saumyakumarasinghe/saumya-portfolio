"use client";

import { useLayoutEffect, type MouseEvent } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, isTheme, type Theme } from "@/lib/theme";
import { cssEase, prefersReducedMotion } from "@/lib/motion";

function currentTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : DEFAULT_THEME;
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
}

/**
 * Mist / Night switch.
 *
 * The label is chosen by CSS (`dark:` follows <html data-theme>), so it is
 * right on the very first paint with no hydration mismatch. Where the View
 * Transitions API exists, the new theme spreads from the button as a
 * growing circle; otherwise, or with reduced motion, it swaps instantly.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // React clears attributes on <html> when Strict Mode remounts in
  // development; re-apply the stored choice before paint. No-op in production.
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (isTheme(stored) && document.documentElement.dataset.theme !== stored) {
        document.documentElement.dataset.theme = stored;
      }
    } catch {
      // Ignore unavailable storage.
    }
  }, []);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Theme = currentTheme() === "night" ? "mist" : "night";

    if (!document.startViewTransition || prefersReducedMotion()) {
      applyTheme(next);
      return;
    }

    // Keyboard activation has no pointer position: grow from the button's centre.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 900, easing: cssEase.draw, pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {
        // A skipped transition still applies the theme.
      });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`eyebrow inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong px-4 text-ink transition-colors duration-200 ease-respond hover:bg-surface ${className}`}
    >
      <span aria-hidden="true" className="size-2.5 rounded-full bg-accent ring-1 ring-line-strong" />
      <span className="sr-only">Switch to </span>
      <span className="dark:hidden">Night</span>
      <span className="hidden dark:inline">Mist</span>
    </button>
  );
}
