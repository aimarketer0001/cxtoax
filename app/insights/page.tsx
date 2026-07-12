import type { Metadata } from "next";
import Link from "next/link";
import ServiceHeader from "@/components/ServiceHeader";
import { MARKETING_REPORT_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "CRM·AI·AX 인사이트",
  description:
    "CRM과 AI, AX 전환, 마케팅 자동화, 바이브코딩 관련 실무 인사이트를 제공합니다.",
  alternates: {
    canonical: absoluteUrl("/insights"),
  },
  openGraph: {
    title: "CRM·AI·AX 인사이트",
    description: "AI 검색, CRM 자동화, AX 전환을 실무 관점으로 정리한 인사이트입니다.",
    url: absoluteUrl("/insights"),
  },
};

export default function InsightsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "AI 검색 시대, 하반기 마케팅은 캠페인이 아니라 운영 시스템입니다",
    url: MARKETING_REPORT_URL,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: "CX to AX",
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <ServiceHeader />
      <div className="container" style={{ maxWidth: 900 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Link className="back-link" href="/">
          ← 홈으로 돌아가기
        </Link>
        <header className="page-head">
          <p className="badge badge-accent">Insights</p>
          <h1>CRM·AI·AX 인사이트</h1>
          <p className="muted">
            CRM 현장 경험과 AI 활용 흐름을 연결해, 검색·마케팅·업무 자동화 관점의
            실행 아이디어를 정리합니다.
          </p>
        </header>

        <article className="card">
          <p className="badge badge-muted">2026 하반기 마케팅</p>
          <h2>AI 검색 시대, 하반기 마케팅은 캠페인이 아니라 운영 시스템입니다</h2>
          <p>
            AI 검색 대응, CRM 자동화, 콘텐츠 운영, 캠페인 실행 로드맵을 실무
            관점으로 정리한 리포트입니다. 질문형 콘텐츠, FAQ, 비교표, 명확한
            엔티티 구조가 답변 엔진의 인용 가능성을 높입니다.
          </p>
          <Link className="btn btn-primary" href={MARKETING_REPORT_URL}>
            2026 하반기 마케팅 실행 전략 리포트 보기
          </Link>
        </article>

        <section className="card" style={{ marginTop: 16 }}>
          <h2>다루는 주제</h2>
          <ul>
            <li>AI 검색과 AEO 관점의 콘텐츠 구조</li>
            <li>CRM 리텐션과 고객 여정 자동화</li>
            <li>AI 업무 흐름과 실무 생산성</li>
            <li>바이브 코딩 방식의 AI 서비스 기획</li>
          </ul>
        </section>
      </div>
    </>
  );
}
