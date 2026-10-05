"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Room } from "@/db/schema";
import { formatDate } from "@/lib/dates";
import { HOTEL } from "@/lib/hotel";
import { formatMoney, SERVICE_CHARGE_RATE, VAT_RATE, type Quote } from "@/lib/pricing";
import { staySearchToQuery, type StaySearch } from "@/lib/stay";
import type { RoomAvailability } from "@/lib/queries";
import BookingWidget from "./BookingWidget";
import { ArrowRight, Bed, Check, Lock, Maximize, Shield, Users } from "@/components/ui/Icons";

type AvailabilityResponse = {
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  results: RoomAvailability[];
};

type Props = { rooms: Room[]; initialSearch: StaySearch };

const STEPS = ["Dates", "Room", "Details", "Confirmed"];

export default function BookingFlow({ rooms, initialSearch }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState<StaySearch>(initialSearch);
  const [data, setData] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState(initialSearch.room);
  const [promoInput, setPromoInput] = useState(initialSearch.promo);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const roomOptions = useMemo(
    () => rooms.map((r) => ({ slug: r.slug, name: r.name, maxGuests: r.maxGuests, priceCents: r.priceCents })),
    [rooms],
  );

  const fetchAvailability = useCallback(async (s: StaySearch) => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`/api/availability?${staySearchToQuery(s)}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Availability request failed");
      const json = (await res.json()) as AvailabilityResponse;
      setData(json);
    } catch {
      setLoadError("We couldn't load live availability. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability(search);
    if (typeof window !== "undefined") {
      const qs = staySearchToQuery(search);
      window.history.replaceState(null, "", `${window.location.pathname}?${qs}`);
    }
  }, [search, fetchAvailability]);

  const selected = data?.results.find((r) => r.room.slug === selectedSlug) ?? null;
  const selectedRoom = selected?.room ?? rooms.find((r) => r.slug === selectedSlug) ?? null;
  const selectable = (r: RoomAvailability) => r.availableUnits > 0 && r.fitsGuests;
  // 1 = choosing dates (loading), 2 = choosing a room, 3 = entering details
  const step = !data ? 1 : selected && selectable(selected) ? 3 : 2;
  const detailsEnabled = step >= 3;
  const guests = search.adults + search.children;

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    setSubmitError(null);
    if (window.innerWidth < 1024) {
      window.setTimeout(() => summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  const applyPromo = () => {
    setSearch((s) => ({ ...s, promo: promoInput.trim().toUpperCase() }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected || !selectable(selected)) return;
    setSubmitting(true);
    setSubmitError(null);
    setFieldErrors({});
    const form = new FormData(e.currentTarget);
    const payload = {
      roomSlug: selected.room.slug,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adults: search.adults,
      children: search.children,
      guestName: form.get("guestName"),
      email: form.get("email"),
      phone: form.get("phone"),
      country: form.get("country"),
      specialRequests: form.get("specialRequests"),
      promoCode: search.promo,
    };
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setFieldErrors(json.errors ?? {});
        setSubmitError(json.error ?? "We could not complete your booking.");
        if (res.status === 409) fetchAvailability(search);
        setSubmitting(false);
        return;
      }
      router.push(`/booking/confirmation/${json.reference}`);
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="container-x">
      {/* Header */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="eyebrow">Reservations</span>
          <h1 className="display-lg mt-4 text-ink-900">Book your stay</h1>
          <p className="mt-3 max-w-xl text-sm text-ink-500 sm:text-base">
            Live availability, transparent pricing and no payment until you arrive. Best rate guaranteed when you
            book direct.
          </p>
        </div>
        <ol className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" aria-label="Booking progress">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const state = n < step ? "done" : n === step ? "active" : "todo";
            return (
              <li key={label} className="flex items-center gap-2">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border text-[11px] transition-colors ${
                    state === "done"
                      ? "border-gold-500 bg-gold-500 text-ink-950"
                      : state === "active"
                        ? "border-ink-900 bg-ink-900 text-cream-50"
                        : "border-ink-900/20 text-ink-400"
                  }`}
                  aria-current={state === "active" ? "step" : undefined}
                >
                  {state === "done" ? <Check size={14} /> : n}
                </span>
                <span className={`hidden sm:inline ${state === "todo" ? "text-ink-400" : "text-ink-900"}`}>{label}</span>
                {i < STEPS.length - 1 && <span className="mx-1 h-px w-5 bg-ink-900/15" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Search bar */}
      <div className="mt-10">
        <BookingWidget
          key={`${initialSearch.checkIn}-${initialSearch.checkOut}`}
          rooms={roomOptions}
          tone="light"
          layout="bar"
          initial={search}
          ctaLabel="Update search"
          onSearch={(s) => {
            setSearch({ ...s, promo: search.promo });
            if (s.room) setSelectedSlug(s.room);
          }}
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Room list */}
        <div className="space-y-5 lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-ink-900">
              {loading ? "Checking availability…" : `${data?.results.filter(selectable).length ?? 0} rooms available`}
            </h2>
            {data && (
              <p className="text-[12px] text-ink-500">
                {formatDate(data.checkIn, "short")} → {formatDate(data.checkOut, "short")} · {data.nights} night{data.nights === 1 ? "" : "s"} · {guests} guest{guests === 1 ? "" : "s"}
              </p>
            )}
          </div>

          {loadError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              {loadError}{" "}
              <button type="button" onClick={() => fetchAvailability(search)} className="font-semibold underline">
                Retry
              </button>
            </div>
          )}

          {loading && !data
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-[1.5rem] bg-white/70" />
              ))
            : data?.results.map((item) => {
                const ok = selectable(item);
                const isSelected = item.room.slug === selectedSlug;
                return (
                  <article
                    key={item.room.id}
                    className={`relative flex flex-col overflow-hidden rounded-[1.5rem] border bg-white transition-all duration-500 sm:flex-row ${
                      isSelected
                        ? "border-gold-500 shadow-[0_30px_60px_-30px_rgba(197,161,89,0.5)] ring-1 ring-gold-500"
                        : "border-ink-900/10 hover:border-ink-900/25"
                    } ${!ok ? "opacity-70" : ""}`}
                  >
                    <Link href={`/rooms/${item.room.slug}`} className="img-zoom relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-64 lg:w-72" aria-label={`View ${item.room.name}`}>
                      <Image src={item.room.images[0]} alt={item.room.name} fill sizes="(min-width:640px) 288px, 92vw" className="object-cover" />
                      <span className="absolute left-3 top-3 rounded-full bg-ink-950/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-50 backdrop-blur">
                        {item.room.category}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl text-ink-900">{item.room.name}</h3>
                          <p className="mt-1 text-sm text-ink-500">{item.room.tagline}</p>
                        </div>
                        <AvailabilityBadge item={item} guests={guests} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-ink-500">
                        <span className="flex items-center gap-1.5"><Maximize size={14} className="text-gold-600" /> {item.room.sizeSqm} m²</span>
                        <span className="flex items-center gap-1.5"><Users size={14} className="text-gold-600" /> Up to {item.room.maxGuests}</span>
                        <span className="flex items-center gap-1.5"><Bed size={14} className="text-gold-600" /> {item.room.bedType}</span>
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {item.room.highlights.map((h) => (
                          <li key={h} className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] text-ink-600">{h}</li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
                            {item.quote.discountCents > 0 ? "Total incl. taxes & offer" : "Total incl. taxes"}
                          </p>
                          <p className="font-display text-3xl text-ink-900">
                            {formatMoney(item.quote.totalCents)}
                            {item.quote.discountCents > 0 && (
                              <span className="ml-2 text-base text-ink-400 line-through">
                                {formatMoney(item.quote.totalCents + Math.round(item.quote.discountCents * (1 + SERVICE_CHARGE_RATE) * (1 + VAT_RATE)))}
                              </span>
                            )}
                          </p>
                          <p className="text-[12px] text-ink-500">
                            {formatMoney(item.quote.nightlyRateCents)} / night · {item.quote.nights} night{item.quote.nights === 1 ? "" : "s"}
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={!ok}
                          onClick={() => handleSelect(item.room.slug)}
                          className={isSelected ? "btn-gold btn-sm" : "btn-dark btn-sm"}
                        >
                          {isSelected ? (
                            <>
                              <Check size={14} /> Selected
                            </>
                          ) : ok ? (
                            "Select room"
                          ) : (
                            "Unavailable"
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
        </div>

        {/* Summary + details */}
        <div ref={summaryRef} className="scroll-mt-28 lg:sticky lg:top-24 lg:col-span-5 xl:col-span-4">
          <div className="overflow-hidden rounded-[1.5rem] border border-ink-900/10 bg-white shadow-[0_30px_60px_-40px_rgba(18,17,16,0.35)]">
            {selectedRoom ? (
              <div className="relative h-40">
                <Image src={selectedRoom.images[0]} alt={selectedRoom.name} fill sizes="480px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                <div className="absolute bottom-4 left-5 text-cream-50">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-300">Your selection</p>
                  <p className="font-display text-2xl">{selectedRoom.name}</p>
                </div>
              </div>
            ) : (
              <div className="bg-ink-900 px-6 py-6 text-cream-50">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-300">Your stay</p>
                <p className="mt-1 font-display text-2xl">Select a room to continue</p>
              </div>
            )}

            <div className="space-y-5 p-6">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400">Check-in</dt>
                  <dd className="mt-1 font-medium text-ink-900">{formatDate(search.checkIn, "short")}</dd>
                  <dd className="text-[11px] text-ink-500">from {HOTEL.checkIn}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400">Check-out</dt>
                  <dd className="mt-1 font-medium text-ink-900">{formatDate(search.checkOut, "short")}</dd>
                  <dd className="text-[11px] text-ink-500">until {HOTEL.checkOut}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400">Guests</dt>
                  <dd className="mt-1 font-medium text-ink-900">
                    {search.adults} adult{search.adults === 1 ? "" : "s"}
                    {search.children ? `, ${search.children} child${search.children === 1 ? "" : "ren"}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400">Nights</dt>
                  <dd className="mt-1 font-medium text-ink-900">{data?.nights ?? "—"}</dd>
                </div>
              </dl>

              {/* Promo */}
              <div>
                <label htmlFor="promo" className="field-label text-ink-500">Promo code</label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        applyPromo();
                      }
                    }}
                    placeholder="e.g. EARLYBIRD"
                    className="input uppercase tracking-widest"
                  />
                  <button type="button" onClick={applyPromo} className="btn-outline-dark btn-sm shrink-0">
                    Apply
                  </button>
                </div>
                {selected?.quote.promo && (
                  <p className={`mt-2 text-xs ${selected.quote.promo.applied ? "text-emerald-700" : "text-amber-700"}`}>
                    {selected.quote.promo.message}
                  </p>
                )}
                {!selected && search.promo && (
                  <p className="mt-2 text-xs text-ink-500">Code {search.promo} will be applied once you choose a room.</p>
                )}
              </div>

              {selected && <PriceBreakdown quote={selected.quote} />}
            </div>
          </div>

          {/* Guest details */}
          <div ref={detailsRef} className={`mt-6 transition-opacity duration-500 ${!detailsEnabled ? "pointer-events-none opacity-50" : ""}`}>
            <form onSubmit={submit} noValidate className="rounded-[1.5rem] border border-ink-900/10 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(18,17,16,0.35)]">
              <h2 className="font-display text-2xl text-ink-900">Guest details</h2>
              <p className="mt-1 text-[12px] text-ink-500">
                {!detailsEnabled ? "Select an available room to continue." : "Almost there — tell us who is staying."}
              </p>
              <fieldset disabled={!detailsEnabled || submitting} className="mt-5 grid gap-4">
                <Input name="guestName" label="Lead guest full name" autoComplete="name" error={fieldErrors.guestName} />
                <Input name="email" label="Email address" type="email" autoComplete="email" error={fieldErrors.email} />
                <div className="grid grid-cols-2 gap-4">
                  <Input name="phone" label="Phone" type="tel" autoComplete="tel" placeholder="+251 …" error={fieldErrors.phone} />
                  <Input name="country" label="Country" autoComplete="country-name" />
                </div>
                <div>
                  <label htmlFor="specialRequests" className="field-label text-ink-500">Special requests (optional)</label>
                  <textarea id="specialRequests" name="specialRequests" rows={3} placeholder="Airport pick-up, high floor, celebration…" className="input resize-none" />
                </div>
                {submitError && (
                  <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                )}
                <button type="submit" className="btn-gold w-full">
                  {submitting ? "Confirming…" : selected ? `Confirm booking · ${formatMoney(selected.quote.totalCents)}` : "Confirm booking"}
                  {!submitting && <ArrowRight size={16} />}
                </button>
              </fieldset>
              <ul className="mt-5 space-y-2 text-[12px] text-ink-500">
                <li className="flex items-center gap-2"><Shield size={14} className="text-gold-600" /> Free cancellation up to 48 hours before arrival</li>
                <li className="flex items-center gap-2"><Lock size={14} className="text-gold-600" /> No payment today — settle at the hotel in USD or ETB</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-gold-600" /> Instant confirmation with a booking reference</li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailabilityBadge({ item, guests }: { item: RoomAvailability; guests: number }) {
  if (!item.fitsGuests) {
    return <Badge tone="muted">Sleeps up to {item.room.maxGuests} · too small for {guests}</Badge>;
  }
  if (item.availableUnits <= 0) return <Badge tone="red">Sold out</Badge>;
  if (item.availableUnits <= 3) return <Badge tone="amber">Only {item.availableUnits} left</Badge>;
  return <Badge tone="green">Available</Badge>;
}

function Badge({ tone, children }: { tone: "green" | "amber" | "red" | "muted"; children: ReactNode }) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
    muted: "bg-cream-100 text-ink-500 border-ink-900/10",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${styles}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </span>
  );
}

function PriceBreakdown({ quote }: { quote: Quote }) {
  return (
    <div className="border-t border-ink-900/10 pt-5">
      <dl className="space-y-2 text-sm">
        <Row label={`${formatMoney(quote.nightlyRateCents)} × ${quote.nights} night${quote.nights === 1 ? "" : "s"}`} value={formatMoney(quote.roomTotalCents)} />
        {quote.discountCents > 0 && quote.discountLabel && (
          <Row label={quote.discountLabel} value={`− ${formatMoney(quote.discountCents)}`} accent />
        )}
        <Row label={`Service charge (${Math.round(SERVICE_CHARGE_RATE * 100)}%)`} value={formatMoney(quote.serviceChargeCents)} />
        <Row label={`VAT (${Math.round(VAT_RATE * 100)}%)`} value={formatMoney(quote.vatCents)} />
      </dl>
      <div className="mt-4 flex items-end justify-between border-t border-ink-900/10 pt-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">Total</p>
          <p className="text-[11px] text-ink-500">All taxes included</p>
        </div>
        <p className="font-display text-3xl text-ink-900">{formatMoney(quote.totalCents)}</p>
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

function Input({
  name,
  label,
  error,
  type = "text",
  ...rest
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={`bk-${name}`} className="field-label text-ink-500">{label}</label>
      <input id={`bk-${name}`} name={name} type={type} className="input" aria-invalid={!!error} {...rest} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
