"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="text-center pt-10 pb-6 border-b border-border/40">
      <Link href="/" className="inline-block mb-7">
        <Image src="/logo.png" alt="Arlen Ye" height={48} width={48} priority />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden sm:flex justify-center items-center gap-10 text-xs">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`uppercase tracking-widest transition-colors ${
              pathname === href
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile nav */}
      <div className="sm:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xs uppercase tracking-widest text-muted-foreground"
        >
          Menu
        </button>
        {menuOpen && (
          <div className="flex flex-col items-center gap-5 mt-5 pb-5">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-xs uppercase tracking-widest ${
                  pathname === href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
