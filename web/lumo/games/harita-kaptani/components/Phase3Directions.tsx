"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { WorldMap } from "./WorldMap";
import { sfx } from "../lib/sfx";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

const QUIZ_POOL: QuizQuestion[] = [
  { id: "tr-kuzey", question: "Türkiye'nin kuzeyinde hangi deniz var?", options: ["Karadeniz", "Akdeniz", "Ege Denizi", "Hint Okyanusu"], correctIndex: 0 },
  { id: "tr-guney", question: "Türkiye'nin güneyinde hangi deniz var?", options: ["Karadeniz", "Akdeniz", "Atlas Okyanusu", "Kızıldeniz"], correctIndex: 1 },
  { id: "tr-bati", question: "Türkiye'nin batısında hangi deniz var?", options: ["Karadeniz", "Kızıldeniz", "Ege Denizi", "Hint Okyanusu"], correctIndex: 2 },
  { id: "afrika-dogu", question: "Afrika'nın doğusunda hangi okyanus var?", options: ["Atlas Okyanusu", "Büyük Okyanus", "Hint Okyanusu", "Kuzey Buz Denizi"], correctIndex: 2 },
  { id: "amerika-bati", question: "Kuzey Amerika'nın batısında hangi okyanus var?", options: ["Atlas Okyanusu", "Hint Okyanusu", "Büyük Okyanus", "Güney Okyanusu"], correctIndex: 2 },
  { id: "amerika-dogu", question: "Güney Amerika'nın doğusunda hangi okyanus var?", options: ["Büyük Okyanus", "Atlas Okyanusu", "Hint Okyanusu", "Kuzey Buz Denizi"], correctIndex: 1 },
  { id: "avrupa-guney", question: "Avrupa'nın güneyinde hangi deniz var?", options: ["Baltık Denizi", "Karadeniz", "Akdeniz", "Kuzey Denizi"], correctIndex: 2 },
  { id: "asya-kita", question: "Dünyanın en büyük kıtası hangisidir?", options: ["Afrika", "Kuzey Amerika", "Avrupa", "Asya"], correctIndex: 3 },
  { id: "ekvator-nedir", question: "Ekvator dünyayı hangi yönde ikiye böler?", options: ["Doğu-Batı", "Kuzey-Güney", "Kuzeydoğu-Güneybatı", "Hiçbiri"], correctIndex: 1 },
  { id: "meridyen", question: "Başlangıç meridyeni (0°) hangi şehirden geçer?", options: ["Paris", "İstanbul", "Londra", "New York"], correctIndex: 2 },
];

const TIMER_SECONDS = 8;

interface Phase3Props {
  onComplete: (stats: { wrongAttempts: number; totalScore: number }) => void;
  onWrong?: () => void;
  onCorrect?: (points: number) => void;
}

export function Phase3Directions({ onComplete, onWrong, onCorrect }: Phase3Props) {
  const [queue] = useState(() => shuffle(QUIZ_POOL).slice(0, 5));
  const [index, setIndex] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const current = queue[index] as QuizQuestion | undefined;

  // Timer
  useEffect(() => {
    if (!current || selected !== null) return;
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          // Süre doldu — yanlış say
          sfx.wrong();
          onWrong?.();
          setWrongAttempts((w) => w + 1);
          setSelected(-1); // timeout marker
          setTimeout(() => advance(), 1200);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [index, current, selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = useCallback(() => {
    setSelected(null);
    const next = index + 1;
    setIndex(next);
    if (next >= queue.length) {
      sfx.phaseComplete();
      onComplete({ wrongAttempts, totalScore });
    }
  }, [index, queue.length, wrongAttempts, totalScore, onComplete]);

  const handleSelect = useCallback(
    (optIndex: number) => {
      if (selected !== null || !current) return;
      clearInterval(timerRef.current);
      setSelected(optIndex);
      if (optIndex === current.correctIndex) {
        const bonus = Math.round((timeLeft / TIMER_SECONDS) * 80) + 20; // 20-100
        sfx.correct();
        onCorrect?.(bonus);
        setTotalScore((s) => s + bonus);
      } else {
        sfx.wrong();
        onWrong?.();
        setWrongAttempts((w) => w + 1);
      }
      setTimeout(() => advance(), 1000);
    },
    [selected, current, timeLeft, onCorrect, onWrong, advance]
  );

  if (!current) return null;

  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft <= 3 ? "#E63946" : timeLeft <= 5 ? "#F4A261" : "#005C53";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-l-4 border-[#F4A261] bg-[#fff8f0] px-4 py-3 text-sm text-[#042940]">
        <strong>Kaptanın Sınavı:</strong> Hızlı cevapla, bonus kazan!
        <span className="ml-2 rounded-md bg-[#F4A261]/10 px-2 py-0.5 font-bold">{index + 1}/{queue.length}</span>
      </div>

      {/* Timer bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${timerPct}%`, backgroundColor: timerColor }}
        />
      </div>

      {/* Question */}
      <div className="rounded-xl bg-[#042940] px-6 py-4 text-center text-lg font-bold text-white shadow-lg">
        {current.question}
        <div className="mt-1 text-xs font-normal text-white/50">{timeLeft} saniye</div>
      </div>

      {/* Options */}
      <div className="grid gap-2 sm:grid-cols-2">
        {current.options.map((opt, i) => {
          const isCorrect = i === current.correctIndex;
          const isSelected = selected === i;
          const showResult = selected !== null;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={[
                "rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-all",
                showResult && isCorrect
                  ? "border-[#9FC131] bg-[#9FC131]/20 text-[#042940]"
                  : showResult && isSelected && !isCorrect
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-[#005C53]/15 bg-white text-[#042940] hover:border-[#005C53] hover:bg-[#e6f5f3]",
                !showResult && "active:scale-[0.97]",
              ].join(" ")}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#005C53]/10 text-xs font-bold text-[#005C53]">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {showResult && isCorrect && " ✓"}
            </button>
          );
        })}
      </div>

      {/* Küçük harita referans olarak */}
      <div className="opacity-60">
        <WorldMap />
      </div>
    </div>
  );
}
