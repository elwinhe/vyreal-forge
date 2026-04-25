import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Nav />
      <main className="pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  );
}
