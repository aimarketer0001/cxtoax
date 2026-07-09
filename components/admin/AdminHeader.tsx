import Link from "next/link";
import { isAdminSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function AdminHeader() {
  const signedIn = await isAdminSession();

  return (
    <header className="site-header admin-header">
      <div className="inner">
        <Link href={signedIn ? "/admin" : "/admin/login"} className="brand">
          CX <span>to</span> AX Admin
        </Link>
        {signedIn ? (
          <nav className="nav-links" aria-label="관리자 메뉴">
            <Link href="/admin">진단 응답</Link>
            <Link href="/admin/inquiries">교육상담</Link>
            <Link href="/" target="_blank">
              사이트 보기
            </Link>
            <LogoutButton />
          </nav>
        ) : (
          <nav className="nav-links" aria-label="관리자 보조 메뉴">
            <Link href="/">사이트로 돌아가기</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
