import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import {
  staggerContainer,
  staggerChild,
  fadeLeft,
  fadeRight,
  sectionLabelVariants,
  textMaskReveal,
} from "@/hooks/useScrollReveal";

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
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="contact" ref={sectionRef} style={{ background: "#12100C" }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-paper-plane" aria-hidden="true" /> GET IN TOUCH
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
            style={{ color: "#F5EFE6", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            Let's create something{" "}
            <span className="gradient-text">amazing together</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Left: Info */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <motion.div
              className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl transition-all duration-300"
                  style={{
                    background: "#1A1612",
                    border: "1px solid #2D2A24",
                  }}
                  variants={staggerChild}
                  whileHover={{
                    x: 4,
                    borderColor: "rgba(255,132,0,0.4)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,132,0,0.08)" }}
                  >
                    <i
                      className={`${item.icon} text-sm sm:text-base`}
                      style={{ color: "#FF8400" }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs" style={{ color: "#8A8275" }}>
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium hover:underline truncate block"
                        style={{ color: "#F5EFE6" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm font-medium" style={{ color: "#F5EFE6" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Ready to Start box */}
            <motion.div
              className="p-5 sm:p-6 rounded-xl mb-5 sm:mb-6"
              style={{
                background: "#1A1612",
                border: "1px solid rgba(255,132,0,0.15)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3
                className="font-['Space_Grotesk'] font-bold text-base sm:text-lg mb-2"
                style={{ color: "#F5EFE6" }}
              >
                Ready to Start Your Project?
              </h3>
              <p className="text-xs sm:text-sm mb-4" style={{ color: "#A89F8F" }}>
                Let's discuss your ideas and bring them to life with a modern,
                high-performance website.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                <a
                  href="mailto:harisshuja05@gmail.com"
                  className="glow-btn text-xs sm:text-sm py-2.5 px-5 sm:px-6 inline-flex items-center gap-2 shimmer-btn"
                >
                  <i className="fas fa-envelope" aria-hidden="true" /> Send Email
                </a>
                <a
                  href="https://github.com/harisprocoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-btn text-xs sm:text-sm py-2.5 px-5 sm:px-6 inline-flex items-center gap-2"
                >
                  <i className="fab fa-github" aria-hidden="true" /> View GitHub
                </a>
              </div>
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#10b981",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              ⚡ Within 24 hours response time
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeRight}
          >
            {state.succeeded ? (
              <motion.div
                className="rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center"
                style={{
                  background: "#1A1612",
                  border: "1px solid #2D2A24",
                  minHeight: "400px",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <i className="fas fa-check text-2xl" style={{ color: "#10b981" }} aria-hidden="true" />
                </motion.div>
                <h3
                  className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl mb-3"
                  style={{ color: "#F5EFE6" }}
                >
                  Message sent successfully
                </h3>
                <p className="text-xs sm:text-sm mb-6" style={{ color: "#A89F8F", maxWidth: "360px" }}>
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  className="glow-btn text-sm py-2.5 px-6"
                  onClick={() => window.location.reload()}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl p-5 sm:p-8"
                aria-label="Contact form"
                style={{
                  background: "#1A1612",
                  border: "1px solid #2D2A24",
                }}
              >
                {/* General submission error */}
                {state.errors && (
                  <motion.div
                    className="mb-5 sm:mb-6 p-4 rounded-lg text-xs sm:text-sm flex items-center gap-3"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#ef4444",
                    }}
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <i className="fas fa-exclamation-circle" aria-hidden="true" />
                    <span>Something went wrong. Please check your details and try again.</span>
                  </motion.div>
                )}

                <motion.div
                  className="contact-input-group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
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
                </motion.div>

                <motion.div
                  className="contact-input-group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
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
                </motion.div>

                <motion.div
                  className="contact-input-group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
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
                </motion.div>

                <motion.div
                  className="contact-input-group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
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
                </motion.div>

                <motion.button
                  type="submit"
                  className="glow-btn shimmer-btn w-full text-sm sm:text-base"
                  aria-label="Send message"
                  disabled={state.submitting}
                  style={state.submitting ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
                  whileHover={!state.submitting ? { scale: 1.02, boxShadow: "0 0 40px rgba(255,132,0,0.4)" } : {}}
                  whileTap={!state.submitting ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.2 }}
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
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
