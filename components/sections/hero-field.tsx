"use client";

import { useRef } from "react";
import { ridgeContours, valleyContours } from "@/lib/art";
import { useGsap } from "@/lib/use-gsap";

/**
 * The hero's topographic map. The contour lines breathe on their own (CSS);
 * the pointer acts as wind, pushing the ridge one way and the valley the
 * other, and scrolling lifts the ridge away like mist burning off.
 *
 * Each layer is its own <svg> inside its own <div>: the breathing runs on the
 * <svg> and the pointer parallax on the <div>, so both are plain element
 * transforms the compositor can run. Animated on an SVG <g> instead, the whole
 * drawing was repainted every frame and used about a third of the main thread.
 * The transform origins below are each layer's centre in the 1440 x 900 drawing.
 */
export function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ridgeRef = useRef<HTMLDivElement>(null);
  const valleyRef = useRef<HTMLDivElement>(null);

  useGsap(({ gsap }) => {
    const root = rootRef.current;
    const ridge = ridgeRef.current;
    const valley = valleyRef.current;
    if (!root || !ridge || !valley) return;

    const ctx = gsap.context(() => {
      const ridgeX = gsap.quickTo(ridge, "x", { duration: 1.6, ease: "power3.out" });
      const ridgeY = gsap.quickTo(ridge, "y", { duration: 1.6, ease: "power3.out" });
      const valleyX = gsap.quickTo(valley, "x", { duration: 2.2, ease: "power3.out" });
      const valleyY = gsap.quickTo(valley, "y", { duration: 2.2, ease: "power3.out" });

      const section = root.parentElement ?? root;
      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = section.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        ridgeX(nx * -46);
        ridgeY(ny * -26);
        valleyX(nx * 30);
        valleyY(ny * 20);
      };
      section.addEventListener("pointermove", onMove);

      gsap.to(root, {
        yPercent: 18,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      return () => section.removeEventListener("pointermove", onMove);
    }, root);

    return () => ctx.revert();
  });

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 [container-type:size]">
      <div ref={ridgeRef} className="absolute inset-0 will-change-transform">
        <svg viewBox="0 0 1440 900" className="hero-contours animate-breathe origin-[74.26%_29.74%]">
          <g fill="none" className="stroke-diagram" strokeOpacity="0.32" strokeWidth="1.2">
            {ridgeContours.map((d, index) => (
              <path key={index} d={d} />
            ))}
          </g>
        </svg>
      </div>
      <div ref={valleyRef} className="absolute inset-0 will-change-transform">
        <svg
          viewBox="0 0 1440 900"
          className="hero-contours animate-breathe origin-[12.92%_87.23%] [animation-delay:-6s] [animation-duration:22s]"
        >
          <g fill="none" className="stroke-diagram" strokeOpacity="0.26" strokeWidth="1.2">
            {valleyContours.map((d, index) => (
              <path key={index} d={d} />
            ))}
          </g>
        </svg>
      </div>
      {/* Drifting banks of mist */}
      <div className="absolute top-[46%] left-[-12%] h-[300px] w-[86%] animate-drift bg-[radial-gradient(closest-side,var(--canvas),transparent)] opacity-95 blur-[6px]" />
      <div className="absolute top-[8%] right-[-18%] h-[240px] w-[70%] animate-drift bg-[radial-gradient(closest-side,var(--canvas),transparent)] opacity-85 blur-[8px] [animation-delay:-9s] [animation-direction:alternate-reverse] [animation-duration:34s]" />
    </div>
  );
}
