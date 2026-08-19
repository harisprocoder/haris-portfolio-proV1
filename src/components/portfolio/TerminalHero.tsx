import { useEffect, useRef, useState } from "react";

const commands = [
  { cmd: "whoami", output: "M. Haris — Web Developer" },
  { cmd: "location", output: "Karachi, Pakistan 🇵🇰" },
  { cmd: "status", output: "✅ Available for new projects" },
  { cmd: "skills", output: "HTML5 · CSS3 · JavaScript · Tailwind · React" },
  { cmd: "experience", output: "2+ years · 35+ projects · 25+ clients" },
];

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (currentLine >= commands.length) {
      setIsTyping(false);
      return;
    }

    const line = commands[currentLine];
    const isOutput = visibleLines % 2 === 1;

    if (!isOutput) {
      // Typing the command
      if (currentChar < line.cmd.length) {
        intervalRef.current = setTimeout(() => {
          setCurrentChar((c) => c + 1);
        }, 50 + Math.random() * 40);
      } else {
        // Done typing command, show output after a pause
        intervalRef.current = setTimeout(() => {
          setVisibleLines((v) => v + 1);
          setCurrentChar(0);
        }, 300);
      }
    } else {
      // Showing output
      intervalRef.current = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 200);
    }

    return () => clearTimeout(intervalRef.current);
  }, [visibleLines, currentChar, currentLine]);

  return (
    <div className="glass-card overflow-hidden font-mono text-sm">
      {/* Terminal header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs" style={{ color: "#475569" }}>
          haris@portfolio ~ $
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 space-y-1" style={{ minHeight: "180px" }}>
        {commands.map((line, i) => {
          const cmdDone = i < currentLine || (i === currentLine && visibleLines % 2 === 1);
          const outputDone = i < currentLine;
          const isCurrent = i === currentLine;

          return (
            <div key={line.cmd}>
              {/* Command line */}
              <div className="flex items-center">
                <span style={{ color: "#22c55e" }}>$ </span>
                <span style={{ color: "#f1f5f9" }}>
                  {cmdDone
                    ? line.cmd
                    : isCurrent
                      ? line.cmd.slice(0, currentChar)
                      : ""}
                </span>
                {isCurrent && !cmdDone && showCursor && (
                  <span
                    className="inline-block w-[7px] h-[14px] ml-[1px]"
                    style={{ background: "#6366f1" }}
                  />
                )}
              </div>

              {/* Output */}
              {(outputDone || (cmdDone && visibleLines % 2 === 1 && i === currentLine)) && (
                <div className="pl-4" style={{ color: "#94a3b8" }}>
                  {line.output}
                </div>
              )}
            </div>
          );
        })}

        {/* Final cursor */}
        {!isTyping && showCursor && (
          <div className="flex items-center">
            <span style={{ color: "#22c55e" }}>$ </span>
            <span
              className="inline-block w-[7px] h-[14px] ml-[1px]"
              style={{ background: "#6366f1" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
