import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { sectionLabelVariants, staggerContainer, staggerChild } from "@/hooks/useScrollReveal";

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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Testimonials() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const paginate = useCallback((newDirection: number) => {
    setCurrent(([prev]) => {
      const next = (prev + newDirection + testimonials.length) % testimonials.length;
      return [next, newDirection];
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => paginate(1), 5000);
    return () => clearInterval(intervalRef.current);
  }, [paused, paginate]);

  return (
    <section id="testimonials" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-star" aria-hidden="true" /> CLIENT TESTIMONIALS
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            variants={staggerChild}
          >
            What my <span className="gradient-text">clients say</span>
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative min-h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                className="testimonial-card absolute inset-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="testimonial-quote" aria-hidden="true">"</div>
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm"
                    style={{ background: testimonials[current].color }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {testimonials[current].initials}
                  </motion.div>
                  <div>
                    <p
                      className="font-semibold text-base"
                      style={{ color: "#f1f5f9" }}
                    >
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                      {testimonials[current].role} · {testimonials[current].project}
                    </p>
                  </div>
                </div>
                <p
                  className="text-lg leading-relaxed mb-5 italic"
                  style={{ color: "#c8d6e5" }}
                >
                  "{testimonials[current].text}"
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
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation dots */}
        <motion.div
          className="flex justify-center gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${current === i ? "active" : ""}`}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
