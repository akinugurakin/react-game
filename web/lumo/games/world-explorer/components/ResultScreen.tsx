"use client";

import { useEffect, useState } from "react";
import { ROUND_META } from "../types";
import type { GameResult } from "../types";

interface ResultScreenProps {
  result: GameResult;
  playerName?: string;
  submitting: boolean;
  onReplay: () => void;
}

const BADGE_TIERS = [
  { min: 90, label: "Gold Explorer", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { min: 70, label: "Silver Explorer", color: "text-gray-400", bg: "bg-gray-400/10" },
  { min: 0, label: "Bronze Explorer", color: "text-amber-600", bg: "bg-amber-600/10" },
] as const;

export function ResultScreen({
  result,
  playerName,
  submitting,
  onReplay,
}: ResultScreenProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Animate score counting up
  useEffect(() => {
    const target = result.score;
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setAnimatedScore(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    // Show details after score animation completes
    const detailTimer = setTimeout(() => setShowDetails(true), duration + 200);

    return () => {
      clearInterval(timer);
      clearTimeout(detailTimer);
    };
  }, [result.score]);

  const badge = BADGE_TIERS.find((b) => result.score >= b.min)!;
  const stamps = result.rounds.filter((r) => r.correct > 0).length;
  const minutes = Math.floor(result.elapsedSeconds / 60);
  const seconds = result.elapsedSeconds % 60;
  const accuracy =
    result.totalAttempts > 0
      ? Math.round((result.correctAnswers / result.totalAttempts) * 100)
      : 0;

  return (
    <div className="flex flex-col items-center gap-5 py-8 px-4 max-w-md mx-auto text-center">
      {/* Passport stamps row */}
      <div className="flex gap-3">
        {result.rounds.map((r, i) => {
          const meta = ROUND_META[r.key];
          const earned = r.correct > 0;
          return (
            <div
              key={r.key}
              className={`flex flex-col items-center gap-1 transition-all duration-700 ${
                earned ? "opacity-100 scale-100" : "opacity-30 scale-90"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-full border-[3px] flex items-center justify-center text-xl transition-all duration-500 ${
                  earned
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-muted bg-muted/20"
                }`}
              >
                {earned ? meta.icon : "·"}
              </div>
              <span className="text-[9px] font-semibold text-muted-foreground leading-tight">
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Score ring */}
      <div className="relative w-32 h-32">
        {/* SVG ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-primary"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - animatedScore / 100)}`}
            style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-primary tabular-nums">
            {animatedScore}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground -mt-0.5">
            / 100
          </span>
        </div>
      </div>

      {/* Badge */}
      <div>
        <h2 className="text-xl font-extrabold text-foreground">
          {result.score >= 70 ? "Great job" : "Good effort"}
          {playerName ? `, ${playerName}` : ""}!
        </h2>
        <div
          className={`inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-sm font-bold ${badge.color} ${badge.bg}`}
        >
          {badge.label}
        </div>
      </div>

      {/* Stats grid */}
      <div
        className={`grid grid-cols-4 gap-2 w-full transition-all duration-500 ${
          showDetails
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        {[
          { value: `${result.correctAnswers}/${result.totalAttempts}`, label: "Correct" },
          {
            value: `${minutes}:${seconds.toString().padStart(2, "0")}`,
            label: "Time",
          },
          { value: `%${accuracy}`, label: "Accuracy" },
          { value: String(result.bestStreak), label: "Streak" },
        ].map((stat) => (
          <div key={stat.label} className="bg-secondary rounded-xl p-2.5">
            <p className="font-mono text-base font-extrabold text-foreground leading-none">
              {stat.value}
            </p>
            <p className="text-[9px] text-muted-foreground mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Round breakdown */}
      <div
        className={`w-full bg-secondary rounded-xl p-4 text-left transition-all duration-500 delay-200 ${
          showDetails
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-3">
          Round Details
        </p>
        <div className="space-y-2.5">
          {result.rounds.map((r) => {
            const meta = ROUND_META[r.key];
            const pct =
              r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
            return (
              <div key={r.key}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="text-base">{meta.icon}</span>
                    {meta.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-foreground tabular-nums">
                      {r.correct}/{r.total}
                    </span>
                    {r.timeBonus && (
                      <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">
                        +5
                      </span>
                    )}
                  </div>
                </div>
                {/* Mini progress bar */}
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {submitting && (
        <p className="text-xs text-muted-foreground animate-pulse">
          Saving score...
        </p>
      )}

      {/* Actions */}
      <button
        type="button"
        onClick={onReplay}
        className="w-full py-3.5 px-6 bg-primary text-primary-foreground font-extrabold text-base rounded-xl shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-200 active:scale-[0.97]"
      >
        Play Again
      </button>
    </div>
  );
}
