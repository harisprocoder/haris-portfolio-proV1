import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  staggerContainer,
  staggerChild,
  sectionLabelVariants,
  textMaskReveal,
} from "@/hooks/useScrollReveal";

const services = [
  {
    icon: "🖥️",
    title: "Custom Website Development",
    timeline: "2-4 weeks",
    deliverables: [
      "Responsive design",
      "Cross-browser compatibility",
      "Performance optimization",
      "SEO best practices",
      "Mobile-first approach",
    ],
  },
  {
    icon: "🎨",
    title: "UI/UX Design Services",
    timeline: "1-2 weeks",
    deliverables: [
      "Wireframes & Mockups",
      "Interactive Prototypes",
      "User journey mapping",
      "Design system creation",
      "UI pattern library",
    ],
  },
  {
    icon: "🔧",
    title: "Website Maintenance & Support",
    timeline: "Monthly",
    deliverables: [
      "Regular updates",
      "Bug fixes & patches",
      "Performance monitoring",
      "Content updates",
      "Security patches",
    ],
  },
  {
    icon: "💡",
    title: "Web Development Consultation",
    timeline: "Flexible",
    deliverables: [
      "Technical assessment",
      "Strategy planning",
      "Tech stack selection",
      "Project roadmap",
      "Best practices guidance",
    ],
  },
];

const processSteps = [
  { num: 1, label: "Discovery" },
  { num: 2, label: "Design" },
  { num: 3, label: "Development" },
  { num: 4, label: "Testing" },
  { num: 5, label: "Support" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="services" ref={sectionRef} style={{ background: "#12100C" }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Header — centered for this section */}
        <motion.div
          className="text-center mb-12 lg:mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">
            <i className="fas fa-concierge-bell" aria-hidden="true" /> MY SERVICES
          </span>
          <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: "#F5EFE6" }}>
            Professional services<br />
            <span className="gradient-text">tailored to you</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "#A89F8F" }}>
            From concept to launch — I handle every step.
          </p>
          <span className="accent-number hidden lg:block" aria-hidden="true">04</span>
        </motion.div>

        {/* Services — 2x2 grid with varied card treatments */}
        <motion.div
          className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-14 lg:mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className={`card-accent-top rounded-xl p-5 sm:p-6 transition-all duration-300 ${
                i === 0 ? "md:row-span-2" : ""
              }`}
              style={{
                background: "#1A1612",
                border: "1px solid #2D2A24",
              }}
              variants={staggerChild}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 },
              }}
            >
              {/* Icon + timeline — horizontal */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0"
                  style={{ background: "rgba(255,132,0,0.06)" }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm sm:text-base" style={{ color: "#F5EFE6" }}>
                    {s.title}
                  </h3>
                </div>
              </div>

              {/* Timeline badge */}
              <div className="mb-4">
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded"
                  style={{
                    background: "rgba(255,132,0,0.06)",
                    color: "#FF8400",
                  }}
                >
                  {s.timeline}
                </span>
              </div>

              {/* Deliverables — compact list */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: "#8A8275" }}>
                  Deliverables
                </p>
                <ul className="space-y-1">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "#A89F8F" }}
                    >
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#FF8400" }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Work Process — horizontal timeline with different treatment */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h3
            className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold mb-8 text-center"
            style={{ color: "#F5EFE6" }}
            variants={staggerChild}
          >
            How I Work
          </motion.h3>

          {/* Horizontal timeline */}
          <div className="relative">
            <div className="hidden md:block absolute top-[19px] left-[10%] right-[10%] h-px" style={{ background: "#2D2A24" }} />
            <div className="hidden md:block absolute top-[19px] left-[10%] h-px" style={{ background: "linear-gradient(90deg, #FF8400, #34BFFF)", width: "80%" }}>
              <motion.div
                className="h-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ background: "linear-gradient(90deg, #FF8400, #34BFFF)" }}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="flex md:flex-col items-center gap-3 md:gap-2 relative z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                >
                  <motion.div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: "#1A1612",
                      border: "2px solid rgba(255,132,0,0.3)",
                      color: "#FF8400",
                    }}
                    whileHover={{ scale: 1.15 }}
                  >
                    {step.num}
                  </motion.div>
                  <span className="text-xs font-medium" style={{ color: "#A89F8F" }}>
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
