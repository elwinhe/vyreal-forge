import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageShell } from "@/components/layout/PageShell";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ySlow = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yFast = useTransform(scrollYProgress, [0, 1], [180, -180]);

  return (
    <PageShell>
      <section ref={ref} className="px-5 md:px-8 pt-10 md:pt-16">
        <div className="eyebrow body-muted mb-6">Contact</div>

        <motion.h1 style={{ y: ySlow }} className="display text-[18vw] md:text-[14vw] tracking-display leading-[0.85]">
          Let's Connect.
        </motion.h1>

        <motion.div style={{ y: yFast }} className="mt-6 space-y-4 md:space-y-6">
          <a
            href="mailto:work@vyreal.ai"
            className="block display font-light text-[12vw] md:text-[9vw] tracking-display leading-[0.9] text-foreground story-link"
          >
            work@vyreal.ai
          </a>
          <a
            href="tel:+16692472645"
            className="block display font-light text-[12vw] md:text-[9vw] tracking-display leading-[0.9] text-foreground story-link"
          >
            (669) 247-2645
          </a>

          <div className="pt-10 md:pt-16">
            <p className="max-w-2xl body-muted font-medium text-xl md:text-2xl">
              Have something to promote? Don't hesitate to reach out.
            </p>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
};

export default Contact;
