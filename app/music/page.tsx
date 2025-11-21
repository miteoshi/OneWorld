// app/music/page.tsx
import ArtistList from "@/components/artist-list";
import Link from "next/link";
import { Marquee } from "@/components/marquee";

export default async function MusicPage() {
  return (
    <main className="min-h-screen bg-black text-foreground pb-24 pt-13">
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        {/* Announcement banner */}
        <div className="mb-6" role="region" aria-label="Latest news">
          <div className="rounded-md border border-white/10 bg-white/7 px-4 py-3">
            <p className="text-xs md:text-sm">
              <span className="mr-2 font-semibold tracking-wide uppercase text-[10px] md:text-xs opacity-80">
                Latest
              </span>
              New drop: ONEWORLD Collective Vol. 1 is out now
              <Link
                href="#"
                className="ml-2 underline decoration-dotted underline-offset-4"
              >
                Listen
              </Link>
            </p>
          </div>
        </div>

        <header className="mb-7">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Visionaries
          </h1>
          <p className="opacity-70 text-sm md:text-base">
            Explore the members and their sounds.
          </p>
        </header>

        <ArtistList />
      </section>
      <Marquee text="SYRCLE — FOCUS — CRAFT — " />
    </main>
  );
}