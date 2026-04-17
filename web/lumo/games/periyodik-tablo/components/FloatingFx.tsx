"use client";

import React, { useEffect, useState } from "react";

export interface FloatingItem {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

interface FloatingFxProps {
  items: FloatingItem[];
  onDone?: (id: number) => void;
}

/** Ekran üzerinde "+50!" gibi metinleri yukarı kaydırarak gösterir. */
export function FloatingFx({ items, onDone }: FloatingFxProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {items.map((it) => (
        <FloatingOne key={it.id} item={it} onDone={onDone} />
      ))}
    </div>
  );
}

function FloatingOne({ item, onDone }: { item: FloatingItem; onDone?: (id: number) => void }) {
  useEffect(() => {
    const t = window.setTimeout(() => onDone?.(item.id), 900);
    return () => window.clearTimeout(t);
  }, [item.id, onDone]);

  return (
    <span
      className="float-fx absolute text-2xl font-extrabold drop-shadow-md"
      style={{ left: item.x, top: item.y, color: item.color }}
    >
      {item.text}
      <style>{`
        @keyframes float-up {
          0% { transform: translate(-50%, 0) scale(0.8); opacity: 0; }
          15% { transform: translate(-50%, -10px) scale(1.15); opacity: 1; }
          100% { transform: translate(-50%, -70px) scale(1); opacity: 0; }
        }
        .float-fx {
          animation: float-up 0.9s ease-out forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </span>
  );
}

/** Patlayan parçacık efekti — küçük renkli noktalar bir noktadan dışarı uçar. */
export function ParticleBurst({
  x,
  y,
  color,
  onDone,
}: {
  x: number;
  y: number;
  color: string;
  onDone?: () => void;
}) {
  const [pieces] = useState(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / 12 + Math.random() * 0.4,
      dist: 28 + Math.random() * 22,
    }))
  );

  useEffect(() => {
    const t = window.setTimeout(() => onDone?.(), 600);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed z-40" style={{ left: x, top: y }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute block h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: color,
            ["--tx" as string]: `${Math.cos(p.angle) * p.dist}px`,
            ["--ty" as string]: `${Math.sin(p.angle) * p.dist}px`,
            animation: "burst 0.6s ease-out forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes burst {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
