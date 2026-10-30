export type Gsap = (typeof import("gsap"))["gsap"];
export type ScrollTriggerPlugin = (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];

let loading: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerPlugin }> | undefined;
let loaded: ScrollTriggerPlugin | undefined;

/** ScrollTrigger once something has loaded it, otherwise undefined. Never triggers a download. */
export const loadedScrollTrigger = () => loaded;

/**
 * GSAP and ScrollTrigger as one lazy, shared chunk. Every animated component
 * calls this from an effect, after load, so the library (about 45 KB gzipped)
 * stays out of the critical path and is never fetched for visitors who ask for
 * reduced motion and have nothing that needs it.
 */
export function loadGsap() {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([core, plugin]) => {
    core.gsap.registerPlugin(plugin.ScrollTrigger);
    loaded = plugin.ScrollTrigger;
    return { gsap: core.gsap, ScrollTrigger: plugin.ScrollTrigger };
  });
  return loading;
}
