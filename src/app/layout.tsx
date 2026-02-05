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
   const themeInitializerScript =  `
                                    (function() {
                                        try {
                                        // 2026년 기준으로는 const가 훨씬 깔끔하고 표준입니다.
                                        const theme = localStorage.getItem('atelier_theme');
                                        const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                        
                                        if (theme === 'dark' || (!theme && supportDarkMode)) {
                                            document.documentElement.classList.add('dark');
                                        } else {
                                            document.documentElement.classList.remove('dark');
                                        }
                                        } catch (e) {
                                        console.error('Theme initialization failed:', e);
                                        }
                                    })();
                                    `;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body
        className="min-h-screen bg-[#FAF9F6] text-[#121212] selection:bg-black selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
