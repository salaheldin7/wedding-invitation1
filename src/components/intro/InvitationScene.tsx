"use client";

import { motion } from "framer-motion";

export function InvitationScene() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-wine"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="card-ivory card-type w-[82vw] max-w-sm rounded-3xl p-8 text-center shadow-luxe paper-texture"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 1.2 }}
      >
        <div className="text-[11px] uppercase tracking-[0.45em] text-wine opacity-70">
          Wedding Celebration
        </div>
        <div className="mt-4 font-display text-3xl tracking-[0.2em] text-wine">
          21 • 08 • 2026
        </div>
        <div className="mt-3 text-xs uppercase tracking-[0.35em] text-wine opacity-70">
          Friday |{" "}
          <span className="font-ar" dir="rtl">
            الجمعة
          </span>
        </div>
        <div
          className="mt-8 h-px w-full"
          style={{ backgroundColor: "rgba(91, 15, 26, 0.2)" }}
        />
        <p className="mt-6 text-sm text-wine opacity-80">
          A cinematic invitation awaits
        </p>
      </motion.div>
    </motion.div>
  );
}
