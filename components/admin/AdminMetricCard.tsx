export default function AdminMetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="muted" style={{ fontSize: "var(--font-caption)" }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-primary-900)" }}>
        {value}
      </div>
      {sub ? (
        <div className="muted" style={{ fontSize: "var(--font-caption)" }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
}
