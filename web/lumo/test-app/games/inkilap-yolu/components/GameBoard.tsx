"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { KronolojiRound } from "./KronolojiRound";
import { KavramRound } from "./KavramRound";
import { BilgiRound } from "./BilgiRound";

// ---------- Types ----------

export interface RoundResult {
  key: string;
  correct: number;
  total: number;
  timeBonus: boolean;
  mistakes: number;
}

export interface GameResult {
  score: number;
  totalAttempts: number;
  correctAnswers: number;
  streak: number;
  rounds: RoundResult[];
  elapsedSeconds: number;
}

interface GameBoardProps {
  onComplete: (result: GameResult) => void;
}

type RoundId = "kronoloji" | "kavram-eslestirme" | "bilgi-yarismasi";

const ROUND_ORDER: RoundId[] = [
  "kronoloji",
  "kavram-eslestirme",
  "bilgi-yarismasi",
];

const ROUND_LABELS: Record<RoundId, string> = {
  kronoloji: "Kronoloji Yolu",
  "kavram-eslestirme": "Kavram Eşleştirme",
  "bilgi-yarismasi": "Kim-Ne-Nerede",
};

const ROUND_HINTS: Record<RoundId, string> = {
  kronoloji: "Olayları doğru kronolojik sıraya yerleştir",
  "kavram-eslestirme": "Kavramları doğru açıklamalarıyla eşleştir",
  "bilgi-yarismasi": "Doğru cevabı seç",
};

const ROUND_ICONS: Record<RoundId, string> = {
  kronoloji: "📜",
  "kavram-eslestirme": "🔗",
  "bilgi-yarismasi": "❓",
};

// ---------- Component ----------

export function GameBoard({ onComplete }: GameBoardProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Timer
  useEffect(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - startTimeRef.current) / 1000)
      );
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleRoundComplete = useCallback(
    (result: RoundResult, streak: number) => {
      const newResults = [...roundResults, result];
      setRoundResults(newResults);
      if (streak > bestStreak) setBestStreak(streak);

      const nextIdx = roundIndex + 1;

      if (nextIdx >= ROUND_ORDER.length) {
        // Oyun bitti
        if (timerRef.current) clearInterval(timerRef.current);
        const totalCorrect = newResults.reduce((s, r) => s + r.correct, 0);
        const totalItems = newResults.reduce((s, r) => s + r.total, 0);
        const timeBonusCount = newResults.filter((r) => r.timeBonus).length;

        const baseScore = Math.round((totalCorrect / totalItems) * 100);
        const bonusPoints = timeBonusCount * 5;
        const finalScore = Math.min(100, baseScore + bonusPoints);

        setTimeout(() => {
          onComplete({
            score: finalScore,
            totalAttempts: totalItems,
            correctAnswers: totalCorrect,
            streak: Math.max(bestStreak, streak),
            rounds: newResults,
            elapsedSeconds,
          });
        }, 600);
      } else {
        // Sonraki tura geçiş
        setTransitioning(true);
        setTimeout(() => {
          setRoundIndex(nextIdx);
          setTransitioning(false);
        }, 1500);
      }
    },
    [roundIndex, roundResults, bestStreak, elapsedSeconds, onComplete]
  );

  const currentRound = ROUND_ORDER[roundIndex];
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const completedRounds = roundResults.length;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Tur {roundIndex + 1} / {ROUND_ORDER.length}
          </p>
          <h3 className="text-lg font-bold text-foreground">
            {ROUND_LABELS[currentRound]}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {/* İlerleme göstergeleri */}
          <div className="flex gap-1">
            {ROUND_ORDER.map((id, i) => (
              <div
                key={id}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  i < completedRounds
                    ? "border-primary bg-primary text-primary-foreground"
                    : i === roundIndex
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-muted/30 text-muted-foreground"
                }`}
              >
                {i < completedRounds ? "✓" : ROUND_ICONS[ROUND_ORDER[i]]}
              </div>
            ))}
          </div>
          <span className="font-mono text-sm font-bold text-primary bg-muted px-2.5 py-1 rounded-full">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* İlerleme çubuğu */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${(completedRounds / ROUND_ORDER.length) * 100}%`,
          }}
        />
      </div>

      {/* Geçiş ekranı */}
      {transitioning ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
            ✓
          </div>
          <p className="text-lg font-bold text-foreground">Tur Tamamlandı!</p>
          <p className="text-sm text-muted-foreground">
            Sıradaki: {ROUND_LABELS[ROUND_ORDER[roundIndex + 1]]}
          </p>
        </div>
      ) : (
        <>
          {/* Tur içeriği */}
          {currentRound === "kronoloji" && (
            <KronolojiRound onComplete={handleRoundComplete} />
          )}
          {currentRound === "kavram-eslestirme" && (
            <KavramRound onComplete={handleRoundComplete} />
          )}
          {currentRound === "bilgi-yarismasi" && (
            <BilgiRound onComplete={handleRoundComplete} />
          )}

          {/* İpucu */}
          <p className="text-center text-xs text-muted-foreground">
            {ROUND_HINTS[currentRound]}
          </p>
        </>
      )}
    </div>
  );
}
