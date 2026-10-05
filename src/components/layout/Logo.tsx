import Link from "next/link";

export default function Logo({
  tone = "light",
  compact = false,
  className = "",
}: {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
}) {
  const text = tone === "light" ? "text-cream-50" : "text-ink-900";
  const sub = tone === "light" ? "text-cream-200/60" : "text-ink-500";
  return (
    <Link
      href="/"
      aria-label="Ayu International Hotel — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative grid h-11 w-11 place-items-center">
        <span className="absolute inset-0 rotate-45 rounded-[6px] border border-gold-500/70 transition-transform duration-700 ease-luxe group-hover:rotate-[135deg]" />
        <span className="absolute inset-[5px] rotate-45 rounded-[4px] border border-gold-500/30" />
        <span className="font-display text-xl font-semibold leading-none text-gold-400">A</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[22px] font-semibold tracking-[0.22em] ${text}`}>AYU</span>
          <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.34em] ${sub}`}>
            International Hotel
          </span>
        </span>
      )}
    </Link>
  );
}
