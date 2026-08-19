import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "harisshuja05@gmail.com",
    link: "mailto:harisshuja05@gmail.com",
  },
  {
    icon: "fas fa-map-marker-alt",
    label: "Location",
    value: "Karachi, Pakistan",
    link: null,
  },
  {
    icon: "fas fa-clock",
    label: "Availability",
    value: "Mon-Fri, 2PM-8PM PKT",
    link: null,
  },
  {
    icon: "fab fa-github",
    label: "GitHub",
    value: "github.com/harisprocoder",
    link: "https://github.com/harisprocoder",
  },
];

const FORM_STORAGE_KEY = "mh-contact-form";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { name: "", email: "", subject: "", message: "" };
    } catch { return { name: "", email: "", subject: "", message: "" }; }
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.removeItem(FORM_STORAGE_KEY);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32" style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-paper-plane" aria-hidden="true" /> GET IN TOUCH
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Let's create something{" "}
            <span className="gradient-text">amazing together</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="scroll-reveal stagger-1">
            <div className="flex flex-col gap-4 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="info-pill">
                  <i
                    className={`${item.icon} text-lg`}
                    style={{ color: "#6366f1", width: "24px", textAlign: "center" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs" style={{ color: "#475569" }}>
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                        style={{ color: "#f1f5f9" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "#f1f5f9" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Ready to Start box */}
            <div
              className="p-6 rounded-xl mb-6"
              style={{
                background: "rgba(17,24,39,0.6)",
                border: "1px solid transparent",
                borderImage: "linear-gradient(135deg, #6366f1, #06b6d4) 1",
              }}
            >
              <h3
                className="font-['Space_Grotesk'] font-bold text-lg mb-2"
                style={{ color: "#f1f5f9" }}
              >
                Ready to Start Your Project?
              </h3>
              <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
                Let's discuss your ideas and bring them to life with a modern,
                high-performance website.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:harisshuja05@gmail.com"
                  className="glow-btn text-sm py-2.5 px-6 inline-flex items-center gap-2"
                >
                  <i className="fas fa-envelope" aria-hidden="true" /> Send Email
                </a>
                <a
                  href="https://github.com/harisprocoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-btn text-sm py-2.5 px-6 inline-flex items-center gap-2"
                >
                  <i className="fab fa-github" aria-hidden="true" /> View GitHub
                </a>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#10b981",
              }}
            >
              ⚡ Within 24 hours response time
            </div>
          </div>

          {/* Right: Form */}
          <div className="scroll-reveal-right stagger-2">
            <form onSubmit={handleSubmit} className="glass-card p-8" aria-label="Contact form">
              <div className="contact-input-group">
                <input
                  type="text"
                  name="name"
                  className="contact-input"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label className="contact-label">Full Name</label>
              </div>

              <div className="contact-input-group">
                <input
                  type="email"
                  name="email"
                  className="contact-input"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label className="contact-label">Email Address</label>
              </div>

              <div className="contact-input-group">
                <input
                  type="text"
                  name="subject"
                  className="contact-input"
                  placeholder=" "
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <label className="contact-label">Subject</label>
              </div>

              <div className="contact-input-group">
                <textarea
                  name="message"
                  className="contact-input"
                  placeholder=" "
                  rows={5}
                  style={{ resize: "vertical", minHeight: "120px" }}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label className="contact-label">Message</label>
              </div>

              <button
                type="submit"
                className="glow-btn shimmer-btn w-full text-base"
                aria-label="Send message"
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-check" aria-hidden="true" /> Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-paper-plane" aria-hidden="true" /> Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
