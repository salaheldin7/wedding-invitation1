"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { InvitationScene } from "./InvitationScene";
import { WhiteScene } from "./WhiteScene";
import { EnvelopeScene } from "./EnvelopeScene";

type Stage = "envelope" | "card" | "white";

type CinematicIntroProps = {
  onComplete: () => void;
};

const sequence: Array<{ stage: Stage; duration: number }> = [
  { stage: "envelope", duration: 11200 },
  { stage: "card", duration: 3000 },
  { stage: "white", duration: 600 },
];

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("envelope");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setStage("card");
      const doneTimer = window.setTimeout(() => {
        setComplete(true);
        onComplete();
      }, 700);
      return () => window.clearTimeout(doneTimer);
    }

    let elapsed = 0;
    const timers = sequence.map((step) => {
      const id = window.setTimeout(() => setStage(step.stage), elapsed);
      elapsed += step.duration;
      return id;
    });

    const doneTimer = window.setTimeout(() => {
      setComplete(true);
      onComplete();
    }, elapsed + 800);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(doneTimer);
    };
  }, [reduceMotion, onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-wine"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <AnimatePresence mode="wait">
            {stage === "card" && <InvitationScene key="card" />}
            {stage === "white" && <WhiteScene key="white" />}
            {stage === "envelope" && <EnvelopeScene key="envelope" />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
