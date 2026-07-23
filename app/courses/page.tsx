import type { Metadata } from "next";
import Link from "next/link";
import ServiceHeader from "@/components/ServiceHeader";
import { featuredCourses } from "@/lib/courses";
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
          {featuredCourses.map((course) => (
            <article className="rec-card" key={course.slug}>
              <h2>{course.name}</h2>
              <p className="muted">대상: {course.audience}</p>
              <p>{course.shortDescription}</p>
              <Link className="btn btn-ghost" href={`/courses/${course.slug}`}>
                {course.name.split(" — ")[0]} 상세 커리큘럼
              </Link>
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
              AI·AX 역량 진단
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
