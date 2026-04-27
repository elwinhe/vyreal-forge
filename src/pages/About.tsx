import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { FadeInUp } from "@/components/motion/FadeInUp";
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
    role: "Co-founder · CEO",
    bio: "Built creator monetization stacks from zero to eight figures. Operator-first.",
    bg: "linear-gradient(160deg,#0A0A0A 0%,#2A1B3D 60%,#5E3590 100%)",
  },
  {
    name: "Richard",
    role: "Co-founder · Operations",
    bio: "Motion-control systems, AI pipelines, and a long history of shipping hits.",
    bg: "linear-gradient(160deg,#D9CBE8 0%,#7A5C9A 70%,#15101F 100%)",
  },
  {
    name: "Elwin",
    role: "Head of Creative",
    bio: "Leads the creative design and maintains backend infrastructure supporting our workflows",
    bg: "linear-gradient(160deg,#222 0%,#444 50%,#5E3590 100%)",
  },
  {
    name: "Ishaan",
    role: "Content Lead",
    bio: "2M followers across socials, 51M total engagement, scripting wizard.",
    bg: "linear-gradient(160deg,#15101F 0%,#3D2459 60%,#D9CBE8 100%)",
  },
  {
    name: "Victor",
    role: "Tech Lead",
    bio: "The orchestrator behind agentic workflow management.",
    bg: "linear-gradient(160deg,#0A0A0A 0%,#2a2a2a 50%,#7A5C9A 100%)",
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
      <section className="py-12 px-5 md:px-8 pt-[120px] md:pt-[160px]">
        <motion.div
          className="eyebrow body-muted mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
        >
          About
        </motion.div>
        <motion.h1
          className="display tracking-display leading-[0.85]"
          style={{ fontSize: "clamp(3.4rem, 5.8vw, 7rem)" }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Built by
        </motion.h1>
        <motion.h1
          className="display tracking-display leading-[0.85] text-transition2"
          style={{ fontSize: "clamp(3.4rem, 5.8vw, 7rem)" }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
        >
          Industry Experts.
        </motion.h1>
      </section>

      <section className="py-12 px-5 md:px-8">
        <FadeInUp className="eyebrow body-muted mb-6">What are we?</FadeInUp>
        <FadeInUp
          as="p"
          delay={0.2}
          className="max-w-2xl body-muted font-medium"
          style={{ fontSize: "clamp(20px, 2.6vw, 40px)", lineHeight: 1.4 }}
        >
          Stratton is an AI content studio operating two arms. UGC built for performance, and AI-led monetization for
          top-tier creators. Built by operators, run like a production house.
        </FadeInUp>
      </section>

      <section className="py-12 px-5 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <FadeInUp as="h2" className="eyebrow body-muted">
            The team
          </FadeInUp>
          <FadeInUp as="span" delay={0.2} className="text-sm body-muted">
            {team.length} operators
          </FadeInUp>
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
