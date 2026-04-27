import { Marquee } from "@/components/sections/Marquee";
import { FadeInUp } from "@/components/motion/FadeInUp";

const NAMES = [
  "NORTHWAVE",
  "LUXE / CO",
  "SERA",
  "OBELISK",
  "FORMA",
  "ATELIER 9",
  "MONO",
  "RIVER & OAK",
];

/**
 * "Who we worked with" eyebrow + horizontal logo/creator marquee.
 */
export function ClientMarquee() {
  return (
    <div className="py-16 md:py-32">
      <FadeInUp className="eyebrow body-muted mb-6 px-5 md:px-8">
        Who we worked with
      </FadeInUp>
      <div className="border-y border-foreground/10 py-8">
        <Marquee>
          {NAMES.map((name, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="display text-3xl md:text-5xl tracking-display text-foreground/65">
                {name}
              </span>
              {i % 2 === 0 && (
                <span
                  className="h-12 w-12 rounded-full"
                  style={{
                    background: `linear-gradient(135deg,#D9CBE8,#5E3590)`,
                  }}
                  aria-label="Creator avatar"
                />
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
