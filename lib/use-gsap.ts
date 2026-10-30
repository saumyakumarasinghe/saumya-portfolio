import { useEffect, useRef } from "react";
import { loadGsap, type Gsap, type ScrollTriggerPlugin } from "@/lib/gsap";
import { afterLoad, prefersReducedMotion } from "@/lib/motion";

export type GsapLib = { gsap: Gsap; ScrollTrigger: ScrollTriggerPlugin };

/**
 * Runs `setup` once, after the page has loaded and gone idle, with GSAP and
 * ScrollTrigger loaded on demand. Whatever `setup` returns is its cleanup.
 *
 * `enabled` is checked first, so a visitor who asks for reduced motion (or has
 * no pointer to follow) never downloads GSAP for a component that would only
 * switch itself off again.
 */
export function useGsap(setup: (lib: GsapLib) => void | (() => void), enabled: () => boolean = () => !prefersReducedMotion()) {
  const latestSetup = useRef(setup);
  const latestEnabled = useRef(enabled);
  useEffect(() => {
    latestSetup.current = setup;
    latestEnabled.current = enabled;
  });

  useEffect(() => {
    if (!latestEnabled.current()) return;
    let disposed = false;
    let cleanup: void | (() => void);
    const cancel = afterLoad(() => {
      loadGsap().then((lib) => {
        if (!disposed) cleanup = latestSetup.current(lib);
      });
    });
    return () => {
      disposed = true;
      cancel();
      if (typeof cleanup === "function") cleanup();
    };
  }, []);
}
