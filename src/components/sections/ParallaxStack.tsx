import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yTextRaw = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yCaptionRaw = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yText = isMobile ? 0 : yTextRaw;
  const yCaption = isMobile ? 0 : yCaptionRaw;

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y: yText }}>
        <div
          className="display tracking-display leading-[0.85]"
          style={{ fontSize: "clamp(3.4rem, 5.8vw, 7rem)" }}
        >
          {top}
        </div>
        <div
          className="display tracking-display leading-[0.85] text-transition2"
          style={{ fontSize: "clamp(3.4rem, 5.8vw, 7rem)" }}
        >
          {bottom}
        </div>
      </motion.div>
      {caption && (
        <motion.div style={{ y: yCaption }} className="mt-12 md:mt-20 grid grid-cols-12">
          <p className="col-span-12 md:col-span-7 body-muted text-lg md:text-xl xl:text-2xl">
            {caption}
          </p>
        </motion.div>
      )}
    </div>
  );
}
