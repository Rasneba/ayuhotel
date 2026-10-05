import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { formatDate } from "@/lib/dates";
import { HOTEL, MAPS_DIRECTIONS_URL, whatsappLink } from "@/lib/hotel";
import { formatMoney, SERVICE_CHARGE_RATE, VAT_RATE } from "@/lib/pricing";
import { getBookingByReference } from "@/lib/queries";
import PrintButton from "@/components/booking/PrintButton";
import { ArrowUpRight, Calendar, Mail, MapPin, Phone, Users, WhatsApp } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const result = await getBookingByReference(reference).catch(() => null);
  if (!result) notFound();
  const { booking, room } = result;

  const guestLine = `${booking.adults} adult${booking.adults === 1 ? "" : "s"}${
    booking.children ? `, ${booking.children} child${booking.children === 1 ? "" : "ren"}` : ""
  }`;
  const wa = whatsappLink(
    `Hello ${HOTEL.name}, I have just booked the ${room.name} (ref ${booking.reference}) from ${formatDate(
      booking.checkIn,
      "short",
    )} to ${formatDate(booking.checkOut, "short")} for ${guestLine}. Could you please confirm the airport transfer options?`,
  );

  return (
    <main id="main" className="min-h-screen bg-cream-100 pb-24 pt-28 lg:pt-36">
      <div className="container-x max-w-4xl">
        {/* Header */}
        <div className="text-center animate-fade-up">
          <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-500/15">
            <svg viewBox="0 0 48 48" className="h-12 w-12 text-gold-600" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="24" cy="24" r="21" strokeDasharray={140} className="opacity-30" />
              <path d="M14 25l7 7 13-15" strokeDasharray={60} className="animate-draw" />
            </svg>
          </span>
          <p className="eyebrow eyebrow-center mt-6 justify-center">Reservation confirmed</p>
          <h1 className="display-lg mt-4 text-ink-900">We look forward to welcoming you, {booking.guestName.split(" ")[0]}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-500 sm:text-base">
            A confirmation has been prepared for <strong className="text-ink-900">{booking.email}</strong>. Please
            quote your booking reference when contacting us.
          </p>
          <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-gold-500/40 bg-white px-6 py-3 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-400">Reference</span>
            <span className="font-display text-2xl tracking-[0.15em] text-ink-900">{booking.reference}</span>
          </div>
        </div>

        {/* Card */}
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-ink-900/10 bg-white shadow-[0_40px_80px_-50px_rgba(18,17,16,0.4)] animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="relative h-56 sm:h-72">
            <Image src={room.images[0]} alt={room.name} fill priority sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-cream-50 sm:left-8 sm:right-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300">{room.category}</p>
                <h2 className="font-display text-3xl sm:text-4xl">{room.name}</h2>
                <p className="mt-1 text-sm text-cream-200/80">{room.sizeSqm} m² · {room.bedType} · {room.view}</p>
              </div>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200 backdrop-blur">
                {booking.status}
              </span>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-5">
            <dl className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
              <Item icon={<Calendar size={18} />} label="Check-in" value={formatDate(booking.checkIn)} hint={`From ${HOTEL.checkIn}`} />
              <Item icon={<Calendar size={18} />} label="Check-out" value={formatDate(booking.checkOut)} hint={`Until ${HOTEL.checkOut}`} />
              <Item icon={<Users size={18} />} label="Guests" value={guestLine} hint={`${booking.nights} night${booking.nights === 1 ? "" : "s"}`} />
              <Item icon={<Mail size={18} />} label="Lead guest" value={booking.guestName} hint={booking.phone} />
              {booking.specialRequests && (
                <div className="sm:col-span-2 rounded-2xl bg-cream-100 p-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">Special requests</dt>
                  <dd className="mt-1 text-sm text-ink-700">{booking.specialRequests}</dd>
                </div>
              )}
            </dl>

            <div className="rounded-2xl border border-ink-900/10 bg-cream-50 p-5 lg:col-span-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">Price summary</p>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label={`${formatMoney(booking.nightlyRateCents)} × ${booking.nights} night${booking.nights === 1 ? "" : "s"}`} value={formatMoney(booking.roomTotalCents)} />
                {booking.discountCents > 0 && (
                  <Row label={booking.discountLabel ?? "Discount"} value={`− ${formatMoney(booking.discountCents)}`} accent />
                )}
                <Row label={`Service charge (${Math.round(SERVICE_CHARGE_RATE * 100)}%)`} value={formatMoney(booking.serviceChargeCents)} />
                <Row label={`VAT (${Math.round(VAT_RATE * 100)}%)`} value={formatMoney(booking.vatCents)} />
              </dl>
              <div className="mt-4 flex items-end justify-between border-t border-ink-900/10 pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">Total due at hotel</span>
                <span className="font-display text-3xl text-ink-900">{formatMoney(booking.totalCents)}</span>
              </div>
              <p className="mt-3 text-[11px] text-ink-500">
                Payable at the hotel in Ethiopian birr. Free cancellation until 48 hours before arrival.
              </p>
            </div>
          </div>

          <div className="no-print flex flex-wrap items-center justify-between gap-4 border-t border-ink-900/10 bg-cream-50 px-6 py-5 sm:px-8">
            <div className="flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5">
                <WhatsApp size={16} /> Message us on WhatsApp
              </a>
              <PrintButton />
            </div>
            <Link href="/" className="link-underline text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-900">
              Back to home
            </Link>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: "300ms" }}>
          {[
            { Icon: Phone, title: "Need a transfer?", body: `Call ${HOTEL.phone} or message us on WhatsApp and reception will arrange a pick-up from Bole International Airport.` },
            { Icon: MapPin, title: "Finding us", body: `${HOTEL.address.street}, ${HOTEL.address.city}. 75 minutes from Bole Airport via the expressway.` },
            { Icon: ArrowUpRight, title: "Changes & cancellations", body: "Email reservations with your reference. Free changes and cancellation up to 48 hours before arrival." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-ink-900/10 bg-white p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500/15 text-gold-700"><Icon size={18} /></span>
              <p className="mt-4 font-display text-xl text-ink-900">{title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>

        <p className="no-print mt-8 text-center text-[12px] text-ink-400">
          <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noreferrer" className="link-underline">Open directions in Google Maps</a>
        </p>
      </div>
    </main>
  );
}

function Item({ icon, label, value, hint }: { icon: ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-100 text-gold-700">{icon}</span>
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">{label}</dt>
        <dd className="mt-0.5 font-medium text-ink-900">{value}</dd>
        {hint && <dd className="text-[12px] text-ink-500">{hint}</dd>}
      </div>
    </div>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={accent ? "text-emerald-700" : "text-ink-500"}>{label}</dt>
      <dd className={`tabular-nums ${accent ? "font-semibold text-emerald-700" : "text-ink-900"}`}>{value}</dd>
    </div>
  );
}
