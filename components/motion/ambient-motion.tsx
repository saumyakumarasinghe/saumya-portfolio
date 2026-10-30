"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { afterLoad, prefersReducedMotion } from "@/lib/motion";

/** The decorative loops. Entrance animations (rise, fade) are deliberately not in this list. */
const AMBIENT = [
  ".animate-sway",
  ".animate-drift",
  ".animate-breathe",
  ".animate-firefly",
  ".animate-pulse-soft",
  ".animate-bob",
  ".animate-marquee",
  ".animate-flow",
  ".animate-rain",
].join(",");

/**
 * Starts the ambient loops after the page has loaded, and keeps each one running
 * only while it is near the viewport.
 *
 * Most of them animate SVG groups and strokes, which run on the main thread. Left
 * running from the first frame they cost style recalculation during hydration and
 * the first paint; left running off screen they cost it for the whole visit.
 * Until this runs, globals.css keeps them paused.
 */
export function AmbientMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let observer: IntersectionObserver | undefined;
    const cancel = afterLoad(() => {
      document.documentElement.dataset.motion = "on";
      const io = new IntersectionObserver(
        (entries) => {
          for (const { target, isIntersecting } of entries) {
            (target as HTMLElement | SVGElement).style.animationPlayState = isIntersecting ? "running" : "paused";
          }
        },
        { rootMargin: "120px 0px" },
      );
      document.querySelectorAll(AMBIENT).forEach((element) => io.observe(element));
      observer = io;
    });

    return () => {
      cancel();
      observer?.disconnect();
    };
    // Re-scan on navigation: the layout stays mounted while the page underneath changes.
  }, [pathname]);

  return null;
}
