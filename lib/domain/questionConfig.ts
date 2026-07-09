import { QuestionConfig } from "./types";

// The seed (data/diagnosis_questions.seed.json) is the source of truth for
// question text / type / area. Choice options, per-answer option scores (a 1..5
// "level") and the recommendation tags they emit are defined here.
//
// Scoring model (docs/04_Function_Spec.md — area maxima preserved):
//   AI 이해도            Q1-2   max 20
//   디지털 활용 역량      Q3-4   max 15
//   업무 적용 역량        Q5-7   max 25
//   기획 및 문제정의 역량  Q8-9   max 20
//   학습 의지 및 실행력    Q10-12 max 20
// Each question carries a weight (QUESTION_WEIGHT) so its area sums to the max.
// A question's contribution = (optionLevel / 5) * weight  →  total 100.

// Per-question weight (max points). Area = sum of its questions' weights.
export const QUESTION_WEIGHT: Record<number, number> = {
  1: 10, // AI 이해 수준
  2: 10, // 사용해 본 도구
  3: 8, // 디지털 도구 활용
  4: 7, // 새 도구 학습 거부감
  5: 9, // 적용하고 싶은 영역
  6: 8, // 만들고 싶은 결과물
  7: 8, // 직무 / 관심 분야
  8: 10, // 문제정의력
  9: 10, // 배우고 싶은 방향
  10: 7, // 반복 실습 의지
  11: 6, // 원하는 교육 방식
  12: 7, // 참여 목적
};

export const QUESTION_CONFIG: Record<number, Pick<QuestionConfig, "options">> = {
  1: {
    options: [
      { value: "none", label: "전혀 모른다", score: 1 },
      { value: "heard", label: "이름은 들어봤다", score: 2 },
      { value: "tried", label: "몇 번 사용해봤다", score: 3 },
      { value: "sometimes", label: "업무에 가끔 활용한다", score: 4 },
      { value: "often", label: "업무에 적극적으로 활용한다", score: 5 },
    ],
  },
  2: {
    // multi_choice — score is derived from the number of tools selected.
    options: [
      { value: "chatgpt", label: "ChatGPT", score: 0 },
      { value: "claude_gemini", label: "Claude · Gemini 등 대화형 AI", score: 0 },
      { value: "image", label: "이미지 생성 AI (미드저니 등)", score: 0 },
      { value: "doc_translate", label: "번역 · 문서 요약 AI", score: 0 },
      { value: "code", label: "코드 · 개발 AI", score: 0 },
      { value: "none", label: "사용해 본 적 없다", score: 0 },
    ],
  },
  3: {
    options: [
      { value: "cannot", label: "거의 다루지 못한다", score: 1 },
      { value: "basic", label: "기본적인 작성·표 계산은 가능하다", score: 3 },
      { value: "good", label: "함수·서식 등 능숙하게 사용한다", score: 4 },
      { value: "expert", label: "피벗·매크로 등 고급 기능까지 활용한다", score: 5 },
    ],
  },
  5: {
    // branch — main recommendation signal (적용하고 싶은 영역)
    options: [
      { value: "crm", label: "고객관리 · 영업(CRM)", score: 5, tags: ["crm", "sales", "customer"] },
      { value: "cs", label: "고객상담 · CS(FAQ·응대)", score: 5, tags: ["cs", "support", "faq"] },
      { value: "marketing", label: "마케팅 · 콘텐츠 제작", score: 5, tags: ["marketing", "content"] },
      { value: "document", label: "문서 · 보고서 작성", score: 5, tags: ["document", "report", "automation"] },
      { value: "data", label: "데이터 정리 · 분석", score: 5, tags: ["data", "analysis", "automation"] },
      { value: "undecided", label: "아직 정하지 못했다", score: 2, tags: [] },
    ],
  },
  6: {
    options: [
      { value: "clear_output", label: "명확한 결과물이 있다", score: 5, tags: ["output_goal"] },
      { value: "rough_output", label: "대략적인 결과물이 있다", score: 4, tags: ["output_goal"] },
      { value: "no_output", label: "아직 없다", score: 2, tags: ["no_output"] },
      { value: "curiosity", label: "단순 호기심으로 배우고 싶다", score: 1, tags: ["curiosity", "no_output"] },
    ],
  },
  7: {
    // branch — 직무 / 관심 분야
    options: [
      { value: "sales", label: "영업 · 세일즈", score: 5, tags: ["sales", "crm"] },
      { value: "cs", label: "고객상담 · CS", score: 5, tags: ["cs", "support"] },
      { value: "marketing", label: "마케팅 · 홍보", score: 5, tags: ["marketing", "content"] },
      { value: "planning", label: "기획 · 전략", score: 5, tags: ["planning", "strategy"] },
      { value: "office", label: "사무 · 행정", score: 5, tags: ["document", "automation", "admin"] },
      { value: "management", label: "경영 · 관리자", score: 5, tags: ["leadership", "strategy"] },
      { value: "hrd", label: "교육 · HRD · 강사", score: 5, tags: ["hrd", "education"] },
      { value: "smb", label: "소상공인 · 1인 기업", score: 5, tags: ["smb", "marketing"] },
      { value: "general", label: "기타 · 일반", score: 3, tags: ["general"] },
    ],
  },
  9: {
    // branch — 배우고 싶은 방향
    options: [
      { value: "basics", label: "기초 개념부터 차근차근", score: 3, tags: ["beginner", "literacy"] },
      { value: "automation", label: "실무 자동화 · 생산성", score: 4, tags: ["automation", "productivity"] },
      { value: "marketing", label: "마케팅 · 콘텐츠 제작", score: 4, tags: ["marketing", "content"] },
      { value: "data", label: "데이터 분석 · 활용", score: 4, tags: ["data", "analysis"] },
      { value: "strategy", label: "전략 · 기획 · 조직 도입", score: 5, tags: ["strategy", "planning", "leadership"] },
      { value: "teaching", label: "교육 · 강의 설계", score: 5, tags: ["hrd", "education"] },
    ],
  },
  11: {
    options: [
      { value: "practice", label: "직접 실습 중심", score: 5, tags: ["practice"] },
      { value: "balanced", label: "이론과 실습 균형", score: 4 },
      { value: "theory", label: "이론 · 개념 설명 중심", score: 3 },
      { value: "listen_only", label: "듣기만 원한다", score: 1, tags: ["low_practice"] },
    ],
  },
  12: {
    // branch — 참여 목적
    options: [
      { value: "apply_work", label: "실제 업무에 적용하기 위해", score: 5, tags: ["apply"] },
      { value: "growth", label: "역량 향상 · 자기계발", score: 4, tags: ["growth"] },
      { value: "teach", label: "사내 교육 · 강의 준비", score: 5, tags: ["hrd", "education"] },
      { value: "business", label: "창업 · 사업 준비", score: 4, tags: ["business", "smb"] },
      { value: "curiosity", label: "단순 호기심 · 트렌드 파악", score: 2, tags: ["curiosity"] },
    ],
  },
};

// scale_5 questions map value (1..5) → level; free_text scored by length (none now).
export const SCALE_QUESTIONS = [4, 8, 10];
export const FREE_TEXT_QUESTIONS: number[] = [];
export const MULTI_QUESTIONS = [2];

// Recommendation branch drivers (question no → weight in tag collection).
export const BRANCH_DRIVERS: { no: number; weight: number }[] = [
  { no: 5, weight: 3 }, // 적용하고 싶은 영역
  { no: 7, weight: 3 }, // 직무 / 관심 분야
  { no: 9, weight: 2 }, // 배우고 싶은 방향
  { no: 12, weight: 2 }, // 참여 목적
];
