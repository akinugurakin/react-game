"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { LandmarkRound } from "./LandmarkRound";
import { SentenceRound } from "./SentenceRound";
import { QuizRound } from "./QuizRound";
import { ROUND_ORDER, ROUND_META } from "../types";
import type { RoundResult, GameResult, RoundId } from "../types";

interface GameBoardProps {
  onComplete: (result: GameResult) => void;
}

type Phase = "playing" | "transition" | "done";

export function GameBoard({ onComplete }: GameBoardProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [phase, setPhase] = useState<Phase>("playing");
  const [bestStreak, setBestStreak] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const startRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Global elapsed timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleRoundComplete = useCallback(
    (result: RoundResult, streak: number) => {
      const newResults = [...roundResults, result];
      setRoundResults(newResults);
      const newBest = Math.max(bestStreak, streak);
      setBestStreak(newBest);

      const nextIdx = roundIndex + 1;

      if (nextIdx >= ROUND_ORDER.length) {
        // ------- Game over -------
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase("done");

        const totalCorrect = newResults.reduce((s, r) => s + r.correct, 0);
        const totalItems = newResults.reduce((s, r) => s + r.total, 0);
        const timeBonusPoints = newResults.filter((r) => r.timeBonus).length * 5;
        const baseScore =
          totalItems > 0 ? Math.round((totalCorrect / totalItems) * 100) : 0;
        const finalScore = Math.min(100, baseScore + timeBonusPoints);

        setTimeout(() => {
          onComplete({
            score: finalScore,
            totalAttempts: totalItems,
            correctAnswers: totalCorrect,
            bestStreak: newBest,
            rounds: newResults,
            elapsedSeconds,
          });
        }, 400);
      } else {
        // ------- Transition to next round -------
        setPhase("transition");
        setTimeout(() => {
          setRoundIndex(nextIdx);
          setPhase("playing");
        }, 2000);
      }
    },
    [roundIndex, roundResults, bestStreak, elapsedSeconds, onComplete]
  );

  const currentRound = ROUND_ORDER[roundIndex];
  const currentMeta = ROUND_META[currentRound];
  const completedCount = roundResults.length;

  // ---------- Transition screen ----------
  if (phase === "transition") {
    const nextRound = ROUND_ORDER[roundIndex + 1];
    const nextMeta = nextRound ? ROUND_META[nextRound] : null;
    const justCompleted = roundResults[roundResults.length - 1];

    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 px-4 max-w-md mx-auto text-center">
        {/* Completed badge */}
        <div
          className="w-20 h-20 rounded-full bg-accent/15 border-[3px] border-accent flex items-center justify-center text-3xl shadow-lg"
          style={{ animation: "feedbackPop 0.4s ease-out" }}
        >
          ✓
        </div>

        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-widest">
            Round {roundIndex + 1} Complete
          </p>
          <p className="text-lg font-extrabold text-foreground mt-1">
            {currentMeta.label}
          </p>
          {justCompleted && (
            <p className="text-sm text-muted-foreground mt-1">
              {justCompleted.correct}/{justCompleted.total} correct
              {justCompleted.timeBonus && " · +5 time bonus!"}
            </p>
          )}
        </div>

        {/* Passport progress */}
        <div className="flex gap-4">
          {ROUND_ORDER.map((rid, i) => {
            const meta = ROUND_META[rid];
            const done = i < completedCount;
            const isNext = i === completedCount;
            return (
              <div
                key={rid}
                className={`flex flex-col items-center gap-1 transition-all duration-500 ${
                  done ? "opacity-100" : isNext ? "opacity-80" : "opacity-30"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg ${
                    done
                      ? "border-primary bg-primary/10"
                      : isNext
                        ? "border-primary/50 bg-primary/5 animate-pulse"
                        : "border-muted bg-muted/20"
                  }`}
                >
                  {done ? "✓" : meta.icon}
                </div>
                <span className="text-[8px] font-bold text-muted-foreground">
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>

        {nextMeta && (
          <p className="text-sm text-muted-foreground">
            Next up:{" "}
            <span className="font-bold text-foreground">{nextMeta.label}</span>
          </p>
        )}
      </div>
    );
  }

  // ---------- Playing ----------
  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto px-4 py-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentMeta.icon}</span>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Round {roundIndex + 1}/{ROUND_ORDER.length}
            </p>
            <h3 className="text-base font-extrabold text-foreground leading-tight">
              {currentMeta.label}
            </h3>
          </div>
        </div>

        {/* Passport mini stamps */}
        <div className="flex gap-1">
          {ROUND_ORDER.map((rid, i) => (
            <div
              key={rid}
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-extrabold transition-all duration-300 ${
                i < completedCount
                  ? "border-primary bg-primary text-primary-foreground"
                  : i === roundIndex
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted text-muted-foreground"
              }`}
            >
              {i < completedCount ? "✓" : i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Global progress */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${(completedCount / ROUND_ORDER.length) * 100}%`,
          }}
        />
      </div>

      {/* Round component */}
      {currentRound === "landmark-match" && (
        <LandmarkRound onComplete={handleRoundComplete} />
      )}
      {currentRound === "sentence-builder" && (
        <SentenceRound onComplete={handleRoundComplete} />
      )}
      {currentRound === "sports-quiz" && (
        <QuizRound onComplete={handleRoundComplete} />
      )}
    </div>
  );
}
