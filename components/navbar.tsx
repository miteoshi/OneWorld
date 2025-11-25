"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(value || "");

  useEffect(() => {
    if (value !== undefined) {
      setQ(value);
    }
  }, [value]);

  const showSearch = value !== undefined && onChange !== undefined;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="mt-4 relative">
          <div className="rounded-full border border-white/10 bg-black/70 backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-2">
              <Link
                href="/"
                aria-label="ONEWORLD - Home"
                className="group flex items-center gap-3 text-sm font-semibold tracking-wider uppercase"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/logos/logo.png"
                  alt="ONEWORLD logo"
                  className="h-8 w-auto md:h-8"
                  priority
                />
                <span
               
                  className={`group-hover:opacity-80 ${
                    showSearch ? "hidden md:inline" : ""
                  }`}
                >
                  SYRCLE
                </span>
              </Link>

              {!showSearch && (
                <div>
                  <button
                    className="md:hidden text-sm px-3 py-2 rounded border border-white/10 hover:bg-white/5"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                  >
                    Menu
                  </button>

                  <ul className="hidden md:flex items-center gap-6 text-sm">
                    <li>
                      <Link href="#vision" className="hover:opacity-80">
                        Vision
                      </Link>
                    </li>
                    <li>
                      <Link href="#intro" className="hover:opacity-80">
                        Introduction
                      </Link>
                    </li>
                    <li>
                      <Link href="#whatwedo" className="hover:opacity-80">
                        What We Do
                      </Link>
                    </li>
                    <li>
                      <Link href="#contact" className="hover:opacity-80">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {showSearch && (
                <div className="flex-1 ml-3 md:ml-4">
                  <label className="sr-only" htmlFor="music-search">
                    Search artists
                  </label>
                  <input
                    id="music-search"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      onChange?.(e.target.value);
                    }}
                    placeholder="Search…"
                    className="w-full rounded-full bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
              )}
            </div>
          </div>

          {!showSearch && (
            <ul
              className={`md:hidden absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-white/10 bg-black/90 backdrop-blur-md px-4 py-3 text-sm space-y-2 ${
                open ? "block" : "hidden"
              }`}
            >
              <li>
                <Link href="#vision" onClick={() => setOpen(false)}>
                  Vision
                </Link>
              </li>
              <li>
                <Link href="#intro" onClick={() => setOpen(false)}>
                  Introduction
                </Link>
              </li>
              <li>
                <Link href="#whatwedo" onClick={() => setOpen(false)}>
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="#contact" onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
