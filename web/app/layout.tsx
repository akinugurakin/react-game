import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMO - MEB Müfredatına Uygun Eğitsel Oyun Platformu",
  description: "1-8. sınıf öğrencileri için Matematik, Fen Bilimleri ve Sosyal Bilgiler derslerinde oyunlaştırılmış öğrenme deneyimi.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
