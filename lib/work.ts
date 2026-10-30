/**
 * Field notes: the work shown on the home page and at /work/[slug].
 *
 * Every claim comes from the CV, the live client site or the project's own source. Anything that
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
  /** Path under /public to a short screen recording, e.g. "/work/sayaru/checkout.mp4". Takes the place of `src`. */
  video?: string;
  /** Still frame shown before the video plays. */
  poster?: string;
  /** "paper" sits the image on a paper-coloured plate, for logos with a transparent background. */
  tone?: "paper";
  /** CSS aspect-ratio of the frame, e.g. "1440 / 832". Defaults to 16 / 10 for screens and 4 / 5 for design work. */
  ratio?: string;
  /** Spans the full width of the grid, for a video. */
  wide?: boolean;
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
  /** Design work made for the project — logo, covers, layouts. Shown under the screens when present. */
  design?: Screen[];
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
    badge: "Co-founder · Live",
    summary: "A bilingual bookshop and publishing website — from catalogue to doorstep. Live at sayarupublishers.lk.",
    readout: { value: "In bloom" },
    url: "https://sayarupublishers.lk/",
    lead: "A bilingual bookshop and publishing website for Sayaru Publishers, the Sri Lankan publishing house I co-founded — it sells its own titles directly, from catalogue to doorstep.",
    facts: [
      { label: "Business", value: "Sayaru Publishers — one of six co-founders" },
      { label: "Role", value: "Co-founder and sole developer — site design, build and launch" },
      { label: "Stack", value: "Next.js 14 · TypeScript · PostgreSQL · Prisma · Supabase · Auth.js · Tailwind · Netlify" },
      { label: "Languages", value: "English · Sinhala" },
      // TODO(verify): CARD_PAYMENTS_ENABLED is still false on `staging`. Card checkout is described as arriving with the next release;
      // update this row and the "built" line once the flag is on and the PayHere merchant account is live.
      { label: "Payments", value: "Bank transfer · branch deposit · cards via PayHere from the next release" },
      // TODO(verify): launch date. Git history starts 2026-10-09, but the database migrations start 2026-09-07 and there is an
      // `archive/landing-page` tag, so the real start is earlier. Add a "Launched" row once the date is confirmed.
      { label: "Status", value: "Live at sayarupublishers.lk" },
    ],
    cover: {
      label: "COVER · 21:9",
      caption: "Three titles from the Sayaru shelf — White Camellia, Limerence and යදම්.",
      src: "/work/sayaru/cover-montage.webp",
      alt: "Three Sayaru Publishers book covers side by side: White Camellia, Limerence and යදම්.",
    },
    overview:
      "Sayaru Publishers is a book-selling and publishing business started by six co-founders, me included. It edits, designs, prints and publishes books, and sells every title directly through its own online bookshop. The site carries both sides of the business: a shop for readers and a services page for authors with a manuscript. Behind it sits an admin console the team runs the shop from.",
    problem:
      "A publisher selling direct needs more than a catalogue. Readers browse in English or Sinhala, new titles take pre-orders before release, and payments arrive as bank transfers that someone has to check before a book ships. Pre-orders also tell the publisher how many copies to print, so every copy owed has to be counted and held back for the buyer who paid.",
    myPart:
      "I designed and built the whole website on my own — storefront, admin console, database, email and hosting — and took it to production. Beyond the site, I designed the සයරු Publishers logo, and I do the book layout and cover design for Sayaru's titles.",
    // TODO(verify): everything below is read from the `staging` branch (3d243d2, 2026-10-20), which goes to production on 2026-10-30.
    // Confirm the release has shipped before this site goes live.
    built: [
      "Catalogue with categories, search on a keyboard shortcut (/ to open, esc to close), and a one-row filter rail on phones",
      "Wishlist, cart, customer accounts, saved addresses and order history; customers can delete their own account, and sign-up catches misspelled email providers",
      "Pre-orders that open and close at set times in Sri Lanka time, with a release countdown, a release calendar, and a pre-order or sale discount per book",
      "Pre-orders counted as print-run demand: copies owed to paid pre-orders are held back, and stock can run below zero while a title is still being printed",
      "Checkout by bank transfer or branch deposit, with the receipt size checked in the browser before upload and verified by hand",
      "Card and online-banking checkout through PayHere, built alongside the deposit flow and switching on with the next release",
      "English and Sinhala throughout, with a language toggle",
      "Publishing services — editing, design, printing, publishing — with a manuscript enquiry",
      "Admin dashboard with week, month, quarter and year history against the previous period, and a strip of what needs attention today",
      "Payments queue for deposit slips; orders with permanent numbers, Excel export and a printable A5 parcel label with packing slip",
      "Stock ledger: every change logged against a note or an order, with per-book history and an Excel stock report",
      "Home banners the team schedules, themes and writes in Sinhala themselves, for a book of the month or any announcement",
      "Order-confirmation emails through Resend, password reset, and book covers uploaded straight to Supabase Storage",
      "Error tracking with Sentry and 35 test files; deployed to Netlify through GitHub Actions, with database migrations applied before every release",
    ],
    diagram: "flow",
    diagramCaption: "A receipt is checked by hand before an order ships; pre-orders wait for release day.",
    // Captured from the live site on 2026-10-30, before the staging release. The phone numbers in the top bar are hidden.
    // TODO(verify): re-capture after the release so the screens match what is live. Checkout, order and admin screens need an
    // account and an order, so they are not captured yet.
    screens: [
      {
        label: "WALKTHROUGH",
        caption: "Home, catalogue and a book page",
        video: "/work/sayaru/walkthrough.mp4",
        poster: "/work/sayaru/shot-home.webp",
        alt: "Screen recording of sayarupublishers.lk: scrolling the home page, opening the catalogue, then a book page.",
        ratio: "1280 / 760",
        wide: true,
      },
      {
        label: "HOME",
        caption: "The book of the month and its pre-order status",
        src: "/work/sayaru/shot-home.webp",
        alt: "Sayaru home page showing White Camellia as the October book of the month, with a closed pre-order notice.",
        ratio: "1440 / 832",
      },
      {
        label: "CATALOGUE",
        caption: "Search, categories and stock labels",
        src: "/work/sayaru/shot-catalogue.webp",
        alt: "Sayaru catalogue page with a search box, category chips and book cards.",
        ratio: "1440 / 832",
      },
      {
        label: "BOOK PAGE",
        caption: "Price, stock, wishlist",
        src: "/work/sayaru/shot-book.webp",
        alt: "Limerence book page showing the cover, description, price and a sold-out label.",
        ratio: "1440 / 832",
      },
      {
        label: "SINHALA VIEW",
        caption: "Same page, other language",
        src: "/work/sayaru/shot-book-si.webp",
        alt: "The Limerence book page with the whole interface switched to Sinhala.",
        ratio: "1440 / 832",
      },
      {
        label: "PHONE · BOOK",
        caption: "Mobile layout",
        src: "/work/sayaru/shot-mobile-book.webp",
        alt: "White Camellia book page on a phone.",
        ratio: "780 / 1688",
      },
      {
        label: "PHONE · CATALOGUE",
        caption: "Mobile catalogue with a search button",
        src: "/work/sayaru/shot-mobile-catalogue.webp",
        alt: "Sayaru catalogue on a phone, with category chips and two book cards.",
        ratio: "780 / 1688",
      },
    ],
    // TODO(verify): the captions below name the titles only. Say which covers and layouts are yours before claiming them one by one.
    design: [
      {
        label: "LOGO",
        caption: "The සයරු Publishers mark",
        src: "/work/sayaru/logo.webp",
        alt: "The සයරු Publishers logo: a gold fountain pen rising from an open book, framed by crimson petals.",
        tone: "paper",
      },
      {
        label: "COVER",
        caption: "White Camellia · Aurora Writes",
        src: "/work/sayaru/cover-white-camellia.webp",
        alt: "White Camellia book cover: a young couple holding white camellias against a plum background with falling petals.",
      },
      {
        label: "COVER",
        caption: "Limerence · M.N.K. Sathsarani",
        src: "/work/sayaru/cover-limerence.webp",
        alt: "Limerence book cover: a silhouetted woman beneath a crescent moon, with the title in gold lettering on a dusk-purple ground.",
      },
      {
        label: "COVER",
        caption: "යදම් · Mihiranga Lakmal",
        src: "/work/sayaru/cover-yadam.webp",
        alt: "යදම් book cover: the title in gold Sinhala lettering, with a gold chain and red roses on cream paper.",
      },
    ],
    outcome: {
      headline: "In",
      emphasis: "bloom",
      text: "Live at sayarupublishers.lk, selling direct with pre-orders and bank-transfer checkout, with card payments to follow. Behind the shop: 13 database models, 25 migrations, 46 API routes and 35 test files.",
      // TODO(verify): no orders, sales or traffic figures are in the code or on the site, so none are claimed. Add one only if you
      // are happy to share it.
      placeholders: ["A result you can share — orders, titles listed, time saved"],
    },
    forYou: {
      text: "For businesses that want their own online shop rather than a marketplace listing — with the payment methods their customers already use, content in more than one language, and an admin side that keeps orders and stock under control.",
      tags: ["Online shops", "Pre-orders & launches", "Bilingual sites", "Local payment flows", "Admin & stock tools"],
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
