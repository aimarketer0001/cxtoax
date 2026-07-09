import Link from "next/link";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { isAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  new: "신규",
  contacted: "연락 완료",
  proposed: "제안 진행",
  closed: "종료",
};

const SOURCE_LABELS: Record<string, string> = {
  landing: "홈 랜딩",
  microsite: "전략보고서",
  diagnosis: "진단 결과",
};

const STATUS_BADGES: Record<string, string> = {
  new: "badge badge-danger",
  contacted: "badge badge-accent",
  proposed: "badge badge-warning",
  closed: "badge badge-muted",
};

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; status?: string; source?: string; q?: string }>;
}) {
  if (!(await isAdminSession())) redirect("/admin/login");

  const { from = "", to = "", status = "", source = "", q = "" } = await searchParams;
  const dateRange =
    from || to
      ? {
          ...(from ? { gte: new Date(from) } : {}),
          ...(to ? { lte: new Date(`${to}T23:59:59`) } : {}),
        }
      : undefined;

  const where: Prisma.ConsultationInquiryWhereInput = {
    ...(dateRange ? { createdAt: dateRange } : {}),
    ...(status ? { status } : {}),
    ...(source ? { source } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { org: { contains: q } },
            { phone: { contains: q } },
            { email: { contains: q } },
            { topic: { contains: q } },
            { message: { contains: q } },
          ],
        }
      : {}),
  };

  const [total, newCount, inquiries] = await Promise.all([
    prisma.consultationInquiry.count({ where }),
    prisma.consultationInquiry.count({ where: { ...where, status: "new" } }),
    prisma.consultationInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { notes: { orderBy: { createdAt: "desc" }, take: 1 } },
    }),
  ]);

  const filtered = !!(from || to || status || source || q);

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <Link href="/admin" className="nav-link">← 대시보드</Link>
        <div className="spacer" />
        <Link href="/admin" className="btn btn-ghost btn-sm">진단 응답 보기</Link>
      </div>

      <div className="row" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>교육상담 신청</h1>
        <div className="spacer" />
        <span className="badge badge-accent">신규 {newCount}건</span>
      </div>

      <section className="card" style={{ marginBottom: 16 }}>
        <form method="get" className="row" style={{ alignItems: "flex-end", gap: 12 }}>
          <div className="admin-search-field">
            <label htmlFor="q">검색</label>
            <input
              id="q"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="이름, 소속, 연락처"
            />
          </div>
          <div>
            <label htmlFor="from">시작일</label>
            <input id="from" type="date" name="from" defaultValue={from} style={{ width: 160 }} />
          </div>
          <div>
            <label htmlFor="to">종료일</label>
            <input id="to" type="date" name="to" defaultValue={to} style={{ width: 160 }} />
          </div>
          <div>
            <label htmlFor="status">상태</label>
            <select id="status" name="status" defaultValue={status} style={{ width: 150 }}>
              <option value="">전체</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="source">유입</label>
            <select id="source" name="source" defaultValue={source} style={{ width: 150 }}>
              <option value="">전체</option>
              <option value="landing">홈 랜딩</option>
              <option value="microsite">마이크로사이트</option>
              <option value="diagnosis">진단 결과</option>
            </select>
          </div>
          <button className="btn btn-primary btn-sm" type="submit">필터 적용</button>
          {filtered && (
            <Link className="btn btn-ghost btn-sm" href="/admin/inquiries">
              초기화
            </Link>
          )}
        </form>
      </section>

      <section className="card">
        <div className="row" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>상담 신청 목록</h2>
          <div className="spacer" />
          <span className="muted">총 {total}건</span>
        </div>

        {inquiries.length === 0 ? (
          <p className="muted">아직 상담 신청이 없습니다.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>일시</th>
                  <th>상태</th>
                  <th>유입</th>
                  <th>이름</th>
                  <th>소속</th>
                  <th>관심 주제</th>
                  <th>연락처</th>
                  <th>최근 메모</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((item) => (
                  <tr key={item.id}>
                    <td className="muted">{new Date(item.createdAt).toLocaleString("ko-KR")}</td>
                    <td>
                      <span className={STATUS_BADGES[item.status] ?? "badge badge-muted"}>
                        {STATUS_LABELS[item.status] ?? item.status}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-muted">
                        {SOURCE_LABELS[item.source] ?? item.source}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.org}</td>
                    <td>{item.topic || "-"}</td>
                    <td>{item.phone}</td>
                    <td className="muted">{item.notes[0]?.note ?? "-"}</td>
                    <td><Link href={`/admin/inquiries/${item.id}`}>상세</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
