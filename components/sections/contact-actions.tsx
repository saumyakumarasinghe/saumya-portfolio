"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/icons";
import { enquiryTopics } from "@/lib/content";
import { site } from "@/lib/site";

type Topic = (typeof enquiryTopics)[number];

function mailto(topic: Topic | null) {
  const subject = topic ? `Project enquiry — ${topic}` : "Project enquiry";
  const body = ["Hi Saumya,", "", "What I'm building:", "", "Where it hurts right now:", "", "Timeline:", ""].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * The enquiry starter. There is no form backend, so instead of a fake form
 * this prepares an email: pick what you need and the button opens your mail
 * app with a subject and a three-line outline ready to fill in.
 */
export function EnquiryPicker() {
  const [topic, setTopic] = useState<Topic | null>(null);

  return (
    <>
      <fieldset className="m-0 border-0 p-0">
        <legend className="eyebrow mb-3 text-inverse-muted">What do you need? (optional)</legend>
        <div className="flex flex-wrap gap-2">
          {enquiryTopics.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => setTopic(topic === item ? null : item)}
              className="min-h-[2.6rem] rounded-full border border-[#5e7a66] px-4 text-[0.92rem] text-on-inverse transition-colors duration-200 ease-respond hover:border-spark aria-pressed:border-spark aria-pressed:bg-spark aria-pressed:font-medium aria-pressed:text-inverse"
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>
      <a
        href={mailto(topic)}
        className="group inline-flex min-h-14 items-center gap-3.5 self-start rounded-full bg-spark py-1.5 pr-1.5 pl-6 font-semibold text-inverse no-underline transition-transform duration-200 active:scale-[0.98]"
      >
        {topic ? `Email me about ${topic.charAt(0).toLowerCase()}${topic.slice(1)}` : "Email me about your project"}
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-full bg-inverse text-spark transition-transform duration-300 ease-settle group-hover:translate-x-1 group-hover:-rotate-12"
        >
          <Arrow />
        </span>
      </a>
    </>
  );
}

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be blocked; the address is still selectable on the page.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="eyebrow min-h-[2.6rem] rounded-full border border-[#5e7a66] px-4 text-on-inverse transition-colors duration-200 hover:border-spark"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
    </button>
  );
}
