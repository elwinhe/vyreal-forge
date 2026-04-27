
import { useRef, useState } from "react";
import { useVideoLightbox } from "@/components/video/VideoLightbox";
import reel1 from "@/assets/reels/reel1_hi.mp4";
import reel2 from "@/assets/reels/reel2_hi.mp4";
import reel3 from "@/assets/reels/reel3_hi.mp4";
import reel4 from "@/assets/reels/reel4_hi.mp4";
import reel5 from "@/assets/reels/reel5_hi.mp4";
import reel6 from "@/assets/reels/reel6_hi.mp4";

export interface Project {
  title: string;
  views: string;
  tag: "AI UGC" | "Face-swap" | "Motion control";
  /** background gradient (fallback while video loads) */
  bg: string;
  /** video source (mp4) */
  src?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Glow serum — pour reveal",
    views: "2.4M views",
    tag: "Motion control",
    bg: "linear-gradient(160deg,#5E3590 0%,#2D1646 60%,#000 100%)",
    src: reel1,
  },
  {
    title: "Synthetic creator — fitness vertical",
    views: "1.1M views",
    tag: "AI UGC",
    bg: "linear-gradient(160deg,#D9CBE8 0%,#7A5C9A 70%,#15101F 100%)",
    src: reel2,
  },
  {
    title: "Hook remix — DTC supplement",
    views: "3.7M views",
    tag: "Face-swap",
    bg: "linear-gradient(160deg,#222 0%,#444 50%,#5E3590 100%)",
    src: reel3,
  },
  {
    title: "Macro pour — fragrance launch",
    views: "880K views",
    tag: "Motion control",
    bg: "linear-gradient(160deg,#0A0A0A 0%,#2A1B3D 70%,#5E3590 100%)",
    src: reel4,
  },
  {
    title: "AI talent — skincare ritual",
    views: "1.9M views",
    tag: "AI UGC",
    bg: "linear-gradient(160deg,#D9CBE8 0%,#5E3590 100%)",
    src: reel5,
  },
  {
    title: "Hook A/B — energy drink",
    views: "4.2M views",
    tag: "Face-swap",
    bg: "linear-gradient(160deg,#0A0A0A 0%,#1f1f1f 100%)",
    src: reel6,
  },
];

export function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { open } = useVideoLightbox();

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  const handleClick = () => {
    if (project.src) {
      pause();
      open({ src: project.src, title: project.title, meta: project.views });
    }
  };

  return (
    <figure
      className="group relative frame-card aspect-[9/16] w-full max-h-[80vh] overflow-hidden cursor-pointer"
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={handleClick}
    >
      {/* Zoomable video / background layer (CSS-only hover scale to avoid
          layer-promoting the card itself, which would break the nav's
          backdrop-blur sampling above it). */}
      <div
        className="absolute inset-0"
        style={{ background: project.bg }}
      >
        {project.src && (
          <video
            ref={videoRef}
            src={project.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}
        {/* shimmer placeholder */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-overlay pointer-events-none"
          style={{ background: "radial-gradient(60% 40% at 30% 20%, rgba(255,255,255,0.25), transparent 60%)" }}
        />
      </div>

      {/* Bottom contrast gradient — sits above the zoom layer, below the text */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none z-[5]"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))" }}
      />

      {/* Static overlay UI — does not zoom */}
      <div className="absolute top-5 right-5 z-10">
        <span className="text-xs lg:text-sm xl:text-base uppercase tracking-[0.18em] text-white/85 bg-black/30 backdrop-blur px-4 py-2 lg:px-5 lg:py-2.5 rounded-full">
          {project.tag}
        </span>
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between z-10">
        <div className="text-xs lg:text-sm xl:text-base uppercase tracking-[0.18em] text-white/95">
          {project.views}
        </div>
        <div className="text-sm lg:text-base xl:text-lg text-white/80 max-w-[55%] text-right leading-tight">
          {project.title}
        </div>
      </figcaption>
    </figure>
  );
}
