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
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
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
            className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3"
            style={{ color: "#F5EFE6", letterSpacing: "-0.02em" }}
            variants={textMaskReveal}
          >
            Interactive{" "}
            <span className="gradient-text">cost calculator</span>
          </motion.h2>
          <motion.p className="text-xs sm:text-sm mb-6 sm:mb-8 max-w-lg" style={{ color: "#A89F8F" }} variants={staggerChild}>
            Select features to get an instant estimate. Every project starts with a base package.
          </motion.p>
        </motion.div>

        {/* Region Selector */}
        <motion.div
          className="flex gap-2 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {(Object.keys(regions) as Region[]).map((key) => (
            <motion.button
              key={key}
              onClick={() => setRegion(key)}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200"
              style={{
                background: region === key ? "rgba(255,132,0,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${region === key ? "rgba(255,132,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: region === key ? "#FF8400" : "#A89F8F",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-1.5" aria-hidden="true">{r.flag}</span>
              {regions[key].label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-5 sm:gap-6">
          {/* Left: Packages + Features */}
          <div className="lg:col-span-3">
            {/* Base packages */}
            <div
              className="rounded-xl p-4 sm:p-5 mb-4 sm:mb-5"
              style={{
                background: "#1A1612",
                border: "1px solid #2D2A24",
              }}
            >
              <h3
                className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4"
                style={{ color: "#8A8275" }}
              >
                Choose a Package
              </h3>
              <div className="space-y-2">
                {pkgs.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg.id)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 text-left"
                    style={{
                      background: selectedPkg === pkg.id
                        ? "rgba(255,132,0,0.08)"
                        : "#12100C",
                      borderColor: selectedPkg === pkg.id
                        ? "rgba(255,132,0,0.4)"
                        : "#2D2A24",
                    }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs sm:text-sm font-semibold"
                        style={{ color: selectedPkg === pkg.id ? "#F5EFE6" : "#A89F8F" }}
                      >
                        {pkg.name}
                      </p>
                      <p className="text-[11px] sm:text-xs mt-0.5" style={{ color: "#8A8275" }}>
                        {pkg.desc}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3 sm:ml-4">
                      <p
                        className="text-xs sm:text-sm font-bold font-['Space_Grotesk']"
                        style={{ color: selectedPkg === pkg.id ? "#FF8400" : "#A89F8F" }}
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
              className="rounded-xl p-4 sm:p-5 mb-4 sm:mb-5"
              style={{
                background: "#1A1612",
                border: "1px solid #2D2A24",
              }}
            >
              <h3
                className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4"
                style={{ color: "#8A8275" }}
              >
                Optional Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f) => (
                  <motion.button
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-lg border transition-all duration-200 text-left"
                    style={{
                      background: selectedFeatures.has(f.id)
                        ? "rgba(255,132,0,0.06)"
                        : "#12100C",
                      borderColor: selectedFeatures.has(f.id)
                        ? "rgba(255,132,0,0.3)"
                        : "#2D2A24",
                    }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-4 h-4 rounded shrink-0 flex items-center justify-center"
                      animate={{
                        background: selectedFeatures.has(f.id) ? "#FF8400" : "transparent",
                        borderColor: selectedFeatures.has(f.id) ? "#FF8400" : "rgba(255,255,255,0.15)",
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
                      <p className="text-[11px] sm:text-xs font-medium" style={{ color: "#F5EFE6" }}>
                        {f.name}
                      </p>
                    </div>
                    <span
                      className="text-[10px] sm:text-[11px] font-semibold shrink-0"
                      style={{ color: selectedFeatures.has(f.id) ? "#FF8400" : "#8A8275" }}
                    >
                      +{formatPrice(f.price, region)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Maintenance toggle */}
            <motion.div
              className="rounded-xl p-3 sm:p-4 flex items-center justify-between"
              style={{
                background: "#1A1612",
                border: `1px solid ${maintenance ? "rgba(255,132,0,0.3)" : "#2D2A24"}`,
              }}
              animate={{
                borderColor: maintenance ? "rgba(255,132,0,0.3)" : "#2D2A24",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium" style={{ color: "#F5EFE6" }}>
                  Monthly Maintenance
                </p>
                <p className="text-[11px] sm:text-xs" style={{ color: "#8A8275" }}>
                  Ongoing support, updates & monitoring
                </p>
              </div>
              <button
                onClick={() => setMaintenance(!maintenance)}
                className="relative w-10 h-5 rounded-full transition-all duration-200 shrink-0 ml-3"
                style={{
                  background: maintenance ? "#FF8400" : "rgba(255,255,255,0.1)",
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
              className="rounded-xl p-5 sm:p-6 lg:sticky lg:top-24"
              style={{
                background: "#1A1612",
                border: "1px solid rgba(255,132,0,0.12)",
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Large total */}
              <div className="text-center mb-5 sm:mb-6">
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8A8275" }}>
                  Estimated Project Cost
                </p>
                <motion.p
                  className="font-['Space_Grotesk'] font-extrabold text-3xl sm:text-4xl gradient-text leading-none"
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
                <div className="flex justify-between text-xs sm:text-sm">
                  <span style={{ color: "#A89F8F" }}>Base Package</span>
                  <span className="font-medium" style={{ color: "#F5EFE6" }}>
                    {formatPrice(basePrice, region)}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span style={{ color: "#A89F8F" }}>Additional Features</span>
                  <span className="font-medium" style={{ color: "#F5EFE6" }}>
                    {formatPrice(featuresTotal, region)}
                  </span>
                </div>
                <AnimatePresence>
                  {maintenance && (
                    <motion.div
                      className="flex justify-between text-xs sm:text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span style={{ color: "#A89F8F" }}>Monthly Maintenance</span>
                      <span className="font-medium" style={{ color: "#FF8400" }}>
                        {formatPrice(maintenancePrice[region], region)}/mo
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="border-t pt-3 mb-4 sm:mb-5 flex justify-between items-center"
                style={{ borderColor: "#2D2A24" }}
              >
                <span
                  className="font-['Space_Grotesk'] font-bold text-sm sm:text-base"
                  style={{ color: "#F5EFE6" }}
                >
                  Estimated Total
                </span>
                <span className="font-['Space_Grotesk'] font-extrabold text-xl sm:text-2xl gradient-text">
                  <AnimatedPrice value={total} region={region} />
                </span>
              </div>

              <p className="text-[10px] sm:text-[11px] mb-4 sm:mb-5 leading-relaxed" style={{ color: "#8A8275" }}>
                Indicative estimate based on selected services. Final pricing may vary depending on project scope and requirements.
              </p>

              <motion.button
                onClick={handleRequestQuote}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: "#FF8400",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(255,132,0,0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 30px rgba(255,132,0,0.4)" }}
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
