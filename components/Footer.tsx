import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t py-8 text-center text-sm text-gray-500">
      <p>Arlen Ye • 2025</p>
      <Link href="/contact" className="underline underline-offset-2 hover:text-black transition-colors">
        Contact
      </Link>
    </footer>
  );
}
