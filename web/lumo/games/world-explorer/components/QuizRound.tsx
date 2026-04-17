"use client";

import { useState, useCallback, useRef } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { useStreak } from "../hooks/useStreak";
import { QUESTIONS } from "../lib/data";
import { TimerBar } from "./TimerBar";
import { StreakIndicator } from "./StreakIndicator";
import type { RoundResult } from "../types";

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

interface Props {
  onComplete: (result: RoundResult, streak: number) => void;
}

export function QuizRound({ onComplete }: Props) {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);

  const streak = useStreak();
  const doneRef = useRef(false);

  const finish = useCallback(
    (correct: number, mistakes: number, timeLeft: number) => {
      if (doneRef.current) return;
      doneRef.current = true;
      timer.stop();
      onComplete(
        {
          key: "sports-quiz",
          correct,
          total: QUESTIONS.length,
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

  const handleOptionClick = (optionIdx: number) => {
    if (selectedOption !== null) return; // Already answered

    setSelectedOption(optionIdx);

    const question = QUESTIONS[questionIdx];
    const isCorrect = optionIdx === question.correctIndex;

    let newCorrect = correctCount;
    let newMistakes = mistakeCount;

    if (isCorrect) {
      newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);
      streak.hit();
    } else {
      newMistakes = mistakeCount + 1;
      setMistakeCount(newMistakes);
      streak.miss();
    }

    setTimeout(() => {
      const nextIdx = questionIdx + 1;
      if (nextIdx >= QUESTIONS.length) {
        finish(newCorrect, newMistakes, timer.timeLeft);
      } else {
        setQuestionIdx(nextIdx);
        setSelectedOption(null);
      }
    }, 1600);
  };

  const q = QUESTIONS[questionIdx];
  const answered = selectedOption !== null;

  return (
    <div className="flex flex-col gap-3">
      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-muted-foreground tabular-nums">
          {questionIdx + 1}/{QUESTIONS.length}
        </span>
        <TimerBar
          formatted={timer.formatted}
          progress={timer.progress}
          isUrgent={timer.isUrgent}
        />
      </div>

      {/* Passage card */}
      <div className="bg-muted/30 rounded-xl p-4 border border-border">
        <p className="text-[9px] uppercase tracking-[0.15em] font-extrabold text-muted-foreground mb-2">
          Read the passage
        </p>
        <p className="text-[13px] text-foreground leading-relaxed">
          {q.passage}
        </p>
      </div>

      {/* Question */}
      <p className="text-[15px] font-extrabold text-foreground leading-snug px-1">
        {q.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const isCorrectOption = i === q.correctIndex;
          const showCorrect = answered && isCorrectOption;
          const showWrong = answered && isSelected && !isCorrectOption;
          const dimmed = answered && !isSelected && !isCorrectOption;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleOptionClick(i)}
              disabled={answered}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border-2 text-[13px] font-bold text-left transition-all duration-250 ${
                showCorrect
                  ? "border-accent bg-accent/10 text-accent-foreground shadow-md"
                  : showWrong
                    ? "border-destructive bg-destructive/10 text-destructive animate-shake"
                    : dimmed
                      ? "border-border bg-card text-card-foreground opacity-40"
                      : "border-border bg-card text-card-foreground shadow-sm hover:border-primary/40 hover:shadow-md active:scale-[0.98]"
              }`}
            >
              {/* Letter badge */}
              <span
                className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-all duration-250 ${
                  showCorrect
                    ? "bg-accent text-white"
                    : showWrong
                      ? "bg-destructive text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {showCorrect ? "✓" : showWrong ? "✗" : OPTION_LETTERS[i]}
              </span>
              <span className="leading-snug">{option}</span>
            </button>
          );
        })}
      </div>

      <StreakIndicator count={streak.current} visible={streak.isHot} />
    </div>
  );
}
