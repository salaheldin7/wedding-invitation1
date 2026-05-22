"use client";

import { motion } from "framer-motion";

type AudioToggleProps = {
  enabled: boolean;
  muted: boolean;
  onToggle: () => void;
};

export function AudioToggle({ enabled, muted, onToggle }: AudioToggleProps) {
  const label = !enabled ? "Sound" : muted ? "Muted" : "Sound";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full border border-white/20 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      aria-pressed={enabled ? !muted : false}
      aria-label="Toggle background music"
    >
      <span className="font-display">{label}</span>
    </motion.button>
  );
}
