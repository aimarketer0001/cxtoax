import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth";

// GET /api/admin/stats — dashboard aggregates (admin only).
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();

  try {
    const total = await prisma.diagnosisSession.count();

    const scores = await prisma.score.findMany({
      select: { learnerType: true, fitLevel: true, totalScore: true },
    });
    const typeCounts: Record<string, number> = {};
    const fitCounts: Record<string, number> = {};
    let scoreSum = 0;
    for (const s of scores) {
      typeCounts[s.learnerType] = (typeCounts[s.learnerType] ?? 0) + 1;
      fitCounts[s.fitLevel] = (fitCounts[s.fitLevel] ?? 0) + 1;
      scoreSum += s.totalScore;
    }
    const avgScore = scores.length ? Math.round(scoreSum / scores.length) : 0;

    // Top recommended courses.
    const recs = await prisma.recommendation.groupBy({
      by: ["courseId"],
      _count: { courseId: true },
      orderBy: { _count: { courseId: "desc" } },
      take: 10,
    });
    const courseMap = new Map(
      (await prisma.course.findMany({ select: { courseId: true, title: true } })).map(
        (c) => [c.courseId, c.title]
      )
    );
    const topCourses = recs.map((r) => ({
      courseId: r.courseId,
      title: courseMap.get(r.courseId) ?? r.courseId,
      count: r._count.courseId,
    }));

    return NextResponse.json({
      totalSessions: total,
      completedScored: scores.length,
      averageScore: avgScore,
      typeDistribution: typeCounts,
      fitDistribution: fitCounts,
      topCourses,
    });
  } catch (e) {
    console.error("admin stats error", e);
    return ApiErrors.server();
  }
}
