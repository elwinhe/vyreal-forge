import { ReactNode } from "react";

/**
 * Wraps text inside a `.glass-btn` so it performs the same nav-style
 * slide-up hover animation. The parent button must include the
 * `glass-btn-text-host` class (added automatically when using this helper
 * via the `glass-btn` parent — pair with hover via group).
 */
export function GlassBtnText({ children }: { children: ReactNode }) {
  return (
    <span className="glass-btn-text relative inline-block overflow-hidden align-bottom leading-[1.1]">
      <span className="glass-btn-text-current block">{children}</span>
      <span aria-hidden className="glass-btn-text-incoming absolute left-0 top-0 block w-full">
        {children}
      </span>
    </span>
  );
}
