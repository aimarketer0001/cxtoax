interface Props {
  totalScore: number;
  learnerType: string;
  fitLevel: string;
}

function fitBadgeClass(fit: string): string {
  if (fit === "높음") return "badge badge-success";
  if (fit === "보통") return "badge badge-accent";
  if (fit === "보류") return "badge badge-danger";
  return "badge badge-warning";
}

export default function SummaryCard({ totalScore, learnerType, fitLevel }: Props) {
  return (
    <section className="card" aria-label="진단 요약">
      <div className="summary-grid">
        <div className="summary-item">
          <div className="label">총점</div>
          <div className="value">
            {totalScore}
            <span style={{ fontSize: 18, color: "var(--color-muted)" }}> / 100</span>
          </div>
        </div>
        <div className="summary-item">
          <div className="label">수강자 유형</div>
          <div className="value" style={{ fontSize: 22 }}>
            {learnerType}
          </div>
        </div>
        <div className="summary-item">
          <div className="label">교육 적합도</div>
          <div className="value">
            <span className={fitBadgeClass(fitLevel)} style={{ fontSize: 18 }}>
              {fitLevel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
