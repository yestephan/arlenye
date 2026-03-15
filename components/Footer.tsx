"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/40 py-8 text-center">
      <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
        <span>Arlen Ye</span>
        <span>·</span>
        <Link href="/contact" className="hover:text-foreground transition-colors">
          Contact
        </Link>
        <span>·</span>
        <ThemeToggle />
      </div>
    </footer>
  );
}
