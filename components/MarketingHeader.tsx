"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MarketingHeader() {
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={ref} className="site-header marketing-header">
      <div className="inner">
        <Link href="/" className="brand" aria-label="CX to AX 홈">
          <span className="brand-copy">
            <span className="brand-name">CX <span>to</span> AX</span>
            <span className="brand-tagline">고객경험에서 AI 전환으로</span>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="marketing-site-menu"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          id="marketing-site-menu"
          className={`nav-links${menuOpen ? " open" : ""}`}
          aria-label="사이트 메뉴"
        >
          <Link href="/#about" onClick={() => setMenuOpen(false)}>소개</Link>
          <Link href="/#expertise" onClick={() => setMenuOpen(false)}>전문분야</Link>
          <Link href="/#programs" onClick={() => setMenuOpen(false)}>교육 과정</Link>
          <Link href="/#insights" onClick={() => setMenuOpen(false)}>인사이트</Link>
          <Link href="/contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
            교육 상담
          </Link>
        </nav>
      </div>
    </header>
  );
}
