import { useEffect, useRef, useState } from "react";

const segments = [
  { label: "Development", pct: 40, color: "#6366f1" },
  { label: "Design", pct: 25, color: "#06b6d4" },
  { label: "Testing", pct: 20, color: "#8b5cf6" },
  { label: "Support", pct: 15, color: "#f59e0b" },
];

export default function CostBreakdown() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build conic-gradient stops
  let accumulated = 0;
  const gradientStops = segments
    .map((s) => {
      const start = accumulated;
      accumulated += s.pct;
      return `${s.color} ${start}% ${accumulated}%`;
    })
    .join(", ");

  return (
    <div ref={ref} className="glass-card p-8 scroll-reveal">
      <h3
        className="font-['Space_Grotesk'] font-bold text-lg mb-6 text-center"
        style={{ color: "#f1f5f9" }}
      >
        Where Your Budget Goes
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut chart */}
        <div className="relative shrink-0">
          <div
            className="w-48 h-48 rounded-full transition-all duration-1000"
            style={{
              background: `conic-gradient(${gradientStops})`,
              clipPath: animate ? "none" : "circle(0% at 50% 50%)",
              transition: "clip-path 1s ease-out",
            }}
          />
          {/* Inner circle for donut effect */}
          <div
            className="absolute inset-0 m-auto w-28 h-28 rounded-full flex items-center justify-center"
            style={{ background: "#111827" }}
          >
            <span
              className="font-['Space_Grotesk'] font-extrabold text-xl gradient-text"
            >
              100%
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          {segments.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: s.color }}
              />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: "#f1f5f9" }}>{s.label}</span>
                  <span className="font-semibold" style={{ color: s.color }}>
                    {s.pct}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animate ? `${s.pct}%` : "0%",
                      background: s.color,
                      transitionDelay: `${i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
