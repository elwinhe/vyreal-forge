import { useRef } from "react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectCard, PROJECTS } from "@/components/sections/ProjectCard";
import { ParallaxStack } from "@/components/sections/ParallaxStack";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { ScatteredReels } from "@/components/sections/ScatteredReels";
import { HeroHeadline } from "@/components/sections/HeroHeadline";
import { MobileReelStrip } from "@/components/sections/MobileReelStrip";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassBtnText } from "@/components/ui/GlassBtnText";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  return (
    <PageShell>
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        // No wrapper gap — each section owns its own py-12 spacing.
        className="flex flex-col"
      >
        {/* HERO */}
        <section
          ref={heroRef}
          className="hero-vignette relative px-5 md:px-8 pt-[200px] pb-24 md:pt-0 md:pb-0 flex flex-col md:items-center md:justify-center overflow-hidden"
          style={{ minHeight: "100vh" }}
        >
          <ScatteredReels heroRef={heroRef} />
          <HeroHeadline />
          <div className="md:hidden mt-20">
            <MobileReelStrip />
          </div>
        </section>

        {/* CLIENT / CREATOR MARQUEE */}
        <ClientMarquee />

        {/* STATS */}
        <Stats />

        {/* PROJECTS */}
        <section className="py-12 px-5 md:px-8">
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
              <GlassBtnText>View all projects</GlassBtnText>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* BLURB */}
        <section className="py-12 px-5 md:px-8">
          <ParallaxStack
            top="Stratton"
            bottom="real virality"
            caption="We're here to create videos that perform, spanning winning UGC formats at scale. From concept to execution, we work closely with you to orchestrate an end-to-end production process that leaves real impact."
          />
        </section>

        {/* SERVICES */}
        <Services />
      </motion.div>
    </PageShell>
  );
};

export default Index;
