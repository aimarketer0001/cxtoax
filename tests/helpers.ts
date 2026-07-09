import { AnswerInput } from "../lib/domain/types";

// A valid, moderate baseline answer for all 12 questions (not on hold).
// Numbering (docs/data seed): 1-2 AI, 3-4 digital, 5-7 work, 8-9 planning,
// 10-12 execution.
const BASE: Record<number, AnswerInput["value"]> = {
  1: "sometimes",
  2: ["chatgpt", "claude_gemini"],
  3: "basic",
  4: 3,
  5: "crm",
  6: "clear_output",
  7: "sales",
  8: 3,
  9: "automation",
  10: 4,
  11: "practice",
  12: "apply_work",
};

/** Build a full 12-answer array, applying overrides by question number. */
export function buildAnswers(
  overrides: Record<number, AnswerInput["value"]> = {}
): AnswerInput[] {
  const merged = { ...BASE, ...overrides };
  return Object.entries(merged).map(([no, value]) => ({
    questionNo: Number(no),
    value,
  }));
}

/** All-max answers → total 100. */
export function perfectAnswers(): AnswerInput[] {
  return buildAnswers({
    1: "often",
    2: ["chatgpt", "claude_gemini", "image", "doc_translate"],
    3: "expert",
    4: 5,
    5: "crm",
    6: "clear_output",
    7: "sales",
    8: 5,
    9: "strategy",
    10: 5,
    11: "practice",
    12: "apply_work",
  });
}
