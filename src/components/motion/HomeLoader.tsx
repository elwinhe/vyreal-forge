import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function HomeLoader({ onDone }: { onDone?: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const ready = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const minTime = new Promise<void>((res) => setTimeout(res, 900));
    Promise.all([ready, minTime]).then(() => {
      setShow(false);
      setTimeout(() => onDone?.(), 700);
    });
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-loader flex items-center justify-center"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display text-[hsl(var(--background))] text-7xl md:text-9xl"
          >
            Vyreal
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
