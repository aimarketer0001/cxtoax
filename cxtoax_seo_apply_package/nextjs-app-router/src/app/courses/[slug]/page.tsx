import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { courses, getCourse } from "@/lib/courses";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const url = absoluteUrl(`/courses/${course.slug}`);

  return {
    title: course.name,
    description: course.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: course.name,
      description: course.shortDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const url = absoluteUrl(`/courses/${course.slug}`);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name,
      description: course.shortDescription,
      url,
      inLanguage: "ko-KR",
      educationalLevel: course.level,
      audience: {
        "@type": "Audience",
        audienceType: course.audience,
      },
      provider: {
        "@type": "Organization",
        name: "CX to AX",
        url: absoluteUrl("/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "교육 과정",
          item: absoluteUrl("/#courses"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: course.name,
          item: url,
        },
      ],
    },
  ];

  return (
    <main>
      <JsonLd data={schema} />
      <article>
        <nav aria-label="현재 위치">
          <a href="/">홈</a> <span aria-hidden="true">/</span>{" "}
          <a href="/#courses">교육 과정</a>
        </nav>

        <p>{course.code}</p>
        <h1>{course.name}</h1>
        <p>{course.shortDescription}</p>

        <dl>
          <div><dt>대상</dt><dd>{course.audience}</dd></div>
          <div><dt>시간</dt><dd>{course.duration}</dd></div>
          <div><dt>난이도</dt><dd>{course.level}</dd></div>
        </dl>

        <section>
          <h2>교육 후 할 수 있는 일</h2>
          <ul>{course.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section>
          <h2>상세 진행 시간표</h2>
          <table>
            <thead>
              <tr><th>시간</th><th>진행 내용</th><th>방식</th></tr>
            </thead>
            <tbody>
              {course.modules.map((module) => (
                <tr key={`${module.time}-${module.title}`}>
                  <td>{module.time}</td>
                  <td><strong>{module.title}</strong><br />{module.detail}</td>
                  <td>{module.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>8시간 심화 과정</h2>
          <ul>{course.advanced.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section>
          <h2>수강 전 준비사항</h2>
          <ul>{course.preparation.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <aside>
          <h2>조직에 맞는 과정으로 조정할 수 있습니다</h2>
          <p>교육 대상, 업무 환경, 사용 도구와 기대 결과를 확인해 실습 예제를 조정합니다.</p>
          <a href="/#contact">기업 AI 교육 상담하기</a>
        </aside>
      </article>
    </main>
  );
}
