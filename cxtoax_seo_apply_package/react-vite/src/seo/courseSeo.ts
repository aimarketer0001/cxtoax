import type { Course } from "../data/courses";

const SITE_URL = "https://cxtoax.vercel.app";

export function buildCourseJsonLd(course: Course) {
  const url = `${SITE_URL}/courses/${course.slug}`;
  return [
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
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "교육 과정", item: `${SITE_URL}/#courses` },
        { "@type": "ListItem", position: 3, name: course.name, item: url },
      ],
    },
  ];
}
