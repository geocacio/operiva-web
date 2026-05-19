export default function PortalGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#0B0F19] text-[#F9FAFB] antialiased">
      {children}
    </div>
  );
}
