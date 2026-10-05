import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fallbackRooms } from "@/db/seed-data";
import { HOTEL, whatsappLink } from "@/lib/hotel";
import { pexelsCrop } from "@/lib/images";
import { formatMoney } from "@/lib/pricing";
import { getRoomBySlug, getRooms } from "@/lib/queries";
import BookingWidget from "@/components/booking/BookingWidget";
import RoomCard from "@/components/rooms/RoomCard";
import RoomGallery from "@/components/rooms/RoomGallery";
import Reveal from "@/components/ui/Reveal";
import { Bed, Check, ChevronRight, Clock, Eye, Maximize, Phone, Shield, Users, WhatsApp } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

async function loadRoom(slug: string) {
  return getRoomBySlug(slug).catch(() => fallbackRooms().find((r) => r.slug === slug) ?? null);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const room = await loadRoom(slug);
  if (!room) return { title: "Room not found" };
  return {
    title: `${room.name} — from ${formatMoney(room.priceCents)} per night`,
    description: `${room.tagline} ${room.sizeSqm} m², ${room.bedType.toLowerCase()}, ${room.view.toLowerCase()}. Book direct at ${HOTEL.name}, Adama.`,
    alternates: { canonical: `/rooms/${room.slug}` },
    openGraph: {
      title: `${room.name} | ${HOTEL.name}`,
      description: room.tagline,
      images: [{ url: pexelsCrop(room.images[0], 1200, 630), width: 1200, height: 630, alt: room.name }],
    },
  };
}

export default async function RoomPage({ params }: Params) {
  const { slug } = await params;
  const room = await loadRoom(slug);
  if (!room) notFound();
  const allRooms = await getRooms().catch(() => fallbackRooms());
  const others = allRooms.filter((r) => r.slug !== room.slug).slice(0, 3);
  const roomOptions = allRooms.map((r) => ({ slug: r.slug, name: r.name, maxGuests: r.maxGuests, priceCents: r.priceCents }));

  return (
    <main id="main" className="bg-cream-50">
      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-ink-950 text-cream-50">
        <Image src={room.images[0]} alt={room.name} fill priority sizes="100vw" className="object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/40" />
        <div className="container-x relative pb-12 pt-40">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream-200/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <Link href="/rooms" className="hover:text-white">Rooms & Suites</Link>
            <ChevronRight size={12} />
            <span className="text-cream-50">{room.name}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl animate-fade-up">
              <span className="eyebrow">{room.category}</span>
              <h1 className="display-xl mt-4">{room.name}</h1>
              <p className="mt-4 max-w-xl text-base text-cream-200/80 sm:text-lg">{room.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-100/85">
                <span className="flex items-center gap-2"><Maximize size={16} className="text-gold-400" /> {room.sizeSqm} m²</span>
                <span className="flex items-center gap-2"><Users size={16} className="text-gold-400" /> Up to {room.maxGuests} guests</span>
                <span className="flex items-center gap-2"><Bed size={16} className="text-gold-400" /> {room.bedType}</span>
                <span className="flex items-center gap-2"><Eye size={16} className="text-gold-400" /> {room.view}</span>
              </div>
            </div>
            <div className="glass rounded-2xl px-6 py-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300">From</p>
              <p className="font-display text-4xl">{formatMoney(room.priceCents)}<span className="text-base text-cream-200/70"> / night</span></p>
              <p className="text-[11px] text-cream-200/60">Breakfast included · taxes at checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="space-y-14 lg:col-span-7">
          <Reveal>
            <span className="eyebrow">Overview</span>
            <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">{room.description}</p>
          </Reveal>

          <Reveal>
            <h2 className="display-md text-ink-900">Highlights</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {room.highlights.map((h, i) => (
                <div key={h} className="rounded-2xl border border-ink-900/10 bg-white p-5">
                  <span className="font-display text-3xl text-gold-500">0{i + 1}</span>
                  <p className="mt-2 font-medium text-ink-900">{h}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="display-md text-ink-900">Room amenities</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[15px] text-ink-600">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700"><Check size={12} /></span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="display-md text-ink-900">Gallery</h2>
            <div className="mt-6">
              <RoomGallery images={room.images} name={room.name} />
            </div>
          </Reveal>

          <Reveal>
            <h2 className="display-md text-ink-900">Good to know</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { Icon: Clock, t: "Check-in & check-out", d: `Check-in from ${HOTEL.checkIn}, check-out by ${HOTEL.checkOut}. Early arrival and late departure on request.` },
                { Icon: Shield, t: "Flexible cancellation", d: "Cancel or amend free of charge up to 48 hours before arrival. No prepayment required." },
                { Icon: Users, t: "Children & extra beds", d: "Children under 12 stay free using existing bedding. Cots available on request." },
                { Icon: Bed, t: "Breakfast & extras", d: "Full breakfast buffet at Sabisa included. Airport transfers from $45 one way." },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="flex gap-4 rounded-2xl bg-cream-100 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-gold-700"><Icon size={18} /></span>
                  <div>
                    <p className="font-medium text-ink-900">{t}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Sticky booking card */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-[1.5rem] border border-ink-900/10 bg-white p-5 shadow-[0_30px_60px_-40px_rgba(18,17,16,0.4)] sm:p-6">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-3xl text-ink-900">{formatMoney(room.priceCents)}<span className="text-sm text-ink-400"> / night</span></p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">{room.totalUnits} unit{room.totalUnits === 1 ? "" : "s"}</p>
              </div>
              <p className="mt-1 text-[12px] text-ink-500">Best rate guaranteed · Breakfast included</p>
              <div className="mt-5">
                <BookingWidget rooms={roomOptions} tone="light" layout="stack" lockRoom bare initial={{ room: room.slug }} ctaLabel="Check availability" className="rounded-2xl border border-ink-900/10 bg-cream-50 p-1" />
              </div>
              <div className="mt-6 border-t border-ink-900/10 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">Prefer to talk?</p>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <a href={HOTEL.phoneHref} className="flex items-center gap-3 text-ink-900 hover:text-gold-700"><Phone size={16} className="text-gold-600" /> {HOTEL.phone}</a>
                  <a href={whatsappLink(`Hello, I'm interested in the ${room.name}. Could you share availability?`)} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-ink-900 hover:text-gold-700"><WhatsApp size={16} className="text-[#25D366]" /> WhatsApp reservations</a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Other rooms */}
      {others.length > 0 && (
        <section className="bg-cream-100 py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="eyebrow">You may also like</span>
                <h2 className="display-md mt-4 text-ink-900">Other rooms & suites</h2>
              </div>
              <Link href="/rooms" className="link-underline hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-900 sm:inline-flex">View all</Link>
            </div>
            <div className="mt-10 grid gap-7 md:grid-cols-3">
              {others.map((r, i) => (
                <Reveal key={r.id} delay={i * 100} className="h-full"><RoomCard room={r} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
