import { NextResponse } from "next/server";

// Standard error envelope (docs/06_API.md).
export function errorResponse(
  code: string,
  message: string,
  status: number,
  details: Record<string, unknown> = {}
) {
  return NextResponse.json(
    { error: { code, message, details } },
    { status }
  );
}

export const ApiErrors = {
  validation: (message: string, details: Record<string, unknown> = {}) =>
    errorResponse("VALIDATION_ERROR", message, 400, details),
  unauthorized: () =>
    errorResponse("UNAUTHORIZED", "관리자 인증이 필요합니다.", 401),
  forbidden: () => errorResponse("FORBIDDEN", "권한이 없습니다.", 403),
  scoring: (message = "점수 계산에 실패했습니다.") =>
    errorResponse("SCORING_ERROR", message, 500),
  notFound: (message = "리소스를 찾을 수 없습니다.") =>
    errorResponse("NOT_FOUND", message, 404),
  server: (message = "서버 오류가 발생했습니다.") =>
    errorResponse("SERVER_ERROR", message, 500),
};
