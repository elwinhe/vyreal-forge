import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-foreground relative">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
