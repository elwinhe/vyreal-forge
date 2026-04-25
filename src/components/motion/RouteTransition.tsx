import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

/**
 * Two-step swipe-up route transition:
 * 1. transition1 (#EACBB9) sweeps up ~400ms
 * 2. transition2 (#CC6329) sweeps up over it ~400ms
 * 3. New page rises in as panels exit upward
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayedKey, setDisplayedKey] = useState(location.pathname);
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      setDisplayedKey(location.pathname);
      return;
    }
    setPhase("covering");
    // After both panels have covered the screen, swap content and reveal
    const swap = setTimeout(() => {
      setDisplayedKey(location.pathname);
      setPhase("revealing");
      window.scrollTo(0, 0);
    }, 700);
    const done = setTimeout(() => setPhase("idle"), 1500);
    return () => {
      clearTimeout(swap);
      clearTimeout(done);
    };
  }, [location.pathname]);

  return (
    <>
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
          phase === "covering"
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
          phase === "covering"
            ? { y: "0%" }
            : phase === "revealing"
            ? { y: "-100%" }
            : { y: "100%" }
        }
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: phase === "covering" ? 0.1 : 0.05 }}
      />
    </>
  );
}
