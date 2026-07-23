import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;
const naverVerification =
  process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CX to AX | CRM·AI·AX 실무 교육 및 컨설팅",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "기업 AI 교육",
    "생성형 AI 교육",
    "AX 전문강사",
    "CRM 교육",
    "Salesforce 교육",
    "AI 업무 자동화",
    "고객상담 AI 교육",
    "영업 AI 교육",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "CX to AX | CRM 현장 경험을 AI·AX 실행 역량으로",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CX to AX 기업 AI·AX 실무 교육",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CX to AX | CRM·AI·AX 실무 교육",
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(naverVerification
      ? { other: { "naver-site-verification": naverVerification } }
      : {}),
  },
};
