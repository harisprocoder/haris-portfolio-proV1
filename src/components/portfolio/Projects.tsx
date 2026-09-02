import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  staggerContainer,
  staggerChild,
  sectionLabelVariants,
  textMaskReveal,
} from "@/hooks/useScrollReveal";

const projects = [
  {
    id: 1,
    title: "A Plus Hairs — Bridal Salon Website",
    category: "Business",
    tagColor: "#f43f5e",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    features: ["Service Showcase", "Elegant Design", "Mobile Friendly"],
    description:
      "A elegant and modern bridal salon website featuring a luxurious design with service showcases, gallery sections, and appointment booking information. Built for a real client in Karachi, Pakistan.",
    gradient: "linear-gradient(135deg, #4c1d3a, #0d1117)",
    previewImage: "/projects/aplushairs.png",
    liveUrl: "https://aplushairs.netlify.app/",
    codeUrl: "https://github.com/harisprocoder",
  },
  {
    id: 2,
    title: "Nimra Beauty — Salon Website",
    category: "Business",
    tagColor: "#d4a0a0",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    features: ["Service Showcase", "Gallery Section", "Mobile Optimized"],
    description:
      "A sophisticated beauty salon website with elegant styling, service presentations, and a client-focused layout designed for maximum visual impact.",
    gradient: "linear-gradient(135deg, #8b6f6f, #0d1117)",
    previewImage: "/projects/nimrabeauty.gif",
    liveUrl: "https://nimra-beauty-saloon.vercel.app/",
    codeUrl: "https://github.com/harisprocoder",
  },
  {
    id: 3,
    title: "Luma Elevate — E-commerce Store",
    category: "E-commerce",
    tagColor: "#8b5cf6",
    tags: ["HTML5", "Tailwind CSS", "JavaScript", "React"],
    features: ["Product Catalog", "Shopping Experience", "Modern UI"],
    description:
      "A premium e-commerce store featuring a refined shopping experience with product showcases, smooth navigation, and a visually elevated brand aesthetic.",
    gradient: "linear-gradient(135deg, #3b0764, #0d1117)",
    previewImage: "/projects/lumaelevate.gif",
    liveUrl: "https://luma-elevate-store.vercel.app/",
    codeUrl: "https://github.com/harisprocoder",
  },
  {
    id: 4,
    title: "Student OS — Education Platform",
    category: "Web App",
    tagColor: "#22c55e",
    tags: ["HTML5", "Tailwind CSS", "JavaScript", "React"],
    features: ["Student Dashboard", "Responsive UI", "Interactive Onboarding"],
    description:
      "A clean and modern educational platform designed for students to manage their learning experience with an intuitive interface and organized onboarding flow.",
    gradient: "linear-gradient(135deg, #064e3b, #0d1117)",
    previewImage: "/projects/studentos.gif",
    liveUrl: "https://student-os-smoky.vercel.app/",
    codeUrl: "https://github.com/harisprocoder/student-os-smoky",
  },
];

function ProjectCard({
  project: proj,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        ref={cardRef}
        className="project-card relative overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          scale: 1.015,
          boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.15)",
          borderColor: "rgba(99,102,241,0.25)",
          transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      >
        {/* Card header with preview image */}
        <div
          className="h-64 md:h-80 relative overflow-hidden"
          style={{ background: proj.gradient }}
        >
          {/* Preview screenshot with parallax on hover */}
          <motion.img
            src={proj.previewImage}
            alt={`${proj.title} preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ objectPosition: "center top" }}
          />

          {/* Bottom gradient fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(17,24,39,0.95) 0%, transparent 100%)",
            }}
          />

          {/* Badges */}
          <div className="absolute top-5 left-5 flex items-center gap-2 flex-wrap z-10">
            <motion.span
              className="project-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
              style={{
                background: `${proj.tagColor}20`,
                color: proj.tagColor,
                border: `1px solid ${proj.tagColor}40`,
              }}
            >
              {proj.category}
            </motion.span>
            <motion.span
              className="project-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
              style={{
                background: "rgba(34,197,94,0.15)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.4)",
              }}
            >
              <i className="fas fa-check-circle mr-1" aria-hidden="true" /> Live
              Project
            </motion.span>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="project-card-overlay"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-2 hover:bg-white/30 transition-all text-white font-semibold text-sm"
            >
              <i className="fas fa-external-link-alt" aria-hidden="true" /> Visit
              Website
            </a>
          </motion.div>
        </div>

        {/* Card body */}
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3
                className="font-['Space_Grotesk'] font-bold text-xl md:text-2xl mb-1"
                style={{ color: "#f1f5f9" }}
              >
                {proj.title}
              </h3>
              <span
                className="text-xs font-semibold"
                style={{ color: "#22c55e" }}
              >
                ★ Real Client Project
              </span>
            </div>
          </div>

          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {proj.tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                variants={staggerChild}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                style={{
                  background: `${proj.tagColor}12`,
                  color: proj.tagColor,
                  border: `1px solid ${proj.tagColor}25`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: "#94a3b8" }}
          >
            {proj.description}
          </p>

          <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
            {proj.features.join(" • ")}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn text-sm py-3 px-8 inline-flex items-center gap-2 shimmer-btn"
            >
              <i className="fas fa-external-link-alt" aria-hidden="true" /> Visit
              Website
            </a>
            <a
              href={proj.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-btn text-sm py-3 px-8 inline-flex items-center gap-2"
            >
              <i className="fab fa-github" aria-hidden="true" /> View Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

  return (
    <section id="projects" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-folder-open" aria-hidden="true" /> FEATURED
            PROJECTS
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            A showcase of my{" "}
            <span className="gradient-text">recent work</span>
          </motion.h2>
          <motion.p className="text-base mb-10" style={{ color: "#94a3b8" }} variants={staggerChild}>
            Real projects built for real clients and personal exploration.
          </motion.p>
        </motion.div>

        {/* Premium project cards — stacked full-width */}
        <div className="space-y-8">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} isInView={isInView} />
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a
            href="https://github.com/harisprocoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
            style={{ color: "#94a3b8" }}
          >
            <i className="fab fa-github" aria-hidden="true" /> View more on
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
