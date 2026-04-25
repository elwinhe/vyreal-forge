import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

function MenuIcon({ open }: { open: boolean }) {
  const ease = [0.16, 1, 0.3, 1] as const;
  const duration = 0.4;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="overflow-visible">
      {/* Top bar -> top half of X */}
      <motion.line
        x1="2"
        x2="14"
        y1="4"
        y2="4"
        stroke="currentColor"
        strokeWidth="1.6"
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
        strokeWidth="1.6"
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
        strokeWidth="1.6"
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
  const [dark, setDark] = useState(false);
  const navigate = useTransitionNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-[80] bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <button
          onClick={() => {
            setOpen(false);
            navigate("/");
          }}
          className="display text-2xl md:text-[28px] tracking-display leading-none"
        >
          Vyreal
        </button>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="h-10 w-10 grid place-items-center rounded-full border border-foreground/15 hover:bg-transition1/40 transition-colors"
            title="Dark mode coming soon"
          >
            {dark ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
            className="h-10 px-4 inline-flex items-center gap-2 rounded-full border border-foreground/15 hover:bg-transition1/40 transition-colors"
          >
            <span className="text-sm">{open ? "Close" : "Menu"}</span>
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
            className="overflow-hidden mx-5 md:mx-8 mt-3 rounded-2xl bg-background/85 backdrop-blur-md border border-foreground/10"
          >
            <ul className="py-3">
              {items.map((it, i) => (
                <li key={it.to}>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate(it.to);
                    }}
                    className="w-full text-left px-6 py-4 display text-3xl md:text-5xl tracking-display hover:text-transition2 transition-colors"
                  >
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {it.label}
                    </motion.span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
