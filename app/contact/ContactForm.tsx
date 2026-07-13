"use client";

import { useState, type FormEvent } from "react";

const TOPIC_OPTIONS = [
  "대표 교육 과정 문의 (고객관리·상담·영업 AI)",
  "기타 교육 주제 문의 (전체 30개 주제)",
  "특강·행사 강연 문의",
  "커리큘럼 맞춤 상담",
  "기타",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    if (!name.trim() || !org.trim() || !phone.trim() || !message.trim()) {
      setError("이름, 소속, 연락처, 문의 내용을 입력해 주세요.");
      return;
    }
    if (!privacyConsent) {
      setError("교육 상담 접수를 위해 개인정보 수집·이용 안내에 동의해 주세요.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-page",
          name,
          org,
          phone,
          email,
          topic,
          message,
          website,
          privacyConsent,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error?.message ?? "교육 상담 신청을 저장하지 못했습니다.");
        return;
      }
      setSuccess("교육 상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.");
      setName("");
      setOrg("");
      setPhone("");
      setEmail("");
      setTopic("");
      setMessage("");
      setWebsite("");
      setPrivacyConsent(false);
    } catch {
      setError("일시적인 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="field">
        <label htmlFor="contact-name">이름 *</label>
        <input
          id="contact-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          autoComplete="name"
        />
      </div>
      <div className="field">
        <label htmlFor="contact-org">소속 *</label>
        <input
          id="contact-org"
          value={org}
          onChange={(event) => setOrg(event.target.value)}
          type="text"
          autoComplete="organization"
        />
      </div>
      <div className="field">
        <label htmlFor="contact-phone">연락처 *</label>
        <input
          id="contact-phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          type="text"
          autoComplete="tel"
        />
      </div>
      <div className="field">
        <label htmlFor="contact-email">이메일 (선택)</label>
        <input
          id="contact-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          autoComplete="email"
        />
      </div>
      <div className="field">
        <label htmlFor="contact-topic">문의 목적 (선택)</label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        >
          <option value="">선택해 주세요</option>
          {TOPIC_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="contact-message">문의 내용 *</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="교육 대상, 희망 주제, 예상 일정 등을 알려주세요."
        />
      </div>

      <div
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="contact-website">웹사이트</label>
        <input
          id="contact-website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <strong>개인정보 수집·이용 안내</strong>
        <p className="muted" style={{ marginTop: 8 }}>
          수집 항목: 이름, 소속, 연락처, 이메일(선택), 문의 목적, 문의 내용
          <br />
          이용 목적: 교육 상담 회신 및 맞춤 제안
          <br />
          보유 기간: 상담 종료 후 1년 또는 삭제 요청 시까지
          <br />
          동의를 거부할 수 있으며, 거부 시 상담 신청 접수가 제한됩니다.
        </p>
      </div>
      <label
        className="field"
        htmlFor="contact-privacy-consent"
        style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
      >
        <input
          id="contact-privacy-consent"
          checked={privacyConsent}
          onChange={(event) => setPrivacyConsent(event.target.checked)}
          type="checkbox"
          style={{ width: "auto", marginTop: 3 }}
        />
        <span>
          개인정보 수집·이용 안내를 확인했으며 교육 상담 회신을 위한 정보 제공에
          동의합니다.
        </span>
      </label>

      {error && (
        <p className="form-error" role="alert" style={{ color: "var(--danger, #c0392b)" }}>
          {error}
        </p>
      )}
      {success && (
        <p role="status" aria-live="polite" style={{ color: "var(--success, #1e7e34)" }}>
          {success}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? "접수 중..." : "교육 상담 신청하기"}
      </button>
    </form>
  );
}
