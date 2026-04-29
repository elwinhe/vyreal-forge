import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassBtnText } from "@/components/ui/GlassBtnText";
import { useTransitionNavigate } from "@/components/motion/RouteTransition";

/**
 * Centered hero title + subhead + CTA group.
 * Layout-agnostic: parent owns positioning and surrounding visuals.
 */
export function HeroHeadline() {
  const navigate = useTransitionNavigate();
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto text-center py-12 md:py-20">
      <h1
        className="hero-type display tracking-display leading-[1.18] pb-2"
        style={{ fontSize: "clamp(3.4rem, 5.8vw, 7rem)" }}
      >
        The AI Content <span className="text-transition2">Studio</span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 md:mt-6 body-muted font-medium mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl"
      >
        Done-for-you marketing that actually performs.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 md:mt-16 flex justify-center"
      >
        <button
          type="button"
          onClick={() => navigate("/contact")}
          className="glass-btn group inline-flex items-center gap-2 px-6 py-3 text-md md:text-lg font-medium"
        >
          <GlassBtnText>Work with Us</GlassBtnText>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}
