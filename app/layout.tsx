import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { fontVariables } from "./fonts";
import { AmbientMotion } from "@/components/motion/ambient-motion";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteHeader } from "@/components/site/site-header";
import { site } from "@/lib/site";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.links.linkedin }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  // The site opens in mist whatever the system setting; night is opt-in via the toggle.
  colorScheme: "light",
  themeColor: "#eceedf",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Sets data-theme from the saved choice (or mist) before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-canvas font-sans text-ink" suppressHydrationWarning>
        <a
          href="#main"
          className="eyebrow sr-only rounded-full bg-ink px-5 py-3 text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </SmoothScroll>

        <AmbientMotion />

        {/* Paper grain over everything; decorative, never interactive. */}
        <div aria-hidden="true" className="grain-overlay" />
      </body>
    </html>
  );
}
