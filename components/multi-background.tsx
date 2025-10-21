"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const IMAGES = [
  "/images/covers/1.jpg",
  "/images/covers/2.jpg",
  "/images/covers/3.jpg",
  "/images/covers/4.jpg",
  "/images/covers/5.jpg",
  "/images/covers/6.jpg",
  "/images/covers/7.jpg",
  "/images/covers/8.jpg",
  "/images/covers/9.jpg",
  "/images/covers/10.jpg",
  "/images/covers/11.jpg",
  "/images/covers/12.jpg",
  "/images/covers/13.jpg",
  "/images/covers/14.jpg",
  "/images/covers/15.jpg",
  "/images/covers/16.jpg",
  "/images/covers/17.jpg",
  "/images/covers/18.jpg",
  "/images/covers/19.jpg",
  "/images/covers/20.jpg",
  "/images/covers/21.jpg",
];

const ROWS = 3;
const COLS = 7;
const TILES = ROWS * COLS;

function swapRandom<T>(arr: T[]): T[] {
  const a = Math.floor(Math.random() * arr.length);
  let b = Math.floor(Math.random() * arr.length);
  if (arr.length > 1)
    while (b === a) b = Math.floor(Math.random() * arr.length);
  const next = arr.slice();
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

export default function MultiBackground() {
  const initial = useMemo(() => Array.from({ length: TILES }, (_, i) => i), []);
  const [map, setMap] = useState<number[]>(initial);
  const rafRef = useRef<number | null>(null);

  // Randomize tile styles once on mount: either "grayscale" or "tint"
  const imageStyles = useMemo(() => {
    return Array.from(
      { length: TILES },
      () => (Math.random() < 0.4 ? "tint" : "grayscale") // 40% tinted, 60% grayscale
    );
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMap((m) => swapRandom(m)), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let t = 0;
    const loop = () => {
      t += 0.01;
      document.documentElement.style.setProperty(
        "--breath",
        String(1 + Math.sin(t) * 0.01)
      );
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0" style={{ filter: "blur(2px)" }}>
        {map.map((tileIndex, i) => {
          const r = Math.floor(tileIndex / COLS);
          const c = tileIndex % COLS;
          const top = (r * 100) / ROWS;
          const left = (c * 100) / COLS;
          const width = 100 / COLS;
          const height = 100 / ROWS;
          const img = IMAGES[i % IMAGES.length];

          const isTinted = imageStyles[i] === "tint";

          return (
            <div
              key={i}
              className="absolute will-change-transform"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${width}%`,
                height: `${height}%`,
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: isTinted ? "#cb804c" : undefined,
                backgroundBlendMode: isTinted ? "multiply" : "normal",
                filter: isTinted
                  ? "brightness(70%) contrast(110%)"
                  : "grayscale(100%) brightness(55%)",
                transition:
                  "top 900ms cubic-bezier(.22,.61,.36,1), left 900ms cubic-bezier(.22,.61,.36,1), transform 800ms cubic-bezier(.22,.61,.36,1)",
                transform: "scale(var(--breath,1)) translateZ(0)",
              }}
            />
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
