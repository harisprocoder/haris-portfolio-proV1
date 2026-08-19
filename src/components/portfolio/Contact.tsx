import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

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

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [state, handleSubmit] = useForm("xkjwpagy");

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
    <section id="contact" ref={sectionRef} style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-paper-plane" aria-hidden="true" /> GET IN TOUCH
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Let's create something{" "}
            <span className="gradient-text">amazing together</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
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
            {state.succeeded ? (
              <div
                className="glass-card p-8 flex flex-col items-center justify-center text-center"
                style={{ minHeight: "400px" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <i className="fas fa-check text-2xl" style={{ color: "#10b981" }} aria-hidden="true" />
                </div>
                <h3
                  className="font-['Space_Grotesk'] font-bold text-xl mb-3"
                  style={{ color: "#f1f5f9" }}
                >
                  Message sent successfully
                </h3>
                <p className="text-sm mb-6" style={{ color: "#94a3b8", maxWidth: "360px" }}>
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  className="glow-btn text-sm py-2.5 px-6"
                  onClick={() => window.location.reload()}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card p-8"
                aria-label="Contact form"
              >
                {/* General submission error */}
                {state.errors && (
                  <div
                    className="mb-6 p-4 rounded-lg text-sm flex items-center gap-3"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#ef4444",
                    }}
                    role="alert"
                  >
                    <i className="fas fa-exclamation-circle" aria-hidden="true" />
                    <span>Something went wrong. Please check your details and try again.</span>
                  </div>
                )}

                <div className="contact-input-group">
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="contact-input"
                    placeholder=" "
                    required
                  />
                  <label className="contact-label" htmlFor="contact-name">Full Name</label>
                  <ValidationError
                    field="name"
                    prefix="Name"
                    errors={state.errors}
                    className="text-xs mt-1"
                    style={{ color: "#ef4444" }}
                  />
                </div>

                <div className="contact-input-group">
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="contact-input"
                    placeholder=" "
                    required
                  />
                  <label className="contact-label" htmlFor="contact-email">Email Address</label>
                  <ValidationError
                    field="email"
                    prefix="Email"
                    errors={state.errors}
                    className="text-xs mt-1"
                    style={{ color: "#ef4444" }}
                  />
                </div>

                <div className="contact-input-group">
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    className="contact-input"
                    placeholder=" "
                    required
                  />
                  <label className="contact-label" htmlFor="contact-subject">Subject</label>
                  <ValidationError
                    field="subject"
                    prefix="Subject"
                    errors={state.errors}
                    className="text-xs mt-1"
                    style={{ color: "#ef4444" }}
                  />
                </div>

                <div className="contact-input-group">
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact-input"
                    placeholder=" "
                    rows={5}
                    style={{ resize: "vertical", minHeight: "120px" }}
                    required
                  />
                  <label className="contact-label" htmlFor="contact-message">Message</label>
                  <ValidationError
                    field="message"
                    prefix="Message"
                    errors={state.errors}
                    className="text-xs mt-1"
                    style={{ color: "#ef4444" }}
                  />
                </div>

                <button
                  type="submit"
                  className="glow-btn shimmer-btn w-full text-base"
                  aria-label="Send message"
                  disabled={state.submitting}
                  style={state.submitting ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
                >
                  {state.submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-paper-plane" aria-hidden="true" /> Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
