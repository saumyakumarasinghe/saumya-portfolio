import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    // AVIF first, WebP as the fallback; browsers without either get the original file.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Case-study media in /public (/work/<slug>/<file>) is not content-hashed, so a day
        // of caching plus a week of stale-while-revalidate keeps repeat visits free of
        // revalidation without making a replaced screenshot wait long to show up.
        // Needs the second segment: /work/<slug> alone is the page itself and stays uncached.
        source: "/work/:slug/:path+",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
