import { useState, useCallback } from "react";

const snippets = [
  {
    lang: "HTML",
    title: "Semantic Structure",
    code: `<section class="hero" aria-label="Hero">
  <nav aria-label="Main navigation">
    <a href="/" class="logo">MH</a>
  </nav>
  <h1 class="gradient-text">
    M. Haris
  </h1>
  <p>Crafting modern web experiences</p>
  <div class="stats">
    <span>35+ Projects</span>
    <span>25+ Clients</span>
  </div>
</section>`,
    color: "#e34f26",
  },
  {
    lang: "CSS",
    title: "Glass Morphism",
    code: `.glass-card {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px
    rgba(0, 0, 0, 0.5);
}

.gradient-text {
  background: linear-gradient(
    135deg, #6366f1, #06b6d4
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`,
    color: "#1572b6",
  },
  {
    lang: "JavaScript",
    title: "Scroll Animation",
    code: `const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Trigger staggered child animations
        entry.target
          .querySelectorAll(".stagger")
          .forEach((el, i) => {
            el.style.transitionDelay =
              \`\${i * 0.1}s\`;
          });
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));`,
    color: "#f7df1e",
  },
  {
    lang: "React",
    title: "Custom Hook",
    code: `function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const ease = (t) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    function tick(now) {
      const progress = Math.min(
        (now - start) / duration, 1
      );
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [visible, target, duration]);

  return { count, setVisible };
}`,
    color: "#61dafb",
  },
];

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(snippets[activeTab].code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activeTab]);

  return (
    <section className="py-24 md:py-32" style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-code" aria-hidden="true" /> CODE SHOWCASE
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Clean, modern <span className="gradient-text">code quality</span>
          </h2>
          <p className="text-base mb-12 max-w-lg" style={{ color: "#94a3b8" }}>
            A peek at the code behind my projects — semantic, performant, and maintainable.
          </p>
        </div>

        <div className="glass-card overflow-hidden scroll-reveal stagger-1">
          {/* Tabs */}
          <div
            className="flex items-center border-b overflow-x-auto"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {snippets.map((s, i) => (
              <button
                key={s.lang}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === i
                    ? "border-b-2"
                    : ""
                }`}
                style={{
                  color: activeTab === i ? s.color : "#475569",
                  borderColor: activeTab === i ? s.color : "transparent",
                }}
              >
                {s.lang}
              </button>
            ))}
            <div className="ml-auto px-4">
              <button
                onClick={copyCode}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: copied
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(255,255,255,0.06)",
                  color: copied ? "#22c55e" : "#94a3b8",
                }}
              >
                <i className={`fas ${copied ? "fa-check" : "fa-copy"} mr-1`} aria-hidden="true" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Code */}
          <div className="p-6 overflow-x-auto">
            <p
              className="text-xs font-semibold mb-3 uppercase tracking-wider"
              style={{ color: snippets[activeTab].color }}
            >
              {snippets[activeTab].title}
            </p>
            <pre className="text-sm leading-relaxed" style={{ color: "#e2e8f0", fontFamily: "'Courier New', monospace" }}>
              <code>{snippets[activeTab].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
