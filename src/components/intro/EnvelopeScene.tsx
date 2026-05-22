"use client";

import { useEffect, useRef } from "react";

export function EnvelopeScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        sealRef.current?.classList.add("seal-break");
      }, 3600)
    );

    timers.push(
      setTimeout(() => {
        flapRef.current?.classList.add("flap-open");
      }, 4100)
    );

    timers.push(
      setTimeout(() => {
        cardRef.current?.classList.add("card-rise");
      }, 5200)
    );

    timers.push(
      setTimeout(() => {
        wrapRef.current?.classList.add("scene-out");
      }, 8200)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scene {
          position: absolute;
          inset: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;

          /* MATCHED with start screen */
          background:
            radial-gradient(
              circle at center,
              rgba(212,175,80,0.07) 0%,
              rgba(80,20,30,0.08) 28%,
              rgba(18,2,8,0.92) 65%,
              #120208 100%
            );
        }

        /* luxury vignette */
        .scene::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 70% 60% at 50% 50%,
              transparent 25%,
              rgba(0,0,0,0.45) 100%
            );
          pointer-events: none;
        }

        /* cinematic glow */
        .scene::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 45% 30% at 50% 100%,
              rgba(212,175,80,0.08) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 50% 30% at 50% 0%,
              rgba(120,20,40,0.10) 0%,
              transparent 70%
            );
          pointer-events: none;
        }

        .ambient {
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(212,175,80,0.12) 0%,
              rgba(120,20,40,0.06) 45%,
              transparent 72%
            );

          filter: blur(48px);

          animation: ambientPulse 8s ease-in-out infinite;
        }

        @keyframes ambientPulse {
          0%,100% {
            transform: scale(0.94);
            opacity: 0.6;
          }

          50% {
            transform: scale(1.06);
            opacity: 1;
          }
        }

        .wrap {
          position: relative;
          width: 420px;
          height: 280px;
          perspective: 2200px;

          opacity: 0;
          transform: scale(0.96);
          filter: blur(10px);

          animation:
            envelopeEnter 2.2s cubic-bezier(.16,1,.3,1) forwards,
            floaty 7s ease-in-out 2.2s infinite;
        }

        @keyframes envelopeEnter {
          0% {
            opacity: 0;
            transform: scale(1.08);
            filter: blur(18px);
          }

          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        .wrap.scene-out {
          animation: cardTransition 2.4s cubic-bezier(.16,1,.3,1) forwards;
        }

        @keyframes floaty {
          0%,100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes cardTransition {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }

          55% {
            opacity: 1;
            transform: scale(1.12) translateY(-10px);
            filter: blur(0px);
          }

          100% {
            opacity: 1;
            transform: scale(1.45) translateY(-30px);
            filter: blur(6px);
          }
        }

        .shadow {
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -32px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          filter: blur(24px);

          animation: shadowPulse 7s ease-in-out infinite;
        }

        @keyframes shadowPulse {
          0%,100% {
            transform: scaleX(1);
            opacity: 0.55;
          }

          50% {
            transform: scaleX(1.08);
            opacity: 0.35;
          }
        }

        /* envelope */
        .envelope {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              #6b0f22 0%,
              #3d0710 50%,
              #1a0307 100%
            );

          box-shadow:
            0 50px 110px rgba(0,0,0,0.8),
            0 10px 30px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(212,175,80,0.15);
        }

        .envelope::after {
          content: "";
          position: absolute;
          inset: 12px;
          border-radius: 4px;
          border: 1px solid rgba(212,175,80,0.28);
          pointer-events: none;
        }

        .fold {
          position: absolute;
        }

        .left-fold {
          left: 0;
          bottom: 0;
          width: 50%;
          height: 100%;

          background:
            linear-gradient(
              135deg,
              #8a1428 0%,
              #4a0912 55%,
              #200408 100%
            );

          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }

        .right-fold {
          right: 0;
          bottom: 0;
          width: 50%;
          height: 100%;

          background:
            linear-gradient(
              -135deg,
              #7c1122 0%,
              #420810 55%,
              #1c0306 100%
            );

          clip-path: polygon(100% 0, 0 50%, 100% 100%);
        }

        .bottom-fold {
          left: 0;
          right: 0;
          bottom: 0;
          height: 52%;

          background:
            linear-gradient(
              to bottom,
              #5e0e1e 0%,
              #17020a 100%
            );

          clip-path: polygon(0 100%, 50% 0, 100% 100%);
        }

        /* flap */
        .flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 54%;
          transform-origin: top center;
          transform-style: preserve-3d;
          z-index: 30;
        }

        .flap-open {
          animation: flapOpen 2.8s cubic-bezier(.16,1,.3,1) forwards;
        }

        @keyframes flapOpen {
          to {
            transform: rotateX(-178deg);
          }
        }

        .flap-front,
        .flap-back {
          position: absolute;
          inset: 0;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          backface-visibility: hidden;
        }

        .flap-front {
          background:
            linear-gradient(
              175deg,
              #8a1830 0%,
              #5c0e1c 55%,
              #2a0710 100%
            );
        }

        .flap-back {
          transform: rotateX(180deg);

          background:
            linear-gradient(
              180deg,
              #7a1428 0%,
              #3e0810 55%,
              #160208 100%
            );
        }

        /* seal */
        .seal-container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 82px;
          height: 82px;
          z-index: 50;

          animation:
            sealAppear 1.5s cubic-bezier(.16,1,.3,1) forwards;
        }

        @keyframes sealAppear {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(-20deg);
          }

          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        .seal-container.seal-break {
          animation: sealBreak .5s ease forwards !important;
        }

        @keyframes sealBreak {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(.2) rotate(25deg);
          }
        }

        .seal {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle at 32% 28%,
              #c44060 0%,
              #8b1a30 35%,
              #580e1e 65%,
              #2a0610 100%
            );

          box-shadow:
            0 8px 32px rgba(0,0,0,0.6),
            0 3px 12px rgba(0,0,0,0.4),
            0 0 0 3px rgba(212,175,80,0.55),
            0 0 0 5px rgba(212,175,80,0.18),
            inset 0 2px 6px rgba(255,200,80,0.18),
            inset 0 -3px 8px rgba(0,0,0,0.45);
        }

        .seal::before {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,80,0.45);

          box-shadow:
            inset 0 1px 3px rgba(0,0,0,0.4),
            0 1px 0 rgba(212,175,80,0.2);
        }

        .seal span {
          position: relative;
          z-index: 2;
          color: #f0d080;
          font-size: 12px;
          letter-spacing: .32em;
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;

          text-shadow:
            0 1px 3px rgba(0,0,0,0.6),
            0 0 8px rgba(212,175,80,0.3);
        }

        /* card */
        .card {
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 8%;
          height: 78%;
          border-radius: 4px;

          background:
            linear-gradient(
              170deg,
              #fffef9 0%,
              #f8ecd7 52%,
              #f1dfc0 100%
            );

          box-shadow:
            0 20px 50px rgba(0,0,0,0.35),
            0 0 0 1px rgba(212,175,80,0.2);

          transform: translateY(110%) scale(.94);
          opacity: 0;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-rise {
          animation: cardRise 3s cubic-bezier(.16,1,.3,1) forwards;
        }

        @keyframes cardRise {
          to {
            transform: translateY(-26%) scale(1);
            opacity: 1;
          }
        }

        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 4px;

          background:
            radial-gradient(
              circle at 50% 8%,
              rgba(255,255,255,0.75),
              transparent 55%
            );
        }

        .card::after {
          content: "";
          position: absolute;
          inset: 14px;
          border-radius: 2px;
          border: 1px solid rgba(212,175,80,0.3);
          pointer-events: none;
        }

        .card-inner {
          position: relative;
          z-index: 3;
          text-align: center;
          color: #4b0c17;

          height: 100%;
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          transform: translateY(8px);
        }

        .eyebrow {
          font-size: 8px;
          letter-spacing: .55em;
          opacity: .5;
          text-transform: uppercase;
          margin-bottom: 14px;
          font-family: Georgia, serif;
        }

        .mono {
          font-size: 38px;
          letter-spacing: .32em;
          margin-bottom: 12px;
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
          color: #3a0810;
        }

        .date {
          font-size: 8px;
          letter-spacing: .5em;
          opacity: .4;
          font-family: Georgia, serif;
        }
      `,
        }}
      />

      <div className="scene">
        <div className="ambient" />

        <div className="wrap" ref={wrapRef}>
          <div className="shadow" />

          <div className="envelope">
            <div className="fold left-fold" />
            <div className="fold right-fold" />
            <div className="fold bottom-fold" />

            <div className="card" ref={cardRef}>
              <div className="card-inner">
                <div className="eyebrow">Wedding Invitation</div>

                <div className="mono">K & N</div>

                <div className="date">21 · 08 · 2026</div>
              </div>
            </div>

            <div className="flap" ref={flapRef}>
              <div className="flap-front" />
              <div className="flap-back" />
            </div>

            <div className="seal-container" ref={sealRef}>
              <div className="seal">
                <span>K N</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}