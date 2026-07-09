import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { isAdminSession } from "@/lib/auth";
import AdminMetricCard from "@/components/admin/AdminMetricCard";

export const dynamic = "force-dynamic";

const LEARNER_TYPES = [
  "입문 체험형",
  "업무 적용형",
  "기획 확장형",
  "전문가 성장형",
  "비적합 또는 보류형",
];

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; type?: string }>;
}) {
  if (!(await isAdminSession())) redirect("/admin/login");

  const { from = "", to = "", type = "" } = await searchParams;
  const filtered = !!(from || to || type);

  const dateRange =
    from || to
      ? {
          ...(from ? { gte: new Date(from) } : {}),
          ...(to ? { lte: new Date(`${to}T23:59:59`) } : {}),
        }
      : undefined;

  const sessionWhere = {
    ...(dateRange ? { createdAt: dateRange } : {}),
    ...(type ? { score: { learnerType: type } } : {}),
  };
  const scoreWhere = {
    ...(type ? { learnerType: type } : {}),
    ...(dateRange ? { session: { createdAt: dateRange } } : {}),
  };

  const [total, scores, sessions, inquiryTotal, newInquiryCount] = await Promise.all([
    prisma.diagnosisSession.count({ where: sessionWhere }),
    prisma.score.findMany({
      where: scoreWhere,
      select: { learnerType: true, totalScore: true },
    }),
    prisma.diagnosisSession.findMany({
      where: sessionWhere,
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        score: true,
        recommendations: { orderBy: { rank: "asc" }, take: 1, include: { course: true } },
      },
    }),
    prisma.consultationInquiry.count(),
    prisma.consultationInquiry.count({ where: { status: "new" } }),
  ]);

  const typeCounts: Record<string, number> = {};
  let sum = 0;
  for (const s of scores) {
    typeCounts[s.learnerType] = (typeCounts[s.learnerType] ?? 0) + 1;
    sum += s.totalScore;
  }
  const avg = scores.length ? Math.round(sum / scores.length) : 0;

  const recGroups = await prisma.recommendation.groupBy({
    by: ["courseId"],
    where: filtered ? { session: sessionWhere } : undefined,
    _count: { courseId: true },
    orderBy: { _count: { courseId: "desc" } },
    take: 5,
  });
  const courseTitles = new Map(
    (await prisma.course.findMany({ select: { courseId: true, title: true } })).map((c) => [
      c.courseId,
      c.title,
    ])
  );
  const maxType = Math.max(1, ...Object.values(typeCounts));

  const exportQuery = new URLSearchParams({
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
    ...(type ? { type } : {}),
  }).toString();

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>관리자 대시보드</h1>
        <div className="spacer" />
        <Link href="/admin/inquiries" className="btn btn-ghost btn-sm">
          교육상담 신청
        </Link>
      </div>

      <section className="card" style={{ marginBottom: 16 }}>
        <form method="get" className="row" style={{ alignItems: "flex-end", gap: 12 }}>
          <div>
            <label htmlFor="from">시작일</label>
            <input id="from" type="date" name="from" defaultValue={from} style={{ width: 160 }} />
          </div>
          <div>
            <label htmlFor="to">종료일</label>
            <input id="to" type="date" name="to" defaultValue={to} style={{ width: 160 }} />
          </div>
          <div>
            <label htmlFor="type">유형</label>
            <select id="type" name="type" defaultValue={type} style={{ width: 190 }}>
              <option value="">전체</option>
              {LEARNER_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary btn-sm" type="submit">
            필터 적용
          </button>
          {filtered && (
            <a className="btn btn-ghost btn-sm" href="/admin">
              초기화
            </a>
          )}
          <div className="spacer" />
          <a
            className="btn btn-ghost btn-sm"
            href={`/api/admin/export${exportQuery ? `?${exportQuery}` : ""}`}
          >
            CSV 내보내기
          </a>
        </form>
      </section>

      <div className="metric-grid" style={{ marginBottom: 16 }}>
        <AdminMetricCard label="총 진단 수" value={total} />
        <AdminMetricCard label="분석 완료" value={scores.length} />
        <AdminMetricCard label="평균 총점" value={`${avg} / 100`} />
        <AdminMetricCard label="상담 신청" value={inquiryTotal} />
        <AdminMetricCard label="신규 상담" value={newInquiryCount} />
      </div>

      <div className="stack">
        <section className="card">
          <h2>수강자 유형 분포</h2>
          {Object.keys(typeCounts).length === 0 ? (
            <p className="muted">아직 데이터가 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {Object.entries(typeCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                  <li key={type} className="score-row">
                    <span>{type}</span>
                    <span className="bar">
                      <span style={{ width: `${(count / maxType) * 100}%` }} />
                    </span>
                    <span className="num">{count}</span>
                  </li>
                ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2>추천 교육 TOP 5</h2>
          {recGroups.length === 0 ? (
            <p className="muted">아직 데이터가 없습니다.</p>
          ) : (
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {recGroups.map((r) => (
                <li key={r.courseId}>
                  {courseTitles.get(r.courseId) ?? r.courseId}{" "}
                  <span className="muted">({r._count.courseId}회)</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="card">
          <h2>응답 목록</h2>
          {sessions.length === 0 ? (
            <p className="muted">아직 응답이 없습니다.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>일시</th>
                    <th>직무</th>
                    <th>총점</th>
                    <th>유형</th>
                    <th>적합도</th>
                    <th>1순위 추천</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id}>
                      <td className="muted">
                        {new Date(s.createdAt).toLocaleString("ko-KR")}
                      </td>
                      <td>{s.jobRole || "-"}</td>
                      <td>{s.score?.totalScore ?? "-"}</td>
                      <td>{s.score?.learnerType ?? "-"}</td>
                      <td>{s.score?.fitLevel ?? "-"}</td>
                      <td>{s.recommendations[0]?.course?.title ?? "-"}</td>
                      <td>
                        <Link href={`/admin/sessions/${s.id}`}>상세</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
