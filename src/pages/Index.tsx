import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Marquee } from "@/components/sections/Marquee";
import { ProjectCard, PROJECTS } from "@/components/sections/ProjectCard";
import { ParallaxStack } from "@/components/sections/ParallaxStack";
import { Services } from "@/components/sections/Services";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const reelY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <>
      <PageShell>
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* HERO */}
          <section ref={heroRef} className="px-5 md:px-8 pt-10 md:pt-16">
            <div className="eyebrow body-muted mb-6">AI content studio · The ultimate UGC orchestrator</div>
            <motion.h1
              style={{ y: headlineY }}
              className="display text-[15vw] md:text-[14vw] tracking-display leading-[1]"
            >
              UGC at scale.
            </motion.h1>
            <motion.h1
              style={{ y: headlineY }}
              className="display text-[15vw] md:text-[14vw] tracking-display leading-[1] text-transition2"
            >
              Real results.
            </motion.h1>

            {/* Hero reel placeholder */}
            <motion.div
              style={{ y: reelY }}
              className="mt-12 md:mt-20 frame-media aspect-[16/9] w-full relative"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(120deg,#0A0A0A 0%,#3a2418 35%,#CC6329 70%,#EACBB9 100%)",
                }}
              />
              <div
                className="absolute inset-0 mix-blend-overlay"
                style={{
                  background: "radial-gradient(80% 60% at 30% 30%, rgba(255,255,255,0.35), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center text-white/95">
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-3">
                    [ hero reel — placeholder ]
                  </div>
                  <div className="display text-5xl md:text-8xl tracking-display">real / virality</div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.18em] text-white/80">
                Reel 2026
              </div>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-base md:text-lg border-b border-foreground/30 pb-1 hover:border-transition2 hover:text-transition2 transition-colors"
              >
                Work with Us
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>

          {/* CLIENT / CREATOR MARQUEE */}
          <section className="mt-32 md:mt-48">
            <div className="eyebrow body-muted mb-6 px-5 md:px-8">Who we worked with</div>
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
                          background: `linear-gradient(135deg,#EACBB9,#CC6329)`,
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

          {/* PROJECTS */}
          <section className="mt-32 md:mt-48 px-5 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-16">
              <h2 className="display text-[12vw] md:text-[14vw] tracking-display leading-[0.85] self-start">
                Projects
              </h2>
              <p
                className="max-w-xl body-muted leading-snug self-end md:self-auto"
                style={{ fontSize: "clamp(20px, 2.6vw, 40px)", lineHeight: 1.4 }}
              >
                Great things come from shared momentum. You show us your north star, we'll handle the execution, and
                together we make impact at scale.
              </p>
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
                className="group inline-flex items-center gap-2 text-base md:text-lg border-b border-foreground/30 pb-1 hover:border-transition2 hover:text-transition2 transition-colors"
              >
                View all projects
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>

          {/* BLURB */}
          <section className="mt-40 md:mt-56 px-5 md:px-8">
            <ParallaxStack
              top="Vyreal"
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
