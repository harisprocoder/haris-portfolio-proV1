import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/hooks/useScrollReveal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.4, ease: EASE_OUT },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observerRef.current!.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  const handleScrollTop = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [],
  );

  const email = "harisshuja05@gmail.com";

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // Close email modal on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setEmailOpen(false);
        setMobileOpen(false);
      }
    }
    if (emailOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      if (!mobileOpen) document.body.style.overflow = "";
    };
  }, [emailOpen, mobileOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "py-4 bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={handleScrollTop}
            className="font-['Space_Grotesk'] text-2xl font-extrabold gradient-text"
          >
            M. Haris
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.href
                    ? "text-[#f1f5f9]"
                    : "text-[#94a3b8] hover:text-[#f1f5f9]"
                }`}
              >
                {link.label}
                {/* Active underline indicator */}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4]"
                  initial={false}
                  animate={{
                    scaleX: activeSection === link.href ? 1 : 0,
                    opacity: activeSection === link.href ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setEmailOpen(true)}
              className="glow-btn text-sm py-2.5 px-6 hidden sm:inline-flex"
            >
              Get In Touch
            </button>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-[1001]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <motion.span
                className="block w-6 h-[2px] rounded-full bg-[#f1f5f9] origin-center"
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 7 : 0,
                }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
              <motion.span
                className="block w-6 h-[2px] rounded-full bg-[#f1f5f9]"
                animate={{
                  opacity: mobileOpen ? 0 : 1,
                  scaleX: mobileOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[2px] rounded-full bg-[#f1f5f9] origin-center"
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -7 : 0,
                }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-[rgba(10,10,15,0.98)] backdrop-blur-2xl lg:hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`text-2xl font-['Space_Grotesk'] font-bold transition-colors ${
                  activeSection === link.href
                    ? "gradient-text"
                    : "text-[#f1f5f9] hover:text-[#818cf8]"
                }`}
                variants={mobileLinkVariants}
                initial="closed"
                animate="open"
                custom={i}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              onClick={() => { setMobileOpen(false); setEmailOpen(true); }}
              className="glow-btn text-base mt-4 px-8 py-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {emailOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setEmailOpen(false)}
          >
            <motion.div
              className="glass-card p-8 max-w-md w-full relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEmailOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}
                aria-label="Close email modal"
              >
                <i className="fas fa-times text-sm" aria-hidden="true" />
              </button>

              <div className="text-center mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(99,102,241,0.15)" }}
                >
                  <i className="fas fa-envelope text-xl" style={{ color: "#6366f1" }} aria-hidden="true" />
                </div>
                <h3
                  className="font-['Space_Grotesk'] text-xl font-bold mb-1"
                  style={{ color: "#f1f5f9" }}
                >
                  Let's Work Together
                </h3>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  Feel free to reach out anytime
                </p>
              </div>

              <div
                className="flex items-center justify-between gap-3 p-4 rounded-xl mb-6"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                <span className="text-sm font-medium break-all" style={{ color: "#f1f5f9" }}>
                  {email}
                </span>
                <button
                  onClick={copyEmail}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: copied ? "rgba(34,197,94,0.15)" : "rgba(99,102,241,0.15)",
                    color: copied ? "#22c55e" : "#6366f1",
                    border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(99,102,241,0.3)"}`,
                  }}
                >
                  {copied ? (
                    <><i className="fas fa-check mr-1" aria-hidden="true" /> Copied</>
                  ) : (
                    <><i className="fas fa-copy mr-1" aria-hidden="true" /> Copy</>
                  )}
                </button>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${email}`}
                  className="glow-btn flex-1 text-center text-sm py-3 inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-paper-plane" aria-hidden="true" /> Send Email
                </a>
                <a
                  href={`mailto:${email}?subject=Project Inquiry&body=Hi Haris, I'd like to discuss a project.`}
                  className="outline-btn flex-1 text-center text-sm py-3 inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-bolt" aria-hidden="true" /> Quick Inquiry
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
