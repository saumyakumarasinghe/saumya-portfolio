"use client";

import { useRef } from "react";
import { ridgeContours, valleyContours } from "@/lib/art";
import { useGsap } from "@/lib/use-gsap";

/**
 * The hero's topographic map. The contour lines breathe on their own (CSS);
 * the pointer acts as wind, pushing the ridge one way and the valley the
 * other, and scrolling lifts the ridge away like mist burning off.
 */
export function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ridgeRef = useRef<SVGGElement>(null);
  const valleyRef = useRef<SVGGElement>(null);

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
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <g ref={ridgeRef}>
          <g
            fill="none"
            className="animate-breathe stroke-diagram [transform-box:fill-box] [transform-origin:center]"
            strokeOpacity="0.32"
            strokeWidth="1.2"
          >
            {ridgeContours.map((d, index) => (
              <path key={index} d={d} />
            ))}
          </g>
        </g>
        <g ref={valleyRef}>
          <g
            fill="none"
            className="animate-breathe stroke-diagram [transform-box:fill-box] [transform-origin:center] [animation-delay:-6s] [animation-duration:22s]"
            strokeOpacity="0.26"
            strokeWidth="1.2"
          >
            {valleyContours.map((d, index) => (
              <path key={index} d={d} />
            ))}
          </g>
        </g>
      </svg>
      {/* Drifting banks of mist */}
      <div className="absolute top-[46%] left-[-12%] h-[300px] w-[86%] animate-drift bg-[radial-gradient(closest-side,var(--canvas),transparent)] opacity-95 blur-[6px]" />
      <div className="absolute top-[8%] right-[-18%] h-[240px] w-[70%] animate-drift bg-[radial-gradient(closest-side,var(--canvas),transparent)] opacity-85 blur-[8px] [animation-delay:-9s] [animation-direction:alternate-reverse] [animation-duration:34s]" />
    </div>
  );
}
