import type { Metadata } from "next";
import Link from "next/link";
import ServiceHeader from "@/components/ServiceHeader";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "기업 교육 및 강의 문의",
  description: "기업 AI 교육, AX 강의, CRM 컨설팅 관련 문의를 접수합니다.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "기업 교육 및 강의 문의",
    description: "조직에 맞는 AI·AX 교육과 CRM 컨설팅 상담을 요청하세요.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <>
      <ServiceHeader />
      <div className="container" style={{ maxWidth: 820 }}>
        <Link className="back-link" href="/">
          ← 홈으로 돌아가기
        </Link>
        <header className="page-head">
          <p className="badge badge-accent">Contact</p>
          <h1>기업 AI 교육과 AX 전환 상담을 구체화해 보세요</h1>
          <p className="muted">
            교육 대상, 희망 주제, 조직의 현재 업무 과제를 알려주시면 CRM 경험 기반의
            AI·AX 교육 방향을 함께 정리할 수 있습니다.
          </p>
        </header>

        <section className="card">
          <h2>문의 가능한 주제</h2>
          <ul>
            <li>기업 AI 교육 및 생성형 AI 활용 교육</li>
            <li>CRM 기반 AX 전환 교육과 업무 자동화</li>
            <li>Salesforce·고객경험 기반 실무 사례 교육</li>
            <li>바이브 코딩 방식의 AI 서비스 기획 워크숍</li>
          </ul>
        </section>

        <section className="card" style={{ marginTop: 16 }}>
          <h2>상담 접수</h2>
          <p>
            현재 상담 폼은 홈 하단에서 운영됩니다. 문의 내용을 남기면 확인 후
            교육 주제와 일정, 대상자 수준에 맞춰 연락드립니다.
          </p>
          <div className="row">
            <Link className="btn btn-primary" href="/#contact">
              홈 상담 폼으로 이동하기
            </Link>
            <Link className="btn btn-ghost" href="/diagnosis">
              먼저 역량 진단하기
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
