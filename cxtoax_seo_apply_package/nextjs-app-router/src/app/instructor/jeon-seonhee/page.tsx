import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "전선희 강사 프로필 | CRM·Salesforce 기반 AX 전문강사",
  description:
    "CRM·Salesforce 프로젝트 경험을 기반으로 영업·상담·마케팅 조직의 생성형 AI 활용과 AX 전환을 교육하는 전선희 강사 프로필입니다.",
  alternates: { canonical: absoluteUrl("/instructor/jeon-seonhee") },
  openGraph: {
    title: "전선희 | CRM 현장을 이해하는 AX 전문강사",
    description:
      "CRM·Salesforce 현장 경험을 생성형 AI 활용, 고객상담, 영업, 마케팅 자동화 교육으로 연결합니다.",
    url: absoluteUrl("/instructor/jeon-seonhee"),
    images: ["/og-image.png"],
  },
};

export default function InstructorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/instructor/jeon-seonhee"),
    mainEntity: {
      "@type": "Person",
      name: "전선희",
      jobTitle: "CRM 솔루션 기반 컨설턴트 · AX 전문강사",
      url: absoluteUrl("/instructor/jeon-seonhee"),
      worksFor: {
        "@type": "Organization",
        name: "CX to AX",
        url: absoluteUrl("/"),
      },
      knowsAbout: [
        "CRM",
        "Salesforce",
        "고객경험",
        "생성형 AI 교육",
        "AX 전환",
        "AI 업무 자동화",
        "AI 마케팅",
        "바이브코딩",
      ],
    },
  };

  return (
    <main>
      <JsonLd data={schema} />
      <article>
        <p>INSTRUCTOR</p>
        <h1>CRM 현장을 설계해 온 컨설턴트, 전선희</h1>
        <p>
          Siebel부터 Salesforce까지 기업 CRM 프로젝트에서 영업·상담·마케팅의
          업무 흐름과 고객 접점을 설계해 왔습니다. 현재는 그 경험을 생성형 AI와
          AX 실무 교육으로 연결합니다.
        </p>

        <section>
          <h2>전문 분야</h2>
          <ul>
            <li>CRM 전략과 고객 데이터 기반 업무 설계</li>
            <li>Salesforce 기반 영업·서비스 프로세스</li>
            <li>고객상담 스크립트·FAQ·VOC AI 자동화</li>
            <li>영업 메일·제안서·미팅 준비 AI 자동화</li>
            <li>AI 마케팅과 AI 검색 대응</li>
            <li>비개발자 대상 바이브코딩 교육</li>
          </ul>
        </section>

        <section>
          <h2>교육 방식</h2>
          <p>
            기능 소개에 머물지 않고 반복 업무를 줄이는 지점, 사람이 검증해야 할
            기준, 교육 후 바로 적용할 실행안을 함께 설계합니다.
          </p>
        </section>

        <a href="/#courses">대표 교육 과정 보기</a>{" "}
        <a href="/#contact">기업 교육 상담하기</a>
      </article>
    </main>
  );
}
