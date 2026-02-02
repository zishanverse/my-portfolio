import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit as requested/planned for modern look
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
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
    url: "https://portfolio.example.com",
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
        className={`${outfit.variable} antialiased min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
