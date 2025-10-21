"use client";

import { useEffect, useState, useRef } from "react";
import ArtistCard from "./artist-card";
import Navbar from "./navbar";

const PAGE_SIZE = 12;

export default function ArtistList() {
  const [artists, setArtists] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const firstLoad = useRef(true); // prevent first-load jump

  // Fetch artists from API
  async function fetchArtists(reset = false) {
    if (loading) return; // prevent overlapping fetches
    setLoading(true);

    const currentPage = reset ? 0 : page;
    const res = await fetch(
      `/api/artists?page=${currentPage}&limit=${PAGE_SIZE}&query=${encodeURIComponent(
        query
      )}`
    );
    const json = await res.json();

    if (reset) {
      setArtists(json.data);
      setPage(1);

      // Smooth scroll to top on first load / search reset
      window.scrollTo({ top: 0, behavior: "smooth" });

      firstLoad.current = false; // mark first load done
    } else {
      // Deduplicate to prevent duplicates
      setArtists((prev) => [
        ...prev,
        ...json.data.filter((a: any) => !prev.some((p) => p.id === a.id)),
      ]);
      setPage((prev) => prev + 1);
    }

    setHasMore(json.data.length === PAGE_SIZE);
    setLoading(false);
  }

  // Fetch first page on mount or when query changes
  useEffect(() => {
    setPage(0);
    setArtists([]);
    setHasMore(true);
    firstLoad.current = true; // reset first-load guard
    fetchArtists(true);
  }, [query]);

  // Infinite scroll
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          // skip auto-trigger on first load
          if (firstLoad.current) {
            firstLoad.current = false;
            return;
          }
          fetchArtists();
        }
      },
      { rootMargin: "400px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [hasMore, loading]);

  return (
    <>
      <Navbar value={query} onChange={setQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {artists.map((a) => (
          <ArtistCard
            key={a.id}
            artist={{
              id: a.id,
              name: a.name,
              description: a.description,
              image:
                a.image_url ||
                "https://lnvzabtynzmdwsnasvfv.supabase.co/storage/v1/object/public/images/artist_placeholder.jpg",
              audio: a.audio_url,
              spotify: a.spotify_url,
            }}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />
      {loading && (
        <p className="mt-4 text-center text-sm opacity-70">Loading more…</p>
      )}
      {!hasMore && !loading && (
        <p className="mt-4 text-center text-sm opacity-50">End of results</p>
      )}
    </>
  );
}
