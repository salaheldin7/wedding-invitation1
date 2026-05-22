"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const targetDate = new Date("2026-08-21T19:00:00");

const getTimeLeft = (): CountdownValues => {
  const total = Math.max(0, targetDate.getTime() - Date.now());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const pad = (value: number) => value.toString().padStart(2, "0");

type CountdownUnitProps = {
  label: string;
  value: number;
};

function CountdownUnit({ label, value }: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-black/30 px-5 py-4 text-center shadow-luxe">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="text-3xl font-display text-ivory"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6 }}
        >
          {pad(value)}
        </motion.span>
      </AnimatePresence>
      <span className="text-[11px] uppercase tracking-[0.35em] text-ivory opacity-70">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<CountdownValues | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft()); // populate on client only
    const id = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <div className="grid grid-cols-2 gap-4 text-white sm:grid-cols-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="flex flex-col items-center gap-2 rounded-2xl bg-black/30 px-5 py-4 text-center shadow-luxe">
            <span className="text-3xl font-display text-ivory">--</span>
            <span className="text-[11px] uppercase tracking-[0.35em] text-ivory opacity-70">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 text-white sm:grid-cols-4">
      <CountdownUnit label="Days" value={timeLeft.days} />
      <CountdownUnit label="Hours" value={timeLeft.hours} />
      <CountdownUnit label="Minutes" value={timeLeft.minutes} />
      <CountdownUnit label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}
