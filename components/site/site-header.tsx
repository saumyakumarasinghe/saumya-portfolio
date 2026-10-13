"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Arrow, LeafMark } from "@/components/ui/icons";
import { site } from "@/lib/site";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#tank", label: "The tank" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
] as const;

/**
 * Floating header. Transparent over the hero, a frosted bar once the page
 * moves, tucked away while reading downwards and back as soon as you scroll up.
 * Below `lg` the links move into a full-screen <dialog> menu.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const base = onHome ? "" : "/";

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 2 ? true : y < last - 2 ? false : (prev) => prev);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openMenu() {
    dialogRef.current?.showModal();
    lenis?.stop();
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-settle ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "border-b border-line bg-canvas/80 backdrop-blur-md" : "border-b border-transparent"}`}
      >
        <div className="container-page flex items-center justify-between gap-4 py-3.5 lg:py-4">
          <Link href={`${base}#top`} className="flex items-center gap-3 no-underline" aria-label={`${site.name} — home`}>
            <LeafMark />
            <span className="font-display text-[1.5rem] leading-none tracking-[-0.01em] max-[380px]:hidden">{site.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 text-small font-medium lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`${base}${item.href}`}
                className="relative no-underline after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 after:ease-settle hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle className="max-sm:hidden" />
            <Link
              href={`${base}#contact`}
              className="group hidden min-h-11 items-center gap-3 rounded-full bg-ink py-1 pr-1 pl-5 text-small font-medium text-canvas no-underline md:inline-flex"
            >
              Start a project
              <span className="grid size-9 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-300 ease-settle group-hover:translate-x-0.5">
                <Arrow size={14} />
              </span>
            </Link>
            <button
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              className="eyebrow inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 lg:hidden"
            >
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-ink" />
                <span className="block h-px w-4 bg-ink" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => lenis?.start()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-canvas p-0 text-ink backdrop:bg-ink/40 open:flex"
      >
        <div className="container-page flex w-full flex-col py-3.5">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <LeafMark />
              <span className="font-display text-[1.5rem] leading-none">{site.name}</span>
            </span>
            <button
              type="button"
              onClick={closeMenu}
              autoFocus
              className="eyebrow inline-flex min-h-11 items-center rounded-full border border-line-strong px-4"
            >
              Close
            </button>
          </div>
          <nav aria-label="Menu" className="mt-12 flex flex-col border-t border-line-strong">
            {[...nav, { href: "#contact", label: "Contact" }].map((item, index) => (
              <Link
                key={item.href}
                href={`${base}${item.href}`}
                onClick={closeMenu}
                className="flex items-baseline justify-between border-b border-line py-4 font-display text-[clamp(2.5rem,11vw,4rem)] leading-none no-underline"
              >
                {item.label}
                <span className="eyebrow text-ink-muted">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10 pb-4">
            <ThemeToggle />
            <a href={`mailto:${site.email}`} className="text-small text-ink-muted">
              {site.email}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
