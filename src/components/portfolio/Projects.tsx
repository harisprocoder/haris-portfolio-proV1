import { useEffect, useRef, useState, useCallback } from "react";

const projects = [
  {
    id: 1,
    title: "Modern Business Website",
    category: "Business",
    tagColor: "#3b82f6",
    tags: ["HTML5", "Tailwind CSS", "JavaScript"],
    features: ["Responsive Design", "Contact Forms", "Service Showcase"],
    gradient: "linear-gradient(135deg, #1e3a5f, #0d1117)",
  },
  {
    id: 2,
    title: "Creative Portfolio Website",
    category: "Portfolio",
    tagColor: "#8b5cf6",
    tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    features: ["Interactive Galleries", "Smooth Animations", "Dark Mode"],
    gradient: "linear-gradient(135deg, #2d1b69, #0d1117)",
  },
  {
    id: 3,
    title: "E-commerce Landing Page",
    category: "Landing Page",
    tagColor: "#06b6d4",
    tags: ["HTML5", "Tailwind CSS", "JavaScript"],
    features: ["Conversion Optimized", "Lead Capture", "Product Showcase"],
    gradient: "linear-gradient(135deg, #0c4a6e, #0d1117)",
  },
];

const filters = ["All", "Business", "Portfolio", "Landing Page"];

const projectStats = [
  { value: "8", label: "Business Sites" },
  { value: "12", label: "Portfolios" },
  { value: "15", label: "Landing Pages" },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
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
      x: ((y - centerY) / centerY) * -15,
      y: ((x - centerX) / centerX) * 15,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={cardRef}
      className="project-card relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Card header with gradient bg */}
      <div
        className="h-48 relative overflow-hidden"
        style={{ background: project.gradient }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span
            className="project-tag"
            style={{
              background: `${project.tagColor}20`,
              color: project.tagColor,
              border: `1px solid ${project.tagColor}40`,
            }}
          >
            {project.category}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="project-card-overlay">
          <a
            href="#"
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <i className="fas fa-external-link-alt text-white" />
          </a>
          <a
            href="#"
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <i className="fab fa-github text-white" />
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3
          className="font-['Space_Grotesk'] font-bold text-lg mb-3"
          style={{ color: "#f1f5f9" }}
        >
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: "rgba(99,102,241,0.1)",
                color: "#6366f1",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          {project.features.join(" • ")}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-reveal").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal">
          <span className="section-label">
            <i className="fas fa-folder-open" /> FEATURED PROJECTS
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            A showcase of my{" "}
            <span className="gradient-text">recent work</span>
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-12 scroll-reveal stagger-1">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`scroll-reveal stagger-${i + 2}`}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 scroll-reveal stagger-4">
          {projectStats.map((s) => (
            <div key={s.label} className="stat-item">
              <p className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] gradient-text">
                {s.value}
              </p>
              <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center scroll-reveal stagger-5">
          <a
            href="https://github.com/harisprocoder"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn inline-flex items-center gap-2"
          >
            <i className="fab fa-github" /> View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
