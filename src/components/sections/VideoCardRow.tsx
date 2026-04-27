import { useEffect, useRef, useState } from "react";
import reel1 from "@/assets/reels/reel1.mp4";
import reel2 from "@/assets/reels/reel2.mp4";
import reel3 from "@/assets/reels/reel3.mp4";
import reel4 from "@/assets/reels/reel4.mp4";
import reel5 from "@/assets/reels/reel5.mp4";
import reel1Hi from "@/assets/reels/reel1_hi.mp4";
import reel2Hi from "@/assets/reels/reel2_hi.mp4";
import reel3Hi from "@/assets/reels/reel3_hi.mp4";
import reel4Hi from "@/assets/reels/reel4_hi.mp4";
import reel5Hi from "@/assets/reels/reel5_hi.mp4";
import { useVideoLightbox } from "@/components/video/VideoLightbox";

interface ReelCard {
  views: string;
  poster?: string;
  src?: string;
  srcHi?: string;
}

const CARDS: ReelCard[] = [
  { views: "2.4M views", src: reel1, srcHi: reel1Hi },
  { views: "1.1M views", src: reel2, srcHi: reel2Hi },
  { views: "3.7M views", src: reel3, srcHi: reel3Hi },
  { views: "880K views", src: reel4, srcHi: reel4Hi },
  { views: "4.2M views", src: reel5, srcHi: reel5Hi },
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
  const { open } = useVideoLightbox();

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
          // Drag-vs-click guard
          const downXRef = { current: 0 } as { current: number };
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onMouseDown={(e) => {
                downXRef.current = e.clientX;
              }}
              onClick={(e) => {
                if (Math.abs(e.clientX - downXRef.current) > 5) return;
                const lightboxSrc = card.srcHi || card.src;
                if (lightboxSrc) open({ src: lightboxSrc, meta: card.views });
              }}
              className="relative shrink-0 aspect-[9/16] overflow-hidden transition-transform duration-300 ease-out cursor-pointer"
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
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* View count badge */}
              <div className="absolute left-3 bottom-3 z-10 pointer-events-none">
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
