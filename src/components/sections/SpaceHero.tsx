import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StarField } from "./StarField";
import { CometCard } from "./CometCard";
import { useTransitionNavigate } from "@/components/motion/RouteTransition";

import clip1 from "@/assets/videos/clips/clip-1.mp4";
import clip2 from "@/assets/videos/clips/clip-2.mp4";
import clip3 from "@/assets/videos/clips/clip-3.mp4";
import clip4 from "@/assets/videos/clips/clip-4.mp4";
import clip5 from "@/assets/videos/clips/clip-5.mp4";
import clip6 from "@/assets/videos/clips/clip-6.mp4";
import clip7 from "@/assets/videos/clips/clip-7.mp4";

const allClips = [clip1, clip2, clip3, clip4, clip5, clip6, clip7];

// Cards comet in around the headline (timing from uploaded export).
const CARDS_IN = 1.8;

const cards = [
  {
    startIndex: 0,
    cycleOffset: 0,
    views: "2.4M VIEWS",
    finalX: "4%",
    finalY: "10%",
    rotation: -8,
    width: 120,
    delay: CARDS_IN + 0.0,
    originX: "-120vw",
    originY: "-60vh",
    depth: 0.04,
  },
  {
    startIndex: 1,
    cycleOffset: 1250,
    views: "1.1M VIEWS",
    finalX: "84%",
    finalY: "8%",
    rotation: 9,
    width: 120,
    delay: CARDS_IN + 0.15,
    originX: "120vw",
    originY: "-60vh",
    zIndex: 50,
    depth: 0.03,
  },
  {
    startIndex: 2,
    cycleOffset: 2500,
    views: "3.7M VIEWS",
    finalX: "10%",
    finalY: "55%",
    rotation: 6,
    width: 130,
    delay: CARDS_IN + 0.3,
    originX: "-120vw",
    originY: "20vh",
    depth: 0.06,
  },
  {
    startIndex: 3,
    cycleOffset: 3750,
    views: "880K VIEWS",
    finalX: "78%",
    finalY: "53%",
    rotation: -8,
    width: 130,
    delay: CARDS_IN + 0.45,
    originX: "120vw",
    originY: "10vh",
    depth: 0.05,
  },
];

export function SpaceHero() {
  const navigate = useTransitionNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [readyCards, setReadyCards] = useState(0);
  const cardsReady = !isDesktop || readyCards >= cards.length;
  const parallaxArmedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isDesktop || cardsReady) return;
    const fallback = window.setTimeout(() => setReadyCards(cards.length), 2800);
    return () => window.clearTimeout(fallback);
  }, [cardsReady, isDesktop]);

  const handleCardReady = useCallback(() => {
    setReadyCards((n) => Math.min(n + 1, cards.length));
  }, []);

  // Arm mouse parallax only after the comet-in animation has settled,
  // so the inline transform we apply doesn't fight framer-motion's drift.
  useEffect(() => {
    if (!cardsReady || !isDesktop) return;
    const t = window.setTimeout(() => {
      parallaxArmedRef.current = true;
    }, 1600);
    return () => window.clearTimeout(t);
  }, [cardsReady, isDesktop]);

  // Subtle mouse parallax on the four comet cards.
  useEffect(() => {
    if (!isDesktop) return;
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    const onMove = (e: MouseEvent) => {
      if (!parallaxArmedRef.current) return;
      const rect = hero.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      const nodes = stage.querySelectorAll<HTMLElement>("[data-comet-parallax]");
      nodes.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0");
        el.style.transform = `translate3d(${dx * depth}px, ${dy * depth}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <StarField />

      {/* Planet horizon arc — top half visible behind the headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-[8vh] z-0 -translate-x-1/2 overflow-hidden"
        style={{ height: "130vw", width: "260vw" }}
      >
        <div className="relative h-[260vw] w-full">
          <div className="planet-glow absolute inset-0 rounded-full" />
          <div className="planet-horizon absolute inset-0 rounded-full" />
        </div>
      </div>

      {/* Hero stage */}
      <div
        ref={stageRef}
        className="relative mx-auto max-w-7xl px-6 md:px-8 pt-28 md:pt-24 pb-20"
        style={{ minHeight: "100vh" }}
      >
        {isDesktop && (
          <div className="absolute inset-0 hidden md:block">
            {cards.map((c, i) => (
              <div
                key={i}
                data-comet-parallax
                data-depth={c.depth}
                className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
                style={{ zIndex: c.zIndex ?? 20 }}
              >
                <CometCard
                  clips={allClips}
                  onFirstReady={handleCardReady}
                  startAnimation={cardsReady}
                  canLoad={i <= readyCards}
                  startIndex={c.startIndex}
                  cycleOffset={c.cycleOffset}
                  views={c.views}
                  finalX={c.finalX}
                  finalY={c.finalY}
                  rotation={c.rotation}
                  width={c.width}
                  delay={c.delay}
                  originX={c.originX}
                  originY={c.originY}
                  zIndex={c.zIndex}
                />
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            className="hero-text-glow font-display text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            The New Way <br />
            to <span className="text-gradient-nebula">Market</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="mt-6 max-w-xl text-base text-foreground/85 md:text-lg"
          >
            Done-for-you marketing that actually performs.
          </motion.p>

          <motion.button
            type="button"
            onClick={() => navigate("/contact")}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.35, duration: 0.5, ease: "backOut" }}
            className="group relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-gradient-nebula px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_hsl(275_60%_55%/0.6)] transition hover:shadow-[0_14px_50px_-6px_hsl(275_70%_60%/0.8)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine"
            />
            <span className="relative z-10">Work with Us</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition group-hover:translate-x-0.5" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            className="mt-6 flex items-center gap-2 text-xs text-foreground/60"
          >
            <span className="flex -space-x-1.5">
              <span className="h-5 w-5 rounded-full border border-white/20 bg-gradient-to-br from-[hsl(275_55%_65%)] to-[hsl(280_60%_45%)]" />
              <span className="h-5 w-5 rounded-full border border-white/20 bg-gradient-to-br from-[hsl(220_60%_70%)] to-[hsl(260_60%_50%)]" />
              <span className="h-5 w-5 rounded-full border border-white/20 bg-gradient-to-br from-[hsl(35_70%_70%)] to-[hsl(15_70%_55%)]" />
            </span>
            <span>Trusted by 40+ brands · 120M+ views generated</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
