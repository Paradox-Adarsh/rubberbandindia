import { easeOut } from "framer-motion";
import { Variants, easeInOut } from "framer-motion";
export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
};
export const fadeDown = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 40 },
  transition: { duration: 0.6, ease: easeOut },
};
export const fadeVerticalIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: easeOut },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.4 },
};

export const springHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { stiffness: 200, damping: 12 },
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const floatVariant: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      // repeatType must be a literal union value; use "loop" as const to satisfy TS
      repeatType: "loop" as const,
      ease: easeInOut,
    },
  },
};
