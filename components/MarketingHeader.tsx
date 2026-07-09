import Link from "next/link";

export default function MarketingHeader() {
  return (
    <header className="site-header marketing-header">
      <div className="inner">
        <Link href="/" className="brand">
          CX <span>to</span> AX
        </Link>
        <nav className="nav-links" aria-label="사이트 메뉴">
          <Link href="/#about">소개</Link>
          <Link href="/#expertise">전문분야</Link>
          <Link href="/#programs">강의프로그램</Link>
          <Link href="/#insights">인사이트</Link>
          <Link href="/#contact" className="nav-cta">
            문의하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
