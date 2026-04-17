"use client";

import React from "react";
import { CELLS, STANDARD_LAYOUT, type Cell } from "../data";

const ROWS = 7;
const COLS = 18;

export interface GridCellState {
  /** Hücrede yerleşik element sembolü */
  filled?: string;
  /** Yerleşik elementin atom numarası */
  filledNumber?: number;
  /** Arka plan rengi */
  bgColor?: string;
  /** Yazı rengi */
  textColor?: string;
  /** Hover/drop hedefi vurgusu */
  highlight?: boolean;
  flashCorrect?: boolean;
  flashWrong?: boolean;
  /** "?" göster (Phase 2 boş hedefler) */
  showQuestion?: boolean;
}

interface PeriodicGridProps {
  states: Record<string, GridCellState>;
  onDrop?: (cell: Cell, payload: string, ev: { clientX: number; clientY: number }) => void;
  onDragOver?: (cell: Cell) => void;
  onDragLeave?: (cell: Cell) => void;
}

const cellMap = new Map<string, Cell>();
CELLS.forEach((c) => cellMap.set(`${c.period}-${c.group}`, c));

const standardSet = new Set(STANDARD_LAYOUT.map((c) => `${c.period}-${c.group}`));

export function PeriodicGrid({
  states,
  onDrop,
  onDragOver,
  onDragLeave,
}: PeriodicGridProps) {
  const rows = [];
  for (let p = 1; p <= ROWS; p++) {
    const cols = [];
    for (let g = 1; g <= COLS; g++) {
      const key = `${p}-${g}`;
      const isStandard = standardSet.has(key);
      const realCell = cellMap.get(key);
      // Tablo standartında olduğu hâlde CELLS listesinde olmayan hücreler için
      // drop hedefi olabilmesi adına sentetik cell üret.
      const cell: Cell = realCell ?? {
        period: p,
        group: g,
        symbol: "",
        number: 0,
        name: "",
        category: "gecis-metal",
      };
      const state = states[key];

      if (!isStandard) {
        cols.push(<div key={key} className="aspect-square" />);
        continue;
      }

      // Standart hücre — boş ya da dolu
      const bg = state?.bgColor ?? "#f3f4f6";
      const text = state?.textColor ?? "#9ca3af";
      const filled = state?.filled;
      const number = state?.filledNumber;

      cols.push(
        <div
          key={key}
          onDragOver={(e) => {
            e.preventDefault();
            onDragOver?.(cell);
          }}
          onDragLeave={() => onDragLeave?.(cell)}
          onDrop={(e) => {
            e.preventDefault();
            const payload = e.dataTransfer.getData("text/plain");
            if (payload) onDrop?.(cell, payload, { clientX: e.clientX, clientY: e.clientY });
          }}
          className={[
            "relative aspect-square select-none rounded-[3px]",
            "flex items-center justify-center",
            "border border-[#042940]/10",
            "transition-[background-color,color,box-shadow] duration-200",
            state?.highlight ? "ring-2 ring-[#005C53] ring-offset-1" : "",
            state?.flashCorrect ? "pt-pop ring-2 ring-[#9FC131]" : "",
            state?.flashWrong ? "pt-shake-cell ring-2 ring-red-500" : "",
          ].join(" ")}
          style={{
            backgroundColor: bg,
            color: text,
            boxShadow: state?.bgColor
              ? `inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.18), 0 0 6px ${state.bgColor}66`
              : undefined,
          }}
          title={realCell ? `${realCell.name} (${realCell.symbol}) — ${realCell.number}` : undefined}
        >
          {filled ? (
            <div className="flex flex-col items-center leading-none">
              <span className="text-[7px] opacity-75">{number}</span>
              <span className="text-[10px] sm:text-[12px] font-bold">{filled}</span>
            </div>
          ) : state?.showQuestion ? (
            <span className="text-[14px] sm:text-[16px] font-extrabold opacity-80">?</span>
          ) : null}
        </div>
      );
    }
    rows.push(
      <div
        key={p}
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {cols}
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border-2 border-[#5B8DEF]/30 bg-white/95 p-3 shadow-[0_0_30px_rgba(91,141,239,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur">
      {/* tarama çizgisi efekti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="pt-scanline absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#5B8DEF]/40 to-transparent" />
      </div>
      <div className="relative grid gap-[2px]">{rows}</div>
      <style>{`
        @keyframes pt-pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        .pt-pop { animation: pt-pop 0.36s ease-out; }
        @keyframes pt-shake-cell {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        .pt-shake-cell { animation: pt-shake-cell 0.32s ease-in-out; }
        @keyframes pt-scanline {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .pt-scanline { animation: pt-scanline 4s linear infinite; }
      `}</style>
    </div>
  );
}
