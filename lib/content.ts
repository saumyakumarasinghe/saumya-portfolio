/**
 * Home page copy. Every figure here is taken from the CV.
 */

export const readouts = [
  {
    value: 99.99,
    decimals: 2,
    prefix: "",
    unit: "%",
    text: "Success rate on event-driven Adyen and Stripe payments, with 40% more throughput.",
  },
  {
    value: 100,
    decimals: 0,
    prefix: "<",
    unit: "ms",
    text: "API latency on the DineTap wallet platform at high weekly transaction volume.",
  },
  { value: 45, decimals: 0, prefix: "", unit: "%", text: "Faster reporting queries after MySQL schema optimizations." },
  { value: 94, decimals: 0, prefix: "", unit: "%", text: "Test coverage with Jest, Cypress and JUnit; deploys in under 15 minutes." },
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
      "MySQL schema work cut reporting query times by 45%; indexing and Redis caching on PostgreSQL and MongoDB lowered cloud costs.",
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
    evidence: "Adyen and Stripe gateways plus Postmark on AWS SQS and Lambda: 40% more throughput at a 99.99% success rate.",
  },
  {
    part: "canopy",
    label: "Canopy",
    title: "Websites & full-stack products",
    problem: "You need a website, an MVP or a SaaS product built end to end.",
    offer: "I take a product from data model to interface: React and Next.js in front, Node.js or Python behind.",
    evidence:
      "A React and Next.js component library that sped up delivery across three product teams; TravelTales, built for 10,000+ concurrent sessions.",
  },
  {
    part: "rings",
    label: "Rings",
    title: "Testing, CI/CD & reliability",
    problem: "Releases are slow, manual and a little scary.",
    offer: "I set up automated tests and pipelines so small, frequent releases become the safe default and each one adds another ring.",
    evidence: "GitHub Actions and Docker pipelines with deploys under 15 minutes; Jest, Cypress and JUnit suites at 94% coverage.",
  },
];

export const roles = [
  { title: "Software Engineer", dates: "Jul 2025 to Present", note: "Growing" },
  { title: "Associate Software Engineer", dates: "Jul 2023 to Jul 2025" },
  { title: "Software Engineer Intern", dates: "Jun 2022 to Jun 2023", note: "The core" },
] as const;

/** Highlights across all three roles. `**x**` marks a figure to highlight. */
export const highlights = [
  {
    area: "Architecture",
    text: "Led the backend migration of legacy Node.js APIs to TypeScript microservices; code owner for several microservices and BFF applications.",
  },
  { area: "Backend", text: "Backend lead for the DineTap application; designed **11+** RESTful APIs for the EatMe Admin Portal." },
  {
    area: "Payments",
    text: "Event-driven Adyen and Stripe gateways and Postmark on AWS SQS and Lambda: **+40%** throughput at **99.99%** success.",
  },
  { area: "Frontend", text: "A reusable React and Next.js component library used by **3** cross-functional product teams." },
  {
    area: "Data",
    text: "MySQL schema optimizations cut reporting query times by **45%**; indexing and Redis caching lowered cloud costs.",
  },
  { area: "Delivery", text: "CI/CD with GitHub Actions and Docker: deploys in **<15 min**; coverage raised to **94%**." },
  {
    area: "People",
    text: "Swagger and ApiDog documentation; system-design workshops that sped up onboarding by **25%**.",
  },
] as const;

export const approach = [
  {
    icon: "gauge",
    title: "Measure, then change.",
    text: "Performance work starts with a number and ends with one. “Reports run 45% faster” is something you can check.",
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
  { title: "Foundation Certificate in Higher Education", detail: "Institute of Technology, Sri Lanka · 2019 to 2020" },
] as const;

export const enquiryTopics = [
  "Website or web app",
  "Backend & APIs",
  "Payments & integrations",
  "Database performance",
  "Cloud & DevOps",
  "Maintenance",
] as const;
