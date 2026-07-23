import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceHeader from "@/components/ServiceHeader";
import { featuredCourses, getFeaturedCourse } from "@/lib/courses";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featuredCourses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getFeaturedCourse(slug);
  if (!course) return {};

  const url = absoluteUrl(`/courses/${course.slug}`);
  return {
    title: course.name,
    description: course.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_NAME,
      url,
      title: course.name,
      description: course.shortDescription,
      images: [absoluteUrl(OG_IMAGE)],
    },
    twitter: {
      card: "summary_large_image",
      title: course.name,
      description: course.shortDescription,
      images: [absoluteUrl(OG_IMAGE)],
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getFeaturedCourse(slug);
  if (!course) notFound();

  const url = absoluteUrl(`/courses/${course.slug}`);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${url}#course`,
      name: course.name,
      description: course.shortDescription,
      url,
      inLanguage: "ko-KR",
      educationalLevel: course.level,
      timeRequired: "PT4H",
      audience: { "@type": "Audience", audienceType: course.audience },
      provider: {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organization`,
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "교육 과정", item: absoluteUrl("/courses") },
        { "@type": "ListItem", position: 3, name: course.name, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ServiceHeader />
      <article className="container course-detail">
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/">홈</Link><span aria-hidden="true">/</span>
          <Link href="/courses">교육 과정</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{course.code}</span>
        </nav>

        <header className="page-head course-detail-head">
          <p className="badge badge-accent">{course.code}</p>
          <h1>{course.name}</h1>
          <p className="muted">{course.shortDescription}</p>
        </header>

        <dl className="course-facts" aria-label="과정 개요">
          <div><dt>교육 대상</dt><dd>{course.audience}</dd></div>
          <div><dt>교육 시간</dt><dd>{course.duration}</dd></div>
          <div><dt>난이도</dt><dd>{course.level}</dd></div>
        </dl>

        <section className="card course-section">
          <h2>교육 후 할 수 있는 일</h2>
          <ul>{course.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="card course-section">
          <h2>상세 진행 시간표</h2>
          <div className="course-table-wrap" tabIndex={0} role="region" aria-label="과정 시간표">
            <table className="table course-table">
              <thead><tr><th scope="col">시간</th><th scope="col">진행 내용</th><th scope="col">방식</th></tr></thead>
              <tbody>
                {course.modules.map((module) => (
                  <tr key={`${module.time}-${module.title}`}>
                    <td>{module.time}</td>
                    <td><strong>{module.title}</strong><p>{module.detail}</p></td>
                    <td>{module.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid-2 course-detail-grid">
          <section className="card course-section">
            <h2>8시간 심화 과정</h2>
            <ul>{course.advanced.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="card course-section">
            <h2>수강 전 준비사항</h2>
            <ul>{course.preparation.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <aside className="card course-contact-panel">
          <div>
            <h2>조직에 맞는 과정으로 조정할 수 있습니다</h2>
            <p>교육 대상, 업무 환경, 사용 도구와 기대 결과를 확인해 실습 예제를 조정합니다.</p>
          </div>
          <Link className="btn btn-primary" href={`/contact?course=${course.slug}`}>
            {course.name.split(" — ")[0]} 교육 상담
          </Link>
        </aside>

        <nav className="related-course-links" aria-label="다른 대표 교육 과정">
          <strong>다른 대표 과정</strong>
          {featuredCourses.filter((item) => item.slug !== course.slug).map((item) => (
            <Link href={`/courses/${item.slug}`} key={item.slug}>{item.name}</Link>
          ))}
        </nav>
      </article>
    </>
  );
}
