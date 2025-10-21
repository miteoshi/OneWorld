"use client"

import type React from "react"

import { useMemo, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  text: string
  className?: string
}

export default function InteractiveTitle({ text, className }: Props) {
  // Choose a restrained accent palette (black/white + warm accent)
  const accent = useMemo(() => "#ad561a", []) // warm tan shadow
  const outline = useMemo(() => "#fefefefe", [])




  return (
    <div

     
      className={cn("relative w-full", className)}
    >
      {/* BACK: tan, larger, offset upward */}
      <h1
        aria-hidden
        className="pointer-events-none select-none text-balance font-black uppercase leading-none"
        style={{
          fontSize: "clamp(3rem, 8vw, 8rem)",
          color: accent,
          WebkitTextStroke: `2px ${outline}`,
          transform: "translateY(-12%) scale(1.12)",
          opacity: 0.6,
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </h1>

      {/* FRONT: black fill with white stroke (primary wordmark) */}
      <h1
        className="relative -mt-[calc(clamp(3rem,8vw,8rem))] text-balance font-black uppercase leading-none"
        style={{
          fontSize: "clamp(3rem, 8vw, 8rem)",
          letterSpacing: "-0.02em",
          WebkitTextStroke: `2px ${outline}`,
          color: "#171717",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
        }}
      >
        {text}
      </h1>
    </div>
  )
}
