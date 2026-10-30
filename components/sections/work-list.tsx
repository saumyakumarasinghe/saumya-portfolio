"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Plus, Seedling } from "@/components/ui/icons";
import { prefersReducedMotion } from "@/lib/motion";
import type { Work } from "@/lib/work";

type Row = Pick<Work, "slug" | "number" | "title" | "kind" | "badge" | "summary" | "readout" | "cover" | "url">;

function Badge({ kind, children }: { kind: Row["kind"]; children: string }) {
  if (kind === "client") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-[0.72rem] tracking-[0.04em] text-canvas">
        <span aria-hidden="true" className="size-[7px] animate-pulse-soft rounded-full bg-accent" />
        {children}
      </span>
    );
  }
  if (kind === "demo") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1 font-mono text-[0.72rem] tracking-[0.04em]">
        <Seedling />
        {children}
      </span>
    );
  }
  return <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.72rem] tracking-[0.04em]">{children}</span>;
}

/**
 * Selected work as a ledger of field notes. On devices with a fine pointer,
 * a tilted preview plate follows the cursor and swaps per row; on touch it
 * stays out of the way and each row is simply a large link.
 */
export function WorkList({ items }: { items: Row[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.set(preview, { xPercent: -50, yPercent: -50, rotate: -4 });
      const x = gsap.quickTo(preview, "x", { duration: reduced ? 0 : 0.7, ease: "power3.out" });
      const y = gsap.quickTo(preview, "y", { duration: reduced ? 0 : 0.7, ease: "power3.out" });
      const rotate = gsap.quickTo(preview, "rotate", { duration: 0.9, ease: "power3.out" });
      let lastX = 0;

      const onMove = (event: PointerEvent) => {
        const rect = list.getBoundingClientRect();
        const px = event.clientX - rect.left;
        x(px);
        y(event.clientY - rect.top);
        if (!reduced) rotate(gsap.utils.clamp(-12, 8, -4 + (px - lastX) * 0.6));
        lastX = px;
      };
      list.addEventListener("pointermove", onMove);
      return () => list.removeEventListener("pointermove", onMove);
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <ol ref={listRef} className="relative border-t border-line-strong" onPointerLeave={() => setActive(null)}>
        {items.map((item, index) => {
          const demo = item.kind === "demo";
          return (
            <li
              key={item.slug}
              data-reveal
              onPointerEnter={() => setActive(index)}
              className={`group relative border-b ${demo ? "border-dashed border-ink-subtle" : "border-line"}`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -inset-x-[var(--spacing-gutter)] origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-settle group-hover:scale-y-100 max-md:hidden"
              />
              <Link href={`/work/${item.slug}`} className="relative flex flex-wrap items-center gap-x-8 gap-y-3 py-7 no-underline md:py-8">
                <span className="w-14 flex-none font-mono text-label text-ink-subtle group-hover:text-ink">{item.number}</span>
                <span className="min-w-0 flex-[1_1_22rem]">
                  <span
                    className={`block font-display text-note transition-[transform,color] duration-500 ease-settle group-hover:translate-x-4 group-hover:italic group-hover:text-emphasis ${
                      demo ? "text-ink-subtle" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="mt-2 block max-w-[60ch] text-ink-muted">{item.summary}</span>
                </span>
                <span className="flex flex-wrap items-center justify-end gap-5">
                  <Badge kind={item.kind}>{item.badge}</Badge>
                  <span
                    className={`min-w-[8.75rem] text-right font-display text-[2.25rem] leading-none max-sm:min-w-0 ${demo ? "text-ink-subtle" : ""}`}
                  >
                    {item.readout.value}
                    {item.readout.unit && <span className="text-[0.5em]"> {item.readout.unit}</span>}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-14 place-items-center rounded-full border-[1.5px] border-line-strong transition-[background-color,transform] duration-300 ease-settle group-hover:-rotate-45 group-hover:bg-accent group-hover:text-on-accent ${
                      demo ? "border-dashed" : ""
                    }`}
                  >
                    {demo ? <Plus /> : <ArrowUpRight size={18} />}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Cursor-following preview plate (fine pointers only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 z-10 hidden w-[19rem] transition-[opacity,scale] duration-300 ease-settle [@media(hover:hover)_and_(pointer:fine)]:block ${
          active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative overflow-hidden rounded-pebble border-[1.5px] border-line-strong shadow-[var(--shadow-plate)]">
          {items.map((item, index) => (
            <div
              key={item.slug}
              className={`${item.cover.src ? "overflow-hidden bg-surface" : "hatch"} flex aspect-[4/3] flex-col justify-between p-4 transition-opacity duration-300 ${
                index === 0 ? "relative" : "absolute inset-0"
              } ${active === index ? "opacity-100" : "opacity-0"}`}
            >
              {item.cover.src && (
                <>
                  <Image src={item.cover.src} alt="" fill sizes="304px" className="object-cover" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </>
              )}
              <span className={`eyebrow relative ${item.cover.src ? "text-white/80" : "text-ink-muted"}`}>
                {item.cover.src ? item.badge : "[ Screenshot ]"}
              </span>
              <span className={`relative font-display text-[1.65rem] leading-[1.05] ${item.cover.src ? "text-white" : ""}`}>
                {item.url ? item.url.replace(/^https?:\/\/|\/$/g, "") : item.title}
                <span className={`mt-1 block font-sans text-[0.8rem] ${item.cover.src ? "text-white/80" : "text-ink-muted"}`}>
                  {item.cover.caption}
                </span>
              </span>
            </div>
          ))}
        </div>
        <span className="absolute -top-6 -right-6 grid size-[4.75rem] place-items-center rounded-full bg-ink font-mono text-[0.69rem] tracking-[0.08em] text-canvas">
          VIEW
        </span>
      </div>
    </div>
  );
}
