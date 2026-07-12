"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const floatingGroups = [
  {
    href: "#overview",
    label: "전략 개요",
    id: "overview",
    children: [
      { href: "#key-insights", label: "핵심 인사이트", id: "key-insights" },
      { href: "#evidence", label: "근거 기준", id: "evidence" },
      { href: "#strategy-framework", label: "전략 프레임", id: "strategy-framework" },
    ],
  },
  {
    href: "#campaign-roadmap",
    label: "실행 계획",
    id: "execution-plan",
    children: [
      { href: "#campaign-roadmap", label: "캠페인 로드맵", id: "campaign-roadmap" },
      { href: "#channels", label: "채널별 역할", id: "channels" },
      { href: "#ai-tools", label: "AI 활용 도구", id: "ai-tools" },
      { href: "#kpi-risk", label: "KPI·리스크", id: "kpi-risk" },
    ],
  },
  {
    href: "#workshop",
    label: "실행 워크숍",
    id: "workshop",
    children: [
      { href: "#checklist", label: "체크리스트", id: "checklist" },
    ],
  },
];

const floatingLinks = floatingGroups.flatMap((group) => [
  { href: group.href, label: group.label, id: group.id },
  ...group.children,
]);

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
  const [activeId, setActiveId] = useState(floatingLinks[0].id);

  useEffect(() => {
    const syncActiveSectionFromHash = () => {
      const hashId = window.location.hash.replace("#", "");

      if (floatingLinks.some((item) => item.id === hashId)) {
        setActiveId(hashId);
      }
    };

    syncActiveSectionFromHash();
    window.addEventListener("hashchange", syncActiveSectionFromHash);
    return () => window.removeEventListener("hashchange", syncActiveSectionFromHash);
  }, []);

  useEffect(() => {
    const targets = floatingLinks
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
            {floatingGroups.map((group) => {
              const groupActive =
                activeId === group.id ||
                group.children.some((child) => child.id === activeId);

              return (
                <li
                  key={group.id}
                  className={groupActive ? "is-expanded" : undefined}
                >
                  <a
                    href={group.href}
                    className={groupActive ? "is-active" : undefined}
                    aria-current={activeId === group.id ? "location" : undefined}
                    onClick={() => setActiveId(group.id)}
                  >
                    <span>{group.label}</span>
                    <i aria-hidden="true" />
                  </a>
                  <ul className="floating-menu-sublist">
                    {group.children.map((child) => {
                      const childActive = activeId === child.id;

                      return (
                        <li key={child.id}>
                          <a
                            href={child.href}
                            className={childActive ? "is-active" : undefined}
                            aria-current={childActive ? "location" : undefined}
                            onClick={() => setActiveId(child.id)}
                          >
                            <span>{child.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
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
