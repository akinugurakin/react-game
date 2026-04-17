"use client";

import React, { useState, useCallback } from "react";
import { WorldMap, type MapMarker } from "./WorldMap";
import { COORD_QUESTIONS, greatCircleDeg, type CoordQuestion } from "../data";
import { sfx } from "../lib/sfx";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Phase2Props {
  onComplete: (stats: { wrongAttempts: number; totalScore: number }) => void;
  onWrong?: () => void;
  onCorrect?: (points: number) => void;
}

export function Phase2Coords({ onComplete, onWrong, onCorrect }: Phase2Props) {
  const [queue] = useState(() => shuffle(COORD_QUESTIONS).slice(0, 5));
  const [index, setIndex] = useState(0);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);

  const current = queue[index] as CoordQuestion | undefined;

  const handleClick = useCallback(
    (lat: number, lng: number) => {
      if (!current) return;
      const dist = greatCircleDeg(lat, lng, current.lat, current.lng);

      if (dist <= current.toleranceDeg) {
        const points = Math.max(10, Math.round(100 * (1 - dist / current.toleranceDeg)));
        sfx.correct();
        onCorrect?.(points);
        setTotalScore((s) => s + points);
        setMarkers((m) => [...m,
          { lat: current.lat, lng: current.lng, color: "#9FC131", label: `+${points}`, pulse: true },
        ]);
        setFlash("correct");
        setTimeout(() => {
          setFlash(null);
          const next = index + 1;
          setIndex(next);
          if (next >= queue.length) {
            sfx.phaseComplete();
            onComplete({ wrongAttempts, totalScore: totalScore + points });
          }
        }, 500);
      } else {
        sfx.wrong();
        onWrong?.();
        setWrongAttempts((w) => w + 1);
        setMarkers((m) => [...m, { lat, lng, color: "#E63946" }]);
        setFlash("wrong");
        setTimeout(() => setFlash(null), 350);
      }
    },
    [current, index, queue.length, wrongAttempts, totalScore, onComplete, onWrong, onCorrect]
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-l-4 border-[#845EC2] bg-[#f3effb] px-4 py-3 text-sm text-[#042940]">
        <strong>Koordinat Radarı:</strong> Verilen konumu haritada bul.
        <span className="ml-2 rounded-md bg-[#845EC2]/10 px-2 py-0.5 font-bold">{index + 1}/{queue.length}</span>
      </div>

      {current && (
        <div className="flex justify-center">
          <div
            className={[
              "rounded-xl bg-[#042940] px-6 py-3 text-center font-bold text-white shadow-lg transition-all",
              flash === "correct" ? "scale-105 ring-4 ring-[#9FC131]" : "",
              flash === "wrong" ? "hk-shake ring-4 ring-red-500" : "",
            ].join(" ")}
          >
            <div className="text-lg">{current.question}</div>
          </div>
        </div>
      )}

      <WorldMap onClick={handleClick} markers={markers} />

      <style>{`
        @keyframes hk-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
        .hk-shake { animation: hk-shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}
