"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/images";
import { ZoomIn } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import Lightbox from "./Lightbox";

type Filter = "All" | GalleryCategory;

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    GALLERY.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    map.set("All", GALLERY.length);
    return map;
  }, []);

  return (
    <section id="gallery" className="scroll-mt-24 bg-ink-950 py-24 text-cream-50 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Gallery</span>
            <h2 className="display-lg mt-5 text-cream-50">A look around the hotel</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cream-200/65 sm:text-base">
              Photographs of the hotel itself — our rooms, garden, pool, lobby and conference hall. Tap an
              image to open the full-screen viewer.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div role="group" aria-label="Filter gallery by category" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0">
              {GALLERY_CATEGORIES.map((cat) => {
                const active = cat === filter;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(cat)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ${
                      active
                        ? "border-gold-500 bg-gold-500 text-ink-950"
                        : "border-white/15 text-cream-100/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {cat}
                    <span className={`ml-2 ${active ? "text-ink-950/60" : "text-cream-100/40"}`}>{counts.get(cat)}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div key={filter} className="masonry mt-12">
          {items.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open ${photo.caption}`}
              style={{ aspectRatio: `${photo.w} / ${photo.h}`, animationDelay: `${(i % 8) * 60}ms` }}
              className="img-zoom group relative block w-full overflow-hidden rounded-2xl bg-ink-800 animate-scale-in focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="min-w-0 text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">{photo.category}</p>
                  <p className="truncate text-sm text-cream-50">{photo.caption}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
                  <ZoomIn size={16} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox images={items} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </section>
  );
}
