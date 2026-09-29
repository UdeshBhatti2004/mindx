import type { MetadataRoute } from "next";

// ⚠️ Keep this in sync with SITE_URL in app/layout.tsx
const SITE_URL = "https://mind-x.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}