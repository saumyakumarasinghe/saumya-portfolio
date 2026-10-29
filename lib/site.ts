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
  availability: null as string | null,
} as const;
