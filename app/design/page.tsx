"use client";

import { useState, useEffect, useRef } from "react";
import JerseyCard from "@/components/jersey-card";
import JerseyModal from "@/components/jersey-modal";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Marquee } from "@/components/marquee";

interface Jersey {
  id: number;
  name: string;
  price: number;
  color: string;
  material: string;
  description: string;
  image: string;
}

const PAGE_SIZE = 12;

export default function DesignPage() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedJersey, setSelectedJersey] = useState<Jersey | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const firstLoad = useRef(true);

  async function fetchJerseys(reset = false) {
    if (loading) return;
    setLoading(true);

    const currentPage = reset ? 0 : page;
    const res = await fetch(
      `/api/jerseys?page=${currentPage}&limit=${PAGE_SIZE}&query=${encodeURIComponent(
        query
      )}`
    );
    const json = await res.json();
    console.log(json)
    if (reset) {
      setJerseys(json.data);
      setPage(1);

      // Smooth scroll to top on search reset
      window.scrollTo({ top: 0, behavior: "smooth" });

      firstLoad.current = false;
    } else {
      setJerseys((prev) => [
        ...prev,
        ...json.data.filter((j: Jersey) => !prev.some((p) => p.id === j.id)),
      ]);
      setPage((prev) => prev + 1);
    }

    setHasMore(json.data.length === PAGE_SIZE);
    setLoading(false);
  }

  useEffect(() => {
    setPage(0);
    setJerseys([]);
    setHasMore(true);
    firstLoad.current = true;
    fetchJerseys(true);
  }, [query]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          if (firstLoad.current) {
            firstLoad.current = false;
            return;
          }
          fetchJerseys();
        }
      },
      { rootMargin: "400px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [hasMore, loading]);

  return (
    <main className="min-h-screen bg-black text-foreground pb-24 pt-13">
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <Navbar value={query} onChange={setQuery} />

        {/* Announcement banner */}
        <div className="mb-6" role="region" aria-label="Latest news">
          <div className="rounded-md border border-white/10 bg-white/7 px-4 py-3">
            <p className="text-xs md:text-sm">
              <span className="mr-2 font-semibold tracking-wide uppercase text-[10px] md:text-xs opacity-80">
                Latest
              </span>
              New drop: ELITE I Get it while it’s
              <Link
                href="#"
                className="ml-2 underline decoration-dotted underline-offset-4"
              >
                Available
              </Link>
            </p>
          </div>
        </div>

        <header className="mb-7">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Merch
          </h1>
          <p className="opacity-70 text-sm md:text-base">
            Explore the new merchandise collection.
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          {/* Product Grid */}
          {jerseys.length === 0 && !loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-sm opacity-70">No jerseys found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jerseys.map((jersey) => (
                  <JerseyCard
                    key={jersey.id}
                    jersey={jersey}
                    onSelect={setSelectedJersey}
                  />
                ))}
              </div>

              <div ref={sentinelRef} className="h-10 mt-16" />
              {loading && (
                <p className="mt-4 text-center text-sm opacity-70">
                  Loading more…
                </p>
              )}
              {!hasMore && !loading && jerseys.length > 0 && (
                <p className="mt-4 text-center text-sm opacity-50">
                  End of results
                </p>
              )}
            </>
          )}
        </div>

        {/* Modal */}
        {selectedJersey && (
          <JerseyModal
            jersey={selectedJersey}
            onClose={() => setSelectedJersey(null)}
          />
        )}
      </section>
      <Marquee text="SYRCLE — FOCUS — CRAFT — " />
    </main>
  );
}
