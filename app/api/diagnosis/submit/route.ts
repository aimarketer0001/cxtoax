import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/api";
import { loadQuestions } from "@/lib/domain/questions";
import { runDiagnosis } from "@/lib/domain/orchestrator";
import { validateSubmission, maskAnswers } from "@/lib/domain/submit";
import { generateAIReport } from "@/lib/domain/aiReport";
import { AnswerInput, CourseRecord } from "@/lib/domain/types";

export async function POST(req: NextRequest) {
  if (process.env.PUBLIC_DIAGNOSIS_ENABLED === "false") {
    return ApiErrors.forbidden();
  }

  let body: {
    answers?: AnswerInput[];
    consent?: { privacyNoticeAccepted?: boolean };
  };
  try {
    body = await req.json();
  } catch {
    return ApiErrors.validation("요청 본문을 해석할 수 없습니다.");
  }

  if (!body?.consent?.privacyNoticeAccepted) {
    return ApiErrors.validation("개인정보 비저장 안내에 동의해야 합니다.", {
      field: "consent.privacyNoticeAccepted",
    });
  }
  if (!Array.isArray(body.answers)) {
    return ApiErrors.validation("응답(answers)이 필요합니다.");
  }

  const questions = loadQuestions();

  // 1) Validate required answers.
  const validation = validateSubmission(questions, body.answers);
  if (!validation.ok) {
    return ApiErrors.validation(validation.message!, { missing: validation.missing });
  }

  // 2) Mask all free-form answer input before it is stored or sent anywhere.
  const answers = maskAnswers(body.answers);

  // 3) Load catalog + run the rule-based pipeline.
  let dbCourses;
  try {
    dbCourses = await prisma.course.findMany();
  } catch (e) {
    console.error("db course load failed", e);
    return ApiErrors.server("교육 과정을 불러오지 못했습니다.");
  }
  const courses: CourseRecord[] = dbCourses.map((c) => ({
    courseId: c.courseId,
    category: c.category,
    title: c.title,
    type: c.type,
    target: c.target,
    suggestedLevel: c.suggestedLevel,
    recommendedFor: c.recommendedFor,
    notRecommendedFor: c.notRecommendedFor,
    isRepresentative: c.isRepresentative,
  }));

  let result;
  try {
    result = runDiagnosis(questions, courses, answers);
  } catch (e) {
    console.error("scoring error", e);
    return ApiErrors.scoring();
  }

  // 4) Try AI report; always falls back to the rule-based report internally.
  let report = result.ruleReport;
  let aiReportFailed = false;
  try {
    report = await generateAIReport({
      totalScore: result.totalScore,
      areaScores: result.areaScores,
      classification: result.classification,
      recommendations: result.recommendations,
      consultationRecommended: result.consultationRecommended,
      profileSummary: {
        freeTexts: result.freeTexts,
      },
    });
    if (report.source !== "ai") aiReportFailed = process.env.AI_REPORT_ENABLED !== "false" && !!process.env.LLM_API_KEY;
  } catch (e) {
    console.error("ai report error", e);
    report = result.ruleReport;
    aiReportFailed = true;
  }

  // 5) Persist everything (session, answers, score, recommendations, report).
  let sessionId: string;
  try {
    const created = await prisma.diagnosisSession.create({
      data: {
        status: "completed",
        completedAt: new Date(),
        answers: {
          create: answers.map((a) => ({
            questionNo: a.questionNo,
            value: Array.isArray(a.value) ? JSON.stringify(a.value) : String(a.value),
          })),
        },
        score: {
          create: {
            areaScores: JSON.stringify(result.areaScores),
            totalScore: result.totalScore,
            learnerType: result.classification.learnerType,
            fitLevel: result.classification.fitLevel,
            holdReason: result.classification.holdReasons.join("; ") || null,
          },
        },
        recommendations: {
          create: result.recommendations.map((r) => ({
            courseId: r.courseId,
            rank: r.rank,
            reason: r.reason,
            matchScore: r.matchScore,
          })),
        },
        reports: {
          create: {
            source: report.source,
            contentJson: JSON.stringify(report),
          },
        },
      },
    });
    sessionId = created.id;
  } catch (e) {
    console.error("db save failed", e);
    return ApiErrors.server("결과 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
  }

  // 6) Shape response (docs/06_API.md).
  return NextResponse.json({
    sessionId,
    summary: {
      totalScore: result.totalScore,
      learnerType: result.classification.learnerType,
      fitLevel: result.classification.fitLevel,
    },
    areaScores: result.areaScores,
    recommendations: result.recommendations,
    report,
    consultationRecommended: result.consultationRecommended,
    aiReportFailed,
  });
}
