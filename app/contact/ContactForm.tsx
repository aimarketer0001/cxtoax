"use client";

import { useState, type FormEvent } from "react";

const TOPIC_OPTIONS = [
  "대표 교육 과정 문의 (고객관리·상담·영업 AI)",
  "기타 교육 주제 문의 (전체 30개 주제)",
  "특강·행사 강연 문의",
  "커리큘럼 맞춤 상담",
  "기타",
];

type FieldErrors = { name?: string; org?: string; phone?: string; message?: string };

export default function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [consentError, setConsentError] = useState("");
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setApiError("");
    setConsentError("");

    const errs: FieldErrors = {};
    if (!name.trim()) errs.name = "이름을 입력해 주세요.";
    if (!org.trim()) errs.org = "소속을 입력해 주세요.";
    if (!phone.trim()) errs.phone = "연락처를 입력해 주세요.";
    if (!message.trim()) errs.message = "문의 내용을 입력해 주세요.";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!privacyConsent) {
      setConsentError("개인정보 수집·이용 안내에 동의해 주세요.");
      return;
    }

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
        setApiError(data?.error?.message ?? "교육 상담 신청을 저장하지 못했습니다.");
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
      setFieldErrors({});
    } catch {
      setApiError("일시적인 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="field" style={fieldErrors.name ? { borderColor: "#E5484D" } : {}}>
        <label htmlFor="contact-name">이름 *</label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => { setName(e.target.value); if (fieldErrors.name) setFieldErrors(p => ({ ...p, name: undefined })); }}
          type="text"
          autoComplete="name"
          aria-describedby={fieldErrors.name ? "err-name" : undefined}
          aria-invalid={!!fieldErrors.name}
        />
        {fieldErrors.name && <span id="err-name" role="alert" style={{ color: "#E5484D", fontSize: 12, marginTop: 4, display: "block" }}>{fieldErrors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor="contact-org">소속 *</label>
        <input
          id="contact-org"
          value={org}
          onChange={(e) => { setOrg(e.target.value); if (fieldErrors.org) setFieldErrors(p => ({ ...p, org: undefined })); }}
          type="text"
          autoComplete="organization"
          aria-describedby={fieldErrors.org ? "err-org" : undefined}
          aria-invalid={!!fieldErrors.org}
        />
        {fieldErrors.org && <span id="err-org" role="alert" style={{ color: "#E5484D", fontSize: 12, marginTop: 4, display: "block" }}>{fieldErrors.org}</span>}
      </div>
      <div className="field">
        <label htmlFor="contact-phone">연락처 *</label>
        <input
          id="contact-phone"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); if (fieldErrors.phone) setFieldErrors(p => ({ ...p, phone: undefined })); }}
          type="text"
          autoComplete="tel"
          aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
          aria-invalid={!!fieldErrors.phone}
        />
        {fieldErrors.phone && <span id="err-phone" role="alert" style={{ color: "#E5484D", fontSize: 12, marginTop: 4, display: "block" }}>{fieldErrors.phone}</span>}
      </div>
      <div className="field">
        <label htmlFor="contact-email">이메일 (선택)</label>
        <input
          id="contact-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          autoComplete="email"
        />
      </div>
      <div className="field">
        <label htmlFor="contact-topic">문의 목적 (선택)</label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
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
          onChange={(e) => { setMessage(e.target.value); if (fieldErrors.message) setFieldErrors(p => ({ ...p, message: undefined })); }}
          placeholder="교육 대상, 희망 주제, 예상 일정 등을 알려주세요."
          aria-describedby={fieldErrors.message ? "err-message" : undefined}
          aria-invalid={!!fieldErrors.message}
        />
        {fieldErrors.message && <span id="err-message" role="alert" style={{ color: "#E5484D", fontSize: 12, marginTop: 4, display: "block" }}>{fieldErrors.message}</span>}
      </div>

      <div
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="contact-website">웹사이트</label>
        <input
          id="contact-website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
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
          onChange={(e) => { setPrivacyConsent(e.target.checked); if (consentError) setConsentError(""); }}
          type="checkbox"
          style={{ width: "auto", marginTop: 3 }}
        />
        <span>
          개인정보 수집·이용 안내를 확인했으며 교육 상담 회신을 위한 정보 제공에
          동의합니다.
        </span>
      </label>
      {consentError && <p role="alert" style={{ color: "#E5484D", fontSize: 13, marginTop: 6 }}>{consentError}</p>}

      {apiError && (
        <p className="form-error" role="alert" style={{ color: "var(--danger, #c0392b)" }}>
          {apiError}
        </p>
      )}
      {success && (
        <p role="status" aria-live="polite" style={{ color: "var(--success, #1e7e34)" }}>
          {success}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? "접수 중..." : "상담 신청하기"}
      </button>
    </form>
  );
}
