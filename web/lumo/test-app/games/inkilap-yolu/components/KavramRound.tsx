"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { RoundResult } from "./GameBoard";

interface KavramPair {
  id: string;
  term: string;
  definition: string;
}

const PAIRS: KavramPair[] = [
  {
    id: "p1",
    term: "Mîsâk-ı Millî",
    definition: "Millî sınırlar içinde tam bağımsızlık kararı",
  },
  {
    id: "p2",
    term: "Kuvâ-yı Milliye",
    definition: "Düzenli ordu kurulmadan önce halkın direniş güçleri",
  },
  {
    id: "p3",
    term: "Tekâlif-i Milliye",
    definition: "Ordunun ihtiyaçları için halktan toplanan yardımlar",
  },
  {
    id: "p4",
    term: "Mondros Mütarekesi",
    definition: "Osmanlı'nın I. Dünya Savaşı sonunda imzaladığı ateşkes",
  },
  {
    id: "p5",
    term: "TBMM",
    definition: "Ankara'da kurulan yeni millî meclis",
  },
  {
    id: "p6",
    term: "Mudanya Ateşkesi",
    definition: "Kurtuluş Savaşı'nı sona erdiren ateşkes antlaşması",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface KavramRoundProps {
  onComplete: (result: RoundResult, streak: number) => void;
}

export function KavramRound({ onComplete }: KavramRoundProps) {
  const [shuffledTerms] = useState(() => shuffle(PAIRS));
  const [shuffledDefs] = useState(() => shuffle(PAIRS));
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [matchStates, setMatchStates] = useState<
    Map<number, "correct" | "wrong">
  >(new Map());
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const finishRound = useCallback(
    (correctCount: number, mistakeCount: number, remainingTime: number) => {
      if (completedRef.current) return;
      completedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);

      onComplete(
        {
          key: "kavram-eslestirme",
          correct: correctCount,
          total: PAIRS.length,
          timeBonus: remainingTime > 30,
          mistakes: mistakeCount,
        },
        streak
      );
    },
    [onComplete, streak]
  );

  // Süre doldu
  useEffect(() => {
    if (timeLeft === 0 && !completedRef.current) {
      finishRound(matches.size, mistakes, 0);
    }
  }, [timeLeft, matches.size, mistakes, finishRound]);

  // Tümü eşleştirildi
  useEffect(() => {
    if (matches.size === PAIRS.length && !completedRef.current) {
      setTimeout(() => {
        finishRound(matches.size, mistakes, timeLeft);
      }, 500);
    }
  }, [matches.size, mistakes, timeLeft, finishRound]);

  const handleTermClick = (index: number) => {
    if (matches.has(index)) return;
    setSelectedTerm(index);
  };

  const handleDefClick = (defIndex: number) => {
    if (selectedTerm === null) return;

    // Zaten eşleşmiş mi?
    const alreadyMatched = Array.from(matches.values()).includes(defIndex);
    if (alreadyMatched) return;

    const termItem = shuffledTerms[selectedTerm];
    const defItem = shuffledDefs[defIndex];

    if (termItem.id === defItem.id) {
      // Doğru eşleşme
      setMatches((prev) => new Map(prev).set(selectedTerm, defIndex));
      setMatchStates((prev) => new Map(prev).set(selectedTerm, "correct"));
      setStreak((s) => s + 1);
      setSelectedTerm(null);
    } else {
      // Yanlış eşleşme
      setMistakes((m) => m + 1);
      setStreak(0);
      setMatchStates((prev) => new Map(prev).set(selectedTerm, "wrong"));
      setTimeout(() => {
        setMatchStates((prev) => {
          const next = new Map(prev);
          next.delete(selectedTerm!);
          return next;
        });
      }, 600);
      setSelectedTerm(null);
    }
  };

  const matchedDefIndices = new Set(matches.values());

  return (
    <div className="flex flex-col gap-4">
      {/* Süre ve ilerleme */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {matches.size}/{PAIRS.length} eşleştirildi
        </span>
        <span
          className={`font-mono text-sm font-bold px-2.5 py-1 rounded-full ${
            timeLeft <= 15
              ? "text-destructive bg-destructive/10"
              : "text-foreground bg-muted"
          }`}
        >
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Süre çubuğu */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            timeLeft <= 15 ? "bg-destructive" : "bg-primary"
          }`}
          style={{ width: `${(timeLeft / 90) * 100}%` }}
        />
      </div>

      {/* Eşleştirme alanı */}
      <div className="grid grid-cols-2 gap-3">
        {/* Kavramlar */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground text-center mb-1">
            Kavramlar
          </p>
          {shuffledTerms.map((item, i) => {
            const isMatched = matches.has(i);
            const isSelected = selectedTerm === i;
            const matchState = matchStates.get(i);

            return (
              <button
                key={`t-${item.id}`}
                type="button"
                onClick={() => handleTermClick(i)}
                disabled={isMatched}
                className={`flex items-center gap-2 px-3 py-3 rounded-lg border-2 text-sm font-semibold transition-all duration-200 text-left ${
                  isMatched
                    ? "border-accent bg-accent/10 text-accent-foreground opacity-70"
                    : matchState === "wrong"
                      ? "border-destructive bg-destructive/10 text-destructive animate-shake"
                      : isSelected
                        ? "border-primary bg-primary/10 text-primary scale-[1.02] shadow-lg"
                        : "border-border bg-card text-card-foreground hover:border-primary/40 hover:shadow active:scale-[0.97]"
                }`}
              >
                <span className="text-base shrink-0">📜</span>
                <span className="leading-tight">{item.term}</span>
                {isMatched && (
                  <span className="ml-auto text-accent text-xs">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tanımlar */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground text-center mb-1">
            Tanımlar
          </p>
          {shuffledDefs.map((item, i) => {
            const isMatched = matchedDefIndices.has(i);

            return (
              <button
                key={`d-${item.id}`}
                type="button"
                onClick={() => handleDefClick(i)}
                disabled={isMatched || selectedTerm === null}
                className={`flex items-center gap-2 px-3 py-3 rounded-lg border-2 text-sm transition-all duration-200 text-left ${
                  isMatched
                    ? "border-accent bg-accent/10 text-accent-foreground opacity-70"
                    : selectedTerm !== null
                      ? "border-border bg-card text-card-foreground hover:border-primary/40 hover:shadow cursor-pointer active:scale-[0.97]"
                      : "border-border bg-card text-card-foreground opacity-60 cursor-default"
                }`}
              >
                <span className="leading-tight text-xs">{item.definition}</span>
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

      {/* Streak */}
      {streak >= 3 && (
        <div className="text-center">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {streak} seri doğru!
          </span>
        </div>
      )}

      {mistakes > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Hata: {mistakes}
        </p>
      )}
    </div>
  );
}
