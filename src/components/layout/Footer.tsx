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
    <footer className="px-5 md:px-8 pt-24 md:pt-40 pb-8">
      {/* CTA row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
        <div className="max-w-3xl">
          <div className="eyebrow body-muted mb-5">Let's collaborate</div>
          <h2
            className="display tracking-display leading-[0.95]"
            style={{ fontSize: "clamp(2.25rem, 4vw, 4.5rem)" }}
          >
            Have a project in mind?
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate("/contact")}
          className="group inline-flex items-center gap-3 self-start md:self-end px-6 py-3 rounded-full border border-foreground/15 hover:border-foreground/40 transition-colors"
        >
          <span className="text-base md:text-lg font-medium">Start a project</span>
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>

      {/* Hairline divider */}
      <div className="mt-16 md:mt-24 hairline h-px w-full" />

      {/* Wordmark */}
      <div
        className="mt-12 md:mt-16 leading-[0.85]"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          fontSize: "clamp(3.4rem, 9vw, 9rem)",
          letterSpacing: "-0.04em",
        }}
      >
        <span style={{ fontWeight: 900, fontStyle: "italic" }}>Stratton</span>
        <span style={{ fontWeight: 200, fontStyle: "italic" }}>Labs</span>
      </div>

      {/* Link columns */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        {/* Contact */}
        <div className="md:col-span-6 space-y-3">
          <div className="eyebrow body-muted mb-4">Contact</div>
          <a
            href="mailto:work@strattonlabs.co"
            className="block w-fit text-2xl md:text-3xl tracking-tight relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            work@strattonlabs.co
          </a>
          <a
            href="tel:+16692472645"
            className="block w-fit text-2xl md:text-3xl tracking-tight body-muted relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            (669) 247-2645
          </a>
        </div>

        {/* Sitemap */}
        <div className="md:col-span-3">
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
        <div className="md:col-span-3">
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

      {/* Meta row */}
      <div className="mt-20 pt-5 hairline h-px w-full" />
      <div className="pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 sm:justify-between text-xs body-muted">
        <span>© 2026 StrattonLabs — All rights reserved.</span>
        <span>Designed & built in California</span>
      </div>
    </footer>
  );
}
