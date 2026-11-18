import { HeroField } from "./hero-field";
import { OutlineLink, PillLink } from "@/components/ui/primitives";
import { site } from "@/lib/site";

const herbarium = [
  ["Role", "Software engineer"],
  ["Based in", site.location],
  ["Building since", "June 2022"],
  ["Focus", "APIs, payments, full-stack web"],
] as const;

/** Entrance delays, in seconds: the page settles in like mist lifting. */
const d = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative overflow-hidden border-b border-line">
      {/* Night only: a full moon over the ridge, drawn under the contour lines so they cross it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_55%_60%_at_80%_20%,rgb(236_229_200/0.09),transparent_70%)] dark:block"
      >
        <div className="absolute top-[17%] right-[9%] size-[clamp(3.5rem,8vw,8rem)] sm:top-[14%] sm:right-[15%] animate-fade rounded-full bg-[radial-gradient(circle_at_36%_34%,#fbf7e6_0%,#ece5c8_58%,#d3cba8_100%)] opacity-90 shadow-[0_0_60px_18px_rgb(236_229_200/0.14),0_0_220px_100px_rgb(236_229_200/0.06)] [animation-delay:0.4s]" />
      </div>
      <HeroField />

      <div className="relative z-[2] container-page flex min-h-[max(100svh,44rem)] flex-col pt-24 pb-10">
        <div className="eyebrow mt-6 flex animate-fade flex-wrap gap-x-8 gap-y-2 text-ink-muted lg:mt-10" style={d(0.1)}>
          <span>{site.role} · Backend & Full-Stack</span>
          <span>{site.location}</span>
        </div>

        <h1 id="hero-title" aria-label={site.tagline} className="mt-auto pt-12 font-display text-hero font-normal">
          <span aria-hidden="true" className="line-mask">
            <span className="block animate-rise" style={d(0.15)}>
              <em className="emphasis">
                {"Calm".split("").map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block origin-[50%_85%] animate-sway"
                    style={{ animationDelay: `${index * -0.6 - 0.3}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </em>{" "}
              systems
            </span>
          </span>
          <span aria-hidden="true" className="line-mask md:pl-[min(11vw,190px)]">
            <span className="block animate-rise" style={d(0.28)}>
              for busy products.
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-10 md:mt-14">
          <div className="flex max-w-[31rem] flex-[1_1_21rem] animate-fade flex-col gap-6" style={d(0.55)}>
            <p className="text-lead">
              I&apos;m Saumya, a software engineer in Colombo. I build web apps and the backends behind them, the kind that stay calm when
              traffic doesn&apos;t. In 3.5+ years I&apos;ve led a move to microservices, built payments on AWS and launched a live online
              bookshop on my own.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillLink href="#contact">Let&apos;s discuss your project</PillLink>
              <OutlineLink href="#work">Explore my work</OutlineLink>
            </div>
          </div>

          <div className="flex animate-fade items-end gap-7" style={d(0.75)}>
            <div className="w-[min(18.75rem,100%)] border border-line-strong bg-canvas font-mono text-label leading-relaxed max-sm:hidden">
              <div className="flex justify-between border-b border-line-strong px-3 py-2 tracking-[0.06em]">
                <span>AT A GLANCE</span>
              </div>
              <dl className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-2.5 gap-y-1 px-3 py-2.5">
                {herbarium.map(([term, value]) => (
                  <div key={term} className="contents">
                    <dt className="text-ink-muted">{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a
              href="#work"
              aria-label="Scroll to work"
              className="-mx-4 flex flex-col items-center gap-2.5 px-4 font-mono text-label tracking-[0.08em] text-ink-muted no-underline"
            >
              <span className="[writing-mode:vertical-rl]">SCROLL</span>
              <span className="relative block h-[4.5rem] w-px bg-ink">
                <span className="absolute top-0 -left-1 size-[9px] animate-bob rounded-full border border-ink bg-accent" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
