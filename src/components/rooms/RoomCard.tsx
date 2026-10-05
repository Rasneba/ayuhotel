import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/db/schema";
import { formatMoney } from "@/lib/pricing";
import { ArrowRight, Bed, Maximize, Users } from "@/components/ui/Icons";

export default function RoomCard({ room, priority = false }: { room: Room; priority?: boolean }) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_50px_-30px_rgba(18,17,16,0.25)]">
      <Link href={`/rooms/${room.slug}`} className="img-zoom relative block aspect-[4/3] overflow-hidden" aria-label={`View ${room.name}`}>
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-80" />
        <span className="absolute left-4 top-4 rounded-full bg-ink-950/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-50 backdrop-blur-md">
          {room.category}
        </span>
        <span className="glass absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white">
          {formatMoney(room.priceCents)}
          <span className="font-normal text-white/70"> / night</span>
        </span>
        <span className="absolute bottom-4 left-4 flex items-center gap-4 text-[11px] font-medium text-cream-50/90">
          <span className="flex items-center gap-1.5">
            <Maximize size={14} className="text-gold-300" /> {room.sizeSqm} m²
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-gold-300" /> Up to {room.maxGuests}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Bed size={14} className="text-gold-300" /> {room.bedType}
          </span>
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-ink-900">
          <Link href={`/rooms/${room.slug}`} className="transition-colors hover:text-gold-600">
            {room.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{room.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {room.highlights.slice(0, 3).map((h) => (
            <li key={h} className="rounded-full border border-ink-900/10 bg-cream-50 px-3 py-1 text-[11px] font-medium text-ink-600">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-ink-900/10 pt-5">
            <Link
              href={`/rooms/${room.slug}`}
              className="link-underline inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-900"
            >
              Details <ArrowRight size={14} />
            </Link>
            <Link href={`/booking?room=${room.slug}`} className="btn-dark btn-sm">
              Book
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
