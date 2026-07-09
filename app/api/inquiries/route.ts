import { NextRequest, NextResponse } from "next/server";
import { ApiErrors } from "@/lib/api";
import { prisma } from "@/lib/db";

type InquiryBody = {
  source?: string;
  name?: string;
  org?: string;
  phone?: string;
  email?: string;
  topic?: string;
  industry?: string;
  schedule?: string;
  message?: string;
  website?: string;
  privacyConsent?: boolean;
};

function clean(value: unknown, max = 500): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

export async function POST(req: NextRequest) {
  let body: InquiryBody;
  try {
    body = await req.json();
  } catch {
    return ApiErrors.validation("요청 본문을 해석할 수 없습니다.");
  }

  const name = clean(body.name, 80);
  const org = clean(body.org, 120);
  const phone = clean(body.phone, 80);
  const message = clean(body.message, 2000);
  const honeypot = clean(body.website, 160);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !org || !phone || !message) {
    return ApiErrors.validation("이름, 소속, 연락처, 문의 내용은 필수입니다.");
  }

  if (body.privacyConsent !== true) {
    return ApiErrors.validation("개인정보 수집·이용 안내에 동의해야 상담 신청이 가능합니다.", {
      field: "privacyConsent",
    });
  }

  try {
    const inquiry = await prisma.consultationInquiry.create({
      data: {
        source: clean(body.source, 40) ?? "landing",
        name,
        org,
        phone,
        message,
        email: clean(body.email, 160),
        topic: clean(body.topic, 160),
        industry: clean(body.industry, 160),
        schedule: clean(body.schedule, 160),
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({
      ok: true,
      id: inquiry.id,
      createdAt: inquiry.createdAt.toISOString(),
    });
  } catch (e) {
    console.error("consultation inquiry create error", e);
    return ApiErrors.server("상담 신청 저장에 실패했습니다.");
  }
}
