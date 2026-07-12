import type { Metadata } from "next";
import ServiceHeader from "@/components/ServiceHeader";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI·AX 역량 진단",
  description:
    "AI 이해도, 디지털 활용 역량, 업무 적용 역량을 진단하고 적합한 AI·AX 교육 과정을 추천받을 수 있습니다.",
  alternates: {
    canonical: absoluteUrl("/diagnosis"),
  },
  openGraph: {
    title: "AI·AX 역량 진단",
    description:
      "현재 역량을 확인하고 조직과 개인에게 맞는 AI·AX 실무 교육 과정을 추천받으세요.",
    url: absoluteUrl("/diagnosis"),
  },
};

export default function DiagnosisLayout({
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
