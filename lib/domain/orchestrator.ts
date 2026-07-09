import {
  AnswerInput,
  QuestionConfig,
  CourseRecord,
  ReportContent,
} from "./types";
import { scoreDiagnosis } from "./scoring";
import { classifyLearner } from "./classification";
import { recommendCourses } from "./recommendation";
import { buildRuleBasedReport } from "./report";
import { FREE_TEXT_QUESTIONS } from "./questionConfig";

export interface DiagnosisResult {
  areaScores: ReturnType<typeof scoreDiagnosis>["areaScores"];
  totalScore: number;
  classification: ReturnType<typeof classifyLearner>;
  recommendations: ReturnType<typeof recommendCourses>["items"];
  consultationRecommended: boolean;
  ruleReport: ReportContent;
  freeTexts: string[];
}

/**
 * Pure, synchronous diagnosis pipeline (no AI, no DB).
 * Scoring → 보류 판단 → 유형 분류 → 추천 → 기본 리포트.
 */
export function runDiagnosis(
  questions: QuestionConfig[],
  courses: CourseRecord[],
  answers: AnswerInput[]
): DiagnosisResult {
  const { areaScores, totalScore } = scoreDiagnosis(questions, answers);
  const classification = classifyLearner(totalScore, areaScores, answers);
  const { items: recommendations, consultationRecommended } = recommendCourses(
    courses,
    { answers, classification, totalScore, areaScores }
  );
  const ruleReport = buildRuleBasedReport({
    totalScore,
    areaScores,
    classification,
    recommendations,
    consultationRecommended,
  });

  const freeTexts = answers
    .filter((a) => FREE_TEXT_QUESTIONS.includes(a.questionNo))
    .map((a) => String(a.value));

  return {
    areaScores,
    totalScore,
    classification,
    recommendations,
    consultationRecommended,
    ruleReport,
    freeTexts,
  };
}
