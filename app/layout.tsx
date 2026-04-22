import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for a more premium, tech-focused look
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { InkCursor } from "@/components/ui/ink-cursor";
import ThemeAwareParticles from "@/components/ui/ThemeAwareParticles";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zishan Khan | Creative Developer",
    template: "%s | Zishan Khan",
  },
  description: "A creative developer specializing in 3D web experiences, modern UI/UX, and scalable frontend architecture.",
  keywords: ["Creative Developer", "Frontend Engineer", "React", "Next.js", "Three.js", "Portfolio"],
  authors: [{ name: "Zishan Khan" }],
  creator: "Zishan Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zishan-portfolio.vercel.app",
    title: "Zishan Khan | Creative Developer",
    description: "Building immersive digital experiences.",
    siteName: "Zishan Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zishan Khan | Creative Developer",
    description: "Building immersive digital experiences.",
    creator: "@johndoe",
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
        className={`${inter.variable} antialiased min-h-screen flex flex-col transition-colors duration-300 dark:bg-transparent`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
