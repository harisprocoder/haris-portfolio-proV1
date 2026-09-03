import { useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerChild } from "@/hooks/useScrollReveal";

const codeLines = [
  { text: 'import { useState } from "react";', type: "keyword" },
  { text: 'import { motion } from "framer-motion";', type: "keyword" },
  { text: "", type: "blank" },
  { text: "interface Project {", type: "tag" },
  { text: "  id: string;", type: "attribute" },
  { text: "  title: string;", type: "attribute" },
  { text: "  description: string;", type: "attribute" },
  { text: "  techStack: string[];", type: "attribute" },
  { text: "}", type: "tag" },
  { text: "", type: "blank" },
  { text: "export function ProjectCard({ project }) {", type: "keyword" },
  { text: "  const [hovered, setHovered] = useState(false);", type: "attribute" },
  { text: "", type: "blank" },
  { text: "  return (", type: "tag" },
  { text: '    <motion.div className="card"', type: "tag" },
  { text: "      whileHover={{ scale: 1.02 }}", type: "attribute" },
  { text: "      animate={{ opacity: 1 }}", type: "attribute" },
  { text: "    >", type: "tag" },
  { text: '      <h3 className="title">', type: "tag" },
  { text: "        {project.title}", type: "string" },
  { text: "      </h3>", type: "tag" },
  { text: '      <p className="desc">', type: "tag" },
  { text: "        {project.description}", type: "string" },
  { text: "      </p>", type: "tag" },
  { text: '      <div className="tags">', type: "tag" },
  { text: "        {project.techStack.map(tech => (", type: "keyword" },
  { text: '          <span key={tech}>{tech}</span>', type: "tag" },
  { text: "        ))}", type: "keyword" },
  { text: "      </div>", type: "tag" },
  { text: "    </motion.div>", type: "tag" },
  { text: "  );", type: "tag" },
  { text: "}", type: "tag" },
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
    icon: "⚛️",
    title: "React & TypeScript",
    desc: "Component-based architecture with full type safety for scalable applications",
  },
  {
    icon: "🎨",
    title: "Tailwind CSS",
    desc: "Utility-first styling for rapid, consistent UI development",
  },
  {
    icon: "✨",
    title: "Framer Motion",
    desc: "Smooth, performant animations that enhance user experience",
  },
];

const fileTree = [
  { name: "src/", indent: 0, isDir: true },
  { name: "components/", indent: 1, isDir: true },
  { name: "ProjectCard.tsx", indent: 2, isDir: false, active: true },
  { name: "Hero.tsx", indent: 2, isDir: false },
  { name: "Navbar.tsx", indent: 2, isDir: false },
  { name: "hooks/", indent: 1, isDir: true },
  { name: "useScrollReveal.ts", indent: 2, isDir: false },
];

export default function CodeShowcase() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

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

    const parts: { text: string; color: string }[] = [];
    let remaining = text;
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
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
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
            transition={{ duration: 0.7, delay: 0.2 }}
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
                <i className="fab fa-react" style={{ color: "#61dafb" }} aria-hidden="true" />
                ProjectCard.tsx
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

              {/* Code area - shows all lines immediately */}
              <div className="flex-1 overflow-x-auto">
                <div className="p-4">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start font-mono text-[13px] leading-6"
                      style={{ color: "#cdd6f4" }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.02 }}
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
                    </motion.div>
                  ))}

                  {/* Blinking cursor at end */}
                  {isInView && (
                    <motion.div
                      className="flex items-start font-mono text-[13px] leading-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="w-8 text-right mr-4 shrink-0 select-none text-[11px]" style={{ color: "#45475a" }}>
                        {codeLines.length + 1}
                      </span>
                      <span
                        className="inline-block w-[7px] h-[16px] mt-[3px] animate-pulse"
                        style={{ background: "#89b4fa" }}
                      />
                    </motion.div>
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
