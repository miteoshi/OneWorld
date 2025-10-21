"use client";

import { useEffect, useRef, useState } from "react";

export type Artist = {
  id: string;
  name: string;
  description: string;
  image: string;
  audio?: string;
  spotify?: string;
};

export default function ArtistCard({ artist }: { artist: Artist }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect small screen width
  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Lazy load image
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      onClick={() =>
        window.open(artist.spotify, "_blank", "noopener,noreferrer")
      }
      className="group relative isolate cursor-pointer"
    >
      {/* base card */}
      <div className="rounded-lg bg-black ring-1 ring-white/10 overflow-hidden relative z-10">
        <figure
          onMouseEnter={() => {
            if (isSmallScreen) return; // disable on small screens
            const a = audioRef.current;
            if (a) {
              if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
                fadeIntervalRef.current = null;
              }
              a.volume = 1;
              a.currentTime = 0;
              a.play().catch(() => {});
            }
          }}
          onMouseLeave={() => {
            if (isSmallScreen) return; // disable on small screens
            const a = audioRef.current;
            if (a) {
              if (fadeIntervalRef.current)
                clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = setInterval(() => {
                if (!a) return;
                if (a.volume > 0.05) {
                  a.volume = Math.max(0, a.volume - 0.05);
                } else {
                  a.volume = 0;
                  a.pause();
                  if (fadeIntervalRef.current) {
                    clearInterval(fadeIntervalRef.current);
                    fadeIntervalRef.current = null;
                  }
                }
              }, 25);
            }
          }}
        >
          {visible ? (
            <img
              ref={imgRef}
              src={
                artist.image ||
                "https://lnvzabtynzmdwsnasvfv.supabase.co/storage/v1/object/public/images/artist_placeholder.jpg"
              }
              alt={artist.name}
              className="h-56 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-56 w-full bg-white/5" ref={imgRef as any} />
          )}
        </figure>

        <div className="p-3">
          <h3 className="font-semibold">{artist.name}</h3>
          <p className="mt-1 text-sm opacity-80 line-clamp-3">
            {artist.description}
          </p>
        </div>
      </div>

      {/* hover gradient */}
      <div
        aria-hidden
        className={`absolute -inset-1 rounded-[12px] transition duration-250 pointer-events-none ${
          isSmallScreen ? "opacity-0" : "opacity-0 group-hover:opacity-20"
        }`}
      >
        <div className="absolute inset-0 rounded-[12px] blur-md mix-blend-screen bg-[conic-gradient(at_50%_50%,#ad561a_0%,#ffffff_20%,#ad561a_40%,#8b4513_60%,#ad561a_80%,#ffffff_100%)]" />
      </div>

      <audio
        ref={audioRef}
        src={artist.audio || "/audio/default.mp3"}
        preload="none"
        className="hidden"
      />
    </div>
  );
}
