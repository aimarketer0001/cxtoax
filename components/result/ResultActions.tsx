"use client";

import { useState } from "react";

export default function ResultActions() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — fall back to prompt.
      window.prompt("아래 링크를 복사하세요", window.location.href);
    }
  }

  return (
    <div className="row no-print" style={{ gap: 8 }}>
      <button className="btn btn-ghost btn-sm" onClick={copyLink}>
        {copied ? "복사됨 ✓" : "결과 링크 복사"}
      </button>
      <button className="btn btn-ghost btn-sm" onClick={() => window.print()}>
        인쇄 · PDF 저장
      </button>
    </div>
  );
}
