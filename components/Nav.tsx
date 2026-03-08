"use client";

import Link from "next/link";
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
    <header className="text-center pt-8 pb-4">
      <Link href="/" className="inline-block text-2xl font-bold tracking-tight mb-6">
        A′
      </Link>

      {/* Desktop nav */}
      <nav className="hidden sm:flex justify-center gap-8 text-sm">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`tracking-wide transition-colors ${
              pathname === href
                ? "border-b border-black"
                : "text-gray-500 hover:text-black"
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
          className="text-sm text-gray-500 tracking-wide"
        >
          Menu
        </button>
        {menuOpen && (
          <div className="flex flex-col items-center gap-4 mt-4 pb-4 border-b">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm tracking-wide ${
                  pathname === href ? "font-medium" : "text-gray-500"
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
