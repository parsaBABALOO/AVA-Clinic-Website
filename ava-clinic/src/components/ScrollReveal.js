"use client";

import { motion } from "framer-motion";

/**
 * ScrollReveal component utilizes Framer Motion to smoothly fade and translate
 * elements into view once they enter the user's viewport during scrolling.
 */
export default function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 1.02, 0.43, 1.01], // Custom premium cubic-bezier easing
      }}
    >
      {children}
    </motion.div>
  );
}