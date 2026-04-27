import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectCard, PROJECTS } from "@/components/sections/ProjectCard";
import { FadeInUp } from "@/components/motion/FadeInUp";

const filters = ["All", "AI UGC", "Face-swap", "Motion control"] as const;

const Projects = () => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === active);

  return (
    <PageShell>
      <section className="px-5 md:px-8 pt-[120px] md:pt-[160px]">
        <FadeInUp className="eyebrow body-muted mb-6">Projects</FadeInUp>
        <FadeInUp as="h1" delay={0.15} className="display text-[20vw] md:text-[14vw] tracking-display leading-[0.85]">
          The reel.
        </FadeInUp>
        <div className="mt-10 md:mt-14 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`glass-btn px-5 py-2.5 text-sm sm:text-base font-medium ${
                active === f ? "glass-btn-active" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-24 px-5 md:px-8">
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
