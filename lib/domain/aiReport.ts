import { ReportContent } from "./types";
import { ReportInput, buildRuleBasedReport } from "./report";
import { containsSensitive, maskSensitiveText } from "./privacy";

const SYSTEM_PROMPT = `당신은 성인학습 설계자, 역량진단 컨설턴트, 교육 추천 리포트 작성 전문가입니다.
이미 계산된 점수, 수강자 유형, 추천 교육 결과를 바탕으로 수강자에게 제공할 진단 리포트를 작성하세요.

규칙:
1. 점수와 추천 결과를 임의로 변경하지 마세요.
2. 입력 데이터에 없는 사실을 확정하지 마세요.
3. 불명확한 부분은 "상담 시 확인 권장"으로 표현하세요.
4. 개인정보, 전화번호, 이메일, 주소, API Key, 비밀번호를 포함하지 마세요.
5. 비적합 또는 보류형은 대안 중심으로 안내하세요.
6. 출력은 지정된 JSON 형식으로만 작성하세요.`;

interface AIProfileSummary {
  jobRole?: string;
  interestAreas?: string[];
  learningPurpose?: string;
  desiredOutput?: string;
  freeTexts?: string[];
}

export interface AIReportInput extends ReportInput {
  profileSummary: AIProfileSummary;
}

function buildUserPrompt(input: AIReportInput): string {
  const areaScores = input.areaScores
    .map((a) => `- ${a.area}: ${a.score}/${a.max}`)
    .join("\n");
  const recs = input.recommendations
    .map((r) => `${r.rank}. ${r.courseId} ${r.courseTitle} — ${r.reason}`)
    .join("\n");

  // Anonymise/mask everything free-form before it leaves our server.
  const p = input.profileSummary;
  const profile = [
    p.jobRole ? `직무/관심: ${maskSensitiveText(p.jobRole)}` : null,
    p.interestAreas?.length ? `관심 분야: ${p.interestAreas.map(maskSensitiveText).join(", ")}` : null,
    p.learningPurpose ? `교육 목적: ${maskSensitiveText(p.learningPurpose)}` : null,
    p.desiredOutput ? `원하는 결과물: ${maskSensitiveText(p.desiredOutput)}` : null,
    p.freeTexts?.length ? `자유 서술: ${p.freeTexts.map(maskSensitiveText).join(" / ")}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `아래 진단 결과를 바탕으로 수강자용 진단 리포트를 작성해 주세요.

총점: ${input.totalScore} / 100
수강자 유형: ${input.classification.learnerType}
교육 적합도: ${input.classification.fitLevel}
보류 사유: ${input.classification.holdReasons.join("; ") || "없음"}

영역별 점수:
${areaScores}

프로필 요약:
${profile || "제공되지 않음"}

추천 교육:
${recs}

반드시 아래 JSON 형식으로만 출력하세요.
{
  "summary": "string",
  "strengths": ["string"],
  "improvements": ["string"],
  "recommendations": [{ "rank": 1, "courseId": "string", "courseTitle": "string", "reason": "string", "expectedEffect": "string" }],
  "preparation": ["string"],
  "consultationMessage": "string",
  "cautions": ["string"]
}`;
}

/**
 * Validate an AI report against the rule-based result. AI may only rephrase —
 * it must not change scores, course IDs, or ranks (docs/08_Prompt.md Guardrails).
 * Returns a validated ReportContent or null (=> caller falls back).
 */
export function validateAIReport(
  raw: unknown,
  baseline: ReportContent
): ReportContent | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const isStrArray = (v: unknown): v is string[] =>
    Array.isArray(v) && v.every((x) => typeof x === "string");

  if (typeof r.summary !== "string") return null;
  if (!isStrArray(r.strengths) || !isStrArray(r.improvements)) return null;
  if (!isStrArray(r.preparation) || !isStrArray(r.cautions)) return null;
  if (typeof r.consultationMessage !== "string") return null;
  if (!Array.isArray(r.recommendations)) return null;

  // Recommendation IDs and ranks must match the rule-based result exactly.
  const expected = baseline.recommendations;
  const got = r.recommendations as Record<string, unknown>[];
  if (got.length !== expected.length) return null;
  for (let i = 0; i < expected.length; i++) {
    const g = got[i];
    if (Number(g.rank) !== expected[i].rank) return null;
    if (String(g.courseId) !== expected[i].courseId) return null;
  }

  const all = [
    r.summary,
    r.consultationMessage,
    ...(r.strengths as string[]),
    ...(r.improvements as string[]),
    ...(r.preparation as string[]),
    ...(r.cautions as string[]),
  ].join(" ");
  if (containsSensitive(all)) return null;

  return {
    source: "ai",
    summary: r.summary as string,
    strengths: r.strengths as string[],
    improvements: r.improvements as string[],
    recommendations: expected.map((e, i) => ({
      rank: e.rank,
      courseId: e.courseId,
      courseTitle: e.courseTitle,
      reason: String(got[i].reason ?? e.reason),
      expectedEffect: String(got[i].expectedEffect ?? e.expectedEffect),
    })),
    preparation: r.preparation as string[],
    consultationMessage: r.consultationMessage as string,
    cautions: r.cautions as string[],
  };
}

function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Generate an AI-enhanced report. On ANY failure (disabled, no key, network,
 * bad JSON, validation failure) it returns the rule-based report so the caller
 * always receives a usable result (docs FR-009 / NFR-001).
 */
export async function generateAIReport(input: AIReportInput): Promise<ReportContent> {
  const fallback = buildRuleBasedReport(input);

  const enabled = process.env.AI_REPORT_ENABLED !== "false";
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.LLM_MODEL || "gpt-4o-mini";

  if (!enabled || !apiKey) return fallback;

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(input) },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) return fallback;
    const data = await res.json();
    const content: string | undefined = data?.choices?.[0]?.message?.content;
    if (!content) return fallback;

    const parsed = extractJson(content);
    const validated = validateAIReport(parsed, fallback);
    return validated ?? fallback;
  } catch {
    return fallback;
  }
}
