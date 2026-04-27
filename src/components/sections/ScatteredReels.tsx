import { useEffect, useRef } from "react";
import reel1 from "@/assets/reels/reel1.mp4";
import reel2 from "@/assets/reels/reel2.mp4";
import reel3 from "@/assets/reels/reel3.mp4";
import reel4 from "@/assets/reels/reel4.mp4";
import reel5 from "@/assets/reels/reel5.mp4";
import reel6 from "@/assets/reels/reel6.mp4";
import reel1Hi from "@/assets/reels/reel1_hi.mp4";
import reel2Hi from "@/assets/reels/reel2_hi.mp4";
import reel3Hi from "@/assets/reels/reel3_hi.mp4";
import reel4Hi from "@/assets/reels/reel4_hi.mp4";
import reel5Hi from "@/assets/reels/reel5_hi.mp4";
import reel6Hi from "@/assets/reels/reel6_hi.mp4";
import { useVideoLightbox } from "@/components/video/VideoLightbox";

interface ReelPos {
  style: React.CSSProperties;
  baseTransform: string;
  depth: number;
  delay: string;
  views: string;
  src: string;
  srcHi: string;
}

const REELS: ReelPos[] = [
  {
    style: { top: "8%", left: "7%" },
    baseTransform: "rotate(-6deg)",
    depth: 0.04,
    delay: "0.75s",
    views: "2.4M views",
    src: reel1,
    srcHi: reel1Hi,
  },
  {
    style: { top: "6%", right: "8%" },
    baseTransform: "rotate(5deg)",
    depth: 0.03,
    delay: "0.83s",
    views: "1.1M views",
    src: reel2,
    srcHi: reel2Hi,
  },
  {
    style: { top: "36%", left: "3.4%" },
    baseTransform: "rotate(-8deg)",
    depth: 0.06,
    delay: "0.91s",
    views: "3.7M views",
    src: reel3,
    srcHi: reel3Hi,
  },
  {
    style: { top: "32%", right: "4%" },
    baseTransform: "rotate(7deg)",
    depth: 0.05,
    delay: "0.99s",
    views: "880K views",
    src: reel4,
    srcHi: reel4Hi,
  },
  {
    style: { bottom: "9%", left: "16.4%" },
    baseTransform: "rotate(-4deg) skewX(4deg)",
    depth: 0.04,
    delay: "1.07s",
    views: "4.2M views",
    src: reel5,
    srcHi: reel5Hi,
  },
  {
    style: { bottom: "8%", right: "15.2%" },
    baseTransform: "rotate(6deg) skewX(-4deg)",
    depth: 0.035,
    delay: "1.15s",
    views: "5.6M views",
    src: reel6,
    srcHi: reel6Hi,
  },
];

interface Props {
  /** Ref to the hero section element on which we listen for mousemove. */
  heroRef: React.RefObject<HTMLElement>;
}

export function ScatteredReels({ heroRef }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    const wrap = wrapRef.current;
    if (!hero || !wrap) return;

    const cards = Array.from(wrap.querySelectorAll<HTMLElement>("[data-reel]"));

    const onMove = (e: MouseEvent) => {
      // Only run parallax once the drawer animation has finished, so we
      // don't fight the @keyframes during mount.
      if (!animatedRef.current) return;
      const rect = hero.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      cards.forEach((el) => {
        // Skip the hovered card so the CSS :hover transition can play
        // smoothly without the inline transform overwriting it each frame.
        if (el.matches(":hover")) return;
        const depth = parseFloat(el.dataset.depth || "0");
        const base = el.style.getPropertyValue("--base-transform");
        el.style.transform = `${base} translate(${dx * depth}px, ${dy * depth}px)`;
      });
    };

    const onLeave = () => {
      cards.forEach((el) => {
        if (el.matches(":hover")) return;
        const base = el.style.getPropertyValue("--base-transform");
        el.style.transform = base;
      });
    };

    // Allow keyframe animation to complete (last card delay 1.15s + 1s anim).
    // We listen immediately, but suppress parallax writes until the mount
    // animation has settled so we don't fight the @keyframes.
    const t = window.setTimeout(() => {
      animatedRef.current = true;
      // Cancel the running CSS animation so our inline transform takes over
      // cleanly (otherwise the animation's final frame can keep "winning").
      cards.forEach((el) => {
        el.style.animation = "none";
        const base = el.style.getPropertyValue("--base-transform");
        el.style.transform = base;
      });
    }, 2250);

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    // Also listen on window as a fallback — the hero has a vignette ::after
    // overlay (z-index 5) that can swallow mousemove on some browsers.
    window.addEventListener("mousemove", onMove);
    return () => {
      window.clearTimeout(t);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
    };
  }, [heroRef]);

  const { open } = useVideoLightbox();

  return (
    <div ref={wrapRef} className="hero-reels pointer-events-none absolute inset-0 hidden md:block">
      {REELS.map((r, i) => (
        <div
          key={i}
          data-reel
          data-depth={r.depth}
          onClick={() => open({ src: r.srcHi, meta: r.views })}
          style={{
            ...r.style,
            // typed as any to allow CSS custom property
            ...({ "--base-transform": r.baseTransform } as React.CSSProperties),
            width: 148,
            aspectRatio: "9 / 16",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            background: "linear-gradient(135deg, rgba(234,203,185,0.08) 0%, rgba(234,203,185,0) 60%), #0A0A0A",
            transform: r.baseTransform,
            animation: `drawer-rise 1s cubic-bezier(0.16,1,0.3,1) ${r.delay} both`,
          }}
          className="reel-card pointer-events-auto absolute overflow-hidden cursor-pointer"
        >
          <video
            src={r.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-2 bottom-2 z-10">
            <span className="uppercase tracking-[0.18em] text-white/90 text-[10px]">{r.views}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
