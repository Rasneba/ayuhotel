"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Close, ZoomIn, ZoomOut } from "@/components/ui/Icons";

export type LightboxImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption?: string;
  category?: string;
};

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const SWIPE_THRESHOLD = 48;

export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const open = index !== null && images.length > 0;
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [loaded, setLoaded] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDirection(delta > 0 ? "right" : "left");
      setZoomed(false);
      setLoaded(false);
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      const el = lastFocused.current as HTMLElement | null;
      el?.focus?.();
    };
  }, [open, go, onClose]);

  // Preload neighbours for instant navigation.
  useEffect(() => {
    if (index === null) return;
    [1, -1].forEach((d) => {
      const img = images[(index + d + images.length) % images.length];
      if (!img) return;
      const el = new window.Image();
      el.src = `${img.src}?auto=compress&cs=tinysrgb&w=1280`;
    });
  }, [index, images]);

  useEffect(() => {
    if (index === null) return;
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-idx="${index}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const updateOrigin = (clientX: number, clientY: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({
      x: Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)),
    });
  };

  const toggleZoom = (e?: MouseEvent) => {
    if (e) updateOrigin(e.clientX, e.clientY);
    setZoomed((z) => !z);
  };

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchMove = (e: TouchEvent) => {
    if (zoomed) {
      const t = e.touches[0];
      updateOrigin(t.clientX, t.clientY);
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart.current || zoomed) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
  };

  if (!mounted || !open || index === null) return null;
  const current = images[index];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${current.alt}`}
      className="fixed inset-0 z-[100] flex flex-col bg-ink-950/95 text-cream-50 backdrop-blur-md animate-fade-in"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400">
            {current.category ?? "Gallery"} · {index + 1} / {images.length}
          </p>
          <p className="truncate text-sm text-cream-100/80">{current.caption ?? current.alt}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => toggleZoom()}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            aria-pressed={zoomed}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
          >
            {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
          </button>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
          >
            <Close size={22} />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/40 backdrop-blur transition-all hover:border-gold-400 hover:text-gold-300 sm:grid lg:left-6 lg:h-14 lg:w-14"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={frameRef}
          key={`${current.src}-${index}`}
          onClick={toggleZoom}
          onMouseMove={(e) => zoomed && updateOrigin(e.clientX, e.clientY)}
          className={`relative flex max-h-full max-w-full items-center justify-center ${
            direction === "right" ? "animate-lb-right" : "animate-lb-left"
          } ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        >
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-gold-400" />
            </div>
          )}
          <Image
            src={current.src}
            alt={current.alt}
            width={current.w}
            height={current.h}
            sizes="100vw"
            draggable={false}
            onLoad={() => setLoaded(true)}
            style={{
              transform: zoomed ? "scale(2.2)" : "scale(1)",
              transformOrigin: `${origin.x}% ${origin.y}%`,
            }}
            className={`h-auto w-auto max-h-[calc(100svh-190px)] max-w-full select-none rounded-lg object-contain shadow-2xl transition-[transform,opacity] duration-500 ease-luxe ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/40 backdrop-blur transition-all hover:border-gold-400 hover:text-gold-300 sm:grid lg:right-6 lg:h-14 lg:w-14"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="px-4 pb-4 pt-2 sm:px-6">
        <p className="mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-cream-100/40 sm:hidden">
          Swipe to browse · Tap to zoom
        </p>
        <div ref={thumbsRef} className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              data-idx={i}
              onClick={() => {
                setDirection(i > index ? "right" : "left");
                setZoomed(false);
                setLoaded(false);
                onIndexChange(i);
              }}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition-all duration-300 sm:h-14 sm:w-20 ${
                i === index ? "ring-2 ring-gold-400 opacity-100" : "opacity-45 hover:opacity-90"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
