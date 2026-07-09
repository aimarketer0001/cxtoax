import { NextRequest, NextResponse } from "next/server";
import { ApiErrors } from "@/lib/api";
import { ADMIN_COOKIE, checkAdminPassword, issueAdminToken } from "@/lib/auth";

// POST /api/admin/login — exchange password for an admin session cookie.
export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return ApiErrors.validation("요청 본문을 해석할 수 없습니다.");
  }

  if (!body.password || !checkAdminPassword(body.password)) {
    return ApiErrors.unauthorized();
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, issueAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8h session
  });
  return res;
}

// POST /api/admin/login with ?logout — clear the session.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
