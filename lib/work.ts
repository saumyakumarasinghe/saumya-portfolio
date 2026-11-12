/**
 * Projects: the work shown on the home page and at /work/[slug].
 *
 * Every claim comes from the CV, the live client site or the project's own source. Anything that
 * still needs confirming is written as a visible "[ … ]" placeholder, so it
 * can't slip through as fact. Replace placeholders here; the pages follow.
 */

/** "wip" is real work still being built: shown with the seedling badge, but indexed (unlike "demo"). */
export type WorkKind = "client" | "professional" | "project" | "wip" | "demo";

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
  /**
   * "flow" draws the Sayaru order flow; "pipeline" draws `pipeline` as a row of steps;
   * "placeholder" reserves a frame for a permitted diagram.
   */
  diagram: "flow" | "pipeline" | "placeholder";
  /** Heading for the diagram block; defaults to "How it fits together". */
  diagramTitle?: string;
  /** Steps for `diagram: "pipeline"`. `accent` marks the key step; `planned` a step not built yet. */
  pipeline?: { label: string; steps: { text: string; accent?: boolean; planned?: boolean }[] };
  diagramCaption: string;
  screens: Screen[];
  /** Design work made for the project — logo, covers, layouts. Shown under the screens when present. */
  design?: Screen[];
  /** Extra galleries after the screens, e.g. an admin console or figures from a thesis. */
  galleries?: { number: string; lead: string; emphasis: string; note?: string; items: Screen[] }[];
  outcome: { headline: string; emphasis: string; text: string; placeholders: string[] };
  forYou: { text: string; tags: string[] };
};

export const work: Work[] = [
  {
    slug: "sayaru-publishers",
    number: "01",
    title: "Sayaru Publishers",
    emphasis: "Publishers",
    kind: "client",
    badge: "Head of IT · Live",
    summary: "A bilingual bookshop and publishing website, from catalogue to doorstep. Live at sayarupublishers.lk.",
    readout: { value: "Live" },
    url: "https://sayarupublishers.lk/",
    lead: "A bilingual bookshop and publishing website for Sayaru Publishers, the Sri Lankan publishing house where I am Head of IT. It sells its own titles directly, from catalogue to doorstep.",
    facts: [
      { label: "Business", value: "Sayaru Publishers, a Sri Lankan publishing house" },
      { label: "Role", value: "Head of IT and sole developer: site design, build, launch and running it" },
      { label: "Stack", value: "Next.js 14 · TypeScript · PostgreSQL · Prisma · Supabase · Auth.js · Tailwind · Netlify" },
      { label: "Languages", value: "English · Sinhala" },
      // TODO(verify): update this row and the "built" line once Payzy approves the merchant account and card payments go live.
      { label: "Payments", value: "Bank transfer · branch deposit · Payzy card payments awaiting provider approval" },
      // TODO(verify): launch date. Git history starts 2026-10-09, but the database migrations start 2026-09-07 and there is an
      // `archive/landing-page` tag, so the real start is earlier. Add a "Launched" row once the date is confirmed.
      { label: "Status", value: "Live at sayarupublishers.lk" },
    ],
    cover: {
      label: "COVER · 21:9",
      caption: "Three titles from the Sayaru shelf: White Camellia, Limerence and යදම්.",
      src: "/work/sayaru/cover-montage.webp",
      alt: "Three Sayaru Publishers book covers side by side: White Camellia, Limerence and යදම්.",
    },
    overview:
      "Sayaru Publishers is a book-selling and publishing business. It edits, designs, prints and publishes books, and sells every title directly through its own online bookshop. The site carries both sides of the business: a shop for readers and a services page for authors with a manuscript. Behind it sits an admin console the team runs the shop from.",
    problem:
      "A publisher selling direct needs more than a catalogue. Readers browse in English or Sinhala, new titles take pre-orders before release, and payments arrive as bank transfers that someone has to check before a book ships. Pre-orders also tell the publisher how many copies to print, so every copy owed has to be counted and held back for the buyer who paid.",
    myPart:
      "As Head of IT I am Sayaru's only developer. I designed and built the whole website on my own, from the storefront and admin console to the database, email and hosting, took it to production, and keep it running.",
    // TODO(verify): everything below is read from the `staging` branch (3d243d2, 2026-10-20), which goes to production on 2026-10-30.
    // Confirm the release has shipped before this site goes live.
    built: [
      "Catalogue with categories, search on a keyboard shortcut (/ to open, esc to close), and a one-row filter rail on phones",
      "Wishlist, cart, customer accounts, saved addresses and order history; customers can delete their own account, and sign-up catches misspelled email providers",
      "Pre-orders that open and close at set times in Sri Lanka time, with a release countdown, a release calendar, and a pre-order or sale discount per book",
      "Pre-orders counted as print-run demand: copies owed to paid pre-orders are held back, and stock can run below zero while a title is still being printed",
      "Checkout by bank transfer or branch deposit, with the receipt size checked in the browser before upload and verified by hand",
      "Card payments through Payzy, waiting on the provider's approval to go live",
      "English and Sinhala throughout, with a language toggle",
      "Publishing services (editing, design, printing and publishing) with a manuscript enquiry",
      "Admin dashboard with week, month, quarter and year history against the previous period, and a strip of what needs attention today",
      "Payments queue for deposit slips; orders with permanent numbers, Excel export and a printable A5 parcel label with packing slip",
      "Stock ledger: every change logged against a note or an order, with per-book history and an Excel stock report",
      "Home banners the team schedules, themes and writes in Sinhala themselves, for a book of the month or any announcement",
      "Order-confirmation emails through Resend, password reset, and book covers uploaded straight to Supabase Storage",
      "Error tracking with Sentry and 35 test files; deployed to Netlify through GitHub Actions, with database migrations applied before every release",
    ],
    diagram: "flow",
    diagramCaption: "A receipt is checked by hand before an order ships; pre-orders wait for release day.",
    // Storefront stills: the live site on 2026-11-10, phone numbers in the top bar hidden.
    // Walkthrough, cart, checkout and admin: a local copy with a temporary database and sample data (fictional customers,
    // sample deposit slips), captured 2026-11-10. Production was not touched.
    screens: [
      {
        label: "WALKTHROUGH",
        caption: "Shop, sign in, then the admin console",
        video: "/work/sayaru/v2/walkthrough.mp4",
        poster: "/work/sayaru/v2/poster.webp",
        alt: "Screen recording: the home page with the book-of-the-month banner, the catalogue, a book page, signing in, then the admin dashboard, payments queue, orders and stock.",
        ratio: "1280 / 760",
        wide: true,
      },
      {
        label: "HOME",
        caption: "Hero and what's coming up next",
        src: "/work/sayaru/v2/shot-home.webp",
        alt: "Sayaru home page: the headline 'Bringing stories to life, inspiring generations', catalogue and sign-up buttons, and a 'Coming up' card for the Cherry Blossom pre-order.",
        ratio: "1440 / 832",
      },
      {
        label: "CATALOGUE",
        caption: "Search, categories and stock labels",
        src: "/work/sayaru/v2/shot-catalogue.webp",
        alt: "Sayaru catalogue page with a search box, category chips and book cards.",
        ratio: "1440 / 832",
      },
      {
        label: "BOOK PAGE",
        caption: "Price, stock, wishlist",
        src: "/work/sayaru/v2/shot-book.webp",
        alt: "Limerence book page showing the cover, description, price and a sold-out label.",
        ratio: "1440 / 832",
      },
      {
        label: "SINHALA VIEW",
        caption: "Same page, other language",
        src: "/work/sayaru/v2/shot-book-si.webp",
        alt: "The Limerence book page with the whole interface switched to Sinhala.",
        ratio: "1440 / 832",
      },
      {
        label: "RELEASE CALENDAR",
        caption: "Countdown to the next pre-order",
        src: "/work/sayaru/v2/shot-calendar.webp",
        alt: "Sayaru release calendar: a countdown to Cherry Blossom pre-orders opening, a month calendar and the list of upcoming events.",
        ratio: "1440 / 832",
      },
      {
        label: "CART",
        caption: "Basket, delivery and total",
        src: "/work/sayaru/v2/c-cart.webp",
        alt: "Cart with one copy of Limerence, the delivery charge and a Continue to checkout button.",
        ratio: "1440 / 832",
      },
      {
        label: "CHECKOUT",
        caption: "Saved address and delivery method",
        src: "/work/sayaru/v2/c-checkout.webp",
        alt: "Checkout delivery step with a saved home address selected, standard delivery and an order summary.",
        ratio: "1440 / 832",
      },
      {
        label: "ORDER HISTORY",
        caption: "Pre-orders and delivered orders",
        src: "/work/sayaru/v2/c-orders.webp",
        alt: "Customer order history listing a White Camellia pre-order being packed and a delivered order, each with a receipt link.",
        ratio: "1440 / 832",
      },
      {
        label: "PHONE · BOOK",
        caption: "Mobile layout",
        src: "/work/sayaru/v2/shot-mobile-book.webp",
        alt: "White Camellia book page on a phone.",
        ratio: "780 / 1688",
      },
      {
        label: "PHONE · CATALOGUE",
        caption: "Mobile catalogue with a search button",
        src: "/work/sayaru/v2/shot-mobile-catalogue.webp",
        alt: "Sayaru catalogue on a phone, with category chips and two book cards.",
        ratio: "780 / 1688",
      },
    ],
    galleries: [
      {
        number: "05a",
        lead: "Admin",
        emphasis: "console",
        note: "From a local copy with sample data: the customers and deposit slips are fictional.",
        items: [
          {
            label: "DASHBOARD",
            caption: "What needs attention today, and the month so far",
            src: "/work/sayaru/v2/a-dashboard.webp",
            alt: "Admin dashboard: tiles for slips to verify, orders to pack, sold-out and running-low titles, and revenue, orders and copies sold for November against October.",
            ratio: "1440 / 832",
          },
          {
            label: "REVENUE",
            caption: "Month against month, and best sellers",
            src: "/work/sayaru/v2/a-dashboard-chart.webp",
            alt: "Dashboard revenue chart comparing November with October, with best sellers and revenue by category below.",
            ratio: "1440 / 832",
          },
          {
            label: "PAYMENTS",
            caption: "Deposit slips waiting to be checked",
            src: "/work/sayaru/v2/a-payments.webp",
            alt: "Payments queue with two bank deposits pending review, each with amount, reference and Mark paid or Reject buttons.",
            ratio: "1440 / 832",
          },
          {
            label: "ORDERS",
            caption: "Every order, filterable and exportable",
            src: "/work/sayaru/v2/a-orders.webp",
            alt: "Admin orders table with order numbers, customers, totals, books, status and payment review, plus filters and an Excel download.",
            ratio: "1440 / 832",
          },
          {
            label: "ORDER DETAIL",
            caption: "Status, tracking and delivery details",
            src: "/work/sayaru/v2/a-order-drawer.webp",
            alt: "Order drawer for a shipped order: status, edit tracking, customer and delivery details, and a timeline.",
            ratio: "1440 / 832",
          },
          {
            label: "STOCK",
            caption: "A ledger behind every copy",
            src: "/work/sayaru/v2/a-stock.webp",
            alt: "Stock page: copies on the shelves, shelf value and earnings, with per-title sold, pre-order and add or remove stock controls.",
            ratio: "1440 / 832",
          },
          {
            label: "BOOKS",
            caption: "Publish, hide and end pre-orders",
            src: "/work/sayaru/v2/a-books.webp",
            alt: "Admin books list with price, stock and status for White Camellia, Limerence and යදම්.",
            ratio: "1440 / 832",
          },
          {
            label: "PARCEL LABEL",
            caption: "Printable invoice and label",
            src: "/work/sayaru/v2/a-invoice.webp",
            alt: "Printable invoice and parcel label with the delivery address, items and a prepaid, do-not-collect-cash note.",
            ratio: "1440 / 832",
          },
        ],
      },
    ],
    outcome: {
      headline: "Live and",
      emphasis: "selling",
      text: "Live at sayarupublishers.lk, selling direct with pre-orders and bank-transfer checkout, with card payments to follow. Behind the shop: 13 database models, 25 migrations, 46 API routes and 35 test files.",
      // TODO(verify): no orders, sales or traffic figures are in the code or on the site, so none are claimed. Add one only if you
      // are happy to share it.
      placeholders: ["A result you can share: orders, titles listed, time saved"],
    },
    forYou: {
      text: "For businesses that want their own online shop rather than a marketplace listing, with the payment methods their customers already use, content in more than one language, and an admin side that keeps orders and stock under control.",
      tags: ["Online shops", "Pre-orders & launches", "Bilingual sites", "Local payment flows", "Admin & stock tools"],
    },
  },
  {
    slug: "cluster-forms",
    number: "02",
    title: "Cluster Forms",
    emphasis: "Forms",
    kind: "project",
    badge: "Final-year project",
    summary: "A Flask API and Next.js app that groups open-ended Google Form answers into themes with NLP and K-Means.",
    readout: { value: "FYP" },
    lead: "My final-year project: paste a Google Sheet link and pick a column, and it groups the free-text answers into clusters, writes each group back to the sheet as its own tab and returns a chart of how they split.",
    facts: [
      { label: "Type", value: "Final-year project · BEng (Hons) Software Engineering, University of Westminster (through IIT)" },
      { label: "Thesis", value: "ClusterForm: Automated categorization of form textual responses using K-means" },
      { label: "Supervisor", value: "Dr. Ruvan Weerasinghe" },
      { label: "Role", value: "Sole developer: API, clustering pipeline and front end" },
      { label: "Built", value: "January to July 2025" },
      { label: "API", value: "Python · Flask · Flask-RESTX (Swagger) · scikit-learn · NLTK · pandas · Matplotlib" },
      { label: "Front end", value: "Next.js · React · TypeScript · Tailwind CSS · React Hook Form · Zod" },
      { label: "Data", value: "Google Sheets API through a service account" },
      { label: "Evaluated by", value: "10 experts (5 technical, 5 domain) and a focus group of 4 form administrators" },
    ],
    cover: {
      label: "COVER · 21:9",
      caption: "The ClusterForm landing page.",
      src: "/work/cluster-forms/cover.webp",
      alt: "ClusterForm landing page: 'Welcome to ClusterForm', a short description, a 'Try it out' button and a network graph of clustered points.",
    },
    overview:
      "ClusterForm reads the answers to one open-ended question straight from the Google Sheet behind a form. It cleans them, turns them into vectors, finds a sensible number of groups on its own and sorts every answer into one. The results go back into the same spreadsheet, one tab per cluster, with a chart and summary figures in the app.",
    problem:
      "Open-ended questions get the most honest answers and the most work. Reading and tagging hundreds of responses by hand is slow and inconsistent, so most of what people write in a form's free-text boxes is never properly read.",
    myPart:
      "This was an individual project. I designed and built both parts on my own: the Flask API with its clustering pipeline, and the Next.js front end that walks people through sharing their sheet.",
    built: [
      "A Flask REST API with interactive Swagger documentation (Flask-RESTX), request validation and a health check",
      "Reads the chosen column straight from Google Sheets through a service account, and writes each cluster back as its own tab",
      "Text preparation with NLTK: cleaning, stop-word removal and Porter stemming, with a summary of what was dropped",
      "TF-IDF vectors over one- to three-word phrases, standardised and reduced with PCA",
      "Chooses the number of clusters automatically by silhouette score, then reports Calinski–Harabasz and Davies–Bouldin scores",
      "A cluster-distribution chart drawn with Matplotlib and compressed to WebP before it is sent back",
      "A Next.js and TypeScript front end with form validation (React Hook Form and Zod) and a guided sharing step",
      "Started on DBSCAN, then moved to K-Means with automatic cluster selection after a technical review",
    ],
    diagram: "pipeline",
    diagramTitle: "From sheet to themes",
    pipeline: {
      label: "Clustering pipeline · API",
      steps: [
        { text: "Google Sheet" },
        { text: "Clean · stem" },
        { text: "TF-IDF" },
        { text: "PCA" },
        { text: "K-Means", accent: true },
        { text: "Sheet + chart" },
      ],
    },
    diagramCaption: "The number of clusters is chosen by silhouette score; results go back into the same sheet.",
    // Captured on 2026-11-10 from a local run with sample data; Google Sheets was swapped for a local file for the capture only.
    // Evaluation figures below are from the thesis (Chapters 8 and 9, July 2025).
    screens: [
      {
        label: "WALKTHROUGH",
        caption: "From the landing page to the results",
        video: "/work/cluster-forms/v2/walkthrough.mp4",
        poster: "/work/cluster-forms/v2/poster.webp",
        alt: "Screen recording with sample data: the landing page, the sharing instructions, entering a sheet link and column, the loading spinner, then the cluster chart.",
        ratio: "1280 / 760",
        wide: true,
      },
      {
        label: "LANDING",
        caption: "What it does, in one screen",
        src: "/work/cluster-forms/shot-landing.webp",
        alt: "ClusterForm landing page with a description of the tool and a 'Try it out' button.",
        ratio: "1440 / 832",
      },
      {
        label: "INPUT",
        caption: "A sheet link and the column to cluster",
        src: "/work/cluster-forms/shot-form.webp",
        alt: "ClusterForm input form with a Google Sheets link and column B filled in, and a Submit button.",
        ratio: "1440 / 832",
      },
      {
        label: "API DOCS",
        caption: "Swagger docs for the clustering endpoint",
        src: "/work/cluster-forms/shot-api-docs.webp",
        alt: "Swagger UI for the ClusterForm API showing POST /form/clustering with request and response examples.",
        ratio: "1440 / 832",
      },
    ],
    galleries: [
      {
        number: "05a",
        lead: "From the",
        emphasis: "thesis",
        note: "Figures from my dissertation, July 2025.",
        items: [
          {
            label: "ARCHITECTURE",
            caption: "Presentation, logic and data layers",
            src: "/work/cluster-forms/thesis/architecture.webp",
            alt: "Three-layer architecture: Next.js pages in the presentation layer; Google service API, data fetch, preprocessing and clustering modules in the logic layer; the Google Sheet as the data layer.",
            ratio: "1287 / 1470",
            tone: "paper",
          },
          {
            label: "PROCESS",
            caption: "From sheet link to clustered output",
            src: "/work/cluster-forms/thesis/workflow.webp",
            alt: "Process flowchart: open the home page, give access to the spreadsheet, enter the sheet link and column, fetch data, preprocess, cluster and output the results.",
            ratio: "1106 / 1267",
            tone: "paper",
          },
          {
            label: "USE CASES",
            caption: "What a form admin can do",
            src: "/work/cluster-forms/thesis/usecase.webp",
            alt: "Use case diagram: a user uploads a sheet link, selects a column and views clustered responses; validation, preprocessing and error handling sit behind them.",
            ratio: "1459 / 1096",
            tone: "paper",
          },
          {
            label: "STACK",
            caption: "Three tiers of tools",
            src: "/work/cluster-forms/thesis/stack.webp",
            alt: "Technology stack by tier: Next.js, JavaScript, HTML, CSS and Tailwind; Python, Flask, Swagger, Postman, NumPy and Google APIs; GitHub, Git and Google Drive.",
            ratio: "1302 / 1302",
            tone: "paper",
          },
          {
            label: "DATA CLEANING",
            caption: "Printed by the API on each run",
            src: "/work/cluster-forms/thesis/data-cleaning.webp",
            alt: "Terminal output: a data cleaning summary with null and empty counts before and after cleaning, and the final dataset size.",
            ratio: "510 / 190",
          },
          {
            label: "QUALITY METRICS",
            caption: "Scores reported for each run",
            src: "/work/cluster-forms/thesis/quality-metrics.webp",
            alt: "Terminal output: the number of clusters chosen and the silhouette, Calinski–Harabasz and Davies–Bouldin scores for a run.",
            ratio: "417 / 119",
          },
        ],
      },
    ],
    outcome: {
      headline: "Rated",
      emphasis: "easy to use",
      text: "Submitted in July 2025 and evaluated by ten experts and a focus group of four non-technical Google Form administrators. Usability was rated high: the group called the input “clear and straightforward” and processing “quick and seamless”. In performance testing the API returned results in about 2.6 seconds. I’m now preparing it for publication.",
      placeholders: [],
    },
    forYou: {
      text: "For teams sitting on survey answers, support tickets or feedback they never have time to read properly.",
      tags: ["Data tools", "Python & Flask", "Text analysis", "REST APIs"],
    },
  },
  {
    slug: "fluffinton",
    number: "03",
    title: "Fluffinton",
    kind: "wip",
    badge: "In progress",
    summary:
      "A booking-first website for a cat hotel in Maharagama, with an animated mascot, a custom date picker and cat sounds made in the browser.",
    readout: { value: "Soon" },
    url: "https://fluffinton.netlify.app/",
    lead: "A website for Fluffinton, a cat hotel in Maharagama. It shows the suites and a day at the hotel, introduces the care team, and takes booking requests.",
    facts: [
      { label: "Business", value: "Fluffinton, a cat boarding service in Maharagama" },
      { label: "Role", value: "Developer, built with Heshan Rajapaksha" },
      { label: "Stack", value: "Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Lenis · Google Maps · Netlify" },
      { label: "Status", value: "Design done, most of the site built; booking backend and custom domain next" },
    ],
    cover: {
      label: "COVER · 21:9",
      caption: "The Fluffinton home page, with the mascot on its cloud.",
      src: "/work/fluffinton/cover.webp",
      alt: "Fluffinton home page: the headline 'The Purrfect Getaway', Book a stay and Tour the suites buttons, and the white kitten mascot sitting on a cloud under a ball of yarn.",
    },
    overview:
      "Fluffinton is an everyday cat hotel that any cat can enjoy. The site is its front door: four suites, a day at the hotel from morning to evening, the care team, and a booking request with a map.",
    problem:
      "Cat owners book on trust. Before they hand over their cat they want to see where it will sleep and who will look after it. The site has to feel warm and calm, work on any phone, and make asking for dates quick.",
    myPart:
      "Heshan Rajapaksha and I are building Fluffinton together. I write the code: the sections, the animated mascot, the booking form and date picker, the map, and the responsive and accessibility pass.",
    built: [
      "An animated SVG mascot drawn in code from the logo: it blinks, follows the pointer and meows when petted",
      "A suites rail that drags and swipes, and slides a card into view when it gets keyboard focus",
      '"A day at Fluffinton": morning-to-evening cat sounds synthesised with the Web Audio API, with no audio files',
      "A booking request form with a custom date-range picker and a live stay summary; the booking backend comes next",
      "A Google Map styled to the brand, with a paw pin",
      "Day and night themes, smooth scrolling with Lenis, and GSAP animation that respects reduced motion",
      "A responsive audit at 12 screen sizes, from 320 px phones to 2560 px wide screens, with 44 px touch targets",
      "Prettier and ESLint, and a script that rebuilds the logo, favicon and app icons from one source file",
    ],
    diagram: "pipeline",
    diagramTitle: "Asking for a stay",
    pipeline: {
      label: "Booking request · as it works today",
      steps: [
        { text: "Cat's name" },
        { text: "Check-in → check-out" },
        { text: "Suite" },
        { text: "Stay summary", accent: true },
        { text: "Send request" },
        { text: "Booking backend", planned: true },
      ],
    },
    diagramCaption: "The form shows a confirmation today; saving requests to a booking backend is the next step.",
    // Captured on 2026-11-10 from a local production build of the `staging` branch. The map needs an API key, so it shows its fallback.
    screens: [
      {
        label: "WALKTHROUGH",
        caption: "Hero, suites, a day at Fluffinton, booking and the footer cat",
        video: "/work/fluffinton/v2/walkthrough.mp4",
        poster: "/work/fluffinton/v2/poster.webp",
        alt: "Screen recording: the hero with the mascot, dragging the suites rail, the daily rituals, filling in the booking form with the date picker, and the footer cat peeking up.",
        ratio: "1280 / 760",
        wide: true,
      },
      {
        label: "HOME",
        caption: "The Purrfect Getaway, and the mascot",
        src: "/work/fluffinton/shot-home.webp",
        alt: "Fluffinton home page with the headline 'The Purrfect Getaway' and the kitten mascot on a cloud.",
        ratio: "1440 / 832",
      },
      {
        label: "SUITES",
        caption: "A rail you can drag or swipe",
        src: "/work/fluffinton/shot-suites.webp",
        alt: "Suites section: 'Suites they'll pretend not to love', with cards for The Window Seat, The Cloud Loft and The Reading Nook.",
        ratio: "1440 / 832",
      },
      {
        label: "DAILY RITUALS",
        caption: "Morning to evening, with sound",
        src: "/work/fluffinton/shot-rituals.webp",
        alt: "'A day at Fluffinton' section: a list of morning, midday, afternoon and evening rituals beside an illustrated kitten stretching in the sun.",
        ratio: "1440 / 832",
      },
      {
        label: "CARE TEAM",
        caption: "The people behind it",
        src: "/work/fluffinton/shot-care.webp",
        alt: "'Every whisker, noticed' care team section with illustrated portraits of Heshan and Saumya.",
        ratio: "1440 / 832",
      },
      {
        label: "BOOKING",
        caption: "Custom date-range picker",
        src: "/work/fluffinton/shot-booking.webp",
        alt: "Booking form with the cat's name filled in and a two-month date picker showing a four-night stay selected.",
        ratio: "1440 / 832",
      },
      {
        label: "FOOTER",
        caption: "The cat that peeks over the edge",
        src: "/work/fluffinton/shot-footer.webp",
        alt: "Night-blue footer with the mascot peeking over a frosted glass panel of links, address and contact details.",
        ratio: "1440 / 832",
      },
      {
        label: "PHONE · HOME",
        caption: "Mobile layout",
        src: "/work/fluffinton/shot-mobile-home.webp",
        alt: "Fluffinton home page on a phone.",
        ratio: "780 / 1688",
      },
      {
        label: "PHONE · SUITES",
        caption: "Swipe through the suites",
        src: "/work/fluffinton/shot-mobile-suites.webp",
        alt: "The suites rail on a phone.",
        ratio: "780 / 1688",
      },
    ],
    outcome: {
      headline: "Almost",
      emphasis: "there",
      text: "The design is done and most of the site is built. Next come the booking backend, the final content and a domain of its own.",
      placeholders: ["Live link on its own domain at launch"],
    },
    forYou: {
      text: "For small service businesses, such as boarding, grooming or studios, that want a site with character that still makes booking easy.",
      tags: ["Booking sites", "Small businesses", "Animation & motion", "Responsive builds"],
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
