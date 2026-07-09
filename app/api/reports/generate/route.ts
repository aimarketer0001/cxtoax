import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth";
import { generateAIReport } from "@/lib/domain/aiReport";
import {
  AreaScore,
  ClassificationResult,
  FitLevel,
  LearnerType,
  RecommendationItem,
} from "@/lib/domain/types";
import { FREE_TEXT_QUESTIONS } from "@/lib/domain/questionConfig";

// POST /api/reports/generate { sessionId } — regenerate the AI report (admin).
export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();

  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return ApiErrors.validation("요청 본문을 해석할 수 없습니다.");
  }
  if (!body.sessionId) return ApiErrors.validation("sessionId가 필요합니다.");

  const s = await prisma.diagnosisSession.findUnique({
    where: { id: body.sessionId },
    include: {
      score: true,
      answers: true,
      recommendations: { orderBy: { rank: "asc" }, include: { course: true } },
    },
  });
  if (!s || !s.score) return ApiErrors.notFound("세션을 찾을 수 없습니다.");

  const areaScores: AreaScore[] = JSON.parse(s.score.areaScores);
  const holdReasons = s.score.holdReason ? s.score.holdReason.split("; ") : [];
  const classification: ClassificationResult = {
    learnerType: s.score.learnerType as LearnerType,
    fitLevel: s.score.fitLevel as FitLevel,
    holdReasons,
    onHold: holdReasons.length > 0,
  };
  const recommendations: RecommendationItem[] = s.recommendations.map((r) => ({
    rank: r.rank,
    courseId: r.courseId,
    courseTitle: r.course?.title ?? r.courseId,
    category: r.course?.category ?? "",
    reason: r.reason,
    matchScore: r.matchScore,
  }));
  const freeTexts = s.answers
    .filter((a) => FREE_TEXT_QUESTIONS.includes(a.questionNo))
    .map((a) => a.value);

  const report = await generateAIReport({
    totalScore: s.score.totalScore,
    areaScores,
    classification,
    recommendations,
    consultationRecommended: classification.onHold,
    profileSummary: {
      jobRole: s.jobRole ?? undefined,
      interestAreas: s.interestAreas ? JSON.parse(s.interestAreas) : undefined,
      learningPurpose: s.learningPurpose ?? undefined,
      desiredOutput: s.desiredOutput ?? undefined,
      freeTexts,
    },
  });

  await prisma.report.create({
    data: {
      sessionId: s.id,
      source: report.source,
      contentJson: JSON.stringify(report),
    },
  });

  return NextResponse.json({ report, aiReportFailed: report.source !== "ai" });
}
