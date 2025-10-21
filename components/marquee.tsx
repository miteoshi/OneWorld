"use client";

import { useEffect, useRef } from "react";

export function Marquee({ text = "ONE WORLD — " }: { text?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Animate from 0% to -100% so it loops seamlessly with the duplicate
    const keyframes = [
      { transform: "translateX(0%)" },
      { transform: "translateX(-100%)" },
    ];

    const anim = el.animate(keyframes, {
      duration: 32000, // Doubled since we're moving twice the distance
      iterations: Number.POSITIVE_INFINITY,
      easing: "linear",
    });

    const onEnter = () => (anim.playbackRate = 1.8);
    const onLeave = () => (anim.playbackRate = 1);

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      anim.cancel();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-label="Marquee"
      className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-white/10"
    >
      <div className="overflow-hidden py-3">
        <div ref={trackRef} className="flex whitespace-nowrap">
          <span className="px-2 text-xs md:text-sm tracking-widest">
            {text.repeat(20)}
          </span>
          <span className="px-2 text-xs md:text-sm tracking-widest">
            {text.repeat(20)}
          </span>
        </div>
      </div>
    </div>
  );
}
