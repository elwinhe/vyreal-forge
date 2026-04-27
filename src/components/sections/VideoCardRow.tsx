import { useEffect, useRef, useState } from "react";
import reel1 from "@/assets/reels/reel1.mov";
import reel2 from "@/assets/reels/reel2.mov";
import reel3 from "@/assets/reels/reel3.mov";
import reel4 from "@/assets/reels/reel4.mov";
import reel5 from "@/assets/reels/reel5.mov";

interface ReelCard {
  views: string;
  poster?: string;
  src?: string;
}

const CARDS: ReelCard[] = [
  { views: "2.4M views", src: reel1 },
  { views: "1.1M views", src: reel2 },
  { views: "3.7M views", src: reel3 },
  { views: "880K views", src: reel4 },
  { views: "4.2M views", src: reel5 },
];

/**
 * arcads.ai-style horizontal scroll row of 5 portrait reel cards.
 * - drag-to-scroll on desktop
 * - right-edge fade gradient
 * - cards scale on hover
 */
export function VideoCardRow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Drag-to-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add("cursor-grabbing");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };
    const onUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-4 overflow-x-auto cursor-grab select-none px-5 md:px-8 pb-2"
      >
        {CARDS.map((card, i) => {
          const isHovered = hoveredIdx === i;
          const isAdjacent = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative shrink-0 aspect-[9/16] overflow-hidden transition-transform duration-300 ease-out"
              style={{
                width: 200,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(234,203,185,0.08) 0%, rgba(234,203,185,0) 60%), #0A0A0A",
                border: "1px solid rgba(255,255,255,0.08)",
                transform: isHovered
                  ? "scale(1.03)"
                  : isAdjacent
                    ? hoveredIdx! < i
                      ? "translateX(6px)"
                      : "translateX(-6px)"
                    : "none",
              }}
            >
              <video
                src={card.src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={card.poster}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* View count badge */}
              <div className="absolute left-3 bottom-3 z-10">
                <span className="uppercase tracking-[0.18em] text-white/90 text-[10px]">
                  {card.views}
                </span>
              </div>
            </div>
          );
        })}
        {/* Trailing spacer so last card can clear the right fade */}
        <div className="shrink-0 w-8" aria-hidden />
      </div>

      {/* Right-edge fade gradient */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-24"
        style={{
          background:
            "linear-gradient(to left, hsl(var(--background)) 0%, hsl(var(--background) / 0) 100%)",
        }}
      />
    </div>
  );
}
