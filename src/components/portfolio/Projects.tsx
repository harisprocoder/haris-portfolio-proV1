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
    title: "A Plus Hairs",
    subtitle: "Bridal Salon Website",
    category: "Business",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    description: "A elegant bridal salon website featuring a luxurious design with service showcases, gallery sections, and appointment booking.",
    gradient: "linear-gradient(135deg, #2a1a12, #1A1612)",
    previewImage: "/projects/aplushairs.png",
    liveUrl: "https://aplushairs.netlify.app/",
    codeUrl: "https://github.com/harisprocoder",
    year: "2024",
  },
  {
    id: 2,
    title: "Nimra Beauty",
    subtitle: "Salon Website",
    category: "Business",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    description: "A sophisticated beauty salon website with elegant styling and a client-focused layout designed for maximum visual impact.",
    gradient: "linear-gradient(135deg, #2a1a12, #1A1612)",
    previewImage: "/projects/nimrabeauty.gif",
    liveUrl: "https://nimra-beauty-saloon.vercel.app/",
    codeUrl: "https://github.com/harisprocoder",
    year: "2024",
  },
  {
    id: 3,
    title: "Luma Elevate",
    subtitle: "E-commerce Store",
    category: "E-commerce",
    tags: ["HTML5", "Tailwind", "JavaScript", "React"],
    description: "A premium e-commerce store featuring a refined shopping experience with product showcases and smooth navigation.",
    gradient: "linear-gradient(135deg, #1a1220, #1A1612)",
    previewImage: "/projects/lumaelevate.gif",
    liveUrl: "https://luma-elevate-store.vercel.app/",
    codeUrl: "https://github.com/harisprocoder",
    year: "2025",
  },
  {
    id: 4,
    title: "Student OS",
    subtitle: "Education Platform",
    category: "Web App",
    tags: ["HTML5", "Tailwind", "JavaScript", "React"],
    description: "A clean educational platform designed for students to manage their learning experience with an intuitive interface.",
    gradient: "linear-gradient(135deg, #121a14, #1A1612)",
    previewImage: "/projects/studentos.gif",
    liveUrl: "https://student-os-smoky.vercel.app/",
    codeUrl: "https://github.com/harisprocoder/student-os-smoky",
    year: "2025",
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
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center ${isEven ? "" : "lg:direction-rtl"}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Image — alternating position */}
      <div className={`${isEven ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"}`}>
        <motion.div
          className="relative rounded-xl overflow-hidden cursor-pointer"
          style={{
            background: proj.gradient,
            border: "1px solid #2D2A24",
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={proj.previewImage}
            alt={`${proj.title} preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-top"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(26,22,18,0.95) 0%, transparent 100%)" }}
          />
          {/* Year badge */}
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-md text-[11px] font-semibold"
            style={{ background: "rgba(10,7,2,0.8)", color: "#A89F8F", border: "1px solid #2D2A24" }}
          >
            {proj.year}
          </div>
          {/* Hover CTA */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0" style={{ background: "rgba(10,7,2,0.6)", backdropFilter: "blur(4px)" }} />
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-6 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: "#FF8400", color: "white", boxShadow: "0 4px 20px rgba(255,132,0,0.4)" }}
            >
              <i className="fas fa-external-link-alt mr-2" aria-hidden="true" />Visit Site
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Info — alternating position */}
      <div className={`${isEven ? "lg:col-span-5" : "lg:col-span-5 lg:order-1"} py-2`}>
        <div className="mb-1">
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#FF8400" }}>
            {proj.category}
          </span>
        </div>
        <h3 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl mb-1" style={{ color: "#F5EFE6" }}>
          {proj.title}
        </h3>
        <p className="text-sm mb-3" style={{ color: "#A89F8F" }}>{proj.subtitle}</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#8A8275" }}>
          {proj.description}
        </p>

        {/* Tags — minimal */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-1 rounded"
              style={{ background: "rgba(255,132,0,0.06)", color: "#FF8400" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={proj.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            style={{ color: "#F5EFE6" }}
          >
            <i className="fas fa-external-link-alt text-[10px]" aria-hidden="true" />Visit Site
          </a>
          <a
            href={proj.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            style={{ color: "#8A8275" }}
          >
            <i className="fab fa-github text-[10px]" aria-hidden="true" />Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

  return (
    <section id="projects" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">
            <i className="fas fa-folder-open" aria-hidden="true" /> FEATURED PROJECTS
          </span>
          <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: "#F5EFE6" }}>
            Selected work that<br />
            <span className="gradient-text">speaks for itself</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl" style={{ color: "#A89F8F" }}>
            Real projects built for real clients and personal exploration.
          </p>
          <span className="accent-number hidden lg:block" aria-hidden="true">03</span>
        </motion.div>

        {/* Project cards — alternating layout */}
        <div className="space-y-12 lg:space-y-20">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} isInView={isInView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a
            href="https://github.com/harisprocoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm font-medium transition-all duration-300 group"
            style={{ color: "#A89F8F" }}
          >
            <span className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ border: "1px solid #2D2A24", background: "#1A1612" }}>
              <i className="fab fa-github text-base" style={{ color: "#FF8400" }} aria-hidden="true" />
            </span>
            <span>View more on GitHub</span>
            <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
