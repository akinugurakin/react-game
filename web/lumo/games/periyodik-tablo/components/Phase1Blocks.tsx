"use client";

import React, { useMemo, useState } from "react";
import { BLOCKS, type BlockDef } from "../data";
import { PeriodicGrid, type GridCellState } from "./PeriodicGrid";
import { sfx } from "../lib/sfx";

interface Phase1Props {
  onComplete: (stats: { wrongAttempts: number }) => void;
  onWrongAttempt?: (x: number, y: number) => void;
  onCorrect?: (x: number, y: number, blockSize: number) => void;
}

/** Bir bloğun cell listesinden mini-grid çıkarır (lego şekli için). */
function blockShape(block: BlockDef) {
  const minP = Math.min(...block.cells.map((c) => c.period));
  const maxP = Math.max(...block.cells.map((c) => c.period));
  const minG = Math.min(...block.cells.map((c) => c.group));
  const maxG = Math.max(...block.cells.map((c) => c.group));
  const rows = maxP - minP + 1;
  const cols = maxG - minG + 1;
  const filled = new Set(block.cells.map((c) => `${c.period}-${c.group}`));
  return { minP, minG, rows, cols, filled };
}

/** Düz, blok şekilli sürüklenebilir parça (etiketsiz). */
function ShapeBlock({
  block,
  done,
  shaking,
  onDragStart,
}: {
  block: BlockDef;
  done: boolean;
  shaking: boolean;
  onDragStart: (e: React.DragEvent) => void;
}) {
  const shape = useMemo(() => blockShape(block), [block]);

  return (
    <div
      className={[
        "rounded-lg p-2 transition-all",
        done ? "opacity-25 pointer-events-none" : "cursor-grab active:cursor-grabbing hover:scale-[1.05]",
        shaking ? "animate-shake" : "",
      ].join(" ")}
      draggable={!done}
      onDragStart={onDragStart}
      title={block.label}
    >
      <div
        className="grid gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${shape.cols}, 22px)`,
          gridTemplateRows: `repeat(${shape.rows}, 22px)`,
        }}
      >
        {Array.from({ length: shape.rows * shape.cols }).map((_, idx) => {
          const r = Math.floor(idx / shape.cols);
          const c = idx % shape.cols;
          const p = shape.minP + r;
          const g = shape.minG + c;
          const present = shape.filled.has(`${p}-${g}`);
          if (!present) return <div key={idx} />;
          return (
            <div
              key={idx}
              className="rounded-[3px]"
              style={{ backgroundColor: block.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Phase1Blocks({ onComplete, onWrongAttempt, onCorrect }: Phase1Props) {
  const [placed, setPlaced] = useState<Set<string>>(new Set());
  const [shakeBlock, setShakeBlock] = useState<string | null>(null);
  const [snapBlock, setSnapBlock] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const blockMap = useMemo(() => {
    const m = new Map<string, BlockDef>();
    BLOCKS.forEach((b) => m.set(b.id, b));
    return m;
  }, []);

  const cellStates = useMemo(() => {
    const states: Record<string, GridCellState> = {};
    placed.forEach((blockId) => {
      const block = blockMap.get(blockId)!;
      block.cells.forEach((c) => {
        states[`${c.period}-${c.group}`] = {
          bgColor: block.hex,
          textColor: block.textColor,
          flashCorrect: snapBlock === blockId,
        };
      });
    });
    return states;
  }, [placed, blockMap, snapBlock]);

  const handleDrop = (
    cell: { period: number; group: number },
    payload: string,
    ev?: { clientX: number; clientY: number }
  ) => {
    const block = blockMap.get(payload);
    if (!block || placed.has(payload)) return;

    const ok = block.cells.some((c) => c.period === cell.period && c.group === cell.group);
    if (!ok) {
      sfx.wrong();
      setWrongAttempts((w) => w + 1);
      if (ev) onWrongAttempt?.(ev.clientX, ev.clientY);
      setShakeBlock(payload);
      window.setTimeout(() => setShakeBlock(null), 350);
      return;
    }

    sfx.snap();
    const next = new Set(placed);
    next.add(payload);
    setPlaced(next);
    setSnapBlock(payload);
    if (ev) onCorrect?.(ev.clientX, ev.clientY, block.cells.length);
    window.setTimeout(() => setSnapBlock(null), 380);
    if (next.size === BLOCKS.length) {
      window.setTimeout(() => {
        sfx.phaseComplete();
        onComplete({ wrongAttempts });
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-l-4 border-[#005C53] bg-[#e6f5f3] px-4 py-3 text-sm text-[#042940]">
        <strong>Aşama 1:</strong> Lego parçalarını sürükleyerek tablonun doğru bölgelerine yerleştir.
      </div>

      <PeriodicGrid
        states={cellStates}
        onDrop={(cell, payload, ev) => handleDrop(cell, payload, ev)}
      />

      {/* Renk açıklaması */}
      <div className="flex flex-wrap items-center justify-center gap-5 rounded-xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        {[
          { hex: "#005C53", label: "Metal" },
          { hex: "#DBF227", label: "Yarı Metal" },
          { hex: "#E63946", label: "Ametal" },
          { hex: "#845EC2", label: "Soy Gaz" },
        ].map((row) => (
          <div key={row.hex} className="flex items-center gap-2 text-xs font-bold text-[#042940]">
            <span
              className="inline-block h-4 w-4 rounded-[3px] shadow-[0_0_8px_rgba(0,0,0,0.15)]"
              style={{ backgroundColor: row.hex }}
            />
            {row.label}
          </div>
        ))}
      </div>

      {/* Sürüklenebilir bloklar */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-[#042940]">Yerleştirilecek Bloklar</h3>
        <div className="flex flex-wrap items-end justify-center gap-4 rounded-xl bg-[#f4faf9] p-4">
          {BLOCKS.map((block) => (
            <ShapeBlock
              key={block.id}
              block={block}
              done={placed.has(block.id)}
              shaking={shakeBlock === block.id}
              onDragStart={(e) => {
                sfx.pick();
                e.dataTransfer.setData("text/plain", block.id);
                e.dataTransfer.effectAllowed = "move";
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pt-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake { animation: pt-shake 0.35s ease-in-out; }
      `}</style>
    </div>
  );
}
