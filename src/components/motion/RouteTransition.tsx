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
 * - Home ("/"): orange panel + black-with-logo panel (lagged 400ms)
 * - Initial mount on "/": same home intro plays on first paint / refresh
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayedKey, setDisplayedKey] = useState(location.pathname);
  // For the initial mount on "/", start already covered so no flash of content
  const initialOnHome = typeof window !== "undefined" && window.location.pathname === "/";
  const [phase, setPhase] = useState<Phase>(initialOnHome ? "holding" : "idle");
  const [variant, setVariant] = useState<Variant>(initialOnHome ? "home" : "panels");
  // Track whether the current cover came from an initial mount (skip entry sweep)
  const fromInitial = useRef(initialOnHome);
  const isFirst = useRef(true);
  const pendingPath = useRef<string | null>(null);

  const navigateWithTransition = useCallback(
    (to: string) => {
      if (to === location.pathname) return;
      pendingPath.current = to;
      fromInitial.current = false;
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
      fromInitial.current = false;
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

  // When mounting already-covered (initial home load), panels should start at y:0
  // and only animate on reveal. Otherwise, sweep in from below.
  const startCovered = fromInitial.current && covered;

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
        <AnimatePresence>
          {phase !== "idle" && (
            <>
              {/* Layer 1 — peach */}
              <motion.div
                key="panel-peach"
                className="fixed inset-0 z-[100] pointer-events-none bg-transition1"
                initial={{ y: "100%" }}
                animate={covered ? { y: "0%" } : revealing ? { y: "-100%" } : { y: "100%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              />
              {/* Layer 2 — orange, lags slightly */}
              <motion.div
                key="panel-orange"
                className="fixed inset-0 z-[101] pointer-events-none bg-transition2"
                initial={{ y: "100%" }}
                animate={covered ? { y: "0%" } : revealing ? { y: "-100%" } : { y: "100%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: phase === "covering" ? 0.1 : 0.05 }}
              />
            </>
          )}
        </AnimatePresence>
      ) : (
        // Home variant — orange panel covers first, then black-with-logo
        // panel covers 400ms later. On reveal, both slide up off-screen.
        <AnimatePresence>
          {phase !== "idle" && (
            <>
              {/* Orange panel — leads */}
              <motion.div
                key="home-orange"
                className="fixed inset-0 z-[100] pointer-events-none bg-transition2"
                initial={startCovered ? { y: "0%" } : { y: "100%" }}
                animate={covered ? { y: "0%" } : revealing ? { y: "-100%" } : { y: "100%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              />
              {/* Black-with-logo panel — lags by 400ms on cover, leads on reveal */}
              <motion.div
                key="home-cover"
                className="fixed inset-0 z-[101] pointer-events-none bg-loader flex items-center justify-center"
                initial={startCovered ? { y: "0%" } : { y: "100%" }}
                animate={covered ? { y: "0%" } : revealing ? { y: "-100%" } : { y: "100%" }}
                exit={{ y: "-100%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.7, 0, 0.3, 1],
                  delay: phase === "covering" ? 0.2 : 0,
                }}
              >
                <span
                  className="text-[hsl(var(--background))] text-7xl md:text-9xl tracking-display leading-[0.85]"
                  style={{
                    fontFamily: '"neue-haas-grotesk-display", sans-serif',
                    fontWeight: 900,
                    fontStyle: "italic",
                  }}
                >
                  Stratton
                </span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </Ctx.Provider>
  );
}
