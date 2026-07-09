"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_LABELS: Record<string, string> = {
  new: "신규",
  contacted: "연락 완료",
  proposed: "제안 진행",
  closed: "종료",
};

const STATUS_BADGES: Record<string, string> = {
  new: "badge badge-danger",
  contacted: "badge badge-accent",
  proposed: "badge badge-warning",
  closed: "badge badge-muted",
};

export default function AdminInquiryActions({
  inquiryId,
  initialStatus,
  initialNotes,
}: {
  inquiryId: string;
  initialStatus: string;
  initialNotes: { id: string; note: string; createdAt: string }[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function update(payload: { status?: string; note?: string }) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error?.message ?? "저장에 실패했습니다.");
        return;
      }
      if (data.status) setStatus(data.status);
      if (data.note) {
        setNotes([
          { id: data.note.id, note: data.note.note, createdAt: new Date().toISOString() },
          ...notes,
        ]);
        setNote("");
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <div className="row">
        <h2 style={{ margin: 0 }}>상담 처리</h2>
        <div className="spacer" />
        <span className={STATUS_BADGES[status] ?? "badge badge-muted"}>
          {STATUS_LABELS[status] ?? status}
        </span>
      </div>

      {msg && <div className="alert alert-warning" style={{ marginTop: 12 }}>{msg}</div>}

      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="inquiry-status">상태</label>
        <select
          id="inquiry-status"
          value={status}
          onChange={(event) => update({ status: event.target.value })}
          disabled={busy}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (note.trim()) update({ note });
        }}
      >
        <label htmlFor="inquiry-note">상담 메모</label>
        <textarea
          id="inquiry-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="통화 내용, 후속 조치, 제안 범위 등을 기록하세요."
        />
        <div className="row" style={{ marginTop: 8 }}>
          <div className="spacer" />
          <button className="btn btn-primary" disabled={busy || !note.trim()}>
            메모 추가
          </button>
        </div>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
        {notes.map((item) => (
          <li key={item.id} style={{ borderTop: "1px solid var(--color-border)", padding: "10px 0" }}>
            <div>{item.note}</div>
            <div className="muted" style={{ fontSize: "var(--font-caption)" }}>
              {new Date(item.createdAt).toLocaleString("ko-KR")}
            </div>
          </li>
        ))}
        {notes.length === 0 && <li className="muted">아직 메모가 없습니다.</li>}
      </ul>
    </section>
  );
}
