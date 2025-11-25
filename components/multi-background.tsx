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

// choose rows & cols based on viewport width
function getLayout(width: number) {
  if (width < 640) {
    // mobile
    const rows = 2;
    const cols = 3;
    return { rows, cols, tiles: rows * cols };
  } else if (width < 1024) {
    // tablet / small laptop
    const rows = 3;
    const cols = 4;
    return { rows, cols, tiles: rows * cols };
  } else {
    // desktop - your original 3x7
    const rows = 3;
    const cols = 7;
    return { rows, cols, tiles: rows * cols };
  }
}

function swapRandom<T>(arr: T[]): T[] {
  if (arr.length < 2) return arr;
  const a = Math.floor(Math.random() * arr.length);
  let b = Math.floor(Math.random() * arr.length);
  while (b === a) b = Math.floor(Math.random() * arr.length);
  const next = arr.slice();
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

export default function MultiBackground() {
  // start with desktop layout as a safe default
  const [layout, setLayout] = useState(() => {
    const rows = 3;
    const cols = 7;
    return { rows, cols, tiles: rows * cols };
  });

  const { rows, cols, tiles } = layout;

  // map is the tileIndex permutation that controls the top/left shuffle
  const [map, setMap] = useState<number[]>(() =>
    Array.from({ length: tiles }, (_, i) => i)
  );

  const rafRef = useRef<number | null>(null);

  // Randomize tile styles once per layout (either "grayscale" or "tint")
  const imageStyles = useMemo(
    () =>
      Array.from(
        { length: tiles },
        () =>
          (Math.random() < 0.4 ? "tint" : "grayscale") as "tint" | "grayscale"
      ),
    [tiles]
  );

  // When layout (tile count) changes, adjust map size & contents
  useEffect(() => {
    setMap((prev) => {
      const next = Array.from({ length: tiles }, (_, i) => prev[i] ?? i);
      // ensure indices are within range [0, tiles-1]
      return next.map((v) => (v < tiles ? v : v % tiles));
    });
  }, [tiles]);

  // Shuffle map periodically (keeps your top/left animation behavior)
  useEffect(() => {
    const id = setInterval(() => setMap((m) => swapRandom(m)), 4500);
    return () => clearInterval(id);
  }, []);

  // Breathing animation
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

  // Update layout when screen resizes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      const next = getLayout(width);
      setLayout((prev) =>
        prev.rows === next.rows && prev.cols === next.cols ? prev : next
      );
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0" style={{ filter: "blur(2px)" }}>
        {map.map((tileIndex, i) => {
          const r = Math.floor(tileIndex / cols);
          const c = tileIndex % cols;
          const top = (r * 100) / rows;
          const left = (c * 100) / cols;
          const width = 100 / cols;
          const height = 100 / rows;
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
