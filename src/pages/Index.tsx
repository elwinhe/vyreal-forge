import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { Marquee } from "@/components/sections/Marquee";
import { ProjectCard, PROJECTS } from "@/components/sections/ProjectCard";
import { ParallaxStack } from "@/components/sections/ParallaxStack";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { VideoCardRow } from "@/components/sections/VideoCardRow";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <PageShell>
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* HERO — text anchored upper-center, min 75vh */}
          <section
            className="px-5 md:px-8 pt-[140px] md:pt-[180px] flex flex-col"
            style={{ minHeight: "75vh" }}
          >
            <div className="w-full max-w-6xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="display tracking-display leading-[1.02]"
                style={{ fontSize: "clamp(3.5rem, 5vw, 6rem)" }}
              >
                The ultimate <span className="text-transition2">AI UGC</span> Agency
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 body-muted mx-auto max-w-2xl"
                style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
              >
                Work with our talented team to drive results
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex justify-center"
              >
                <Link
                  to="/contact"
                  className="glass-btn group inline-flex items-center gap-2 px-6 py-3 text-sm md:text-base font-medium"
                >
                  Work with Us
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* 5-card horizontal video row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 md:mt-16 -mx-5 md:-mx-8"
            >
              <VideoCardRow />
            </motion.div>
          </section>

          {/* CLIENT / CREATOR MARQUEE */}
          <section className="mt-12 md:mt-20">
            <FadeInUp className="eyebrow body-muted mb-6 px-5 md:px-8">Who we worked with</FadeInUp>
            <div className="border-y border-foreground/10 py-8">
              <Marquee>
                {["NORTHWAVE", "LUXE / CO", "SERA", "OBELISK", "FORMA", "ATELIER 9", "MONO", "RIVER & OAK"].map(
                  (name, i) => (
                    <div key={i} className="flex items-center gap-16">
                      <span className="display text-3xl md:text-5xl tracking-display text-foreground/65">{name}</span>
                      {i % 2 === 0 && (
                        <span
                          className="h-12 w-12 rounded-full"
                          style={{
                            background: `linear-gradient(135deg,#D9CBE8,#5E3590)`,
                          }}
                          aria-label="Creator avatar"
                        />
                      )}
                    </div>
                  ),
                )}
              </Marquee>
            </div>
          </section>

          {/* STATS */}
          <Stats />

          {/* PROJECTS */}
          <section className="mt-32 md:mt-48 px-5 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10 md:mb-16">
              <FadeInUp
                as="h2"
                className="display text-[12vw] md:text-[14vw] tracking-display leading-[0.85] self-start"
              >
                Projects
              </FadeInUp>
              <FadeInUp
                as="p"
                delay={0.2}
                className="max-w-xl body-muted leading-snug self-end md:self-auto"
                style={{ fontSize: "clamp(16px, 2vw, 28px)", lineHeight: 1.4 }}
              >
                Great things come from shared momentum. You show us your north star, we'll handle the execution, and
                together we make impact at scale.
              </FadeInUp>
            </div>

            {/* Mobile: horizontal scroll. Desktop: 3-col grid. */}
            <div className="md:hidden -mx-5 px-5 overflow-x-auto">
              <div className="flex gap-4 w-max">
                {PROJECTS.slice(0, 4).map((p, i) => (
                  <div key={i} className="w-[55vw] max-w-[280px] max-h-[70vh]">
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:grid grid-cols-3 gap-1 group/cards">
              {PROJECTS.slice(0, 3).map((p, i) => (
                <div key={i} className="transition-all duration-500 group-hover/cards:opacity-60 hover:!opacity-100">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/projects"
                className="glass-btn group inline-flex items-center gap-2 px-6 py-3 text-sm md:text-base font-medium"
              >
                View all projects
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>

          {/* BLURB */}
          <section className="mt-40 md:mt-56 px-5 md:px-8">
            <ParallaxStack
              top="Stratton"
              bottom="real virality"
              caption="We're here to create videos that perform, spanning winning UGC formats at scale. From concept to execution, we work closely with you to orchestrate an end-to-end production process that leaves real impact."
            />
          </section>

          {/* SERVICES */}
          <section className="mt-40 md:mt-56">
            <Services />
          </section>
        </motion.div>
      </PageShell>
    </>
  );
};

export default Index;
