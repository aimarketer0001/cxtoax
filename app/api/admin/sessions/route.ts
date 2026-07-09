import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth";

// GET /api/admin/sessions — response list (admin only).
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const type = searchParams.get("type");

  const where: Record<string, unknown> = {};
  if (from || to) {
    where.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    };
  }

  try {
    const sessions = await prisma.diagnosisSession.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        score: true,
        recommendations: { orderBy: { rank: "asc" }, take: 1, include: { course: true } },
      },
    });

    const rows = sessions
      .filter((s) => (type ? s.score?.learnerType === type : true))
      .map((s) => ({
        sessionId: s.id,
        createdAt: s.createdAt.toISOString(),
        jobRole: s.jobRole,
        totalScore: s.score?.totalScore ?? null,
        learnerType: s.score?.learnerType ?? null,
        fitLevel: s.score?.fitLevel ?? null,
        topCourse: s.recommendations[0]?.course?.title ?? null,
      }));

    return NextResponse.json({ sessions: rows, count: rows.length });
  } catch (e) {
    console.error("admin sessions error", e);
    return ApiErrors.server();
  }
}
