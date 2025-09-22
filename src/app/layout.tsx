import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Optimized font loading with preload and display swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload primary font
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: "Modern Dashboard",
  description: "A modern, commercial-grade dashboard application",
  keywords: ["dashboard", "analytics", "business intelligence", "modern", "responsive"],
  authors: [{ name: "Modern Dashboard Team" }],
  creator: "Modern Dashboard",
  publisher: "Modern Dashboard",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Modern Dashboard",
    description: "A modern, commercial-grade dashboard application",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: false, // Set to true in production
    follow: false, // Set to true in production
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <NextAuthProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </NextAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
