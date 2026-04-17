"use client";

import React, { useMemo } from "react";

/**
 * Laboratuvar atmosferi: koyu degrade arka plan, yüzen kabarcıklar,
 * köşelerde dekoratif beher/erlen siluetleri, yumuşak ışık halkaları.
 * Tamamen pointer-events-none — oyunun üstünde çalışmaz.
 */
export function LabBackground() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 18,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* gradient + grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(91,141,239,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(132,94,194,0.18) 0%, transparent 55%), linear-gradient(180deg, #eaf4ff 0%, #f4faf9 60%, #ffffff 100%)",
        }}
      />
      {/* hafif ızgara — laboratuvar tezgâhı */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#042940 1px, transparent 1px), linear-gradient(90deg, #042940 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* sol alt: beher */}
      <svg
        className="absolute left-4 bottom-4 opacity-30"
        width="120"
        height="140"
        viewBox="0 0 120 140"
        fill="none"
      >
        <path
          d="M30 20 L30 80 Q30 125 60 125 Q90 125 90 80 L90 20"
          stroke="#005C53"
          strokeWidth="3"
          fill="rgba(91,141,239,0.18)"
        />
        <line x1="25" y1="20" x2="95" y2="20" stroke="#005C53" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="40" x2="45" y2="40" stroke="#005C53" strokeWidth="2" />
        <line x1="35" y1="55" x2="50" y2="55" stroke="#005C53" strokeWidth="2" />
        <line x1="35" y1="70" x2="45" y2="70" stroke="#005C53" strokeWidth="2" />
        <ellipse cx="60" cy="95" rx="28" ry="6" fill="rgba(91,141,239,0.4)" />
      </svg>

      {/* sağ alt: erlen */}
      <svg
        className="absolute right-4 bottom-4 opacity-30"
        width="120"
        height="150"
        viewBox="0 0 120 150"
        fill="none"
      >
        <path
          d="M45 15 L45 55 L20 125 Q20 135 30 135 L90 135 Q100 135 100 125 L75 55 L75 15 Z"
          stroke="#845EC2"
          strokeWidth="3"
          fill="rgba(132,94,194,0.18)"
        />
        <line x1="40" y1="15" x2="80" y2="15" stroke="#845EC2" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="60" cy="110" rx="34" ry="5" fill="rgba(132,94,194,0.35)" />
      </svg>

      {/* sağ üst: deney tüpü */}
      <svg
        className="absolute right-12 top-6 opacity-25"
        width="60"
        height="160"
        viewBox="0 0 60 160"
        fill="none"
      >
        <path
          d="M18 10 L18 130 Q18 150 30 150 Q42 150 42 130 L42 10"
          stroke="#9FC131"
          strokeWidth="3"
          fill="rgba(159,193,49,0.2)"
        />
        <line x1="14" y1="10" x2="46" y2="10" stroke="#9FC131" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* yüzen kabarcıklar */}
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-[-30px] block rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(91,141,239,0.4) 60%, rgba(91,141,239,0.1))",
            opacity: b.opacity,
            animation: `lab-rise ${b.duration}s linear ${b.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes lab-rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--o, 0.4); }
          50% { transform: translateY(-50vh) translateX(20px); }
          100% { transform: translateY(-110vh) translateX(-15px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
