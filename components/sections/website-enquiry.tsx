"use client";

import { useId, useState } from "react";
import { Arrow } from "@/components/ui/icons";
import { site } from "@/lib/site";

const kinds = ["Business website", "Online store", "Portfolio site", "Fix or redesign"] as const;
type Kind = (typeof kinds)[number];

/**
 * The website enquiry on /websites. There is no form backend, so the form
 * writes the message for the visitor and the buttons open WhatsApp or their
 * mail app with it ready to send. Nothing is stored or sent from this page.
 */
export function WebsiteEnquiry() {
  const id = useId();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [kind, setKind] = useState<Kind | null>(null);
  const [details, setDetails] = useState("");

  const intro = name.trim() ? `Hi Saumya, I'm ${name.trim()}${business.trim() ? ` from ${business.trim()}` : ""}.` : "Hi Saumya,";
  const want = kind ? `I'd like a quote for a ${kind.toLowerCase()}.` : "I'd like a quote for a website.";
  const message = [intro, want, details.trim()].filter(Boolean).join("\n\n");

  const whatsapp = `${site.freelance.whatsappLink}?text=${encodeURIComponent(message)}`;
  const subject = kind ? `Website enquiry: ${kind}` : "Website enquiry";
  const email = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  const field =
    "min-h-12 w-full rounded-2xl border border-[#5e7a66] bg-transparent px-4 py-3 text-base text-on-inverse placeholder:text-inverse-muted/70 focus:border-spark focus:outline-none";

  return (
    <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2" htmlFor={`${id}-name`}>
          <span className="eyebrow text-inverse-muted">Your name</span>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-2" htmlFor={`${id}-business`}>
          <span className="eyebrow text-inverse-muted">Business (optional)</span>
          <input
            id={`${id}-business`}
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            autoComplete="organization"
            className={field}
          />
        </label>
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className="eyebrow mb-3 text-inverse-muted">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {kinds.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={kind === item}
              onClick={() => setKind(kind === item ? null : item)}
              className="min-h-11 rounded-full border border-[#5e7a66] px-4 text-[0.92rem] text-on-inverse transition-colors duration-200 ease-respond hover:border-spark aria-pressed:border-spark aria-pressed:bg-spark aria-pressed:font-medium aria-pressed:text-inverse max-sm:text-base"
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2" htmlFor={`${id}-details`}>
        <span className="eyebrow text-inverse-muted">A few lines about it (optional)</span>
        <textarea
          id={`${id}-details`}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={3}
          placeholder="What you sell or do, pages you need, any sites you like"
          className={`${field} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex min-h-14 items-center gap-3.5 rounded-full bg-spark py-1.5 pr-1.5 pl-6 font-semibold text-inverse no-underline transition-transform duration-200 active:scale-[0.98]"
        >
          Send on WhatsApp
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-full bg-inverse text-spark transition-transform duration-300 ease-settle group-hover:translate-x-1 group-hover:-rotate-12"
          >
            <Arrow />
          </span>
        </a>
        <a
          href={email}
          className="inline-flex min-h-14 items-center rounded-full border-[1.5px] border-[#5e7a66] px-6 font-medium text-on-inverse no-underline transition-colors duration-200 hover:border-spark"
        >
          Send by email
        </a>
      </div>
      <p className="text-small text-inverse-muted">Opens WhatsApp or your email app with your message ready to send.</p>
    </form>
  );
}
