import { useEffect, useRef, useState, useCallback } from "react";

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
    liveUrl: "https://aplushairs.netlify.app/",
    codeUrl: "https://github.com/harisprocoder",
  },
  {
    id: 2,
    title: "Nimra Beauty — Salon Website",
    category: "Business",
    tagColor: "#f59e0b",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    features: ["Service Showcase", "Gallery Section", "Mobile Optimized"],
    description:
      "A sophisticated beauty salon website with elegant styling, service presentations, and a client-focused layout designed for maximum visual impact.",
    gradient: "linear-gradient(135deg, #78350f, #0d1117)",
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
    liveUrl: "https://student-os-green-ten.vercel.app/onboarding",
    codeUrl: "https://github.com/harisprocoder",
  },
];

function ProjectCard({
  project: proj,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -10,
      y: ((x - centerX) / centerX) * 10,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div className={`scroll-reveal stagger-${(index % 4) + 1} max-w-4xl mx-auto`}>
      <div
        ref={cardRef}
        className="project-card relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Card header */}
        <div
          className="h-64 md:h-80 relative overflow-hidden"
          style={{ background: proj.gradient }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Badges */}
          <div className="absolute top-5 left-5 flex items-center gap-2 flex-wrap">
            <span
              className="project-tag"
              style={{
                background: `${proj.tagColor}20`,
                color: proj.tagColor,
                border: `1px solid ${proj.tagColor}40`,
              }}
            >
              {proj.category}
            </span>
            <span
              className="project-tag"
              style={{
                background: "rgba(34,197,94,0.15)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.4)",
              }}
            >
              <i className="fas fa-check-circle mr-1" aria-hidden="true" /> Live
              Project
            </span>
          </div>

          {/* Hover overlay */}
          <div className="project-card-overlay">
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-2 hover:bg-white/30 transition-all text-white font-semibold text-sm"
            >
              <i className="fas fa-external-link-alt" aria-hidden="true" /> Visit
              Website
            </a>
          </div>
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

          <div className="flex flex-wrap gap-2 mb-4">
            {proj.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: `${proj.tagColor}12`,
                  color: proj.tagColor,
                  border: `1px solid ${proj.tagColor}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
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
              className="glow-btn text-sm py-3 px-8 inline-flex items-center gap-2"
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
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".scroll-reveal, .scroll-reveal-left")
              .forEach((el) => {
                el.classList.add("visible");
              });
          }
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-folder-open" aria-hidden="true" /> FEATURED
            PROJECTS
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            A showcase of my{" "}
            <span className="gradient-text">recent work</span>
          </h2>
          <p className="text-base mb-10" style={{ color: "#94a3b8" }}>
            Real projects built for real clients and personal exploration.
          </p>
        </div>

        {/* Premium project cards — stacked full-width */}
        <div className="space-y-8">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} />
          ))}
        </div>

        {/* GitHub link */}
        <div className="text-center mt-10 scroll-reveal stagger-2">
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
        </div>
      </div>
    </section>
  );
}
