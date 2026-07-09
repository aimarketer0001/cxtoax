import type { Metadata } from "next";
import "./globals.css";

const appBaseUrl = process.env.APP_BASE_URL || "https://cxtoax.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
  title: "전선희 | CRM·AI·AX 실무형 강사 프로필",
  description:
    "CRM 컨설팅과 고객경험 프로젝트 경험을 바탕으로 AI 마케팅, AX 전환, Salesforce, 고객경험 교육을 제공하는 실무형 강사 프로필 사이트입니다.",
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
