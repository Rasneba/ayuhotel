import { whatsappLink } from "@/lib/hotel";
import { WhatsApp } from "@/components/ui/Icons";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Book via WhatsApp"
      className="no-print group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-2 pl-2 pr-2 text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.7)] transition-all duration-500 ease-luxe hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/60 animate-pulse-ring" />
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15">
        <WhatsApp size={24} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ease-luxe group-hover:max-w-[180px] group-focus-visible:max-w-[180px]">
        Book via WhatsApp
      </span>
    </a>
  );
}
