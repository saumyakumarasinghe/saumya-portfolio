# Saumya Kumarasinghe — portfolio

"Field notes from the hill country": a nature-led portfolio for a backend-leaning
software engineer in Colombo. Two moods on one token set — **Mist** (light) and
**Night** (dark).

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript
- Tailwind CSS v4, configured CSS-first in `app/globals.css` (no `tailwind.config.ts`)
- Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync
- Fonts self-hosted with `next/font/local`: Instrument Serif, Instrument Sans, DM Mono (SIL OFL 1.1)

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) in production so canonical
links and social cards use the real domain.

## Where things live

```
app/
  globals.css        design tokens, Tailwind theme, base styles, utilities
  layout.tsx         fonts, metadata, theme script, Lenis provider, <body> structure
  fonts/             woff2 files + next/font declarations + licences
  icon.svg           favicon (leaf mark)
  page.tsx           home page: composes the sections below
  work/[slug]/       case-study pages (one per entry in lib/work.ts)
  not-found.tsx      404 page
components/
  providers/smooth-scroll.tsx   ReactLenis + GSAP ticker + ScrollTrigger sync
  theme/theme-toggle.tsx        Mist / Night switch with a circular dusk reveal
components/
  sections/          hero, readouts, work list, monsoon tank, plant, growth rings, contact…
  site/              header (with mobile menu), live Colombo clock
  ui/                icons, pills, placeholders, fireflies
  motion/reveal.tsx  scroll entrances (content is visible without JS)
lib/
  work.ts            the five projects: copy, facts, placeholders — edit here
  content.ts         home-page copy taken from the CV
  art.ts             generated contour and growth-ring paths
  site.ts            name, email, links, availability — edit facts here
  theme.ts           theme names, storage key, the no-flash inline script
  motion.ts          easing and duration tokens for GSAP
```

## Using the tokens

| Need                                | Utility                                                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Page / plate / hover backgrounds    | `bg-canvas`, `bg-surface`, `bg-surface-2`                                                                                           |
| Text                                | `text-ink`, `text-ink-muted`, `text-ink-subtle`                                                                                     |
| Hairlines / strong rules            | `border-line`, `border-line-strong`                                                                                                 |
| Italic headline word                | `emphasis` (or `text-emphasis`)                                                                                                     |
| Spark fill (tea bud / firefly)      | `bg-accent` with `text-on-accent`                                                                                                   |
| Diagram strokes, water, earth, wood | `stroke-diagram`, `bg-water`, `bg-earth`, `bg-wood`                                                                                 |
| Night band in both themes           | `bg-inverse`, `text-on-inverse`, `text-inverse-muted`                                                                               |
| Display sizes                       | `text-hero`, `text-section`, `text-note`, `text-figure`, `text-title`                                                               |
| Text sizes                          | `text-lead`, `text-body`, `text-small`, `eyebrow`                                                                                   |
| Layout                              | `container-page`, `px-gutter`, `py-section`, `max-w-page`                                                                           |
| Shapes                              | `rounded-full` (actions, tags), `rounded-pebble`, `rounded-plate` (media)                                                           |
| Motion                              | `ease-settle`, `ease-draw`, `ease-respond`, `animate-sway`, `animate-firefly`, `animate-breathe`, `animate-flow`, `animate-marquee` |
| Texture                             | `grain` (section), `grain-overlay` (full screen), `hatch` (placeholder frames)                                                      |

`dark:` variants follow the theme on `<html data-theme>`, not the operating system.
All ambient animation stops under `prefers-reduced-motion`, and Lenis turns its
smoothing off for those visitors too.

## Replacing placeholders

Everything marked `[ … ]` on the site is a reserved slot, not a fact.

- **Screenshots, diagrams, portrait:** the hatched frames. Put images in `public/work/<slug>/`
  and swap the `Placeholder` for `next/image` (screens are listed per project in `lib/work.ts`).
- **Sayaru role and stack:** `facts` in `lib/work.ts` (marked "confirm").
- **Cat boarding demo:** edit the last entry in `lib/work.ts`.
- **Availability note:** set `availability` in `lib/site.ts`; it stays hidden while `null`.
- **Contact:** there is no form backend, so the contact section opens an email with a prepared subject.
