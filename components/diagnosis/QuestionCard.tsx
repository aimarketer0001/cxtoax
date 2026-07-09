"use client";

export interface PublicQuestion {
  no: number;
  question: string;
  type: "single_choice" | "multi_choice" | "scale_5" | "branch_choice" | "free_text";
  area: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

type Value = number | string | string[] | undefined;

const SCALE_LABELS = ["전혀 아니다", "아니다", "보통", "그렇다", "매우 그렇다"];

export default function QuestionCard({
  question,
  value,
  onChange,
}: {
  question: PublicQuestion;
  value: Value;
  onChange: (v: Value) => void;
}) {
  const q = question;

  return (
    <div className="card" aria-live="polite">
      <div className="badge badge-accent" style={{ marginBottom: 10 }}>
        {q.area}
      </div>
      <h2 className="question-title" style={{ fontSize: "var(--font-h3)" }}>
        <span>
          {q.no}. {q.question}
        </span>
        {q.type === "multi_choice" && (
          <span className="question-note">복수 선택 가능</span>
        )}
      </h2>

      {q.type === "scale_5" && (
        <div className="options options-scale" role="radiogroup" aria-label={q.question}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className={`scale-opt ${value === n ? "selected" : ""}`}>
              <input
                type="radio"
                name={`q${q.no}`}
                checked={value === n}
                onChange={() => onChange(n)}
              />
              <span className="scale-num">{n}</span>
              <span className="scale-label">{SCALE_LABELS[n - 1]}</span>
            </label>
          ))}
        </div>
      )}

      {(q.type === "single_choice" || q.type === "branch_choice") && (
        <div className="options options-grid" role="radiogroup" aria-label={q.question}>
          {q.options?.map((o) => (
            <label
              key={o.value}
              className={`option option-radio-card ${
                value === o.value ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name={`q${q.no}`}
                checked={value === o.value}
                onChange={() => onChange(o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      )}

      {q.type === "multi_choice" && (
        <div className="options options-grid">
          {q.options?.map((o) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(o.value);
            return (
              <label
                key={o.value}
                className={`option option-checkbox-card ${checked ? "selected" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    if (o.value === "none") {
                      onChange(checked ? [] : ["none"]);
                      return;
                    }
                    const next = checked
                      ? arr.filter((v) => v !== o.value)
                      : [...arr.filter((v) => v !== "none"), o.value];
                    onChange(next);
                  }}
                />
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {q.type === "free_text" && (
        <div>
          <textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="자유롭게 작성해 주세요"
            aria-label={q.question}
          />
          <p className="hint">
            이름·연락처 등 개인정보는 입력하지 마세요. 저장 전 자동으로 가려집니다.
          </p>
        </div>
      )}
    </div>
  );
}
