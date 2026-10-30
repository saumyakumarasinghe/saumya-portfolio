"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { duration, ease, stagger as staggerStep } from "@/lib/motion";
import { useGsap } from "@/lib/use-gsap";

/**
 * Scroll-triggered entrance for a block.
 *
 * Content is fully visible in the server HTML; the entrance is added only
 * after the page has loaded and only when motion is allowed, so nothing is ever
 * hidden from readers without JavaScript or with reduced motion. A block that is
 * already on screen by then (a deep link, a restored scroll position) is left as it is.
 *
 * Children marked `data-reveal` animate in sequence; children wrapped in
 * `.line-mask` rise out of their baseline like set type.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  start = "top 82%",
  y = 44,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  start?: string;
  y?: number;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGsap(({ gsap }) => {
    const root = ref.current;
    if (!root) return;

    const triggerAt = (Number(/(\d+)%/.exec(start)?.[1]) || 82) / 100;
    if (root.getBoundingClientRect().top < window.innerHeight * triggerAt) return;

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll<HTMLElement>(".line-mask > *");
      const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start, once: true },
        defaults: { ease: ease.settle, duration: duration.settle + 0.2 },
      });
      if (lines.length) {
        timeline.from(lines, { yPercent: 108, stagger: staggerStep * 1.5 }, 0);
      }
      if (items.length) {
        timeline.from(items, { y, autoAlpha: 0, stagger: staggerStep * 1.5 }, lines.length ? 0.15 : 0);
      }
      if (!lines.length && !items.length) {
        timeline.from(root, { y, autoAlpha: 0 });
      }
    }, root);

    return () => ctx.revert();
  });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
