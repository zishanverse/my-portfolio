import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for a more premium, tech-focused look
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { InkCursor } from "@/components/ui/ink-cursor";
import ThemeAwareParticles from "@/components/ui/ThemeAwareParticles";
import { SmoothScrolling } from "@/components/providers/SmoothScrolling";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zishan Khan | Backend & AI Systems Engineer",
    template: "%s | Zishan Khan",
  },
  description: "Backend and AI Systems Engineer specializing in autonomous multi-agent runtimes, real-time Voice AI telephony pipelines, and high-throughput vector search infrastructure.",
  keywords: [
    "Backend Engineer",
    "AI Systems Engineer",
    "Voice AI",
    "Telephony",
    "Multi-Agent Systems",
    "LangGraph",
    "pgvector",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Distributed Systems"
  ],
  authors: [{ name: "Zishan Khan" }],
  creator: "Zishan Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zishan-portfolio.vercel.app",
    title: "Zishan Khan | Backend & AI Systems Engineer",
    description: "Building production multi-agent runtimes, real-time voice telephony, and resilient backend systems.",
    siteName: "Zishan Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zishan Khan | Backend & AI Systems Engineer",
    description: "Building production multi-agent runtimes, real-time voice telephony, and resilient backend systems.",
    creator: "@zishanverse",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased min-h-screen flex flex-col transition-colors duration-300 dark:bg-transparent`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrolling>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:px-4 focus:py-2 focus:rounded-md focus:bg-background focus:text-foreground focus:border focus:border-border"
            >
              Skip to main content
            </a>
            <div className="fixed inset-0 z-[-1] pointer-events-none">
              <ThemeAwareParticles />
            </div>
            <InkCursor />
            <Navbar />
            <main id="main-content" className="grow pt-20">
              {children}
            </main>
            <Footer />
          </SmoothScrolling>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
