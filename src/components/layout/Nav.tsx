import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useLocation } from "react-router-dom";

const SEEN_KEY = "vyreal_loader_seen";

function MenuIcon({ open }: { open: boolean }) {
  const ease = [0.16, 1, 0.3, 1] as const;
  const duration = 0.4;
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" className="overflow-visible">
      {/* Top bar -> top half of X */}
      <motion.line
        x1="2"
        x2="14"
        y1="4"
        y2="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={open ? { x1: 3, y1: 3, x2: 13, y2: 13 } : { x1: 2, y1: 4, x2: 14, y2: 4 }}
        transition={{ duration, ease }}
      />
      {/* Middle bar fades */}
      <motion.line
        x1="2"
        x2="14"
        y1="8"
        y2="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: duration * 0.6, ease }}
      />
      {/* Bottom bar -> bottom half of X */}
      <motion.line
        x1="2"
        x2="14"
        y1="12"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={open ? { x1: 3, y1: 13, x2: 13, y2: 3 } : { x1: 2, y1: 12, x2: 14, y2: 12 }}
        transition={{ duration, ease }}
      />
    </svg>
  );
}
import { useTransitionNavigate } from "@/components/motion/RouteTransition";

const items = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useTransitionNavigate();
  const location = useLocation();
  // Animate the logo in only on first homepage load (after the loader exits)
  const animateLogo =
    location.pathname === "/" && typeof window !== "undefined" && sessionStorage.getItem(SEEN_KEY) !== "1";

  return (
    <header className="fixed top-2 left-2 right-2 z-[80] bg-background/60 backdrop-blur-2xl border border-foreground/10 rounded-2xl overflow-hidden shadow-[0_8px_24px_-12px_hsl(var(--foreground)/0.18)]">
      <div className="px-5 md:px-8 py-4 md:py-5 flex items-center justify-between relative">
        <button
          onClick={() => {
            setOpen(false);
            navigate("/");
          }}
          className="text-2xl md:text-[28px] leading-[1.15] overflow-hidden py-1 relative z-10"
          style={{ fontFamily: '"Hanken Grotesk", sans-serif', letterSpacing: "-0.02em" }}
        >
          <motion.span
            initial={animateLogo ? { y: "110%" } : false}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <span style={{ fontWeight: 900, fontStyle: "italic" }}>Stratton</span><span style={{ fontWeight: 200, fontStyle: "italic" }}>Labs</span>
          </motion.span>
        </button>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm tracking-wide">
          {items
            .filter((it) => it.to !== "/")
            .map((it) => {
              const isActive = location.pathname.startsWith(it.to);
              return (
                <button
                  key={it.to}
                  onClick={() => {
                    setOpen(false);
                    navigate(it.to);
                  }}
                  className={`transition-opacity hover:opacity-100 ${isActive ? "opacity-100" : "opacity-70"}`}
                >
                  {it.label}
                </button>
              );
            })}
        </nav>

        <div className="flex items-center gap-1 relative z-10">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="h-11 w-11 grid place-items-center transition-colors"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="py-3 list-none">
              {items.map((it, i) => {
                const isActive =
                  it.to === "/" ? location.pathname === "/" : location.pathname.startsWith(it.to);
                return (
                  <li key={it.to} className="border-0">
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate(it.to);
                      }}
                      className={`nav-slide-item w-full text-center px-6 py-4 display text-3xl md:text-5xl tracking-display ${
                        isActive ? "is-active text-transition2" : ""
                      }`}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative inline-block overflow-hidden align-bottom leading-[1.1] pr-[0.12em]"
                      >
                        <span className="nav-slide-current block">{it.label}</span>
                        <span aria-hidden className="nav-slide-incoming absolute left-0 top-0 block w-full pr-[0.12em]">
                          {it.label}
                        </span>
                      </motion.span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
