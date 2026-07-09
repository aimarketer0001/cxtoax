import { prisma } from "@/lib/db";
import { AreaScore, RecommendationItem, ReportContent } from "@/lib/domain/types";

export interface SessionView {
  sessionId: string;
  createdAt: string;
  completedAt: string | null;
  status: string;
  profile: {
    jobRole: string | null;
    interestAreas: string[];
    learningPurpose: string | null;
    desiredOutput: string | null;
  };
  summary: {
    totalScore: number;
    learnerType: string;
    fitLevel: string;
    holdReason: string | null;
  };
  areaScores: AreaScore[];
  recommendations: (RecommendationItem & { title?: string })[];
  report: ReportContent | null;
}

/** Load a persisted diagnosis session into a view model, or null if missing. */
export async function loadSessionView(sessionId: string): Promise<SessionView | null> {
  const s = await prisma.diagnosisSession.findUnique({
    where: { id: sessionId },
    include: {
      score: true,
      recommendations: { orderBy: { rank: "asc" }, include: { course: true } },
      reports: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
  if (!s || !s.score) return null;

  const areaScores: AreaScore[] = JSON.parse(s.score.areaScores);
  const report: ReportContent | null = s.reports[0]
    ? JSON.parse(s.reports[0].contentJson)
    : null;

  return {
    sessionId: s.id,
    createdAt: s.createdAt.toISOString(),
    completedAt: s.completedAt ? s.completedAt.toISOString() : null,
    status: s.status,
    profile: {
      jobRole: s.jobRole,
      interestAreas: s.interestAreas ? JSON.parse(s.interestAreas) : [],
      learningPurpose: s.learningPurpose,
      desiredOutput: s.desiredOutput,
    },
    summary: {
      totalScore: s.score.totalScore,
      learnerType: s.score.learnerType,
      fitLevel: s.score.fitLevel,
      holdReason: s.score.holdReason,
    },
    areaScores,
    recommendations: s.recommendations.map((r) => ({
      rank: r.rank,
      courseId: r.courseId,
      courseTitle: r.course?.title ?? r.courseId,
      category: r.course?.category ?? "",
      reason: r.reason,
      matchScore: r.matchScore,
    })),
    report,
  };
}
