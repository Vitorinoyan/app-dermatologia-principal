import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DermAI - Inteligência Artificial para Dermatologia",
  description: "Aplicativo médico para diagnóstico dermatológico com IA avançada. Análise de lesões cutâneas e consulta de doenças dermatológicas para profissionais da saúde.",
  keywords: "dermatologia, inteligência artificial, diagnóstico médico, lesões cutâneas, medicina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}