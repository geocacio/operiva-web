import { StoreProvider } from "@/providers/store-provider";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
