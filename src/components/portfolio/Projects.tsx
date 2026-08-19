import { useEffect, useRef, useState, useCallback } from "react";

const project = {
  id: 4,
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
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
    <section id="projects" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-folder-open" aria-hidden="true" /> FEATURED PROJECT
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            A showcase of my{" "}
            <span className="gradient-text">recent work</span>
          </h2>
        </div>

        {/* Single premium project card */}
        <div className="scroll-reveal stagger-1 max-w-4xl mx-auto">
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

              {/* Badges */}
              <div className="absolute top-5 left-5 flex items-center gap-2 flex-wrap">
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
                <span
                  className="project-tag"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    color: "#22c55e",
                    border: "1px solid rgba(34,197,94,0.4)",
                  }}
                >
                  <i className="fas fa-check-circle mr-1" aria-hidden="true" /> Live Project
                </span>
              </div>

              {/* Hover overlay with visit button */}
              <div className="project-card-overlay">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-2 hover:bg-white/30 transition-all text-white font-semibold text-sm"
                >
                  <i className="fas fa-external-link-alt" aria-hidden="true" /> Visit Website
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
                    {project.title}
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
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: `${project.tagColor}12`,
                      color: project.tagColor,
                      border: `1px solid ${project.tagColor}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
                {project.description}
              </p>

              <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
                {project.features.join(" • ")}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn text-sm py-3 px-8 inline-flex items-center gap-2"
                >
                  <i className="fas fa-external-link-alt" aria-hidden="true" /> Visit Website
                </a>
                <a
                  href={project.codeUrl}
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

        {/* GitHub link below */}
        <div className="text-center mt-12 scroll-reveal stagger-2">
          <a
            href="https://github.com/harisprocoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
            style={{ color: "#94a3b8" }}
          >
            <i className="fab fa-github" aria-hidden="true" /> View more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
