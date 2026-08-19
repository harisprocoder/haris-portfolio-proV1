import { useEffect, useRef, useState } from "react";

const typingWords = ["Web Developer", "UI/UX Designer", "Problem Solver"];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [helloVisible, setHelloVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // Trigger entrance animations after preloader
  useEffect(() => {
    const t1 = setTimeout(() => setHelloVisible(true), 1800);
    const t2 = setTimeout(() => setRevealed(true), 2200);
    const t3 = setTimeout(() => setButtonsVisible(true), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Typing animation
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
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background grid */}
      <div className="hero-grid-bg" />

      {/* Floating orbs */}
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />

      {/* Floating brackets */}
      <div className="floating-bracket">{"{ }"}</div>
      <div className="floating-bracket">{"< />"}</div>
      <div className="floating-bracket">{"[ ]"}</div>

      <div className="max-w-[1200px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left content */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
            style={{
              border: "1px solid rgba(99,102,241,0.3)",
              background: "rgba(99,102,241,0.1)",
              color: "#6366f1",
            }}
          >
            <span>✦</span>
            <span>Available for Freelance Projects</span>
          </div>

          {/* Hello line */}
          <p
            className="text-xl mb-2 transition-all duration-700"
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
            className={`hero-name-reveal ${revealed ? "revealed" : ""} hero-name font-['Space_Grotesk'] font-extrabold mb-4 gradient-text`}
            style={{ fontSize: "clamp(40px, 8vw, 80px)", letterSpacing: "-0.02em" }}
          >
            M. Haris
          </h1>

          {/* Typing subtitle */}
          <h2
            className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold mb-6"
            style={{ color: "#f1f5f9", minHeight: "40px" }}
          >
            {typedText}
            <span className="typing-cursor" />
          </h2>

          {/* Description */}
          <p
            className="text-base md:text-lg leading-relaxed mb-8 max-w-lg transition-all duration-700 delay-700"
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
            className="flex flex-wrap gap-4 mb-10 transition-all duration-700"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: `translateY(${buttonsVisible ? 0 : 20}px)`,
            }}
          >
            <a
              href="#projects"
              onClick={(e) => handleNav(e, "#projects")}
              className="glow-btn inline-flex items-center gap-2"
            >
              View My Work
              <i className="fas fa-arrow-down text-sm" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="outline-btn inline-flex items-center gap-2"
            >
              Contact Me
              <i className="fas fa-envelope text-sm" />
            </a>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-6 md:gap-8 transition-all duration-700 delay-300"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: `translateY(${buttonsVisible ? 0 : 10}px)`,
            }}
          >
            <div className="text-center">
              <p className="text-2xl font-bold font-['Space_Grotesk'] gradient-text">
                35+
              </p>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Projects
              </p>
            </div>
            <div
              className="w-px"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div className="text-center">
              <p className="text-2xl font-bold font-['Space_Grotesk'] gradient-text">
                25+
              </p>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Happy Clients
              </p>
            </div>
            <div
              className="w-px"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div className="text-center">
              <p className="text-2xl font-bold font-['Space_Grotesk'] gradient-text">
                2+
              </p>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Years Experience
              </p>
            </div>
          </div>
        </div>

        {/* Right: Code visual */}
        <div className="hidden lg:flex justify-center">
          <div className="code-visual max-w-md w-full">
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs" style={{ color: "#475569" }}>
                portfolio.html
              </span>
            </div>
            <div>
              <div>
                <span className="code-line-numbers">1</span>
                <span className="code-comment">
                  {"<!-- Portfolio Section -->"}
                </span>
              </div>
              <div>
                <span className="code-line-numbers">2</span>
                <span className="code-tag">{"<"}</span>
                <span className="code-attr">section</span>
                <span className="code-tag">{">"}</span>
              </div>
              <div>
                <span className="code-line-numbers">3</span>
                {"  "}
                <span className="code-tag">{"<"}</span>
                <span className="code-attr">h1</span>
                <span className="code-tag">{">"}</span>
                <span className="code-string">M. Haris</span>
                <span className="code-tag">{"</"}</span>
                <span className="code-attr">h1</span>
                <span className="code-tag">{">"}</span>
              </div>
              <div>
                <span className="code-line-numbers">4</span>
                {"  "}
                <span className="code-tag">{"<"}</span>
                <span className="code-attr">p</span>
                <span className="code-tag">{">"}</span>
              </div>
              <div>
                <span className="code-line-numbers">5</span>
                {"    "}
                <span className="code-string">Web Developer</span>
              </div>
              <div>
                <span className="code-line-numbers">6</span>
                {"  "}
                <span className="code-tag">{"</"}</span>
                <span className="code-attr">p</span>
                <span className="code-tag">{">"}</span>
              </div>
              <div>
                <span className="code-line-numbers">7</span>
                {"  "}
                <span className="code-tag">{"<"}</span>
                <span className="code-attr">div</span>
                <span className="code-attr"> class</span>
                <span className="code-tag">=</span>
                <span className="code-string">"skills"</span>
                <span className="code-tag">{">"}</span>
              </div>
              <div>
                <span className="code-line-numbers">8</span>
                {"    "}
                <span className="code-keyword">HTML5</span> ·{" "}
                <span className="code-keyword">CSS3</span> ·{" "}
                <span className="code-keyword">JS</span> ·{" "}
                <span className="code-keyword">React</span>
              </div>
              <div>
                <span className="code-line-numbers">9</span>
                {"  "}
                <span className="code-tag">{"</"}</span>
                <span className="code-attr">div</span>
                <span className="code-tag">{">"}</span>
              </div>
              <div>
                <span className="code-line-numbers">10</span>
                <span className="code-tag">{"</"}</span>
                <span className="code-attr">section</span>
                <span className="code-tag">{">"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
