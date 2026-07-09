import Link from "next/link";
import { redirect } from "next/navigation";
import AdminInquiryActions from "@/components/admin/AdminInquiryActions";
import { isAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  new: "신규",
  contacted: "연락 완료",
  proposed: "제안 진행",
  closed: "종료",
};

const SOURCE_LABELS: Record<string, string> = {
  landing: "홈 랜딩",
  microsite: "전략보고서",
  diagnosis: "진단 결과",
};

const STATUS_BADGES: Record<string, string> = {
  new: "badge badge-danger",
  contacted: "badge badge-accent",
  proposed: "badge badge-warning",
  closed: "badge badge-muted",
};

export default async function AdminInquiryDetailPage({
  params,
}: {
  params: Promise<{ inquiryId: string }>;
}) {
  if (!(await isAdminSession())) redirect("/admin/login");
  const { inquiryId } = await params;

  const inquiry = await prisma.consultationInquiry.findUnique({
    where: { id: inquiryId },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });

  if (!inquiry) {
    return (
      <div className="container">
        <div className="alert alert-danger">상담 신청을 찾을 수 없습니다.</div>
        <Link href="/admin/inquiries" className="btn btn-ghost">상담 목록으로</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <Link href="/admin/inquiries" className="nav-link">← 상담 목록</Link>
        <div className="spacer" />
        <span className="muted">{new Date(inquiry.createdAt).toLocaleString("ko-KR")}</span>
      </div>

      <div className="row" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>상담 신청 상세</h1>
        <div className="spacer" />
        <span className={STATUS_BADGES[inquiry.status] ?? "badge badge-muted"}>
          {STATUS_LABELS[inquiry.status] ?? inquiry.status}
        </span>
      </div>

      <div className="stack">
        <section className="card">
          <h2>신청자 정보</h2>
          <div className="grid-2">
            <p style={{ margin: 0 }}><strong>이름:</strong> {inquiry.name}</p>
            <p style={{ margin: 0 }}><strong>소속:</strong> {inquiry.org}</p>
            <p style={{ margin: 0 }}><strong>연락처:</strong> {inquiry.phone}</p>
            <p style={{ margin: 0 }}><strong>이메일:</strong> {inquiry.email || "-"}</p>
            <p style={{ margin: 0 }}><strong>유입:</strong> {SOURCE_LABELS[inquiry.source] ?? inquiry.source}</p>
            <p style={{ margin: 0 }}><strong>관심 주제:</strong> {inquiry.topic || "-"}</p>
            <p style={{ margin: 0 }}><strong>업종/조직:</strong> {inquiry.industry || "-"}</p>
            <p style={{ margin: 0 }}><strong>희망 일정:</strong> {inquiry.schedule || "-"}</p>
          </div>
        </section>

        <section className="card">
          <h2>문의 내용</h2>
          <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>{inquiry.message}</p>
        </section>

        <section className="card">
          <h2>빠른 연락</h2>
          <div className="row">
            {inquiry.email && (
              <a
                className="btn btn-primary"
                href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                  `[CX to AX 상담 회신] ${inquiry.topic || "교육 상담"}`
                )}`}
              >
                이메일 보내기
              </a>
            )}
            <a className="btn btn-ghost" href={`tel:${inquiry.phone}`}>
              전화 걸기
            </a>
          </div>
        </section>

        <AdminInquiryActions
          inquiryId={inquiry.id}
          initialStatus={inquiry.status}
          initialNotes={inquiry.notes.map((note) => ({
            id: note.id,
            note: note.note,
            createdAt: note.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
