import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  staggerContainer,
  staggerChild,
  sectionLabelVariants,
} from "@/hooks/useScrollReveal";

const features = [
  { icon: "🧹", title: "Clean Code", desc: "Maintainable, well-structured code that scales." },
  { icon: "🎨", title: "Creative Design", desc: "Visually stunning interfaces that impress." },
  { icon: "⚡", title: "Fast Performance", desc: "Lightning-fast user experiences." },
  { icon: "👤", title: "Client Focused", desc: "Exceeding expectations every time." },
];

const infoItems = [
  { icon: "📍", label: "Location", value: "Karachi, Pakistan" },
  { icon: "🎂", label: "Age", value: "16 Years" },
  { icon: "🌐", label: "Languages", value: "Urdu, English" },
  { icon: "📧", label: "Email", value: "harisshuja05@gmail.com" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="about" ref={sectionRef} className="section-accent-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Asymmetric header — left-aligned, large */}
        <motion.div
          className="mb-12 lg:mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-label">
            <i className="fas fa-user" aria-hidden="true" /> ABOUT ME
          </span>
          <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: "#F5EFE6" }}>
            The person behind<br />
            <span className="gradient-text">the pixels</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl" style={{ color: "#A89F8F" }}>
            I build digital experiences that combine clean code with thoughtful design.
          </p>
          {/* Decorative accent number */}
          <span className="accent-number hidden lg:block" aria-hidden="true">01</span>
        </motion.div>

        {/* Main content — asymmetric 2-col layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Narrative + features — 7 cols */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="text-sm sm:text-base leading-[1.9] mb-8 lg:mb-10"
              style={{ color: "#A89F8F" }}
            >
              I'm a young and passionate web developer from Karachi, Pakistan,
              with over 2 years of hands-on experience building modern,
              responsive websites. My journey started with curiosity and grew into
              a deep passion for creating exceptional digital experiences. I
              specialize in front-end development with a keen eye for design,
              performance, and user experience.
            </p>

            {/* Feature grid — 2x2, varied card heights */}
            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className={`card-accent-left rounded-xl p-4 sm:p-5 transition-all duration-300 ${i === 0 ? "row-span-2" : ""}`}
                  style={{
                    background: "#1A1612",
                    border: "1px solid #2D2A24",
                  }}
                  variants={staggerChild}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.25 },
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3"
                    style={{ background: "rgba(255,132,0,0.06)" }}
                    aria-hidden="true"
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm mb-1" style={{ color: "#F5EFE6" }}>
                    {f.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#8A8275" }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Info list — 5 cols, different treatment */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Info list — stacked rows, not pills */}
            <div className="space-y-0">
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 py-4 transition-all duration-300"
                  style={{
                    borderBottom: i < infoItems.length - 1 ? "1px solid #2D2A24" : "none",
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,132,0,0.06)" }}
                  >
                    <span className="text-base" aria-hidden="true">{item.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#8A8275" }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: "#F5EFE6" }}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability badge — different style */}
            <motion.div
              className="mt-8 p-4 rounded-xl"
              style={{
                background: "rgba(255,132,0,0.04)",
                border: "1px solid rgba(255,132,0,0.1)",
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
                <p className="text-sm font-medium" style={{ color: "#F5EFE6" }}>
                  Available for new projects
                </p>
              </div>
              <p className="text-xs mt-1 ml-5" style={{ color: "#8A8275" }}>
                Currently accepting freelance work
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
