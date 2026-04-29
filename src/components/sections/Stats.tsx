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
  { value: "Up to 3×", label: "Avg ROAS lift", sub: "Vs. brand baseline" },
  { value: "72h", label: "Avg turnaround", sub: "Brief to delivery" },
  { value: "100+", label: "Videos shipped", sub: "Across all clients" },
];

export function Stats() {
  return (
    <section className="py-12 px-5 md:px-8">
      <div className="relative w-full rounded-3xl overflow-hidden px-5 md:px-12">
        <FadeInUp
          as="h2"
          className="display text-white text-[10vw] md:text-[6vw] tracking-display leading-[0.9] mb-12 md:mb-20 max-w-4xl"
        >
          Numbers that speak.
        </FadeInUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr items-stretch">
          {stats.map((s, i) => (
            <FadeInUp
              key={s.label}
              delay={i * 0.08}
              className="group h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 md:p-10 flex flex-col justify-between gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--transition-2)/0.45),0_0_40px_-10px_hsl(var(--transition-2)/0.3)]"
            >
              <div className="display text-white text-6xl md:text-7xl tracking-display leading-[0.9] font-semibold">{s.value}</div>
              <div className="flex flex-col gap-2">
                <div className="eyebrow text-white/85">{s.label}</div>
                <div className="text-sm text-white/55 leading-snug">{s.sub}</div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
