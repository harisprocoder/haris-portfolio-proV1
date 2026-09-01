import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerChild } from "@/hooks/useScrollReveal";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-5% 0px" });

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    {
      icon: "fas fa-envelope",
      label: "Email",
      value: "harisshuja05@gmail.com",
      href: "mailto:harisshuja05@gmail.com",
    },
    {
      icon: "fab fa-github",
      label: "GitHub",
      value: "github.com/harisprocoder",
      href: "https://github.com/harisprocoder",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="portfolio-footer py-10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Logo + tagline */}
          <motion.div variants={staggerChild}>
            <p className="font-['Space_Grotesk'] text-3xl font-extrabold gradient-text mb-3">
              MH
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              Crafting modern, clean, and user-focused web interfaces from
              Karachi, Pakistan.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={staggerChild}>
            <h4
              className="font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider mb-4"
              style={{ color: "#f1f5f9" }}
            >
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-sm inline-block"
                  style={{ color: "#94a3b8" }}
                  whileHover={{ x: 4, color: "#f1f5f9" }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div variants={staggerChild}>
            <h4
              className="font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider mb-4"
              style={{ color: "#f1f5f9" }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-2"
                  style={{ color: "#94a3b8" }}
                  whileHover={{ x: 4, color: "#f1f5f9" }}
                  transition={{ duration: 0.2 }}
                >
                  <i className={s.icon} style={{ color: "#6366f1" }} aria-hidden="true" />
                  {s.value}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-sm" style={{ color: "#475569" }}>
            © 2026 M. Haris. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "#475569" }}>
            Made with <span style={{ color: "#ef4444" }}>❤️</span> in Karachi, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
