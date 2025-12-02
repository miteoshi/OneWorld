"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="mt-4 relative">
          <div className="rounded-full border border-white/10 bg-black/70 backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-2">
              <Link
                href="/"
                aria-label="ONEWORLD - Home"
                className="font-unbounded group flex items-center gap-3 text-sm  tracking-wider uppercase"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/logos/logo.png"
                  alt="ONEWORLD logo"
                  className="h-8 w-auto md:h-8"
                  priority
                />
                <span className="group-hover:opacity-80">SYRCLE</span>
              </Link>

              {/* The ONLY link – same style as old options */}
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    href="#"
                    className="font-unbounded hover:opacity-80 tracking-wider uppercase"
                  >
                    syrcle.space
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
