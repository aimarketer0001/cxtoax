import { AreaScore } from "@/lib/domain/types";

// Accessible bar chart: text labels + numeric values alongside the bars
// (docs/11_design.md — graphs must provide text alternatives).
export default function ScoreChart({ areaScores }: { areaScores: AreaScore[] }) {
  return (
    <section className="card" aria-label="영역별 점수">
      <h2>영역별 점수</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
        {areaScores.map((a) => {
          const pct = a.max > 0 ? Math.round((a.score / a.max) * 100) : 0;
          return (
            <li key={a.area} className="score-row">
              <span>{a.area}</span>
              <span className="bar" role="img" aria-label={`${a.area} ${a.score}점 만점 ${a.max}점`}>
                <span style={{ width: `${pct}%` }} />
              </span>
              <span className="num">
                {a.score}/{a.max}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
