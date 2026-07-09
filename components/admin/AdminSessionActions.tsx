"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSessionActions({
  sessionId,
  initialNotes,
}: {
  sessionId: string;
  initialNotes: { id: string; note: string; createdAt: string }[];
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/sessions/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error?.message ?? "메모 저장 실패");
        return;
      }
      setNotes([
        { id: data.id, note: data.note, createdAt: new Date().toISOString() },
        ...notes,
      ]);
      setNote("");
    } finally {
      setBusy(false);
    }
  }

  async function regenerate() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error?.message ?? "리포트 재생성 실패");
        return;
      }
      setMsg(
        data.aiReportFailed
          ? "AI 생성에 실패하여 기본 리포트로 유지되었습니다."
          : "AI 리포트를 재생성했습니다."
      );
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <div className="row">
        <h2 style={{ margin: 0 }}>상담 메모</h2>
        <div className="spacer" />
        <button className="btn btn-ghost" onClick={regenerate} disabled={busy}>
          AI 리포트 재생성
        </button>
      </div>
      {msg && <div className="alert alert-warning" style={{ marginTop: 12 }}>{msg}</div>}

      <form onSubmit={addNote} style={{ marginTop: 12 }}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="상담 메모를 입력하세요. 개인정보는 입력하지 마세요."
        />
        <div className="row" style={{ marginTop: 8 }}>
          <div className="spacer" />
          <button className="btn btn-primary" disabled={busy || !note.trim()}>
            메모 추가
          </button>
        </div>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
        {notes.map((n) => (
          <li key={n.id} style={{ borderTop: "1px solid var(--color-border)", padding: "10px 0" }}>
            <div>{n.note}</div>
            <div className="muted" style={{ fontSize: "var(--font-caption)" }}>
              {new Date(n.createdAt).toLocaleString("ko-KR")}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
