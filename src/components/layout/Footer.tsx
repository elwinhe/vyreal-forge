import { Link } from "react-router-dom";
import { Instagram, Music2, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-5 md:px-8 pt-24 md:pt-40 pb-10">
      <div>
        <div className="display text-[14vw] md:text-[10vw] leading-[0.85] tracking-display">
          Vyreal
        </div>
        <div className="mt-8 space-y-2 text-xl md:text-2xl">
          <a href="mailto:work@vyreal.ai" className="block body-muted hover:text-foreground transition-colors">
            work@vyreal.ai
          </a>
          <a href="tel:+16692472645" className="block body-muted hover:text-foreground transition-colors">
            (669) 247-2645
          </a>
        </div>
      </div>

      <div className="mt-12 flex items-start justify-between gap-6">
        <ul className="flex flex-col gap-2 text-sm">
          <li><Link to="/" className="hover:text-transition2 transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-transition2 transition-colors">About us</Link></li>
          <li><Link to="/projects" className="hover:text-transition2 transition-colors">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-transition2 transition-colors">Contact</Link></li>
        </ul>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full border border-foreground/15 hover:bg-transition1/40 transition-colors">
            <Instagram size={16} />
          </a>
          <a href="#" aria-label="TikTok" className="h-10 w-10 grid place-items-center rounded-full border border-foreground/15 hover:bg-transition1/40 transition-colors">
            <Music2 size={16} />
          </a>
          <a href="#" aria-label="X" className="h-10 w-10 grid place-items-center rounded-full border border-foreground/15 hover:bg-transition1/40 transition-colors">
            <Twitter size={16} />
          </a>
        </div>
      </div>

      <div className="mt-12 pt-6 hairline h-px w-full" />
      <div className="pt-4 flex justify-between text-xs body-muted">
        <span>© 2026 Vyreal.ai</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
