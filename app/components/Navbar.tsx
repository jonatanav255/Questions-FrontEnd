"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-800 bg-gray-900" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white" aria-label="Home - Questions App">
            Questions App
          </Link>
          <div className="flex gap-6" role="navigation" aria-label="Primary">
            <Link
              href="/questions"
              className={`font-medium transition-colors pb-1 border-b-2 ${
                pathname.startsWith("/questions")
                  ? "text-white border-white"
                  : "text-gray-300 hover:text-white border-transparent"
              }`}
              aria-current={pathname.startsWith("/questions") ? "page" : undefined}
            >
              List of Questions
            </Link>
            <Link
              href="/practice"
              className={`font-medium transition-colors pb-1 border-b-2 ${
                pathname.startsWith("/practice")
                  ? "text-white border-white"
                  : "text-gray-300 hover:text-white border-transparent"
              }`}
              aria-current={pathname.startsWith("/practice") ? "page" : undefined}
            >
              Practice
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
