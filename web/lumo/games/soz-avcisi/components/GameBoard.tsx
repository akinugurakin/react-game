"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Card } from "./Card";
import wordBankData from "../word-bank.json";

// ---------- Types ----------

interface Pair {
  a: string;
  b: string;
}

interface CardItem {
  id: number;
  text: string;
  pairIndex: number;
  state: "idle" | "selected" | "matched" | "wrong";
}

type RoundKey = "esAnlamli" | "zitAnlamli" | "deyimler";

interface RoundDef {
  key: RoundKey;
  label: string;
  pairs: Pair[];
}

export interface GameResult {
  score: number;
  totalAttempts: number;
  correctMatches: number;
  rounds: { key: RoundKey; attempts: number; correct: number }[];
  elapsedSeconds: number;
}

interface GameBoardProps {
  onComplete: (result: GameResult) => void;
}

// ---------- Helpers ----------

const PAIRS_PER_ROUND = 6;

const rounds: RoundDef[] = [
  {
    key: "esAnlamli",
    label: wordBankData.rounds.esAnlamli.label,
    pairs: wordBankData.rounds.esAnlamli.pairs,
  },
  {
    key: "zitAnlamli",
    label: wordBankData.rounds.zitAnlamli.label,
    pairs: wordBankData.rounds.zitAnlamli.pairs,
  },
  {
    key: "deyimler",
    label: wordBankData.rounds.deyimler.label,
    pairs: wordBankData.rounds.deyimler.pairs,
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

function pickRandom(pairs: Pair[], count: number): Pair[] {
  return shuffle(pairs).slice(0, count);
}

function buildCards(pairs: Pair[]): CardItem[] {
  const items: CardItem[] = [];
  pairs.forEach((pair, i) => {
    items.push({ id: i * 2, text: pair.a, pairIndex: i, state: "idle" });
    items.push({ id: i * 2 + 1, text: pair.b, pairIndex: i, state: "idle" });
  });
  return shuffle(items);
}

// ---------- Component ----------

export function GameBoard({ onComplete }: GameBoardProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [roundStats, setRoundStats] = useState<
    { key: RoundKey; attempts: number; correct: number }[]
  >([]);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Start round
  const startRound = useCallback((idx: number) => {
    const round = rounds[idx];
    const picked = pickRandom(round.pairs, PAIRS_PER_ROUND);
    setCards(buildCards(picked));
    setSelected(null);
    setMatchedCount(0);
    setLocked(false);
    setAttempts(0);
    setCorrect(0);
  }, []);

  // Init first round + timer
  useEffect(() => {
    startRound(0);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startRound]);

  // Handle card click
  const handleCardClick = useCallback(
    (cardId: number) => {
      if (locked) return;

      const clickedCard = cards.find((c) => c.id === cardId);
      if (!clickedCard || clickedCard.state !== "idle") return;

      if (selected === null) {
        // First card selection
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, state: "selected" } : c))
        );
        setSelected(cardId);
        return;
      }

      // Second card selection
      const firstCard = cards.find((c) => c.id === selected);
      if (!firstCard || firstCard.id === cardId) return;

      setAttempts((a) => a + 1);
      setLocked(true);

      if (firstCard.pairIndex === clickedCard.pairIndex) {
        // Match!
        setCorrect((c) => c + 1);
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === clickedCard.id
              ? { ...c, state: "matched" }
              : c
          )
        );
        setSelected(null);
        setMatchedCount((m) => m + 1);
        setLocked(false);
      } else {
        // Wrong
        setCards((prev) =>
          prev.map((c) => {
            if (c.id === cardId) return { ...c, state: "wrong" };
            if (c.id === firstCard.id) return { ...c, state: "wrong" };
            return c;
          })
        );
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === cardId
                ? { ...c, state: "idle" }
                : c
            )
          );
          setSelected(null);
          setLocked(false);
        }, 800);
      }
    },
    [cards, selected, locked]
  );

  // Round complete check
  useEffect(() => {
    if (matchedCount === PAIRS_PER_ROUND && matchedCount > 0) {
      const currentRound = rounds[roundIndex];
      const newStats = [
        ...roundStats,
        { key: currentRound.key, attempts, correct },
      ];
      setRoundStats(newStats);

      const nextIdx = roundIndex + 1;

      if (nextIdx >= rounds.length) {
        // Game over
        if (timerRef.current) clearInterval(timerRef.current);
        const totalAttempts = newStats.reduce((s, r) => s + r.attempts, 0);
        const totalCorrect = newStats.reduce((s, r) => s + r.correct, 0);
        const totalPairs = PAIRS_PER_ROUND * rounds.length;
        const accuracy = totalCorrect / totalAttempts;
        const timeBonus = Math.max(0, 1 - elapsedSeconds / (8 * 60));
        const score = Math.round(
          (accuracy * 0.7 + timeBonus * 0.3) * 100 *
            (totalCorrect / totalPairs)
        );

        setTimeout(() => {
          onComplete({
            score: Math.min(100, Math.max(0, score)),
            totalAttempts,
            correctMatches: totalCorrect,
            rounds: newStats,
            elapsedSeconds,
          });
        }, 600);
      } else {
        // Next round
        setTimeout(() => {
          setRoundIndex(nextIdx);
          startRound(nextIdx);
        }, 1000);
      }
    }
  }, [
    matchedCount,
    roundIndex,
    attempts,
    correct,
    roundStats,
    elapsedSeconds,
    onComplete,
    startRound,
  ]);

  const currentRound = rounds[roundIndex];
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Tur {roundIndex + 1} / {rounds.length}
          </p>
          <h3 className="text-lg font-bold text-foreground">
            {currentRound.label}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {matchedCount}/{PAIRS_PER_ROUND}
          </span>
          <span className="font-mono text-sm font-bold text-primary bg-muted px-2.5 py-1 rounded-full">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${
              ((roundIndex * PAIRS_PER_ROUND + matchedCount) /
                (rounds.length * PAIRS_PER_ROUND)) *
              100
            }%`,
          }}
        />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {cards.map((card) => (
          <Card
            key={card.id}
            text={card.text}
            state={card.state}
            disabled={locked}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-muted-foreground">
        {currentRound.key === "esAnlamli" &&
          "Aynı anlama gelen kelimeleri eşleştir"}
        {currentRound.key === "zitAnlamli" &&
          "Zıt anlamlı kelimeleri eşleştir"}
        {currentRound.key === "deyimler" &&
          "Deyimleri anlamlarıyla eşleştir"}
      </p>
    </div>
  );
}
