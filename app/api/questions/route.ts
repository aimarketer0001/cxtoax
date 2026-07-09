import { NextResponse } from "next/server";
import { loadPublicQuestions } from "@/lib/domain/questions";
import { ApiErrors } from "@/lib/api";

// GET /api/questions — public diagnosis questions (no scoring weights).
export async function GET() {
  try {
    return NextResponse.json({ questions: loadPublicQuestions() });
  } catch (e) {
    console.error("questions error", e);
    return ApiErrors.server("문항을 불러오지 못했습니다.");
  }
}
