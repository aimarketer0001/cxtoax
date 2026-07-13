import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MicrositeContactForm from "./MicrositeContactForm";
import MicrositeFloatingMenu from "./MicrositeFloatingMenu";
import WorkshopChecklist from "./WorkshopChecklist";
import { OG_IMAGE, absoluteUrl } from "@/lib/site";
import "./styles.css";

export const metadata: Metadata = {
  title: "2026 하반기 마케팅 실행 전략 리포트",
  description:
    "AI 검색, CRM 자동화, 콘텐츠 운영, 캠페인 실행 로드맵을 실무 관점으로 정리한 2026 하반기 마케팅 전략 리포트입니다.",
  alternates: {
    canonical: absoluteUrl("/marketing-h2-2026"),
  },
  openGraph: {
    title: "2026 하반기 마케팅 실행 전략 리포트",
    description:
      "AI 검색 대응부터 CRM 자동화까지, 하반기 마케팅 실행 체계를 실무 관점으로 정리합니다.",
    url: absoluteUrl("/marketing-h2-2026"),
    images: [absoluteUrl(OG_IMAGE)],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 하반기 마케팅 실행 전략 리포트",
    description:
      "AI 검색 대응부터 CRM 자동화까지, 하반기 마케팅 실행 체계를 실무 관점으로 정리합니다.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

const combinedCriteria = [
  {
    label: "AI 검색/AEO",
    insightTitle: "브랜드 신뢰가 AI 검색 결과를 좌우한다",
    insightCopy: "AI가 브랜드를 요약하고 추천하는 환경에서는 출처, 관점, 사례가 검색 노출의 기반이 됩니다.",
    evidenceTitle: "AI가 인용할 수 있는 공개 웹 자산인가",
    criteria: ["공개 접근 가능", "질문형 제목", "짧은 답변", "FAQ·비교표", "최종 업데이트·출처 표기"],
    refSource: "OpenAI",
    refTitle: "Publishers and Developers FAQ",
    refHref: "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq",
  },
  {
    label: "웹사이트 가독성",
    insightTitle: "AI 검색 대응은 SEO를 넘어 AEO로 확장된다",
    insightCopy: "질문형 콘텐츠, FAQ, 비교표, 명확한 엔티티 구조가 답변 엔진의 인용 가능성을 높입니다.",
    evidenceTitle: "사람뿐 아니라 LLM도 읽을 수 있는 구조인가",
    criteria: ["이미지 안 텍스트 최소화", "핵심 스펙 텍스트화", "문단 길이 제한", "엔티티 명칭 일관성"],
    refSource: "Adobe",
    refTitle: "AI Traffic Surge & Machine Readability 분석",
    refHref: "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable",
  },
  {
    label: "콘텐츠 공급망",
    insightTitle: "영상·숏폼은 인지도 확보의 기본 채널이 된다",
    insightCopy: "짧게 발견시키고, 긴 콘텐츠로 설득하며, CRM 메시지로 회수하는 연결 구조가 필요합니다.",
    evidenceTitle: "하나의 핵심 메시지가 채널별 자산으로 전환되는가",
    criteria: ["월간 메시지 1문장", "롱폼 원본", "숏폼 변환", "뉴스레터·세일즈 자산 재활용"],
    refSource: "HubSpot",
    refTitle: "Marketing Statistics & Industry Trends",
    refHref: "https://www.hubspot.com/marketing-statistics",
  },
  {
    label: "CRM 자동화",
    insightTitle: "CRM 리텐션 전략이 하반기 성과를 좌우한다",
    insightCopy: "신규 유입보다 먼저 웰컴·육성·휴면 회수 플로우를 정비해야 매출 누수를 막습니다.",
    evidenceTitle: "신규 광고 전에 회수·육성 플로우가 정리됐는가",
    criteria: ["세그먼트 기준", "웰컴 플로우", "육성 플로우", "휴면 회수 플로우", "성과 코호트 분석"],
    refSource: "Klaviyo",
    refTitle: "Email Marketing Benchmarks",
    refHref: "https://www.klaviyo.com/products/email-marketing/benchmarks",
  },
  {
    label: "AI 운영 체계",
    insightTitle: "AI 업무 흐름이 실무 생산성을 높인다",
    insightCopy: "조사, 브리프, 초안, 검수, 보고를 반복 가능한 업무 흐름으로 연결합니다.",
    evidenceTitle: "AI가 단발성 도구가 아니라 반복 업무 흐름에 들어갔는가",
    criteria: ["리서치 자동화", "콘텐츠 QA", "주간 리포트", "다음 액션 제안", "사람 검토 단계"],
    refSource: "LinkedIn",
    refTitle: "2025 B2B Benchmark: AI Advantage",
    refHref: "https://business.linkedin.com/content/dam/business/marketing-solutions/global/en_US/site/pdf/wp/2025/2025-b2b-benchmark-ai-advantage.pdf",
  },
  {
    label: "리스크 기준",
    insightTitle: null,
    insightCopy: null,
    evidenceTitle: "개인정보·저작권·브랜드 안전 기준이 문서화됐는가",
    criteria: ["개인정보 마스킹", "저작권 검토", "브랜드 톤 검수", "승인 책임자", "로그·보안 관리"],
    refSource: "개인정보보호위원회",
    refTitle: "생성형 AI 개인정보 처리 안내",
    refHref: "https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=11410",
  },
];

const workshopSteps = [
  {
    step: "Step 1",
    title: "변화 이해",
    copy: "검색의 주체가 사람에서 AI로 확장되었음을 업무 관점에서 이해합니다.",
    awareness: "AI가 먼저 우리 페이지를 읽는구나",
    action: "AI가 보는 첫 화면이 무엇인지 생각해 보기",
  },
  {
    step: "Step 2",
    title: "진단 기준 확인",
    copy: "AI가 읽기 어려운 페이지와 인용하기 쉬운 페이지를 비교합니다.",
    awareness: "우리 페이지에도 문제가 있을 수 있겠네",
    action: "우리 회사 주요 페이지 1개를 떠올리기",
  },
  {
    step: "Step 3",
    title: "개선 방법 적용",
    copy: "질문형 소제목, 짧은 답, FAQ, 텍스트 표 구조를 적용합니다.",
    awareness: "개발 없이도 일부는 고칠 수 있겠다",
    action: "질문형 소제목과 FAQ가 있는지 확인하기",
  },
  {
    step: "Step 4",
    title: "실행 과제 정리",
    copy: "방문이 많은 페이지 1개를 골라 바로 개편합니다.",
    awareness: "오늘 해야 할 일이 명확하다",
    action: "이번 주에 바꿀 페이지 1개 정하기",
  },
];

const pageComparison = [
  {
    label: "BEFORE",
    title: "AI가 이해하기 어려운 페이지",
    tone: "before",
    bullets: [
      "효능 표현은 많지만 어떤 피부 고민에 맞는지 불명확",
      "전성분·용량·가격·사용법이 이미지 안에만 존재",
      "질문에 대한 답이 긴 소개문과 배너에 흩어짐",
      "최종 업데이트 날짜와 성분 출처 표기 없음",
    ],
  },
  {
    label: "AFTER",
    title: "AI가 인용하기 쉬운 페이지",
    tone: "after",
    bullets: [
      "피부 고민 질문 아래 2~3문장으로 바로 답변",
      "용량·가격·핵심 성분·사용법을 텍스트 표로 제공",
      "FAQ 섹션으로 민감성·사용 순서·사용 주기를 정리",
      "최종 업데이트 날짜와 전성분 출처 명시",
    ],
  },
];

const workshopResources = [
  {
    title: "하반기 전략 리포트",
    copy: "핵심 인사이트와 7~12월 실행 프레임 다시 보기",
    href: "#campaign-roadmap",
  },
  {
    title: "페이지 진단 체크리스트",
    copy: "우리 회사 페이지의 AI 가독성을 점검하는 4가지 기준",
    href: "#checklist",
  },
  {
    title: "교육 상담 문의",
    copy: "리포트 내용을 우리 조직 교육이나 워크숍으로 연결하기",
    href: "#report-contact",
  },
];

const weeklyActions = [
  {
    title: "페이지 찾기",
    copy: "GA에서 방문이 많은 페이지 상위 20개를 확인한다.",
    time: "10분",
  },
  {
    title: "구조 진단",
    copy: "4가지 기준으로 O/X 체크한다.",
    time: "10분",
  },
  {
    title: "우선 개선",
    copy: "X가 가장 많은 페이지 1개부터 질문형 소제목과 FAQ를 추가한다.",
    time: "10분 이상",
  },
];

function ComparePageMockup({ tone }: { tone: string }) {
  if (tone === "before") {
    return (
      <figure className="compare-mockup compare-mockup-before" aria-label="AI가 읽기 어려운 화장품 에센스 상세 페이지 예시">
        <div className="mock-browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-visual-block">
          <span>에센스 제품 비주얼</span>
        </div>
        <div className="mock-copy-block">
          <strong>피부에 닿는 순간, 투명하게 차오르는 빛</strong>
          <p>
            고농축 수분 에너지가 지친 피부에 생기를 더하고 매끈한 결을
            완성합니다.
          </p>
          <p>
            브랜드만의 독자 포뮬러로 매일 새롭게 빛나는 피부 루틴을 제안합니다.
          </p>
        </div>
        <div className="mock-image-spec">전성분 · 용량 · 가격 · 사용법 이미지</div>
        <div className="mock-missing-meta">FAQ 없음 · 성분 출처 없음 · 업데이트 날짜 없음</div>
      </figure>
    );
  }

  return (
    <figure className="compare-mockup compare-mockup-after" aria-label="AI가 인용하기 쉬운 화장품 에센스 상세 페이지 예시">
      <div className="mock-browser-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="mock-answer-block">
        <strong>Q. 이 에센스는 어떤 피부 고민에 적합한가요?</strong>
        <p>
          건조로 인한 속당김과 칙칙한 피부 톤이 고민인 복합성·건성 피부에
          적합합니다. 세안 후 토너 다음 단계에서 2~3방울을 얼굴 전체에 펴 바릅니다.
        </p>
      </div>
      <dl className="mock-spec-table">
        <div>
          <dt>용량</dt>
          <dd>30ml</dd>
        </div>
        <div>
          <dt>핵심 성분</dt>
          <dd>나이아신아마이드</dd>
        </div>
        <div>
          <dt>가격</dt>
          <dd>32,000원</dd>
        </div>
      </dl>
      <div className="mock-faq-block">
        <strong>FAQ</strong>
        <p>Q. 민감성 피부도 사용할 수 있나요?</p>
        <p>A. 사용 전 팔 안쪽 패치 테스트를 권장합니다.</p>
      </div>
      <div className="mock-source-meta">최종 업데이트 2026.07 · 출처: 제품 전성분표</div>
    </figure>
  );
}

const frameworkStages = [
  {
    period: "7~8월",
    title: "구조 정비",
    tasks: ["홈페이지/FAQ 개편", "브랜드 메시지 재정의", "CRM 세그먼트 정리"],
    channels: "홈페이지, 블로그, 뉴스레터",
    effect: "AI 검색과 세일즈 전환의 기반 확보",
  },
  {
    period: "9~10월",
    title: "신뢰·모수 축적",
    tasks: ["후기/사례 공개", "숏폼 시리즈 운영", "웨비나/세미나 전환 강화"],
    channels: "Shorts, Reels, LinkedIn, 웨비나",
    effect: "리마케팅 모수와 콘텐츠 신뢰 자산 확대",
  },
  {
    period: "11~12월",
    title: "수익화·리텐션 극대화",
    tasks: ["오퍼형 랜딩 운영", "휴면/우수고객별 플로우", "연말 리포트와 내년 파이프라인"],
    channels: "이메일, 카카오, 리타게팅, 세일즈 자료",
    effect: "문의·구매 전환과 재방문/LTV 개선",
  },
];

const monthlyRoadmap = [
  {
    month: "7월",
    goal: "메시지 재정의",
    copy: "홈페이지, 상위 랜딩, FAQ를 우선 정비하고 하반기 핵심 메시지를 한 문장으로 고정합니다.",
    priority: "상",
  },
  {
    month: "8월",
    goal: "세그먼트 분화",
    copy: "CRM 세그먼트와 이메일 플로우를 재구성하고 상황별 가이드와 체크리스트를 발행합니다.",
    priority: "상",
  },
  {
    month: "9월",
    goal: "시즌 수요 선점",
    copy: "추석 시즌 큐레이션, 후기 요청, 추천인 플로우를 동시에 열어 신뢰 자산을 확보합니다.",
    priority: "상",
  },
  {
    month: "10월",
    goal: "성수기 예열",
    copy: "크리에이터 협업, 비교표, 숏폼 시리즈로 리마케팅 모수를 확대합니다.",
    priority: "중상",
  },
  {
    month: "11월",
    goal: "수익화 집중",
    copy: "오퍼별 랜딩, 카카오, 이메일, 리타게팅을 동시 운영해 전환 타이밍을 맞춥니다.",
    priority: "최상",
  },
  {
    month: "12월",
    goal: "리텐션/LTV",
    copy: "연말 리포트, VIP 오퍼, 휴면 복귀, 내년 파이프라인 캠페인을 운영합니다.",
    priority: "최상",
  },
];

const channelCards = [
  ["홈페이지/FAQ", "AI가 읽는 브랜드 허브", "월 4~8개 섹션 리프레시"],
  ["블로그/SEO/AEO", "비브랜드 검색과 답변형 노출", "주 2~4개 고품질 발행"],
  ["Shorts/TikTok/Reels", "발견과 리콜 확장", "주 4~7개 숏폼"],
  ["YouTube/웨비나", "깊은 설명과 신뢰 전환", "주 1회 이상 롱폼"],
  ["뉴스레터/이메일", "리드 육성과 재방문", "주 1~3회 캠페인"],
  ["카카오/커뮤니티", "즉시성 메시지와 상담 유도", "주 1~2회 핵심 알림"],
];

const aiUseCases = [
  ["고객 페르소나 분석", "고객군별 문제·욕구·반대 논리 정리", "세그먼트별 메시지 선명화", "원본 데이터 익명화 필요"],
  ["콘텐츠 아이디어 생성", "월간 메시지 기반 소재와 후킹 문장 생성", "기획 회의 리드타임 단축", "브랜드 톤 검수 필요"],
  ["블로그/SNS 초안 작성", "롱폼 초안과 숏폼 스크립트 변환", "콘텐츠 재활용률 향상", "근거와 수치 검증 필요"],
  ["캠페인 캘린더 생성", "채널별 발행 리듬과 CTA 배치 설계", "운영 누락 감소", "과도한 빈도 방지 필요"],
  ["성과 데이터 요약", "주간 리포트, 이상치 탐지, 다음 액션 제안", "보고 준비 시간 절감", "상관관계 오판 주의"],
  ["제안서/보고서 자동화", "세일즈 제안서와 교육 보고서 초안 생성", "반복 문서 작업 절감", "고객 정보 마스킹 필요"],
];

const kpis = [
  "웹사이트 방문수",
  "콘텐츠 조회수",
  "리드 수집 수",
  "문의 전환율",
  "이메일 오픈율",
  "재방문율",
  "세미나 신청 수",
];

const risks = [
  "콘텐츠 품질 저하",
  "AI 생성 콘텐츠의 신뢰 부족",
  "채널 운영 과부하",
  "성과 측정 기준 부재",
  "고객 데이터 관리 미흡",
];


const referenceSources = [
  ["OpenAI", "Publishers and Developers FAQ", "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq"],
  ["Anthropic", "Claude Web Search Tool Documentation", "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool"],
  ["Google", "Consumer Decision Journey / AI Search 관련 자료", "https://www.thinkwithgoogle.com/consumer-insights/consumer-journey/new-consumer-decision-making-process/"],
  ["Adobe", "AI Traffic Surge & Machine Readability 분석", "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable"],
  ["HubSpot", "Marketing Statistics & Industry Trends", "https://www.hubspot.com/marketing-statistics"],
  ["LinkedIn", "2025 B2B Benchmark: AI Advantage", "https://business.linkedin.com/content/dam/business/marketing-solutions/global/en_US/site/pdf/wp/2025/2025-b2b-benchmark-ai-advantage.pdf"],
  ["Klaviyo", "Email Marketing Benchmarks", "https://www.klaviyo.com/products/email-marketing/benchmarks"],
  ["개인정보보호위원회", "생성형 AI 개인정보 처리 안내", "https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=11410"],
];

const relatedPrograms = [
  {
    title: "AI 마케팅 실무 교육",
    copy: "이 리포트의 AI 검색, 콘텐츠, CRM 전략을 실습형 교육으로 배웁니다.",
  },
  {
    title: "AX 실무 전환 교육",
    copy: "마케팅 업무를 AI 기반 운영 프로세스로 바꾸는 방법을 익힙니다.",
  },
  {
    title: "CRM 기반 고객경영 교육",
    copy: "고객 세그먼트, 리텐션, 회수 플로우를 CRM 관점에서 설계합니다.",
  },
  {
    title: "프롬프트 기반 업무 도구 제작(바이브 코딩) 교육",
    copy: "비개발자도 캠페인 자동화 도구와 내부 업무 도구를 기획해 봅니다.",
  },
];

const faqs = [
  {
    category: "전략 기준",
    question: "하반기 마케팅 캠페인은 무엇부터 정비해야 하나요?",
    answer: "홈페이지/FAQ/비교 페이지, CRM 세그먼트, 월별 핵심 메시지를 먼저 정비하는 것이 좋습니다.",
  },
  {
    category: "AI 검색",
    question: "AI 검색 대응은 SEO와 무엇이 다른가요?",
    answer: "키워드 순위뿐 아니라 AI가 브랜드를 어떤 문장으로 요약하고 어떤 출처를 인용하는지까지 관리합니다.",
  },
  {
    category: "CRM·자동화",
    question: "작은 조직도 CRM 자동화를 시작할 수 있나요?",
    answer: "가능합니다. 웰컴, 육성, 휴면 회수 같은 기본 플로우부터 작게 시작하는 편이 가장 현실적입니다.",
  },
  {
    category: "AI 검색",
    question: "AI가 인용하기 쉬운 페이지는 어떤 구조인가요?",
    answer: "질문형 소제목 아래에 2~3문장의 짧은 답변을 두고, 핵심 스펙은 이미지가 아닌 텍스트 표나 목록으로 제공하는 구조가 좋습니다.",
  },
  {
    category: "실행·리스크",
    question: "15분 실행 워크숍에서는 무엇을 하나요?",
    answer: "방문이 많은 페이지 1개를 골라 AI가 읽기 어려운 부분을 찾고, 질문형 제목, 짧은 답변, FAQ, 출처 표기 기준으로 개선 방향을 정리합니다.",
  },
  {
    category: "전략 기준",
    question: "근거와 참고 기준은 어디에서 가져왔나요?",
    answer: "내부 딥서치 보고서와 OpenAI, Google, Adobe, HubSpot, LinkedIn, Klaviyo 등 주요 플랫폼·벤치마크 자료를 바탕으로 정리했습니다.",
  },
  {
    category: "CRM·자동화",
    question: "CRM 자동화는 어떤 플로우부터 시작하는 것이 좋나요?",
    answer: "처음에는 웰컴, 육성, 휴면 회수처럼 고객 여정이 분명하고 반복성이 높은 플로우부터 시작하는 것이 현실적입니다.",
  },
  {
    category: "실행·리스크",
    question: "AI 활용 시 개인정보와 저작권은 어떻게 관리해야 하나요?",
    answer: "고객 정보는 익명화하거나 마스킹하고, AI 생성 콘텐츠는 브랜드 톤, 사실관계, 저작권, 인물·경쟁사 표현 기준을 사람 검토 단계에서 확인해야 합니다.",
  },
];

const pageUrl = "https://cxtoax.vercel.app/marketing-h2-2026";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "2026 하반기 마케팅 실행 전략 리포트",
  description:
    "AI 검색 대응, 브랜드 신뢰, 콘텐츠 운영, CRM 자동화, AI 업무 운영 체계를 실무 관점으로 정리한 2026 하반기 마케팅 실행 전략 리포트입니다.",
  inLanguage: "ko-KR",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-07-03",
  dateModified: "2026-07-09",
  author: {
    "@type": "Person",
    name: "전선희 Sunny Jun",
    url: "https://cxtoax.vercel.app/#about",
  },
  publisher: {
    "@type": "Organization",
    name: "CX to AX",
    url: "https://cxtoax.vercel.app",
  },
  about: [
    "AI 검색 대응",
    "AEO",
    "CRM 자동화",
    "AI 마케팅",
    "콘텐츠 운영",
    "마케팅 KPI",
  ],
  citation: referenceSources.map(([source, title, href]) => `${source}: ${title} (${href})`),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function MarketingMicrositePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MarketingHeader />
      <MicrositeFloatingMenu />

      <nav className="micro-nav" aria-label="하반기 마케팅 캠페인 섹션">
        <div className="micro-nav-inner">
          <a href="#overview">전략 개요</a>
          <a href="#campaign-roadmap">실행 계획</a>
          <a href="#workshop">실행 워크숍</a>
          <a href="#report-contact" className="micro-nav-cta">
            교육 상담 문의하기
          </a>
        </div>
      </nav>

      <header className="micro-hero" id="overview">
        <div className="microsite-wrap hero-grid">
          <div>
            <p className="hero-kicker">2026 H2 Marketing Campaign System</p>
            <h1>
              2026 하반기 마케팅 실행 전략 리포트
            </h1>
            <p className="hero-lead">
              AI 검색 대응, 브랜드 신뢰, 콘텐츠 운영, CRM 자동화, AI 운영을
              하나의 실행 흐름으로 묶어 하반기 마케팅 운영 체계로
              정리했습니다.
            </p>
            <div className="report-meta" aria-label="보고서 정보">
              <span>대상 · 마케팅 리더/실무자/교육 담당자</span>
              <span>작성자 · 전선희 Sunny Jun</span>
              <span>발행일 · 2026.07.03</span>
              <span>최종 업데이트 · 2026.07.09</span>
              <span>검토 기준 · 딥서치 보고서와 주요 플랫폼 공식 자료</span>
            </div>
            <div className="hero-actions">
              <a href="#key-insights" className="micro-btn micro-btn-primary">
                핵심 인사이트 보기
              </a>
              <a href="#report-contact" className="micro-btn micro-btn-ghost">
                교육 상담 문의하기
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="핵심 전략 요약">
            <div className="panel-head">
              <span>CAMPAIGN OS</span>
              <strong>5 pillars</strong>
            </div>
            <dl>
              <div>
                <dt>Search</dt>
                <dd>SEO에서 AEO와 AI 검색 대응으로 확장</dd>
              </div>
              <div>
                <dt>Trust</dt>
                <dd>출처·관점·사례로 브랜드 신뢰 기반 축적</dd>
              </div>
              <div>
                <dt>Content</dt>
                <dd>롱폼 원본에서 숏폼과 CRM 자산으로 전환</dd>
              </div>
              <div>
                <dt>CRM</dt>
                <dd>신규 광고보다 먼저 육성/회수 플로우 정비</dd>
              </div>
              <div>
                <dt>AI Ops</dt>
                <dd>조사, 브리프, 초안, 검수, 보고 흐름 정비</dd>
              </div>
            </dl>
          </aside>
        </div>
      </header>

      <section className="microsite-section" id="key-insights">
        <div className="microsite-wrap">
          <p className="section-kicker">KEY INSIGHTS & CRITERIA</p>
          <h2>하반기 마케팅 실행을 위한 5가지 인사이트와 리스크 기준</h2>
          <p className="section-lead">
            탐색 경로는 광고 클릭에서 끝나지 않습니다. AI 검색, 영상,
            커뮤니티, 메시징, CRM이 함께 작동하며 브랜드가 어떤 구조로
            설명되는지가 성과에 영향을 줍니다. 각 인사이트에는 점검 기준과
            출처 링크를 함께 표시합니다.
          </p>
          <div className="combined-grid">
            {combinedCriteria.map((item) => (
              <article className="combined-card" key={item.evidenceTitle}>
                <div className="combined-card-head">
                  <span className="combined-label">{item.label}</span>
                </div>
                {item.insightTitle && (
                  <div className="combined-insight">
                    <strong>{item.insightTitle}</strong>
                    <p>{item.insightCopy}</p>
                  </div>
                )}
                <div className="combined-evidence">
                  <p className="combined-evidence-q">{item.evidenceTitle}</p>
                  <ul className="combined-criteria">
                    {item.criteria.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <a
                  className="combined-ref"
                  href={item.refHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  출처: {item.refSource}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            ))}
          </div>

          <aside className="workshop-bridge" aria-label="전략 프레임 안내">
            <div>
              <span>3단계 · 6개월 · 실행 운영 체계</span>
              <h3>이제 인사이트를 하반기 실행 순서로 정리합니다</h3>
              <strong>구조 정비에서 리텐션까지, 월별 운영 흐름으로 보기</strong>
              <p>
                위 5가지 인사이트는 각각 따로 실행하면 힘이 약합니다. 먼저
                7월부터 12월까지 어떤 순서로 구조를 정비하고, 어떤 채널과
                CRM 흐름으로 연결할지 큰 운영 체계를 잡아야 합니다.
              </p>
            </div>
            <div className="workshop-bridge-actions">
              <a href="#campaign-roadmap" className="micro-btn micro-btn-primary">
                실행 계획·로드맵 보기
              </a>
            </div>
          </aside>
        </div>
      </section>


      <section className="microsite-section" id="campaign-roadmap">
        <div className="microsite-wrap">
          <p className="section-kicker">STRATEGY FRAMEWORK & ROADMAP</p>
          <h2>7월부터 12월까지, 단계별 실행 계획</h2>
          <p className="section-lead">
            하반기는 구조 정비, 신뢰·모수 축적, 수익화·리텐션 극대화 3단계로
            운영합니다. 월별 메시지를 한 줄로 고정하고 실행 리듬을 반복합니다.
          </p>
          <div className="timeline-grid">
            {monthlyRoadmap.map((item) => (
              <div className="tl-head" key={`head-${item.month}`}>
                <span>{item.month}</span>
                <b>{item.priority}</b>
              </div>
            ))}
            {frameworkStages.map((item, i) => (
              <article className="tl-phase" key={item.period}>
                <strong>{item.title}</strong>
                <p>{item.effect}</p>
                <ul>
                  {item.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                  <li>추천 채널 · {item.channels}</li>
                </ul>
                {i < frameworkStages.length - 1 && (
                  <span className="tl-phase-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2.5l4.5 4.5L5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </article>
            ))}
            {monthlyRoadmap.map((item) => (
              <article className="tl-month" key={`month-${item.month}`}>
                <h4>{item.goal}</h4>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section" id="channels">
        <div className="microsite-wrap">
          <p className="section-kicker">CHANNELS</p>
          <h2>채널별 역할을 다시 나눕니다</h2>
          <div className="channel-grid">
            {channelCards.map(([name, role, rhythm]) => (
              <article key={name} className="channel-card">
                <h3>{name}</h3>
                <p>{role}</p>
                <span>{rhythm}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section alt" id="ai-tools">
        <div className="microsite-wrap ai-grid">
          <div>
            <p className="section-kicker">AI SYSTEM</p>
          <h2>AI는 카피 작성 도구가 아니라 업무 운영 방식입니다</h2>
            <p className="section-lead">
              하반기에는 프롬프트만 잘 쓰는 조직보다 업무 맥락, 승인 단계,
              도구, 데이터를 함께 정리하는 조직이 더 빠르게 움직입니다.
            </p>
          </div>
          <div className="ai-table-wrap">
            <table className="ai-data-table">
              <caption>마케팅 업무별 AI 적용 방식, 기대 효과, 검토 기준</caption>
              <thead>
                <tr>
                  <th scope="col">업무 영역</th>
                  <th scope="col">AI 적용 방식</th>
                  <th scope="col">기대 효과</th>
                  <th scope="col">검토 기준</th>
                </tr>
              </thead>
              <tbody>
                {aiUseCases.map(([work, use, impact, caution]) => (
                  <tr key={work}>
                    <th scope="row">{work}</th>
                    <td>{use}</td>
                    <td>{impact}</td>
                    <td>{caution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="microsite-section" id="kpi-risk">
        <div className="microsite-wrap">
          <p className="section-kicker">KPI & RISK</p>
          <h2>성과 관리와 리스크를 함께 봅니다</h2>
          <p className="section-lead">
            AI 활용 캠페인은 속도가 빠른 만큼 품질, 측정, 데이터 관리 기준을
            함께 세워야 합니다.
          </p>
          <div className="kpi-risk-grid">
            <article>
              <h3>관리 KPI</h3>
              <ul>
                {kpis.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>주요 리스크</h3>
              <ul>
                {risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <div className="report-to-workshop" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>리포트를 읽었다면, 이제 직접 적용해 보세요</span>
      </div>

      <section className="microsite-section alt practical-workshop" id="workshop">
        <div className="microsite-wrap">
          <p className="section-kicker">PRACTICAL WORKSHOP</p>
          <h2>AI 검색 시대, 우리 회사 페이지부터 바꾸기</h2>
          <div className="workshop-origin" aria-label="워크숍 출처">
            <span>INSIGHT 02 · AI 검색 대응은 SEO를 넘어 AEO로 확장된다</span>
            <span>전략 · AI 검색/AEO 대응</span>
          </div>
          <p className="workshop-intro">
            전략 프레임, 채널 역할, AI 활용 기준을 실제 페이지 1개에 적용해
            보는 짧은 실습입니다. 리포트를 읽는 데서 끝내지 않고, 우리 회사
            페이지를 AI가 읽고 인용하기 쉬운 구조로 바꾸는 데 초점을 둡니다.
          </p>

          <div className="workshop-meta" aria-label="워크숍 정보">
            <span>대상 · 홈페이지·콘텐츠를 직접 관리하는 마케팅 실무자</span>
            <span>소요 시간 · 15분</span>
            <span>결과물 · 페이지 1개 진단 결과와 개선 방향</span>
            <span>난이도 · 개발 지식 없이 가능</span>
          </div>

          <div className="workshop-step-grid">
            {workshopSteps.map((item) => (
              <article className="workshop-step-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <blockquote>“{item.awareness}”</blockquote>
                <strong>실행 포인트 · {item.action}</strong>
              </article>
            ))}
          </div>

          <div className="workshop-compare">
            <div className="section-head-row">
              <div>
                <p className="section-kicker">BEFORE / AFTER</p>
                <h2>AI가 이해하기 어려운 페이지 vs 인용하기 쉬운 페이지</h2>
              </div>
            </div>
            <div className="compare-grid">
              {pageComparison.map((item) => (
                <article
                  className={`compare-card compare-card-${item.tone}`}
                  key={item.label}
                >
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <ComparePageMockup tone={item.tone} />
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="workshop-highlight">
              AI는 ‘질문 → 짧은 답’ 구조를 잘 인용합니다. 그래서 FAQ와
              텍스트 표가 중요합니다.
            </p>
            <div className="compare-next-step">
              <div>
                <strong>이제 우리 회사 페이지를 같은 기준으로 점검해 보세요.</strong>
                <p>
                  방문이 많은 페이지 1개를 골라 Before/After 예시와 비교한 뒤,
                  아래 체크리스트로 개선 우선순위를 정리하면 됩니다.
                </p>
              </div>
              <a href="#checklist" className="micro-btn micro-btn-primary">
                체크리스트로 진단하기
              </a>
            </div>
          </div>

          <div className="workshop-resource-grid" aria-label="관련 자료">
            {workshopResources.map((item) => (
              <article className="workshop-resource-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a href={item.href}>바로 보기</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section" id="checklist">
        <div className="microsite-wrap">
          <p className="section-kicker">PAGE CHECKLIST</p>
          <h2>우리 회사 페이지 AI 가독성 체크리스트</h2>
          <p className="section-lead">
            워크숍에서 확인한 기준을 바탕으로 방문이 많은 페이지 1개를
            진단해 보세요. 미흡한 항목이 많은 페이지부터 이번 주 개선
            대상으로 삼으면 됩니다.
          </p>

          <WorkshopChecklist />

          <aside className="weekly-action" aria-label="이번 주 실행 과제">
            <div>
              <p className="section-kicker">THIS WEEK ACTION</p>
              <h2>이번 주, 딱 한 페이지만 바꿔보세요</h2>
              <p>
                20개를 한 번에 고치려고 하지 않아도 됩니다. 방문이 많은
                페이지 1개를 골라 질문형 소제목, 짧은 답변, FAQ 구조를
                추가하는 것부터 시작하세요. 작은 시작이 AI 검색 시대의 가장
                확실한 준비입니다.
              </p>
            </div>
            <div className="weekly-action-grid">
              {weeklyActions.map((item, index) => (
                <article key={item.title}>
                  <span>{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <strong>{item.time}</strong>
                </article>
              ))}
            </div>
            <div className="weekly-action-cta">
              <a href="#report-contact" className="micro-btn micro-btn-primary">
                교육 상담 문의하기
              </a>
              <a href="#key-insights" className="micro-btn micro-btn-outline">
                핵심 인사이트 보기
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="microsite-section" id="instructor">
        <div className="microsite-wrap instructor-grid">
          <div className="instructor-photo">
            <Image
              src="/instructor.jpg"
              alt="전선희 Sunny Jun 프로필 사진"
              width={480}
              height={600}
              sizes="(max-width: 860px) 100vw, 380px"
            />
          </div>
          <div>
            <p className="section-kicker">INSTRUCTOR</p>
            <h2>CRM 컨설팅 경험을 AI 활용 교육으로 연결하는 실무형 강사</h2>
            <p className="section-lead">
              전선희(Sunny Jun)는 국내 대기업 다수의 CRM, 영업, 상담,
              고객경험 프로젝트를 수행해 온 컨설턴트입니다. 마케팅 전략을
              콘텐츠 계획에 머물게 하지 않고 고객 접점 운영 구조와 연결해 설명합니다.
            </p>
            <div className="profile-facts">
              <div>
                <strong>30건+</strong>
                <span>국내 대기업 프로젝트 수행</span>
              </div>
              <div>
                <strong>CRM</strong>
                <span>Salesforce, Siebel 기반 컨설팅</span>
              </div>
              <div>
                <strong>AX</strong>
                <span>AI 활용과 업무 자동화 교육</span>
              </div>
            </div>
            <Link href="/#about" className="text-link">
              강사 프로필 자세히 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="microsite-section alt" id="related-programs">
        <div className="microsite-wrap">
          <p className="section-kicker">RELATED PROGRAMS</p>
          <h2>리포트 내용을 교육 프로그램으로 이어가기</h2>
          <div className="program-grid">
            {relatedPrograms.map((program) => (
              <article className="program-card" key={program.title}>
                <h3>{program.title}</h3>
                <p>{program.copy}</p>
                <a
                  href="#report-contact"
                  className="program-link"
                data-contact-topic={program.title}
                aria-label={`${program.title} 교육 상담`}
              >
                  교육 상담 문의하기
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section" id="faq">
        <div className="microsite-wrap faq-wrap">
          <p className="section-kicker">FAQ</p>
          <h2>자주 묻는 질문</h2>
          <div className="faq-list">
            {faqs.map(({ category, question, answer }) => (
              <details key={question}>
                <summary>
                  <span className="faq-category">{category}</span>
                  <span className="faq-question">{question}</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MicrositeContactForm />
    </>
  );
}
