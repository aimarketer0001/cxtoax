import ServiceHeader from "@/components/ServiceHeader";

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
