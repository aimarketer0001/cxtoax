"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NoticeCard from "@/components/NoticeCard";
import QuestionCard, { PublicQuestion } from "@/components/diagnosis/QuestionCard";

type AnswerValue = number | string | string[] | undefined;

const DRAFT_KEY = "diagnosis_draft_v1";
const SCALE_LABELS = ["전혀 아니다", "아니다", "보통", "그렇다", "매우 그렇다"];
const QUESTIONS_PER_PAGE = 5;
const SEC_PER_Q = 18; // 남은 시간 추정용

function DiagnosisHeading({ totalQuestions }: { totalQuestions?: number }) {
  return (
    <header className="page-head diagnosis-page-head">
      <p className="badge badge-accent">AI·AX Diagnosis</p>
      <h1>AI·AX 역량 진단</h1>
      <p className="muted">
        {totalQuestions
          ? `${totalQuestions}개 문항으로 현재 업무 역량을 확인하고 조직과 실무에 맞는 교육 과정을 추천받으세요.`
          : "현재 업무 역량을 확인하고 조직과 실무에 맞는 교육 과정을 추천받으세요."}
      </p>
    </header>
  );
}

export default function DiagnosisPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // pageStep: -1 = 시작 안내, 0..P-1 = 문항 페이지, P = 검토
  const [pageStep, setPageStep] = useState(-1);
  const [consent, setConsent] = useState(false);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [warn, setWarn] = useState<string | null>(null);
  const [missingQuestionNo, setMissingQuestionNo] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    fetch("/api/questions")
      .then((r) => r.json())
      .then((d) => setQuestions(d.questions ?? []))
      .catch(() => setLoadError("진단 문항을 불러오지 못했습니다. 페이지를 새로고침해 주세요."))
      .finally(() => setLoading(false));
  }, []);

  // 저장된 초안 감지 (자동저장·이어하기)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const d = JSON.parse(raw);
          if (d && d.answers && Object.keys(d.answers).length > 0) {
            setResumeAvailable(true);
          }
        }
      } catch {
        /* ignore */
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // 자동 저장
  useEffect(() => {
    if (!hydrated) return;
    try {
      const hasProgress = Object.keys(answers).length > 0 || pageStep > -1;
      if (hasProgress) {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ answers, consent, pageStep, savedAt: Date.now() })
        );
      }
    } catch {
      /* ignore */
    }
  }, [answers, consent, pageStep, hydrated]);

  const pages = useMemo(() => {
    const out: PublicQuestion[][] = [];
    for (let i = 0; i < questions.length; i += QUESTIONS_PER_PAGE) {
      out.push(questions.slice(i, i + QUESTIONS_PER_PAGE));
    }
    return out;
  }, [questions]);
  const totalPages = pages.length;
  const totalQuestions = questions.length;

  const currentPage =
    pageStep >= 0 && pageStep < totalPages ? pages[pageStep] : null;
  const isReview = pageStep === totalPages && totalPages > 0;

  function isAnswered(q: PublicQuestion, v: AnswerValue): boolean {
    if (q.type === "multi_choice") return Array.isArray(v) && v.length > 0;
    if (q.type === "free_text") return typeof v === "string" && v.trim().length > 0;
    return v !== undefined && v !== "";
  }

  const answeredCount = useMemo(
    () => questions.filter((q) => isAnswered(q, answers[q.no])).length,
    [questions, answers]
  );
  const progress = useMemo(() => {
    if (pageStep < 0) return 0;
    if (isReview) return 100;
    return totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  }, [pageStep, isReview, answeredCount, totalQuestions]);
  const remainingMin = Math.max(
    1,
    Math.round(((totalQuestions - answeredCount) * SEC_PER_Q) / 60)
  );

  function answerLabel(q: PublicQuestion, v: AnswerValue): string {
    if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0))
      return "미응답";
    if (q.type === "scale_5") return `${v}. ${SCALE_LABELS[Number(v) - 1] ?? ""}`;
    const toLabel = (val: string) =>
      q.options?.find((o) => o.value === val)?.label ?? val;
    if (Array.isArray(v)) return v.map(toLabel).join(", ");
    if (q.options) return toLabel(String(v));
    return String(v);
  }

  const startFresh = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setResumeAvailable(false);
  }, []);

  const resume = useCallback(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setAnswers(d.answers ?? {});
        setConsent(!!d.consent);
        setPageStep(typeof d.pageStep === "number" ? d.pageStep : 0);
      }
    } catch {
      /* ignore */
    }
    setResumeAvailable(false);
  }, []);

  function scrollTop() {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const focusQuestion = useCallback((no: number) => {
    if (typeof window === "undefined") return;
    window.setTimeout(() => {
      const target = document.getElementById(`question-${no}`);
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      const field = target?.querySelector<HTMLElement>("input, textarea, button, select");
      field?.focus({ preventScroll: true });
    }, 0);
  }, []);

  useEffect(() => {
    if (missingQuestionNo !== null) {
      focusQuestion(missingQuestionNo);
    }
  }, [focusQuestion, missingQuestionNo, pageStep]);

  function firstUnansweredOnPage(): PublicQuestion | null {
    if (!currentPage) return null;
    return currentPage.find((q) => q.required && !isAnswered(q, answers[q.no])) ?? null;
  }

  function goNext() {
    setWarn(null);
    if (pageStep === -1) {
      if (!consent) {
        setWarn("개인정보 보호 및 브라우저 임시 저장 안내에 동의해 주세요.");
        return;
      }
      setMissingQuestionNo(null);
      setPageStep(0);
      scrollTop();
      return;
    }
    const firstMissingOnPage = firstUnansweredOnPage();
    if (firstMissingOnPage) {
      setMissingQuestionNo(firstMissingOnPage.no);
      setWarn(`${firstMissingOnPage.no}번 문항에 응답해 주세요.`);
      focusQuestion(firstMissingOnPage.no);
      return;
    }
    if (pageStep < totalPages) {
      setMissingQuestionNo(null);
      setPageStep(pageStep + 1); // 마지막 페이지 다음은 검토
      scrollTop();
    }
  }

  function goPrev() {
    setWarn(null);
    setMissingQuestionNo(null);
    if (pageStep >= 0) {
      setPageStep(pageStep - 1);
      scrollTop();
    }
  }

  async function submit() {
    setWarn(null);
    setSubmitError(null);
    const firstMissing = questions.find(
      (q) => q.required && !isAnswered(q, answers[q.no])
    );
    if (firstMissing) {
      setSubmitError(`${firstMissing.no}번 문항이 아직 응답되지 않았습니다.`);
      setMissingQuestionNo(firstMissing.no);
      const pageIdx = Math.floor(
        questions.findIndex((q) => q.no === firstMissing.no) / QUESTIONS_PER_PAGE
      );
      setPageStep(pageIdx);
      focusQuestion(firstMissing.no);
      return;
    }
    const payload = {
      answers: Object.entries(answers).map(([no, value]) => ({
        questionNo: Number(no),
        value,
      })),
      consent: { privacyNoticeAccepted: consent },
    };
    setSubmitting(true);
    try {
      const res = await fetch("/api/diagnosis/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data?.error?.message ?? "진단 제출에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        const missing: number[] | undefined = data?.error?.details?.missing;
        if (missing && missing.length) {
          const idx = questions.findIndex((q) => q.no === missing[0]);
          if (idx >= 0) {
            setMissingQuestionNo(missing[0]);
            setPageStep(Math.floor(idx / QUESTIONS_PER_PAGE));
            focusQuestion(missing[0]);
          }
        }
        return;
      }
      startFresh();
      router.push(`/result/${data.sessionId}`);
    } catch {
      setSubmitError("일시적인 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return (
      <div className="container">
        <DiagnosisHeading />
        <p>불러오는 중…</p>
      </div>
    );
  if (loadError)
    return (
      <div className="container">
        <DiagnosisHeading />
        <div className="alert alert-danger">{loadError}</div>
      </div>
    );

  const pageStart = pageStep * QUESTIONS_PER_PAGE + 1;
  const pageEnd = Math.min(pageStart + QUESTIONS_PER_PAGE - 1, totalQuestions);

  return (
    <div
      className={`container has-sticky-actions ${
        pageStep === -1 ? "diagnosis-start" : ""
      }`}
      style={{ maxWidth: 720 }}
    >
      <a className="back-link" href="/">
        ← 홈으로 돌아가기
      </a>

      <DiagnosisHeading totalQuestions={totalQuestions} />

      {resumeAvailable && pageStep === -1 && (
        <div className="alert alert-warning" role="status">
          <div className="row" style={{ gap: 10 }}>
            <span>작성 중이던 진단이 있습니다. 이어서 진행하시겠어요?</span>
            <div className="spacer" />
            <button className="btn btn-ghost btn-sm" onClick={startFresh}>
              새로 시작
            </button>
            <button className="btn btn-primary btn-sm" onClick={resume}>
              이어하기
            </button>
          </div>
        </div>
      )}

      <div
        className="progress"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="진단 진행률"
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 4 }}>
        <span className="muted" style={{ fontSize: "var(--font-caption)" }}>
          {pageStep === -1
            ? "시작 안내"
            : isReview
            ? "응답 검토"
            : `문항 ${pageStart}–${pageEnd} / ${totalQuestions} (${pageStep + 1}/${totalPages} 페이지)`}
        </span>
        {pageStep >= 0 && !isReview && (
          <span className="muted" style={{ fontSize: "var(--font-caption)" }}>
            약 {remainingMin}분 남음
          </span>
        )}
      </div>

      {warn && <div className="alert alert-warning">{warn}</div>}
      {submitError && <div className="alert alert-danger">{submitError}</div>}

      {pageStep === -1 ? (
        <div className="stack">
          <NoticeCard />
          <div className="card">
            <h2>진단 시작 전 확인 사항</h2>
            <p className="muted" style={{ marginTop: 0 }}>
              진단은 문항 답변만으로 점수와 추천 과정을 산출합니다. 상담에 필요한
              연락처와 조직 정보는 결과 확인 후 상담 신청 단계에서 입력합니다.
            </p>

            <label className={`option ${consent ? "selected" : ""}`}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>개인정보 보호 및 브라우저 임시 저장 안내를 확인했으며 진단을 시작합니다.</span>
            </label>
          </div>
        </div>
      ) : isReview ? (
        <div className="card">
          <h2>응답 검토</h2>
          <p className="muted" style={{ marginTop: 0 }}>
            제출 전 응답을 확인해 주세요. 수정할 문항은 수정 버튼을 눌러 다시 확인할 수 있습니다.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {questions.map((q, idx) => {
              const done = isAnswered(q, answers[q.no]);
              return (
                <li key={q.no} className="review-item">
                  <div style={{ minWidth: 0 }}>
                    <div className="muted" style={{ fontSize: "var(--font-caption)" }}>
                      {q.no}. {q.area}
                    </div>
                    <div style={{ fontWeight: 600 }}>{q.question}</div>
                    <div className={done ? "" : "review-missing"}>
                      → {answerLabel(q, answers[q.no])}
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setPageStep(Math.floor(idx / QUESTIONS_PER_PAGE));
                      scrollTop();
                    }}
                  >
                    수정
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : currentPage ? (
        <div className="stack">
          {currentPage.map((q) => (
            <QuestionCard
              key={q.no}
              question={q}
              value={answers[q.no]}
              invalid={missingQuestionNo === q.no}
              onChange={(v) => {
                setAnswers((a) => ({ ...a, [q.no]: v }));
                if (missingQuestionNo === q.no) {
                  setMissingQuestionNo(null);
                  setWarn(null);
                  setSubmitError(null);
                }
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="row step-actions">
        {pageStep > -1 && (
          <button className="btn btn-ghost" onClick={goPrev} disabled={submitting}>
            이전
          </button>
        )}
        <div className="spacer" />
        {isReview ? (
          <button className="btn btn-primary" onClick={submit} disabled={submitting}>
            {submitting ? "결과 분석 중…" : "제출하고 추천 교육 과정 보기"}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={goNext}>
            {pageStep === -1
              ? "진단 시작하기"
              : pageStep === totalPages - 1
              ? "응답 검토하기"
              : "다음"}
          </button>
        )}
      </div>

      {submitting && (
        <div className="submit-overlay" role="status" aria-live="polite">
          <div className="submit-box">
            <div className="spinner" aria-hidden />
            <strong>진단 결과를 분석하고 있습니다…</strong>
            <p className="muted" style={{ margin: 0 }}>
              점수 계산 → 유형 분류 → 교육 과정 매칭 → 리포트 작성
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
