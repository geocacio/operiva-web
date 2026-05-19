import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/providers/store-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Operiva — Plataforma Operacional Visual em Tempo Real",
  description:
    "Organize sua operação com etapas visuais, atualizações em tempo real, fotos, aprovações e acompanhamento do cliente. Menos ligações, mais controle — para funilarias, obras, assistências e serviços operacionais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
