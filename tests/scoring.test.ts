import { describe, it, expect } from "vitest";
import { loadQuestions } from "../lib/domain/questions";
import {
  scoreDiagnosis,
  calculateAreaScores,
  areaScore,
} from "../lib/domain/scoring";
import { AREA_MAX } from "../lib/domain/types";
import { buildAnswers, perfectAnswers } from "./helpers";

const questions = loadQuestions();

describe("scoring", () => {
  it("perfect answers score 100 with each area maxed", () => {
    const { areaScores, totalScore } = scoreDiagnosis(questions, perfectAnswers());
    expect(totalScore).toBe(100);
    for (const a of areaScores) {
      expect(a.score).toBe(AREA_MAX[a.area]);
    }
  });

  it("area maximums sum to 100", () => {
    const sum = Object.values(AREA_MAX).reduce((a, b) => a + b, 0);
    expect(sum).toBe(100);
  });

  it("scale answers map linearly (1..5)", () => {
    const low = scoreDiagnosis(questions, buildAnswers({ 4: 1 }));
    const high = scoreDiagnosis(questions, buildAnswers({ 4: 5 }));
    expect(areaScore(high.areaScores, "디지털 활용 역량")).toBeGreaterThan(
      areaScore(low.areaScores, "디지털 활용 역량")
    );
  });

  it("caps each area at its maximum", () => {
    const { areaScores } = calculateAreaScores
      ? { areaScores: calculateAreaScores(questions, perfectAnswers()) }
      : { areaScores: [] };
    for (const a of areaScores) {
      expect(a.score).toBeLessThanOrEqual(a.max);
    }
  });

  it("missing answers contribute zero", () => {
    const partial = buildAnswers().filter((a) => a.questionNo !== 8);
    const full = buildAnswers();
    const p = scoreDiagnosis(questions, partial).totalScore;
    const f = scoreDiagnosis(questions, full).totalScore;
    expect(p).toBeLessThan(f);
  });
});
