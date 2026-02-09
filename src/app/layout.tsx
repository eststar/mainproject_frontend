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
  const themeInitializerScript = `
    (function() {
      try {
        const theme = localStorage.getItem('atelier_theme');
        const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = theme === 'dark' || (!theme && supportDarkMode);
        
        if (isDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.style.backgroundColor = '#0D0C12';
          document.documentElement.style.colorScheme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.backgroundColor = '#FAF9F6';
          document.documentElement.style.colorScheme = 'light';
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body
        className="min-h-screen selection:bg-black selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
