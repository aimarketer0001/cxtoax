import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminRequest } from "@/lib/auth";
import { ApiErrors } from "@/lib/api";

// GET /api/admin/export?from=&to=&type= — CSV of sessions (admin only).
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const type = searchParams.get("type");

  const dateRange =
    from || to
      ? {
          ...(from ? { gte: new Date(from) } : {}),
          ...(to ? { lte: new Date(`${to}T23:59:59`) } : {}),
        }
      : undefined;

  const where = {
    ...(dateRange ? { createdAt: dateRange } : {}),
    ...(type ? { score: { learnerType: type } } : {}),
  };

  const sessions = await prisma.diagnosisSession.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      score: true,
      recommendations: { orderBy: { rank: "asc" }, take: 1, include: { course: true } },
    },
  });

  const header = [
    "sessionId",
    "createdAt",
    "jobRole",
    "totalScore",
    "learnerType",
    "fitLevel",
    "topCourse",
  ];
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = sessions.map((s) =>
    [
      s.id,
      s.createdAt.toISOString(),
      s.jobRole ?? "",
      s.score?.totalScore ?? "",
      s.score?.learnerType ?? "",
      s.score?.fitLevel ?? "",
      s.recommendations[0]?.course?.title ?? "",
    ]
      .map(esc)
      .join(",")
  );

  // Prepend BOM so Excel opens Korean text correctly.
  const csv = "﻿" + [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="diagnosis_sessions.csv"',
    },
  });
}
