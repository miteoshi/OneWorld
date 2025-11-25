"use client";

import type React from "react";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

export default function InteractiveTitle({ text, className }: Props) {
  const accent = useMemo(() => "#ad561a", []); // warm tan shadow
  const outline = useMemo(() => "#fefefefe", []);

  return (
    <div className={cn("relative w-full", className)}>
      {/* BACK: tan, larger, offset upward */}
      <h1
        aria-hidden
        className={cn(
          "pointer-events-none select-none text-balance uppercase leading-none",
          // responsive sizes (back layer)
          "text-[5rem] sm:text-[7rem] lg:text-[9rem] xl:text-[11rem]"
        )}
        style={{
          fontFamily: "var(--font-syrcle)",
          color: accent,
          WebkitTextStroke: `1px ${outline}`,
          transform: "translateY(-5%) scale(1.12)",
          opacity: 0.6,
        }}
      >
        {text}
      </h1>

      {/* FRONT: main wordmark */}
      <h1
        className={cn(
          "relative text-balance uppercase leading-none",
          // overlap the back layer (em so it scales with font size)
          "-mt-[1.6em]",
          // responsive sizes (front layer - slightly bigger)
          "text-[6rem] sm:text-[8rem] lg:text-[10rem] xl:text-[12rem]"
        )}
        style={{
          fontFamily: "var(--font-syrcle)",
          WebkitTextStroke: `1px ${outline}`,
          color: "rgb(19, 19, 19)",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
        }}
      >
        {text}
      </h1>
    </div>
  );
}
  