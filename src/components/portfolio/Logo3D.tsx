import { useRef, useCallback } from "react";

export default function Logo3D() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 25}deg) rotateX(${-y * 25}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center w-32 h-32 rounded-2xl select-none transition-transform duration-150 ease-out"
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))",
        border: "1px solid rgba(99,102,241,0.3)",
        boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
        transformStyle: "preserve-3d",
      }}
      aria-hidden="true"
    >
      <span
        className="font-['Space_Grotesk'] text-4xl font-extrabold gradient-text"
        style={{ transform: "translateZ(20px)" }}
      >
        MH
      </span>
    </div>
  );
}
