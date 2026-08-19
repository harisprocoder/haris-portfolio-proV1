import { useEffect, useRef, useState } from "react";

const typingWords = ["Web Developer", "UI/UX Designer", "Problem Solver"];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [helloVisible, setHelloVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHelloVisible(true), 1800);
    const t2 = setTimeout(() => setRevealed(true), 2200);
    const t3 = setTimeout(() => setButtonsVisible(true), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

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
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div className="hero-grid-bg" />

      {/* Floating orbs */}
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />

      <div className="max-w-[1200px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        {/* Left content */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide mb-6"
            style={{
              border: "1px solid rgba(99,102,241,0.3)",
              background: "rgba(99,102,241,0.08)",
              color: "#818cf8",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Available for Freelance Projects
          </div>

          {/* Hello line */}
          <p
            className="text-lg md:text-xl mb-1 transition-all duration-700"
            style={{
              color: "#94a3b8",
              opacity: helloVisible ? 1 : 0,
              transform: `translateY(${helloVisible ? 0 : 10}px)`,
            }}
          >
            Hello, I'm
          </p>

          {/* Name */}
          <h1
            className={`hero-name-reveal ${revealed ? "revealed" : ""} hero-name font-['Space_Grotesk'] font-extrabold mb-3 gradient-text`}
            style={{ fontSize: "clamp(42px, 8vw, 80px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            M. Haris
          </h1>

          {/* Typing subtitle */}
          <h2
            className="font-['Space_Grotesk'] text-xl md:text-2xl font-semibold mb-5"
            style={{ color: "#e2e8f0", minHeight: "36px" }}
          >
            {typedText}
            <span className="typing-cursor" />
          </h2>

          {/* Description */}
          <p
            className="text-sm md:text-base leading-relaxed mb-8 max-w-md transition-all duration-700 delay-700"
            style={{
              color: "#94a3b8",
              opacity: helloVisible ? 1 : 0,
              transform: `translateY(${helloVisible ? 0 : 10}px)`,
            }}
          >
            Crafting modern, clean, and user-focused web interfaces from
            Karachi, Pakistan. Specializing in responsive design with 2+ years
            of experience.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-3 mb-8 transition-all duration-700"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: `translateY(${buttonsVisible ? 0 : 20}px)`,
            }}
          >
            <a
              href="#projects"
              onClick={(e) => handleNav(e, "#projects")}
              className="glow-btn inline-flex items-center gap-2 text-sm"
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
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-5 md:gap-8 transition-all duration-700 delay-300"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: `translateY(${buttonsVisible ? 0 : 10}px)`,
            }}
          >
            {[
              { value: "35+", label: "Projects" },
              { value: "25+", label: "Happy Clients" },
              { value: "2+", label: "Years Experience" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-5 md:gap-8">
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
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code visual */}
        <div className="hidden lg:flex justify-center">
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
        </div>
      </div>
    </section>
  );
}
