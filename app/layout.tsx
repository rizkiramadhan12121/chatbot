import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatBotKyy - Advanced AI Assistant",
  description: "AI Assistant canggih dengan teknologi Gemini dan Claude AI, desain cyber modern yang menarik",
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00D4FF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#075E54" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ErrorBoundary>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(17, 17, 17, 0.9)',
                color: '#E5E5E5',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                backdropFilter: 'blur(20px)',
              },
              success: {
                iconTheme: {
                  primary: '#00D4FF',
                  secondary: '#0A0A0A',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#0A0A0A',
                },
              },
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
