"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HOTEL, NAV_LINKS, whatsappLink } from "@/lib/hotel";
import { Close, Menu, Phone, WhatsApp } from "@/components/ui/Icons";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const transparentOnTop = pathname === "/" || pathname.startsWith("/rooms/");
  const solid = !transparentOnTop || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
          solid
            ? "border-b border-white/10 bg-ink-950/80 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "bg-gradient-to-b from-black/50 to-transparent py-5"
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-[12px] font-semibold uppercase tracking-[0.22em] text-cream-100/85 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={HOTEL.phoneHref}
              className="flex items-center gap-2 text-[12px] font-medium tracking-wide text-cream-100/80 transition-colors hover:text-white"
            >
              <Phone size={16} className="text-gold-400" />
              {HOTEL.phone}
            </a>
            <Link href="/booking" className="btn-gold btn-sm">
              Book Now
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/booking" className="btn-gold btn-sm hidden sm:inline-flex">
              Book
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-cream-50 backdrop-blur-md transition-colors hover:bg-white/10"
            >
              {open ? <Close size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-0 z-40 flex flex-col bg-ink-950 text-cream-50 transition-all duration-500 ease-luxe lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 10%, rgba(197,161,89,0.25), transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(197,161,89,0.12), transparent 60%)",
          }}
        />
        <div className="relative flex h-full flex-col px-7 pb-10 pt-28">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                className={`flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-light transition-all duration-700 ease-luxe ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {link.label}
                <span className="text-xs tracking-[0.3em] text-gold-500">0{i + 1}</span>
              </Link>
            ))}
          </nav>

          <div
            className={`mt-auto space-y-5 transition-all delay-500 duration-700 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <Link href="/booking" onClick={close} className="btn-gold w-full">
              Reserve your stay
            </Link>
            <div className="flex items-center justify-between text-sm text-cream-200/70">
              <a href={HOTEL.phoneHref} className="flex items-center gap-2">
                <Phone size={16} className="text-gold-400" /> {HOTEL.phone}
              </a>
              <div className="flex items-center gap-4">
                <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <WhatsApp size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
