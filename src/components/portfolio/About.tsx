import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  staggerContainer,
  staggerChild,
  fadeLeft,
  fadeRight,
  sectionLabelVariants,
  textMaskReveal,
} from "@/hooks/useScrollReveal";

const features = [
  {
    icon: "🧹",
    title: "Clean Code",
    desc: "Writing maintainable, well-structured code that's easy to read and scale.",
  },
  {
    icon: "🎨",
    title: "Creative Design",
    desc: "Crafting visually stunning interfaces that leave lasting impressions.",
  },
  {
    icon: "⚡",
    title: "Fast Performance",
    desc: "Optimizing for speed to deliver lightning-fast user experiences.",
  },
  {
    icon: "👤",
    title: "Client Focused",
    desc: "Prioritizing your goals and exceeding expectations every time.",
  },
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
    <section id="about" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-user" aria-hidden="true" /> ABOUT ME
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            Passionate web developer with a vision for{" "}
            <span className="gradient-text">
              creating exceptional digital experiences
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mt-8">
          {/* Left: Text + Features */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#94a3b8" }}
            >
              I'm a young and passionate web developer from Karachi, Pakistan,
              with over 2 years of hands-on experience in building modern,
              responsive websites. My journey in web development started with
              curiosity and has grown into a deep passion for creating
              exceptional digital experiences. I specialize in front-end
              development with a keen eye for design, performance, and user
              experience. Every project I take on is an opportunity to push
              boundaries and deliver something truly remarkable.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  className="about-feature-box"
                  variants={staggerChild}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className="text-2xl mb-3" aria-hidden="true">{f.icon}</div>
                  <h3
                    className="font-['Space_Grotesk'] font-bold text-sm mb-1"
                    style={{ color: "#f1f5f9" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Info pills */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeRight}
          >
            <motion.div
              className="flex flex-col gap-4"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {infoItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="info-pill"
                  variants={staggerChild}
                  whileHover={{
                    borderColor: "rgba(99,102,241,0.4)",
                    x: 4,
                    transition: { duration: 0.2 },
                  }}
                >
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="text-xs" style={{ color: "#475569" }}>
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#f1f5f9" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
