import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit as requested/planned for modern look
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "jishan khan | Creative Developer",
    template: "%s | jishan khan",
  },
  description: "A creative developer specializing in 3D web experiences, modern UI/UX, and scalable frontend architecture.",
  keywords: ["Creative Developer", "Frontend Engineer", "React", "Next.js", "Three.js", "Portfolio"],
  authors: [{ name: "jishan khan" }],
  creator: "jishan khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.example.com",
    title: "jishan khan | Creative Developer",
    description: "Building immersive digital experiences.",
    siteName: "jishan khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "jishan khan | Creative Developer",
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
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
