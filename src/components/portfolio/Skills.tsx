import { useEffect, useRef, useState } from "react";

const frontendSkills = [
  { name: "HTML5", pct: 95 },
  { name: "CSS3", pct: 95 },
  { name: "Tailwind CSS", pct: 90 },
  { name: "JavaScript", pct: 80 },
];

const toolSkills = [
  { name: "Git & GitHub", pct: 70 },
  { name: "VS Code", pct: 95 },
  { name: "Figma", pct: 65 },
  { name: "Responsive Design", pct: 95 },
];

const coreCompetencies = [
  "UI/UX Design",
  "Performance Optimization",
  "Cross-browser Compatibility",
  "SEO Optimization",
  "Mobile-First Design",
  "Accessibility",
];

const techStack = [
  { name: "HTML5", icon: "fab fa-html5", color: "#e34f26" },
  { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572b6" },
  { name: "JavaScript", icon: "fab fa-js", color: "#f7df1e" },
  { name: "Tailwind", icon: "fas fa-wind", color: "#06b6d4" },
  { name: "Git", icon: "fab fa-git-alt", color: "#f05032" },
  { name: "GitHub", icon: "fab fa-github", color: "#f1f5f9" },
  { name: "Figma", icon: "fab fa-figma", color: "#f24e1e" },
  { name: "Canva", icon: "fas fa-palette", color: "#00c4cc" },
];

const stats = [
  { value: 2000, suffix: "+", label: "Coding Hours" },
  { value: 11, suffix: "", label: "GitHub Repos" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function SkillBar({ name, pct, visible }: { name: string; pct: number; visible: boolean }) {
  return (
    <div className="skill-bar-container">
      <div className="skill-bar-header">
        <span style={{ color: "#f1f5f9" }}>{name}</span>
        <span className="gradient-text font-semibold">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-fill"
          style={{ width: visible ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function CountUp({ target, suffix, visible }: { target: number; suffix: string; visible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      start = Math.round(easeOutExpo(progress) * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [visible, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            entry.target.querySelectorAll(".scroll-reveal, .scroll-reveal-left").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32" style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-code" /> TECHNICAL SKILLS
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Specialized expertise in{" "}
            <span className="gradient-text">modern web technologies</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Frontend */}
          <div className="scroll-reveal stagger-1">
            <h3
              className="font-['Space_Grotesk'] text-lg font-bold mb-6"
              style={{ color: "#f1f5f9" }}
            >
              <i className="fas fa-laptop-code mr-2 gradient-text" />
              Frontend Development
            </h3>
            {frontendSkills.map((s) => (
              <SkillBar key={s.name} {...s} visible={visible} />
            ))}
          </div>

          {/* Tools */}
          <div className="scroll-reveal stagger-2">
            <h3
              className="font-['Space_Grotesk'] text-lg font-bold mb-6"
              style={{ color: "#f1f5f9" }}
            >
              <i className="fas fa-tools mr-2 gradient-text" />
              Tools & Technologies
            </h3>
            {toolSkills.map((s) => (
              <SkillBar key={s.name} {...s} visible={visible} />
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <div className="scroll-reveal stagger-3 mb-16">
          <h3
            className="font-['Space_Grotesk'] text-lg font-bold mb-6"
            style={{ color: "#f1f5f9" }}
          >
            Core Competencies
          </h3>
          <div className="flex flex-wrap gap-3">
            {coreCompetencies.map((c) => (
              <span
                key={c}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  color: "#6366f1",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack Icons */}
        <div className="scroll-reveal stagger-4 mb-16">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {techStack.map((t) => (
              <div key={t.name} className="tech-stack-icon">
                <i className={`${t.icon} text-2xl`} style={{ color: t.color }} />
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-4 scroll-reveal stagger-5">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <p className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] gradient-text">
                <CountUp target={s.value} suffix={s.suffix} visible={visible} />
              </p>
              <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
