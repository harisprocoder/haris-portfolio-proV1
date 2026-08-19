import { useState, useEffect, useCallback } from "react";

const emojis = [
  { icon: "👍", label: "Like" },
  { icon: "❤️", label: "Love" },
  { icon: "🔥", label: "Fire" },
  { icon: "🎉", label: "Celebrate" },
  { icon: "💯", label: "Perfect" },
];

const STORAGE_KEY = "mh-reactions";

export default function EmojiReactions() {
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return { "👍": 42, "❤️": 18, "🔥": 31, "🎉": 12, "💯": 27 };
  });
  const [reacted, setReacted] = useState<Set<string>>(new Set());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  }, [counts]);

  const handleReact = useCallback(
    (icon: string) => {
      if (reacted.has(icon)) return;
      setReacted((prev) => new Set(prev).add(icon));
      setCounts((prev) => ({ ...prev, [icon]: (prev[icon] || 0) + 1 }));
    },
    [reacted],
  );

  return (
    <div className="scroll-reveal">
      <div className="glass-card p-6 inline-block">
        <p
          className="text-sm font-medium mb-3 text-center"
          style={{ color: "#94a3b8" }}
        >
          React to this portfolio
        </p>
        <div className="flex gap-2">
          {emojis.map((e) => (
            <button
              key={e.icon}
              onClick={() => handleReact(e.icon)}
              disabled={reacted.has(e.icon)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-lg transition-all ${
                reacted.has(e.icon) ? "scale-110" : "hover:scale-110"
              }`}
              style={{
                background: reacted.has(e.icon)
                  ? "rgba(99,102,241,0.15)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${reacted.has(e.icon) ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)"}`,
                cursor: reacted.has(e.icon) ? "default" : "pointer",
              }}
              aria-label={`${e.label} (${counts[e.icon] || 0})`}
            >
              <span aria-hidden="true">{e.icon}</span>
              <span
                className="text-[10px] font-semibold"
                style={{ color: reacted.has(e.icon) ? "#6366f1" : "#94a3b8" }}
              >
                {counts[e.icon] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
