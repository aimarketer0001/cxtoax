import { describe, it, expect } from "vitest";
import { loadQuestions } from "../lib/domain/questions";
import { scoreDiagnosis } from "../lib/domain/scoring";
import { classifyLearner, checkHoldConditions } from "../lib/domain/classification";
import { buildAnswers, perfectAnswers } from "./helpers";

const questions = loadQuestions();

function classify(overrides = {}) {
  const answers = buildAnswers(overrides);
  const { areaScores, totalScore } = scoreDiagnosis(questions, answers);
  return classifyLearner(totalScore, areaScores, answers);
}

describe("hold conditions", () => {
  it("holds when execution score < 10", () => {
    const answers = buildAnswers({ 10: 1, 11: "listen_only", 12: "curiosity" });
    const { areaScores } = scoreDiagnosis(questions, answers);
    const reasons = checkHoldConditions(areaScores, answers);
    expect(reasons.length).toBeGreaterThan(0);
  });

  it("holds on curiosity + no output goal", () => {
    const answers = buildAnswers({ 6: "curiosity", 12: "curiosity" });
    const { areaScores } = scoreDiagnosis(questions, answers);
    const reasons = checkHoldConditions(areaScores, answers);
    expect(reasons.some((r) => r.includes("호기심"))).toBe(true);
  });

  it("does not hold a healthy profile", () => {
    const answers = perfectAnswers();
    const { areaScores } = scoreDiagnosis(questions, answers);
    expect(checkHoldConditions(areaScores, answers)).toHaveLength(0);
  });
});

describe("learner classification", () => {
  it("classifies a maxed profile as 전문가 성장형", () => {
    const answers = perfectAnswers();
    const { areaScores, totalScore } = scoreDiagnosis(questions, answers);
    const c = classifyLearner(totalScore, areaScores, answers);
    expect(c.learnerType).toBe("전문가 성장형");
    expect(c.fitLevel).toBe("높음");
  });

  it("classifies a low-AI profile as 입문 체험형", () => {
    const c = classify({
      1: "none",
      2: ["none"],
      3: "basic",
      4: 2,
      6: "no_output",
      8: 2,
      9: "basics",
      10: 3,
      11: "balanced",
      12: "growth",
    });
    expect(c.learnerType).toBe("입문 체험형");
  });

  it("classifies a hold profile as 비적합 또는 보류형", () => {
    const c = classify({ 10: 1, 11: "listen_only", 12: "curiosity", 6: "curiosity" });
    expect(c.learnerType).toBe("비적합 또는 보류형");
    expect(c.fitLevel).toBe("보류");
    expect(c.onHold).toBe(true);
  });

  it("classifies a work-focused mid profile as 업무 적용형", () => {
    const c = classify({ 8: 2, 9: "basics" });
    expect(c.learnerType).toBe("업무 적용형");
  });
});
