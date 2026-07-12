const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_BASE_URL;
const normalizedSiteUrl = configuredSiteUrl?.replace(/\/+$/, "");

export const SITE_URL =
  normalizedSiteUrl && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalizedSiteUrl)
    ? normalizedSiteUrl
    : "https://cxtoax.vercel.app";

export const SITE_NAME = "CX to AX";

export const DEFAULT_TITLE = "CX to AX | CRM·AI·AX 실무 교육 및 컨설팅";

export const DEFAULT_DESCRIPTION =
  "30년 CRM·Salesforce 컨설팅 경험을 바탕으로 기업과 실무자를 위한 AI·AX 전환 교육, 생성형 AI 활용 교육, 바이브코딩 교육을 제공합니다.";

export const OG_IMAGE = "/og-image.png";

export const MARKETING_REPORT_URL = "https://cxtoax.vercel.app/marketing-h2-2026";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

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
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/profile", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/courses", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/diagnosis", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/marketing-h2-2026", priority: 0.8, changeFrequency: "monthly" as const },
];

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ko-KR",
  description:
    "CRM·Salesforce 실무 경험을 기반으로 한 AI·AX 교육 및 컨설팅 사이트",
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "전선희",
  alternateName: "Sunny Jun",
  url: absoluteUrl("/profile"),
  jobTitle: "CRM·AI·AX 전문강사 및 컨설턴트",
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
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Course",
        name: "AI로 고객관리(CRM) 업무 자동화하기",
        description: "CRM 업무 흐름을 AI로 자동화하는 실무형 AX 교육 과정",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          sameAs: SITE_URL,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Course",
        name: "고객 상담 업무에 생성형 AI 적용하기",
        description: "응대 스크립트와 FAQ 자동화를 실습하는 생성형 AI 교육 과정",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          sameAs: SITE_URL,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Course",
        name: "영업 실무자를 위한 AI",
        description: "제안서, 영업 메일, 미팅 준비 자동화를 다루는 실무 교육 과정",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          sameAs: SITE_URL,
        },
      },
    },
  ],
};
