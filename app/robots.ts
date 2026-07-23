import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const publicCrawlerRule = {
    allow: "/",
    disallow: ["/admin/", "/api/"],
  };

  return {
    rules: [
      {
        userAgent: "*",
        ...publicCrawlerRule,
      },
      { userAgent: "OAI-SearchBot", ...publicCrawlerRule },
      { userAgent: "ChatGPT-User", ...publicCrawlerRule },
      { userAgent: "PerplexityBot", ...publicCrawlerRule },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
