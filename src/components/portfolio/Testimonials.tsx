import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    text: "Haris delivered an exceptional website that exceeded our expectations. His attention to detail and understanding of modern design principles really impressed us.",
    name: "Sarah Ahmed",
    role: "Business Owner",
    project: "Business Website",
    date: "October 2025",
    initials: "SA",
    color: "#6366f1",
  },
  {
    text: "Working with Haris was a pleasure. He transformed my ideas into a beautiful, functional portfolio. His communication throughout was excellent.",
    name: "Ahmad Khan",
    role: "Creative Professional",
    project: "Portfolio Website",
    date: "September 2025",
    initials: "AK",
    color: "#06b6d4",
  },
  {
    text: "The landing page significantly improved our conversion rates. His understanding of user experience is impressive for someone so young. Highly recommended!",
    name: "Digital Marketing Team",
    role: "Marketing Agency",
    project: "Landing Page",
    date: "August 2025",
    initials: "DM",
    color: "#8b5cf6",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const startAutoplay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (!paused) {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }
    }, 4000);
  }, [paused]);

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoplay]);

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current);
    }
  }, [paused]);

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

  return (
    <section id="testimonials" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal">
          <span className="section-label">
            <i className="fas fa-star" aria-hidden="true" /> CLIENT TESTIMONIALS
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            What my <span className="gradient-text">clients say</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden rounded-2xl scroll-reveal stagger-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="testimonial-card min-w-full"
              >
                <div className="testimonial-quote" aria-hidden="true">"</div>
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-base"
                      style={{ color: "#f1f5f9" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                      {t.role} · {t.project}
                    </p>
                  </div>
                </div>
                <p
                  className="text-lg leading-relaxed mb-5 italic"
                  style={{ color: "#c8d6e5" }}
                >
                  "{t.text}"
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-sm"
                      style={{ color: "#f59e0b" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${current === i ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
