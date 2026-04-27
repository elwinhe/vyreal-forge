import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GlassBtnText } from "@/components/ui/GlassBtnText";

/**
 * Centered hero title + subhead + CTA group.
 * Layout-agnostic: parent owns positioning and surrounding visuals.
 */
export function HeroHeadline() {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
      <h1
        className="hero-type display tracking-display leading-[1.18] pb-2"
        style={{ fontSize: "clamp(3.5rem, 5vw, 6rem)" }}
      >
        We're an AI<span className="text-transition2">UGC Sudio</span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 body-muted mx-auto max-w-2xl"
        style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
      >
        Done-for-you UGC that actually performs.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex justify-center"
      >
        <Link
          to="/contact"
          className="glass-btn group inline-flex items-center gap-2 px-6 py-3 text-sm md:text-base font-medium"
        >
          <GlassBtnText>Work with Us</GlassBtnText>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
