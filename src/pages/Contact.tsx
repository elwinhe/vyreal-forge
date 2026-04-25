import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageShell } from "@/components/layout/PageShell";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ySlow = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yFast = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const yMed = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <PageShell>
      <section ref={ref} className="px-5 md:px-8 pt-10 md:pt-16">
        <div className="eyebrow body-muted mb-6">Contact</div>

        <motion.h1
          style={{ y: ySlow }}
          className="display text-[18vw] md:text-[14vw] tracking-display leading-[0.85]"
        >
          Get in touch.
        </motion.h1>

        <motion.a
          href="mailto:work@vyreal.ai"
          style={{ y: yFast }}
          className="block mt-6 display text-[12vw] md:text-[9vw] tracking-display leading-[0.9] text-transition2 hover:opacity-80 transition-opacity"
        >
          work@vyreal.ai
        </motion.a>

        <motion.a
          href="tel:+16692472645"
          style={{ y: yMed }}
          className="block mt-2 display text-[12vw] md:text-[9vw] tracking-display leading-[0.9] hover:text-transition2 transition-colors"
        >
          (669) 247-2645
        </motion.a>

        <div className="mt-16 md:mt-24 grid grid-cols-12">
          <p className="col-span-12 md:col-span-6 md:col-start-7 body-muted text-lg md:text-xl">
            Have a project in mind? Reach out and we'll discuss the best way to
            move forward.
          </p>
        </div>
      </section>
    </PageShell>
  );
};

export default Contact;
