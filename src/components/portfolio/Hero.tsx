import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT } from "@/hooks/useScrollReveal";

const typingWords = ["Web Developer", "UI/UX Designer", "Problem Solver"];

const nameWords = ["M.", "Haris"];

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const greetingVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const nameWordVariants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2, ease: EASE_OUT },
  },
};

const buttonsVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const statChildVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const codeBlockVariants = {
  hidden: { opacity: 0, x: 60, rotateY: -8 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 1, delay: 0.8, ease: EASE_OUT },
  },
};

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax for background orbs
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const codeBlockY = useTransform(scrollYProgress, [0, 1], [0, 40]);

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
      className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div className="hero-grid-bg" />

      {/* Floating orbs with parallax */}
      <motion.div
        className="floating-orb floating-orb-1"
        style={{ y: orb1Y }}
      />
      <motion.div
        className="floating-orb floating-orb-2"
        style={{ y: orb2Y }}
      />
      <motion.div
        className="floating-orb floating-orb-3"
        style={{ y: orb3Y }}
      />

      {/* Ambient gradient pulse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)",
          animation: "ambientPulse 8s ease-in-out infinite alternate",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        {/* Left content */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide mb-6"
            style={{
              border: "1px solid rgba(99,102,241,0.3)",
              background: "rgba(99,102,241,0.08)",
              color: "#818cf8",
            }}
            variants={badgeVariants}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Available for Freelance Projects
          </motion.div>

          {/* Hello line */}
          <motion.p
            className="text-lg md:text-xl mb-1"
            style={{ color: "#94a3b8" }}
            variants={greetingVariants}
          >
            Hello, I'm
          </motion.p>

          {/* Name — word-by-word reveal */}
          <div
            className="flex flex-wrap gap-x-3 md:gap-x-4 hero-name mb-3"
            style={{ fontSize: "clamp(42px, 8vw, 80px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            {nameWords.map((word, i) => (
              <motion.span
                key={word}
                className="font-['Space_Grotesk'] font-extrabold gradient-text inline-block"
                variants={nameWordVariants}
                style={{ perspective: 600 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Typing subtitle */}
          <motion.h2
            className="font-['Space_Grotesk'] text-xl md:text-2xl font-semibold mb-5"
            style={{ color: "#e2e8f0", minHeight: "36px" }}
            variants={greetingVariants}
          >
            {typedText}
            <span className="typing-cursor" />
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-[13px] md:text-base leading-relaxed mb-6 md:mb-8 max-w-md"
            style={{ color: "#94a3b8" }}
            variants={descVariants}
          >
            Crafting modern, clean, and user-focused web interfaces from
            Karachi, Pakistan. Specializing in responsive design with 2+ years
            of experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mb-6 md:mb-8"
            variants={buttonsVariants}
          >
            <a
              href="#projects"
              onClick={(e) => handleNav(e, "#projects")}
              className="glow-btn inline-flex items-center gap-2 text-sm shimmer-btn"
            >
              View My Work
              <i className="fas fa-arrow-down text-xs" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="outline-btn inline-flex items-center gap-2 text-sm"
            >
              Contact Me
              <i className="fas fa-envelope text-xs" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-4 md:gap-8"
            variants={statsVariants}
          >
            {[
              { value: "35+", label: "Projects" },
              { value: "25+", label: "Happy Clients" },
              { value: "2+", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-5 md:gap-8"
                variants={statChildVariants}
              >
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    {stat.label}
                  </p>
                </div>
                {i < 2 && (
                  <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.06)" }} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Code visual with parallax */}
        <motion.div
          className="hidden lg:flex justify-center"
          variants={codeBlockVariants}
          initial="hidden"
          animate="visible"
          style={{ y: codeBlockY, perspective: 1000 }}
        >
          <div
            className="w-full max-w-md rounded-xl overflow-hidden"
            style={{
              background: "#1e1e2e",
              border: "1px solid rgba(99,102,241,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.05)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ background: "#181825", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[11px] font-mono" style={{ color: "#6c7086" }}>
                portfolio.html
              </span>
            </div>

            {/* Code content */}
            <div className="p-4 font-mono text-[12px] leading-6" style={{ color: "#cdd6f4" }}>
              {[
                { num: 1, parts: [{ t: "<!-- Portfolio Section -->", c: "#585b70" }] },
                { num: 2, parts: [{ t: "<", c: "#ff79c6" }, { t: "section", c: "#50fa7b" }, { t: ">", c: "#ff79c6" }] },
                { num: 3, parts: [{ t: "  <", c: "#ff79c6" }, { t: "h1", c: "#50fa7b" }, { t: ">", c: "#ff79c6" }, { t: "M. Haris", c: "#f1fa8c" }, { t: "</", c: "#ff79c6" }, { t: "h1", c: "#50fa7b" }, { t: ">", c: "#ff79c6" }] },
                { num: 4, parts: [{ t: "  <", c: "#ff79c6" }, { t: "p", c: "#50fa7b" }, { t: ">", c: "#ff79c6" }] },
                { num: 5, parts: [{ t: "    ", c: "#cdd6f4" }, { t: "Web Developer", c: "#f1fa8c" }] },
                { num: 6, parts: [{ t: "  </", c: "#ff79c6" }, { t: "p", c: "#50fa7b" }, { t: ">", c: "#ff79c6" }] },
                { num: 7, parts: [{ t: "  <", c: "#ff79c6" }, { t: "div", c: "#50fa7b" }, { t: " class", c: "#bd93f9" }, { t: "=", c: "#ff79c6" }, { t: "\"skills\"", c: "#f1fa8c" }, { t: ">", c: "#ff79c6" }] },
                { num: 8, parts: [{ t: "    ", c: "#cdd6f4" }, { t: "HTML5", c: "#bd93f9" }, { t: " · ", c: "#585b70" }, { t: "CSS3", c: "#bd93f9" }, { t: " · ", c: "#585b70" }, { t: "JS", c: "#bd93f9" }, { t: " · ", c: "#585b70" }, { t: "React", c: "#bd93f9" }] },
                { num: 9, parts: [{ t: "  </", c: "#ff79c6" }, { t: "div", c: "#50fa7b" }, { t: ">", c: "#ff79c6" }] },
                { num: 10, parts: [{ t: "</", c: "#ff79c6" }, { t: "section", c: "#50fa7b" }, { t: ">", c: "#ff79c6" }] },
              ].map((line) => (
                <div key={line.num} className="flex items-start">
                  <span className="w-6 text-right mr-4 shrink-0 select-none text-[11px]" style={{ color: "#45475a" }}>
                    {line.num}
                  </span>
                  <span>
                    {line.parts.map((p, i) => (
                      <span key={i} style={{ color: p.c }}>{p.t}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <span className="text-xs font-medium" style={{ color: "#475569" }}>Scroll to explore</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.2)] flex justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1 h-1.5 rounded-full bg-[#6366f1]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
