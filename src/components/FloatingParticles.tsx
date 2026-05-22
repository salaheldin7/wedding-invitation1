"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = [
  { id: 1, size: 2, top: "10%", left: "12%", delay: 0, duration: 12, opacity: 0.35 },
  { id: 2, size: 3, top: "22%", left: "76%", delay: 2, duration: 14, opacity: 0.25 },
  { id: 3, size: 2, top: "40%", left: "18%", delay: 1, duration: 11, opacity: 0.3 },
  { id: 4, size: 4, top: "55%", left: "64%", delay: 3, duration: 15, opacity: 0.22 },
  { id: 5, size: 3, top: "72%", left: "28%", delay: 0.5, duration: 13, opacity: 0.28 },
  { id: 6, size: 2, top: "82%", left: "80%", delay: 4, duration: 16, opacity: 0.2 },
];

export function FloatingParticles() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            width: particle.size,
            height: particle.size,
            top: particle.top,
            left: particle.left,
            opacity: particle.opacity,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: ["0%", "-25%", "0%"],
                  opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
