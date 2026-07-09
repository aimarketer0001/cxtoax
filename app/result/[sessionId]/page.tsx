import Link from "next/link";
import { loadSessionView } from "@/lib/sessionView";
import SummaryCard from "@/components/result/SummaryCard";
import ScoreChart from "@/components/result/ScoreChart";
import RecommendationCard from "@/components/result/RecommendationCard";
import ResultActions from "@/components/result/ResultActions";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const view = await loadSessionView(sessionId);

  if (!view) {
    return (
      <div className="container">
        <div className="alert alert-danger">진단 결과를 찾을 수 없습니다.</div>
        <Link href="/diagnosis" className="btn btn-primary">
          진단 다시 시작하기
        </Link>
      </div>
    );
  }

  const report = view.report;
  const onHold = view.summary.fitLevel === "보류";
  const learnerType = view.summary.learnerType;

  // Representative courses have dedicated curriculum sections on the marketing site;
  // others deep-link to the full 30-course list.
  const SYLLABUS_ANCHOR: Record<string, string> = {
    "CX-B-01": "syllabus-1",
    "CX-B-02": "syllabus-2",
    "CX-B-04": "syllabus-3",
  };
  const syllabusUrl = (courseId: string) =>
    `/#${SYLLABUS_ANCHOR[courseId] ?? "courses-all"}`;
  return (
    <div className="container">
      <a className="back-link" href="/">← 홈으로 돌아가기</a>
      <div className="print-header">
        <span>CX to AX · 교육 과정 추천 리포트</span>
        <span className="date">
          {new Date(view.createdAt).toLocaleDateString("ko-KR")}
        </span>
      </div>
      <div className="page-head">
        <div className="row">
          <h1 style={{ margin: 0 }}>교육 과정 추천 리포트</h1>
          <div className="spacer" />
          {report?.source === "ai" && (
            <span className="badge badge-accent">AI 보조 분석</span>
          )}
        </div>
        <div style={{ marginTop: 12 }}>
          <ResultActions />
        </div>
      </div>

      <div className="stack">
        <SummaryCard
          totalScore={view.summary.totalScore}
          learnerType={view.summary.learnerType}
          fitLevel={view.summary.fitLevel}
        />

        {onHold && (
          <div className="alert alert-warning">
            <strong>상담 먼저 권장</strong> — 현재는 바로 수강하기보다 학습 방향과 업무 상황을
            함께 점검하는 상담을 권장합니다. {view.summary.holdReason ? `(사유: ${view.summary.holdReason})` : ""}
          </div>
        )}

        {report?.summary && (
          <section className="card">
            <h2>진단 요약</h2>
            <p style={{ marginBottom: 0 }}>{report.summary}</p>
          </section>
        )}

        <ScoreChart areaScores={view.areaScores} />

        {report && (
          <div className="stack">
            <div className="grid-2">
              <section className="card">
                <h2>강점</h2>
                <ul className="list-check">
                  {report.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>

              <section className="card">
                <h2>보완할 부분</h2>
                <ul className="list-check">
                  {report.improvements.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="card">
              <h2>교육 전 준비사항</h2>
              <ul className="list-check">
                {report.preparation.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            {report.cautions.length > 0 && (
              <section className="card">
                <h2>참고할 점</h2>
                <ul className="list-check">
                  {report.cautions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        <section className="card">
          <h2>추천 교육 과정</h2>
          {view.recommendations.length === 0 ? (
            <p className="muted">
              현재 응답만으로는 적합한 과정을 특정하기 어렵습니다. 상담을 통해 업무 상황에 맞는 방향을 안내드리겠습니다.
            </p>
          ) : (
            view.recommendations.map((r) => {
              const detail = report?.recommendations.find((x) => x.courseId === r.courseId);
              return (
                <RecommendationCard
                  key={r.courseId}
                  rec={{
                    rank: r.rank,
                    courseId: r.courseId,
                    courseTitle: r.courseTitle,
                    category: r.category,
                    reason: detail?.reason ?? r.reason,
                    expectedEffect: detail?.expectedEffect,
                  }}
                  syllabusUrl={syllabusUrl(r.courseId)}
                />
              );
            })
          )}
        </section>

        <section className="card result-next-step">
          <h2>다음 단계: 교육 상담</h2>
          <p style={{ marginBottom: 16 }}>
            {report?.consultationMessage ??
              (onHold
                ? "진단 결과를 바탕으로 학습 방향과 우선순위를 함께 점검해 드립니다."
                : "추천 과정을 바탕으로 조직의 업무, 일정, 학습 수준에 맞춰 커리큘럼을 조정해 드립니다.")}
          </p>
          <div className="row">
            <a
              className="btn btn-primary"
              href={`/?diag=1&type=${encodeURIComponent(learnerType)}${
                view.recommendations[0]
                  ? `&course=${encodeURIComponent(
                      view.recommendations[0].courseId
                    )}&title=${encodeURIComponent(view.recommendations[0].courseTitle)}`
                  : ""
              }#contact`}
            >
              진단 결과로 교육 상담하기 →
            </a>
            <a className="btn btn-ghost" href="/#courses">
              전체 교육 과정 보기
            </a>
          </div>
        </section>

        <div className="result-footer-actions no-print">
          <Link href="/diagnosis" className="btn btn-ghost">
            진단 다시 하기
          </Link>
          <Link href="/" className="btn btn-ghost">
            처음으로
          </Link>
        </div>
      </div>
    </div>
  );
}
