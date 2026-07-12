import type { Metadata } from "next";
import Link from "next/link";
import ServiceHeader from "@/components/ServiceHeader";
import { MARKETING_REPORT_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI·CRM 프로젝트 및 강의 포트폴리오",
  description:
    "CRM, Salesforce, AI 서비스 기획, AX 교육 관련 프로젝트 사례를 소개합니다.",
  alternates: {
    canonical: absoluteUrl("/portfolio"),
  },
  openGraph: {
    title: "AI·CRM 프로젝트 및 강의 포트폴리오",
    description: "CRM 프로젝트 경험이 AI·AX 교육으로 연결되는 방식을 확인하세요.",
    url: absoluteUrl("/portfolio"),
  },
};

const cases = [
  {
    title: "상담 현장을 위한 CRM 시스템 구축과 운영",
    result:
      "상담사가 고객 정보를 한 흐름으로 다루는 응대 체계를 정착시키고, 상담 업무 AI 적용 교육의 기반 경험으로 연결했습니다.",
  },
  {
    title: "글로벌 B2B 고객 지원 CRM 시스템 구축",
    result:
      "고객 지원 요청의 접수부터 처리까지 하나의 시스템으로 통합한 경험을 Salesforce·CRM 교육 사례로 활용합니다.",
  },
  {
    title: "AI 마케팅 실행 전략 리포트",
    result:
      "AI 검색 대응, CRM 자동화, 콘텐츠 운영, 캠페인 실행 로드맵을 실무 관점으로 정리했습니다.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <ServiceHeader />
      <div className="container" style={{ maxWidth: 900 }}>
        <Link className="back-link" href="/">
          ← 홈으로 돌아가기
        </Link>
        <header className="page-head">
          <p className="badge badge-accent">Portfolio</p>
          <h1>CRM 프로젝트 경험으로 교육의 신뢰를 설명합니다</h1>
          <p className="muted">
            실제 고객관리와 고객지원 시스템을 설계·운영한 경험을 AI·AX 교육의
            사례와 실습 과제로 전환합니다.
          </p>
        </header>

        <div className="stack">
          {cases.map((item) => (
            <article className="card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.result}</p>
            </article>
          ))}
        </div>

        <div className="row" style={{ marginTop: 20 }}>
          <Link className="btn btn-primary" href="/courses">
            관련 교육 과정 확인하기
          </Link>
          <Link className="btn btn-ghost" href={MARKETING_REPORT_URL}>
            마케팅 전략 리포트 보기
          </Link>
        </div>
      </div>
    </>
  );
}
