import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInUpProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Fades and slides content up as it enters the viewport.
 * Uses framer-motion's whileInView for scroll-triggered animation.
 */
export function FadeInUp({
  children,
  delay = 0,
  duration = 0.9,
  y = 32,
  once = true,
  amount = 0.2,
  as = "div",
  ...rest
}: FadeInUpProps) {
  const Comp = motion[as] as typeof motion.div;
  // Base delay so the animation has a beat before kicking in
  const BASE_DELAY = 0.25;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay: BASE_DELAY + delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
