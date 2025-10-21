"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function MusicNavbar({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [q, setQ] = useState(value)

  useEffect(() => setQ(value), [value])

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <Image
          src="/images/oneworld/logo-navbar.png"
          alt="ONEWORLD"
          width={36}
          height={24}
          className="h-7 w-auto md:h-9"
        />
        <span className="font-extrabold tracking-tight text-lg md:text-xl">ONEWORLD</span>

        <div className="ml-auto w-full max-w-lg">
          <label className="sr-only" htmlFor="music-search">
            Search artists
          </label>
          <input
            id="music-search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              onChange(e.target.value)
            }}
            placeholder="Search artists or descriptions…"
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>
    </header>
  )
}
