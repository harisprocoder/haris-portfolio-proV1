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

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="skills" ref={sectionRef} style={{ background: "#12100C" }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Header — right-aligned for contrast with About */}
        <motion.div
          className="mb-12 lg:mb-16 text-right relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">
            <i className="fas fa-code" aria-hidden="true" /> TECHNICAL SKILLS
          </span>
          <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: "#F5EFE6" }}>
            What I work<br />
            <span className="gradient-text">with daily</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl ml-auto" style={{ color: "#A89F8F" }}>
            Specialized expertise in modern web technologies.
          </p>
          <span className="accent-number hidden lg:block" style={{ right: "auto", left: "-10px" }} aria-hidden="true">02</span>
        </motion.div>

        {/* Skills — full-width bars, horizontal layout */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
            {skills.map((s, i) => (
              <motion.div key={s.name} className="group" variants={staggerChild}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <i className={`${s.icon} text-base`} style={{ color: s.color }} aria-hidden="true" />
                    <span className="text-sm font-medium" style={{ color: "#F5EFE6" }}>{s.name}</span>
                  </div>
                  <span className="text-sm font-bold font-['Space_Grotesk']" style={{ color: "#FF8400" }}>{s.pct}%</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #FF8400, #e67600)" }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${s.pct}%` } : { width: 0 }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.12,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom row — competencies + tech icons + stats, varied layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Competencies — horizontal pills */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-4" style={{ color: "#8A8275" }}>
              Core Competencies
            </p>
            <div className="flex flex-wrap gap-2">
              {competencies.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(255,132,0,0.06)",
                    border: "1px solid rgba(255,132,0,0.12)",
                    color: "#FF8400",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tech stack — compact grid */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-4" style={{ color: "#8A8275" }}>
              Tech Stack
            </p>
            <div className="grid grid-cols-3 gap-2">
              {skills.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all duration-300"
                  style={{
                    background: "#1A1612",
                    border: "1px solid #2D2A24",
                  }}
                >
                  <i className={`${t.icon} text-lg`} style={{ color: t.color }} aria-hidden="true" />
                  <span className="text-[10px]" style={{ color: "#8A8275" }}>
                    {t.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats — vertical stack */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { value: "2000+", label: "Coding Hours" },
              { value: "11", label: "GitHub Repos" },
              { value: "100%", label: "Satisfaction" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-lg text-center"
                style={{
                  background: "#1A1612",
                  border: "1px solid #2D2A24",
                }}
              >
                <p className="stat-accent text-xl">{s.value}</p>
                <p className="text-[10px] mt-1 tracking-wider uppercase" style={{ color: "#8A8275" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
