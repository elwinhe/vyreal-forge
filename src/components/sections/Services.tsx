import { useState } from "react";

interface Service {
  num: string;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    num: "01",
    title: "Motion control",
    desc: "Precision-rigged camera moves on real product. Hero shots, pours, reveals.",
  },
  {
    num: "02",
    title: "Full AI",
    desc: "Synthetic talent, voice, and scene from a script. Iterate in hours, not days.",
  },
  {
    num: "03",
    title: "Face-swap",
    desc: "Recreate proven hooks with new characters and your product placement.",
  },
];

export function Services() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="px-5 md:px-8">
      <div className="eyebrow body-muted mb-6">Services</div>
      <div>
        {services.map((s, i) => (
          <div
            key={s.num}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="relative grid grid-cols-12 gap-4 py-10 md:py-14 border-t border-foreground/10 transition-colors duration-500"
            style={{
              backgroundColor: hover === i ? "hsl(var(--transition-1) / 0.35)" : "transparent",
            }}
          >
            <div className="col-span-2 md:col-span-1 text-sm body-muted pl-2">{s.num}</div>
            <div className="col-span-10 md:col-span-6 display text-4xl md:text-7xl tracking-display leading-[0.95]">
              {s.title}
            </div>
            <div className="col-start-3 md:col-start-8 col-span-10 md:col-span-5 body-muted text-base md:text-lg max-w-md">
              {s.desc}
            </div>
          </div>
        ))}
        <div className="border-t border-foreground/10" />
      </div>
    </section>
  );
}
