import type { Metadata } from "next";
import Link from "next/link";
import ServiceHeader from "@/components/ServiceHeader";
import { absoluteUrl, courseItemListSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI·AX 실무 교육 과정",
  description:
    "생성형 AI, AX 전환, 바이브코딩, CRM 기반 AI 활용 교육 과정을 확인할 수 있습니다.",
  alternates: {
    canonical: absoluteUrl("/courses"),
  },
  openGraph: {
    title: "AI·AX 실무 교육 과정",
    description: "CRM 현장 경험을 바탕으로 구성한 기업 AI 교육과 AX 전환 과정입니다.",
    url: absoluteUrl("/courses"),
  },
};

const courses = [
  {
    title: "AI로 고객관리(CRM) 업무 자동화하기",
    audience: "영업·CS·마케팅 실무자",
    copy: "고객 데이터, 응대 흐름, 후속 액션을 AI로 정리하고 반복 업무를 줄이는 AX 첫걸음 과정입니다.",
  },
  {
    title: "고객 상담 업무에 생성형 AI 적용하기",
    audience: "상담·CS 조직",
    copy: "응대 스크립트, FAQ, 상담 요약과 품질 점검을 생성형 AI로 실습합니다.",
  },
  {
    title: "영업 실무자를 위한 AI",
    audience: "영업직·영업관리자",
    copy: "제안서, 영업 메일, 미팅 준비와 고객 팔로업을 AI로 자동화하는 과정입니다.",
  },
  {
    title: "프롬프트 기반 업무 도구 제작",
    audience: "기획자·마케터·교육 담당자",
    copy: "비개발자도 아이디어를 서비스 구조와 실행 프롬프트로 구체화하는 바이브 코딩형 실습입니다.",
  },
];

export default function CoursesPage() {
  return (
    <>
      <ServiceHeader />
      <div className="container" style={{ maxWidth: 980 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseItemListSchema) }}
        />
        <Link className="back-link" href="/">
          ← 홈으로 돌아가기
        </Link>
        <header className="page-head">
          <p className="badge badge-accent">Courses</p>
          <h1>AI·AX 실무 교육 과정</h1>
          <p className="muted">
            CRM, 고객상담, 영업, 마케팅 현장에서 바로 적용할 수 있는 생성형 AI
            활용 교육과 AX 전환 과정을 제공합니다.
          </p>
        </header>

        <div className="stack">
          {courses.map((course) => (
            <article className="rec-card" key={course.title}>
              <h2>{course.title}</h2>
              <p className="muted">대상: {course.audience}</p>
              <p>{course.copy}</p>
            </article>
          ))}
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h2>맞춤 과정이 필요하다면</h2>
          <p>
            조직의 직무, 데이터 수준, 업무 목표에 따라 과정 조합과 실습 산출물을
            조정할 수 있습니다.
          </p>
          <div className="row">
            <Link className="btn btn-primary" href="/diagnosis">
              AI·AX 역량 진단 시작하기
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              기업 AI 교육 문의하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
