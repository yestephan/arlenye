import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Arlen Ye",
  description: "Watercolour paintings by Arlen Ye",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col max-w-6xl mx-auto px-4">
        <Nav />
        <main className="flex-1 mt-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
