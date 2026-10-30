"use client";

import type { ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { loadedScrollTrigger } from "@/lib/gsap";

/** Keeps ScrollTrigger positions in step with Lenis' smoothed scroll, once GSAP has been loaded. */
function ScrollTriggerSync() {
  useLenis(() => loadedScrollTrigger()?.update());
  return null;
}

/**
 * Site-wide smooth scrolling.
 *
 * Lenis runs on its own frame loop. GSAP is not in the critical path (see
 * lib/gsap.ts), so it can no longer drive Lenis from its ticker; instead each
 * Lenis scroll event nudges ScrollTrigger as soon as it exists.
 * Lenis honours `prefers-reduced-motion` on its own: smoothing is turned off
 * and scrolling follows the input device 1:1.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
