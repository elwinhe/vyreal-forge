import { useEffect, useMemo, useState } from "react";

interface Shooting {
  id: number;
  top: number; // %
  left: number; // %
  angle: number; // deg
  length: number; // px
  duration: number; // s
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 115 }).map((_, i) => {
        const x = seededRandom(i + 1) * 100;
        const y = seededRandom(i + 2) * 100;
        const dx = x - 50;
        const dy = y - 28;
        const distFromHero = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, Math.min(1, (distFromHero - 12) / 18));
        const baseSize = seededRandom(i + 3) * 1.3 + 0.3;
        const size = baseSize * (0.55 + 0.45 * proximity);
        const baseOpacity = 0.35 + seededRandom(i + 4) * 0.3;
        const opacity = baseOpacity * (0.35 + 0.65 * proximity);
        return {
          id: i,
          x,
          y,
          size,
          opacity,
          delay: seededRandom(i + 5) * 4,
          duration: seededRandom(i + 6) * 3 + 2.5,
        };
      }),
    []
  );

  const [shooters, setShooters] = useState<Shooting[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let nextId = 0;

    const spawn = () => {
      // Avoid the central hero zone (roughly 25–75% x, 12–55% y).
      // Pick a top band OR far side bands so the trail never crosses the headline/CTA.
      const zone = Math.random();
      let top: number;
      let left: number;
      if (zone < 0.7) {
        // Top band — well above the headline
        top = 2 + Math.random() * 8; // 2–10%
        left = 5 + Math.random() * 80;
      } else if (zone < 0.85) {
        // Far left edge
        top = 10 + Math.random() * 35;
        left = Math.random() * 12;
      } else {
        // Far right edge
        top = 10 + Math.random() * 35;
        left = 88 + Math.random() * 10;
      }
      const angle = 15 + Math.random() * 20; // shallow diagonal
      const length = 80 + Math.random() * 60;
      const duration = 1.1 + Math.random() * 0.5;
      const id = nextId++;
      setShooters((s) => [...s, { id, top, left, angle, length, duration }]);
      // Cleanup after the animation finishes
      setTimeout(() => {
        setShooters((s) => s.filter((sh) => sh.id !== id));
      }, duration * 1000 + 200);

      const nextDelay = 5000 + Math.random() * 5000; // 5–10s
      timer = setTimeout(spawn, nextDelay);
    };

    // First one after a short, random initial delay
    timer = setTimeout(spawn, 4000 + Math.random() * 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.5)`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {shooters.map((sh) => (
        <span
          key={sh.id}
          className="absolute"
          style={{
            top: `${sh.top}%`,
            left: `${sh.left}%`,
            width: `${sh.length}px`,
            height: "1px",
            transform: `rotate(${sh.angle}deg)`,
            transformOrigin: "left center",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.55) 100%)",
            filter: "blur(0.4px)",
            animation: `shoot ${sh.duration}s ease-out forwards`,
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
}
