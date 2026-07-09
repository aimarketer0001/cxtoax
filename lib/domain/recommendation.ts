import {
  AnswerInput,
  AreaScore,
  ClassificationResult,
  CourseRecord,
  RecommendationItem,
} from "./types";
import { COURSE_META, TAG_LABEL } from "./courseMeta";
import { QUESTION_CONFIG, BRANCH_DRIVERS } from "./questionConfig";

export interface RecommendationInput {
  answers: AnswerInput[];
  classification: ClassificationResult;
  totalScore: number;
  areaScores: AreaScore[];
}

export interface RecommendationResult {
  items: RecommendationItem[];
  consultationRecommended: boolean;
}

function branchTags(answers: AnswerInput[], no: number): string[] {
  const a = answers.find((x) => x.questionNo === no);
  if (!a) return [];
  const value = Array.isArray(a.value) ? a.value[0] : String(a.value);
  return QUESTION_CONFIG[no]?.options?.find((o) => o.value === value)?.tags ?? [];
}

/** Collect weighted user signal tags. */
function collectUserTags(answers: AnswerInput[]): Map<string, number> {
  const weights = new Map<string, number>();
  const add = (tags: string[], w: number) => {
    for (const t of tags) weights.set(t, (weights.get(t) ?? 0) + w);
  };

  // Branch-question signals (적용 영역 / 직무 / 방향 / 목적) — see BRANCH_DRIVERS.
  for (const { no, weight } of BRANCH_DRIVERS) {
    add(branchTags(answers, no), weight);
  }

  return weights;
}

function userLevel(classification: ClassificationResult, ai: number): number {
  switch (classification.learnerType) {
    case "전문가 성장형":
      return 3.5;
    case "기획 확장형":
      return 3;
    case "업무 적용형":
      return ai <= 10 ? 2 : 2.5;
    case "입문 체험형":
      return 1.5;
    case "비적합 또는 보류형":
    default:
      return 1;
  }
}

export function recommendCourses(
  courses: CourseRecord[],
  input: RecommendationInput
): RecommendationResult {
  const { answers, classification, areaScores } = input;
  const ai = areaScores.find((a) => a.area === "AI 이해도")?.score ?? 0;
  const isBeginnerLike =
    classification.learnerType === "입문 체험형" ||
    classification.learnerType === "비적합 또는 보류형" ||
    ai <= 10;

  const userTags = collectUserTags(answers);
  const level = userLevel(classification, ai);

  type Scored = {
    course: CourseRecord;
    score: number;
    matched: string[];
  };

  const scored: Scored[] = [];
  for (const course of courses) {
    const meta = COURSE_META[course.courseId];
    if (!meta) continue;

    let score = 0;
    const matched: string[] = [];
    for (const tag of meta.tags) {
      const w = userTags.get(tag);
      if (w) {
        score += w;
        matched.push(tag);
      }
    }

    // Difficulty fit: penalise distance from the user's level.
    score -= Math.abs(meta.level - level) * 0.6;

    // Beginners should not be pushed into advanced (>= 중급~고급) courses.
    if (isBeginnerLike && meta.level >= 3.4) score -= 4;

    // Boost genuine entry-level courses for beginner-like learners.
    if (isBeginnerLike && (meta.tags.includes("beginner") || meta.tags.includes("literacy"))) {
      score += 2.5;
    }

    if (course.isRepresentative) score += 0.5;

    scored.push({ course, score, matched });
  }

  scored.sort((a, b) => b.score - a.score);

  const consultationRecommended = classification.onHold || classification.learnerType === "비적합 또는 보류형";

  // Keep only positively-matched courses; fall back to entry courses if none.
  let top = scored.filter((s) => s.score > 0).slice(0, 3);
  if (top.length === 0) {
    top = scored
      .filter((s) => COURSE_META[s.course.courseId].level <= 2)
      .slice(0, 3);
  }

  const items: RecommendationItem[] = top.map((s, i) => ({
    rank: i + 1,
    courseId: s.course.courseId,
    courseTitle: s.course.title,
    category: s.course.category,
    matchScore: Math.round(Math.max(s.score, 0) * 10) / 10,
    reason: buildReason(s.matched, s.course.recommendedFor, consultationRecommended),
  }));

  return { items, consultationRecommended };
}

function buildReason(
  matched: string[],
  recommendedFor: string,
  consultation: boolean
): string {
  const labels = Array.from(
    new Set(matched.map((t) => TAG_LABEL[t]).filter(Boolean))
  ).slice(0, 3);

  if (consultation) {
    return "기초 역량을 다지기 좋은 과정입니다. 정확한 수준 진단을 위해 상담을 함께 권장합니다.";
  }
  if (labels.length > 0) {
    return `선택하신 ${labels.join(", ")} 관심사와 학습 방향에 부합합니다. (${recommendedFor})`;
  }
  return `${recommendedFor}에게 적합한 과정입니다.`;
}
