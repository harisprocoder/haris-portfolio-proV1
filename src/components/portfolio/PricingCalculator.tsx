import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerChild, sectionLabelVariants, textMaskReveal } from "@/hooks/useScrollReveal";

type Region = "pk" | "uk";

const regions = {
  pk: { label: "Pakistan", flag: "🇵🇰", currency: "PKR", symbol: "PKR" },
  uk: { label: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£" },
};

const packages = {
  pk: [
    { id: "landing", name: "Landing Page", price: 25000, desc: "Single-page responsive site" },
    { id: "business", name: "Business Website", price: 60000, desc: "Multi-page with contact forms" },
    { id: "professional", name: "Professional Website", price: 100000, desc: "Advanced features & CMS" },
    { id: "ecommerce", name: "E-commerce Website", price: 150000, desc: "Online store with payments" },
    { id: "custom", name: "Custom Web Application", price: 250000, desc: "Full-stack custom solution" },
  ],
  uk: [
    { id: "landing", name: "Landing Page", price: 500, desc: "Single-page responsive site" },
    { id: "business", name: "Business Website", price: 1200, desc: "Multi-page with contact forms" },
    { id: "professional", name: "Professional Website", price: 1800, desc: "Advanced features & CMS" },
    { id: "ecommerce", name: "E-commerce Website", price: 2500, desc: "Online store with payments" },
    { id: "custom", name: "Custom Web Application", price: 4000, desc: "Full-stack custom solution" },
  ],
};

const optionalFeatures = {
  pk: [
    { id: "extra-page", name: "Extra Page", price: 5000 },
    { id: "animations", name: "Advanced Animations", price: 10000 },
    { id: "cms", name: "CMS / Admin Dashboard", price: 25000 },
    { id: "payment", name: "Payment Integration", price: 20000 },
    { id: "booking", name: "Booking System", price: 15000 },
    { id: "seo", name: "SEO Setup", price: 10000 },
    { id: "performance", name: "Performance Optimization", price: 10000 },
    { id: "copywriting", name: "Copywriting", price: 10000 },
    { id: "analytics", name: "Analytics Setup", price: 5000 },
  ],
  uk: [
    { id: "extra-page", name: "Extra Page", price: 100 },
    { id: "animations", name: "Advanced Animations", price: 200 },
    { id: "cms", name: "CMS / Admin Dashboard", price: 400 },
    { id: "payment", name: "Payment Integration", price: 300 },
    { id: "booking", name: "Booking System", price: 250 },
    { id: "seo", name: "SEO Setup", price: 150 },
    { id: "performance", name: "Performance Optimization", price: 150 },
    { id: "copywriting", name: "Copywriting", price: 150 },
    { id: "analytics", name: "Analytics Setup", price: 75 },
  ],
};

const maintenancePrice = { pk: 5000, uk: 75 };

function formatPrice(price: number, region: Region) {
  if (region === "uk") return `£${price.toLocaleString()}`;
  return `PKR ${price.toLocaleString()}`;
}

function AnimatedPrice({ value, region }: { value: number; region: Region }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number>(undefined);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const duration = 400;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * ease));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else prevRef.current = to;
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return <span>{formatPrice(display, region)}</span>;
}

export default function PricingCalculator() {
  const [region, setRegion] = useState<Region>("pk");
  const [selectedPkg, setSelectedPkg] = useState<string>("business");
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [maintenance, setMaintenance] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const toggleFeature = useCallback((id: string) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const pkgs = packages[region];
  const features = optionalFeatures[region];
  const r = regions[region];

  const basePkg = pkgs.find((p) => p.id === selectedPkg);
  const basePrice = basePkg?.price ?? pkgs[0].price;
  const featuresTotal = features
    .filter((f) => selectedFeatures.has(f.id))
    .reduce((sum, f) => sum + f.price, 0);
  const maintTotal = maintenance ? maintenancePrice[region] : 0;
  const total = basePrice + featuresTotal + maintTotal;

  useEffect(() => {
    setSelectedFeatures(new Set());
    setMaintenance(false);
  }, [region]);

  const handleRequestQuote = () => {
    const pkg = pkgs.find((p) => p.id === selectedPkg);
    const selectedF = features
      .filter((f) => selectedFeatures.has(f.id))
      .map((f) => `${f.name} (${formatPrice(f.price, region)})`)
      .join(", ");
    const subject = encodeURIComponent("Project Quote Request");
    const body = encodeURIComponent(
      `Hi Haris,\n\nI'd like a quote for the following:\n\nRegion: ${r.label} (${r.currency})\nPackage: ${pkg?.name} — ${formatPrice(basePrice, region)}\nOptional Features: ${selectedF || "None"}\nMonthly Maintenance: ${maintenance ? formatPrice(maintenancePrice[region], region) : "No"}\n\nEstimated Total: ${formatPrice(total, region)}\n\nPlease get back to me with a detailed quote.\n\nThanks!`,
    );
    window.open(`mailto:harisshuja05@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span className="section-label" variants={sectionLabelVariants}>
            <i className="fas fa-calculator" aria-hidden="true" /> PRICING
          </motion.span>
          <motion.h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            Interactive{" "}
            <span className="gradient-text">cost calculator</span>
          </motion.h2>
          <motion.p className="text-sm mb-8 max-w-lg" style={{ color: "#94a3b8" }} variants={staggerChild}>
            Select features to get an instant estimate. Every project starts with a base package.
          </motion.p>
        </motion.div>

        {/* Region Selector */}
        <motion.div
          className="flex gap-2 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {(Object.keys(regions) as Region[]).map((key) => (
            <motion.button
              key={key}
              onClick={() => setRegion(key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: region === key ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${region === key ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: region === key ? "#818cf8" : "#94a3b8",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-1.5" aria-hidden="true">{r.flag}</span>
              {regions[key].label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Packages + Features */}
          <div className="lg:col-span-3">
            {/* Base packages */}
            <div
              className="rounded-xl p-5 mb-5"
              style={{
                background: "rgba(17,24,39,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: "#64748b" }}
              >
                Choose a Package
              </h3>
              <div className="space-y-2">
                {pkgs.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg.id)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left"
                    style={{
                      background: selectedPkg === pkg.id
                        ? "rgba(99,102,241,0.08)"
                        : "rgba(10,10,15,0.5)",
                      borderColor: selectedPkg === pkg.id
                        ? "rgba(99,102,241,0.4)"
                        : "rgba(255,255,255,0.06)",
                    }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: selectedPkg === pkg.id ? "#f1f5f9" : "#c8d6e5" }}
                      >
                        {pkg.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                        {pkg.desc}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p
                        className="text-sm font-bold font-['Space_Grotesk']"
                        style={{ color: selectedPkg === pkg.id ? "#818cf8" : "#94a3b8" }}
                      >
                        {formatPrice(pkg.price, region)}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Optional features */}
            <div
              className="rounded-xl p-5 mb-5"
              style={{
                background: "rgba(17,24,39,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: "#64748b" }}
              >
                Optional Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f) => (
                  <motion.button
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className="flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left"
                    style={{
                      background: selectedFeatures.has(f.id)
                        ? "rgba(6,182,212,0.08)"
                        : "rgba(10,10,15,0.4)",
                      borderColor: selectedFeatures.has(f.id)
                        ? "rgba(6,182,212,0.3)"
                        : "rgba(255,255,255,0.05)",
                    }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-4 h-4 rounded shrink-0 flex items-center justify-center"
                      animate={{
                        background: selectedFeatures.has(f.id) ? "#06b6d4" : "transparent",
                        borderColor: selectedFeatures.has(f.id) ? "#06b6d4" : "rgba(255,255,255,0.2)",
                      }}
                      style={{ border: "1.5px solid" }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence>
                        {selectedFeatures.has(f.id) && (
                          <motion.i
                            className="fas fa-check text-[8px] text-white"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            aria-hidden="true"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: "#e2e8f0" }}>
                        {f.name}
                      </p>
                    </div>
                    <span
                      className="text-[11px] font-semibold shrink-0"
                      style={{ color: selectedFeatures.has(f.id) ? "#06b6d4" : "#64748b" }}
                    >
                      +{formatPrice(f.price, region)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Maintenance toggle */}
            <motion.div
              className="rounded-xl p-4 flex items-center justify-between"
              style={{
                background: "rgba(17,24,39,0.8)",
                border: `1px solid ${maintenance ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"}`,
                backdropFilter: "blur(10px)",
              }}
              animate={{
                borderColor: maintenance ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "#f1f5f9" }}>
                  Monthly Maintenance
                </p>
                <p className="text-xs" style={{ color: "#64748b" }}>
                  Ongoing support, updates & monitoring
                </p>
              </div>
              <button
                onClick={() => setMaintenance(!maintenance)}
                className="relative w-10 h-5 rounded-full transition-all duration-200 shrink-0 ml-4"
                style={{
                  background: maintenance ? "#f59e0b" : "rgba(255,255,255,0.12)",
                }}
                role="switch"
                aria-checked={maintenance}
                aria-label="Toggle monthly maintenance"
              >
                <motion.div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                  animate={{ left: maintenance ? 22 : 2 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </button>
            </motion.div>
          </div>

          {/* Right: Estimate Summary */}
          <div className="lg:col-span-2">
            <motion.div
              className="rounded-xl p-6 lg:sticky lg:top-24"
              style={{
                background: "rgba(17,24,39,0.9)",
                border: "1px solid rgba(99,102,241,0.15)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Large total */}
              <div className="text-center mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
                  Estimated Project Cost
                </p>
                <motion.p
                  className="font-['Space_Grotesk'] font-extrabold text-4xl gradient-text leading-none"
                  key={total}
                  initial={{ scale: 0.95, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedPrice value={total} region={region} />
                </motion.p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#94a3b8" }}>Base Package</span>
                  <span className="font-medium" style={{ color: "#f1f5f9" }}>
                    {formatPrice(basePrice, region)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#94a3b8" }}>Additional Features</span>
                  <span className="font-medium" style={{ color: "#f1f5f9" }}>
                    {formatPrice(featuresTotal, region)}
                  </span>
                </div>
                <AnimatePresence>
                  {maintenance && (
                    <motion.div
                      className="flex justify-between text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span style={{ color: "#94a3b8" }}>Monthly Maintenance</span>
                      <span className="font-medium" style={{ color: "#f59e0b" }}>
                        {formatPrice(maintenancePrice[region], region)}/mo
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="border-t pt-3 mb-5 flex justify-between items-center"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span
                  className="font-['Space_Grotesk'] font-bold text-base"
                  style={{ color: "#f1f5f9" }}
                >
                  Estimated Total
                </span>
                <span className="font-['Space_Grotesk'] font-extrabold text-2xl gradient-text">
                  <AnimatedPrice value={total} region={region} />
                </span>
              </div>

              <p className="text-[11px] mb-5 leading-relaxed" style={{ color: "#475569" }}>
                Indicative estimate based on selected services. Final pricing may vary depending on project scope and requirements.
              </p>

              <motion.button
                onClick={handleRequestQuote}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 30px rgba(99,102,241,0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-paper-plane mr-2" aria-hidden="true" />
                Request Quote via Email
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
