import { useEffect, useState, useCallback } from "react";

const shortcuts = [
  { key: "H", action: "Go to Home" },
  { key: "A", action: "Go to About" },
  { key: "S", action: "Go to Skills" },
  { key: "P", action: "Go to Projects" },
  { key: "C", action: "Go to Contact" },
  { key: "T", action: "Go to Top" },
  { key: "?", action: "Toggle shortcuts" },
  { key: "Esc", action: "Close modals" },
];

const sectionMap: Record<string, string> = {
  H: "#home",
  A: "#about",
  S: "#skills",
  P: "#projects",
  C: "#contact",
};

export default function KeyboardShortcuts() {
  const [show, setShow] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "?") {
        e.preventDefault();
        setShow((p) => !p);
        return;
      }

      if (e.key === "Escape") {
        setShow(false);
        return;
      }

      const key = e.key.toUpperCase();
      if (key === "T") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionMap[key]) {
        e.preventDefault();
        const el = document.querySelector(sectionMap[key]);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={() => setShow(false)}
    >
      <div
        className="glass-card p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="font-['Space_Grotesk'] font-bold text-xl"
            style={{ color: "#f1f5f9" }}
          >
            ⌨️ Keyboard Shortcuts
          </h3>
          <button
            onClick={() => setShow(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}
            aria-label="Close shortcuts"
          >
            <i className="fas fa-times text-sm" />
          </button>
        </div>
        <div className="space-y-2">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between py-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <span className="text-sm" style={{ color: "#94a3b8" }}>
                {s.action}
              </span>
              <kbd
                className="px-3 py-1 rounded-lg text-xs font-mono font-semibold"
                style={{
                  background: "rgba(99,102,241,0.15)",
                  color: "#6366f1",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}
              >
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4 text-center" style={{ color: "#475569" }}>
          Press <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}>?</kbd> to toggle
        </p>
      </div>
    </div>
  );
}
