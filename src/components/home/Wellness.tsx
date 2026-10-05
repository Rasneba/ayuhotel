import { whatsappLink } from "@/lib/hotel";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, Check, Clock, Dumbbell, Pool, Sparkles, Spa } from "@/components/ui/Icons";

const SERVICES = [
  {
    name: "Sauna",
    detail: "Separate men's and women's sauna rooms, free for house guests.",
    Icon: Spa,
  },
  {
    name: "Massage",
    detail: "Relaxing and deep-tissue massage by appointment with the front desk.",
    Icon: Sparkles,
  },
  {
    name: "Gymnasium",
    detail: "Cardio machines and free weights for guests who want to keep training.",
    Icon: Dumbbell,
  },
  {
    name: "Swimming pool",
    detail: "The outdoor pool sits in the middle of the garden, with seating around it.",
    Icon: Pool,
  },
];

const NOTES = [
  "Treatments booked through reception or WhatsApp",
  "Towels provided for the pool and sauna",
  "Children must be accompanied at the pool",
  "Open to house guests every day",
];

export default function Wellness() {
  return (
    <section id="wellness" className="scroll-mt-24 bg-cream-100 py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow">Wellness & Leisure</span>
            <h2 className="display-lg mt-5 text-ink-900">Sauna, massage, gym and the garden pool</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-500 sm:text-base">
              Guests are welcome to use the pool, sauna and gymnasium for the length of their stay. Book a massage
              or a beauty appointment at reception when you arrive — the team will arrange a time that suits your
              day, whether you are travelling for business or resting on the way through the Rift Valley.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-8 grid gap-3 sm:grid-cols-2">
            {NOTES.map((note) => (
              <p key={note} className="flex items-start gap-3 text-sm text-ink-600">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700">
                  <Check size={12} />
                </span>
                {note}
              </p>
            ))}
          </Reveal>

          <Reveal delay={220} className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={whatsappLink("Hello Ayu International Hotel, I would like to book a sauna or massage appointment.")}
              target="_blank"
              rel="noreferrer"
              className="btn-dark"
            >
              Book an appointment <ArrowUpRight size={16} />
            </a>
            <span className="flex items-center gap-2 text-sm text-ink-500">
              <Clock size={16} className="text-gold-600" /> Reception answers 24 hours
            </span>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 120} className="h-full">
              <article className="flex h-full flex-col rounded-[1.5rem] border border-ink-900/10 bg-white p-7 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[0_30px_60px_-30px_rgba(18,17,16,0.3)]">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-cream-100 text-gold-700">
                  <s.Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink-900">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
