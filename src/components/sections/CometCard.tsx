import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface CometCardProps {
  clips: string[];
  startIndex?: number;
  cycleOffset?: number;
  views: string;
  finalX: string;
  finalY: string;
  rotation: number;
  width: number;
  delay: number;
  originX: string;
  originY: string;
  zIndex?: number;
  onFirstReady?: () => void;
  startAnimation?: boolean;
  canLoad?: boolean;
}

const CYCLE_MS = 5000;
const CLIP_START = 8;
const CLIP_END = 12;

export function CometCard({
  clips,
  startIndex = 0,
  cycleOffset = 0,
  views,
  finalX,
  finalY,
  rotation,
  width,
  delay,
  originX,
  originY,
  zIndex,
  onFirstReady,
  startAnimation = true,
  canLoad = true,
}: CometCardProps) {
  const [clipIndex, setClipIndex] = useState(startIndex);
  const [isVisible, setIsVisible] = useState(false);
  const hasReportedReady = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only start fetching/cycling once the card is near the viewport AND parent allows it.
  useEffect(() => {
    if (!canLoad) return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [canLoad]);

  // Cycle clips every 5s only after the card has started loading.
  useEffect(() => {
    if (!isVisible) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setClipIndex((i) => (i + 1) % clips.length);
      interval = setInterval(() => {
        setClipIndex((i) => (i + 1) % clips.length);
      }, CYCLE_MS);
    }, cycleOffset);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [clips.length, cycleOffset, isVisible]);

  // Loop a segment between 8s and 12s and keep it playing.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const seekToStart = () => {
      try {
        v.currentTime = CLIP_START;
      } catch {}
      v.play().catch(() => {});
    };

    const reportReady = () => {
      if (!hasReportedReady.current) {
        hasReportedReady.current = true;
        onFirstReady?.();
      }
    };

    const onLoaded = () => {
      seekToStart();
      reportReady();
    };
    const onTimeUpdate = () => {
      if (v.currentTime >= CLIP_END || v.currentTime < CLIP_START - 0.1) {
        try {
          v.currentTime = CLIP_START;
        } catch {}
      }
    };

    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("canplay", reportReady);
    v.addEventListener("timeupdate", onTimeUpdate);

    if (v.readyState >= 2) onLoaded();

    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("canplay", reportReady);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [clipIndex, onFirstReady]);

  // Angle of incoming trajectory — trail extends back toward the origin.
  const trailAngle = useMemo(() => {
    const num = (s: string) => parseFloat(s) || 0;
    const ox = num(originX);
    const oy = num(originY);
    // angle from card (0,0) pointing back toward origin
    return (Math.atan2(oy, ox) * 180) / Math.PI;
  }, [originX, originY]);

  // Per-instance random drift parameters so each card floats differently.
  const drift = useMemo(() => {
    const r = (min: number, max: number) =>
      min + Math.random() * (max - min);
    return {
      dx: [0, r(-12, 12), r(-10, 10), r(-14, 14), 0],
      dy: [0, r(-14, 14), r(-12, 12), r(-10, 10), 0],
      dr: [0, r(-2, 2), r(-1.5, 1.5), r(-2, 2), 0],
      duration: r(14, 22),
    };
  }, []);

  return (
    <motion.div
      ref={rootRef}
      className="absolute"
      style={{
        left: finalX,
        top: finalY,
        width,
        zIndex: zIndex ?? 20,
      }}
      initial={{
        x: originX,
        y: originY,
        rotate: rotation - 35,
        opacity: 0,
        scale: 0.4,
      }}
      animate={
        startAnimation
          ? {
              x: drift.dx,
              y: drift.dy,
              rotate: drift.dr.map((d) => rotation + d),
              opacity: 1,
              scale: 1,
            }
          : {
              x: originX,
              y: originY,
              rotate: rotation - 35,
              opacity: 0,
              scale: 0.4,
            }
      }
      transition={{
        x: { delay, duration: drift.duration, ease: "easeInOut", repeat: Infinity },
        y: { delay, duration: drift.duration * 0.85, ease: "easeInOut", repeat: Infinity },
        rotate: { delay, duration: drift.duration, ease: "easeInOut", repeat: Infinity },
        opacity: { delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        scale: { delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Comet trail */}
      {/* Comet trail — points back toward origin, fades as card settles */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 origin-left"
        style={{
          rotate: trailAngle,
          x: 0,
          y: -3,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: startAnimation ? [0, 1, 1, 0] : 0 }}
        transition={{ delay, duration: 1.6, times: [0, 0.15, 0.7, 1], ease: "easeOut" }}
      >
        <motion.div
          className="h-[6px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(180,210,255,0.15) 20%, rgba(200,220,255,0.55) 55%, rgba(255,240,220,0.95) 90%, rgba(255,255,255,1) 100%)",
            filter: "blur(2px)",
            boxShadow:
              "0 0 12px rgba(200,220,255,0.7), 0 0 24px rgba(180,210,255,0.45)",
          }}
          initial={{ width: 1400, scaleY: 1.4 }}
          animate={startAnimation ? { width: 0, scaleY: 0.4 } : { width: 1400 }}
          transition={{ delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_30px_60px_-12px_rgba(0,0,0,0.75),0_18px_40px_-8px_oklch(0.45_0.18_300_/_0.45),inset_0_1px_0_oklch(1_0_0_/_0.08)] ring-1 ring-black/40">
        {/* Soft inner highlight to integrate with bg */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-white/5 via-transparent to-black/30" />
        <AnimatePresence initial={false} mode="popLayout">
          <motion.video
            ref={videoRef}
            key={clipIndex}
            src={isVisible ? clips[clipIndex] : undefined}
            muted
            loop
            playsInline
            autoPlay={isVisible}
            preload={isVisible ? "auto" : "none"}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3">
          <p className="text-[10px] font-semibold tracking-widest text-white/90">
            {views}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
