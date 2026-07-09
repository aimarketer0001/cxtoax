import { NextRequest, NextResponse } from "next/server";
import { ApiErrors } from "@/lib/api";
import { loadSessionView } from "@/lib/sessionView";

// GET /api/diagnosis/{sessionId} — retrieve a stored result.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  try {
    const view = await loadSessionView(sessionId);
    if (!view) return ApiErrors.notFound("진단 결과를 찾을 수 없습니다.");
    return NextResponse.json(view);
  } catch (e) {
    console.error("get session error", e);
    return ApiErrors.server();
  }
}
