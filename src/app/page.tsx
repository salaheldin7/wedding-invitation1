"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { AudioToggle } from "@/components/AudioToggle";
import { BilingualPair } from "@/components/BilingualPair";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { Countdown } from "@/components/Countdown";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Reveal } from "@/components/Reveal";
import { RsvpForm } from "@/components/RsvpForm";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(212,175,80,0.35)]" />
      <div className="h-1.5 w-1.5 rounded-full bg-[rgba(212,175,80,0.5)]" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(212,175,80,0.35)]" />
    </div>
  );
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [introDone, setIntroDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // NEW
  const [started, setStarted] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.4]);

  const fadeInAudio = useCallback((audio: HTMLAudioElement) => {
    audio.volume = 0;

    const fade = window.setInterval(() => {
      if (audio.volume >= 0.9) {
        audio.volume = 0.9;
        window.clearInterval(fade);
      } else {
        audio.volume = Math.min(0.2, audio.volume + 0.06);
      }
    }, 120);
  }, []);

  const startAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      audio.muted = false;
      await audio.play();

      setMuted(false);
      setAudioEnabled(true);

      fadeInAudio(audio);
    } catch {
      setMuted(true);
      setAudioEnabled(false);
    }
  }, [fadeInAudio]);

  const handleAudioToggle = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audioEnabled) {
      void startAudio();
      return;
    }

    if (muted) {
      audio.muted = false;
      fadeInAudio(audio);
      setMuted(false);
      return;
    }

    audio.muted = true;
    setMuted(true);
  }, [audioEnabled, muted, startAudio, fadeInAudio]);

  // START EXPERIENCE
  const handleStart = async () => {
    setStarted(true);
    await startAudio();
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      const audio = audioRef.current;

      if (audio && !audio.paused && audio.muted) {
        audio.muted = false;
        fadeInAudio(audio);
        setMuted(false);
      }

      window.removeEventListener("pointerdown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      passive: true,
    });

    return () =>
      window.removeEventListener("pointerdown", handleFirstInteraction);
  }, [fadeInAudio]);

  return (
    <MotionConfig
      transition={{ ease: easing, duration: 0.9 }}
      reducedMotion="user"
    >
      <div className="relative min-h-screen overflow-x-hidden bg-wine text-white">
        <audio
          ref={audioRef}
          src="/audio/mayada.m4a"
          preload="auto"
          loop
        />

        <AudioToggle
          enabled={audioEnabled}
          muted={muted}
          onToggle={handleAudioToggle}
        />

        {/* START SCREEN */}
        {!started && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[#120208]">
            {/* ambient glow */}
            <div className="absolute h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,175,80,0.08)_0%,transparent_70%)] blur-3xl animate-pulse" />

            {/* particles */}
            <FloatingParticles />

            <button
              onClick={handleStart}
              className="group relative flex flex-col items-center"
            >
              {/* outer ring */}
              <div className="absolute inset-0 scale-[1.8] rounded-full border border-[rgba(212,175,80,0.12)]" />

              {/* center medallion */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(212,175,80,0.28)] bg-white/[0.03] shadow-[0_0_80px_rgba(212,175,80,0.12)] backdrop-blur-md transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_120px_rgba(212,175,80,0.18)]">
                <div className="absolute inset-2 rounded-full border border-[rgba(212,175,80,0.12)]" />

                <span className="font-display text-lg tracking-[0.45em] text-[#f0d080]">
                  K N
                </span>
              </div>

              {/* text */}
              <div className="mt-10 text-center">
                <p className="font-display text-[11px] uppercase tracking-[0.55em] text-[rgba(240,208,128,0.82)]">
                  Tap To Begin
                </p>

                <p
                  dir="rtl"
                  className="mt-3 text-[12px] tracking-[0.28em] text-[rgba(240,208,128,0.55)]"
                >
                  اضغط للبدء
                </p>
              </div>

              {/* divider */}
              <div className="mt-6 flex items-center gap-3 opacity-60">
                <div className="h-px w-10 bg-[rgba(212,175,80,0.25)]" />
                <span className="text-[rgba(212,175,80,0.4)]">✦</span>
                <div className="h-px w-10 bg-[rgba(212,175,80,0.25)]" />
              </div>
            </button>
          </div>
        )}

        {/* INTRO */}
        {started && (
          <CinematicIntro onComplete={() => setIntroDone(true)} />
        )}

        {/* MAIN CONTENT */}
        <main
          className={`relative z-10 snap-y snap-mandatory scroll-smooth transition-opacity duration-700 ${
            introDone
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {/* HERO SECTION */}
          <section
            ref={heroRef}
            className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-8 px-5 pb-16 pt-24"
          >
            <FloatingParticles />

            <motion.div
              className="absolute inset-0 -z-10 lux-bg"
              style={{ y: bgY, opacity: bgOpacity }}
            />

            <Reveal>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(212,175,80,0.3)] bg-white/[0.03] shadow-[0_0_40px_rgba(199,164,106,0.14)]">
                <span className="font-display text-sm tracking-[0.35em] text-[#f0d080]">
                  K N
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card-type w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#fffdf5] to-[#f8ecd7] px-7 py-9 shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(212,175,80,0.25)] sm:max-w-md sm:px-10 sm:py-11">

                <div className="mb-5 text-center">
                  <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-wine/40">
                    ✦ Wedding Celebration ·{" "}
                    <span className="font-ar" dir="rtl">
                      حفل زفاف
                    </span>{" "}
                    ✦
                  </p>

                  <h1 className="font-display text-4xl tracking-[0.28em] text-wine">
                    K & N
                  </h1>

                  <p className="mt-3 text-[12px] font-medium tracking-[0.34em] text-wine/60">
                    Karim Youssef · Nada Hesham
                  </p>

                  <p
                    className="mt-2 text-[13px] font-medium tracking-[0.26em] text-wine/55 font-ar"
                    dir="rtl"
                  >
                    كريم يوسف · ندى هشام
                  </p>
                </div>

                <GoldDivider />

                <div className="my-5 text-center">
                  <p className="font-display text-2xl tracking-[0.22em] text-wine">
                    21 · 08 · 2026
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.4em] text-wine/50">
                    Friday
                  </p>

                  <p
                    className="mt-1 text-[9px] tracking-[0.3em] text-wine/50 font-ar"
                    dir="rtl"
                  >
                    الجمعة
                  </p>
                </div>

                <GoldDivider />

                <div className="my-5 space-y-1 text-center text-[13px] text-wine/75">
                  <p>From 7:00 PM till 12:00 AM</p>

                  <p dir="rtl" className="text-[12px] font-ar">
                    من الساعة ٧ مساءً حتى ١٢ منتصف الليل
                  </p>
                </div>

                <GoldDivider />

                <div className="my-5 text-center text-[13px] text-wine/75">
                  <p>📍 The Westin Cairo Golf Resort & Spa</p>

                  <p className="mt-1 text-[11px] text-wine/50">
                    Katameya Dunes
                  </p>

                  <p className="mt-2 text-[12px] font-ar" dir="rtl">
                    فندق ويستن كايرو
                  </p>
                </div>

                <GoldDivider />

                <div className="my-5 text-center text-[12px] leading-relaxed text-wine/70">
                  <p>
                    We would be honored to celebrate this special evening with
                    you
                  </p>

                  <p className="mt-2 font-ar" dir="rtl">
                    يشرفنا حضوركم ومشاركتكم فرحتنا
                  </p>
                </div>

                <GoldDivider />

                <div className="mt-5 text-center text-[11px] leading-relaxed text-wine/45">
                  <p>🚭 No smoking is allowed inside the hall</p>

                  <p className="mt-1 font-ar" dir="rtl">
                    ممنوع التدخين داخل القاعة
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] text-[rgba(240,208,128,0.4)]">
                <span className="h-px w-8 bg-white/15" />
                Scroll to continue
                <span className="h-px w-8 bg-white/15" />
              </div>
            </Reveal>
          </section>

          {/* COUNTDOWN */}
          <section className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-10 px-5 py-20">
            <Reveal>
              <div className="text-center">
                <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-[rgba(212,175,80,0.5)]">
                  ✦ Time Until Forever ✦
                </p>

                <BilingualPair
                  en="Countdown to Our Forever ❤️"
                  ar="العدّ التنازلي ليوم زفافنا"
                  className="text-xl"
                  enClassName="font-display tracking-[0.12em]"
                  arClassName="tracking-[0.12em]"
                />

                <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[rgba(212,175,80,0.45)]">
                  21 August 2026
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="w-full max-w-sm">
                <Countdown />
              </div>
            </Reveal>
          </section>

          {/* RSVP */}
          <section className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-10 px-5 py-20">
            <Reveal>
              <div className="text-center">
                <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-[rgba(212,175,80,0.5)]">
                  ✦ Kindly Respond ✦
                </p>

                <BilingualPair
                  en="Kindly RSVP"
                  ar="يرجى تأكيد الحضور"
                  className="text-xl"
                  enClassName="font-display tracking-[0.2em]"
                  arClassName="tracking-[0.2em]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="w-full max-w-sm rounded-3xl border border-[rgba(212,175,80,0.15)] bg-white/[0.03] p-7 backdrop-blur-sm sm:max-w-md sm:p-9">
                <RsvpForm />
              </div>
            </Reveal>
          </section>

          {/* CLOSING */}
          <section className="relative flex min-h-[60vh] snap-start flex-col items-center justify-center px-5 py-20 text-center">
            <FloatingParticles />

            <motion.div
              className="space-y-3"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: easing }}
            >
              <p className="font-display text-xl tracking-[0.14em] text-ivory">
                Waiting to celebrate together ❤️
              </p>

              <p
                className="font-ar text-xl tracking-[0.1em] text-ivory"
                dir="rtl"
              >
                بانتظار مشاركتكم فرحتنا ❤️
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-[rgba(212,175,80,0.3)]" />
                <span className="text-[rgba(212,175,80,0.4)]">✦</span>
                <div className="h-px w-10 bg-[rgba(212,175,80,0.3)]" />
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}