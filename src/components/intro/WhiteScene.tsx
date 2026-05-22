"use client";

import { motion } from "framer-motion";

export function WhiteScene() {
  return (
    <motion.div
      className="absolute inset-0 bg-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    />
  );
}
