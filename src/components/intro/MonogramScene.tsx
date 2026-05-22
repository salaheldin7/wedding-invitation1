"use client";

import { motion } from "framer-motion";

type MonogramSceneProps = {
  idle?: boolean;
};

export function MonogramScene({ idle = false }: MonogramSceneProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center lux-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: idle ? 1.2 : 1 }}
    >
      <div className="relative text-center">
        <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_60px_rgba(199,164,106,0.18)]">
          <span className="font-display text-4xl tracking-[0.45em] text-ivory">
            K N
          </span>
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.45em] text-ivory opacity-70">
          Wedding Celebration
        </p>
      </div>
    </motion.div>
  );
}
