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
    <section id="services" ref={sectionRef} style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-concierge-bell" aria-hidden="true" /> MY SERVICES
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            Professional services{" "}
            <span className="gradient-text">tailored to your needs</span>
          </motion.h2>
        </motion.div>

        {/* Service cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-5 mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              className="service-card"
              variants={staggerChild}
              whileHover={{
                y: -6,
                borderColor: "rgba(99,102,241,0.3)",
                boxShadow: "0 0 40px rgba(99,102,241,0.1)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  className="service-card-icon shrink-0"
                  whileHover={{
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                    borderColor: "transparent",
                    boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span>{s.icon}</span>
                </motion.div>
                <div>
                  <h3
                    className="font-['Space_Grotesk'] font-bold text-lg mb-1"
                    style={{ color: "#f1f5f9" }}
                  >
                    {s.title}
                  </h3>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full inline-block"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      color: "#06b6d4",
                      border: "1px solid rgba(6,182,212,0.3)",
                    }}
                  >
                    Timeline: {s.timeline}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p
                  className="text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "#475569" }}
                >
                  Deliverables
                </p>
                <ul className="space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "#94a3b8" }}
                    >
                      <i
                        className="fas fa-check-circle text-xs"
                        style={{ color: "#6366f1" }}
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
            className="font-['Space_Grotesk'] text-2xl font-bold mb-8 text-center"
            style={{ color: "#f1f5f9" }}
            variants={staggerChild}
          >
            Work Process
          </motion.h3>

          <div className="timeline-container">
            <div className="timeline-line">
              <motion.div
                className="timeline-line-fill"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                className="timeline-step"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  className="timeline-dot active"
                  whileHover={{ scale: 1.15 }}
                >
                  {step.num}
                </motion.div>
                <span
                  className="text-sm font-medium hidden sm:block"
                  style={{ color: "#94a3b8" }}
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
