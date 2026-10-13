import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Arrow, Leaf } from "./icons";

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & { className?: string; children: ReactNode };

/**
 * Primary action: a dark pill with the accent arrow disc.
 * `tone="spark"` is the night version used on the contact band.
 */
export function PillLink({
  children,
  className = "",
  tone = "ink",
  icon,
  ...props
}: LinkProps & { tone?: "ink" | "spark"; icon?: ReactNode }) {
  const tones = {
    ink: "bg-ink text-canvas",
    spark: "bg-spark text-inverse",
  } as const;
  const disc = {
    ink: "bg-accent text-on-accent",
    spark: "bg-inverse text-spark",
  } as const;
  return (
    <Link
      {...props}
      className={`group inline-flex min-h-14 items-center gap-3.5 rounded-full py-1.5 pr-1.5 pl-6 text-base font-medium no-underline transition-transform duration-200 ease-respond active:scale-[0.98] ${tones[tone]} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`grid size-11 place-items-center rounded-full transition-transform duration-300 ease-settle group-hover:translate-x-1 group-hover:-rotate-12 ${disc[tone]}`}
      >
        {icon ?? <Arrow />}
      </span>
    </Link>
  );
}

/** Secondary action: an outlined pill. */
export function OutlineLink({ children, className = "", ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-14 items-center gap-2.5 rounded-full border-[1.5px] border-line-strong px-6 text-base font-medium no-underline transition-colors duration-200 ease-respond hover:bg-ink hover:text-canvas ${className}`}
    >
      {children}
    </Link>
  );
}

/** "01 — Field notes": the mono label above every section title. */
export function SectionLabel({ children, className = "", icon }: { children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 text-ink-muted ${className}`}>
      {icon ?? <Leaf />}
      {children}
    </p>
  );
}

/**
 * A reserved frame for media that doesn't exist yet: screenshots, permitted
 * diagrams, portraits. It reads as a placeholder on purpose, so nothing on the
 * page pretends to be a real screenshot.
 */
export function Placeholder({
  label,
  caption,
  className = "",
  shape = "rounded-pebble",
  children,
}: {
  label: string;
  caption?: ReactNode;
  className?: string;
  shape?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`hatch flex flex-col justify-between gap-3 border border-dashed border-ink-subtle p-4 sm:p-5 ${shape} ${className}`}
    >
      <span className="eyebrow text-ink-muted">[ {label} ]</span>
      {children ?? (caption ? <span className="text-small text-ink-muted">{caption}</span> : null)}
    </div>
  );
}

/** Highlights **figures** inside a sentence with an accent chip. */
export function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") ? (
          <strong key={index} className="rounded-[4px] bg-accent px-1 font-semibold text-on-accent">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Deterministic fireflies (no Math.random, so server and client agree). */
const fireflyField = [
  [23, 58, 6, 9.1, -5.1],
  [29, 65, 7, 9.8, -4.1],
  [69, 35, 7, 9.7, -0.1],
  [56, 13, 5, 5.9, -6],
  [90, 10, 6, 7.6, -8],
  [80, 61, 6, 5.2, -2.6],
  [90, 19, 5, 8.9, -7.5],
  [21, 16, 6, 5.7, -7.4],
  [11, 30, 7, 6.3, -7.8],
  [62, 76, 5, 10, -1.6],
  [51, 45, 5, 11, -3.1],
  [2, 67, 7, 5.4, -4.8],
] as const;

export function Fireflies({ count = 12, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {fireflyField.slice(0, count).map(([left, top, size, dur, delay], index) => (
        <span
          key={index}
          className="absolute animate-firefly rounded-full bg-spark shadow-[0_0_12px_4px_rgb(217_242_107/0.5)]"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
