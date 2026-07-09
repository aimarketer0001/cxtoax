// Shared domain types for scoring, classification, recommendation and reports.

export type QuestionType =
  | "single_choice"
  | "multi_choice"
  | "scale_5"
  | "branch_choice"
  | "free_text";

export const AREAS = [
  "AI 이해도",
  "디지털 활용 역량",
  "업무 적용 역량",
  "기획 및 문제정의 역량",
  "학습 의지 및 실행력",
] as const;

export type Area = (typeof AREAS)[number];

/** Max points per evaluation area (docs/04_Function_Spec.md 점수 체계). Sums to 100. */
export const AREA_MAX: Record<Area, number> = {
  "AI 이해도": 20,
  "디지털 활용 역량": 15,
  "업무 적용 역량": 25,
  "기획 및 문제정의 역량": 20,
  "학습 의지 및 실행력": 20,
};

export interface Option {
  /** stable value stored in answers and used by the recommendation engine */
  value: string;
  label: string;
  /** points contributed toward the question's area (0..5) */
  score: number;
  /** recommendation tags this option contributes (branch/interest signals) */
  tags?: string[];
}

export interface QuestionConfig {
  no: number;
  question: string;
  type: QuestionType;
  area: Area;
  required: boolean;
  /** max points this question can contribute (choice + scale = 5) */
  maxScore: number;
  options?: Option[];
}

/** A single answer submitted by the user. */
export interface AnswerInput {
  questionNo: number;
  /** number for scale_5, string for choices/free_text, string[] for multi_choice */
  value: number | string | string[];
}

export interface ProfileInput {
  jobRole?: string;
  interestAreas?: string[];
  learningPurpose?: string;
  desiredOutput?: string;
}

export type LearnerType =
  | "입문 체험형"
  | "업무 적용형"
  | "기획 확장형"
  | "전문가 성장형"
  | "비적합 또는 보류형";

export type FitLevel = "높음" | "보통" | "낮음" | "보류";

export interface AreaScore {
  area: Area;
  score: number;
  max: number;
}

export interface ScoreResult {
  areaScores: AreaScore[];
  totalScore: number;
}

export interface ClassificationResult {
  learnerType: LearnerType;
  fitLevel: FitLevel;
  holdReasons: string[];
  onHold: boolean;
}

export interface RecommendationItem {
  rank: number;
  courseId: string;
  courseTitle: string;
  category: string;
  reason: string;
  matchScore: number;
}

export interface CourseRecord {
  courseId: string;
  category: string;
  title: string;
  type: string;
  target: string;
  suggestedLevel: string;
  recommendedFor: string;
  notRecommendedFor: string;
  isRepresentative: boolean;
}

export interface ReportContent {
  source: "rule" | "ai";
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendations: {
    rank: number;
    courseId: string;
    courseTitle: string;
    reason: string;
    expectedEffect: string;
  }[];
  preparation: string[];
  consultationMessage: string;
  cautions: string[];
}
