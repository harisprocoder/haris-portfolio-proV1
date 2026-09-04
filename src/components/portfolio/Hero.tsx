import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT } from "@/hooks/useScrollReveal";

const typingWords = ["Web Developer", "UI/UX Designer", "Problem Solver"];

const nameWords = ["M.", "Haris"];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const typeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    if (!isDeleting) {
      if (typedText.length < currentWord.length) {
        typeTimeout.current = setTimeout(
          () => setTypedText(currentWord.slice(0, typedText.length + 1)),
          80,
        );
      } else {
        typeTimeout.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (typedText.length > 0) {
        typeTimeout.current = setTimeout(
          () => setTypedText(typedText.slice(0, -1)),
          40,
        );
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % typingWords.length);
      }
    }
    return () => clearTimeout(typeTimeout.current);
  }, [typedText, isDeleting, wordIndex]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="hero-grid-bg" />

      <motion.div className="floating-orb floating-orb-1" style={{ y: orb1Y }} />
      <motion.div className="floating-orb floating-orb-2" style={{ y: orb2Y }} />
      <motion.div className="floating-orb floating-orb-3" style={{ y: orb3Y }} />

      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,132,0,0.05) 0%, transparent 60%)",
          animation: "ambientPulse 8s ease-in-out infinite alternate",
        }}
      />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 w-full relative z-10 pt-24 pb-16 lg:pt-0 lg:pb-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left: Text content — takes 7 cols */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Top accent line */}
            <motion.div
              className="w-12 h-[2px] mb-8"
              style={{ background: "#FF8400" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            />

            {/* Badge — minimal */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#FF8400" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#FF8400" }} />
              </span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#A89F8F" }}>
                Available for Freelance
              </span>
            </motion.div>

            {/* Name — large, dramatic */}
            <div className="mb-4">
              {nameWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="heading-display inline-block mr-3 md:mr-4"
                  style={{
                    fontSize: "clamp(48px, 9vw, 96px)",
                    background: i === 1 ? "linear-gradient(135deg, #FF8400, #e67600)" : "linear-gradient(135deg, #F5EFE6, #A89F8F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: EASE_OUT }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Typing subtitle */}
            <motion.h2
              className="font-['Space_Grotesk'] text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6"
              style={{ color: "#F5EFE6", minHeight: "40px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
            >
              {typedText}
              <span className="typing-cursor" />
            </motion.h2>

            {/* Description — wider, better line height */}
            <motion.p
              className="text-sm sm:text-base leading-[1.8] mb-8 lg:mb-10 max-w-lg"
              style={{ color: "#A89F8F" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT }}
            >
              Crafting modern, clean, and user-focused web interfaces from
              Karachi, Pakistan. Specializing in responsive design with 2+ years
              of hands-on experience.
            </motion.p>

            {/* CTA Buttons — asymmetric sizing */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10 lg:mb-14"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: EASE_OUT }}
            >
              <a
                href="#projects"
                onClick={(e) => handleNav(e, "#projects")}
                className="glow-btn inline-flex items-center gap-3 text-sm shimmer-btn"
              >
                View My Work
                <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNav(e, "#contact")}
                className="inline-flex items-center gap-3 text-sm font-medium transition-colors duration-300"
                style={{ color: "#A89F8F" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF8400")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A89F8F")}
              >
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "1px solid #2D2A24" }}>
                  <i className="fas fa-envelope text-xs" style={{ color: "#FF8400" }} aria-hidden="true" />
                </span>
                Get in touch
              </a>
            </motion.div>

            {/* Stats — inline, refined */}
            <motion.div
              className="flex items-center gap-8 lg:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3, ease: EASE_OUT }}
            >
              {[
                { value: "35+", label: "Projects" },
                { value: "25+", label: "Clients" },
                { value: "2+", label: "Years" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div>
                    <p className="stat-accent">{stat.value}</p>
                    <p className="text-[11px] font-medium tracking-wider uppercase" style={{ color: "#8A8275" }}>{stat.label}</p>
                  </div>
                  {i < 2 && <div className="w-px h-8" style={{ background: "#2D2A24" }} />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Visual element — takes 5 cols */}
          <motion.div
            className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: EASE_OUT }}
          >
            {/* Abstract visual — not a code block, more like a design element */}
            <div className="relative w-full max-w-sm">
              {/* Large decorative ring */}
              <motion.div
                className="absolute -top-8 -right-8 w-64 h-64 rounded-full"
                style={{
                  border: "1px solid rgba(255,132,0,0.08)",
                  background: "transparent",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />

              {/* Card with stacked content */}
              <div
                className="relative rounded-2xl p-6 lg:p-8"
                style={{
                  background: "#1A1612",
                  border: "1px solid #2D2A24",
                }}
              >
                {/* Top accent */}
                <div className="w-8 h-[2px] mb-6" style={{ background: "#FF8400" }} />

                <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "#8A8275" }}>
                  Currently building
                </p>
                <h3 className="font-['Space_Grotesk'] font-bold text-lg mb-1" style={{ color: "#F5EFE6" }}>
                  Modern Web Experiences
                </h3>
                <p className="text-sm mb-6" style={{ color: "#A89F8F" }}>
                  HTML5 · CSS3 · JavaScript · React · Tailwind
                </p>

                {/* Mini stats */}
                <div className="flex gap-4 pt-4" style={{ borderTop: "1px solid #2D2A24" }}>
                  <div>
                    <p className="text-lg font-bold font-['Space_Grotesk']" style={{ color: "#FF8400" }}>98%</p>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: "#8A8275" }}>Satisfaction</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold font-['Space_Grotesk']" style={{ color: "#FF8400" }}>24h</p>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: "#8A8275" }}>Response</p>
                  </div>
                </div>
              </div>

              {/* Floating tag */}
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-lg text-xs font-medium"
                style={{
                  background: "#12100C",
                  border: "1px solid #2D2A24",
                  color: "#F5EFE6",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="mr-2">🎯</span>Open to work
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#8A8275" }}>Scroll</span>
        <motion.div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, #FF8400, transparent)" }}
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
