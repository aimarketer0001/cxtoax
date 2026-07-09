import { NextRequest, NextResponse } from "next/server";
import { ApiErrors } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

const STATUSES = new Set(["new", "contacted", "proposed", "closed"]);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ inquiryId: string }> }
) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();
  const { inquiryId } = await params;

  const inquiry = await prisma.consultationInquiry.findUnique({
    where: { id: inquiryId },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });
  if (!inquiry) return ApiErrors.notFound("상담 신청을 찾을 수 없습니다.");

  return NextResponse.json({
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
    updatedAt: inquiry.updatedAt.toISOString(),
    notes: inquiry.notes.map((note) => ({
      id: note.id,
      note: note.note,
      createdAt: note.createdAt.toISOString(),
    })),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ inquiryId: string }> }
) {
  if (!isAdminRequest(req)) return ApiErrors.unauthorized();
  const { inquiryId } = await params;

  let body: { status?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return ApiErrors.validation("요청 본문을 해석할 수 없습니다.");
  }

  const exists = await prisma.consultationInquiry.findUnique({
    where: { id: inquiryId },
    select: { id: true },
  });
  if (!exists) return ApiErrors.notFound("상담 신청을 찾을 수 없습니다.");

  try {
    const result: { status?: string; note?: { id: string; note: string } } = {};

    if (body.status) {
      if (!STATUSES.has(body.status)) return ApiErrors.validation("잘못된 상태값입니다.");
      const updated = await prisma.consultationInquiry.update({
        where: { id: inquiryId },
        data: { status: body.status },
        select: { status: true },
      });
      result.status = updated.status;
    }

    if (body.note?.trim()) {
      const note = await prisma.consultationInquiryNote.create({
        data: { inquiryId, note: body.note.trim().slice(0, 2000) },
        select: { id: true, note: true },
      });
      result.note = note;
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("admin inquiry update error", e);
    return ApiErrors.server("상담 신청 업데이트에 실패했습니다.");
  }
}
