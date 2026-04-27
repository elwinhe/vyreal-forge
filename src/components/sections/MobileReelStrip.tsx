import { motion } from "framer-motion";
import { VideoCardRow } from "@/components/sections/VideoCardRow";

/**
 * Mobile-only horizontal scrolling reel strip.
 * Hidden on md and up. Bleeds to viewport edges via -mx-5.
 */
export function MobileReelStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="md:hidden -mx-5 relative z-10"
    >
      <VideoCardRow />
    </motion.div>
  );
}
