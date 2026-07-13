"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function MarketingHeader() {
  const ref = useRef<HTMLElement>(null);

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
        <Link href="/" className="brand">
          CX <span>to</span> AX
        </Link>
        <nav className="nav-links" aria-label="사이트 메뉴">
          <Link href="/profile">소개</Link>
          <Link href="/portfolio">프로젝트</Link>
          <Link href="/courses">교육 과정</Link>
          <Link href="/insights">인사이트</Link>
          <Link href="/contact" className="nav-cta">
            교육 상담 문의하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
