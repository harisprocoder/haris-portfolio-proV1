import { useEffect, useRef } from "react";

const milestones = [
  {
    year: "2023",
    title: "Started the Journey",
    desc: "First lines of HTML & CSS. Built first static website from scratch.",
    icon: "🚀",
  },
  {
    year: "2024",
    title: "Leveling Up",
    desc: "Dived into JavaScript, Tailwind CSS, and responsive design. Started freelancing.",
    icon: "📈",
  },
  {
    year: "2025",
    title: "Going Professional",
    desc: "Built real client projects. Launched A Plus Hairs and multiple business sites.",
    icon: "💼",
  },
  {
    year: "2026",
    title: "Scaling Up",
    desc: "Expanding into full-stack development. Taking on bigger projects.",
    icon: "🎯",
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
              setTimeout(() => el.classList.add("visible"), i * 150);
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
    <section ref={sectionRef}>
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">
            <i className="fas fa-road" aria-hidden="true" /> MY JOURNEY
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            From <span className="gradient-text">first line</span> to full stack
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, #6366f1, #06b6d4, transparent)" }}
          />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`timeline-item relative flex items-start opacity-0 translate-y-6 transition-all duration-500 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                      boxShadow: "0 0 16px rgba(99,102,241,0.3)",
                    }}
                  >
                    {m.icon}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${
                    i % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"
                  }`}
                >
                  <div className="glass-card p-5">
                    <span className="font-['Space_Grotesk'] text-xl font-extrabold gradient-text">
                      {m.year}
                    </span>
                    <h3
                      className="font-['Space_Grotesk'] font-bold text-base mt-1 mb-1"
                      style={{ color: "#f1f5f9" }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                      {m.desc}
                    </p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[calc(50%-32px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
