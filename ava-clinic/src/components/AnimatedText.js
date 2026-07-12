"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AnimatedText component creates a vertical rolling/fading word animation loop.
 * @param {Array} words - Array of uppercase string terms to rotate through.
 */
export default function AnimatedText({ words = ["BEST", "TRUSTED", "EXCLUSIVE"] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Automatic text rotator loop interval configuration
    const loopInterval = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2500);
    return () => clearInterval(loopInterval);
  }, [words.length]);

  return (
    <span className="inline-block min-w-[220px] text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-accent mx-2 font-display">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}