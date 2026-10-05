"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { addDays, formatDate, nightsBetween, todayISO } from "@/lib/dates";
import { formatMoney } from "@/lib/pricing";
import { staySearchToQuery, type StaySearch } from "@/lib/stay";
import { ArrowRight, Bed, Calendar, ChevronDown, Minus, Plus, Users } from "@/components/ui/Icons";

export type RoomOption = { slug: string; name: string; maxGuests: number; priceCents: number };

type Props = {
  rooms: RoomOption[];
  tone?: "dark" | "light";
  layout?: "bar" | "stack";
  initial?: Partial<StaySearch>;
  lockRoom?: boolean;
  onSearch?: (search: StaySearch) => void;
  ctaLabel?: string;
  className?: string;
  /** Renders without the glass shell — for embedding inside an existing card. */
  bare?: boolean;
};

export default function BookingWidget({
  rooms,
  tone = "dark",
  layout = "bar",
  initial,
  lockRoom = false,
  onSearch,
  ctaLabel = "Check availability",
  className = "",
  bare = false,
}: Props) {
  const router = useRouter();
  const today = todayISO();
  const [checkIn, setCheckIn] = useState(initial?.checkIn ?? addDays(today, 1));
  const [checkOut, setCheckOut] = useState(initial?.checkOut ?? addDays(today, 3));
  const [adults, setAdults] = useState(initial?.adults ?? 2);
  const [children, setChildren] = useState(initial?.children ?? 0);
  const [room, setRoom] = useState(initial?.room ?? "");
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);

  const nights = Math.max(0, nightsBetween(checkIn, checkOut));
  const selectedRoom = useMemo(() => rooms.find((r) => r.slug === room), [rooms, room]);
  const tooManyGuests = selectedRoom ? adults + children > selectedRoom.maxGuests : false;

  useEffect(() => {
    if (!guestsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) setGuestsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGuestsOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [guestsOpen]);

  const handleCheckIn = (value: string) => {
    if (!value) return;
    setCheckIn(value);
    if (checkOut <= value) setCheckOut(addDays(value, 1));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (nights < 1) return;
    const search: StaySearch = {
      checkIn,
      checkOut,
      adults,
      children,
      room,
      promo: initial?.promo ?? "",
    };
    if (onSearch) onSearch(search);
    else router.push(`/booking?${staySearchToQuery(search)}`);
  };

  const dark = tone === "dark";
  const shell = bare
    ? dark
      ? "text-white"
      : "text-ink-900"
    : dark
      ? "glass rounded-2xl p-2 text-white"
      : "glass-light rounded-2xl p-2 text-ink-900";
  const label = dark ? "text-gold-300/90" : "text-gold-700";
  const divider = dark ? "lg:border-white/10" : "lg:border-ink-900/10";
  const fieldBase =
    "w-full bg-transparent text-[15px] font-medium focus:outline-none " +
    (dark ? "text-white dark-scheme" : "text-ink-900 light-scheme");
  const sub = dark ? "text-white/50" : "text-ink-500";
  const bar = layout === "bar";

  return (
    <form
      onSubmit={submit}
      aria-label="Check room availability"
      className={`${shell} ${className}`}
    >
      <div
        className={`grid gap-2 ${
          bar ? "grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1fr_1.25fr_auto]" : "grid-cols-2"
        }`}
      >
        {/* Check-in */}
        <div className={`rounded-xl px-4 py-3 ${bar ? `lg:border-r ${divider}` : ""}`}>
          <label htmlFor={`checkin-${tone}-${layout}`} className={`field-label ${label}`}>
            Check-in
          </label>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="shrink-0 text-gold-400" />
            <input
              id={`checkin-${tone}-${layout}`}
              type="date"
              required
              min={today}
              value={checkIn}
              onChange={(e) => handleCheckIn(e.target.value)}
              className={fieldBase}
            />
          </div>
          <p className={`mt-1 text-[11px] ${sub}`}>{formatDate(checkIn, "long")}</p>
        </div>

        {/* Check-out */}
        <div className={`rounded-xl px-4 py-3 ${bar ? `lg:border-r ${divider}` : ""}`}>
          <label htmlFor={`checkout-${tone}-${layout}`} className={`field-label ${label}`}>
            Check-out
          </label>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="shrink-0 text-gold-400" />
            <input
              id={`checkout-${tone}-${layout}`}
              type="date"
              required
              min={addDays(checkIn, 1)}
              value={checkOut}
              onChange={(e) => e.target.value && setCheckOut(e.target.value)}
              className={fieldBase}
            />
          </div>
          <p className={`mt-1 text-[11px] ${sub}`}>
            {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Select a later date"}
          </p>
        </div>

        {/* Guests */}
        <div ref={guestsRef} className={`relative rounded-xl px-4 py-3 ${bar ? `lg:border-r ${divider}` : ""}`}>
          <span className={`field-label ${label}`}>Guests</span>
          <button
            type="button"
            onClick={() => setGuestsOpen((v) => !v)}
            aria-haspopup="dialog"
            aria-expanded={guestsOpen}
            className="flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-[15px] font-medium">
              <Users size={16} className="shrink-0 text-gold-400" />
              {adults} Adult{adults === 1 ? "" : "s"}
              {children > 0 ? `, ${children} Child${children === 1 ? "" : "ren"}` : ""}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${guestsOpen ? "rotate-180" : ""} ${sub}`}
            />
          </button>
          <p className={`mt-1 text-[11px] ${sub}`}>
            {tooManyGuests ? (
              <span className="text-red-400">Max {selectedRoom?.maxGuests} for this room</span>
            ) : (
              "Children under 12"
            )}
          </p>

          {guestsOpen && (
            <div
              role="dialog"
              aria-label="Select guests"
              className={`absolute left-0 top-[calc(100%+8px)] z-30 w-72 rounded-2xl p-5 animate-slide-down ${
                dark ? "glass-dark text-white" : "glass-light text-ink-900"
              }`}
            >
              {[
                { key: "adults", label: "Adults", hint: "Ages 12+", value: adults, min: 1, max: 8, set: setAdults },
                { key: "children", label: "Children", hint: "Ages 0–11", value: children, min: 0, max: 6, set: setChildren },
              ].map((row) => (
                <div key={row.key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold">{row.label}</p>
                    <p className={`text-[11px] ${sub}`}>{row.hint}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Decrease ${row.label}`}
                      disabled={row.value <= row.min}
                      onClick={() => row.set(Math.max(row.min, row.value - 1))}
                      className="grid h-9 w-9 place-items-center rounded-full border border-current/30 transition-colors hover:border-gold-400 hover:text-gold-400 disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold tabular-nums">{row.value}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${row.label}`}
                      disabled={row.value >= row.max}
                      onClick={() => row.set(Math.min(row.max, row.value + 1))}
                      className="grid h-9 w-9 place-items-center rounded-full border border-current/30 transition-colors hover:border-gold-400 hover:text-gold-400 disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setGuestsOpen(false)}
                className="mt-3 w-full rounded-full bg-gold-500 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-950 hover:bg-gold-400"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Room */}
        <div className="rounded-xl px-4 py-3">
          <label htmlFor={`room-${tone}-${layout}`} className={`field-label ${label}`}>
            Room
          </label>
          <div className="flex items-center gap-2">
            <Bed size={16} className="shrink-0 text-gold-400" />
            <select
              id={`room-${tone}-${layout}`}
              value={room}
              disabled={lockRoom}
              onChange={(e) => setRoom(e.target.value)}
              className={`${fieldBase} cursor-pointer appearance-none truncate pr-5 disabled:cursor-default disabled:opacity-100`}
            >
              <option value="" className="text-ink-900">
                Any room or suite
              </option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.slug} className="text-ink-900">
                  {r.name}
                </option>
              ))}
            </select>
            {!lockRoom && <ChevronDown size={16} className={`-ml-6 pointer-events-none ${sub}`} />}
          </div>
          <p className={`mt-1 text-[11px] ${sub}`}>
            {selectedRoom
              ? `From ${formatMoney(selectedRoom.priceCents)} / night`
              : `From ${formatMoney(Math.min(...rooms.map((r) => r.priceCents)))} / night`}
          </p>
        </div>

        {/* CTA */}
        <div className={`${bar ? "col-span-2 lg:col-span-1" : "col-span-2"} flex items-stretch`}>
          <button
            type="submit"
            disabled={nights < 1 || tooManyGuests}
            className="btn-gold w-full rounded-xl px-6 lg:min-w-[150px]"
          >
            <span className="whitespace-nowrap">{ctaLabel}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </form>
  );
}
