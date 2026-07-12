import type { Metadata } from "next";
import Link from "next/link";
import ServiceHeader from "@/components/ServiceHeader";
import { absoluteUrl, personSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "AX 전문강사 프로필",
  description: "30년 CRM 컨설팅 경험과 AI·AX 교육 역량을 소개합니다.",
  alternates: {
    canonical: absoluteUrl("/profile"),
  },
  openGraph: {
    title: "AX 전문강사 프로필",
    description: "CRM 현장 경험을 AI·AX 실무 교육으로 연결하는 강사 프로필입니다.",
    url: absoluteUrl("/profile"),
  },
};

export default function ProfilePage() {
  return (
    <>
      <ServiceHeader />
      <div className="container" style={{ maxWidth: 900 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Link className="back-link" href="/">
          ← 홈으로 돌아가기
        </Link>
        <header className="page-head">
          <p className="badge badge-accent">Profile</p>
          <h1>CRM 컨설팅 경험을 AI·AX 실무 교육으로 연결합니다</h1>
          <p className="muted">
            CX to AX는 고객경험(CX)과 CRM 프로젝트 경험을 바탕으로 기업과
            실무자가 AI를 업무에 적용할 수 있도록 돕는 교육·컨설팅 브랜드입니다.
          </p>
        </header>

        <section className="card">
          <h2>강사 소개</h2>
          <p>
            전선희(Sunny Jun)는 CRM, Salesforce, 고객 상담, 영업, 마케팅 업무
            흐름을 현장에서 설계해 온 경험을 바탕으로 AI·AX 전환 교육을 제공합니다.
            교육은 도구 사용법에 그치지 않고 실제 업무 프로세스, 데이터 흐름,
            실행 결과물까지 연결하는 방식으로 구성됩니다.
          </p>
        </section>

        <section className="grid-2" style={{ marginTop: 16 }}>
          <div className="card">
            <h2>전문 분야</h2>
            <ul>
              <li>CRM 전략 및 고객경험 설계</li>
              <li>Salesforce 기반 고객관리와 서비스 프로세스</li>
              <li>생성형 AI 활용 교육과 업무 자동화</li>
              <li>AI 마케팅, AI 검색 대응, 콘텐츠 운영</li>
              <li>바이브 코딩 방식의 업무 도구 기획</li>
            </ul>
          </div>
          <div className="card">
            <h2>교육 방식</h2>
            <p>
              조직의 직무와 업무 수준을 먼저 진단하고, 수강자가 바로 적용할 수 있는
              프롬프트, 자동화 흐름, 업무 산출물을 중심으로 실습합니다.
            </p>
            <Link className="btn btn-primary" href="/courses">
              AI·AX 실무 교육 과정 보기
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
