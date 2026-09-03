import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerChild } from "@/hooks/useScrollReveal";

const codeLines = [
  { text: '<!DOCTYPE html>', type: "tag" },
  { text: '<html lang="en">', type: "tag" },
  { text: "<head>", type: "tag" },
  { text: '  <meta charset="UTF-8">', type: "tag" },
  { text: "  <!-- SEO optimized for M. Haris -->", type: "comment" },
  { text: "  <title>M. Haris — Web Developer</title>", type: "tag" },
  { text: "</head>", type: "tag" },
  { text: "<body>", type: "tag" },
  { text: "", type: "blank" },
  { text: '  <section class="hero">', type: "tag" },
  { text: "    <h1>Building modern web experiences</h1>", type: "tag" },
  { text: '    <p class="tagline">Clean code. Beautiful design.</p>', type: "tag" },
  { text: '    <button onclick="hire()">', type: "tag" },
  { text: "      Hire Me", type: "string" },
  { text: "    </button>", type: "tag" },
  { text: "  </section>", type: "tag" },
  { text: "", type: "blank" },
  { text: "  <script>", type: "tag" },
  { text: "    const developer = {", type: "keyword" },
  { text: '      name: "M. Haris",', type: "string" },
  { text: '      skills: ["HTML", "CSS", "JS"],', type: "string" },
  { text: '      passion: "∞"', type: "string" },
  { text: "    };", type: "keyword" },
  { text: "  </script>", type: "tag" },
  { text: "</body>", type: "tag" },
  { text: "</html>", type: "tag" },
];

const syntaxColors: Record<string, string> = {
  tag: "#ff79c6",
  attribute: "#50fa7b",
  string: "#f1fa8c",
  comment: "#6272a4",
  keyword: "#bd93f9",
  blank: "transparent",
};

const features = [
  {
    icon: "🎯",
    title: "Semantic HTML",
    desc: "Using proper HTML5 tags for better SEO and accessibility",
  },
  {
    icon: "⚡",
    title: "Performance First",
    desc: "Optimized code that loads fast on all devices",
  },
  {
    icon: "🧩",
    title: "Maintainable",
    desc: "Clean, organized code that's easy to update and scale",
  },
];

const fileTree = [
  { name: "portfolio/", indent: 0, isDir: true },
  { name: "index.html", indent: 1, isDir: false, active: true },
  { name: "style.css", indent: 1, isDir: false },
  { name: "app.js", indent: 1, isDir: false },
  { name: "assets/", indent: 1, isDir: true },
  { name: "logo.svg", indent: 2, isDir: false },
];

export default function CodeShowcase() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  // Trigger typing animation once in view
  useEffect(() => {
    if (isInView && !startedRef.current) {
      startedRef.current = true;
    }
  }, [isInView]);

  // Typing animation — reveal lines one by one
  useEffect(() => {
    if (!startedRef.current || visibleLines >= codeLines.length) return;
    const timeout = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, codeLines[visibleLines].type === "blank" ? 30 : 50);
    return () => clearTimeout(timeout);
  }, [visibleLines]);

  const fullCode = codeLines.map((l) => l.text).join("\n");

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(fullCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fullCode]);

  const highlightLine = (text: string, type: string) => {
    if (type === "blank") return <span>&nbsp;</span>;
    if (type === "comment") return <span style={{ color: syntaxColors.comment }}>{text}</span>;
    if (type === "string") return <span style={{ color: syntaxColors.string }}>{text}</span>;

    // Simple syntax highlighting without complex regex to avoid JSX parsing issues
    const parts: { text: string; color: string }[] = [];
    let remaining = text;
    // Match tag starts/ends
    const tagMatch = remaining.match(/^\s*\/?\w+/);
    if (tagMatch) {
      parts.push({ text: tagMatch[0], color: syntaxColors.tag });
      remaining = remaining.slice(tagMatch[0].length);
    }
    if (remaining.length > 0) parts.push({ text: remaining, color: syntaxColors.tag });

    return (
      <span>
        {parts.map((part, i) => (
          <span key={i} style={{ color: part.color }}>{part.text}</span>
        ))}
      </span>
    );
  };

  return (
    <section ref={sectionRef} style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>

        {/* Main layout: Editor + Features */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* VS Code Editor Mockup */}
          <motion.div
            className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{
              background: "#1e1e2e",
              border: "1px solid rgba(99,102,241,0.2)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.08)",
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ background: "#181825", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-md text-xs"
                style={{ background: "#1e1e2e", color: "#cdd6f4" }}
              >
                <i className="fab fa-html5" style={{ color: "#e34f26" }} aria-hidden="true" />
                index.html
              </div>
              <button
                onClick={copyCode}
                className="ml-auto text-xs px-2.5 py-1 rounded-md transition-all"
                style={{
                  background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                  color: copied ? "#22c55e" : "#6c7086",
                }}
                aria-label="Copy code"
              >
                <i className={`fas ${copied ? "fa-check" : "fa-copy"} mr-1`} aria-hidden="true" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex min-h-[300px] md:min-h-[440px]">
              {/* File explorer sidebar */}
              <div
                className="hidden lg:block w-48 shrink-0 text-xs py-3 overflow-y-auto"
                style={{
                  background: "#181825",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  color: "#6c7086",
                }}
              >
                <p className="px-3 mb-2 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#45475a" }}>
                  Explorer
                </p>
                {fileTree.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center gap-1.5 px-3 py-1"
                    style={{
                      paddingLeft: `${12 + f.indent * 12}px`,
                      color: f.active ? "#cdd6f4" : undefined,
                      background: f.active ? "rgba(99,102,241,0.1)" : undefined,
                    }}
                  >
                    <i
                      className={`${f.isDir ? "fas fa-folder" : "fas fa-file-code"} text-[10px]`}
                      style={{ color: f.isDir ? "#f9e2af" : f.active ? "#89b4fa" : "#585b70" }}
                      aria-hidden="true"
                    />
                    {f.name}
                  </div>
                ))}
              </div>

              {/* Code area */}
              <div className="flex-1 overflow-x-auto">
                <div className="p-4">
                  {codeLines.map((line, i) => (
                    <div
                      key={i}
                      className="flex items-start font-mono text-[13px] leading-6 transition-opacity duration-200"
                      style={{
                        opacity: i < visibleLines ? 1 : 0,
                        color: "#cdd6f4",
                      }}
                    >
                      <span
                        className="w-8 text-right mr-4 shrink-0 select-none text-[11px]"
                        style={{ color: "#45475a" }}
                      >
                        {i + 1}
                      </span>
                      <span className="whitespace-pre">
                        {highlightLine(line.text, line.type)}
                      </span>
                    </div>
                  ))}

                  {/* Blinking cursor at end */}
                  {visibleLines >= codeLines.length && (
                    <div className="flex items-start font-mono text-[13px] leading-6">
                      <span className="w-8 text-right mr-4 shrink-0 select-none text-[11px]" style={{ color: "#45475a" }}>
                        {codeLines.length + 1}
                      </span>
                      <span
                        className="inline-block w-[7px] h-[16px] mt-[3px] animate-pulse"
                        style={{ background: "#89b4fa" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature cards with staggered entrance */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(17,24,39,0.8)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
                variants={staggerChild}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(99,102,241,0.3)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="text-2xl mb-3" aria-hidden="true">{f.icon}</div>
                <h3
                  className="font-['Space_Grotesk'] font-bold text-base mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
