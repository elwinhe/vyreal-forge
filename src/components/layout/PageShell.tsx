import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-foreground relative">
      <Nav />
      {/* Force-coalesce descendant compositor layers (notably <video>) into a
          single layer so the fixed Nav's backdrop-filter can sample them.
          Without this, browser-promoted video layers sit as siblings to the
          nav and are skipped by backdrop-filter sampling. */}
      <main style={{ transform: "translateZ(0)", willChange: "transform" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
