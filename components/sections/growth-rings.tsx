"use client";

import { useRef, useState } from "react";
import { ringBands, ringLines } from "@/lib/art";
import { roles } from "@/lib/content";
import { useGsap } from "@/lib/use-gsap";

/** Role index (0 = current, outermost) → ring group, callout anchor and label position. */
const callouts = [
  { group: "engineer", dot: [490, 140], path: "M490 140 L600 70 H620", y: 66 },
  { group: "associate", dot: [400, 236], path: "M400 236 L600 236 H620", y: 232 },
  { group: "intern", dot: [284, 294], path: "M284 294 L600 420 H620", y: 416 },
] as const;

/**
 * Career as a tree cross-section. Ring widths follow time in each role; the
 * rings draw outward from the heartwood as the figure scrolls through view.
 * Pointing at a role (or its rings) brings it forward.
 */
export function GrowthRings() {
  const ref = useRef<SVGSVGElement>(null);
  const [focus, setFocus] = useState<number | null>(null);

  useGsap(({ gsap }) => {
    const svg = ref.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: svg, start: "top 80%", end: "center 45%", scrub: 0.8 },
      });
      timeline
        .from(svg.querySelectorAll(".r-band"), { scale: 0.2, opacity: 0, svgOrigin: "270 270", stagger: -0.12, duration: 0.5 }, 0)
        .from(svg.querySelectorAll(".r-intern"), { strokeDashoffset: 1, stagger: 0.05, duration: 0.3 }, 0.1)
        .from(svg.querySelectorAll(".r-associate"), { strokeDashoffset: 1, stagger: 0.05, duration: 0.3 }, 0.3)
        .from(svg.querySelectorAll(".r-engineer"), { strokeDashoffset: 1, stagger: 0.05, duration: 0.3 }, 0.5)
        .from(svg.querySelectorAll(".r-callout"), { opacity: 0, x: -12, stagger: 0.08, duration: 0.2 }, 0.62);
    }, svg);

    return () => ctx.revert();
  });

  const groups = [ringLines.intern, ringLines.associate, ringLines.engineer] as const;
  const groupRole = [2, 1, 0]; // ringLines order (core first) → roles index

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 540"
      role="img"
      aria-label="Tree cross-section with three growth rings: Software Engineer Intern, June 2022 to June 2023, at the core; Associate Software Engineer, July 2023 to July 2025; Software Engineer, July 2025 to present, on the outside"
      className="block h-auto w-full"
      onPointerLeave={() => setFocus(null)}
    >
      <path d={ringBands[0]} className="r-band fill-ring-outer stroke-wood" strokeWidth="7" />
      <path d={ringBands[1]} className="r-band fill-ring-mid" />
      <path d={ringBands[2]} className="r-band fill-ring-core" />
      <g fill="none" className="stroke-wood" strokeWidth="1.1">
        {groups.map((lines, groupIndex) => {
          const role = groupRole[groupIndex];
          const name = (["intern", "associate", "engineer"] as const)[groupIndex];
          const dim = focus !== null && focus !== role;
          const lit = focus === role;
          return (
            <g
              key={name}
              onPointerEnter={() => setFocus(role)}
              className="transition-[stroke-opacity,stroke-width] duration-300"
              strokeOpacity={dim ? 0.15 : lit ? 0.95 : 0.45}
              strokeWidth={lit ? 2 : 1.1}
            >
              {lines.map((d, index) => (
                <path key={index} d={d} pathLength={1} strokeDasharray="1 1" className={`r-${name}`} />
              ))}
            </g>
          );
        })}
      </g>
      <path d="M270 270 L414 116" className="stroke-wood" strokeOpacity="0.45" strokeWidth="1.4" />

      {callouts.map((callout, index) => {
        const role = roles[index];
        const dim = focus !== null && focus !== index;
        return (
          <g
            key={callout.group}
            className="r-callout cursor-default transition-opacity duration-300"
            style={{ opacity: dim ? 0.35 : 1 }}
            onPointerEnter={() => setFocus(index)}
          >
            <path d={callout.path} fill="none" className="stroke-ink" strokeWidth="1.2" />
            <circle
              cx={callout.dot[0]}
              cy={callout.dot[1]}
              r={index === 0 ? 5 : 4}
              className={index === 0 ? "fill-accent stroke-ink" : "fill-ink"}
              strokeWidth="1.5"
            />
            <rect x="620" y={callout.y - 24} width="270" height="50" fill="transparent" />
            <text x="630" y={callout.y} fontFamily="var(--font-sans)" fontSize="19" fontWeight="600" className="fill-ink">
              {role.title}
            </text>
            <text x="630" y={callout.y + 22} fontFamily="var(--font-mono)" fontSize="12.5" letterSpacing="0.5" className="fill-ink-muted">
              {role.dates.toUpperCase()}
              {"note" in role && role.note ? ` · ${role.note.toUpperCase()}` : ""}
            </text>
          </g>
        );
      })}
      <g transform="translate(262 4)">
        <path
          d="M8 18V6M8 9C8 4 4 1 0 1C0 6 4 9 8 9ZM8 7C8 2 12 -1 16 -1C16 4 12 7 8 7Z"
          className="fill-accent stroke-ink"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}
