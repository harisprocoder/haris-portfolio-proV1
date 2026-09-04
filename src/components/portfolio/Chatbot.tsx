import { useState, useCallback, useRef, useEffect } from "react";

const faq = [
  { q: "What do you do?", a: "I'm a professional web developer from Karachi, Pakistan. I specialize in building modern, responsive websites using HTML5, CSS3, JavaScript, and Tailwind CSS." },
  { q: "What services do you offer?", a: "I offer custom website development, UI/UX design, website maintenance, and web development consultation. Check out my Services section for details!" },
  { q: "What's your pricing?", a: "My base package starts at $99. I also have an interactive pricing calculator on the site where you can estimate your project cost." },
  { q: "How can I contact you?", a: "You can email me at harisshuja05@gmail.com or click the 'Get In Touch' button in the navbar. I typically respond within 24 hours!" },
  { q: "Tell me about your projects", a: "I've completed 35+ projects including the A Plus Hairs bridal salon website, multiple business sites, portfolios, and landing pages. Check my Projects section!" },
  { q: "Are you available for hire?", a: "Yes! I currently have 2 project slots open this month. Let's discuss your project!" },
  { q: "What technologies do you use?", a: "HTML5, CSS3, JavaScript, Tailwind CSS, React, Git/GitHub, Figma, and VS Code. I'm always learning new technologies." },
  { q: "Where are you located?", a: "I'm based in Karachi, Pakistan. I work with clients globally and am comfortable with remote collaboration." },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hey! 👋 Ask me anything about Haris or his services." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    setTimeout(() => {
      const lower = text.toLowerCase();
      const match = faq.find((f) =>
        lower.includes(f.q.toLowerCase().slice(0, 5)) ||
        f.q.toLowerCase().split(" ").some((w) => w.length > 3 && lower.includes(w))
      );
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: match
            ? match.a
            : "I'm not sure about that, but you can email Haris at harisshuja05@gmail.com for more details! 😊",
        },
      ]);
    }, 600);
  }, []);

  return (
    <>
      {/* Floating button — orange */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[998] w-14 h-14 rounded-full flex items-center justify-center text-white text-xl transition-all hover:scale-110"
        style={{
          background: "#FF8400",
          boxShadow: "0 0 30px rgba(255,132,0,0.4)",
        }}
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        {open ? <i className="fas fa-times" /> : <i className="fas fa-comment-dots" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 left-6 z-[998] w-[340px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "#1A1612",
            border: "1px solid #2D2A24",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            height: "420px",
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center gap-3"
            style={{
              background: "rgba(255,132,0,0.1)",
              borderBottom: "1px solid #2D2A24",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ background: "#FF8400" }}
            >
              MH
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#F5EFE6" }}>MH Assistant</p>
              <p className="text-xs" style={{ color: "#22c55e" }}>● Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-3 py-2 rounded-2xl text-sm"
                  style={{
                    background: m.from === "user" ? "#FF8400" : "rgba(255,255,255,0.06)",
                    color: m.from === "user" ? "white" : "#F5EFE6",
                    borderBottomRightRadius: m.from === "user" ? "4px" : undefined,
                    borderBottomLeftRadius: m.from === "bot" ? "4px" : undefined,
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {["What do you do?", "Pricing?", "Contact info"].map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-2.5 py-1 rounded-full transition-all hover:scale-105"
                style={{
                  background: "rgba(255,132,0,0.08)",
                  color: "#FF8400",
                  border: "1px solid rgba(255,132,0,0.2)",
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2" style={{ borderTop: "1px solid #2D2A24" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm outline-none px-3 py-2 rounded-lg"
              style={{
                color: "#F5EFE6",
                border: "1px solid #2D2A24",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ background: "#FF8400" }}
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane text-xs" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
