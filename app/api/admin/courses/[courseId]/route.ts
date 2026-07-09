import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth";

// PATCH /api/admin/courses/{courseId} — edit a course (admin only).
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();
  if (process.env.ADMIN_EDIT_ENABLED === "false") return ApiErrors.forbidden();

  const { courseId } = await params;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return ApiErrors.validation("요청 본문을 해석할 수 없습니다.");
  }

  // Whitelist editable fields.
  const allowed = [
    "category",
    "title",
    "type",
    "target",
    "suggestedLevel",
    "recommendedFor",
    "notRecommendedFor",
    "isRepresentative",
  ] as const;
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) data[key] = body[key];
  }
  if (Object.keys(data).length === 0) {
    return ApiErrors.validation("수정할 필드가 없습니다.");
  }

  try {
    const existing = await prisma.course.findUnique({ where: { courseId } });
    if (!existing) return ApiErrors.notFound("교육 과정을 찾을 수 없습니다.");
    const updated = await prisma.course.update({ where: { courseId }, data });
    return NextResponse.json({ course: updated });
  } catch (e) {
    console.error("admin course patch error", e);
    return ApiErrors.server();
  }
}
