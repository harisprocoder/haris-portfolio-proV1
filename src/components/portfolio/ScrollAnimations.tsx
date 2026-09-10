import { useEffect } from "react";

const REVEAL_SELECTOR = "main section";
const CARD_SELECTOR = ".glass-card, [data-scroll-card]";

/**
 * Adds a lightweight, CSS-driven reveal layer over the existing Framer Motion
 * animations. It keeps content visible if JavaScript is unavailable and
 * automatically disables non-essential motion for reduced-motion users.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    body.classList.add("motion-ready");
    if (reduceMotion) {
      body.classList.add("reduce-motion");
      sections.forEach((section) => section.classList.add("is-visible"));
      return () => {
        body.classList.remove("motion-ready", "reduce-motion");
      };
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target as HTMLElement;
          section.classList.add("is-visible");
          revealObserver.unobserve(section);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    sections.forEach((section, sectionIndex) => {
      section.dataset.scrollIndex = String(sectionIndex);
      section.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((card, cardIndex) => {
        card.dataset.scrollCard = "true";
        card.style.setProperty("--scroll-delay", `${Math.min(cardIndex * 70, 420)}ms`);
      });
      revealObserver.observe(section);
    });

    let frame = 0;
    const updateScrollProgress = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
        const shift = Math.max(-14, Math.min(14, distance * -5));
        section.style.setProperty("--section-shift", `${shift}px`);
      });
      root.style.setProperty("--page-scroll", `${window.scrollY}px`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      body.classList.remove("motion-ready", "reduce-motion");
    };
  }, []);

  return null;
}
