"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf } from "@/components/ui/icons";
import { readouts } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const format = (value: number, decimals: number) => value.toFixed(decimals);

/**
 * "Measured in the field": four CV figures that count up once, the first
 * time they scroll into view. The real numbers are in the server HTML.
 */
export function Readouts() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const figures = root.querySelectorAll<HTMLElement>("[data-count]");
      figures.forEach((el, index) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        const counter = { value: 0 };
        el.textContent = format(0, decimals);
        gsap.to(counter, {
          value: target,
          duration: 2.2,
          delay: index * 0.12,
          ease: "expo.out",
          onUpdate: () => {
            el.textContent = format(counter.value, decimals);
          },
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });
      });
      gsap.from(root.querySelectorAll("[data-rule]"), {
        scaleY: 0,
        transformOrigin: "50% 0%",
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-labelledby="readouts-title" className="border-b border-line">
      <div className="container-page py-14 md:py-20">
        <h2 id="readouts-title" className="eyebrow mb-7 flex items-center gap-2.5 font-normal text-ink-muted">
          <Leaf />
          Measured in the field
        </h2>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-y-10">
          {readouts.map((item, index) => (
            <div key={item.text} className="relative flex flex-col py-2 sm:px-7 sm:first:pl-0">
              {index > 0 && <span data-rule aria-hidden="true" className="absolute top-0 left-0 hidden h-full w-px bg-line sm:block" />}
              <dt className="font-display text-figure">
                <span className="sr-only">
                  {item.prefix}
                  {format(item.value, item.decimals)}
                  {item.unit}
                </span>
                <span aria-hidden="true">
                  {item.prefix}
                  <span data-count={item.value} data-decimals={item.decimals} className="tabular-nums">
                    {format(item.value, item.decimals)}
                  </span>
                  <em className="emphasis text-[0.5em]">{item.unit}</em>
                </span>
              </dt>
              <dd className="mt-3.5 max-w-[30ch] text-small text-ink-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
