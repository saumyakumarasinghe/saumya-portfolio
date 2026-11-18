/**
 * Home page copy. Every figure here is taken from the CV.
 */

export const readouts = [
  {
    value: 3.5,
    decimals: 1,
    prefix: "",
    unit: "+",
    text: "Years building backend services, APIs and full-stack apps, from intern to backend lead.",
  },
  {
    value: 46,
    decimals: 0,
    prefix: "",
    unit: "",
    text: "API routes behind sayarupublishers.lk, a live bilingual bookshop I built on my own.",
  },
  { value: 11, decimals: 0, prefix: "", unit: "+", text: "RESTful APIs designed for the EatMe Admin Portal at Dinetap." },
  { value: 2, decimals: 0, prefix: "", unit: "", text: "Languages, Sinhala and English, across the whole Sayaru bookshop." },
] as const;

export const marquee = [
  "Backend & APIs",
  "Payments & integrations",
  "Event-driven AWS",
  "Database performance",
  "Next.js & React",
  "CI/CD & testing",
] as const;

export type PlantPart = "roots" | "trunk" | "sap" | "branches" | "canopy" | "rings";

export const capabilities: {
  part: PlantPart;
  label: string;
  title: string;
  problem: string;
  offer: string;
  evidence: string;
}[] = [
  {
    part: "roots",
    label: "Roots",
    title: "Database performance",
    problem: "Reports crawl and the database bill keeps growing.",
    offer: "I find the slow queries, fix schemas and indexes, and add caching where it pays for itself.",
    evidence:
      "Tuned MySQL, PostgreSQL and MongoDB queries with schema changes, indexing and Redis caching, speeding up reports and API responses and lowering cloud costs.",
  },
  {
    part: "trunk",
    label: "Trunk",
    title: "Backend engineering & APIs",
    problem: "Your web and mobile apps need an API they can depend on.",
    offer: "I design and build REST APIs and services in Node.js, TypeScript and Spring Boot, documented in Swagger.",
    evidence: "Designed 11+ RESTful APIs for the EatMe Admin Portal; backend lead for the DineTap application.",
  },
  {
    part: "sap",
    label: "Sap",
    title: "Cloud, events & modernization",
    problem: "Your app slows down or drops work when traffic spikes, and it's grown hard to change.",
    offer: "I move bursty work onto queues and serverless workers, and break monoliths into services that scale on their own.",
    evidence: "Led the migration of legacy Node.js APIs to TypeScript microservices; event-driven flows on AWS SQS and Lambda.",
  },
  {
    part: "branches",
    label: "Branches",
    title: "Payments & integrations",
    problem: "You need Stripe, Adyen or an email provider wired in without losing transactions.",
    offer: "I integrate payment gateways and third-party services through event-driven processing that copes with spikes.",
    evidence:
      "Event-driven Adyen and Stripe payments plus Postmark emails on AWS SQS and Lambda, so the system handles more payments, more reliably.",
  },
  {
    part: "canopy",
    label: "Canopy",
    title: "Websites & full-stack products",
    problem: "You need a website, an MVP or a SaaS product built end to end.",
    offer: "I take a product from data model to interface: React and Next.js in front, Node.js or Python behind.",
    evidence:
      "Designed, built and launched sayarupublishers.lk on my own, from storefront and admin console to database and deploys; a React and Next.js component library adopted by three product teams.",
  },
  {
    part: "rings",
    label: "Rings",
    title: "Testing, CI/CD & reliability",
    problem: "Releases are slow, manual and a little scary.",
    offer: "I set up automated tests and pipelines so small, frequent releases become the safe default and each one adds another ring.",
    evidence:
      "GitHub Actions and Docker CI/CD pipelines, automated tests with Jest and Cypress, and monitoring with Sentry and AWS CloudWatch.",
  },
];

export const roles = [
  { title: "Software Engineer", dates: "Jul 2025 to Jan 2026" },
  { title: "Associate Software Engineer", dates: "Jul 2023 to Jul 2025" },
  { title: "Software Engineer Intern", dates: "Jun 2022 to Jun 2023", note: "The core" },
] as const;

/** Highlights across all three roles. `**x**` marks a figure to highlight. */
export const highlights = [
  {
    area: "Architecture",
    text: "Led the migration of legacy Node.js APIs to TypeScript microservices; owned several microservices and Backend-for-Frontend (BFF) services.",
  },
  {
    area: "Backend",
    text: "Backend lead for the DineTap application; designed **11+** RESTful APIs for the EatMe Admin Portal; worked on the DineTap wallet's endpoints, Adyen integration and query optimisation.",
  },
  {
    area: "Payments",
    text: "Event-driven Adyen and Stripe payments and Postmark emails on AWS SQS and Lambda, so the system handles more payments, more reliably.",
  },
  { area: "Frontend", text: "A reusable React and Next.js UI component library adopted by **3** product teams." },
  {
    area: "Data",
    text: "Tuned MySQL, PostgreSQL and MongoDB queries with schema changes, indexing and Redis caching: faster reports and API responses, lower cloud costs.",
  },
  { area: "Delivery", text: "GitHub Actions and Docker CI/CD pipelines for faster deploys; automated testing with Jest and Cypress." },
  {
    area: "Monitoring",
    text: "Sentry and AWS CloudWatch monitoring and SonarQube code-quality checks, to find and fix production issues faster.",
  },
  {
    area: "People",
    text: "Mentored junior and mid-level engineers through pair programming and system-design workshops; wrote Swagger and Apidog API docs.",
  },
] as const;

/** The current role, shown above the Dinetap rings. `**x**` marks a figure to highlight. */
export const currentRole = {
  company: "Sayaru Publishers",
  title: "Software Consultant",
  dates: "Feb 2026 to Present",
  place: "Colombo",
  points: [
    "Sole developer: designed, built and launched sayarupublishers.lk, a bilingual English and Sinhala online bookshop with customer accounts, pre-orders and checkout.",
    "Built the admin console that runs the store: payment checks, order management, stock tracking and sales reporting.",
    "Card payments and automatic order and account emails; automated tests, GitHub Actions CI/CD and Sentry monitoring.",
  ],
} as const;

export const approach = [
  {
    icon: "gauge",
    title: "Measure, then change.",
    text: "Performance work starts with a measurement and ends with one, so every improvement is something you can check.",
  },
  {
    icon: "cloud",
    title: "Design for the busy day.",
    text: "Traffic arrives in bursts, not averages. Queues, caching and services that scale on their own let a system bend instead of break.",
  },
  {
    icon: "stones",
    title: "Make the API the easy part.",
    text: "Predictable names, consistent errors, documentation that matches the code. Nobody building on it should have to guess.",
  },
  {
    icon: "sprout",
    title: "Tests are part of the product.",
    text: "Coverage isn't the goal; confidence is. Automated tests and a fast pipeline make small, frequent releases the safe option.",
  },
  {
    icon: "leaf",
    title: "Leave it clearer than I found it.",
    text: "Legacy code is what success looks like after a few years. I modernize in steps and document as I go.",
  },
] as const;

export const education = [
  { title: "BEng (Hons) Software Engineering", detail: "University of Westminster, London · 2020 to 2025 · part-time" },
  { title: "Foundation Certificate in Higher Education", detail: "Informatics Institute of Technology, Colombo · 2019 to 2020" },
] as const;

export const enquiryTopics = [
  "Website or web app",
  "Backend & APIs",
  "Payments & integrations",
  "Database performance",
  "Cloud & DevOps",
  "Maintenance",
] as const;
