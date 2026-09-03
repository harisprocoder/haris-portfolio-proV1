import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[999] w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white"
          style={{
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            boxShadow: "0 0 30px rgba(99,102,241,0.4)",
          }}
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(99,102,241,0.6)" }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-arrow-up text-sm" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
