import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { WebsiteEnquiry } from "@/components/sections/website-enquiry";
import { Arrow, ArrowUpRight, Leaf } from "@/components/ui/icons";
import { MixedScript } from "@/components/ui/mixed-script";
import { Fireflies, OutlineLink, PillLink } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import { getWork } from "@/lib/work";

const { freelance } = site;

export const metadata: Metadata = {
  title: freelance.brand,
  description: freelance.description,
  alternates: { canonical: "/websites" },
  openGraph: {
    url: "/websites",
    title: `${freelance.brand} | Affordable websites for small businesses`,
    description: freelance.description,
  },
  twitter: {
    title: `${freelance.brand} | Affordable websites for small businesses`,
    description: freelance.description,
  },
};

const services = [
  {
    title: "Business websites",
    text: "A clean three-to-five page site with your services, photos, location and contact details. Ready within a week once your content is in.",
  },
  { title: "Online stores", text: "Products, cart, orders and online payments, so customers can buy from you at any hour." },
  { title: "Portfolio sites", text: "A personal site for freelancers, creators and professionals that puts your best work first." },
  { title: "Fixes and redesigns", text: "Refresh, speed up or repair the site you already have, and keep it looked after." },
] as const;

const reasons = [
  { title: "Sinhala and English", text: "Bilingual sites, so every customer reads about you in their own language." },
  { title: "Online payments", text: "Take card and online payments through a trusted payment gateway." },
  { title: "Fast delivery", text: "A simple site within a week. Bigger sites on a timeline we agree before we start." },
  { title: "Support after launch", text: "Help with updates and fixes once your site is live, so you're never left on your own." },
] as const;

const steps = [
  { title: "Message me", text: "On WhatsApp or by email. Tell me about your business and what you need." },
  { title: "Get a free quote", text: "I suggest the simplest site that does the job, with a clear price and timeline." },
  { title: "Review as I build", text: "You see the site take shape and ask for changes along the way." },
  { title: "Launch, with support", text: "Your site goes live on your own domain, and I stay on hand for updates." },
] as const;

const proof = [
  { slug: "sayaru-publishers", note: "Live bilingual bookshop with accounts, pre-orders and online ordering. Built and launched solo." },
  { slug: "fluffinton", note: "Booking site for a cat hotel, with an animated mascot and a custom date picker. In progress." },
] as const;

/** "Websites by Saumya" → "Websites by" + emphasised "Saumya". */
function BrandTitle() {
  const words = freelance.brand.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <em className="emphasis">{last}</em>
    </>
  );
}

function Block({ number, title, children }: { number: string; title: ReactNode; children: ReactNode }) {
  return (
    <Reveal
      as="section"
      className="flex flex-wrap gap-x-[clamp(2rem,5vw,6rem)] gap-y-6 border-t border-line py-12 first:border-line-strong"
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

export default function WebsitesPage() {
  const greeting = encodeURIComponent("Hi Saumya, I'd like a quote for a website.");

  return (
    <>
      <article aria-labelledby="ws-title" className="container-page pt-28 md:pt-36">
        <p className="eyebrow flex animate-fade items-center gap-2.5 text-ink-muted">
          <Leaf />
          Freelance web design and development
        </p>
        <h1 id="ws-title" className="mt-7 font-display text-hero font-normal">
          <span className="line-mask">
            <span className="block animate-rise">
              <BrandTitle />
            </span>
          </span>
        </h1>

        <div className="mt-10 flex animate-fade flex-wrap items-end justify-between gap-x-16 gap-y-8 [animation-delay:.3s]">
          <div className="flex max-w-[40rem] flex-[1_1_26rem] flex-col gap-6">
            <p className="text-[clamp(1.1875rem,1.6vw,1.4375rem)] leading-normal">
              Affordable, professional websites for small businesses, online sellers and personal brands. Built by a software engineer, in
              Sinhala and English.
            </p>
            <p className="text-[clamp(1.0625rem,1.3vw,1.1875rem)] text-ink-muted">
              <MixedScript text="ඔබේ ව්‍යාපාරයට වෘත්තීය වෙබ් අඩවියක්, සාධාරණ මිලකට." />
            </p>
            <div className="flex flex-wrap gap-3">
              <PillLink href={`${freelance.whatsappLink}?text=${greeting}`} target="_blank" rel="noreferrer">
                Message me on WhatsApp
              </PillLink>
              <OutlineLink href="#enquiry">Get a free quote</OutlineLink>
            </div>
          </div>

          <div className="w-full max-w-[21.25rem] rounded-pebble border border-line-strong bg-surface p-5">
            <p className="eyebrow flex items-center gap-2 text-ink-muted">
              <span aria-hidden="true" className="size-[7px] animate-pulse-soft rounded-full bg-accent" />
              Launch offer
            </p>
            <p className="mt-3 font-display text-[1.875rem] leading-[1.05]">{freelance.offer}</p>
            <p className="mt-2 text-small text-ink-muted">{freelance.offerNote.charAt(0).toUpperCase() + freelance.offerNote.slice(1)}.</p>
          </div>
        </div>

        <div className="mt-[clamp(4.5rem,9vw,8.75rem)] flex flex-col">
          <Block
            number="01"
            title={
              <>
                What I <em className="emphasis">build</em>
              </>
            }
          >
            <ul className="grid gap-4 sm:grid-cols-2">
              {services.map((item) => (
                <li key={item.title} className="flex flex-col gap-2 rounded-pebble border border-line p-6">
                  <h3 className="font-display text-[1.75rem] leading-none font-normal">{item.title}</h3>
                  <p className="text-ink-muted">{item.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-ink-muted">Small-business friendly prices. Every quote is free, with no obligation.</p>
          </Block>

          <Block
            number="02"
            title={
              <>
                Why work <em className="emphasis">with me</em>
              </>
            }
          >
            <ul className="text-[clamp(1.0625rem,1.3vw,1.1875rem)]">
              {reasons.map((item) => (
                <li key={item.title} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-ink-muted">
                    <MixedScript text={item.text} />
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block
            number="03"
            title={
              <>
                Recent <em className="emphasis">work</em>
              </>
            }
          >
            <ul className="grid gap-6 sm:grid-cols-2">
              {proof.map(({ slug, note }) => {
                const item = getWork(slug);
                if (!item) return null;
                return (
                  <li key={slug}>
                    <Link href={`/work/${item.slug}`} className="group flex flex-col gap-3 no-underline">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-plate border border-line bg-surface">
                        {item.cover.src && (
                          <Image
                            src={item.cover.src}
                            alt={item.cover.alt ?? item.cover.caption}
                            fill
                            sizes="(min-width: 640px) 28rem, 100vw"
                            className="object-cover transition-transform duration-700 ease-settle group-hover:scale-[1.03]"
                          />
                        )}
                      </div>
                      <span className="flex items-center justify-between gap-3 font-display text-[1.75rem] leading-none">
                        {item.title}
                        <span className="transition-transform duration-300 ease-settle group-hover:translate-x-1">
                          <Arrow />
                        </span>
                      </span>
                      <span className="text-ink-muted">{note}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Block>

          <Block
            number="04"
            title={
              <>
                How it <em className="emphasis">works</em>
              </>
            }
          >
            <ol className="grid gap-4 sm:grid-cols-2">
              {steps.map((item, index) => (
                <li key={item.title} className="flex gap-4 border-t border-line pt-4">
                  <span className="eyebrow pt-1.5 text-ink-muted">0{index + 1}</span>
                  <span className="flex flex-col gap-1.5">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-ink-muted">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Block>
        </div>
      </article>

      <footer
        id="enquiry"
        aria-labelledby="enquiry-title"
        className="relative mt-[clamp(3rem,6vw,5rem)] overflow-hidden bg-inverse text-on-inverse"
      >
        <Fireflies count={6} />
        <div className="relative container-page pt-[clamp(5rem,9vw,8.75rem)] pb-9">
          <h2
            id="enquiry-title"
            className="max-w-[16ch] font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9] font-normal tracking-[-0.03em]"
          >
            Tell me about your <em className="text-spark italic">website</em>.
          </h2>

          <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-wrap gap-x-[clamp(2.5rem,6vw,7.5rem)] gap-y-12">
            <div className="max-w-[40rem] min-w-0 flex-[999_1_28rem]">
              <WebsiteEnquiry />
            </div>
            <div className="flex min-w-0 flex-[1_1_18rem] flex-col border-t border-inverse-line">
              {(
                [
                  ["WhatsApp", freelance.whatsapp, freelance.whatsappLink, true],
                  ["Email", site.email, `mailto:${site.email}`, false],
                ] as const
              ).map(([label, value, href, external]) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center justify-between gap-3 border-b border-inverse-line py-5 text-on-inverse no-underline"
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="eyebrow text-inverse-muted">{label}</span>
                    <span className="font-display text-[1.625rem] leading-tight [overflow-wrap:anywhere]">{value}</span>
                  </span>
                  <span className="transition-transform duration-300 ease-settle group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
              <p className="pt-5 text-small text-inverse-muted">
                <span className="text-spark">{freelance.offer}</span>, {freelance.offerNote}.
              </p>
            </div>
          </div>

          <div className="mt-[clamp(4rem,8vw,7rem)] flex flex-wrap justify-between gap-4 border-t border-inverse-line pt-4 font-mono text-label tracking-[0.04em] text-inverse-muted uppercase">
            <p>
              © 2026 {freelance.brand} · {site.name}
            </p>
            <Link href="/" className="no-underline hover:text-spark">
              See my portfolio ↗
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
