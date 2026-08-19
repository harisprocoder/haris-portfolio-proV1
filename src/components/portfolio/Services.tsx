import { useEffect, useRef } from "react";

const services = [
  {
    icon: "🖥️",
    title: "Custom Website Development",
    timeline: "2-4 weeks",
    deliverables: [
      "Responsive design",
      "Cross-browser compatibility",
      "Performance optimization",
      "SEO best practices",
      "Mobile-first approach",
    ],
  },
  {
    icon: "🎨",
    title: "UI/UX Design Services",
    timeline: "1-2 weeks",
    deliverables: [
      "Wireframes & Mockups",
      "Interactive Prototypes",
      "User journey mapping",
      "Design system creation",
      "UI pattern library",
    ],
  },
  {
    icon: "🔧",
    title: "Website Maintenance & Support",
    timeline: "Monthly packages",
    deliverables: [
      "Regular updates",
      "Bug fixes & patches",
      "Performance monitoring",
      "Content updates",
      "Security patches",
    ],
  },
  {
    icon: "💡",
    title: "Web Development Consultation",
    timeline: "Flexible",
    deliverables: [
      "Technical assessment",
      "Strategy planning",
      "Tech stack selection",
      "Project roadmap",
      "Best practices guidance",
    ],
  },
];

const processSteps = [
  { num: 1, label: "Discovery" },
  { num: 2, label: "Design" },
  { num: 3, label: "Development" },
  { num: 4, label: "Testing" },
  { num: 5, label: "Support" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-reveal, .scroll-reveal-left").forEach((el) => {
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

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32" style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-concierge-bell" /> MY SERVICES
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Professional services{" "}
            <span className="gradient-text">tailored to your needs</span>
          </h2>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card scroll-reveal stagger-${i + 1}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="service-card-icon shrink-0">
                  <span>{s.icon}</span>
                </div>
                <div>
                  <h3
                    className="font-['Space_Grotesk'] font-bold text-lg mb-1"
                    style={{ color: "#f1f5f9" }}
                  >
                    {s.title}
                  </h3>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full inline-block"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      color: "#06b6d4",
                      border: "1px solid rgba(6,182,212,0.3)",
                    }}
                  >
                    Timeline: {s.timeline}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p
                  className="text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "#475569" }}
                >
                  Deliverables
                </p>
                <ul className="space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "#94a3b8" }}
                    >
                      <i
                        className="fas fa-check-circle text-xs"
                        style={{ color: "#6366f1" }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Work Process Timeline */}
        <div className="scroll-reveal">
          <h3
            className="font-['Space_Grotesk'] text-2xl font-bold mb-8 text-center"
            style={{ color: "#f1f5f9" }}
          >
            Work Process
          </h3>

          <div className="timeline-container">
            <div className="timeline-line">
              <div className="timeline-line-fill" style={{ width: "100%" }} />
            </div>
            {processSteps.map((step) => (
              <div key={step.num} className="timeline-step">
                <div className="timeline-dot active">{step.num}</div>
                <span
                  className="text-sm font-medium hidden sm:block"
                  style={{ color: "#94a3b8" }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
