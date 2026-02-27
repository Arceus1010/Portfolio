import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Afnan Farid — Product Engineer",
    template: "%s — Afnan Farid",
  },
  description:
    "Product Engineer specializing in AI-powered enterprise systems. I design intelligent workflows and engineer them into production-ready React applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Afnan Farid",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        {/* WCAG 2.4.1 — Skip navigation link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:text-sm focus:font-medium focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          <PageWrapper>{children}</PageWrapper>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
