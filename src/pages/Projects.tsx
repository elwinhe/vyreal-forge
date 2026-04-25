import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectCard, PROJECTS } from "@/components/sections/ProjectCard";

const filters = ["All", "AI UGC", "Face-swap", "Motion control"] as const;

const Projects = () => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === active);

  return (
    <PageShell>
      <section className="px-5 md:px-8 pt-10 md:pt-16">
        <div className="eyebrow body-muted mb-6">Projects</div>
        <h1 className="display text-[20vw] md:text-[14vw] tracking-display leading-[0.85]">
          The reel.
        </h1>
        <div className="mt-10 md:mt-14 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 lg:px-5 lg:py-2.5 rounded-full border text-sm lg:text-base transition-colors ${
                active === f
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/15 hover:bg-transition1/40"
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
