import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** The tea leaf used as the site mark, bullets and section labels. */
export function Leaf({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" className={className} {...props}>
      <path d="M4 24C4 12 12 4 24 4C24 16 16 24 4 24Z" className="fill-accent stroke-ink" strokeWidth="1.6" />
    </svg>
  );
}

export function LeafMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M3 27C3 13 13 3 27 3C27 17 17 27 3 27Z" className="fill-accent stroke-ink" strokeWidth="1.6" />
      <path d="M3 27L19 11" className="stroke-ink dark:stroke-canvas" strokeWidth="1.4" />
    </svg>
  );
}

export function Arrow({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function ArrowLeft({ size = 14, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M14 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Plus({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Drop({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <path d="M14 3C14 3 5 13 5 18a9 9 0 0 0 18 0C23 13 14 3 14 3Z" fill="currentColor" />
    </svg>
  );
}

export function Seedling({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 44V24M24 28C24 20 18 14 10 14C10 22 16 28 24 28ZM24 24C24 16 30 10 38 10C38 18 32 24 24 24Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

/** Field-guide pictograms for the "How I work" principles. */
export function ApproachIcon({ name }: { name: "gauge" | "cloud" | "stones" | "sprout" | "leaf" }) {
  const common = { width: 52, height: 52, viewBox: "0 0 48 48", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "gauge":
      return (
        <svg {...common}>
          <path d="M18 6h12v34a6 6 0 0 1-12 0z" className="stroke-ink" strokeWidth="1.6" />
          <path d="M18.8 28h10.4v12a5.2 5.2 0 0 1-10.4 0z" className="fill-water" />
          <path d="M30 14h-5M30 20h-5M30 26h-5M30 32h-5" className="stroke-ink" strokeWidth="1.4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M14 26a8 8 0 0 1 1.6-15.8A10 10 0 0 1 34.5 12a7 7 0 0 1-.5 14z" className="stroke-ink" strokeWidth="1.6" />
          <path d="M18 32l-2 6M26 32l-2 6M34 32l-2 6" className="stroke-water" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "stones":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="38" rx="7" ry="4" className="stroke-ink" strokeWidth="1.6" />
          <ellipse cx="24" cy="27" rx="7" ry="4" className="stroke-ink" strokeWidth="1.6" />
          <ellipse cx="36" cy="16" rx="7" ry="4" className="fill-accent stroke-ink" strokeWidth="1.6" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common}>
          <path d="M24 44V24" className="stroke-ink" strokeWidth="1.6" />
          <path d="M24 28C24 20 18 14 10 14C10 22 16 28 24 28Z" className="fill-diagram stroke-ink" strokeWidth="1.4" />
          <path d="M24 24C24 16 30 10 38 10C38 18 32 24 24 24Z" className="fill-accent stroke-ink" strokeWidth="1.4" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M8 40C8 20 20 8 40 8C40 28 28 40 8 40Z" className="stroke-ink" strokeWidth="1.6" />
          <path d="M8 40L30 18M18 30h8M22 26v-8M26 22h6" className="stroke-ink" strokeWidth="1.3" />
        </svg>
      );
  }
}
