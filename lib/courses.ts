export type FeaturedCourse = {
  slug: string;
  code: string;
  name: string;
  shortDescription: string;
  audience: string;
  duration: string;
  level: string;
  outcomes: string[];
  modules: { time: string; title: string; detail: string; mode: string }[];
  advanced: string[];
  preparation: string[];
};

export const featuredCourses: FeaturedCourse[] = [
  {
    slug: "crm-ai-automation",
    code: "COURSE 01 · 고객관리",
    name: "AI로 고객관리(CRM) 업무 자동화하기 — 실무자를 위한 AX 첫걸음",
    shortDescription:
      "CRM 문서, 고객 응대, 팔로업 메일 등 반복되는 고객관리 업무를 생성형 AI 루틴으로 전환하는 실습형 기업교육입니다.",
    audience: "영업·CS·마케팅 실무자, 기업 교육 담당자",
    duration: "4시간 기본 · 8시간 심화 가능",
    level: "입문",
    outcomes: [
      "자기 업무에서 AI 적용 포인트 3가지를 도출할 수 있습니다.",
      "반복되는 고객관리 문서 업무를 재사용 가능한 AI 루틴으로 처리할 수 있습니다.",
    ],
    modules: [
      { time: "00:00–00:15", title: "오리엔테이션", detail: "교육 목표 공유와 참가자 업무 현황 파악", mode: "도입" },
      { time: "00:15–00:50", title: "왜 고객관리 업무부터인가", detail: "DX와 AX의 차이, 실패하는 AI 도입의 공통점, 고객 접점 자동화 기회 지도", mode: "이론" },
      { time: "00:50–01:50", title: "실전 프롬프트 기초", detail: "지시·맥락·형식, 고객 응대문 실습, 좋은 프롬프트와 나쁜 프롬프트 비교", mode: "실습" },
      { time: "02:00–03:10", title: "고객관리 문서 자동화", detail: "고객 응대문·팔로업 메일·고객 정보 요약과 재사용 템플릿 제작", mode: "실습" },
      { time: "03:10–04:00", title: "내 업무 적용 설계", detail: "AI 적용 포인트 도출, 우선순위 매트릭스, 강사 피드백", mode: "워크숍" },
    ],
    advanced: [
      "고객 데이터 정리와 AI 활용 분석 입문",
      "노코드 자동화 도구 연계",
      "팀 단위 AI 활용 규칙과 확산 계획 수립",
    ],
    preparation: ["실습용 노트북", "ChatGPT 또는 Claude 계정", "자주 하는 고객관리 업무 3가지"],
  },
  {
    slug: "customer-service-generative-ai",
    code: "COURSE 02 · 고객상담",
    name: "고객 상담 업무에 생성형 AI 적용하기 — 응대 스크립트·FAQ 자동화",
    shortDescription:
      "상담 스크립트, FAQ, 지식베이스, VOC 요약과 리포트를 생성형 AI로 표준화해 상담 품질과 보고 효율을 높이는 과정입니다.",
    audience: "상담·CS 조직 실무자와 관리자",
    duration: "4시간 기본 · 8시간 심화 가능",
    level: "입문–중급",
    outcomes: [
      "상담 품질 편차를 줄이는 응대 스크립트 체계를 만들 수 있습니다.",
      "VOC 요약과 보고 업무를 AI 루틴으로 자동화할 수 있습니다.",
    ],
    modules: [
      { time: "00:00–00:15", title: "오리엔테이션", detail: "참가 조직의 상담 채널과 업무 현황 파악", mode: "도입" },
      { time: "00:15–00:50", title: "AI 시대의 고객 상담", detail: "AICC 흐름, 상담사와 AI의 협업, AI가 잘하는 일과 못하는 일", mode: "이론" },
      { time: "00:50–01:50", title: "응대 스크립트 자동화", detail: "문의·불만·해지 방어 응대문과 조직 톤앤매너 적용", mode: "실습" },
      { time: "02:00–03:10", title: "FAQ·지식베이스 만들기", detail: "흩어진 상담 지식에서 FAQ와 상담사용 지식베이스 초안 구축", mode: "실습" },
      { time: "03:10–04:00", title: "VOC 요약·리포트 자동화", detail: "상담 요약, VOC 분류, 주간 리포트 작성 루틴", mode: "실습" },
    ],
    advanced: [
      "AI 기반 상담 품질 평가 기준 설계",
      "신규 상담사 온보딩 자료 제작",
      "AICC 도입 준비도 진단 워크숍",
    ],
    preparation: ["실습용 노트북", "생성형 AI 계정", "개인정보를 제거한 주요 고객 문의 유형 5가지"],
  },
  {
    slug: "sales-ai-automation",
    code: "COURSE 03 · 영업",
    name: "영업 실무자를 위한 AI — 제안서·영업 메일·미팅 준비 자동화",
    shortDescription:
      "리드 발굴, 영업 메일, 제안서, 미팅 준비와 후속 기록까지 이어지는 개인별 AI 영업 루틴을 설계하는 실습 과정입니다.",
    audience: "B2B 영업 실무자, 영업 관리자",
    duration: "4시간 기본 · 8시간 심화 가능",
    level: "입문",
    outcomes: [
      "영업 문서 작성 시간을 줄이고 고객 대면 시간을 늘릴 수 있습니다.",
      "미팅 준비부터 팔로업까지 이어지는 AI 영업 루틴을 만들 수 있습니다.",
    ],
    modules: [
      { time: "00:00–00:15", title: "오리엔테이션", detail: "참가자의 영업 방식과 주력 고객군 파악", mode: "도입" },
      { time: "00:15–00:50", title: "영업 업무의 AI 적용 지도", detail: "리드 발굴부터 계약 후 관리까지 단계별 자동화 기회 분석", mode: "이론" },
      { time: "00:50–01:50", title: "영업 메일·팔로업 자동화", detail: "첫 접촉, 미팅 후, 장기 미응답 고객 메시지 작성", mode: "실습" },
      { time: "02:00–03:10", title: "제안서 초안 자동화", detail: "고객사 맥락을 반영한 제안서 뼈대와 회사 강점 템플릿 제작", mode: "실습" },
      { time: "03:10–04:00", title: "미팅 준비·기록 자동화", detail: "사전 브리핑, 회의 기록, 할 일 정리와 개인 AI 영업 루틴 설계", mode: "실습" },
    ],
    advanced: [
      "고객사·업계·경쟁사 리서치 자동화",
      "영업 현황 보고와 대시보드 자동화",
      "팀 공통 프롬프트 라이브러리 구축",
    ],
    preparation: ["실습용 노트북", "생성형 AI 계정", "기밀을 제거한 최근 영업 메일 또는 제안서 1건"],
  },
];

export function getFeaturedCourse(slug: string) {
  return featuredCourses.find((course) => course.slug === slug);
}
