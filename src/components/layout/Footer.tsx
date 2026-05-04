import { ArrowUpRight } from "lucide-react";
import { useTransitionNavigate } from "@/components/motion/RouteTransition";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "X / Twitter", href: "#" },
];

const sitemap = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const navigate = useTransitionNavigate();

  return (
    <footer className="relative px-5 md:px-8 pt-12 md:pt-12 pb-8 overflow-hidden">
      {/* Nebula glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, hsl(275 60% 55% / 0.6), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[460px] w-[460px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, hsl(20 80% 65% / 0.55), transparent 70%)" }}
      />

      {/* CTA row */}
      <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
        <div className="max-w-3xl">
          <div className="eyebrow body-muted mb-5">Let's collaborate</div>
          <h2
            className="font-display tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(2.25rem, 4vw, 4.5rem)" }}
          >
            Have a <span className="text-gradient-nebula">project</span> in mind?
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate("/contact")}
          className="group relative inline-flex items-center gap-2 self-start md:self-end overflow-hidden rounded-full border border-white/20 bg-gradient-nebula px-7 py-3 text-base md:text-lg font-semibold text-white shadow-[0_10px_40px_-8px_hsl(275_60%_55%/0.6)] transition hover:shadow-[0_14px_50px_-6px_hsl(275_70%_60%/0.8)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine"
          />
          <span className="relative z-10">Start a project</span>
          <ArrowUpRight
            size={18}
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>

      {/* Hairline divider */}
      <div className="relative mt-16 md:mt-24 hairline h-px w-full" />

      {/* Logo + link columns row */}
      <div className="relative mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-12">
        {/* Wordmark */}
        <div
          className="leading-[0.85]"
          style={{
            fontFamily: '"Hanken Grotesk", sans-serif',
            fontSize: "clamp(2.25rem, 4vw, 4.5rem)",
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ fontWeight: 900, fontStyle: "italic" }}>Stratton</span>
          <span style={{ fontWeight: 200, fontStyle: "italic" }}>Labs</span>
        </div>

        {/* Right-side columns */}
        <div className="flex gap-12 md:gap-20">
          {/* Sitemap */}
          <div>
            <div className="eyebrow body-muted mb-4">Navigate</div>
            <ul className="flex flex-col gap-2 text-base md:text-lg">
              {sitemap.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className="relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-foreground/40 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <div className="eyebrow body-muted mb-4">Social</div>
            <ul className="flex flex-col gap-2 text-base md:text-lg">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 relative after:content-[''] after:absolute after:left-0 after:right-[18px] after:-bottom-0.5 after:h-px after:bg-foreground/40 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="relative mt-20 pt-5 hairline h-px w-full" />
      <div className="relative pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 sm:justify-between text-xs body-muted">
        <span>© 2026 StrattonLabs — All rights reserved.</span>
        <span>Designed & built in California</span>
      </div>
    </footer>
  );
}
