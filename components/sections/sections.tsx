import type { ReactNode } from "react";
import { Capabilities } from "./capabilities";
import { CopyEmail, EnquiryPicker } from "./contact-actions";
import { GrowthRings } from "./growth-rings";
import { MonsoonTank } from "./monsoon-tank";
import { WorkList } from "./work-list";
import { Reveal } from "@/components/motion/reveal";
import { LocalTime, SkyNote } from "@/components/site/local-time";
import { ApproachIcon, ArrowUpRight, Drop } from "@/components/ui/icons";
import { Fireflies, Highlighted, Placeholder, SectionLabel } from "@/components/ui/primitives";
import { teaRows } from "@/lib/art";
import { approach, education, highlights, marquee } from "@/lib/content";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

/** A section title whose lines rise out of their baseline on scroll. */
function Title({ id, lines, className = "" }: { id: string; lines: ReactNode[]; className?: string }) {
  return (
    <h2 id={id} className={`font-display text-section font-normal ${className}`}>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <span className="block">{line}</span>
        </span>
      ))}
    </h2>
  );
}

/* ── Marquee ──────────────────────────────────────────────────────────────── */

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div aria-hidden="true" className="overflow-hidden border-b border-line bg-diagram text-canvas">
      <div className="flex w-max animate-marquee items-center gap-9 py-6 font-display text-[clamp(2.5rem,4.4vw,4.25rem)] leading-none whitespace-nowrap italic hover:[animation-play-state:paused]">
        {row.map((item, index) => (
          <span key={index} className="flex items-center gap-9">
            {item}
            <svg width="30" height="30" viewBox="0 0 28 28">
              <path d="M4 24C4 12 12 4 24 4C24 16 16 24 4 24Z" className="fill-accent" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── 01 Work ──────────────────────────────────────────────────────────────── */

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-line">
      <Reveal className="container-page py-section">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6 pb-10">
          <div>
            <SectionLabel className="mb-5">01 — Field notes</SectionLabel>
            <Title
              id="work-title"
              lines={[
                <>
                  Selected <em className="emphasis">work</em>
                </>,
              ]}
            />
          </div>
          <p data-reveal className="max-w-[42ch] text-ink-muted">
            Product engineering at Dinetap, live client work, and selected projects. Hover a note to preview it. On team projects I describe
            my part, not the whole product.
          </p>
        </div>
        <WorkList items={work} />
      </Reveal>
    </section>
  );
}

/* ── 02 The tank ──────────────────────────────────────────────────────────── */

export function TankSection() {
  return (
    <section id="tank" aria-labelledby="tank-title" className="bg-storm text-storm-foam">
      <Reveal className="container-page py-section">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
          <div className="flex-[1_1_32rem]">
            <SectionLabel className="mb-5 !text-storm-mist" icon={<Drop className="text-monsoon-glow" />}>
              02 — The tank
            </SectionLabel>
            <Title
              id="tank-title"
              lines={[
                "Built for the",
                <>
                  <em className="font-display text-spark italic">monsoon</em>.
                </>,
              ]}
            />
          </div>
          <div data-reveal className="flex max-w-[32.5rem] flex-[1_1_24rem] flex-col gap-3.5 text-storm-mist">
            <p>
              Sri Lanka&apos;s ancient tanks caught the monsoon and released it slowly to the paddy fields. A message queue does the same
              for traffic: it catches a burst, and workers drain it at a pace they can handle.
            </p>
            <p className="text-storm-foam">It&apos;s the pattern behind the event-driven payment flows I built on AWS SQS and Lambda.</p>
          </div>
        </div>
        <div data-reveal>
          <MonsoonTank />
        </div>
      </Reveal>
    </section>
  );
}

/* ── 03 Capabilities ──────────────────────────────────────────────────────── */

export function CapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="cap-title" className="border-b border-line">
      <div className="container-page py-section">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6 pb-12">
          <div>
            <SectionLabel className="mb-5">03 — Capabilities</SectionLabel>
            <Title
              id="cap-title"
              lines={[
                <>
                  From <em className="emphasis">root</em>
                </>,
                "to canopy.",
              ]}
            />
          </div>
          <p data-reveal className="max-w-[42ch] text-ink-muted">
            Six ways I can help, drawn as one plant. The parts your users never see are the ones holding up the parts they do.
          </p>
        </Reveal>
        <Capabilities />
      </div>
    </section>
  );
}

/* ── 04 Experience ────────────────────────────────────────────────────────── */

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="border-b border-line">
      <div className="container-page py-section">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6 pb-12">
          <div>
            <SectionLabel className="mb-5">04 — Experience</SectionLabel>
            <Title
              id="exp-title"
              lines={[
                "Three rings,",
                <>
                  <em className="emphasis">one</em> tree.
                </>,
              ]}
            />
          </div>
          <div data-reveal className="max-w-[44ch]">
            <p className="font-display text-[2.25rem] leading-none">Dinetap</p>
            <p className="mt-1.5 text-ink-muted">
              Formerly EatMe Global Lanka (Pvt) Ltd · Colombo. Each ring is a role; the outermost is still growing.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap items-start gap-x-[clamp(2.5rem,6vw,7rem)] gap-y-12">
          <figure className="m-0 max-w-[47.5rem] flex-[1_1_26rem]">
            <GrowthRings />
            <figcaption className="pt-3 font-mono text-label text-ink-muted">
              Fig. 04 — Career as growth rings: ring width follows time in each role. Point at a ring to bring it forward.
            </figcaption>
          </figure>
          <Reveal className="flex-[1_1_26rem]">
            <h3 className="eyebrow mb-4.5 font-normal text-ink-muted">Across these rings</h3>
            <ol className="border-t border-line-strong">
              {highlights.map((item) => (
                <li data-reveal key={item.area} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-line py-4.5">
                  <span className="pt-0.5 font-mono text-[0.72rem] tracking-[0.06em] text-ink-muted uppercase">{item.area}</span>
                  <span className="leading-relaxed">
                    <Highlighted text={item.text} />
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 05 Approach ──────────────────────────────────────────────────────────── */

export function ApproachSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="border-b border-line bg-surface">
      <Reveal className="container-page py-section">
        <SectionLabel className="mb-5">05 — Approach</SectionLabel>
        <Title
          id="approach-title"
          className="mb-14"
          lines={[
            <>
              How I <em className="emphasis">work</em>.
            </>,
          ]}
        />
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(14.5rem,100%),1fr))] border-t border-line-strong">
          {approach.map((item, index) => (
            <li
              data-reveal
              key={item.title}
              className="group flex flex-col gap-4 border-line py-7 pr-6 sm:border-r sm:pl-6 sm:first:pl-0 sm:last:border-r-0 max-sm:border-b"
            >
              <span className="transition-transform duration-500 ease-settle group-hover:-translate-y-1 group-hover:-rotate-6">
                <ApproachIcon name={item.icon} />
              </span>
              <span className="font-mono text-label text-ink-muted">0{index + 1}</span>
              <h3 className="font-display text-[2rem] leading-[1.05] font-normal">{item.title}</h3>
              <p className="text-[0.97rem] text-ink-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ── 06 About ─────────────────────────────────────────────────────────────── */

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title">
      <Reveal className="container-page flex flex-wrap items-start gap-x-[clamp(2.5rem,6vw,7.5rem)] gap-y-12 py-section">
        <div className="flex max-w-[27.5rem] flex-[1_1_18rem] flex-col gap-8">
          <div>
            <SectionLabel className="mb-5">06 — About</SectionLabel>
            <Title
              id="about-title"
              lines={[
                "Rooted in",
                <>
                  <em className="emphasis">Colombo</em>.
                </>,
              ]}
            />
          </div>
          {/* Replace with <Image> of a real portrait, or delete this block — the layout closes up. */}
          <Placeholder
            label="Portrait — optional"
            shape="rounded-[58%_42%_48%_52%/46%_54%_46%_54%]"
            className="aspect-[4/5] max-w-[22.5rem] items-center justify-center p-6 text-center"
          >
            <span className="max-w-[22ch] text-small text-ink-muted">
              A real photo builds trust. Leave it out and the layout closes up.
            </span>
          </Placeholder>
        </div>
        <div className="flex max-w-[47.5rem] flex-[999_1_32rem] flex-col gap-10">
          <p data-reveal className="font-display text-[clamp(2rem,3vw,2.875rem)] leading-[1.15]">
            Hi, I&apos;m Saumya — a software engineer who likes the parts of a product that have to hold.
          </p>
          <div data-reveal className="flex flex-col gap-4.5 text-[clamp(1.0625rem,1.3vw,1.1875rem)] leading-[1.65]">
            <p>
              I joined Dinetap — then EatMe Global Lanka — as an intern in June 2022 and have grown with the product since: from associate
              engineer to backend lead on the DineTap application and code owner for several of its services.
            </p>
            <p>
              Over the same years I completed a BEng (Hons) in Software Engineering with the University of Westminster, studying part-time
              alongside my work.
            </p>
            <p>
              My work tends to sit where the details matter — payments, data and performance. Alongside the code I write the documentation,
              and I&apos;ve run system-design workshops for newer engineers.
            </p>
          </div>
          <dl data-reveal className="border-t border-line-strong">
            {education.map((item) => (
              <div key={item.title} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                <dt className="font-semibold">{item.title}</dt>
                <dd className="text-ink-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Dusk band: the page walks from day into night ────────────────────────── */

export function DuskBand() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[18.75rem] overflow-hidden bg-[linear-gradient(to_bottom,var(--canvas)_0%,#bdcab2_34%,#4e6e66_70%,var(--inverse)_100%)] dark:bg-[linear-gradient(to_bottom,var(--canvas),var(--inverse))]"
    >
      <Fireflies count={4} className="top-1/2" />
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[200px] w-full">
        <path
          d="M0 120 C180 60 320 92 480 70 C640 48 760 100 920 80 C1080 60 1240 92 1440 60 V200 H0Z"
          className="fill-[#3e5c52] dark:fill-moss-night"
          fillOpacity="0.7"
        />
        <path d={teaRows[0]} className="fill-moss-night" />
        <path d={teaRows[1]} className="fill-inverse" />
      </svg>
    </div>
  );
}

/* ── 07 Contact ───────────────────────────────────────────────────────────── */

export function ContactSection() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-inverse text-on-inverse">
      <Fireflies />
      <Reveal className="relative container-page pt-[clamp(5rem,9vw,8.75rem)]">
        <p className="eyebrow mb-5 flex items-center gap-2.5 text-inverse-muted">
          <span aria-hidden="true" className="size-2 rounded-full bg-spark shadow-[0_0_10px_3px_rgb(217_242_107/0.5)]" />
          07 — Contact
        </p>
        <h2 id="contact-title" className="font-display text-[clamp(3.75rem,10vw,10.5rem)] leading-[0.88] font-normal tracking-[-0.035em]">
          <span className="line-mask">
            <span className="block">Let&apos;s talk about</span>
          </span>
          <span className="line-mask">
            <span className="block">
              your <em className="font-display text-spark italic">project</em>.
            </span>
          </span>
        </h2>

        <div className="mt-[clamp(3rem,6vw,5.5rem)] flex flex-wrap gap-x-[clamp(2.5rem,6vw,7.5rem)] gap-y-12">
          <div data-reveal className="flex max-w-[32.5rem] flex-[1_1_21rem] flex-col gap-7">
            <p className="text-[clamp(1.125rem,1.4vw,1.25rem)] leading-[1.55] text-inverse-muted">
              A new product, a business website, a backend that needs to scale, or a codebase that needs care — send a few lines about what
              you&apos;re building and where it hurts. Freelance and contract enquiries welcome.
            </p>
            {site.availability && <p className="eyebrow text-spark">{site.availability}</p>}
            <EnquiryPicker />
          </div>

          <div data-reveal className="flex min-w-0 flex-[999_1_30rem] flex-col border-t border-inverse-line">
            <div className="border-b border-inverse-line py-6">
              <p className="eyebrow mb-2.5 text-inverse-muted">Email</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={`mailto:${site.email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-[clamp(1.625rem,3vw,2.875rem)] tracking-[-0.01em] [overflow-wrap:anywhere] text-on-inverse decoration-spark decoration-2 underline-offset-8"
                >
                  {site.email}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <CopyEmail />
              </div>
            </div>
            {(
              [
                [
                  ["LinkedIn", site.links.linkedin, true],
                  ["GitHub", site.links.github, true],
                ],
                [
                  ["WhatsApp", site.links.whatsapp, true],
                  ["Call", `tel:${site.phoneE164}`, false],
                ],
              ] as const
            ).map((row) => (
              <div
                key={row[0][0]}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(11.25rem,100%),1fr))] border-b border-inverse-line"
              >
                {row.map(([label, href, external], index) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={`group flex items-center justify-between gap-3 py-5.5 font-display text-[1.75rem] text-on-inverse no-underline ${
                      index === 0 ? "pr-4 sm:border-r sm:border-inverse-line" : "sm:px-4"
                    }`}
                  >
                    {label}
                    <span className="transition-transform duration-300 ease-settle group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight />
                    </span>
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ))}
              </div>
            ))}
            <p className="py-5.5 font-mono text-label tracking-[0.04em] text-inverse-muted">
              <LocalTime /> in Colombo · UTC+05:30
              <SkyNote />
            </p>
          </div>
        </div>

        <div className="mt-[clamp(4.5rem,9vw,8rem)] grid grid-cols-[repeat(auto-fit,minmax(min(12.5rem,100%),1fr))] border-t border-inverse-line font-mono text-label tracking-[0.04em] text-inverse-muted uppercase">
          <p className="pt-4 pr-4">© 2026 {site.name}</p>
          <p className="pt-4 pr-4">{site.role} · Colombo</p>
          <p className="pt-4 pr-4">Field notes · Rev. 3</p>
          <a href="#top" className="pt-4 text-on-inverse no-underline hover:text-spark">
            Back to the mist ↑
          </a>
        </div>
      </Reveal>
      <div aria-hidden="true" className="relative mt-[clamp(1.75rem,4vw,3rem)] px-gutter [container-type:inline-size]">
        {/* Name is ~8em wide: size from container width so it always fits. */}
        <div className="h-[0.74em] overflow-hidden text-[min(14.5rem,12.2cqw)]">
          <div className="text-outline font-display leading-[0.9] tracking-[-0.03em] whitespace-nowrap text-on-inverse italic">
            {site.name}
          </div>
        </div>
      </div>
    </footer>
  );
}
