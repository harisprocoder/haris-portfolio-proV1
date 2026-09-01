import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  staggerContainer,
  staggerChild,
  sectionLabelVariants,
  textMaskReveal,
} from "@/hooks/useScrollReveal";

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

function SkillBar({
  name,
  pct,
  icon,
  color,
  delay,
  isInView,
}: {
  name: string;
  pct: number;
  icon: string;
  color: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="mb-3"
      variants={staggerChild}
    >
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
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="skills" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-code" aria-hidden="true" /> TECHNICAL SKILLS
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            Specialized expertise in{" "}
            <span className="gradient-text">modern web technologies</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Skills with progress bars */}
          <motion.div
            className="space-y-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <h3
              className="font-['Space_Grotesk'] text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#64748b" }}
            >
              Frontend & Tools
            </h3>
            {skills.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.12} isInView={isInView} />
            ))}
          </motion.div>

          {/* Competencies + Tech icons */}
          <div>
            <h3
              className="font-['Space_Grotesk'] text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#64748b" }}
            >
              Core Competencies
            </h3>
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {competencies.map((c) => (
                <motion.span
                  key={c}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    color: "#818cf8",
                  }}
                  variants={staggerChild}
                  whileHover={{
                    scale: 1.08,
                    borderColor: "rgba(99,102,241,0.5)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.div>

            <h3
              className="font-['Space_Grotesk'] text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#64748b" }}
            >
              Tech Stack
            </h3>
            <motion.div
              className="grid grid-cols-4 gap-3"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {skills.map((t) => (
                <motion.div
                  key={t.name}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl"
                  style={{
                    background: "rgba(17,24,39,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  variants={staggerChild}
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(99,102,241,0.3)",
                    boxShadow: "0 10px 30px rgba(99,102,241,0.15)",
                    transition: { duration: 0.25 },
                  }}
                >
                  <i className={`${t.icon} text-xl`} style={{ color: t.color }} aria-hidden="true" />
                  <span className="text-[10px]" style={{ color: "#94a3b8" }}>
                    {t.name.split(" ")[0]}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {[
            { value: "2000+", label: "Coding Hours" },
            { value: "11", label: "GitHub Repos" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="text-center p-4 rounded-xl"
              style={{
                background: "rgba(17,24,39,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              variants={staggerChild}
              whileHover={{
                y: -3,
                borderColor: "rgba(99,102,241,0.3)",
                transition: { duration: 0.2 },
              }}
            >
              <p className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] gradient-text">
                {s.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
