import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth";
import { loadSessionView } from "@/lib/sessionView";

// GET /api/admin/sessions/{sessionId} — full response detail (admin only).
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();
  const { sessionId } = await params;
  try {
    const view = await loadSessionView(sessionId);
    if (!view) return ApiErrors.notFound("응답을 찾을 수 없습니다.");

    const answers = await prisma.answer.findMany({
      where: { sessionId },
      orderBy: { questionNo: "asc" },
    });
    const notes = await prisma.adminNote.findMany({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      ...view,
      answers: answers.map((a) => ({ questionNo: a.questionNo, value: a.value })),
      notes: notes.map((n) => ({ id: n.id, note: n.note, createdAt: n.createdAt.toISOString() })),
    });
  } catch (e) {
    console.error("admin session detail error", e);
    return ApiErrors.server();
  }
}

// POST — add a consultation note (admin only).
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();
  const { sessionId } = await params;
  let body: { note?: string };
  try {
    body = await req.json();
  } catch {
    return ApiErrors.validation("요청 본문을 해석할 수 없습니다.");
  }
  if (!body.note || !body.note.trim()) {
    return ApiErrors.validation("메모 내용이 필요합니다.");
  }

  // Admin notes must not carry personal data — mask defensively.
  const { maskSensitiveText } = await import("@/lib/domain/privacy");
  try {
    const note = await prisma.adminNote.create({
      data: { sessionId, note: maskSensitiveText(body.note) },
    });
    return NextResponse.json({ id: note.id, note: note.note });
  } catch (e) {
    console.error("admin note create error", e);
    return ApiErrors.server();
  }
}
