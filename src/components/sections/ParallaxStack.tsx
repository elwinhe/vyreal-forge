import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Two stacked text rows that scroll at different velocities,
 * producing the "layered drift" effect.
 */
export function ParallaxStack({
  top,
  bottom,
  caption,
}: {
  top: string;
  bottom: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yTop = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yCaption = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ y: yTop }}
        className="display text-[18vw] md:text-[14vw] tracking-display leading-[0.85]"
      >
        {top}
      </motion.div>
      <motion.div
        style={{ y: yBottom }}
        className="display text-[18vw] md:text-[14vw] tracking-display leading-[0.85] text-transition2"
      >
        {bottom}
      </motion.div>
      {caption && (
        <motion.div style={{ y: yCaption }} className="mt-12 md:mt-20 grid grid-cols-12">
          <p className="col-span-12 md:col-span-7 body-muted text-lg md:text-xl">
            {caption}
          </p>
        </motion.div>
      )}
    </div>
  );
}
