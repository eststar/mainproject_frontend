import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "의류 추천 시스템"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className="min-h-screen bg-[#FAF9F6] text-[#121212] selection:bg-black selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
