"use client";

import { useEffect, useState } from "react";

const PROGRAM_OPTIONS = [
  "하반기 마케팅 전략 워크숍",
  "AI 마케팅 실무 교육",
  "AX 실무 전환 교육",
  "CRM 기반 고객경영 교육",
  "프롬프트 기반 업무도구 제작(바이브코딩) 교육",
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

  async function submit() {
    if (!name.trim() || !org.trim() || !phone.trim() || !message.trim()) {
      setError("이름, 소속, 연락처, 현재 고민을 입력해 주세요.");
      return;
    }
    if (!privacyConsent) {
      setError("개인정보 수집·이용 안내에 동의해야 상담 신청이 가능합니다.");
      return;
    }
    setError("");
    setSuccess("");
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
        setError(data?.error?.message ?? "상담 신청 저장에 실패했습니다.");
        return;
      }
      setSuccess("상담 신청이 접수되었습니다. 관리자 화면에서 확인할 수 있습니다.");
      setName("");
      setOrg("");
      setPhone("");
      setEmail("");
      setIndustry("");
      setSchedule("");
      setMessage("");
      setWebsite("");
      setPrivacyConsent(false);
      setTopic(initialTopic);
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="microsite-section microsite-contact" id="report-contact">
      <div className="microsite-wrap contact-grid">
        <div>
          <p className="section-kicker">CONTACT</p>
          <h2>하반기 마케팅 실행 체계를 함께 설계해 보세요</h2>
          <p className="section-lead">
            현재 조직의 콘텐츠, 검색, CRM, AI 활용 상황을 알려주시면 가장
            필요한 워크숍 또는 컨설팅 형태로 제안드립니다.
          </p>
          <div className="contact-points">
            <div>
              <strong>상담 범위</strong>
              <span>전략 워크숍, AEO 진단, CRM 자동화, AI 콘텐츠 운영</span>
            </div>
            <div>
              <strong>진행 방식</strong>
              <span>온라인 사전 미팅 후 교육/컨설팅 범위 확정</span>
            </div>
            <div>
              <strong>추천 준비물</strong>
              <span>현재 운영 중인 랜딩, 콘텐츠, CRM 플로우 또는 고민 메모</span>
            </div>
          </div>
        </div>

        <form className="contact-card" onSubmit={(event) => event.preventDefault()}>
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
              <label htmlFor="micro-email">이메일</label>
              <input
                id="micro-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="text"
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
              현재 고민 <span className="req">*</span>
            </label>
            <textarea
              id="micro-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="예: 하반기 캠페인 메시지가 흩어져 있고, CRM 자동화와 콘텐츠 운영을 함께 정리하고 싶습니다."
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
            <p>보유 기간: 상담 종료 후 1년 또는 삭제 요청 시까지</p>
            <p>동의를 거부할 수 있으며, 거부 시 상담 신청 접수가 제한됩니다.</p>
          </div>
          <label className="privacy-check" htmlFor="micro-privacy-consent">
            <input
              id="micro-privacy-consent"
              checked={privacyConsent}
              onChange={(event) => setPrivacyConsent(event.target.checked)}
              type="checkbox"
            />
            <span>개인정보 수집·이용 안내를 확인했으며 상담 회신을 위한 정보 제공에 동의합니다.</span>
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
            <p className="form-success" role="status">
              {success}
            </p>
          )}
          {busy && (
            <p className="form-status" role="status" aria-live="polite">
              상담 신청 내용을 저장하고 있습니다...
            </p>
          )}
          <button className="contact-submit" type="button" onClick={submit} disabled={busy}>
            {busy ? "저장 중..." : "상담 신청하기"}
          </button>
        </form>
      </div>
    </section>
  );
}
