"use client";

import { useState } from "react";
import { GameBoard, type GameResult } from "./components/GameBoard";
import { sozAvcisiConfig } from "./config";

type Screen = "intro" | "playing" | "result";

interface SozAvcisiProps {
  playerName?: string;
  onScoreSubmit?: (data: {
    gameId: string;
    score: number;
    elapsedSeconds: number;
    totalAttempts: number;
  }) => Promise<void>;
}

export default function SozAvcisi({
  playerName,
  onScoreSubmit,
}: SozAvcisiProps) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [result, setResult] = useState<GameResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleComplete = async (gameResult: GameResult) => {
    setResult(gameResult);
    setScreen("result");

    if (onScoreSubmit) {
      setSubmitting(true);
      try {
        await onScoreSubmit({
          gameId: sozAvcisiConfig.id,
          score: gameResult.score,
          elapsedSeconds: gameResult.elapsedSeconds,
          totalAttempts: gameResult.totalAttempts,
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleReplay = () => {
    setResult(null);
    setScreen("playing");
  };

  // ── Intro ──
  if (screen === "intro") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-8 px-4 max-w-md mx-auto text-center">
        {/* Animated tree illustration */}
        <div className="relative w-24 h-28">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            {/* Trunk */}
            <rect
              x="40"
              y="65"
              width="20"
              height="50"
              rx="5"
              fill="#8B5E3C"
            />
            {/* Crown */}
            <ellipse cx="50" cy="40" rx="42" ry="38" fill="#38A85C" />
            <ellipse cx="50" cy="35" rx="35" ry="30" fill="#43C46A" />
            {/* Fruits */}
            <circle cx="30" cy="30" r="6" fill="#EF4444" />
            <circle cx="55" cy="22" r="6" fill="#EF4444" />
            <circle cx="70" cy="35" r="6" fill="#EF4444" />
            <circle cx="38" cy="48" r="6" fill="#EF4444" />
            {/* Fruit stems */}
            <line x1="30" y1="24" x2="30" y2="20" stroke="#15803d" strokeWidth="1.5" />
            <line x1="55" y1="16" x2="55" y2="12" stroke="#15803d" strokeWidth="1.5" />
            <line x1="70" y1="29" x2="70" y2="25" stroke="#15803d" strokeWidth="1.5" />
            <line x1="38" y1="42" x2="38" y2="38" stroke="#15803d" strokeWidth="1.5" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {sozAvcisiConfig.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Kelime Ağacı&apos;nda sözcükler meyve olmuş! Alttan kayan
            sepetlerdeki kelimelerin eş anlamlılarını ağaçtan toplayıp sepete
            düşür.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full text-left bg-secondary/80 rounded-2xl p-5">
          <p className="text-xs font-bold text-foreground uppercase tracking-wider">
            Nasıl Oynanır?
          </p>
          <ul className="text-sm text-muted-foreground space-y-2.5">
            <li className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span>Alttan kayan sepetteki kelimeyi oku</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span>Ağaçtaki meyvelerden eş anlamlısını bul</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <span>
                Meyveye tıkla — sepet geçmeden yakala!
              </span>
            </li>
          </ul>
          <div className="flex gap-2 mt-1">
            <span className="text-xs bg-amber-500/10 text-amber-600 font-semibold px-2 py-0.5 rounded-full">
              Seri bonusu
            </span>
            <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
              18 sepet
            </span>
          </div>
        </div>

        {playerName && (
          <p className="text-sm text-muted-foreground">
            Hoş geldin,{" "}
            <span className="font-semibold text-foreground">{playerName}</span>!
          </p>
        )}

        <button
          type="button"
          onClick={() => setScreen("playing")}
          className="w-full py-3.5 px-6 bg-primary text-primary-foreground font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.97]"
        >
          Oyuna Başla
        </button>
      </div>
    );
  }

  // ── Playing ──
  if (screen === "playing") {
    return (
      <div className="px-2 sm:px-4 py-1">
        <GameBoard onComplete={handleComplete} />
      </div>
    );
  }

  // ── Result ──
  if (screen === "result" && result) {
    const minutes = Math.floor(result.elapsedSeconds / 60);
    const seconds = result.elapsedSeconds % 60;
    const accuracy =
      result.totalAttempts > 0
        ? Math.round((result.correctMatches / result.totalAttempts) * 100)
        : 0;

    let badge: { label: string; emoji: string; color: string };
    if (result.score >= 90) {
      badge = {
        label: "Altın Söz Avcısı",
        emoji: "🏆",
        color: "text-yellow-500",
      };
    } else if (result.score >= 70) {
      badge = {
        label: "Gümüş Söz Avcısı",
        emoji: "🥈",
        color: "text-gray-400",
      };
    } else {
      badge = {
        label: "Bronz Söz Avcısı",
        emoji: "🥉",
        color: "text-amber-600",
      };
    }

    return (
      <div className="flex flex-col items-center gap-5 py-8 px-4 max-w-md mx-auto text-center">
        {/* Score circle */}
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-primary/15 to-primary/5 flex items-center justify-center shadow-inner">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-primary">
              {result.score}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground -mt-1">
              puan
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-foreground">
            Tebrikler{playerName ? `, ${playerName}` : ""}!
          </h2>
          <p className={`text-sm font-bold mt-1 ${badge.color}`}>
            {badge.emoji} {badge.label}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="bg-secondary rounded-2xl p-3.5">
            <p className="font-mono text-xl font-bold text-foreground">
              {result.correctMatches}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Doğru
            </p>
          </div>
          <div className="bg-secondary rounded-2xl p-3.5">
            <p className="font-mono text-xl font-bold text-foreground">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Süre</p>
          </div>
          <div className="bg-secondary rounded-2xl p-3.5">
            <p className="font-mono text-xl font-bold text-foreground">
              %{accuracy}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Başarı
            </p>
          </div>
        </div>

        {submitting && (
          <p className="text-xs text-muted-foreground">Skor kaydediliyor...</p>
        )}

        <button
          type="button"
          onClick={handleReplay}
          className="w-full py-3.5 px-6 bg-primary text-primary-foreground font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.97]"
        >
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return null;
}
