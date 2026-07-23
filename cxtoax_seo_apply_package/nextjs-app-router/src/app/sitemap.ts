import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { courses } from "@/lib/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-22");

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/marketing-h2-2026`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/instructor/jeon-seonhee`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...coursePages];
}
