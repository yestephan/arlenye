import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Arlen Ye",
  description: "Watercolour paintings by Arlen Ye",
  openGraph: {
    title: "Arlen Ye",
    description: "Watercolour paintings by Arlen Ye",
    url: "https://arlenye.com",
    siteName: "Arlen Ye",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arlen Ye",
    description: "Watercolour paintings by Arlen Ye",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", dmSans.variable)} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col max-w-6xl mx-auto px-4">
        <ThemeProvider>
          <Nav />
          <main className="flex-1 mt-8">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
