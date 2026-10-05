"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY } from "@/lib/images";
import Lightbox, { type LightboxImage } from "@/components/gallery/Lightbox";
import { ZoomIn } from "@/components/ui/Icons";

export default function RoomGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState<number | null>(null);

  const items: LightboxImage[] = useMemo(
    () =>
      images.map((src, i) => {
        const known = GALLERY.find((g) => g.src === src);
        return {
          src,
          w: known?.w ?? 1500,
          h: known?.h ?? 1000,
          alt: known?.alt ?? `${name} — photo ${i + 1}`,
          caption: known?.caption ?? `${name} — photo ${i + 1}`,
          category: name,
        };
      }),
    [images, name],
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open photo ${i + 1} of ${name}`}
            className={`img-zoom group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9] sm:col-span-2 sm:row-span-2 sm:aspect-auto" : "aspect-[4/3]"}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"} className="object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all duration-500 group-hover:bg-ink-950/30 group-hover:opacity-100">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                <ZoomIn size={18} />
              </span>
            </span>
          </button>
        ))}
      </div>
      <Lightbox images={items} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
