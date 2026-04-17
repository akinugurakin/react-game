"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CELLS, PHASE2_SYMBOLS, CATEGORY_COLORS, type Cell } from "../data";

const phase2Set = new Set(PHASE2_SYMBOLS);
import { PeriodicGrid, type GridCellState } from "./PeriodicGrid";
import { sfx } from "../lib/sfx";

interface Phase2Props {
  onComplete: (stats: { wrongAttempts: number }) => void;
  onWrongAttempt?: (x: number, y: number) => void;
  onCorrect?: (x: number, y: number) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Aşama 2 — Tablo blok renkleriyle dolu. İlk 20 element + 6 soy gaz tek tek
 * rastgele beliriyor, doğru hücreye sürükle-bırak.
 */
export function Phase2Elements({ onComplete, onWrongAttempt, onCorrect }: Phase2Props) {
  const [queue] = useState<string[]>(() => shuffle(PHASE2_SYMBOLS));
  const [index, setIndex] = useState(0);
  const [placedSymbols, setPlacedSymbols] = useState<Set<string>>(new Set());
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [flashWrongKey, setFlashWrongKey] = useState<string | null>(null);
  const [flashCorrectKey, setFlashCorrectKey] = useState<string | null>(null);
  const [bounce, setBounce] = useState(0); // increment to retrigger card bounce-back

  const symbolToCell = useMemo(() => {
    const m = new Map<string, Cell>();
    CELLS.forEach((c) => m.set(c.symbol, c));
    return m;
  }, []);

  const current = queue[index];

  const cellStates = useMemo(() => {
    const states: Record<string, GridCellState> = {};
    CELLS.forEach((c) => {
      const k = `${c.period}-${c.group}`;
      const isTarget = phase2Set.has(c.symbol);
      const isPlaced = placedSymbols.has(c.symbol);
      const colored = isPlaced;
      states[k] = {
        bgColor: colored
          ? CATEGORY_COLORS[c.category]
          : isTarget
            ? "#e5e7eb"
            : undefined,
        textColor: colored
          ? (c.category === "yarimetal" ? "#042940" : "#ffffff")
          : "#9ca3af",
        filled: isPlaced ? c.symbol : undefined,
        filledNumber: isPlaced ? c.number : undefined,
        showQuestion: isTarget && !isPlaced,
        flashWrong: flashWrongKey === k,
        flashCorrect: flashCorrectKey === k,
      };
    });
    return states;
  }, [placedSymbols, flashWrongKey, flashCorrectKey]);

  useEffect(() => {
    if (index >= queue.length) {
      sfx.phaseComplete();
      onComplete({ wrongAttempts });
    }
  }, [index, queue.length, onComplete, wrongAttempts]);

  if (!current) return null;

  const handleDrop = (cell: Cell, ev: { clientX: number; clientY: number }) => {
    const k = `${cell.period}-${cell.group}`;
    if (cell.symbol === current) {
      sfx.correct();
      onCorrect?.(ev.clientX, ev.clientY);
      setPlacedSymbols((prev) => {
        const next = new Set(prev);
        next.add(current);
        return next;
      });
      setFlashCorrectKey(k);
      window.setTimeout(() => {
        setFlashCorrectKey(null);
        setIndex((i) => i + 1);
      }, 380);
    } else {
      sfx.wrong();
      setWrongAttempts((w) => w + 1);
      onWrongAttempt?.(ev.clientX, ev.clientY);
      setFlashWrongKey(k);
      setBounce((b) => b + 1);
      window.setTimeout(() => setFlashWrongKey(null), 350);
    }
  };

  const currentCell = symbolToCell.get(current);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-l-4 border-[#005C53] bg-[#e6f5f3] px-4 py-3 text-sm text-[#042940]">
        <strong>Aşama 2:</strong> Beliren elementi doğru hücreye sürükle.{" "}
        <span className="ml-2 opacity-70">
          {index + 1} / {queue.length}
        </span>
      </div>

      <PeriodicGrid
        states={cellStates}
        onDrop={(cell, _payload, ev) => handleDrop(cell, ev)}
      />

      <div className="flex items-center justify-center">
        <div className="relative">
          {bounce > 0 && (
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-bold text-red-500 shadow-md pt-bubble">
              Buralı değilim!
            </div>
          )}
          <div
            key={`${current}-${bounce}`}
            draggable
            onDragStart={(e) => {
              sfx.pick();
              e.dataTransfer.setData("text/plain", current);
              e.dataTransfer.effectAllowed = "move";
            }}
            className={[
              "pt-card-glow group relative flex h-28 w-28 cursor-grab flex-col items-center justify-center rounded-2xl border-4 border-[#5B8DEF] bg-white text-[#042940] shadow-[0_0_24px_rgba(91,141,239,0.45)] active:cursor-grabbing hover:scale-105 transition-transform",
              bounce > 0 ? "pt-bounce-back" : "pt-card-in",
            ].join(" ")}
            title={currentCell?.name}
          >
            <span className="pointer-events-none absolute inset-1 rounded-xl bg-gradient-to-b from-[#5B8DEF]/10 to-transparent" />
            <span className="text-4xl font-extrabold drop-shadow-sm">{current}</span>
            <span className="mt-1 text-[10px] opacity-70">{currentCell?.name}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pt-card-in {
          0% { transform: scale(0.5) rotate(-12deg); opacity: 0; }
          60% { transform: scale(1.12) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .pt-card-in { animation: pt-card-in 0.4s cubic-bezier(.2,.8,.3,1.2); }
        @keyframes pt-bounce-back {
          0%   { transform: scale(0.7) translateY(-30px) rotate(-15deg); opacity: 0; }
          30%  { transform: scale(1.15) translateY(8px) rotate(8deg); opacity: 1; }
          55%  { transform: scale(0.95) translateY(-4px) rotate(-3deg); }
          100% { transform: scale(1) translateY(0) rotate(0); }
        }
        .pt-bounce-back { animation: pt-bounce-back 0.55s cubic-bezier(.2,.8,.3,1.2); }
        @keyframes pt-bubble {
          0% { opacity: 0; transform: translate(-50%, 4px); }
          20% { opacity: 1; transform: translate(-50%, 0); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -6px); }
        }
        .pt-bubble { animation: pt-bubble 0.9s ease-out forwards; }
        @keyframes pt-card-glow {
          0%,100% { box-shadow: 0 0 18px rgba(91,141,239,0.35), 0 0 0 rgba(91,141,239,0); }
          50%     { box-shadow: 0 0 32px rgba(91,141,239,0.6), 0 0 4px rgba(91,141,239,0.4); }
        }
        .pt-card-glow { animation: pt-card-glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
