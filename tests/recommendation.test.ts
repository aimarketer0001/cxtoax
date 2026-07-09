import { describe, it, expect } from "vitest";
import { loadQuestions, loadCourses } from "../lib/domain/questions";
import { runDiagnosis } from "../lib/domain/orchestrator";
import { buildAnswers } from "./helpers";

const questions = loadQuestions();
const courses = loadCourses();

function diagnose(overrides = {}) {
  return runDiagnosis(questions, courses, buildAnswers(overrides));
}

describe("recommendation engine (docs/12_Test.md cases)", () => {
  it("업무 적용형 · 영업+CRM+업무효율 → CX-B-01 또는 CX-B-04", () => {
    const r = diagnose({ 5: "crm", 7: "sales", 8: 2, 9: "basics" });
    expect(r.classification.learnerType).toBe("업무 적용형");
    expect(["CX-B-01", "CX-B-04"]).toContain(r.recommendations[0].courseId);
  });

  it("상담/CS · CS+FAQ+응대 → CX-B-02", () => {
    const r = diagnose({ 5: "cs", 7: "cs", 9: "automation" });
    expect(r.recommendations[0].courseId).toBe("CX-B-02");
  });

  it("입문형 · AI 이해도 낮음 → CX-E-01 / CX-E-02 / CX-D-01", () => {
    const r = diagnose({
        1: "none",
        2: ["none"],
        3: "basic",
        4: 2,
        5: "undecided",
        6: "no_output",
        7: "general",
        8: 2,
        9: "basics",
        10: 3,
        11: "balanced",
        12: "growth",
      });
    expect(r.classification.learnerType).toBe("입문 체험형");
    const allowed = ["CX-E-01", "CX-E-02", "CX-D-01"];
    for (const rec of r.recommendations) {
      expect(allowed).toContain(rec.courseId);
    }
  });

  it("전문가형 · 실행력 높고 HRD/강사 목적 → CX-E-03", () => {
    const r = diagnose({
        1: "often",
        2: ["chatgpt", "claude_gemini", "image", "doc_translate"],
        3: "expert",
        4: 5,
        5: "document",
        6: "clear_output",
        7: "hrd",
        8: 5,
        9: "teaching",
        10: 5,
        11: "practice",
        12: "teach",
      });
    expect(r.classification.learnerType).toBe("전문가 성장형");
    expect(r.recommendations[0].courseId).toBe("CX-E-03");
  });

  it("보류형 · 실행력 낮음 → 상담 권장", () => {
    const r = diagnose({ 10: 1, 11: "listen_only", 12: "curiosity", 6: "curiosity" });
    expect(r.classification.learnerType).toBe("비적합 또는 보류형");
    expect(r.consultationRecommended).toBe(true);
  });

  it("항상 최대 3개까지만 추천한다", () => {
    const r = diagnose();
    expect(r.recommendations.length).toBeGreaterThan(0);
    expect(r.recommendations.length).toBeLessThanOrEqual(3);
  });
});
