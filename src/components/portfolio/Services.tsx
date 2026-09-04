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
    timeline: "Monthly packages",
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
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-concierge-bell" aria-hidden="true" /> MY SERVICES
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
            style={{ color: "#F5EFE6", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            Professional services{" "}
            <span className="gradient-text">tailored to your needs</span>
          </motion.h2>
        </motion.div>

        {/* Service cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-8 md:mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              className="rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300"
              style={{
                background: "#1A1612",
                border: "1px solid #2D2A24",
              }}
              variants={staggerChild}
              whileHover={{
                y: -6,
                borderColor: "rgba(255,132,0,0.3)",
                boxShadow: "0 0 40px rgba(255,132,0,0.08)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{
                    background: "rgba(255,132,0,0.08)",
                    border: "1px solid rgba(255,132,0,0.15)",
                  }}
                >
                  <span>{s.icon}</span>
                </div>
                <div className="min-w-0">
                  <h3
                    className="font-['Space_Grotesk'] font-bold text-base sm:text-lg mb-1"
                    style={{ color: "#F5EFE6" }}
                  >
                    {s.title}
                  </h3>
                  <span
                    className="text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full inline-block"
                    style={{
                      background: "rgba(255,132,0,0.08)",
                      color: "#FF8400",
                      border: "1px solid rgba(255,132,0,0.2)",
                    }}
                  >
                    Timeline: {s.timeline}
                  </span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <p
                  className="text-[11px] sm:text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "#8A8275" }}
                >
                  Deliverables
                </p>
                <ul className="space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                      style={{ color: "#A89F8F" }}
                    >
                      <i
                        className="fas fa-check-circle text-xs"
                        style={{ color: "#FF8400" }}
                        aria-hidden="true"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Work Process Timeline */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h3
            className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center"
            style={{ color: "#F5EFE6" }}
            variants={staggerChild}
          >
            Work Process
          </motion.h3>

          <div className="timeline-container">
            <div className="timeline-line">
              <motion.div
                className="timeline-line-fill"
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ width: "100%" }}
              />
            </div>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                className="timeline-step"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  className="timeline-dot active"
                  whileHover={{ scale: 1.15 }}
                >
                  {step.num}
                </motion.div>
                <span
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: "#A89F8F" }}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
