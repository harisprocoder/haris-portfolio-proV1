import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -300, y: -300 });
  const target = useRef({ x: -300, y: -300 });
  const magneticItems = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !finePointer) return;

    const el = ref.current;
    const ring = ringRef.current;
    if (!el || !ring) return;

    magneticItems.current = Array.from(
      document.querySelectorAll<HTMLElement>(".glow-btn, .outline-btn, .nav-link, [data-magnetic]"),
    );

    function onMouseMove(e: MouseEvent) {
      target.current = { x: e.clientX - 150, y: e.clientY - 150 };
      ring!.style.setProperty("--cursor-x", `${e.clientX}px`);
      ring!.style.setProperty("--cursor-y", `${e.clientY}px`);

      magneticItems.current.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const distanceX = e.clientX - (rect.left + rect.width / 2);
        const distanceY = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(distanceX, distanceY);
        const strength = distance < 90 ? 0.12 : 0;
        item.style.setProperty("--magnetic-x", `${distanceX * strength}px`);
        item.style.setProperty("--magnetic-y", `${distanceY * strength}px`);
        item.classList.toggle("magnetic-active", strength > 0);
      });
    }

    function onMouseLeave() {
      magneticItems.current.forEach((item) => {
        item.style.setProperty("--magnetic-x", "0px");
        item.style.setProperty("--magnetic-y", "0px");
        item.classList.remove("magnetic-active");
      });
    }

    let raf = 0;
    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      el!.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
      magneticItems.current.forEach((item) => item.classList.remove("magnetic-active"));
    };
  }, []);

  return (
    <>
      <div ref={ref} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
