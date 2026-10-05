"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HOTEL } from "@/lib/hotel";
import { IMG } from "@/lib/images";
import BookingWidget, { type RoomOption } from "@/components/booking/BookingWidget";
import { ChevronDown } from "@/components/ui/Icons";

const SLIDES = [
  { src: IMG.exterior, alt: "Ayu International Hotel seen across its garden and swimming pool" },
  { src: IMG.gardens, alt: "The courtyard garden and walkways of Ayu International Hotel" },
  { src: IMG.pool, alt: "The outdoor swimming pool in the hotel gardens" },
];

const INTERVAL = 7000;

export default function Hero({
  rooms,
  defaultStay,
}: {
  rooms: RoomOption[];
  defaultStay: { checkIn: string; checkOut: string };
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-cream-50">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === active ? "animate-kenburns" : ""}`}
            key={`${slide.src}-${i === active ? "on" : "off"}`}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/25 to-ink-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/65 via-transparent to-transparent" />

      {/* Vertical caption */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 xl:flex">
        <p className="rotate-180 text-[10px] font-semibold uppercase tracking-[0.5em] text-cream-100/50 [writing-mode:vertical-rl]">
          Adama · Oromia · Ethiopia
        </p>
      </div>

      {/* Slide dots */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-pressed={i === active}
            className="group grid h-6 w-6 place-items-center"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === active ? "h-6 w-1.5 bg-gold-400" : "h-1.5 w-1.5 bg-white/50 group-hover:bg-white"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="container-x relative flex flex-1 flex-col justify-center pb-10 pt-36 sm:pt-40 lg:pb-16">
        <div className="max-w-4xl">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "150ms" }}>
            Welcome to Ayu Int Hotel · Since {HOTEL.founded}
          </p>
          <h1 className="display-xl mt-6 animate-fade-up text-cream-50" style={{ animationDelay: "300ms" }}>
            A premium hotel in the
            <br />
            heart of <em className="font-light italic text-gold-gradient">Adama</em>
          </h1>
          <p
            className="mt-7 max-w-xl animate-fade-up text-[15px] leading-relaxed text-cream-100/80 sm:text-lg"
            style={{ animationDelay: "450ms" }}
          >
            Comfortable rooms, a garden with an outdoor swimming pool, restaurant and bar, conference halls and
            free parking — all in the centre of Adama, around 45 minutes from Addis Ababa on the expressway.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "600ms" }}>
            <Link href="/booking" className="btn-gold">
              Reserve your stay
            </Link>
            <Link href="/#rooms" className="btn-outline-light">
              Explore rooms
            </Link>
          </div>
        </div>

        <div className="mt-14 animate-fade-up lg:mt-20" style={{ animationDelay: "800ms" }}>
          <BookingWidget rooms={rooms} tone="dark" layout="bar" initial={defaultStay} />
          <p className="mt-3 text-center text-[11px] tracking-wide text-cream-100/50 lg:text-left">
            Book direct with the hotel · Reception answers 24 hours a day · Free cancellation up to 48 hours
            before arrival
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-cream-100/60 lg:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <ChevronDown size={16} className="animate-scroll-hint" />
      </a>
    </section>
  );
}
