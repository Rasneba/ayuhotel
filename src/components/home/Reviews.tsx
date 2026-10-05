"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import type { Review } from "@/db/schema";
import Reveal from "@/components/ui/Reveal";
import { Check, ChevronLeft, ChevronRight, Quote, Star } from "@/components/ui/Icons";

const FLAGS: Record<string, string> = {
  Ethiopia: "🇪🇹", Kenya: "🇰🇪", Germany: "🇩🇪", Nigeria: "🇳🇬", France: "🇫🇷", China: "🇨🇳",
  "United Kingdom": "🇬🇧", "United Arab Emirates": "🇦🇪", "United States": "🇺🇸", Italy: "🇮🇹",
  Spain: "🇪🇸", India: "🇮🇳", Japan: "🇯🇵", "South Africa": "🇿🇦", Egypt: "🇪🇬", Turkey: "🇹🇷",
  Netherlands: "🇳🇱", Sweden: "🇸🇪", Canada: "🇨🇦", Australia: "🇦🇺", Brazil: "🇧🇷", Djibouti: "🇩🇯",
  Sudan: "🇸🇩", Uganda: "🇺🇬", Tanzania: "🇹🇿", Rwanda: "🇷🇼", "Saudi Arabia": "🇸🇦", Qatar: "🇶🇦",
  Israel: "🇮🇱", Jordan: "🇯🇴", Belgium: "🇧🇪", Switzerland: "🇨🇭", Norway: "🇳🇴", Korea: "🇰🇷",
};
const flagFor = (country: string) => FLAGS[country] ?? "🌍";
const STAY_TYPES = ["Business", "Couple", "Family", "Solo", "Event"];

function Stars({ value, size = 14, className = "" }: { value: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} className={n <= Math.round(value) ? "fill-gold-400 text-gold-400" : "text-white/20"} />
      ))}
    </span>
  );
}

function formatWhen(date: Date | string) {
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date(date));
}

type Props = { reviews: Review[]; stats: { average: number; total: number } };

export default function Reviews({ reviews: initial, stats: initialStats }: Props) {
  const [reviews, setReviews] = useState(initial);
  const [stats, setStats] = useState(initialStats);
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const distribution = useMemo(() => {
    const d = [0, 0, 0, 0, 0];
    reviews.forEach((r) => (d[5 - r.rating] += 1));
    return d;
  }, [reviews]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: (card?.offsetWidth ?? 360) * dir + 24 * dir, behavior: "smooth" });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    const form = new FormData(e.currentTarget);
    const payload = {
      guestName: form.get("guestName"),
      country: form.get("country"),
      stayType: form.get("stayType"),
      title: form.get("title"),
      body: form.get("body"),
      rating,
    };
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong." });
        return;
      }
      const created = data.review as Review;
      setReviews((prev) => [created, ...prev]);
      setStats((prev) => ({
        total: prev.total + 1,
        average: (prev.average * prev.total + created.rating) / (prev.total + 1),
      }));
      setSuccess(true);
      setFormOpen(false);
      trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    } catch {
      setErrors({ form: "Network error — please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden bg-ink-900 py-24 text-cream-50 lg:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow">Guest Reviews</span>
            <h2 className="display-lg mt-5">What guests tell us</h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-200/65 sm:text-base">
              Feedback from guests who stayed with us, and from our public listings. If something was not right,
              the front desk will put it right — day or night.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-6">
                <div>
                  <p className="font-display text-6xl font-light leading-none text-gold-gradient">{stats.average.toFixed(1)}</p>
                  <Stars value={stats.average} className="mt-2" />
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-cream-200/60">
                    {stats.total} guest reviews{stats.total === 1 ? "" : "s"}
                  </p>
                </div>
                <ul className="flex-1 space-y-1.5">
                  {distribution.map((n, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-cream-200/60">
                      <span className="w-3 tabular-nums">{5 - i}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-gold-400 transition-all duration-1000"
                          style={{ width: `${reviews.length ? (n / reviews.length) * 100 : 0}%` }}
                        />
                      </span>
                      <span className="w-4 text-right tabular-nums">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Carousel */}
        <div className="relative mt-14">
          <div
            ref={trackRef}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0"
          >
            {reviews.map((r) => (
              <article
                key={r.id}
                data-card
                className="group relative flex w-[85vw] max-w-[420px] shrink-0 snap-start flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 transition-all duration-500 hover:border-gold-500/40 hover:bg-white/[0.07] sm:w-[400px]"
              >
                <Quote size={28} className="absolute right-6 top-6 text-gold-500/30" />
                <Stars value={r.rating} />
                <h3 className="mt-4 font-display text-2xl leading-snug text-cream-50">{r.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-200/70">{r.body}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500/15 font-display text-lg text-gold-300">
                    {r.guestName.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-cream-50">{r.guestName}</p>
                    <p className="text-[11px] text-cream-200/55">
                      {flagFor(r.country)} {r.country} · {r.stayType} · {formatWhen(r.createdAt)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold-400 hover:text-gold-300">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold-400 hover:text-gold-300">
                <ChevronRight size={20} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setFormOpen((v) => !v);
                setSuccess(false);
              }}
              aria-expanded={formOpen}
              className="btn-outline-light btn-sm"
            >
              {formOpen ? "Close" : "Share your experience"}
            </button>
          </div>
        </div>

        {success && (
          <p className="mt-6 flex items-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-sm text-gold-200 animate-slide-down">
            <Check size={16} /> Thank you — your review is now live.
          </p>
        )}

        {formOpen && (
          <form onSubmit={submit} className="glass mt-8 grid gap-5 rounded-[1.5rem] p-6 animate-slide-down sm:grid-cols-2 sm:p-8" noValidate>
            <div className="sm:col-span-2">
              <p className="field-label text-gold-300">Your rating</p>
              <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    aria-label={`${n} star${n === 1 ? "" : "s"}`}
                    aria-pressed={rating === n}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star size={26} className={n <= (hover || rating) ? "fill-gold-400 text-gold-400" : "text-white/25"} />
                  </button>
                ))}
              </div>
            </div>
            <Field label="Full name" name="guestName" error={errors.guestName} placeholder="Your name" />
            <Field label="Country" name="country" error={errors.country} placeholder="Where are you from?" />
            <div>
              <label htmlFor="review-stay" className="field-label text-gold-300">Type of stay</label>
              <select id="review-stay" name="stayType" defaultValue="Couple" className="input-dark dark-scheme">
                {STAY_TYPES.map((s) => (
                  <option key={s} value={s} className="text-ink-900">{s}</option>
                ))}
              </select>
            </div>
            <Field label="Headline" name="title" error={errors.title} placeholder="Sum it up in a line" />
            <div className="sm:col-span-2">
              <label htmlFor="review-body" className="field-label text-gold-300">Your review</label>
              <textarea id="review-body" name="body" rows={4} placeholder="What made your stay memorable?" className="input-dark resize-none" />
              {errors.body && <p className="mt-1 text-xs text-red-300">{errors.body}</p>}
            </div>
            {errors.form && <p className="text-sm text-red-300 sm:col-span-2">{errors.form}</p>}
            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="btn-gold">
                {submitting ? "Publishing…" : "Publish review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, name, error, placeholder }: { label: string; name: string; error?: string; placeholder: string }) {
  const id = `review-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label text-gold-300">{label}</label>
      <input id={id} name={name} placeholder={placeholder} className="input-dark" aria-invalid={!!error} />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
