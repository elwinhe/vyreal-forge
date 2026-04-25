import { Link } from "react-router-dom";
import { Instagram, Music2, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-5 md:px-8 pt-24 md:pt-40 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="display text-[18vw] md:text-[14vw] leading-[0.85] tracking-display">
            Vyreal
          </div>
          <div className="mt-8 space-y-1 text-sm body-muted">
            <a href="mailto:work@vyreal.ai" className="block hover:text-foreground transition-colors">
              work@vyreal.ai
            </a>
            <a href="tel:+16692472645" className="block hover:text-foreground transition-colors">
              (669) 247-2645
            </a>
          </div>
        </div>

        <div className="md:col-span-5 md:pl-10 flex flex-col md:items-end justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
            <li><Link to="/" className="hover:text-transition2 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-transition2 transition-colors">About us</Link></li>
            <li><Link to="/projects" className="hover:text-transition2 transition-colors">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-transition2 transition-colors">Contact</Link></li>
          </ul>
          <div className="mt-6 flex gap-3 md:justify-end">
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
      </div>

      <div className="mt-12 pt-6 hairline h-px w-full" />
      <div className="pt-4 flex justify-between text-xs body-muted">
        <span>© 2026 Vyreal.ai</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
