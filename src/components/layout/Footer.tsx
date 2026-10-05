"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { HOTEL, NAV_LINKS, whatsappLink } from "@/lib/hotel";
import { ArrowRight, Mail, MapPin, Phone, WhatsApp } from "@/components/ui/Icons";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  return (
    <footer className="no-print relative overflow-hidden bg-ink-950 text-cream-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
      />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-200/60">
            Serving guests in the centre of Adama since {HOTEL.founded}. Rooms, garden restaurant
            and bar, conference halls, sauna, pool and private parking — in the heart of the city.
          </p>
          <div className="mt-7 flex items-center gap-3">
            {[
              { href: HOTEL.phoneHref, label: "Call the front desk", Icon: Phone },
              { href: whatsappLink(), label: "WhatsApp", Icon: WhatsApp },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream-200/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-400"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-500">Explore</h3>
          <ul className="mt-6 space-y-3 text-sm text-cream-200/70">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/booking" className="link-underline hover:text-white">
                Book a stay
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-500">Contact</h3>
          <ul className="mt-6 space-y-4 text-sm text-cream-200/70">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-400" />
              <span>
                {HOTEL.address.street}
                <br />
                {HOTEL.address.city}, {HOTEL.address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold-400" />
              <span>
                <a href={HOTEL.phoneHref} className="hover:text-white">
                  {HOTEL.phone}
                </a>
                <br />
                <a href={HOTEL.phoneAltHref} className="hover:text-white">
                  {HOTEL.phoneAlt}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-gold-400" />
              <a href={`mailto:${HOTEL.email}`} className="break-all hover:text-white">
                {HOTEL.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-500">Newsletter</h3>
          <p className="mt-6 text-sm text-cream-200/60">
            Seasonal offers and hotel news — a few times a year, never more.
          </p>
          {done ? (
            <p className="mt-5 rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-sm text-gold-200">
              Thank you — you&apos;re on the list.
            </p>
          ) : (
            <form onSubmit={subscribe} className="mt-5 flex overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-gold-400">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid w-12 place-items-center bg-gold-500 text-ink-950 transition-colors hover:bg-gold-400"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-[12px] text-cream-200/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {HOTEL.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Photography © {HOTEL.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
