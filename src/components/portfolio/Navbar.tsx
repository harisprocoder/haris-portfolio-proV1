import { useEffect, useState, useCallback } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
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
  }, [email]);

  // Close modal on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setEmailOpen(false);
    }
    if (emailOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [emailOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={handleScrollTop}
            className="font-['Space_Grotesk'] text-2xl font-extrabold gradient-text"
          >
            M. Haris
          </a>

          <button
            onClick={() => setEmailOpen(true)}
            className="glow-btn text-sm py-2.5 px-6"
          >
            Get In Touch
          </button>
        </div>
      </nav>

      {/* Email Modal */}
      {emailOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={() => setEmailOpen(false)}
        >
          <div
            className="glass-card p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setEmailOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}
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

            {/* Email display */}
            <div
              className="flex items-center justify-between gap-3 p-4 rounded-xl mb-6"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <span
                className="text-sm font-medium break-all"
                style={{ color: "#f1f5f9" }}
              >
                {email}
              </span>
              <button
                onClick={copyEmail}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: copied
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(99,102,241,0.15)",
                  color: copied ? "#22c55e" : "#6366f1",
                  border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(99,102,241,0.3)"}`,
                }}
              >
                {copied ? (
                  <>
                    <i className="fas fa-check mr-1" /> Copied
                  </>
                ) : (
                  <>
                    <i className="fas fa-copy mr-1" /> Copy
                  </>
                )}
              </button>
            </div>

            {/* Action buttons */}
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
          </div>
        </div>
      )}
    </>
  );
}
