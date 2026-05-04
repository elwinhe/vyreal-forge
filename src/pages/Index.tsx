import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { SpaceHero } from "@/components/sections/SpaceHero";
import { ClientMarquee } from "@/components/sections/ClientMarquee";

const Index = () => {
  return (
    <PageShell>
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        {/* HERO — space / comet cards */}
        <SpaceHero />

        {/* CLIENT / CREATOR MARQUEE */}
        <ClientMarquee />

        {/* STATS */}
        <Stats />

        {/* SERVICES */}
        <Services />
      </motion.div>
    </PageShell>
  );
};

export default Index;
