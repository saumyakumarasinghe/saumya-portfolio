/**
 * Field notes: the work shown on the home page and at /work/[slug].
 *
 * Every claim comes from the CV or from the live client site. Anything that
 * still needs confirming is written as a visible "[ … ]" placeholder, so it
 * can't slip through as fact. Replace placeholders here; the pages follow.
 */

export type WorkKind = "client" | "professional" | "project" | "demo";

export type Screen = {
  /** Short label shown in the frame, e.g. "Checkout". */
  label: string;
  caption: string;
  /** Path under /public once a real screenshot exists, e.g. "/work/sayaru/checkout.webp". */
  src?: string;
  alt?: string;
};

export type Work = {
  slug: string;
  number: string;
  title: string;
  /** The part of the title set in italic emphasis on the case-study page. */
  emphasis?: string;
  kind: WorkKind;
  /** Tag on the work list, e.g. "Client · Live". */
  badge: string;
  summary: string;
  /** Big readout on the right of the work list. */
  readout: { value: string; unit?: string };
  /** Public link, only when one really exists. */
  url?: string;
  /** Lead paragraph at the top of the case study. */
  lead: string;
  facts: { label: string; value: string; confirm?: boolean }[];
  cover: { label: string; caption: string; src?: string; alt?: string };
  overview: string;
  problem: string;
  /** For team work: what Saumya did, kept separate from the product as a whole. */
  myPart?: string;
  built: string[];
  /** "flow" draws the Sayaru order flow; "placeholder" reserves a frame for a permitted diagram. */
  diagram: "flow" | "placeholder";
  diagramCaption: string;
  screens: Screen[];
  outcome: { headline: string; emphasis: string; text: string; placeholders: string[] };
  forYou: { text: string; tags: string[] };
};

export const work: Work[] = [
  {
    slug: "dinetap-wallet",
    number: "01",
    title: "DineTap Wallet",
    emphasis: "Wallet",
    kind: "professional",
    badge: "Professional · Dinetap",
    summary: "Distributed wallet platform — ledger mechanics and wallet workflows with strict concurrency controls.",
    readout: { value: "<100", unit: "ms" },
    lead: "Transactional ledger mechanics and secure wallet workflows for the DineTap platform, built to keep every balance correct under load.",
    facts: [
      { label: "Where", value: "Dinetap, Colombo" },
      { label: "Type", value: "Product team" },
      { label: "Stack", value: "TypeScript · Node.js · AWS Lambda · SQS · MongoDB" },
      { label: "Latency", value: "Sub-100 ms API responses" },
    ],
    cover: { label: "COVER · 21:9", caption: "A permitted product view or architecture diagram of the wallet platform." },
    overview:
      "DineTap's wallet platform handles high-volume weekly transactions. The ledger has to stay correct while many requests touch the same balances at once.",
    problem:
      "Money movement can't be approximately right. Concurrent writes to one wallet must never double-spend or lose an update, and the API still has to answer quickly.",
    myPart:
      "I built the transactional ledger mechanics and secure wallet workflows, with strict data-concurrency controls. The wider product is a team effort; this note covers my part.",
    built: [
      "Transactional ledger mechanics for wallet balances",
      "Secure wallet workflows with strict data-concurrency controls",
      "Event-driven processing on AWS Lambda and SQS",
      "MongoDB data model for high-volume weekly transactions",
    ],
    diagram: "placeholder",
    diagramCaption: "Architecture diagram — add one only if Dinetap permits it.",
    screens: [
      { label: "PERMITTED SCREEN", caption: "Wallet view, if it can be shown" },
      { label: "DIAGRAM", caption: "Ledger flow, if permitted" },
    ],
    outcome: {
      headline: "Under",
      emphasis: "100 ms",
      text: "Sub-100 ms API response latencies while processing high-volume weekly transactions.",
      placeholders: [],
    },
    forYou: {
      text: "For products that move money or credits — wallets, loyalty points, prepaid balances — where every transaction has to add up.",
      tags: ["Wallets & ledgers", "Payments", "Event-driven AWS", "Concurrency"],
    },
  },
  {
    slug: "sayaru-publishers",
    number: "02",
    title: "Sayaru Publishers",
    emphasis: "Publishers",
    kind: "client",
    badge: "Client · Live",
    summary: "A bilingual bookshop and publishing website — from catalogue to doorstep. Live at sayarupublishers.lk.",
    readout: { value: "In bloom" },
    url: "https://sayarupublishers.lk/",
    lead: "A bilingual bookshop and publishing website for a Sri Lankan publisher that sells its own titles directly — from catalogue to doorstep.",
    facts: [
      { label: "Client", value: "Sayaru Publishers" },
      { label: "Role", value: "[ Design & build — confirm ]", confirm: true },
      { label: "Stack", value: "Next.js · Supabase" },
      { label: "Languages", value: "English · Sinhala" },
      { label: "Status", value: "Live, taking orders" },
    ],
    cover: {
      label: "COVER · 21:9",
      caption: "The live home page — book of the month with its countdown, new on the shelf.",
    },
    overview:
      "Sayaru Publishers edits, designs, prints and publishes books, and sells every title directly through its own online bookshop. The site carries both sides of the business: a shop for readers and a services page for authors with a manuscript.",
    problem:
      "A publisher selling direct needs more than a catalogue. Readers browse in English or Sinhala, new titles take pre-orders before release, and payments arrive as bank transfers that someone has to check before a book ships.",
    built: [
      "Catalogue with categories, and search on a keyboard shortcut (/ to open, esc to close)",
      "Wishlist, cart, customer accounts and order history",
      "Pre-orders with a release countdown for the book of the month",
      "Checkout by bank transfer or branch deposit, with receipt upload for manual verification",
      "English and Sinhala throughout, with a language toggle",
      "Publishing services — editing, design, printing, publishing — with a manuscript enquiry",
    ],
    diagram: "flow",
    diagramCaption: "A receipt is checked by hand before an order ships; pre-orders wait for release day.",
    screens: [
      { label: "BOOK PAGE", caption: "Price, stock, wishlist" },
      { label: "CHECKOUT", caption: "Transfer and receipt upload" },
      { label: "SINHALA VIEW", caption: "Same page, other language" },
      { label: "PHONE", caption: "Mobile layout" },
    ],
    outcome: {
      headline: "In",
      emphasis: "bloom",
      text: "Live and taking orders and pre-orders at sayarupublishers.lk.",
      placeholders: ["A result you can share — orders, titles listed, time saved", "Client quote — only with their permission"],
    },
    forYou: {
      text: "For businesses that want their own online shop rather than a marketplace listing — with the payment methods their customers already use, and content in more than one language.",
      tags: ["Online shops", "Pre-orders & launches", "Bilingual sites", "Local payment flows"],
    },
  },
  {
    slug: "traveltales",
    number: "03",
    title: "TravelTales",
    emphasis: "Tales",
    kind: "project",
    badge: "Selected project",
    summary: "A server-rendered blogging platform with OAuth2, real-time country data and automated CDN caching.",
    readout: { value: "10k+", unit: "sessions" },
    lead: "A server-rendered blogging platform for travel stories, built to stay quick with thousands of readers at once.",
    facts: [
      { label: "Type", value: "Selected project" },
      { label: "Stack", value: "React · Next.js · Node.js" },
      { label: "Auth", value: "OAuth2" },
      { label: "Scale", value: "10,000+ concurrent sessions" },
    ],
    cover: { label: "COVER · 21:9", caption: "Screenshot of the home feed or a story page." },
    overview:
      "TravelTales is a dynamic, server-side rendered web application where people publish and read travel stories, with live information about the countries they visit.",
    problem:
      "A blog that gets shared widely has to serve sudden crowds without slowing down, while still showing fresh, personalised pages to signed-in writers.",
    built: [
      "Server-side rendering with React and Next.js on a Node.js backend",
      "OAuth2 sign-in",
      "Real-time country data alongside each story",
      "Automated CDN caching to absorb traffic",
    ],
    diagram: "placeholder",
    diagramCaption: "Architecture diagram — rendering, caching and auth.",
    screens: [
      { label: "HOME FEED", caption: "Stories and countries" },
      { label: "STORY PAGE", caption: "Reading view" },
      { label: "PHONE", caption: "Mobile layout" },
    ],
    outcome: {
      headline: "10,000+",
      emphasis: "sessions",
      text: "Built to handle more than 10,000 concurrent user sessions.",
      placeholders: ["Live demo or repository link, if public"],
    },
    forYou: {
      text: "For content sites and publications that need to be fast for readers, simple for writers, and ready for a busy day.",
      tags: ["Content platforms", "Next.js SSR", "Authentication", "Caching"],
    },
  },
  {
    slug: "cluster-forms",
    number: "04",
    title: "Cluster Forms",
    emphasis: "Forms",
    kind: "project",
    badge: "Selected project",
    summary: "TF-IDF and K-Means clustering that turns millions of open-ended form responses into themes.",
    readout: { value: "−65%" },
    lead: "A text-clustering web app that groups millions of open-ended form responses into themes, so people read patterns instead of rows.",
    facts: [
      { label: "Type", value: "Selected project" },
      { label: "Stack", value: "Next.js · Python · Flask · PostgreSQL" },
      { label: "Methods", value: "TF-IDF · K-Means" },
      { label: "Result", value: "65% less manual analysis" },
    ],
    cover: { label: "COVER · 21:9", caption: "Screenshot of clustered responses and their themes." },
    overview:
      "Cluster Forms is a full-stack application that reads free-text answers from forms and sorts them into groups of similar responses automatically.",
    problem:
      "Open-ended questions get the most honest answers and the most work: reading and tagging millions of them by hand is slow and inconsistent.",
    built: [
      "Full-stack app with a Next.js front end and a Python and Flask backend",
      "TF-IDF vectorisation of free-text responses",
      "K-Means clustering to group similar answers",
      "PostgreSQL storage for responses and results",
    ],
    diagram: "placeholder",
    diagramCaption: "Pipeline diagram — responses to vectors to clusters.",
    screens: [
      { label: "UPLOAD", caption: "Bring in form responses" },
      { label: "CLUSTERS", caption: "Themes and their answers" },
    ],
    outcome: {
      headline: "−65%",
      emphasis: "manual work",
      text: "Reduced manual analysis overhead by 65%.",
      placeholders: ["Live demo or repository link, if public"],
    },
    forYou: {
      text: "For teams sitting on survey answers, support tickets or feedback they never have time to read properly.",
      tags: ["Data tools", "Python & Flask", "Text analysis", "Dashboards"],
    },
  },
  {
    slug: "cat-boarding",
    number: "05",
    title: "[ Cat boarding ] website",
    kind: "demo",
    badge: "Seedling · in progress",
    summary: "Demo entry — a booking-first site for a cat boarding service. Swap in the real story, screens and link at launch.",
    readout: { value: "Soon" },
    lead: "[ Demo entry ] A booking-first website for a cat boarding service. Replace this note with the real project when it launches.",
    facts: [
      { label: "Client", value: "[ Client name ]", confirm: true },
      { label: "Role", value: "[ Your role ]", confirm: true },
      { label: "Stack", value: "[ Stack ]", confirm: true },
      { label: "Status", value: "In progress" },
    ],
    cover: { label: "COVER · 21:9", caption: "Home page of the cat boarding site, once it is live." },
    overview: "[ What the business does and who the site is for. ]",
    problem: "[ What made the old way of taking bookings hard. ]",
    built: ["[ Feature one ]", "[ Feature two ]", "[ Feature three ]"],
    diagram: "placeholder",
    diagramCaption: "Booking flow — add when the site is built.",
    screens: [
      { label: "HOME", caption: "First impression" },
      { label: "BOOKING", caption: "Dates, cats, confirmation" },
    ],
    outcome: {
      headline: "Coming",
      emphasis: "soon",
      text: "[ Launch date, link and one result you can share. ]",
      placeholders: ["Live link at launch", "Client quote — only with their permission"],
    },
    forYou: {
      text: "[ Who else this kind of site would help. ]",
      tags: ["Booking sites", "Small businesses"],
    },
  },
];

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}

export function nextWork(slug: string) {
  const index = work.findIndex((item) => item.slug === slug);
  return work[(index + 1) % work.length];
}
