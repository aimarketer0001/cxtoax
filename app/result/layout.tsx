import type { Metadata } from "next";
import ServiceHeader from "@/components/ServiceHeader";

export const metadata: Metadata = {
  title: "진단 결과",
  description: "AI·AX 역량 진단 결과와 추천 교육 과정을 확인합니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceHeader />
      {children}
    </>
  );
}
