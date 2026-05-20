import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/providers/store-provider";
import { Toaster } from "sonner";
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
  title: "Operiva — Plataforma Operacional Visual para Empresas de Serviço",
  description:
    "A camada operacional que faltava na sua empresa. Seu ERP controla números; a Operiva organiza a operação com etapas visuais, portal do cliente e copiloto operacional. Menos caos. Mais clareza.",
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
        <StoreProvider>
          {children}
          <Toaster theme="dark" position="bottom-right" richColors />
        </StoreProvider>
      </body>
    </html>
  );
}
