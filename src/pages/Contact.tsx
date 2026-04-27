import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { useIsMobile } from "@/hooks/use-mobile";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ySlowRaw = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yFastRaw = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const ySlow = isMobile ? 0 : ySlowRaw;
  const yFast = isMobile ? 0 : yFastRaw;

  return (
    <PageShell>
      <section ref={ref} className="px-5 md:px-8 pt-[120px] md:pt-[160px]">
        <FadeInUp delay={0.1} className="eyebrow body-muted mb-6">
          Contact
        </FadeInUp>

        <motion.h1
          style={{ y: ySlow, fontSize: "clamp(3.8rem, 7vw, 8.5rem)" }}
          className="display tracking-display leading-[0.85] overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Let's Connect.
          </motion.span>
        </motion.h1>

        <motion.div style={{ y: yFast }} className="mt-10 md:mt-16 space-y-4 md:space-y-6">
          <div className="overflow-hidden w-fit">
            <motion.a
              href="mailto:work@strattonlabs.co"
              className="block w-fit display font-light tracking-display leading-[0.9] text-[hsl(var(--muted-ink))] relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[5px] after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: "clamp(1.8rem, 4.5vw, 5.25rem)" }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              work@strattonlabs.co
            </motion.a>
          </div>
          <div className="overflow-hidden w-fit">
            <motion.a
              href="tel:+16692472645"
              className="block w-fit display font-light tracking-display leading-[0.9] text-[hsl(var(--muted-ink))] relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[5px] after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: "clamp(1.8rem, 4.5vw, 5.25rem)" }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              (669) 247-2645
            </motion.a>
          </div>

          <FadeInUp delay={0.7} className="pt-10 md:pt-16">
            <p className="max-w-2xl body-muted font-medium text-xl md:text-2xl">
              Have something to promote? Don't hesitate to reach out.
            </p>
          </FadeInUp>
        </motion.div>
      </section>
    </PageShell>
  );
};

export default Contact;
