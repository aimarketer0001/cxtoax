import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  seoKeywords,
} from "@/lib/site";
import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: seoKeywords,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(naverVerification
      ? { other: { "naver-site-verification": naverVerification } }
      : {}),
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "CX to AX | CRM 경험을 AI·AX 역량으로",
    description: "CRM·Salesforce 실무 경험을 기반으로 한 AI·AX 교육 및 컨설팅",
    images: [
      {
        url: absoluteUrl(OG_IMAGE),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: "CRM·Salesforce 실무 경험을 기반으로 한 AI·AX 교육 및 컨설팅",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
