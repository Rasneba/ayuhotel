import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fallbackRooms } from "@/db/seed-data";
import { IMG } from "@/lib/images";
import { formatMoney } from "@/lib/pricing";
import { getRooms } from "@/lib/queries";
import RoomCard from "@/components/rooms/RoomCard";
import Reveal from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Compare all rooms and suites at Ayu International Hotel, Adama — from Classic Garden Rooms to the Presidential Suite. Breakfast included, best rate guaranteed.",
  alternates: { canonical: "/rooms" },
};

export default async function RoomsPage() {
  const rooms = await getRooms().catch(() => fallbackRooms());

  return (
    <main id="main" className="bg-cream-100">
      <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-ink-950 text-cream-50">
        <Image src={IMG.roomView} alt="Suite with panoramic windows" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/30" />
        <div className="container-x relative pb-14 pt-40">
          <span className="eyebrow">Rooms & Suites</span>
          <h1 className="display-xl mt-4 max-w-3xl">Six ways to stay, one standard of care</h1>
          <p className="mt-5 max-w-xl text-base text-cream-200/80">
            Every category includes breakfast at Sabisa, high-speed Wi-Fi, access to the pool, sauna and fitness
            centre — and the same attentive service.
          </p>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room, i) => (
            <Reveal key={room.id} delay={(i % 3) * 100} className="h-full">
              <RoomCard room={room} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <span className="eyebrow">At a glance</span>
          <h2 className="display-md mt-4 text-ink-900">Compare rooms</h2>
          <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-ink-900/10 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/10 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Bed</th>
                  <th className="px-6 py-4">View</th>
                  <th className="px-6 py-4 text-right">From</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/10">
                {rooms.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-cream-50">
                    <td className="px-6 py-4">
                      <Link href={`/rooms/${r.slug}`} className="font-display text-lg text-ink-900 hover:text-gold-700">{r.name}</Link>
                      <p className="text-[11px] uppercase tracking-widest text-ink-400">{r.category}</p>
                    </td>
                    <td className="px-6 py-4 text-ink-600">{r.sizeSqm} m²</td>
                    <td className="px-6 py-4 text-ink-600">Up to {r.maxGuests}</td>
                    <td className="px-6 py-4 text-ink-600">{r.bedType}</td>
                    <td className="px-6 py-4 text-ink-600">{r.view}</td>
                    <td className="px-6 py-4 text-right font-display text-xl text-ink-900">{formatMoney(r.priceCents)}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/booking?room=${r.slug}`} className="btn-dark btn-sm">Book</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
