import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { isAdminSession } from "@/lib/auth";
import { loadSessionView } from "@/lib/sessionView";
import { loadQuestions } from "@/lib/domain/questions";
import SummaryCard from "@/components/result/SummaryCard";
import ScoreChart from "@/components/result/ScoreChart";
import AdminSessionActions from "@/components/admin/AdminSessionActions";

export const dynamic = "force-dynamic";

export default async function AdminSessionDetail({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  if (!(await isAdminSession())) redirect("/admin/login");
  const { sessionId } = await params;

  const view = await loadSessionView(sessionId);
  if (!view) {
    return (
      <div className="container">
        <div className="alert alert-danger">응답을 찾을 수 없습니다.</div>
        <Link href="/admin" className="btn btn-ghost">대시보드로</Link>
      </div>
    );
  }

  const [answers, notes] = await Promise.all([
    prisma.answer.findMany({ where: { sessionId }, orderBy: { questionNo: "asc" } }),
    prisma.adminNote.findMany({ where: { sessionId }, orderBy: { createdAt: "desc" } }),
  ]);

  const questions = loadQuestions();
  const qMap = new Map(questions.map((q) => [q.no, q]));
  function labelFor(no: number, raw: string): string {
    const q = qMap.get(no);
    if (!q) return raw;
    if (q.type === "scale_5") return `${raw} / 5`;
    let values: string[];
    try {
      const parsed = JSON.parse(raw);
      values = Array.isArray(parsed) ? parsed : [raw];
    } catch {
      values = [raw];
    }
    if (q.options) {
      return values
        .map((v) => q.options?.find((o) => o.value === v)?.label ?? v)
        .join(", ");
    }
    return values.join(", ");
  }

  const report = view.report;

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <Link href="/admin" className="nav-link">← 대시보드</Link>
        <div className="spacer" />
        <span className="muted">{new Date(view.createdAt).toLocaleString("ko-KR")}</span>
      </div>
      <h1>응답 상세</h1>

      <div className="stack">
        <SummaryCard
          totalScore={view.summary.totalScore}
          learnerType={view.summary.learnerType}
          fitLevel={view.summary.fitLevel}
        />

        {view.summary.holdReason && (
          <div className="alert alert-warning">
            <strong>보류 사유</strong> — {view.summary.holdReason}
          </div>
        )}

        <ScoreChart areaScores={view.areaScores} />

        <section className="card">
          <h2>추천 교육</h2>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {view.recommendations.map((r) => (
              <li key={r.courseId} style={{ marginBottom: 6 }}>
                <strong>{r.courseTitle}</strong>{" "}
                <span className="muted">({r.courseId})</span>
                <div className="muted" style={{ fontSize: "var(--font-caption)" }}>
                  {r.reason}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {report && (
          <section className="card">
            <div className="row">
              <h2 style={{ margin: 0 }}>리포트</h2>
              <div className="spacer" />
              <span className={`badge ${report.source === "ai" ? "badge-accent" : "badge-muted"}`}>
                {report.source === "ai" ? "AI 보강" : "기본"}
              </span>
            </div>
            <p>{report.summary}</p>
            <p className="muted" style={{ marginBottom: 0 }}>
              상담 메시지: {report.consultationMessage}
            </p>
          </section>
        )}

        <section className="card">
          <h2>문항 응답</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>문항</th>
                <th>응답</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((a) => (
                <tr key={a.id}>
                  <td>{a.questionNo}</td>
                  <td>{qMap.get(a.questionNo)?.question ?? "-"}</td>
                  <td>{labelFor(a.questionNo, a.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <AdminSessionActions
          sessionId={sessionId}
          initialNotes={notes.map((n) => ({
            id: n.id,
            note: n.note,
            createdAt: n.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
