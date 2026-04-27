import { useEffect, useRef } from "react";

interface ReelPos {
  style: React.CSSProperties;
  baseTransform: string;
  depth: number;
  delay: string;
  views: string;
}

const REELS: ReelPos[] = [
  {
    style: { top: "8%", left: "6%" },
    baseTransform: "rotate(-6deg)",
    depth: 0.04,
    delay: "0.75s",
    views: "2.4M views",
  },
  {
    style: { top: "6%", right: "8%" },
    baseTransform: "rotate(5deg)",
    depth: 0.03,
    delay: "0.83s",
    views: "1.1M views",
  },
  {
    style: { top: "36%", left: "3%" },
    baseTransform: "rotate(-8deg)",
    depth: 0.06,
    delay: "0.91s",
    views: "3.7M views",
  },
  {
    style: { top: "32%", right: "4%" },
    baseTransform: "rotate(7deg)",
    depth: 0.05,
    delay: "0.99s",
    views: "880K views",
  },
  {
    style: { bottom: "10%", left: "16%" },
    baseTransform: "rotate(-4deg) skewX(4deg)",
    depth: 0.04,
    delay: "1.07s",
    views: "4.2M views",
  },
  {
    style: { bottom: "8%", right: "14%" },
    baseTransform: "rotate(6deg) skewX(-4deg)",
    depth: 0.035,
    delay: "0.50s",
    views: "5.6M views",
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

    const cards = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-reel]"),
    );

    const onMove = (e: MouseEvent) => {
      // Only run parallax once the drawer animation has finished, so we
      // don't fight the @keyframes during mount.
      if (!animatedRef.current) return;
      const rect = hero.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      cards.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0");
        const base = el.style.getPropertyValue("--base-transform");
        el.style.transform = `${base} translate(${dx * depth}px, ${dy * depth}px)`;
      });
    };

    const onLeave = () => {
      cards.forEach((el) => {
        const base = el.style.getPropertyValue("--base-transform");
        el.style.transform = base;
      });
    };

    // Allow keyframe animation to complete (last card delay 0.50s + 1s anim)
    const t = window.setTimeout(() => {
      animatedRef.current = true;
    }, 1600);

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(t);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [heroRef]);

  return (
    <div
      ref={wrapRef}
      className="hero-reels pointer-events-none absolute inset-0 hidden md:block"
      aria-hidden
    >
      {REELS.map((r, i) => (
        <div
          key={i}
          data-reel
          data-depth={r.depth}
          style={{
            ...r.style,
            // typed as any to allow CSS custom property
            ...({ "--base-transform": r.baseTransform } as React.CSSProperties),
            width: 148,
            aspectRatio: "9 / 16",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            background:
              "linear-gradient(135deg, rgba(234,203,185,0.08) 0%, rgba(234,203,185,0) 60%), #0A0A0A",
            transform: r.baseTransform,
            animation: `drawer-rise 1s cubic-bezier(0.16,1,0.3,1) ${r.delay} both`,
          }}
          className="reel-card pointer-events-auto absolute overflow-hidden"
        >
          <div className="absolute inset-0 grid place-items-center">
            <span
              className="uppercase tracking-[0.22em]"
              style={{ color: "#666464", fontSize: 11 }}
            >
              [ reel ]
            </span>
          </div>
          <div className="absolute left-2 bottom-2 z-10">
            <span className="uppercase tracking-[0.18em] text-white/90 text-[10px]">
              {r.views}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
