import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectCard, PROJECTS } from "@/components/sections/ProjectCard";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { GlassBtnText } from "@/components/ui/GlassBtnText";

const filters = ["All", "AI UGC", "Face-swap", "Motion control"] as const;

const Projects = () => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === active);

  return (
    <PageShell>
      <section className="py-12 px-5 md:px-8 pt-[120px] md:pt-[160px]">
        <FadeInUp className="eyebrow body-muted mb-6">Projects</FadeInUp>
        <FadeInUp
          as="h1"
          delay={0.15}
          className="display tracking-display leading-[0.85]"
          style={{ fontSize: "clamp(3.4rem, 5.8vw, 7rem)" }}
        >
          The reel.
        </FadeInUp>
      </section>

      <section className="py-12 px-5 md:px-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`glass-btn inline-flex items-center justify-center px-5 py-2.5 text-sm sm:text-base font-medium leading-none ${
                active === f ? "glass-btn-active" : ""
              }`}
            >
              <GlassBtnText>{f}</GlassBtnText>
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {list.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
};

export default Projects;
