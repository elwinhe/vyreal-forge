import { PageShell } from "@/components/layout/PageShell";
import { useState } from "react";

interface Member {
  name: string;
  role: string;
  bio: string;
  bg: string;
}

const team: Member[] = [
  {
    name: "Rishi",
    role: "Co-founder · Strategy",
    bio: "Built creator monetization stacks from zero to eight figures. Operator-first.",
    bg: "linear-gradient(160deg,#0A0A0A 0%,#3a2418 60%,#CC6329 100%)",
  },
  {
    name: "Victor",
    role: "Co-founder · Production",
    bio: "Motion-control systems, AI pipelines, and a long history of shipping hits.",
    bg: "linear-gradient(160deg,#EACBB9 0%,#8C5B45 70%,#1A1212 100%)",
  },
  {
    name: "Elwin",
    role: "Head of Creative",
    bio: "Hooks, pacing, format taste. Ten thousand reels worth of pattern recognition.",
    bg: "linear-gradient(160deg,#222 0%,#444 50%,#CC6329 100%)",
  },
];

function TeamCard({ m }: { m: Member }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="frame-card relative aspect-[3/4] w-full"
      style={{ background: m.bg }}
    >
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500"
        style={{ opacity: hover ? 0.18 : 0 }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="display text-3xl md:text-4xl tracking-display">{m.name}</div>
        <div className="text-xs uppercase tracking-[0.18em] opacity-80 mt-1">{m.role}</div>
        <div
          className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: hover ? 120 : 0, opacity: hover ? 1 : 0 }}
        >
          <p className="text-sm mt-3 text-white/85 leading-relaxed">{m.bio}</p>
        </div>
      </div>
    </div>
  );
}

const About = () => {
  return (
    <PageShell>
      <section className="px-5 md:px-8 pt-10 md:pt-16">
        <div className="eyebrow body-muted mb-6">About</div>
        <h1 className="display text-[18vw] md:text-[14vw] tracking-display leading-[0.85]">UGC at scale.</h1>
        <h1 className="display text-[18vw] md:text-[14vw] tracking-display leading-[0.85] text-transition2">
          Real results.
        </h1>
        <div className="mt-10 md:mt-16 grid grid-cols-12">
          <p className="col-span-12 md:col-span-6 md:col-start-7 body-muted text-lg md:text-xl">
            Vyreal is an AI content studio operating two arms. UGC built for performance, and AI-led monetization for
            top-tier creators. Built by operators, run like a production house.
          </p>
        </div>
      </section>

      <section className="mt-32 md:mt-48 px-5 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="eyebrow body-muted">The team</h2>
          <span className="text-xs body-muted">{team.length} operators</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {team.map((m) => (
            <TeamCard key={m.name} m={m} />
          ))}
        </div>
      </section>
    </PageShell>
  );
};

export default About;
