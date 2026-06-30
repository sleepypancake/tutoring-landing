import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Репетитор по русскому языку для начальных классов | Грамотность, чтение, почерк",
  description: "Помогаю детям писать грамотно, читать с пониманием и улучшить почерк. Занятия в ЖК «Родные просторы». Результат уже через 2–3 месяца без стресса.",
  keywords: ["репетитор начальные классы", "коррекция письма", "чтение для детей", "чистописание", "подготовка к школе"],
  openGraph: {
    title: "Репетитор по русскому языку для начальных классов",
    description: "Помогаю детям писать грамотно и читать с пониманием. Результат через 2–3 месяца.",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.ru",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.45)', padding: '28px 0', textAlign: 'center', fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}>
          © {new Date().getFullYear()}. Все права защищены.
        </footer>
      </body>
    </html>
  );
}
