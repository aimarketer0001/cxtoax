import Link from "next/link";

export default function ServiceHeader() {
  return (
    <header className="site-header service-header">
      <div className="inner">
        <Link href="/" className="brand">
          CX <span>to</span> AX
        </Link>
        <nav className="nav-links" aria-label="서비스 이동">
          <Link href="/diagnosis">역량 진단</Link>
          <Link href="/#programs" className="nav-program-link">
            강의 보기
          </Link>
          <Link href="/#contact" className="nav-cta">
            상담 문의
          </Link>
        </nav>
      </div>
    </header>
  );
}
