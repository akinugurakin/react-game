"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { useStreak } from "../hooks/useStreak";
import { shuffle } from "../lib/shuffle";
import { SENTENCES } from "../lib/data";
import { TimerBar } from "./TimerBar";
import { FeedbackFlash } from "./FeedbackFlash";
import { StreakIndicator } from "./StreakIndicator";
import type { RoundResult } from "../types";

interface WordToken {
  id: number;
  text: string;
}

interface Props {
  onComplete: (result: RoundResult, streak: number) => void;
}

export function SentenceRound({ onComplete }: Props) {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [pool, setPool] = useState<WordToken[]>([]);
  const [placed, setPlaced] = useState<WordToken[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [locked, setLocked] = useState(false);

  const streak = useStreak();
  const doneRef = useRef(false);

  const finish = useCallback(
    (correct: number, mistakes: number, timeLeft: number) => {
      if (doneRef.current) return;
      doneRef.current = true;
      timer.stop();
      onComplete(
        {
          key: "sentence-builder",
          correct,
          total: SENTENCES.length,
          timeBonus: timeLeft > 30,
          mistakes,
        },
        streak.best
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onComplete]
  );

  const timer = useCountdown({
    initialSeconds: 120,
    onTimeUp: () => finish(correctCount, mistakeCount, 0),
  });

  // Initialize words for current sentence
  useEffect(() => {
    if (sentenceIdx < SENTENCES.length) {
      const words = SENTENCES[sentenceIdx].words;
      const tokens: WordToken[] = words.map((text, i) => ({ id: i, text }));
      setPool(shuffle(tokens));
      setPlaced([]);
      setFeedback(null);
      setLocked(false);
    }
  }, [sentenceIdx]);

  // Tap a word from pool → add to placed
  const handlePoolTap = (token: WordToken) => {
    if (locked) return;
    setPool((prev) => prev.filter((t) => t.id !== token.id));
    setPlaced((prev) => [...prev, token]);
  };

  // Tap a placed word → return to pool
  const handlePlacedTap = (token: WordToken) => {
    if (locked) return;
    setPlaced((prev) => prev.filter((t) => t.id !== token.id));
    setPool((prev) => [...prev, token]);
  };

  // Check the answer
  const handleCheck = useCallback(() => {
    if (locked || feedback) return;
    setLocked(true);

    const sentence = SENTENCES[sentenceIdx];
    const playerAnswer = placed.map((t) => t.text).join(" ");
    const isCorrect = playerAnswer === sentence.answer;

    if (isCorrect) {
      setFeedback("correct");
      setCorrectCount((c) => c + 1);
      streak.hit();
    } else {
      setFeedback("wrong");
      setMistakeCount((m) => m + 1);
      streak.miss();
    }

    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    const newMistakes = !isCorrect ? mistakeCount + 1 : mistakeCount;

    setTimeout(() => {
      const nextIdx = sentenceIdx + 1;
      if (nextIdx >= SENTENCES.length) {
        finish(newCorrect, newMistakes, timer.timeLeft);
      } else {
        setSentenceIdx(nextIdx);
      }
    }, 1400);
  }, [
    locked,
    feedback,
    sentenceIdx,
    placed,
    correctCount,
    mistakeCount,
    streak,
    timer.timeLeft,
    finish,
  ]);

  const currentSentence = SENTENCES[sentenceIdx];
  const allPlaced = pool.length === 0 && placed.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground tabular-nums">
            {sentenceIdx + 1}/{SENTENCES.length}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              currentSentence.grammar === "present-perfect-for"
                ? "bg-blue-500/10 text-blue-600"
                : "bg-purple-500/10 text-purple-600"
            }`}
          >
            {currentSentence.grammar === "present-perfect-for"
              ? "Present Perfect + for"
              : "Question Tag"}
          </span>
        </div>
        <TimerBar
          formatted={timer.formatted}
          progress={timer.progress}
          isUrgent={timer.isUrgent}
        />
      </div>

      {/* Sentence building area */}
      <div
        className={`min-h-[72px] flex flex-wrap items-start content-start gap-1.5 p-3.5 rounded-xl border-2 transition-all duration-300 ${
          feedback === "correct"
            ? "border-accent bg-accent/5"
            : feedback === "wrong"
              ? "border-destructive bg-destructive/5"
              : placed.length > 0
                ? "border-primary/30 bg-card shadow-inner"
                : "border-dashed border-muted bg-muted/10"
        }`}
      >
        {placed.length === 0 ? (
          <p className="text-sm text-muted-foreground italic px-1">
            Tap words below to build the sentence...
          </p>
        ) : (
          placed.map((token, i) => (
            <button
              key={token.id}
              type="button"
              onClick={() => handlePlacedTap(token)}
              disabled={locked}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                feedback === "correct"
                  ? "bg-accent/15 text-accent-foreground"
                  : feedback === "wrong"
                    ? "bg-destructive/15 text-destructive"
                    : "bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 cursor-pointer"
              }`}
              style={{
                animation: locked
                  ? "none"
                  : `fadeSlideIn 0.15s ease-out ${i * 0.02}s both`,
              }}
            >
              {token.text}
            </button>
          ))
        )}
      </div>

      {/* Feedback */}
      <FeedbackFlash
        type={feedback}
        correction={
          feedback === "wrong" ? currentSentence.answer : undefined
        }
      />

      {/* Word pool */}
      <div className="flex flex-wrap justify-center gap-2 min-h-[48px]">
        {pool.map((token) => (
          <button
            key={token.id}
            type="button"
            onClick={() => handlePoolTap(token)}
            disabled={locked}
            className="px-3 py-2 rounded-xl border-2 border-border bg-card text-card-foreground text-sm font-bold shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-150 active:scale-95"
          >
            {token.text}
          </button>
        ))}
      </div>

      {/* Check button */}
      {allPlaced && !feedback && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCheck}
            className="px-8 py-2.5 bg-primary text-primary-foreground font-extrabold rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200 active:scale-[0.97]"
          >
            Check
          </button>
        </div>
      )}

      <StreakIndicator count={streak.current} visible={streak.isHot} />
    </div>
  );
}
