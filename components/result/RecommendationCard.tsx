interface Rec {
  rank: number;
  courseId: string;
  courseTitle: string;
  category?: string;
  reason: string;
  expectedEffect?: string;
}

export default function RecommendationCard({
  rec,
  syllabusUrl,
}: {
  rec: Rec;
  syllabusUrl?: string;
}) {
  return (
    <article className="rec-card">
      <div className="row" style={{ gap: 8, marginBottom: 6 }}>
        <span className="rec-rank">{rec.rank}</span>
        <h3 style={{ margin: 0 }}>{rec.courseTitle}</h3>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <span className="badge badge-muted">{rec.courseId}</span>
        {rec.category ? <span className="badge badge-accent">{rec.category}</span> : null}
      </div>
      <p style={{ marginBottom: 4 }}>{rec.reason}</p>
      {rec.expectedEffect ? (
        <p className="muted" style={{ margin: "0 0 12px", fontSize: "var(--font-caption)" }}>
          기대 효과: {rec.expectedEffect}
        </p>
      ) : null}
      {syllabusUrl && (
        <div className="row" style={{ gap: 8 }}>
          <a
            className="btn btn-ghost"
            style={{ fontSize: "var(--font-body)", padding: "10px 16px" }}
            href={syllabusUrl}
          >
            강의안 보기
          </a>
        </div>
      )}
    </article>
  );
}
