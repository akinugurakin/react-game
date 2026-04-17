"use client";

import React, { useState, useCallback } from "react";
import { WorldMap, CONTINENT_STYLES, type MapLabel } from "./WorldMap";
import { OCEANS, DIRECTION_LABELS, type GeoLabel, type DirectionLabel } from "../data";
import { sfx } from "../lib/sfx";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Phase1Props {
  onComplete: (stats: { wrongAttempts: number }) => void;
  onWrong?: () => void;
  onCorrect?: () => void;
}

type Stage = "directions" | "continents" | "oceans";

export function Phase1Labels({ onComplete, onWrong, onCorrect }: Phase1Props) {
  const [stage, setStage] = useState<Stage>("directions");

  // ── Yönler ──
  const [dirQueue] = useState(() => shuffle(DIRECTION_LABELS));
  const [dirIndex, setDirIndex] = useState(0);
  const [answeredDirs, setAnsweredDirs] = useState<Set<string>>(new Set());

  // ── Kıtalar ──
  const [contQueue] = useState(() => shuffle(CONTINENT_STYLES.map((c) => c.id)));
  const [contIndex, setContIndex] = useState(0);
  const [placedConts, setPlacedConts] = useState<Set<string>>(new Set());

  // ── Okyanuslar ──
  const [oceanQueue] = useState(() => shuffle(OCEANS));
  const [oceanIndex, setOceanIndex] = useState(0);
  const [placedOceans, setPlacedOceans] = useState<GeoLabel[]>([]);

  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);

  const totalQ = 4 + contQueue.length + oceanQueue.length;
  const currentStep =
    stage === "directions" ? dirIndex + 1 :
    stage === "continents" ? 4 + contIndex + 1 :
    4 + contQueue.length + oceanIndex + 1;

  // ── Yön handler ──
  const handleDirClick = useCallback(
    (dir: DirectionLabel) => {
      const current = dirQueue[dirIndex];
      if (!current) return;
      if (dir.id === current.id) {
        sfx.correct();
        onCorrect?.();
        setAnsweredDirs((s) => { const n = new Set(s); n.add(dir.id); return n; });
        setFlash("correct");
        setTimeout(() => {
          setFlash(null);
          if (dirIndex + 1 >= dirQueue.length) setStage("continents");
          else setDirIndex((i) => i + 1);
        }, 350);
      } else {
        sfx.wrong();
        onWrong?.();
        setWrongAttempts((w) => w + 1);
        setFlash("wrong");
        setTimeout(() => setFlash(null), 300);
      }
    },
    [dirQueue, dirIndex, onCorrect, onWrong]
  );

  // ── Kıta handler ──
  const handleRegionClick = useCallback(
    (regionId: string) => {
      const expected = contQueue[contIndex];
      if (regionId === expected) {
        sfx.correct();
        onCorrect?.();
        setPlacedConts((s) => { const n = new Set(s); n.add(regionId); return n; });
        setFlash("correct");
        setTimeout(() => {
          setFlash(null);
          if (contIndex + 1 >= contQueue.length) setStage("oceans");
          else setContIndex((i) => i + 1);
        }, 400);
      } else {
        sfx.wrong();
        onWrong?.();
        setWrongAttempts((w) => w + 1);
        setFlash("wrong");
        setTimeout(() => setFlash(null), 300);
      }
    },
    [contQueue, contIndex, onCorrect, onWrong]
  );

  // ── Okyanus handler ──
  const handleOceanClick = useCallback(
    (lat: number, lng: number) => {
      const current = oceanQueue[oceanIndex];
      if (!current) return;
      const dist = Math.sqrt((lat - current.lat) ** 2 + (lng - current.lng) ** 2);
      if (dist <= 35) {
        sfx.correct();
        onCorrect?.();
        setPlacedOceans((p) => [...p, current]);
        setFlash("correct");
        setTimeout(() => {
          setFlash(null);
          const next = oceanIndex + 1;
          setOceanIndex(next);
          if (next >= oceanQueue.length) {
            sfx.phaseComplete();
            onComplete({ wrongAttempts });
          }
        }, 400);
      } else {
        sfx.wrong();
        onWrong?.();
        setWrongAttempts((w) => w + 1);
        setFlash("wrong");
        setTimeout(() => setFlash(null), 300);
      }
    },
    [oceanQueue, oceanIndex, wrongAttempts, onComplete, onCorrect, onWrong]
  );

  // Map labels from placed oceans
  const oceanLabels: MapLabel[] = placedOceans.map((o) => ({
    lat: o.lat, lng: o.lng, text: o.name, color: o.color,
  }));

  const currentContName = stage === "continents"
    ? CONTINENT_STYLES.find((c) => c.id === contQueue[contIndex])?.name
    : null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-l-4 border-[#005C53] bg-[#e6f5f3] px-4 py-3 text-sm text-[#042940]">
        <strong>Haritayı Onar:</strong>{" "}
        {stage === "directions" && "Yönleri bul."}
        {stage === "continents" && "Kıtaları haritada bul."}
        {stage === "oceans" && "Okyanusları haritada bul."}
        <span className="ml-2 rounded-md bg-[#005C53]/10 px-2 py-0.5 font-bold">{currentStep}/{totalQ}</span>
      </div>

      {/* ── Yönler — harita üzerindeki oklar ── */}
      {stage === "directions" && (
        <div className="space-y-3">
          <QuestionBubble
            text={`${dirQueue[dirIndex]?.name} yönünü haritada bul!`}
            flash={flash}
          />
          <WorldMap
            showDirectionArrows
            onDirectionClick={(dir) => {
              const dirLabel = DIRECTION_LABELS.find((d) => d.id === dir);
              if (dirLabel) handleDirClick(dirLabel);
            }}
            completedDirections={answeredDirs}
          />
        </div>
      )}

      {/* ── Kıtalar ── */}
      {stage === "continents" && (
        <div className="space-y-3">
          <QuestionBubble
            text={`${currentContName} kıtasını bul!`}
            flash={flash}
            color={CONTINENT_STYLES.find((c) => c.id === contQueue[contIndex])?.fill}
          />
          <WorldMap
            highlightRegions
            onRegionClick={handleRegionClick}
            highlightedRegions={placedConts}
            labels={oceanLabels}
          />
        </div>
      )}

      {/* ── Okyanuslar ── */}
      {stage === "oceans" && (
        <div className="space-y-3">
          <QuestionBubble
            text={`${oceanQueue[oceanIndex]?.name}'nu haritada bul!`}
            flash={flash}
            color="#005C53"
          />
          <WorldMap
            onClick={handleOceanClick}
            labels={oceanLabels}
          />
        </div>
      )}
    </div>
  );
}

function QuestionBubble({ text, flash, color }: { text: string; flash: "correct" | "wrong" | null; color?: string }) {
  return (
    <div className="flex justify-center">
      <div
        className={[
          "rounded-xl px-6 py-3 text-center text-lg font-extrabold text-white shadow-lg transition-all",
          flash === "correct" ? "scale-105 ring-4 ring-[#9FC131]" : "",
          flash === "wrong" ? "hk-shake ring-4 ring-red-500" : "",
        ].join(" ")}
        style={{ backgroundColor: color ?? "#042940" }}
      >
        {text}
      </div>
      <style>{`
        @keyframes hk-shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .hk-shake { animation: hk-shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}

