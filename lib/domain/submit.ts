import { AnswerInput, ProfileInput, QuestionConfig } from "./types";
import { FREE_TEXT_QUESTIONS } from "./questionConfig";
import { maskSensitiveText } from "./privacy";

export interface ValidationResult {
  ok: boolean;
  message?: string;
  missing?: number[];
}

/** Ensure every required question is answered with a plausible value. */
export function validateSubmission(
  questions: QuestionConfig[],
  answers: AnswerInput[]
): ValidationResult {
  const byNo = new Map<number, AnswerInput>();
  for (const a of answers) byNo.set(a.questionNo, a);

  const missing: number[] = [];
  for (const q of questions) {
    if (!q.required) continue;
    const a = byNo.get(q.no);
    if (!a) {
      missing.push(q.no);
      continue;
    }
    const v = a.value;
    const empty =
      v === undefined ||
      v === null ||
      (typeof v === "string" && v.trim() === "") ||
      (Array.isArray(v) && v.length === 0);
    if (empty) missing.push(q.no);
  }

  if (missing.length > 0) {
    return {
      ok: false,
      message: `필수 문항 ${missing.length}개가 누락되었습니다.`,
      missing,
    };
  }
  return { ok: true };
}

/**
 * Mask free-text answers before persistence / AI usage. Choice values are
 * left as-is (they are fixed option codes, not personal data).
 */
export function maskAnswers(answers: AnswerInput[]): AnswerInput[] {
  return answers.map((a) => {
    if (FREE_TEXT_QUESTIONS.includes(a.questionNo) && typeof a.value === "string") {
      return { ...a, value: maskSensitiveText(a.value) };
    }
    return a;
  });
}

/** Mask free-text fields inside the profile before storage / AI usage. */
export function maskProfile(profile: ProfileInput): ProfileInput {
  return {
    jobRole: profile.jobRole ? maskSensitiveText(profile.jobRole) : profile.jobRole,
    interestAreas: profile.interestAreas?.map((s) => maskSensitiveText(s)),
    learningPurpose: profile.learningPurpose
      ? maskSensitiveText(profile.learningPurpose)
      : profile.learningPurpose,
    desiredOutput: profile.desiredOutput
      ? maskSensitiveText(profile.desiredOutput)
      : profile.desiredOutput,
  };
}
