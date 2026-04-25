import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Phase = "idle" | "covering" | "holding" | "revealing";
type Variant = "panels" | "home";

interface TransitionCtx {
  navigateWithTransition: (to: string) => void;
}

const Ctx = createContext<TransitionCtx | null>(null);

export function useTransitionNavigate() {
  const ctx = useContext(Ctx);
  const navigate = useNavigate();
  return ctx?.navigateWithTransition ?? ((to: string) => navigate(to));
}

/**
 * Two-step route transition with held cover.
 * - Default: peach/orange panel sweep
 * - Home ("/"): clean black screen with Vyreal logo (matches HomeLoader)
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayedKey, setDisplayedKey] = useState(location.pathname);
  const [phase, setPhase] = useState<Phase>("idle");
  const [variant, setVariant] = useState<Variant>("panels");
  const isFirst = useRef(true);
  const pendingPath = useRef<string | null>(null);

  const navigateWithTransition = useCallback(
    (to: string) => {
      if (to === location.pathname) return;
      pendingPath.current = to;
      setVariant(to === "/" ? "home" : "panels");
      setPhase("covering");
    },
    [location.pathname]
  );

  useEffect(() => {
    if (phase !== "covering") return;
    const coverTime = setTimeout(() => setPhase("holding"), 750);
    return () => clearTimeout(coverTime);
  }, [phase]);

  useEffect(() => {
    if (phase !== "holding") return;
    if (pendingPath.current) {
      navigate(pendingPath.current);
      pendingPath.current = null;
    }
    const hold = setTimeout(() => {
      setDisplayedKey(location.pathname);
      window.scrollTo(0, 0);
      setPhase("revealing");
    }, 500);
    return () => clearTimeout(hold);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      setDisplayedKey(location.pathname);
      return;
    }
    if (phase === "idle") {
      setVariant(location.pathname === "/" ? "home" : "panels");
      setPhase("covering");
    }
    if (phase === "holding") {
      setDisplayedKey(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const done = setTimeout(() => setPhase("idle"), 800);
    return () => clearTimeout(done);
  }, [phase]);

  const covered = phase === "covering" || phase === "holding";
  const revealing = phase === "revealing";

  return (
    <Ctx.Provider value={{ navigateWithTransition }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedKey}
          initial={{ y: revealing ? 80 : 0, opacity: revealing ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {variant === "panels" ? (
        <>
          {/* Layer 1 — peach */}
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none bg-transition1"
            initial={{ y: "100%" }}
            animate={covered ? { y: "0%" } : revealing ? { y: "-100%" } : { y: "100%" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
          />
          {/* Layer 2 — orange, lags slightly */}
          <motion.div
            className="fixed inset-0 z-[101] pointer-events-none bg-transition2"
            initial={{ y: "100%" }}
            animate={covered ? { y: "0%" } : revealing ? { y: "-100%" } : { y: "100%" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: phase === "covering" ? 0.1 : 0.05 }}
          />
        </>
      ) : (
        // Home variant — single clean black panel with Vyreal logo
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none bg-loader flex items-center justify-center"
          initial={{ y: "100%" }}
          animate={covered ? { y: "0%" } : revealing ? { y: "-100%" } : { y: "100%" }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={covered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: covered ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="display text-[hsl(var(--background))] text-7xl md:text-9xl tracking-display"
          >
            Vyreal
          </motion.span>
        </motion.div>
      )}
    </Ctx.Provider>
  );
}
