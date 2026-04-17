"use client";

import React, { useMemo } from "react";

const COLORS = ["#005C53", "#9FC131", "#DBF227", "#D6D58E", "#042940"];

export function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.6,
        rotate: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-[-20px] block"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.4}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // pass drift via CSS var
            ["--drift" as string]: `${p.drift}px`,
            ["--rot" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translate(0, -20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--drift), 110vh) rotate(var(--rot));
            opacity: 0;
          }
        }
        .confetti-piece {
          border-radius: 2px;
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(.2,.6,.4,1);
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
