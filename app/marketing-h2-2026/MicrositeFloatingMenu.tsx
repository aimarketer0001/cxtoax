"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const floatingItems = [
  { href: "#overview", label: "전략 개요", id: "overview" },
  { href: "#key-insights", label: "핵심 인사이트", id: "key-insights" },
  { href: "#campaign-roadmap", label: "실행 계획", id: "campaign-roadmap" },
  { href: "#channels", label: "채널별 역할", id: "channels" },
  { href: "#kpi-risk", label: "KPI·리스크", id: "kpi-risk" },
  { href: "#workshop", label: "실습 워크숍", id: "workshop" },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5h16v11H4z" />
      <path d="m4 7 8 6 8-6" />
      <path d="M8.3 12.1 4 17.5" />
      <path d="m15.7 12.1 4.3 5.4" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5h7l3 3v12H7z" />
      <path d="M14 4.5v3h3" />
      <path d="M9.5 11h5" />
      <path d="M9.5 14h3.5" />
      <circle cx="17" cy="17" r="3" />
      <path d="m15.4 17 1.1 1.1 2-2.1" />
    </svg>
  );
}

export default function MicrositeFloatingMenu() {
  const [activeId, setActiveId] = useState(floatingItems[0].id);

  useEffect(() => {
    const syncActiveSectionFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (floatingItems.some((item) => item.id === hashId)) {
        setActiveId(hashId);
      }
    };

    syncActiveSectionFromHash();
    window.addEventListener("hashchange", syncActiveSectionFromHash);
    return () => window.removeEventListener("hashchange", syncActiveSectionFromHash);
  }, []);

  useEffect(() => {
    const targets = floatingItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.12, 0.28, 0.5],
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="floating-menu" aria-label="전략 보고서 바로가기">
      <div className="floating-menu-nav-shell">
        <nav className="floating-menu-panel" aria-label="보고서 섹션">
          <span className="floating-menu-title">바로가기:</span>
          <ul className="floating-menu-groups">
            {floatingItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={isActive ? "is-active" : undefined}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span>{item.label}</span>
                    <i aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="floating-actions">
        <a href="#report-contact" aria-label="교육 상담 문의">
          <span>교육 상담 문의하기</span>
          <MailIcon />
        </a>
        <Link href="/#about" aria-label="강사 프로필">
          <span>강사 프로필</span>
          <ProfileIcon />
        </Link>
      </div>
    </aside>
  );
}
