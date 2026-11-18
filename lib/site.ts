/**
 * Site-wide facts in one place. Everything here comes from Saumya's CV;
 * update this file rather than hard-coding values in components.
 */
export const site = {
  name: "Saumya Kumarasinghe",
  shortName: "Saumya K.",
  role: "Software Engineer",
  tagline: "Calm systems for busy products.",
  description:
    "Software engineer in Colombo, Sri Lanka, building web applications, APIs and event-driven backends that stay fast and dependable when traffic pours in.",
  location: "Colombo, Sri Lanka",
  coordinates: "6.93° N 79.86° E",
  timeZone: "Asia/Colombo",
  email: "saumyakumarasinghe9@gmail.com",
  phone: "070 145 4255",
  /** International format, used for tel: and wa.me links. */
  phoneE164: "+94701454255",
  links: {
    linkedin: "https://linkedin.com/in/saumya-kumarasinghe",
    github: "https://github.com/saumyakumarasinghe",
    whatsapp: "https://wa.me/94701454255",
  },
  /** Production URL, used for canonical links and social cards. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Shown as a small "available" note only when set. Leave null unless it
   * is true right now, e.g. "Taking on projects from January".
   */
  availability: "Open to full-time backend and full-stack roles · on-site or remote" as string | null,
  /**
   * Freelance website service (the /websites page). Change the brand here and
   * every page and link follows. The number is the business WhatsApp line.
   */
  freelance: {
    brand: "Websites by Saumya",
    description:
      "Affordable websites for small businesses, online sellers and personal brands: business sites, online stores, portfolios and redesigns, in Sinhala and English.",
    whatsapp: "074 079 4255",
    whatsappE164: "+94740794255",
    whatsappLink: "https://wa.me/94740794255",
    offer: "Free domain for your first year",
    offerNote: "for my first 5 clients",
  },
} as const;
