import ServiceHeader from "@/components/ServiceHeader";

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
