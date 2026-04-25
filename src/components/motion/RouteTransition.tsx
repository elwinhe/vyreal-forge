import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Phase = "idle" | "covering" | "holding" | "revealing";

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
 * Two-step swipe-up route transition with held cover:
 * 1. Cover panels sweep up (~600ms)
 * 2. Hold while covered (~500ms) — navigation happens here
 * 3. Panels sweep up off-screen revealing the new page
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayedKey, setDisplayedKey] = useState(location.pathname);
  const [phase, setPhase] = useState<Phase>("idle");
  const isFirst = useRef(true);
  const pendingPath = useRef<string | null>(null);

  // Imperative navigation that covers first, then navigates while held.
  const navigateWithTransition = useCallback(
    (to: string) => {
      if (to === location.pathname) return;
      pendingPath.current = to;
      setPhase("covering");
    },
    [location.pathname]
  );

  // Cover finished -> hold, perform navigation, then reveal
  useEffect(() => {
    if (phase !== "covering") return;
    // Wait for cover panels to fully cover (~700ms incl. lag)
    const coverTime = setTimeout(() => {
      setPhase("holding");
    }, 750);
    return () => clearTimeout(coverTime);
  }, [phase]);

  useEffect(() => {
    if (phase !== "holding") return;
    // Page is fully covered; perform the actual route change now.
    if (pendingPath.current) {
      navigate(pendingPath.current);
      pendingPath.current = null;
    }
    // Hold for 0.5s then reveal
    const hold = setTimeout(() => {
      setDisplayedKey(location.pathname);
      window.scrollTo(0, 0);
      setPhase("revealing");
    }, 500);
    return () => clearTimeout(hold);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // When location changes after we requested it, swap key once we're in/after holding
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      setDisplayedKey(location.pathname);
      return;
    }
    // External navigation (e.g., back button) without our wrapper: run full sequence
    if (phase === "idle") {
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

  return (
    <Ctx.Provider value={{ navigateWithTransition }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedKey}
          initial={{ y: phase === "revealing" ? 80 : 0, opacity: phase === "revealing" ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Layer 1 — peach */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none bg-transition1"
        initial={{ y: "100%" }}
        animate={
          phase === "covering" || phase === "holding"
            ? { y: "0%" }
            : phase === "revealing"
            ? { y: "-100%" }
            : { y: "100%" }
        }
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
      />
      {/* Layer 2 — orange, lags slightly */}
      <motion.div
        className="fixed inset-0 z-[101] pointer-events-none bg-transition2"
        initial={{ y: "100%" }}
        animate={
          phase === "covering" || phase === "holding"
            ? { y: "0%" }
            : phase === "revealing"
            ? { y: "-100%" }
            : { y: "100%" }
        }
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: phase === "covering" ? 0.1 : 0.05 }}
      />
    </Ctx.Provider>
  );
}
