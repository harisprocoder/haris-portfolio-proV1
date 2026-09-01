import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  staggerContainer,
  staggerChild,
  sectionLabelVariants,
} from "@/hooks/useScrollReveal";

const milestones = [
  {
    year: "2023",
    title: "Started the Journey",
    desc: "First lines of HTML & CSS. Built first static website from scratch.",
    icon: "🚀",
  },
  {
    year: "2024",
    title: "Leveling Up",
    desc: "Dived into JavaScript, Tailwind CSS, and responsive design. Started freelancing.",
    icon: "📈",
  },
  {
    year: "2025",
    title: "Going Professional",
    desc: "Built real client projects. Launched A Plus Hairs and multiple business sites.",
    icon: "💼",
  },
  {
    year: "2026",
    title: "Scaling Up",
    desc: "Expanding into full-stack development. Taking on bigger projects.",
    icon: "🎯",
  },
];

export default function InteractiveTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  // Scroll-linked line draw
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef}>
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-12">
          <motion.span
            className="section-label"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionLabelVariants}
          >
            <i className="fas fa-road" aria-hidden="true" /> MY JOURNEY
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            From <span className="gradient-text">first line</span> to full stack
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical line — scroll-linked */}
          <div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "rgba(99,102,241,0.1)" }}
          >
            <motion.div
              className="w-full rounded-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #6366f1, #06b6d4)",
              }}
            />
          </div>

          <motion.div
            className="space-y-6 md:space-y-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className={`relative flex items-start gap-4 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                variants={staggerChild}
              >
                {/* Dot */}
                <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                      boxShadow: "0 0 16px rgba(99,102,241,0.3)",
                    }}
                    whileHover={{ scale: 1.15, boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {m.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 md:w-[calc(50%-32px)] ${
                    i % 2 === 0
                      ? "md:text-right md:pr-10 md:flex-none"
                      : "md:text-left md:pl-10 md:flex-none"
                  }`}
                >
                  <motion.div
                    className="glass-card p-5"
                    whileHover={{
                      borderColor: "rgba(99,102,241,0.3)",
                      boxShadow: "0 0 30px rgba(99,102,241,0.08)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-['Space_Grotesk'] text-xl font-extrabold gradient-text">
                      {m.year}
                    </span>
                    <h3
                      className="font-['Space_Grotesk'] font-bold text-base mt-1 mb-1"
                      style={{ color: "#f1f5f9" }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                      {m.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer — desktop only for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-32px)] md:flex-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
