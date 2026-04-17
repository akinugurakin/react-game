"use client";

import { useState, useCallback, useRef } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { useStreak } from "../hooks/useStreak";
import { shuffle } from "../lib/shuffle";
import { LANDMARKS } from "../lib/data";
import { TimerBar } from "./TimerBar";
import { StreakIndicator } from "./StreakIndicator";
import type { RoundResult } from "../types";

type MatchState = "idle" | "selected" | "correct" | "wrong";

interface Props {
  onComplete: (result: RoundResult, streak: number) => void;
}

export function LandmarkRound({ onComplete }: Props) {
  // Shuffle once on mount
  const [landmarks] = useState(() => shuffle(LANDMARKS));
  const [cities] = useState(() => shuffle(LANDMARKS));

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [landmarkStates, setLandmarkStates] = useState<MatchState[]>(
    () => new Array(LANDMARKS.length).fill("idle")
  );
  const [matchedCities, setMatchedCities] = useState<Set<number>>(new Set());
  const [matchCount, setMatchCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const streak = useStreak();
  const doneRef = useRef(false);

  const finish = useCallback(
    (correct: number, mistakeCount: number, timeLeft: number) => {
      if (doneRef.current) return;
      doneRef.current = true;
      timer.stop();
      onComplete(
        {
          key: "landmark-match",
          correct,
          total: LANDMARKS.length,
          timeBonus: timeLeft > 30,
          mistakes: mistakeCount,
        },
        streak.best
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onComplete]
  );

  const timer = useCountdown({
    initialSeconds: 90,
    onTimeUp: () => finish(matchCount, mistakes, 0),
  });

  // Select a landmark
  const handleLandmarkClick = (idx: number) => {
    if (landmarkStates[idx] === "correct") return;
    setSelectedIdx(idx);
    setLandmarkStates((prev) => {
      const next = [...prev];
      // Reset all non-correct to idle, then select this one
      for (let i = 0; i < next.length; i++) {
        if (next[i] !== "correct") next[i] = "idle";
      }
      next[idx] = "selected";
      return next;
    });
  };

  // Select a city
  const handleCityClick = (cityIdx: number) => {
    if (selectedIdx === null || matchedCities.has(cityIdx)) return;

    const landmarkItem = landmarks[selectedIdx];
    const cityItem = cities[cityIdx];
    const isCorrect = landmarkItem.city === cityItem.city;

    if (isCorrect) {
      // --- Correct ---
      streak.hit();
      const newMatchCount = matchCount + 1;
      setMatchCount(newMatchCount);
      setMatchedCities((prev) => new Set(prev).add(cityIdx));
      setLandmarkStates((prev) => {
        const next = [...prev];
        next[selectedIdx!] = "correct";
        return next;
      });
      setSelectedIdx(null);

      // All matched?
      if (newMatchCount === LANDMARKS.length) {
        setTimeout(() => finish(newMatchCount, mistakes, timer.timeLeft), 400);
      }
    } else {
      // --- Wrong ---
      streak.miss();
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setLandmarkStates((prev) => {
        const next = [...prev];
        next[selectedIdx!] = "wrong";
        return next;
      });
      setTimeout(() => {
        setLandmarkStates((prev) => {
          const next = [...prev];
          if (next[selectedIdx!] === "wrong") next[selectedIdx!] = "idle";
          return next;
        });
        setSelectedIdx(null);
      }, 650);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Status row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-muted-foreground tabular-nums">
          {matchCount}/{LANDMARKS.length} matched
        </span>
        <TimerBar
          formatted={timer.formatted}
          progress={timer.progress}
          isUrgent={timer.isUrgent}
        />
      </div>

      {/* Instruction */}
      <p className="text-xs text-muted-foreground text-center">
        {selectedIdx !== null
          ? "Now tap the matching city →"
          : "Tap a landmark to start"}
      </p>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Landmarks */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[9px] uppercase tracking-[0.15em] font-extrabold text-muted-foreground text-center pb-1">
            Landmarks
          </p>
          {landmarks.map((item, i) => {
            const state = landmarkStates[i];
            return (
              <button
                key={`l-${i}`}
                type="button"
                onClick={() => handleLandmarkClick(i)}
                disabled={state === "correct"}
                className={`flex items-center gap-2 px-2.5 py-2.5 rounded-xl border-2 text-[13px] font-bold transition-all duration-200 text-left leading-tight ${
                  state === "correct"
                    ? "border-accent bg-accent/10 text-accent-foreground opacity-60 cursor-default"
                    : state === "wrong"
                      ? "border-destructive bg-destructive/10 text-destructive animate-shake"
                      : state === "selected"
                        ? "border-primary bg-primary/10 text-primary shadow-lg scale-[1.02]"
                        : "border-border bg-card text-card-foreground shadow-sm hover:border-primary/40 hover:shadow-md active:scale-[0.97]"
                }`}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                <span>{item.landmark}</span>
                {state === "correct" && (
                  <span className="ml-auto text-accent text-xs shrink-0">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Cities */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[9px] uppercase tracking-[0.15em] font-extrabold text-muted-foreground text-center pb-1">
            Cities
          </p>
          {cities.map((item, i) => {
            const isMatched = matchedCities.has(i);
            const canClick = selectedIdx !== null && !isMatched;

            return (
              <button
                key={`c-${i}`}
                type="button"
                onClick={() => handleCityClick(i)}
                disabled={!canClick}
                className={`flex items-center gap-2 px-2.5 py-2.5 rounded-xl border-2 text-[13px] font-bold transition-all duration-200 text-left leading-tight ${
                  isMatched
                    ? "border-accent bg-accent/10 text-accent-foreground opacity-60 cursor-default"
                    : canClick
                      ? "border-border bg-card text-card-foreground shadow-sm hover:border-primary/40 hover:shadow-md cursor-pointer active:scale-[0.97]"
                      : "border-border bg-card text-card-foreground opacity-40 cursor-default"
                }`}
              >
                <span className="leading-tight">
                  {item.city}, {item.country}
                </span>
                {isMatched && (
                  <span className="ml-auto text-accent text-xs shrink-0">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <StreakIndicator count={streak.current} visible={streak.isHot} />
    </div>
  );
}
