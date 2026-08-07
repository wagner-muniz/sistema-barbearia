import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://barberdev.com"),
  title: "Barber Dev | Barbearia Premium em Vitória da Conquista",
  description:
    "Barbearia premium com agendamento online, cortes modernos, equipe especializada e atendimento exclusivo.",
  keywords: ["barbearia", "corte", "agendamento", "barber", "Vitória da Conquista"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Barber Dev | Barbearia Premium",
    description: "Sistema de agendamento moderno para barbearia premium.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
