import { FadeInUp } from "@/components/motion/FadeInUp";

interface Stat {
  value: string;
  label: string;
  sub: string;
}

const stats: Stat[] = [
  { value: "18M+", label: "Views generated", sub: "Across paid + organic" },
  { value: "51M", label: "Total engagement", sub: "Likes, shares, comments" },
  { value: "4.2M", label: "Single video peak", sub: "Top-performing asset" },
  { value: "3×", label: "Avg ROAS lift", sub: "Vs. brand baseline" },
  { value: "72h", label: "Avg turnaround", sub: "Brief to delivery" },
  { value: "100+", label: "Videos shipped", sub: "Across all clients" },
];

export function Stats() {
  return (
    <section className="py-12 px-5 md:px-8">
      <div
        className="relative w-full rounded-3xl overflow-hidden px-5 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: "hsl(268 50% 4%)" }}
      >
        <FadeInUp
          as="h2"
          className="display text-white text-[10vw] md:text-[6vw] tracking-display leading-[0.9] mb-12 md:mb-20 max-w-4xl"
        >
          Numbers that speak.
        </FadeInUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <FadeInUp
              key={s.label}
              delay={i * 0.08}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-3"
            >
              <div className="display text-white text-5xl md:text-6xl tracking-display leading-none">
                {s.value}
              </div>
              <div className="eyebrow text-white/80">{s.label}</div>
              <div className="text-sm text-white/50 leading-snug">{s.sub}</div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
