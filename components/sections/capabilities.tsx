"use client";

import { useRef, useState } from "react";
import { capabilities, type PlantPart } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";
import { useGsap } from "@/lib/use-gsap";

const roots = [
  "M262 434 C258 482 250 532 238 588 C228 632 208 670 184 706",
  "M260 472 C292 502 322 542 350 600 C364 628 388 658 418 690",
  "M254 522 C214 540 168 562 118 602",
  "M244 592 C264 634 272 682 266 732",
  "M300 550 C334 568 382 576 444 570",
  "M206 654 C182 666 160 670 132 666",
  "M348 598 C356 632 352 666 336 702",
];

const branches = [
  "M256 320 C220 302 190 282 150 248",
  "M268 302 C306 284 340 264 384 224",
  "M256 238 C230 212 214 190 196 152",
  "M266 222 C292 198 312 170 330 128",
  "M261 182 C259 152 263 122 261 94",
];

/** [x, y, rotation, tone] — tone 0 fern, 1 moss, 2 accent */
const leaves = [
  [150, 248, -150, 0],
  [170, 262, -125, 1],
  [188, 276, -165, 2],
  [384, 224, -35, 0],
  [362, 240, -70, 2],
  [342, 254, -15, 1],
  [196, 152, -115, 0],
  [208, 174, -150, 1],
  [330, 128, -60, 2],
  [318, 152, -25, 0],
  [261, 94, -90, 0],
  [252, 112, -130, 1],
  [270, 112, -50, 2],
  [240, 300, -160, 1],
  [282, 284, -20, 0],
] as const;

const grass = [
  ["M58 432 q2 -14 -4 -24", 4, 0],
  ["M64 432 q0 -18 6 -28", 4, -1],
  ["M120 430 q-2 -12 -8 -20", 4.6, -2],
  ["M126 430 q2 -16 8 -24", 4.6, -0.5],
  ["M392 426 q-2 -14 -6 -22", 4.2, -1.4],
  ["M398 426 q2 -18 8 -26", 4.2, -0.2],
  ["M462 430 q0 -14 -6 -20", 5, -2.4],
] as const;

const markers: Record<PlantPart, [number, number]> = {
  roots: [150, 616],
  trunk: [222, 404],
  sap: [300, 412],
  branches: [410, 262],
  canopy: [336, 74],
  rings: [342, 364],
};

const leafTone = ["fill-diagram", "fill-moss", "fill-accent"] as const;

/**
 * "From root to canopy": six capabilities drawn as one plant. Scrolling the
 * list grows the plant — roots, then trunk, branches and leaves — and the
 * capability in view lights up its part of the drawing.
 */
export function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(0);

  // Not gated on reduced motion: ScrollTrigger also drives which capability is lit.
  useGsap(
    ({ gsap, ScrollTrigger }) => {
      const section = sectionRef.current;
      const svg = svgRef.current;
      if (!section || !svg) return;

      const ctx = gsap.context(() => {
        section.querySelectorAll<HTMLElement>("[data-capability]").forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setActive(index),
          });
        });

        if (prefersReducedMotion()) return;

        const desktop = window.matchMedia("(min-width: 64rem)").matches;
        const growth = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: desktop
            ? { trigger: section.querySelector("ol"), start: "top 70%", end: "bottom 75%", scrub: 0.8 }
            : { trigger: svg, start: "top 85%", end: "bottom 60%", scrub: 0.8 },
        });
        growth
          .from(svg.querySelectorAll(".p-root"), { strokeDashoffset: 1, stagger: 0.04, duration: 0.3 }, 0)
          .from(svg.querySelector(".p-trunk-reveal"), { attr: { y: 434, height: 0 }, duration: 0.3 }, 0.18)
          .from(svg.querySelectorAll(".p-branch"), { strokeDashoffset: 1, stagger: 0.04, duration: 0.25 }, 0.42)
          .from(
            svg.querySelectorAll(".p-leaf"),
            { scale: 0, transformOrigin: "0% 50%", stagger: 0.015, duration: 0.18, ease: "back.out(2)" },
            0.62,
          )
          .from(svg.querySelector(".p-knot"), { scale: 0, transformOrigin: "50% 50%", duration: 0.1 }, 0.8);
      }, section);

      return () => ctx.revert();
    },
    () => true,
  );

  const activePart = capabilities[active]?.part;

  return (
    <div ref={sectionRef} className="flex flex-wrap items-start gap-x-[clamp(2.5rem,6vw,7rem)] gap-y-12">
      {/* Width follows viewport height (viewBox is 520×760) so the whole plant and caption fit on screen, sticky or not. */}
      <figure className="m-0 max-w-[min(34rem,calc(70svh*0.684))] flex-[1_1_22rem] max-lg:basis-full lg:sticky lg:top-24 lg:max-w-[min(34rem,calc((100svh-10.5rem)*0.684))]">
        <div className="overflow-hidden rounded-plate border border-line bg-surface">
          <svg
            ref={svgRef}
            viewBox="0 0 520 760"
            role="img"
            aria-label="Botanical diagram of the stack as a plant: 1 roots, 2 trunk, 3 sap, 4 branches, 5 canopy, 6 growth rings"
            className="block h-auto w-full"
          >
            <defs>
              <pattern id="soil-grain" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="4" r="1.1" className="fill-wood" fillOpacity="0.35" />
                <circle cx="10" cy="11" r="0.9" className="fill-wood" fillOpacity="0.25" />
              </pattern>
              <clipPath id="trunk-clip">
                <rect className="p-trunk-reveal" x="0" y="80" width="520" height="354" />
              </clipPath>
            </defs>
            <rect x="0" y="432" width="520" height="328" className="fill-ground" />
            <rect x="0" y="432" width="520" height="328" fill="url(#soil-grain)" />
            <path d="M0 434 C120 426 220 440 300 430 C380 422 450 434 520 430" fill="none" className="stroke-ink" strokeWidth="1.5" />
            <g fill="none" className="stroke-diagram" strokeWidth="1.6" strokeLinecap="round">
              {grass.map(([d, dur, delay], index) => (
                <path
                  key={index}
                  d={d}
                  className="animate-sway [transform-box:fill-box] [transform-origin:50%_100%]"
                  style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
                />
              ))}
            </g>
            <g
              fill="none"
              strokeWidth={activePart === "roots" ? 3.2 : 2.2}
              strokeLinecap="round"
              className={`transition-[stroke-width] duration-500 ${activePart === "roots" ? "stroke-emphasis" : "stroke-wood"}`}
            >
              {roots.map((d, index) => (
                <path key={index} d={d} pathLength={1} strokeDasharray="1 1" className="p-root" />
              ))}
            </g>
            <g clipPath="url(#trunk-clip)">
              <path
                d="M252 434 C254 380 248 320 254 260 C258 220 256 196 254 176 L268 176 C272 196 276 220 272 260 C266 320 272 380 270 434 Z"
                className={`stroke-ink transition-[fill] duration-500 ${activePart === "trunk" ? "fill-emphasis" : "fill-trunk"}`}
                strokeWidth="1.5"
              />
              <path
                d="M261 428 C262 380 258 320 263 260 C266 220 264 196 261 184"
                fill="none"
                className="animate-flow stroke-accent"
                strokeWidth={activePart === "sap" ? 5 : 3}
                strokeLinecap="round"
                strokeDasharray="8 14"
              />
            </g>
            <g
              fill="none"
              className={`transition-[stroke] duration-500 ${activePart === "branches" ? "stroke-emphasis" : "stroke-ink"}`}
              strokeWidth={activePart === "branches" ? 3.4 : 2.4}
              strokeLinecap="round"
            >
              {branches.map((d, index) => (
                <path key={index} d={d} pathLength={1} strokeDasharray="1 1" className="p-branch" />
              ))}
            </g>
            <g className="p-knot">
              <path d="M272 372 L302 364" className="stroke-ink" strokeWidth="7" />
              <ellipse cx="306" cy="363" rx="9" ry="12" className="fill-ring-outer stroke-ink" strokeWidth="1.5" />
              <ellipse cx="306" cy="363" rx="5.5" ry="7.5" fill="none" className="stroke-wood" />
              <ellipse cx="306" cy="363" rx="2.5" ry="3.5" fill="none" className="stroke-wood" />
            </g>
            <g
              className={`animate-sway stroke-ink [animation-duration:8s] [transform-box:fill-box] [transform-origin:50%_100%] ${
                activePart === "canopy" ? "[&_path]:stroke-[2.2]" : ""
              }`}
              strokeWidth="1.2"
            >
              {leaves.map(([x, y, rotation, tone], index) => (
                <g key={index} transform={`translate(${x} ${y}) rotate(${rotation})`}>
                  <path d="M0 0C10 -12 24 -12 36 0C24 12 10 12 0 0Z" className={`p-leaf ${leafTone[tone]}`} />
                </g>
              ))}
            </g>
            <g fontFamily="var(--font-mono)" fontSize="13" textAnchor="middle">
              {capabilities.map((item, index) => {
                const [cx, cy] = markers[item.part];
                const on = index === active;
                return (
                  <g key={item.part}>
                    {on && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="15"
                        className="animate-pulse-soft fill-none stroke-emphasis"
                        strokeWidth="6"
                        strokeOpacity="0.4"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="15"
                      className={`stroke-ink transition-[fill] duration-300 ${on ? "fill-accent" : "fill-canvas"}`}
                      strokeWidth="1.5"
                    />
                    <text x={cx} y={cy + 5} className={on ? "fill-on-accent" : "fill-ink"}>
                      {index + 1}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
        <figcaption className="pt-3 font-mono text-label text-ink-muted">
          Fig. 03: The stack, as a plant. Scroll the list and the plant grows with it.
        </figcaption>
      </figure>

      <ol className="m-0 flex-[1.3_1_28rem] list-none border-t border-line-strong p-0">
        {capabilities.map((item, index) => {
          const on = index === active;
          return (
            <li
              key={item.part}
              data-capability
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4.5 gap-y-1 border-b border-line py-7"
            >
              <span
                className={`grid size-8 place-items-center rounded-full border-[1.5px] border-line-strong font-mono text-label transition-colors duration-300 ${
                  on ? "bg-accent text-on-accent" : ""
                }`}
              >
                {index + 1}
              </span>
              <div>
                <p className="eyebrow text-[0.72rem] tracking-[0.08em] text-ink-muted">{item.label}</p>
                <h3 className={`mt-1.5 font-display text-title transition-colors duration-300 ${on ? "text-emphasis italic" : ""}`}>
                  {item.title}
                </h3>
                <p className="mt-2.5 text-lg leading-snug font-medium">{item.problem}</p>
                <p className="mt-1.5 text-ink-muted">{item.offer}</p>
                <p className="mt-2.5 text-small">
                  <span className="font-mono text-[0.69rem] tracking-[0.06em] text-ink-muted">EVIDENCE: </span>
                  {item.evidence}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
