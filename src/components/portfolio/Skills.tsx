import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "HTML5", pct: 95, icon: "fab fa-html5", color: "#e34f26" },
  { name: "CSS3 / Tailwind", pct: 93, icon: "fab fa-css3-alt", color: "#1572b6" },
  { name: "JavaScript", pct: 80, icon: "fab fa-js", color: "#f7df1e" },
  { name: "React", pct: 70, icon: "fab fa-react", color: "#61dafb" },
  { name: "Git / GitHub", pct: 70, icon: "fab fa-git-alt", color: "#f05032" },
  { name: "Figma", pct: 65, icon: "fab fa-figma", color: "#f24e1e" },
];

const competencies = [
  "UI/UX Design",
  "Performance",
  "Cross-browser",
  "SEO",
  "Mobile-First",
  "Accessibility",
];

function SkillBar({ name, pct, icon, color, visible, delay }: {
  name: string; pct: number; icon: string; color: string; visible: boolean; delay: number;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <i className={`${icon} text-sm`} style={{ color }} aria-hidden="true" />
          <span className="text-sm font-medium" style={{ color: "#e2e8f0" }}>{name}</span>
        </div>
        <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transitionDelay: `${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div>
          <span className="section-label">
            <i className="fas fa-code" aria-hidden="true" /> TECHNICAL SKILLS
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Specialized expertise in{" "}
            <span className="gradient-text">modern web technologies</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* All skills in one clean grid */}
          <div className="space-y-1">
            <h3
              className="font-['Space_Grotesk'] text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#64748b" }}
            >
              Frontend & Tools
            </h3>
            {skills.map((s, i) => (
              <SkillBar key={s.name} {...s} visible={visible} delay={i * 0.1} />
            ))}
          </div>

          {/* Competencies + Tech icons */}
          <div>
            <h3
              className="font-['Space_Grotesk'] text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#64748b" }}
            >
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {competencies.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    color: "#818cf8",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <h3
              className="font-['Space_Grotesk'] text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#64748b" }}
            >
              Tech Stack
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {skills.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(17,24,39,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <i className={`${t.icon} text-xl`} style={{ color: t.color }} aria-hidden="true" />
                  <span className="text-[10px]" style={{ color: "#94a3b8" }}>
                    {t.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "2000+", label: "Coding Hours" },
            { value: "11", label: "GitHub Repos" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center p-4 rounded-xl"
              style={{
                background: "rgba(17,24,39,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] gradient-text">
                {s.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
