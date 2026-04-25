import { ArrowUpRight } from "lucide-react";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "X / Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="px-5 md:px-8 pt-24 md:pt-40 pb-10">
      <div>
        <div className="display text-[14vw] md:text-[10vw] leading-[0.85] tracking-display">
          Vyreal
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="space-y-2 text-3xl md:text-3xl tracking-tight">
            <a href="mailto:work@vyreal.ai" className="block body-muted hover:text-foreground transition-colors">
              work@vyreal.ai
            </a>
            <a href="tel:+16692472645" className="block body-muted hover:text-foreground transition-colors">
              (669) 247-2645
            </a>
          </div>

          <ul className="flex flex-col gap-2 text-base md:text-lg md:items-end md:text-right">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-transition2 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  <span>{s.label}</span>
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-6 hairline h-px w-full" />
      <div className="pt-4 flex justify-between text-xs body-muted">
        <span>© 2026 Vyreal.ai</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
