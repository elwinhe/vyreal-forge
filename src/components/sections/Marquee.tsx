/**
 * Continuous horizontal marquee. Duplicates children so loop is seamless.
 */
export function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden w-full">
      <div className="marquee-track flex gap-16 w-max items-center whitespace-nowrap">
        <div className="flex gap-16 items-center">{children}</div>
        <div className="flex gap-16 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
