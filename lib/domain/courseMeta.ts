// Recommendation metadata per course: match tags + difficulty level.
// level: 1 = 입문, 2 = 초급, 3 = 중급, 4 = 고급 (center of the course band).
// Tags are the vocabulary the recommendation engine matches user signals against.

export interface CourseMeta {
  tags: string[];
  level: number;
}

export const COURSE_META: Record<string, CourseMeta> = {
  "CX-A-01": { tags: ["strategy", "leadership", "literacy"], level: 2.5 },
  "CX-A-02": { tags: ["strategy", "leadership", "smb"], level: 3 },
  "CX-A-03": { tags: ["strategy", "literacy"], level: 2.5 },
  "CX-A-04": { tags: ["strategy", "marketing", "customer", "cx"], level: 3 },
  "CX-A-05": { tags: ["leadership", "strategy"], level: 3.5 },

  "CX-B-01": { tags: ["crm", "sales", "customer", "automation"], level: 2.5 },
  "CX-B-02": { tags: ["cs", "support", "faq", "customer"], level: 2.5 },
  "CX-B-03": { tags: ["cs", "data", "analysis", "customer"], level: 3 },
  "CX-B-04": { tags: ["sales", "crm", "document", "automation"], level: 2.5 },
  "CX-B-05": { tags: ["marketing", "cx", "customer", "planning"], level: 3 },
  "CX-B-06": { tags: ["crm", "automation", "customer"], level: 3.5 },
  "CX-B-07": { tags: ["crm", "smb", "customer", "beginner"], level: 1.5 },

  "CX-C-01": { tags: ["marketing", "content"], level: 2.5 },
  "CX-C-02": { tags: ["marketing", "content", "sns"], level: 2 },
  "CX-C-03": { tags: ["marketing", "content", "design"], level: 1.5 },
  "CX-C-04": { tags: ["marketing", "content", "video"], level: 1.5 },
  "CX-C-05": { tags: ["marketing", "content", "writing"], level: 2 },
  "CX-C-06": { tags: ["marketing", "data", "analysis"], level: 3 },
  "CX-C-07": { tags: ["marketing", "smb", "beginner"], level: 1 },
  "CX-C-08": { tags: ["marketing", "smb", "personal_brand"], level: 2.5 },

  "CX-D-01": { tags: ["automation", "productivity", "beginner", "literacy"], level: 1.5 },
  "CX-D-02": { tags: ["document", "report", "automation"], level: 2.5 },
  "CX-D-03": { tags: ["document", "report", "automation", "admin"], level: 2.5 },
  "CX-D-04": { tags: ["data", "analysis", "document"], level: 3 },
  "CX-D-05": { tags: ["automation", "productivity"], level: 3 },
  "CX-D-06": { tags: ["automation", "productivity", "document"], level: 1.5 },

  "CX-E-01": { tags: ["beginner", "literacy"], level: 1 },
  "CX-E-02": { tags: ["beginner", "literacy"], level: 1 },
  "CX-E-03": { tags: ["hrd", "education"], level: 3.5 },
  "CX-E-04": { tags: ["literacy", "security", "leadership"], level: 2.5 },
};

// Human-readable labels for tags, used when composing recommendation reasons.
export const TAG_LABEL: Record<string, string> = {
  crm: "고객관리(CRM)",
  sales: "영업",
  cs: "고객상담·CS",
  support: "응대",
  faq: "FAQ·상담 자동화",
  customer: "고객 접점",
  marketing: "마케팅",
  content: "콘텐츠 제작",
  document: "문서·보고서",
  report: "보고서 자동화",
  automation: "업무 자동화",
  productivity: "생산성",
  data: "데이터",
  analysis: "데이터 분석",
  planning: "기획",
  strategy: "전략",
  leadership: "리더십·조직 도입",
  hrd: "교육·HRD",
  education: "강의 설계",
  smb: "소상공인·1인 기업",
  beginner: "입문",
  literacy: "AI 리터러시",
  cx: "고객경험",
  security: "보안·윤리",
};
