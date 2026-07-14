"use client";

import { useEffect, useState, type FormEvent } from "react";

const PROGRAM_OPTIONS = [
  "하반기 마케팅 전략 워크숍",
  "AI 마케팅 실무 교육",
  "AX 실무 전환 교육",
  "CRM 기반 고객경영 교육",
  "프롬프트 기반 업무 도구 제작(바이브 코딩) 교육",
  "AI 검색/AEO 진단",
  "CRM 자동화 설계",
  "AI 콘텐츠 운영 체계 구축",
  "기업 맞춤 AI 마케팅 교육",
  "기타 상담",
];

type ContactFormProps = {
  initialTopic?: string;
};

export default function MicrositeContactForm({
  initialTopic = PROGRAM_OPTIONS[0],
}: ContactFormProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [schedule, setSchedule] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    function handleTopicClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-contact-topic]");
      const nextTopic = trigger?.dataset.contactTopic;
      if (nextTopic && PROGRAM_OPTIONS.includes(nextTopic)) setTopic(nextTopic);
    }

    document.addEventListener("click", handleTopicClick);
    return () => document.removeEventListener("click", handleTopicClick);
  }, []);

  async function submit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
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
          source: "microsite",
          name,
          org,
          phone,
          email,
          topic,
          industry,
          schedule,
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
      setIndustry("");
      setSchedule("");
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
    <section className="microsite-section microsite-contact" id="report-contact">
      <div className="microsite-wrap contact-grid">
        <div>
          <p className="section-kicker">CONTACT</p>
          <h2>하반기 마케팅 실행 체계를 함께 정리해 보세요</h2>
          <p className="section-lead">
            현재 조직의 콘텐츠, 검색, CRM, AI 활용 상황을 알려주시면
            필요한 교육이나 워크숍 형태를 제안드립니다.
          </p>
          <div className="contact-points">
            <div>
              <strong>상담 범위</strong>
              <span>전략 워크숍, AEO 진단, CRM 자동화, AI 콘텐츠 운영 교육</span>
            </div>
            <div>
              <strong>진행 방식</strong>
              <span>온라인 사전 미팅 후 교육 범위와 실습 예제 확정</span>
            </div>
            <div>
              <strong>추천 준비물</strong>
              <span>현재 운영 중인 랜딩, 콘텐츠, CRM 플로우 또는 업무 고민 메모</span>
            </div>
          </div>
        </div>

        <form className="contact-card" onSubmit={submit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="micro-name">
                이름 <span className="req">*</span>
              </label>
              <input
                id="micro-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="micro-org">
                소속/회사 <span className="req">*</span>
              </label>
              <input
                id="micro-org"
                value={org}
                onChange={(event) => setOrg(event.target.value)}
                type="text"
                autoComplete="organization"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="micro-phone">
                연락처 <span className="req">*</span>
              </label>
              <input
                id="micro-phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                type="text"
                autoComplete="tel"
              />
            </div>
            <div className="field">
              <label htmlFor="micro-email">이메일 (선택)</label>
              <input
                id="micro-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="micro-topic">
              관심 주제 <span className="req">*</span>
            </label>
            <select
              id="micro-topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            >
              {PROGRAM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="micro-industry">업종/조직 유형</label>
              <input
                id="micro-industry"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                type="text"
                placeholder="예: B2B SaaS, 제조, 교육기관"
              />
            </div>
            <div className="field">
              <label htmlFor="micro-schedule">희망 일정</label>
              <input
                id="micro-schedule"
                value={schedule}
                onChange={(event) => setSchedule(event.target.value)}
                type="text"
                placeholder="예: 8월 중, 9월 초"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="micro-message">
              문의 내용 <span className="req">*</span>
            </label>
            <textarea
              id="micro-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="예: 하반기 캠페인 메시지, CRM 자동화, 콘텐츠 운영을 함께 정리하는 교육이 필요합니다."
            />
          </div>

          <div className="bot-field" aria-hidden="true">
            <label htmlFor="micro-website">웹사이트</label>
            <input
              id="micro-website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="privacy-notice">
            <strong>개인정보 수집·이용 안내</strong>
            <p>
              수집 항목: 이름, 소속, 연락처, 이메일(선택), 관심 주제, 업종/조직
              유형, 희망 일정, 문의 내용
            </p>
            <p>이용 목적: 교육 상담 회신 및 맞춤 제안</p>
            <p>보유 기간: 상담 종료일로부터 1년간 보관 후 파기합니다. 보관 기간 이전에 삭제를 요청하면 확인 후 파기합니다.</p>
            <p>동의를 거부할 수 있으며, 거부 시 상담 신청 접수가 제한됩니다.</p>
          </div>
          <label className="privacy-check" htmlFor="micro-privacy-consent">
            <input
              id="micro-privacy-consent"
              checked={privacyConsent}
              onChange={(event) => setPrivacyConsent(event.target.checked)}
              type="checkbox"
            />
            <span>개인정보 수집·이용 안내를 확인했으며 교육 상담 회신을 위한 정보 제공에 동의합니다.</span>
          </label>
          <p className="privacy-note">
            민감한 개인정보나 고객 원본 데이터는 입력하지 마세요.
          </p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="form-success" role="status" aria-live="polite">
              {success}
            </p>
          )}
          {busy && (
            <p className="form-status" role="status" aria-live="polite">
              교육 상담 내용을 접수하고 있습니다...
            </p>
          )}
          <button className="contact-submit" type="submit" disabled={busy}>
            {busy ? "접수 중..." : "교육 상담 신청하기"}
          </button>
        </form>
      </div>
    </section>
  );
}
