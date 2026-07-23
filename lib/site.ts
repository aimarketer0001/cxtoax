import { featuredCourses } from "@/lib/courses";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_BASE_URL;
const normalizedSiteUrl = configuredSiteUrl?.replace(/\/+$/, "");

export const SITE_URL =
  normalizedSiteUrl && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalizedSiteUrl)
    ? normalizedSiteUrl
    : "https://cxtoax.vercel.app";

export const SITE_NAME = "CX to AX";

export const DEFAULT_TITLE = "CX to AX | CRM·AI·AX 실무 교육 및 컨설팅";

export const DEFAULT_DESCRIPTION =
  "CRM·Salesforce 컨설팅 경험을 바탕으로 기업과 실무자를 위한 AI·AX 전환 교육, 생성형 AI 활용 교육, CRM 업무 자동화 교육을 제공합니다.";

export const OG_IMAGE = "/og-image.png";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export const MARKETING_REPORT_URL = absoluteUrl("/marketing-h2-2026");
export const ORGANIZATION_ID = `${absoluteUrl("/")}#organization`;
export const PERSON_ID = `${absoluteUrl("/instructor/jeon-seonhee")}#person`;

export const seoKeywords = [
  "AX 전문강사",
  "AI 강사",
  "생성형 AI 교육",
  "기업 AI 교육",
  "CRM 컨설팅",
  "Salesforce 교육",
  "AX 전환",
  "바이브코딩 교육",
  "AI 서비스 기획",
  "AI 업무 자동화",
  "CRM 기반 AX 전환",
];

export const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const, lastModified: "2026-07-22" },
  { path: "/instructor/jeon-seonhee", priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2026-07-22" },
  { path: "/courses", priority: 0.9, changeFrequency: "weekly" as const, lastModified: "2026-07-22" },
  ...featuredCourses.map((course) => ({
    path: `/courses/${course.slug}`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
    lastModified: "2026-07-22",
  })),
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const, lastModified: "2026-07-22" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" as const, lastModified: "2026-07-22" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const, lastModified: "2026-07-22" },
  { path: "/diagnosis", priority: 0.7, changeFrequency: "monthly" as const, lastModified: "2026-07-22" },
  { path: "/marketing-h2-2026", priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2026-07-22" },
];

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${absoluteUrl("/")}#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ko-KR",
  description:
    "CRM·Salesforce 실무 경험을 기반으로 한 AI·AX 교육 및 컨설팅 사이트",
  publisher: { "@id": ORGANIZATION_ID },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl(OG_IMAGE),
  description: DEFAULT_DESCRIPTION,
  founder: { "@id": PERSON_ID },
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "전선희",
  alternateName: "Sunny Jun",
  url: absoluteUrl("/instructor/jeon-seonhee"),
  image: absoluteUrl("/instructor.jpg"),
  jobTitle: "CRM·AI·AX 전문강사 및 컨설턴트",
  worksFor: { "@id": ORGANIZATION_ID },
  knowsAbout: [
    "CRM",
    "Salesforce",
    "AI",
    "AX",
    "생성형 AI",
    "바이브코딩",
    "AI 마케팅",
    "고객경험",
  ],
};

export const courseItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: featuredCourses.map((course, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/courses/${course.slug}`),
    item: {
      "@type": "Course",
      "@id": `${absoluteUrl(`/courses/${course.slug}`)}#course`,
      name: course.name,
      description: course.shortDescription,
      url: absoluteUrl(`/courses/${course.slug}`),
      provider: { "@id": ORGANIZATION_ID },
    },
  })),
};
