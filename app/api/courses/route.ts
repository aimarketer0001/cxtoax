import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/api";

// GET /api/courses — public course catalog.
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { courseId: "asc" },
    });
    return NextResponse.json({ courses });
  } catch (e) {
    console.error("courses error", e);
    return ApiErrors.server("교육 과정을 불러오지 못했습니다.");
  }
}
