export default function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="portfolio-footer py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo + tagline */}
          <div>
            <p className="font-['Space_Grotesk'] text-3xl font-extrabold gradient-text mb-3">
              MH
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              Crafting modern, clean, and user-focused web interfaces from
              Karachi, Pakistan.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider mb-4"
              style={{ color: "#f1f5f9" }}
            >
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Projects", href: "#projects" },
                { label: "Services", href: "#services" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-sm hover:translate-x-1 transition-transform"
                  style={{ color: "#94a3b8" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider mb-4"
              style={{ color: "#f1f5f9" }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:harisshuja05@gmail.com"
                className="text-sm flex items-center gap-2 hover:translate-x-1 transition-transform"
                style={{ color: "#94a3b8" }}
              >
                <i className="fas fa-envelope" style={{ color: "#6366f1" }} />
                harisshuja05@gmail.com
              </a>
              <a
                href="https://github.com/harisprocoder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 hover:translate-x-1 transition-transform"
                style={{ color: "#94a3b8" }}
              >
                <i className="fab fa-github" style={{ color: "#6366f1" }} />
                github.com/harisprocoder
              </a>
            </div>
          </div>
        </div>

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
