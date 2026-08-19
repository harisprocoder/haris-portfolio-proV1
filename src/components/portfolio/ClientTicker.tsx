const tickerItems = [
  { icon: "✅", text: "Sarah just booked a website project" },
  { icon: "🎉", text: "A Plus Hairs site went live" },
  { icon: "⭐", text: "New 5-star review from Ahmad" },
  { icon: "🚀", text: "E-commerce landing page delivered" },
  { icon: "💬", text: "Client: 'Exceeded expectations!'" },
  { icon: "🏆", text: "35+ projects milestone reached" },
  { icon: "🔥", text: "New React project in progress" },
  { icon: "💼", text: "UI/UX consultation completed" },
];

export default function ClientTicker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div
      className="overflow-hidden py-4"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      aria-label="Recent client activity"
      role="marquee"
    >
      <div className="ticker-scroll flex gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm shrink-0"
            style={{ color: "#94a3b8" }}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
