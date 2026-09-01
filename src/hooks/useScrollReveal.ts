import { type Variants } from "framer-motion";

// Shared easing curve — a tuple so it satisfies Framer Motion's strict types
type CubicBezier = [number, number, number, number];
export const EASE_OUT: CubicBezier = [0.25, 0.46, 0.45, 0.94];

// ──────────────────────────────────────────────
// Core animation variants
// ──────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

// ──────────────────────────────────────────────
// Container variants for stagger children
// ──────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ──────────────────────────────────────────────
// Child variants (used inside stagger containers)
// ──────────────────────────────────────────────

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

// ──────────────────────────────────────────────
// Section label animation
// ──────────────────────────────────────────────

export const sectionLabelVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

// ──────────────────────────────────────────────
// Heading text mask reveal
// ──────────────────────────────────────────────

export const textMaskReveal: Variants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

// ──────────────────────────────────────────────
// Word-by-word reveal helper
// ──────────────────────────────────────────────

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

// ──────────────────────────────────────────────
// Perspective tilt (for cards)
// ──────────────────────────────────────────────

export const perspectiveTilt: Variants = {
  hidden: { opacity: 0, rotateY: -15, rotateX: 5 },
  visible: {
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

// ──────────────────────────────────────────────
// Timeline draw
// ──────────────────────────────────────────────

export const timelineDraw: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: EASE_OUT },
  },
};

// ──────────────────────────────────────────────
// Reduced motion: simplified animations
// ──────────────────────────────────────────────

export function reducedMotionVariants(original: Variants): Variants {
  return {
    hidden: original.hidden,
    visible: {
      ...(typeof original.visible === "object" ? original.visible : {}),
      transition: { duration: 0.01 },
    },
  };
}
