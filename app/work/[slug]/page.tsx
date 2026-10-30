import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/reveal";
import { MixedScript } from "@/components/ui/mixed-script";
import { Arrow, ArrowLeft, ArrowUpRight, Leaf } from "@/components/ui/icons";
import { Fireflies, Placeholder, PillLink } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import { getWork, nextWork, work, type Screen, type Work } from "@/lib/work";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
    robots: item.kind === "demo" ? { index: false } : undefined,
  };
}

function TitleText({ item }: { item: Work }) {
  if (!item.emphasis || !item.title.endsWith(item.emphasis)) return <>{item.title}</>;
  const head = item.title.slice(0, -item.emphasis.length);
  return (
    <>
      {head}
      <em className="emphasis">{item.emphasis}</em>
    </>
  );
}

function Block({ number, title, children }: { number: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <Reveal
      as="section"
      className="flex flex-wrap gap-x-[clamp(2rem,5vw,6rem)] gap-y-4 border-t border-line py-11 first:border-line-strong"
    >
      <h2 className="max-w-[21rem] min-w-0 flex-[1_1_15rem] font-display text-[2.75rem] leading-none font-normal">
        <span className="eyebrow mb-2.5 block text-ink-muted">{number}</span>
        {title}
      </h2>
      <div data-reveal className="max-w-[57.5rem] min-w-0 flex-[999_1_32rem]">
        {children}
      </div>
    </Reveal>
  );
}

/**
 * A video poster is a plain attribute, so it bypasses <Image>. Asking the image optimizer for it
 * serves AVIF or WebP instead of the raw file. getImageProps returns the largest srcset entry,
 * which for a 540px-wide request is the 1080px variant: enough for a poster shown at up to 920px.
 */
function posterUrl(src?: string) {
  if (!src) return undefined;
  return getImageProps({ src, alt: "", width: 540, height: 321 }).props.src;
}

/** A screenshot, recording or design piece; falls back to a dashed placeholder until the file exists. */
function Media({ screen, className }: { screen: Screen; className: string }) {
  if (!screen.src && !screen.video) {
    return <Placeholder label={screen.label} caption={screen.caption} className={className} />;
  }
  return (
    <figure className={`m-0 flex flex-col gap-2.5 ${screen.wide ? "col-span-full" : ""}`}>
      <div
        className={`relative overflow-hidden rounded-pebble border border-line ${screen.tone === "paper" ? "bg-[#f4ecdd]" : "bg-surface"} ${className}`}
        style={screen.ratio ? { aspectRatio: screen.ratio } : undefined}
      >
        {screen.video ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={posterUrl(screen.poster)}
            aria-label={screen.alt ?? screen.label}
            className="size-full object-contain"
          >
            <source src={screen.video} />
          </video>
        ) : screen.src ? (
          <Image
            src={screen.src}
            alt={screen.alt ?? screen.label}
            fill
            sizes="(min-width: 1024px) 26vw, (min-width: 640px) 44vw, 100vw"
            className={screen.tone === "paper" ? "object-contain p-6" : "object-contain"}
          />
        ) : null}
      </div>
      <figcaption className="font-mono text-label text-ink-muted">
        {screen.label} · <MixedScript text={screen.caption} />
      </figcaption>
    </figure>
  );
}

function OrderFlow() {
  const steps = [
    [24, 104, "Browse"],
    [152, 94, "Cart"],
    [270, 114, "Transfer"],
    [408, 108, "Receipt ✓"],
    [540, 112, "Dispatch"],
  ] as const;
  return (
    <svg
      viewBox="0 0 680 240"
      role="img"
      aria-label="Order flow: browse, cart, bank transfer, receipt check, dispatch; pre-orders are held until release day"
      className="block h-auto w-full"
    >
      <g
        fill="none"
        className="animate-flow stroke-water [animation-duration:2.6s]"
        strokeWidth="2.5"
        strokeDasharray="7 9"
        strokeLinecap="round"
      >
        <path d="M128 92 H 152" />
        <path d="M246 92 H 270" />
        <path d="M384 92 H 408" />
        <path d="M516 92 H 540" />
        <path d="M200 112 V 164" />
        <path d="M384 184 H 590 V 116" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="13" className="fill-ink">
        {steps.map(([x, w, label], i) => (
          <g key={label}>
            <rect
              x={x}
              y="70"
              width={w}
              height="44"
              rx="22"
              className={`stroke-ink ${i === 3 ? "fill-accent" : "fill-canvas"}`}
              strokeWidth="1.5"
            />
            <text x={x + w / 2} y="97" textAnchor="middle" className={i === 3 ? "fill-on-accent" : "fill-ink"}>
              {label}
            </text>
          </g>
        ))}
        <rect x="152" y="164" width="232" height="44" rx="22" fill="none" className="stroke-ink" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="268" y="191" textAnchor="middle">
          Pre-order · held to release
        </text>
      </g>
      <text x="24" y="40" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1" className="fill-ink-muted">
        ORDER FLOW · AS IT RUNS ON THE LIVE SITE
      </text>
    </svg>
  );
}

export default function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  return (
    <>
      <Suspense fallback={<div aria-hidden="true" className="container-page min-h-svh pt-28 md:pt-36" />}>
        <CaseStudyArticle params={params} />
      </Suspense>
      <CaseStudyFooter />
    </>
  );
}

async function CaseStudyArticle({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();
  const next = nextWork(item.slug);
  const index = work.indexOf(item) + 1;

  return (
    <>
      <article aria-labelledby="cs-title" className="container-page pt-28 md:pt-36">
        <Link
          href="/#work"
          className="eyebrow inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong px-4 no-underline hover:bg-surface"
        >
          <ArrowLeft /> All field notes
        </Link>

        <div className="eyebrow mt-10 flex animate-fade flex-wrap items-center gap-x-4 gap-y-2.5 text-ink-muted">
          <span>
            Field note {item.number} of 0{work.length}
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${item.kind === "client" ? "bg-ink text-canvas" : "border border-line-strong text-ink"} ${item.kind === "demo" ? "border-dashed" : ""}`}
          >
            {item.kind === "client" && <span aria-hidden="true" className="size-[7px] animate-pulse-soft rounded-full bg-accent" />}
            {item.badge}
          </span>
        </div>
        <h1 id="cs-title" className="mt-7 font-display text-hero font-normal">
          <span className="line-mask">
            <span className="block animate-rise">
              <TitleText item={item} />
            </span>
          </span>
        </h1>

        <div className="mt-10 flex animate-fade flex-wrap items-end justify-between gap-x-16 gap-y-8 [animation-delay:.3s]">
          <div className="flex max-w-[38.75rem] flex-[1_1_26rem] flex-col gap-6">
            <p className="text-[clamp(1.1875rem,1.6vw,1.4375rem)] leading-normal">{item.lead}</p>
            {item.url && (
              <PillLink href={item.url} target="_blank" rel="noreferrer" icon={<ArrowUpRight />} className="self-start">
                Visit {item.url.replace(/^https?:\/\/|\/$/g, "")}
              </PillLink>
            )}
          </div>
          <div className="w-full max-w-[21.25rem] border border-line-strong font-mono text-label leading-relaxed">
            <div className="flex justify-between border-b border-line-strong px-3.5 py-2.5 tracking-[0.06em]">
              <span>HERBARIUM · SK</span>
              <span>No. 00{index + 1}</span>
            </div>
            <dl className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 px-3.5 py-3">
              {item.facts.map((fact) => (
                <div key={fact.label} className="contents">
                  <dt className="text-ink-muted">{fact.label}</dt>
                  <dd className={fact.confirm ? "text-earth" : ""}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {item.cover.src ? (
          <figure className="m-0 mt-[clamp(3rem,6vw,5.5rem)]">
            <div className="relative aspect-[21/9] overflow-hidden rounded-plate border border-line bg-surface">
              <Image
                src={item.cover.src}
                alt={item.cover.alt ?? item.cover.caption}
                fill
                preload
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="pt-3 font-mono text-label text-ink-muted">
              <MixedScript text={item.cover.caption} />
            </figcaption>
          </figure>
        ) : (
          <Placeholder
            label={item.cover.label}
            shape="rounded-plate"
            className="mt-[clamp(3rem,6vw,5.5rem)] aspect-[21/9] max-sm:aspect-[4/3]"
          >
            <span className="max-w-[46ch] font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.15]">
              <MixedScript text={item.cover.caption} />
            </span>
          </Placeholder>
        )}

        <div className="mt-[clamp(4.5rem,9vw,8.75rem)] flex flex-col">
          <Block number="01" title="Overview">
            <p className="text-[clamp(1.125rem,1.4vw,1.25rem)] leading-[1.65]">
              <MixedScript text={item.overview} />
            </p>
          </Block>
          <Block number="02" title="The problem">
            <p className="text-[clamp(1.125rem,1.4vw,1.25rem)] leading-[1.65]">
              <MixedScript text={item.problem} />
            </p>
          </Block>
          {item.myPart && (
            <Block
              number="02b"
              title={
                <>
                  My <em className="emphasis">part</em>
                </>
              }
            >
              <p className="text-[clamp(1.125rem,1.4vw,1.25rem)] leading-[1.65]">
                <MixedScript text={item.myPart} />
              </p>
            </Block>
          )}
          <Block
            number="03"
            title={
              <>
                What I <em className="emphasis">built</em>
              </>
            }
          >
            <ul className="text-[clamp(1.0625rem,1.3vw,1.1875rem)]">
              {item.built.map((line) => (
                <li key={line} className="flex items-baseline gap-3.5 border-b border-line py-3.5">
                  <Leaf className="flex-none translate-y-0.5" />
                  {line}
                </li>
              ))}
            </ul>
          </Block>
          <Block number="04" title={item.diagram === "flow" ? "Catalogue to doorstep" : "How it fits together"}>
            <figure className="m-0">
              {item.diagram === "flow" ? (
                <div className="overflow-hidden rounded-plate bg-surface">
                  <OrderFlow />
                </div>
              ) : (
                <Placeholder
                  label="Architecture diagram, only if permitted"
                  caption={item.diagramCaption}
                  shape="rounded-plate"
                  className="aspect-[17/6] max-sm:aspect-[4/3]"
                />
              )}
              {item.diagram === "flow" && (
                <figcaption className="pt-3 font-mono text-label text-ink-muted">Fig. 05: {item.diagramCaption}</figcaption>
              )}
            </figure>
          </Block>
          <Block number="05" title="Screens">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16.25rem,100%),1fr))] gap-4">
              {item.screens.map((screen) => (
                <Media key={screen.label} screen={screen} className="aspect-[16/10]" />
              ))}
            </div>
          </Block>
          {item.design && item.design.length > 0 && (
            <Block
              number="05b"
              title={
                <>
                  Design <em className="emphasis">work</em>
                </>
              }
            >
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(14rem,100%),1fr))] gap-4">
                {item.design.map((piece) => (
                  <Media key={piece.src ?? piece.caption} screen={piece} className="aspect-[4/5]" />
                ))}
              </div>
            </Block>
          )}
          <Block number="06" title="Outcome">
            <div className="flex flex-col gap-5">
              <p className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.85] tracking-[-0.04em]">
                {item.outcome.headline} <em className="emphasis">{item.outcome.emphasis}</em>.
              </p>
              <p className="max-w-[44ch] text-[clamp(1.0625rem,1.3vw,1.1875rem)]">{item.outcome.text}</p>
              {item.outcome.placeholders.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-3">
                  {item.outcome.placeholders.map((text) => (
                    <span
                      key={text}
                      className="rounded-[1.25rem] border border-dashed border-ink-subtle p-4 font-mono text-label leading-relaxed text-ink-muted"
                    >
                      [ {text} ]
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Block>
          <Block number="07" title="For your project">
            <div className="flex flex-col gap-5 text-[clamp(1.0625rem,1.3vw,1.1875rem)] leading-[1.65]">
              <p>{item.forYou.text}</p>
              <ul className="flex flex-wrap gap-2">
                {item.forYou.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line-strong px-3.5 py-1.5 text-small">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Block>
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-wrap items-end justify-between gap-4 border-t border-line py-[clamp(3.5rem,7vw,6.5rem)] no-underline"
        >
          <span className="flex flex-col gap-3">
            <span className="eyebrow text-ink-muted">
              Next field note {next.number} · {next.badge}
            </span>
            <span className="font-display text-section transition-transform duration-500 ease-settle group-hover:translate-x-4">
              {next.title}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="grid size-22 place-items-center rounded-full border-[1.5px] border-line-strong transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent"
          >
            <Arrow size={28} />
          </span>
        </Link>
      </article>
    </>
  );
}

function CaseStudyFooter() {
  return (
    <footer className="relative overflow-hidden bg-inverse text-on-inverse">
      <Fireflies count={3} />
      <div className="relative container-page pt-[clamp(5rem,9vw,8.75rem)] pb-9">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <h2 className="max-w-[14ch] font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9] font-normal tracking-[-0.03em]">
            Need a site like this for your <em className="text-spark italic">business</em>?
          </h2>
          <PillLink href="/#contact" tone="spark">
            Let&apos;s discuss your project
          </PillLink>
        </div>
        <div className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-[repeat(auto-fit,minmax(min(12.5rem,100%),1fr))] border-t border-inverse-line font-mono text-label tracking-[0.04em] text-inverse-muted uppercase">
          <p className="pt-4 pr-4">© 2026 {site.name}</p>
          <a
            href={`mailto:${site.email}`}
            target="_blank"
            rel="noreferrer"
            className="pt-4 pr-4 pb-3 normal-case no-underline hover:text-spark"
          >
            {site.email}
          </a>
          <p className="pt-1 pr-4">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center no-underline hover:text-spark"
            >
              LinkedIn ↗
            </a>{" "}
            ·{" "}
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center no-underline hover:text-spark"
            >
              GitHub ↗
            </a>
          </p>
          <a href="#cs-title" className="pt-4 pb-3 text-on-inverse no-underline hover:text-spark">
            Back to the top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
