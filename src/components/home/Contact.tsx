"use client";

import { useState, type FormEvent } from "react";
import { HOTEL, whatsappLink } from "@/lib/hotel";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check, Clock, Mail, MapPin, Phone, WhatsApp } from "@/components/ui/Icons";

const SUBJECTS = ["Reservations", "Weddings & Events", "Conference & Meetings", "Dining", "Wellness & Sauna", "Other"];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("sending");
    setErrors({});
    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong." });
        setStatus("idle");
        return;
      }
      setStatus("sent");
      formEl.reset();
    } catch {
      setErrors({ form: "Network error — please try again." });
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-cream-50 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title="We would be delighted to hear from you"
          description="Reservations, conferences, weddings or simply a question about Adama — call the 24-hour front desk, message us on WhatsApp or send an e-mail."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Details card */}
          <Reveal direction="left" className="lg:col-span-5">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-cream-50 sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
              <h3 className="font-display text-3xl">Reservations & concierge</h3>
              <ul className="mt-8 space-y-6 text-sm">
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-400"><Phone size={18} /></span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream-200/50">Telephone</p>
                    <a href={HOTEL.phoneHref} className="mt-1 block text-base hover:text-gold-300">{HOTEL.phone}</a>
                    <a href={HOTEL.phoneAltHref} className="block text-cream-200/70 hover:text-gold-300">{HOTEL.phoneAlt}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-400"><Mail size={18} /></span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream-200/50">Email</p>
                    <a href={`mailto:${HOTEL.email}`} className="mt-1 block break-all text-base hover:text-gold-300">{HOTEL.email}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-400"><MapPin size={18} /></span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream-200/50">Address</p>
                    <p className="mt-1 text-base">{HOTEL.address.street}</p>
                    <p className="text-cream-200/70">{HOTEL.address.city}, {HOTEL.address.region}, {HOTEL.address.country}</p>
                    <p className="text-cream-200/70">{HOTEL.address.landmark}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-400"><Clock size={18} /></span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream-200/50">Reception</p>
                    <p className="mt-1 text-base">Open 24 hours</p>
                    <p className="text-cream-200/70">Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}</p>
                  </div>
                </li>
              </ul>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsApp size={20} /> Chat on WhatsApp
              </a>

              <div className="mt-auto grid gap-2 pt-10 text-[12px] text-cream-200/60">
                <p>{HOTEL.openHours}</p>
                <p>Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}</p>
                <p>Replies to e-mail within a few hours, every day.</p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right" delay={100} className="lg:col-span-7">
            <div className="h-full rounded-[2rem] border border-ink-900/10 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(18,17,16,0.3)] sm:p-10">
              {status === "sent" ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center animate-scale-in">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-500/15 text-gold-700">
                    <Check size={30} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-ink-900">Message received</h3>
                  <p className="mt-3 max-w-sm text-sm text-ink-500">
                    Thank you for writing to us. A member of our team will respond shortly — usually within a few hours.
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn-outline-dark btn-sm mt-8">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="field-label text-ink-500">Full name</label>
                    <input id="c-name" name="name" required placeholder="Your name" className="input" aria-invalid={!!errors.name} />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="field-label text-ink-500">Email</label>
                    <input id="c-email" name="email" type="email" required placeholder="you@example.com" className="input" aria-invalid={!!errors.email} />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="field-label text-ink-500">Phone (optional)</label>
                    <input id="c-phone" name="phone" type="tel" placeholder="+251 …" className="input" />
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="field-label text-ink-500">Subject</label>
                    <select id="c-subject" name="subject" defaultValue="Reservations" className="input light-scheme">
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-message" className="field-label text-ink-500">Message</label>
                    <textarea id="c-message" name="message" rows={5} required placeholder="Tell us about your plans…" className="input resize-none" aria-invalid={!!errors.message} />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>
                  {/* Honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  {errors.form && <p className="text-sm text-red-600 sm:col-span-2">{errors.form}</p>}
                  <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                    <p className="text-[11px] text-ink-400">We respect your privacy. No marketing without consent.</p>
                    <button type="submit" disabled={status === "sending"} className="btn-dark">
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
