import { useEffect, useRef } from "react";

const milestones = [
  {
    year: "2023",
    title: "Started the Journey",
    desc: "First lines of HTML & CSS. Built first static website from scratch.",
    icon: "🚀",
    highlights: ["Learned HTML/CSS", "Built first portfolio", "Joined GitHub"],
  },
  {
    year: "2024",
    title: "Leveling Up",
    desc: "Dived into JavaScript, Tailwind CSS, and responsive design. Started freelancing.",
    icon: "📈",
    highlights: ["Mastered JavaScript", "Started freelancing", "10+ projects"],
  },
  {
    year: "2025",
    title: "Going Professional",
    desc: "Built real client projects. Launched A Plus Hairs and multiple business sites.",
    icon: "💼",
    highlights: ["A Plus Hairs launched", "25+ happy clients", "React & modern tools"],
  },
  {
    year: "2026",
    title: "Scaling Up",
    desc: "Expanding into full-stack development. Taking on bigger projects and partnerships.",
    icon: "🎯",
    highlights: ["35+ total projects", "Advanced web apps", "Growing team"],
  },
];

export default function InteractiveTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".timeline-item").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 200);
            });
            entry.target.querySelectorAll(".scroll-reveal-left").forEach((el) => {
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
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center scroll-reveal-left mb-16">
          <span className="section-label">
            <i className="fas fa-road" aria-hidden="true" /> MY JOURNEY
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            From <span className="gradient-text">first line</span> to full stack
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, #6366f1, #06b6d4, transparent)" }}
          />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`timeline-item relative flex items-start gap-8 opacity-0 translate-y-8 transition-all duration-700 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                      boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                    }}
                  >
                    {m.icon}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <div className="glass-card p-6">
                    <span
                      className="font-['Space_Grotesk'] text-2xl font-extrabold gradient-text"
                    >
                      {m.year}
                    </span>
                    <h3
                      className="font-['Space_Grotesk'] font-bold text-lg mt-2 mb-2"
                      style={{ color: "#f1f5f9" }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "#94a3b8" }}>
                      {m.desc}
                    </p>
                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      {m.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(99,102,241,0.1)",
                            color: "#6366f1",
                            border: "1px solid rgba(99,102,241,0.2)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
