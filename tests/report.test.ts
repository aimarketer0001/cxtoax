import { describe, it, expect } from "vitest";
import { loadQuestions, loadCourses } from "../lib/domain/questions";
import { runDiagnosis } from "../lib/domain/orchestrator";
import { buildRuleBasedReport } from "../lib/domain/report";
import { validateAIReport } from "../lib/domain/aiReport";
import { buildAnswers } from "./helpers";

const questions = loadQuestions();
const courses = loadCourses();

function baseReport() {
  const r = runDiagnosis(questions, courses, buildAnswers());
  return buildRuleBasedReport({
    totalScore: r.totalScore,
    areaScores: r.areaScores,
    classification: r.classification,
    recommendations: r.recommendations,
    consultationRecommended: r.consultationRecommended,
  });
}

describe("rule-based report", () => {
  it("always produces a usable report with strengths, improvements and a message", () => {
    const report = baseReport();
    expect(report.source).toBe("rule");
    expect(report.strengths.length).toBeGreaterThan(0);
    expect(report.improvements.length).toBeGreaterThan(0);
    expect(report.consultationMessage.length).toBeGreaterThan(0);
    expect(report.recommendations.length).toBeGreaterThan(0);
  });
});

describe("validateAIReport (guardrails)", () => {
  it("accepts a well-formed AI report that preserves ranks and course IDs", () => {
    const base = baseReport();
    const ai = {
      summary: "요약입니다.",
      strengths: ["강점"],
      improvements: ["보완점"],
      recommendations: base.recommendations.map((r) => ({
        rank: r.rank,
        courseId: r.courseId,
        courseTitle: r.courseTitle,
        reason: "AI가 다듬은 이유",
        expectedEffect: "기대 효과",
      })),
      preparation: ["준비"],
      consultationMessage: "상담 메시지",
      cautions: [],
    };
    const validated = validateAIReport(ai, base);
    expect(validated).not.toBeNull();
    expect(validated!.source).toBe("ai");
  });

  it("rejects a report that changes a recommended course ID", () => {
    const base = baseReport();
    const ai = {
      summary: "요약",
      strengths: ["a"],
      improvements: ["b"],
      recommendations: base.recommendations.map((r, i) => ({
        rank: r.rank,
        courseId: i === 0 ? "CX-Z-99" : r.courseId,
        courseTitle: r.courseTitle,
        reason: "x",
        expectedEffect: "y",
      })),
      preparation: ["p"],
      consultationMessage: "m",
      cautions: [],
    };
    expect(validateAIReport(ai, base)).toBeNull();
  });

  it("rejects a report containing personal data", () => {
    const base = baseReport();
    const ai = {
      summary: "연락처 010-1234-5678 로 안내드립니다.",
      strengths: ["a"],
      improvements: ["b"],
      recommendations: base.recommendations.map((r) => ({
        rank: r.rank,
        courseId: r.courseId,
        courseTitle: r.courseTitle,
        reason: "x",
        expectedEffect: "y",
      })),
      preparation: ["p"],
      consultationMessage: "m",
      cautions: [],
    };
    expect(validateAIReport(ai, base)).toBeNull();
  });

  it("rejects malformed JSON shapes", () => {
    const base = baseReport();
    expect(validateAIReport(null, base)).toBeNull();
    expect(validateAIReport({ summary: 123 }, base)).toBeNull();
  });
});
