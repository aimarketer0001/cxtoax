import {
  AnswerInput,
  AreaScore,
  ClassificationResult,
  FitLevel,
  LearnerType,
} from "./types";
import { areaScore } from "./scoring";

function answerValue(answers: AnswerInput[], no: number): string {
  const a = answers.find((x) => x.questionNo === no);
  if (!a) return "";
  return Array.isArray(a.value) ? a.value.join(",") : String(a.value);
}

function answerNumber(answers: AnswerInput[], no: number): number {
  const v = Number(answerValue(answers, no));
  return Number.isNaN(v) ? 0 : v;
}

/**
 * Automatic hold/보류 conditions (docs/04_Function_Spec.md 자동 보류 조건).
 * Returns the list of triggered reasons (empty = not on hold).
 */
export function checkHoldConditions(
  areaScores: AreaScore[],
  answers: AnswerInput[]
): string[] {
  const reasons: string[] = [];

  const execution = areaScore(areaScores, "학습 의지 및 실행력");
  const digital = areaScore(areaScores, "디지털 활용 역량");

  if (execution < 10) {
    reasons.push("학습 의지 및 실행력 점수가 낮습니다 (10점 미만).");
  }
  if (digital < 6) {
    reasons.push("디지털 활용 역량 점수가 낮습니다 (6점 미만).");
  }

  // 단순 호기심 + 결과물 목표 없음
  const outputGoal = answerValue(answers, 6); // Q6 결과물
  const purpose = answerValue(answers, 12); // Q12 참여 목적
  const curiosity = outputGoal === "curiosity" || purpose === "curiosity";
  const noOutput = outputGoal === "curiosity" || outputGoal === "no_output";
  if (curiosity && noOutput) {
    reasons.push("학습 목적이 단순 호기심이며 목표 결과물이 없습니다.");
  }

  // 실습/피드백 참여 의사 낮음
  const method = answerValue(answers, 11); // Q11 교육 방식
  const practiceWill = answerNumber(answers, 10); // Q10 반복 실습 의지(척도)
  if (method === "listen_only" || practiceWill <= 2) {
    reasons.push("실습·피드백 참여 의사가 낮습니다.");
  }

  return reasons;
}

/**
 * Classify learner type + fit level (docs/04_Function_Spec.md 유형 분류).
 * Priority is applied top-down so overlapping bands resolve deterministically.
 */
export function classifyLearner(
  totalScore: number,
  areaScores: AreaScore[],
  answers: AnswerInput[]
): ClassificationResult {
  const holdReasons = checkHoldConditions(areaScores, answers);
  const onHold = holdReasons.length > 0;

  const ai = areaScore(areaScores, "AI 이해도");
  const work = areaScore(areaScores, "업무 적용 역량");
  const planning = areaScore(areaScores, "기획 및 문제정의 역량");
  const execution = areaScore(areaScores, "학습 의지 및 실행력");

  let learnerType: LearnerType;
  let fitLevel: FitLevel;

  if (onHold || totalScore <= 39) {
    learnerType = "비적합 또는 보류형";
    fitLevel = "보류";
  } else if (ai <= 10) {
    // AI 이해도 10점 이하는 동기가 높아도 입문에서 시작 (docs 유형 분류 floor).
    learnerType = "입문 체험형";
    fitLevel = "보통";
  } else if (totalScore >= 85 && execution >= 16) {
    learnerType = "전문가 성장형";
    fitLevel = "높음";
  } else if (totalScore >= 75 && planning >= 14) {
    learnerType = "기획 확장형";
    fitLevel = "높음";
  } else if (totalScore >= 60 && work >= 15) {
    learnerType = "업무 적용형";
    fitLevel = "높음";
  } else if ((totalScore >= 40 && totalScore <= 59) || ai <= 10) {
    learnerType = "입문 체험형";
    fitLevel = "보통";
  } else {
    // total 60-84 but area thresholds not met — still a workable applicant.
    learnerType = "업무 적용형";
    fitLevel = "보통";
  }

  return { learnerType, fitLevel, holdReasons, onHold };
}
