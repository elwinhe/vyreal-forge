import { motion } from "framer-motion";

export interface Project {
  title: string;
  views: string;
  tag: "AI UGC" | "Face-swap" | "Motion control";
  /** background gradient or image */
  bg: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Glow serum — pour reveal",
    views: "2.4M views",
    tag: "Motion control",
    bg: "linear-gradient(160deg,#CC6329 0%,#7A2E0F 60%,#000 100%)",
  },
  {
    title: "Synthetic creator — fitness vertical",
    views: "1.1M views",
    tag: "AI UGC",
    bg: "linear-gradient(160deg,#EACBB9 0%,#8C5B45 70%,#1A1212 100%)",
  },
  {
    title: "Hook remix — DTC supplement",
    views: "3.7M views",
    tag: "Face-swap",
    bg: "linear-gradient(160deg,#222 0%,#444 50%,#CC6329 100%)",
  },
  {
    title: "Macro pour — fragrance launch",
    views: "880K views",
    tag: "Motion control",
    bg: "linear-gradient(160deg,#0A0A0A 0%,#3a2418 70%,#CC6329 100%)",
  },
  {
    title: "AI talent — skincare ritual",
    views: "1.9M views",
    tag: "AI UGC",
    bg: "linear-gradient(160deg,#EACBB9 0%,#CC6329 100%)",
  },
  {
    title: "Hook A/B — energy drink",
    views: "4.2M views",
    tag: "Face-swap",
    bg: "linear-gradient(160deg,#0A0A0A 0%,#1f1f1f 100%)",
  },
];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <figure className="group relative frame-media aspect-[9/16] w-full overflow-hidden">
      {/* Zoomable video / background layer */}
      <motion.div
        className="absolute inset-0"
        style={{ background: project.bg }}
        initial={false}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* shimmer placeholder */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-overlay"
          style={{ background: "radial-gradient(60% 40% at 30% 20%, rgba(255,255,255,0.25), transparent 60%)" }}
        />
      </motion.div>

      {/* Static overlay UI — does not zoom */}
      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] lg:text-xs xl:text-sm uppercase tracking-[0.18em] text-white/85 bg-black/30 backdrop-blur px-2 py-1 lg:px-3 lg:py-1.5 rounded-full">
          {project.tag}
        </span>
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between z-10">
        <div className="text-[10px] lg:text-xs xl:text-sm uppercase tracking-[0.18em] text-white/95">
          {project.views}
        </div>
        <div className="text-xs lg:text-sm xl:text-base text-white/80 max-w-[55%] text-right leading-tight">
          {project.title}
        </div>
      </figcaption>
    </figure>
  );
}
