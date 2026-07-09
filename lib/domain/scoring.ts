import {
  AnswerInput,
  Area,
  AREA_MAX,
  AREAS,
  AreaScore,
  Option,
  QuestionConfig,
  ScoreResult,
} from "./types";
import { FREE_TEXT_QUESTIONS, MULTI_QUESTIONS, SCALE_QUESTIONS } from "./questionConfig";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function findOption(q: QuestionConfig, value: string): Option | undefined {
  return q.options?.find((o) => o.value === value);
}

/** Raw answer "level" on a 0..5 scale (before applying the question weight). */
function questionLevel(
  q: QuestionConfig,
  answer: AnswerInput | undefined
): number {
  if (!answer || answer.value === undefined || answer.value === null) return 0;

  if (SCALE_QUESTIONS.includes(q.no)) {
    const v = Number(answer.value);
    if (Number.isNaN(v)) return 0;
    return clamp(v, 0, 5);
  }

  if (FREE_TEXT_QUESTIONS.includes(q.no)) {
    const text = String(answer.value).trim();
    if (text.length === 0) return 0;
    if (text.length >= 10) return 5;
    if (text.length >= 4) return 4;
    return 3;
  }

  if (MULTI_QUESTIONS.includes(q.no)) {
    const arr = Array.isArray(answer.value)
      ? answer.value.map(String)
      : [String(answer.value)];
    const selected = arr.filter((v) => v && v !== "none");
    if (selected.length === 0) return 1; // "사용해 본 적 없다"
    return clamp(1 + selected.length, 1, 5);
  }

  // single_choice / branch_choice
  const opt = findOption(q, String(answer.value));
  return opt ? clamp(opt.score, 0, 5) : 0;
}

/**
 * Weighted score a single answer (0..q.maxScore). Pure function.
 * points = (level / 5) * weight, so each area sums to its designated max.
 */
export function calculateQuestionScore(
  q: QuestionConfig,
  answer: AnswerInput | undefined
): number {
  const level = questionLevel(q, answer);
  const weight = q.maxScore || 5;
  return (level / 5) * weight;
}

/** Aggregate per-area scores, capped at each area's maximum. */
export function calculateAreaScores(
  questions: QuestionConfig[],
  answers: AnswerInput[]
): AreaScore[] {
  const byNo = new Map<number, AnswerInput>();
  for (const a of answers) byNo.set(a.questionNo, a);

  const totals: Record<Area, number> = {
    "AI 이해도": 0,
    "디지털 활용 역량": 0,
    "업무 적용 역량": 0,
    "기획 및 문제정의 역량": 0,
    "학습 의지 및 실행력": 0,
  };

  for (const q of questions) {
    totals[q.area] += calculateQuestionScore(q, byNo.get(q.no));
  }

  return AREAS.map((area) => ({
    area,
    score: clamp(Math.round(totals[area]), 0, AREA_MAX[area]),
    max: AREA_MAX[area],
  }));
}

export function calculateTotalScore(areaScores: AreaScore[]): number {
  return areaScores.reduce((sum, a) => sum + a.score, 0);
}

export function scoreDiagnosis(
  questions: QuestionConfig[],
  answers: AnswerInput[]
): ScoreResult {
  const areaScores = calculateAreaScores(questions, answers);
  return { areaScores, totalScore: calculateTotalScore(areaScores) };
}

export function areaScore(areaScores: AreaScore[], area: Area): number {
  return areaScores.find((a) => a.area === area)?.score ?? 0;
}
