import { useState, useCallback } from "react";

const features = [
  { id: "landing", name: "Landing Page", price: 50, icon: "🖥️" },
  { id: "contact", name: "Contact Form", price: 30, icon: "📧" },
  { id: "animations", name: "Animations & Motion", price: 40, icon: "✨" },
  { id: "seo", name: "SEO Setup", price: 60, icon: "🔍" },
  { id: "admin", name: "Admin Panel", price: 100, icon: "⚙️" },
  { id: "ecommerce", name: "E-commerce Features", price: 150, icon: "🛒" },
  { id: "cms", name: "CMS Integration", price: 80, icon: "📝" },
  { id: "analytics", name: "Analytics Dashboard", price: 50, icon: "📊" },
];

const basePrice = 99;

export default function PricingCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const extrasTotal = features
    .filter((f) => selected.has(f.id))
    .reduce((sum, f) => sum + f.price, 0);
  const total = basePrice + extrasTotal;

  const handleRequestQuote = () => {
    const selectedFeatures = features
      .filter((f) => selected.has(f.id))
      .map((f) => `${f.name} (+$${f.price})`)
      .join(", ");
    const subject = encodeURIComponent("Project Quote Request");
    const body = encodeURIComponent(
      `Hi Haris,\n\nI'd like a quote for the following:\n\nBase Package: $${basePrice}\nSelected Features: ${selectedFeatures || "None"}\n\nEstimated Total: $${total}\n\nPlease get back to me with a detailed quote.\n\nThanks!`,
    );
    window.open(`mailto:harisshuja05@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal-left">
          <span className="section-label">
            <i className="fas fa-calculator" aria-hidden="true" /> PRICING
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Interactive{" "}
            <span className="gradient-text">cost calculator</span>
          </h2>
          <p className="text-base mb-12 max-w-lg" style={{ color: "#94a3b8" }}>
            Select features to get an instant estimate. Every project starts with a base package.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Feature checkboxes */}
          <div className="lg:col-span-3 scroll-reveal stagger-1">
            <div className="glass-card p-6">
              <h3
                className="font-['Space_Grotesk'] font-bold text-lg mb-6"
                style={{ color: "#f1f5f9" }}
              >
                <span className="gradient-text">Base Package</span> — ${basePrice}
                <span className="text-sm font-normal ml-2" style={{ color: "#94a3b8" }}>
                  (HTML/CSS/JS, Responsive Design, 1 Revision)
                </span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggle(f.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                      selected.has(f.id) ? "border-[#6366f1] bg-[rgba(99,102,241,0.1)]" : "border-[rgba(255,255,255,0.08)] bg-[rgba(17,24,39,0.6)]"
                    }`}
                  >
                    <span className="text-xl" aria-hidden="true">{f.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: "#f1f5f9" }}>
                        {f.name}
                      </p>
                      <p className="text-xs" style={{ color: "#94a3b8" }}>
                        +${f.price}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        selected.has(f.id)
                          ? "bg-[#6366f1] border-[#6366f1]"
                          : "border-[rgba(255,255,255,0.2)]"
                      }`}
                    >
                      {selected.has(f.id) && (
                        <i className="fas fa-check text-[10px] text-white" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price summary */}
          <div className="lg:col-span-2 scroll-reveal stagger-2">
            <div className="glass-card p-6 sticky top-24">
              <h3
                className="font-['Space_Grotesk'] font-bold text-lg mb-4"
                style={{ color: "#f1f5f9" }}
              >
                Quote Summary
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#94a3b8" }}>Base Package</span>
                  <span style={{ color: "#f1f5f9" }}>${basePrice}</span>
                </div>
                {features
                  .filter((f) => selected.has(f.id))
                  .map((f) => (
                    <div key={f.id} className="flex justify-between text-sm">
                      <span style={{ color: "#94a3b8" }}>{f.name}</span>
                      <span style={{ color: "#f1f5f9" }}>+${f.price}</span>
                    </div>
                  ))}
              </div>
              <div
                className="border-t pt-4 mb-6 flex justify-between items-center"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span
                  className="font-['Space_Grotesk'] font-bold text-lg"
                  style={{ color: "#f1f5f9" }}
                >
                  Estimated Total
                </span>
                <span className="font-['Space_Grotesk'] font-extrabold text-3xl gradient-text">
                  ${total}
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: "#475569" }}>
                * Final price may vary based on project complexity and requirements.
              </p>
              <button
                onClick={handleRequestQuote}
                className="glow-btn shimmer-btn w-full text-sm py-3"
              >
                <i className="fas fa-paper-plane mr-2" aria-hidden="true" />
                Request Quote via Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
