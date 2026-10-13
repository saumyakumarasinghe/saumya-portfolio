"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Drop } from "@/components/ui/icons";
import { paddySprouts } from "@/lib/art";
import { prefersReducedMotion } from "@/lib/motion";

type Mode = "tank" | "none";

/* Simulation constants, in "requests" and seconds. Illustrative only. */
const DRAIN_RATE = 16; // what the fields (workers) can take per second
const CAPACITY = 160; // how much the tank (queue) can hold
const STORM_SECONDS = 4.2;
const STEP = 1 / 60;

/** Incoming rain per second at time t into the storm: a burst with gusts. */
function rainfall(t: number) {
  if (t > STORM_SECONDS) return 0;
  const envelope = Math.sin((Math.PI * t) / STORM_SECONDS);
  const gusts = 0.75 + 0.25 * Math.sin(t * 9.1) * Math.sin(t * 3.3);
  return 70 * envelope * gusts;
}

type Stats = { caught: number; lost: number; peak: number; wait: number };
const emptyStats: Stats = { caught: 0, lost: 0, peak: 0, wait: 0 };

const rainDrops = Array.from({ length: 28 }, (_, i) => ({
  x: 152 + i * 13,
  y: 96 + ((i * 16) % 32),
  delay: -((i * 0.37) % 1.1),
}));

/**
 * FIG. 02 — a monsoon tank as a message queue.
 *
 * Press "Bring the monsoon" to send a burst of requests. With a tank, the
 * burst is held and released to the fields at the rate they can take; without
 * one, everything beyond that rate runs off and is lost. The numbers are
 * computed live from the same model that draws the water.
 */
export function MonsoonTank() {
  const [mode, setMode] = useState<Mode>("tank");
  const [raining, setRaining] = useState(false);
  const [stats, setStats] = useState<Stats>(emptyStats);

  const waterRef = useRef<SVGRectElement>(null);
  const runoffRef = useRef<SVGPathElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const sim = useRef({ t: 0, level: 0, ...emptyStats, last: 0 });
  const autoplayed = useRef(false);

  const paint = useCallback((level: number, losing: boolean) => {
    const scale = Math.max(0.02, Math.min(1, level / CAPACITY));
    waterRef.current?.setAttribute("transform", `translate(0 ${380 - 180 * scale}) scale(1 ${scale})`);
    if (runoffRef.current) runoffRef.current.style.opacity = losing ? "1" : "0";
  }, []);

  const stop = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  }, []);

  /** Advance the model by one step. Returns whether there is still work. */
  const step = useCallback((withTank: boolean) => {
    const s = sim.current;
    const inflow = rainfall(s.t) * STEP;
    const capacity = withTank ? CAPACITY : 0;
    s.caught += inflow;
    s.level += inflow;
    const drained = Math.min(s.level, DRAIN_RATE * STEP);
    s.level -= drained;
    let losing = false;
    if (s.level > capacity) {
      s.lost += s.level - capacity;
      s.caught -= s.level - capacity;
      s.level = capacity;
      losing = inflow > 0;
    }
    s.peak = Math.max(s.peak, s.level);
    s.wait = Math.max(s.wait, s.level / DRAIN_RATE);
    s.t += STEP;
    return { losing, busy: s.t < STORM_SECONDS || s.level > 0.01 };
  }, []);

  const run = useCallback(
    (withTank: boolean) => {
      stop();
      sim.current = { t: 0, level: 0, ...emptyStats, last: 0 };
      setRaining(true);

      if (prefersReducedMotion()) {
        // Same model, no animation: jump straight to the outcome.
        let state = { losing: false, busy: true };
        let peakLosing = false;
        while (state.busy) {
          state = step(withTank);
          peakLosing ||= state.losing;
        }
        const s = sim.current;
        paint(withTank ? s.peak : 0, peakLosing && !withTank);
        setStats({ caught: s.caught, lost: s.lost, peak: s.peak, wait: s.wait });
        setRaining(false);
        return;
      }

      let accumulator = 0;
      let previous = performance.now();
      let lastPublish = 0;
      const tick = (now: number) => {
        accumulator += Math.min(0.1, (now - previous) / 1000);
        previous = now;
        let state = { losing: false, busy: true };
        while (accumulator >= STEP) {
          state = step(withTank);
          accumulator -= STEP;
        }
        const s = sim.current;
        paint(s.level, state.losing);
        if (now - lastPublish > 90 || !state.busy) {
          setStats({ caught: s.caught, lost: s.lost, peak: s.peak, wait: s.wait });
          lastPublish = now;
        }
        if (s.t > STORM_SECONDS) setRaining(false);
        frame.current = state.busy ? requestAnimationFrame(tick) : null;
      };
      frame.current = requestAnimationFrame(tick);
    },
    [paint, step, stop],
  );

  // Let the first storm roll in on its own when the figure comes into view.
  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !autoplayed.current) {
          autoplayed.current = true;
          run(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(figure);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [run, stop]);

  function choose(next: Mode) {
    setMode(next);
    run(next === "tank");
  }

  const readouts = [
    { label: "Rain caught", value: Math.round(stats.caught).toString() },
    { label: "Lost to run-off", value: Math.round(stats.lost).toString(), alert: stats.lost > 0.5 },
    { label: "Peak level", value: Math.round(stats.peak).toString() },
    { label: "Longest wait", value: `${stats.wait.toFixed(1)} s` },
  ];

  return (
    <figure ref={figureRef} className="mt-12 overflow-hidden rounded-plate border border-storm-line bg-[#1a3135] md:mt-[4.5rem]">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-b border-storm-line px-5 py-4">
        <span className="eyebrow text-storm-mist">Fig. 02 · Live simulation</span>
        <div className="flex flex-wrap items-center gap-2.5">
          <div role="group" aria-label="Tank" className="flex rounded-full border border-storm-foam p-[3px]">
            {(
              [
                ["none", "Without a tank"],
                ["tank", "With a tank"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => choose(value)}
                className="min-h-[2.4rem] rounded-full px-4 text-[0.92rem] text-storm-foam transition-colors duration-200 aria-pressed:bg-storm-foam aria-pressed:font-medium aria-pressed:text-storm"
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => run(mode === "tank")}
            disabled={raining}
            className="inline-flex min-h-[2.9rem] items-center gap-2.5 rounded-full bg-accent px-5 text-[0.95rem] font-semibold text-on-accent transition-[opacity,transform] duration-200 active:scale-[0.97] disabled:opacity-60"
          >
            <Drop className="text-on-accent" />
            {raining ? "Raining…" : "Bring the monsoon"}
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 1200 440"
        role="img"
        aria-label="Animated scene: monsoon rain falls into a tank; a sluice releases water steadily to terraced paddy fields"
        className="block h-auto w-full"
      >
        <defs>
          <clipPath id="tank-clip">
            <path d="M120 200 L560 200 L520 380 L160 380 Z" />
          </clipPath>
        </defs>
        <g className="fill-[#2D4C51]">
          <ellipse cx="230" cy="70" rx="130" ry="34" />
          <ellipse cx="320" cy="50" rx="90" ry="34" />
          <ellipse cx="430" cy="74" rx="120" ry="30" />
        </g>
        <g
          className="stroke-rain transition-opacity duration-700"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ opacity: raining ? 1 : 0 }}
        >
          {rainDrops.map((drop, index) => (
            <line
              key={index}
              x1={drop.x}
              y1={drop.y}
              x2={drop.x - 4}
              y2={drop.y + 16}
              className="animate-rain"
              style={{ animationDelay: `${drop.delay}s` }}
            />
          ))}
        </g>
        <g clipPath="url(#tank-clip)" style={{ opacity: mode === "tank" ? 1 : 0.25 }}>
          <rect ref={waterRef} x="120" y="0" width="440" height="180" className="fill-monsoon-glow" fillOpacity="0.9" transform="translate(0 376) scale(1 0.02)" />
        </g>
        <path d="M100 197 H 580" className="stroke-fern-glow" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M120 200 L160 380 L520 380 L560 200"
          fill="none"
          className="stroke-storm-foam transition-opacity duration-500"
          strokeWidth="2"
          strokeDasharray={mode === "tank" ? undefined : "6 8"}
          style={{ opacity: mode === "tank" ? 1 : 0.4 }}
        />
        <g className="stroke-storm-foam" strokeWidth="1">
          <line x1="128" y1="236" x2="142" y2="236" />
          <line x1="136" y1="272" x2="150" y2="272" />
          <line x1="144" y1="308" x2="158" y2="308" />
          <line x1="152" y1="344" x2="166" y2="344" />
        </g>
        {/* Run-off: what the fields can't take is lost over the edge */}
        <path
          ref={runoffRef}
          d="M120 198 C 90 210 70 260 60 330 C 54 372 40 400 20 430"
          fill="none"
          className="animate-flow stroke-laterite-glow transition-opacity duration-300"
          strokeWidth="3"
          strokeDasharray="10 12"
          style={{ opacity: 0 }}
        />
        <rect x="524" y="334" width="18" height="46" className="fill-storm-foam" />
        <path
          d="M542 360 H 680 V 330 H 820 V 352 H 960 V 374 H 1100 V 396 H 1180"
          fill="none"
          className="animate-flow stroke-monsoon-glow [animation-duration:1.4s]"
          strokeWidth="3"
          strokeDasharray="10 12"
        />
        <rect x="680" y="332" width="140" height="22" className="fill-fern-glow" fillOpacity="0.9" />
        <rect x="820" y="354" width="140" height="22" className="fill-fern-glow" fillOpacity="0.7" />
        <rect x="960" y="376" width="140" height="22" className="fill-fern-glow" fillOpacity="0.5" />
        <rect x="1100" y="398" width="80" height="22" className="fill-fern-glow" fillOpacity="0.3" />
        <path d="M680 354 H820 V376 H960 V398 H1100 V420 H1180" fill="none" className="stroke-storm-foam" strokeWidth="1.5" />
        <g className="stroke-accent" strokeWidth="1.4" strokeLinecap="round">
          {paddySprouts.map((d, index) => (
            <path key={index} d={d} />
          ))}
          <path d="M972 374 l2 -7 M984 374 l-1 -8 M996 374 l2 -6 M1008 374 l-2 -7 M1020 374 l1 -8" />
        </g>
        <g fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1" className="fill-storm-mist">
          <text x="40" y="36">MONSOON · REQUESTS</text>
          <text x="168" y="412">TANK · QUEUE (SQS)</text>
          <text x="546" y="318">SLUICE · WORKERS (LAMBDA)</text>
          <text x="760" y="292">FIELDS · PROCESSED</text>
          {mode === "none" && (
            <text x="20" y="160" className="fill-laterite-glow">
              RUN-OFF · DROPPED
            </text>
          )}
        </g>
      </svg>

      <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(12.5rem,100%),1fr))] border-t border-storm-line">
        {readouts.map((item) => (
          <div key={item.label} className="border-storm-line px-5 py-4 [&:not(:last-child)]:border-r">
            <dt className="eyebrow text-[0.69rem] text-storm-mist">{item.label}</dt>
            <dd className={`font-display text-[2.25rem] leading-[1.1] tabular-nums ${item.alert ? "text-laterite-glow" : ""}`}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="sr-only" aria-live="polite">
        {raining || stats.caught === 0
          ? ""
          : `Storm passed ${mode === "tank" ? "with" : "without"} a tank: ${Math.round(stats.caught)} caught, ${Math.round(stats.lost)} lost to run-off.`}
      </p>
      <figcaption className="border-t border-storm-line px-5 py-4 text-small text-storm-mist">
        Without a tank, rain beyond what the fields can take runs off and is lost — those are dropped requests. With one,
        the burst becomes a level that drains at a steady rate.{" "}
        <span className="font-mono text-label">Illustrative simulation, not production data.</span>
      </figcaption>
    </figure>
  );
}
