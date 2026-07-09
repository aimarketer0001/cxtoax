import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MicrositeContactForm from "./MicrositeContactForm";
import MicrositeFloatingMenu from "./MicrositeFloatingMenu";
import "./styles.css";

export const metadata: Metadata = {
  title: "2026 하반기 마케팅 캠페인 전략 보고서",
  description:
    "AI 검색, CRM 자동화, 콘텐츠 전략, 캠페인 로드맵을 중심으로 정리한 2026 하반기 마케팅 전략 인사이트 리포트입니다.",
  openGraph: {
    title: "2026 하반기 마케팅 캠페인 전략 보고서",
    description:
      "AI 검색 대응부터 CRM 자동화까지, 하반기 마케팅 실행 체계를 한 페이지에서 정리합니다.",
    images: ["/og-image.jpg"],
  },
};

const keyInsights = [
  {
    title: "브랜드 신뢰가 검색 성과를 좌우한다",
    copy: "AI가 브랜드를 요약하고 추천하는 환경에서는 출처, 관점, 사례가 검색 성과의 기반이 됩니다.",
  },
  {
    title: "AI 검색 대응은 SEO를 넘어 AEO로 확장된다",
    copy: "질문형 콘텐츠, FAQ, 비교표, 명확한 엔티티 구조가 답변 엔진의 인용 가능성을 높입니다.",
  },
  {
    title: "영상·숏폼은 인지도 확보의 기본 채널이 된다",
    copy: "짧게 발견시키고, 긴 콘텐츠로 설득하며, CRM 메시지로 회수하는 연결 구조가 필요합니다.",
  },
  {
    title: "CRM 리텐션 전략이 하반기 성과를 좌우한다",
    copy: "신규 유입보다 먼저 welcome, nurture, win-back 플로우를 정비해야 매출 누수를 막습니다.",
  },
  {
    title: "AI 에이전트 기반 운영이 실무 생산성을 높인다",
    copy: "조사, 브리프, 초안, 검수, 보고를 하나의 반복 가능한 워크플로로 연결합니다.",
  },
];

const strategyCards = [
  {
    label: "01",
    title: "AI 검색/AEO 대응",
    copy:
      "홈페이지, FAQ, 비교 페이지, 브랜드 소개를 AI가 인용하기 쉬운 구조로 정리합니다.",
    bullets: ["질문형 콘텐츠", "엔티티 일관성", "FAQ/비교표"],
  },
  {
    label: "02",
    title: "브랜드 신뢰 콘텐츠",
    copy:
      "AI 콘텐츠가 넘치는 환경에서 브랜드 관점, 근거, 사례가 남도록 콘텐츠 중심축을 세웁니다.",
    bullets: ["브랜드 POV", "고객 사례", "근거 기반 주장"],
  },
  {
    label: "03",
    title: "영상 중심 공급망",
    copy:
      "하나의 롱폼 자산을 숏폼, 뉴스레터, 세일즈 자료, CRM 메시지로 전환합니다.",
    bullets: ["롱폼 원본", "숏폼 분해", "CRM 재활용"],
  },
  {
    label: "04",
    title: "CRM 자동화",
    copy:
      "광고 증액 전에 welcome, nurture, win-back, referral 플로우를 정비합니다.",
    bullets: ["세그먼트", "이메일/카카오", "회수 플로우"],
  },
  {
    label: "05",
    title: "AI 에이전트 운영",
    copy:
      "리서치, 브리프, 카피, 리포트, 세그먼트 추천을 하나의 판단 루프로 연결합니다.",
    bullets: ["조사 자동화", "콘텐츠 QA", "주간 리포트"],
  },
];

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

const resources = [
  {
    type: "체크리스트",
    title: "AI 검색 대응 페이지 점검표",
    copy: "FAQ, 비교표, 브랜드 소개, 정책 페이지를 AI 인용 구조로 점검합니다.",
  },
  {
    type: "가이드",
    title: "롱폼 1개를 10개 자산으로 쪼개는 법",
    copy: "블로그, 숏폼, 뉴스레터, 세일즈 자료, CRM 메시지로 재활용하는 운영법입니다.",
  },
  {
    type: "템플릿",
    title: "하반기 월별 캠페인 브리프",
    copy: "월간 메시지, 오퍼, 채널, KPI, 리스크를 한 장으로 정리하는 브리프입니다.",
  },
];

const programs = [
  {
    title: "하반기 마케팅 전략 워크숍",
    target: "마케팅 리더, 실무팀",
    output: "월별 캠페인 방향, 핵심 메시지, 실행 우선순위",
  },
  {
    title: "AI 검색/AEO 진단",
    target: "홈페이지/콘텐츠 운영팀",
    output: "FAQ/비교/상품 페이지 개선 목록, AI 검색 대응 체크리스트",
  },
  {
    title: "CRM 자동화 설계",
    target: "CRM, 세일즈, 마케팅 자동화 담당자",
    output: "세그먼트 구조, welcome/nurture/win-back 플로우 초안",
  },
  {
    title: "AI 콘텐츠 운영 체계 구축",
    target: "콘텐츠, 브랜드, 소셜 운영팀",
    output: "롱폼-숏폼-CRM 콘텐츠 공급망과 검수 프로세스",
  },
];

const relatedPrograms = [
  {
    title: "AI 마케팅 실무 교육",
    copy: "이 보고서의 AI 검색, 콘텐츠, CRM 전략을 실습형 강의로 배웁니다.",
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
    title: "프롬프트 기반 업무도구 제작(바이브코딩) 교육",
    copy: "비개발자도 캠페인 자동화 도구와 내부 업무 도구를 기획해 봅니다.",
  },
];

const faqs = [
  [
    "하반기 마케팅 캠페인은 무엇부터 정비해야 하나요?",
    "홈페이지/FAQ/비교 페이지, CRM 세그먼트, 월별 핵심 메시지를 먼저 정비하는 것이 좋습니다.",
  ],
  [
    "AI 검색 대응은 SEO와 무엇이 다른가요?",
    "키워드 순위뿐 아니라 AI가 브랜드를 어떤 문장으로 요약하고 어떤 출처를 인용하는지까지 관리합니다.",
  ],
  [
    "작은 조직도 CRM 자동화를 시작할 수 있나요?",
    "가능합니다. welcome, nurture, win-back 같은 기본 플로우부터 작게 시작하는 편이 가장 현실적입니다.",
  ],
  [
    "교육과 컨설팅은 어떻게 다르나요?",
    "교육은 내부 역량 강화 중심이고, 컨설팅은 실제 페이지, 플로우, 운영 체계 설계까지 포함합니다.",
  ],
];

export default function MarketingMicrositePage() {
  return (
    <>
      <MarketingHeader />
      <MicrositeFloatingMenu />

      <nav className="micro-nav" aria-label="하반기 마케팅 캠페인 섹션">
        <div className="micro-nav-inner">
          <a href="#overview">개요</a>
          <a href="#key-insights">핵심 인사이트</a>
          <a href="#strategy-framework">전략 프레임</a>
          <a href="#campaign-roadmap">실행 로드맵</a>
          <a href="#ai-tools">AI 활용</a>
          <a href="#kpi-risk">KPI</a>
          <a href="#report-contact" className="micro-nav-cta">
            문의
          </a>
        </div>
      </nav>

      <header className="micro-hero" id="overview">
        <div className="microsite-wrap hero-grid">
          <div>
            <p className="hero-kicker">2026 H2 Marketing Campaign System</p>
            <h1>
              2026 하반기 마케팅 캠페인 전략 보고서
            </h1>
            <p className="hero-lead">
              AI 검색 대응, 브랜드 신뢰, 영상 콘텐츠, CRM 자동화,
              AI 에이전트 운영을 한 흐름으로 묶어 실행 가능한 하반기
              마케팅 체계로 정리했습니다.
            </p>
            <div className="report-meta" aria-label="보고서 정보">
              <span>대상 · 마케팅 리더/실무자/교육 담당자</span>
              <span>발행 · 2026년 하반기 전략 기준</span>
            </div>
            <div className="hero-actions">
              <a href="#key-insights" className="micro-btn micro-btn-primary">
                핵심 인사이트 보기
              </a>
              <a href="#report-contact" className="micro-btn micro-btn-ghost">
                강의 문의하기
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
                <dd>SEO에서 AEO와 AI discoverability로 확장</dd>
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
                <dd>조사, 브리프, 생성, 검수, 보고를 자동화</dd>
              </div>
            </dl>
          </aside>
        </div>
      </header>

      <section className="microsite-section" id="key-insights">
        <div className="microsite-wrap">
          <p className="section-kicker">KEY INSIGHTS</p>
          <h2>하반기 마케팅을 바꾸는 5가지 인사이트</h2>
          <p className="section-lead">
            탐색 경로는 광고 클릭에서 끝나지 않습니다. AI 검색, 영상, 커뮤니티,
            메시징, CRM이 동시에 얽히며 브랜드가 어떤 구조로 읽히는지가 성과를
            좌우합니다.
          </p>
          <div className="insight-grid">
            {keyInsights.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section alt" id="strategy-framework">
        <div className="microsite-wrap">
          <p className="section-kicker">STRATEGY FRAMEWORK</p>
          <h2>7월부터 12월까지의 3단계 전략 프레임</h2>
          <p className="section-lead">
            하반기는 구조 정비, 신뢰·모수 축적, 수익화·리텐션 극대화로
            나누어 운영하는 것이 가장 현실적입니다.
          </p>
          <div className="strategy-grid">
            {frameworkStages.map((item) => (
              <article className="strategy-card" key={item.period}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.effect}</p>
                <ul>
                  {item.tasks.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                  <li>추천 채널 · {item.channels}</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section" id="campaign-roadmap">
        <div className="microsite-wrap">
          <p className="section-kicker">ROADMAP</p>
          <h2>7월부터 12월까지, 구조 정비에서 리텐션까지</h2>
          <p className="section-lead">
            하반기 성과는 성수기 직전의 데이터, 콘텐츠, 픽셀, CRM 준비 상태에서
            결정됩니다. 월별 메시지를 한 줄로 고정하고 실행 리듬을 반복합니다.
          </p>
          <div className="roadmap">
            {monthlyRoadmap.map((item) => (
              <article key={item.month}>
                <div className="roadmap-month">
                  <span>{item.month}</span>
                  <b>{item.priority}</b>
                </div>
                <h3>{item.goal}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section alt" id="channels">
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

      <section className="microsite-section" id="ai-tools">
        <div className="microsite-wrap ai-grid">
          <div>
            <p className="section-kicker">AI SYSTEM</p>
            <h2>AI는 카피 도구가 아니라 운영 레이어입니다</h2>
            <p className="section-lead">
              하반기에는 프롬프트만 잘 쓰는 조직보다 컨텍스트, 승인 단계, 도구,
              데이터를 연결하는 조직이 더 빠르게 움직입니다.
            </p>
          </div>
          <div className="ai-table" role="table" aria-label="마케팅 업무별 AI 적용">
            {aiUseCases.map(([work, use, impact, caution]) => (
              <div className="ai-row" role="row" key={work}>
                <strong role="cell">{work}</strong>
                <span role="cell">{use}</span>
                <em role="cell">{impact}</em>
                <small role="cell">{caution}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="microsite-section alt" id="kpi-risk">
        <div className="microsite-wrap">
          <p className="section-kicker">KPI & RISK</p>
          <h2>성과관리와 리스크를 함께 봅니다</h2>
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
            <h2>고객 접점과 CRM 경험을 AI 활용 교육으로 연결하는 실무형 강사</h2>
            <p className="section-lead">
              전선희(Sunny Jun)는 국내 대기업 다수의 CRM, 영업, 상담,
              고객경험 프로젝트를 수행해 온 컨설턴트입니다. 하반기 마케팅
              전략을 콘텐츠 계획에만 머물지 않고 고객 접점 운영 구조와 연결해 봅니다.
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
              기존 강사 프로필 자세히 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="microsite-section alt" id="related-programs">
        <div className="microsite-wrap">
          <p className="section-kicker">RELATED PROGRAMS</p>
          <h2>이 보고서 내용을 강의로 배우기</h2>
          <div className="program-grid">
            {relatedPrograms.map((program) => (
              <article className="program-card" key={program.title}>
                <h3>{program.title}</h3>
                <p>{program.copy}</p>
                <a
                  href="#report-contact"
                  className="program-link"
                  data-contact-topic={program.title}
                  aria-label={`${program.title} 상담 문의`}
                >
                  상담 문의
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
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
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
