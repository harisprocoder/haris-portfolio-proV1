import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🧹",
    title: "Clean Code",
    desc: "Writing maintainable, well-structured code that's easy to read and scale.",
  },
  {
    icon: "🎨",
    title: "Creative Design",
    desc: "Crafting visually stunning interfaces that leave lasting impressions.",
  },
  {
    icon: "⚡",
    title: "Fast Performance",
    desc: "Optimizing for speed to deliver lightning-fast user experiences.",
  },
  {
    icon: "👤",
    title: "Client Focused",
    desc: "Prioritizing your goals and exceeding expectations every time.",
  },
];

const infoItems = [
  { icon: "📍", label: "Location", value: "Karachi, Pakistan" },
  { icon: "🎂", label: "Age", value: "16 Years" },
  { icon: "🌐", label: "Languages", value: "Urdu, English" },
  { icon: "📧", label: "Email", value: "harisshuja05@gmail.com" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right").forEach((el) => {
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
    <section id="about" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-user" aria-hidden="true" /> ABOUT ME
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Passionate web developer with a vision for{" "}
            <span className="gradient-text">
              creating exceptional digital experiences
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-8">
          {/* Left: Text + Features */}
          <div>
            <div className="scroll-reveal stagger-1">
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "#94a3b8" }}
              >
                I'm a young and passionate web developer from Karachi, Pakistan,
                with over 2 years of hands-on experience in building modern,
                responsive websites. My journey in web development started with
                curiosity and has grown into a deep passion for creating
                exceptional digital experiences. I specialize in front-end
                development with a keen eye for design, performance, and user
                experience. Every project I take on is an opportunity to push
                boundaries and deliver something truly remarkable.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`about-feature-box scroll-reveal stagger-${i + 2}`}
                >
                  <div className="text-2xl mb-3" aria-hidden="true">{f.icon}</div>
                  <h3
                    className="font-['Space_Grotesk'] font-bold text-sm mb-1"
                    style={{ color: "#f1f5f9" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info pills */}
          <div className="flex flex-col gap-4 scroll-reveal-right stagger-2">
            {infoItems.map((item) => (
              <div key={item.label} className="info-pill">
                <span className="text-xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="text-xs" style={{ color: "#475569" }}>
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#f1f5f9" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
