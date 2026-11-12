"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { afterLoad, prefersReducedMotion } from "@/lib/motion";

/** The pixel-art avatar, drawn at a resolution fine enough to keep the face detail. */
const avatar = { src: "/about/portrait-pixel.webp", width: 1120, height: 1400 };
/** Dissolve blocks are 70 × 70 image pixels, so 16 × 20 of them. */
const block = 70;
const dissolveMs = 300;

let loading: Promise<HTMLImageElement> | undefined;
function loadAvatar() {
  loading ??= new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = avatar.src;
  });
  return loading;
}

/** Every block index once, in random order. */
function shuffledBlocks() {
  const order = Array.from({ length: (avatar.width / block) * (avatar.height / block) }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * The About portrait. Pointing at it (or tapping it on a touch screen) dissolves
 * the photo into a pixel-art avatar, block by block, and two pixel stickers pop
 * in round the frame. Leaving dissolves it back from wherever it got to.
 */
export function PortraitPixel() {
  const [on, setOn] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const order = useRef<number[]>(null);
  const drawn = useRef(0);

  useEffect(() => afterLoad(() => void loadAvatar()), []);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let cancelled = false;

    loadAvatar().then((img) => {
      if (cancelled) return;
      order.current ??= shuffledBlocks();
      const blocks = order.current;
      const target = on ? blocks.length : 0;
      const cols = avatar.width / block;
      let last = performance.now();

      const step = (now: number) => {
        const from = drawn.current;
        const delta = prefersReducedMotion() ? blocks.length : ((now - last) / dissolveMs) * blocks.length;
        last = now;
        const to = on ? Math.min(target, from + delta) : Math.max(target, from - delta);
        for (let i = Math.floor(Math.min(from, to)); i < Math.floor(Math.max(from, to)); i++) {
          const x = (blocks[i] % cols) * block,
            y = Math.floor(blocks[i] / cols) * block;
          if (on) ctx.drawImage(img, x, y, block, block, x, y, block, block);
          else ctx.clearRect(x, y, block, block);
        }
        drawn.current = to;
        if (to !== target) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [on]);

  return (
    <div
      data-on={on}
      className="group relative aspect-[4/5] w-full max-w-[22.5rem]"
      onPointerEnter={(event) => event.pointerType === "mouse" && setOn(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setOn(false)}
      onPointerUp={(event) => event.pointerType !== "mouse" && setOn((value) => !value)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[58%_42%_48%_52%/46%_54%_46%_54%] bg-surface">
        <Image
          src="/about/portrait.webp"
          alt="Saumya at graduation, holding a mortarboard and a University of Westminster degree scroll"
          fill
          sizes="(min-width: 640px) 360px, calc(100vw - 2rem)"
          className="object-cover"
        />
        <canvas ref={canvas} width={avatar.width} height={avatar.height} aria-hidden="true" className="absolute inset-0 size-full" />
      </div>
      <PixelSticker rows={leaf} className="-top-[2%] -left-[2%] w-[24%] -rotate-[10deg] group-data-[on=true]:delay-150 sm:-left-[7%]" />
      <PixelSticker
        rows={codeTag}
        className="right-[-1%] bottom-[14%] w-[30%] rotate-[8deg] group-data-[on=true]:delay-200 sm:right-[-6%]"
      />
    </div>
  );
}

/* ── Stickers ─────────────────────────────────────────────────────────────── */

const ink: Record<string, string> = {
  o: "#ffffff",
  d: "var(--color-pine)",
  f: "var(--color-fern)",
  l: "var(--color-fern-glow)",
  b: "var(--color-tea-bud)",
};

/** A tea leaf: the site's mark, and the hill country's crop. */
const leaf = [
  "..............ooooo",
  "..........ooooodddo",
  "........ooodddddfdo",
  "......ooodddffffddo",
  ".....oodddffffbfdoo",
  ".....oddfffffbffdo.",
  "....oodfffffbfffdo.",
  "....oddffffbflfddo.",
  "...oodffffbfllldoo.",
  "...oddfffbflllddo..",
  "...odfffbflllldoo..",
  "..oodffbfllllddo...",
  "..oddfbfllldddoo...",
  "..odfbffldddooo....",
  "..odbfddddooo......",
  ".ooddddoooo........",
  ".odooooo...........",
  ".ooo...............",
];

const codeTag = [
  ".oooooooooooooooooooo.",
  "ooddddddddddddddddddoo",
  "odddddbdddddbdbddddddo",
  "oddddbddddddbddbdddddo",
  "odddbddddddbddddbddddo",
  "oddbdddddddbdddddbdddo",
  "odddbdddddbdddddbddddo",
  "oddddbddddbddddbdddddo",
  "odddddbddbddddbddddddo",
  "ooddddddddddddddddddoo",
  ".oooooooooooooooooooo.",
];

/** Pixel art from rows of palette keys, one <rect> per horizontal run. */
function PixelSticker({ rows, className }: { rows: string[]; className: string }) {
  const runs: { x: number; y: number; w: number; key: string }[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length;) {
      const key = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === key) end++;
      if (key !== ".") runs.push({ x, y, w: end - x, key });
      x = end;
    }
  });
  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`pointer-events-none absolute h-auto scale-50 opacity-0 transition-[scale,opacity] duration-200 ease-out group-data-[on=true]:scale-100 group-data-[on=true]:opacity-100 group-data-[on=true]:duration-[400ms] group-data-[on=true]:ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${className}`}
    >
      {runs.map(({ x, y, w, key }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={1} fill={ink[key]} />
      ))}
    </svg>
  );
}
