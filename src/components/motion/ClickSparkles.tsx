import { useEffect } from "react";

/**
 * Burst 4-6 small particles at click position. Pure DOM for perf.
 */
export function ClickSparkles() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0) return;
      const count = 5;
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        el.className = "vy-spark";
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        document.body.appendChild(el);

        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
        const distance = 28 + Math.random() * 22;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        const anim = el.animate(
          [
            { transform: `translate(-50%, -50%) translate(0,0) scale(1)`, opacity: 1 },
            { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0 },
          ],
          { duration: 380, easing: "cubic-bezier(0.16,1,0.3,1)" }
        );
        anim.onfinish = () => el.remove();
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return null;
}
