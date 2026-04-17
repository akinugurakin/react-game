"use client";

import { useState } from "react";
import { GameBoard, type GameResult } from "./components/GameBoard";
import { config } from "./config";

type Screen = "intro" | "playing" | "result";

interface InkilapYoluProps {
  playerName?: string;
  onScoreSubmit?: (data: {
    gameId: string;
    score: number;
    elapsedSeconds: number;
    totalAttempts: number;
  }) => Promise<void>;
}

export default function InkilapYolu({
  playerName,
  onScoreSubmit,
}: InkilapYoluProps) {
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
          gameId: config.id,
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

  // ---------- Intro Screen ----------
  if (screen === "intro") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-8 px-4 max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
          🏛️
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {config.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Samsun&apos;dan Cumhuriyet&apos;e uzanan yolculukta olayları
            kronolojik sıraya diz, kavramları eşleştir ve Millî Mücadele&apos;nin
            dönüm noktalarını keşfet!
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full text-left bg-secondary rounded-lg p-4">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Nasıl Oynanır?
          </p>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              Tarihsel olayları kronolojik sıraya diz
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              Kavramları doğru tanımlarıyla eşleştir
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              Bilgi sorularını doğru cevapla
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded-full">
            ⏱ ~{config.duration} dk
          </span>
          <span className="bg-muted px-2 py-1 rounded-full">
            📊 {config.difficulty}
          </span>
          <span className="bg-muted px-2 py-1 rounded-full">
            🎯 8. Sınıf İnkılap Tarihi
          </span>
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
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-bold text-base rounded-lg shadow hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
        >
          Oyuna Başla
        </button>
      </div>
    );
  }

  // ---------- Playing Screen ----------
  if (screen === "playing") {
    return (
      <div className="py-4 px-4">
        <GameBoard onComplete={handleComplete} />
      </div>
    );
  }

  // ---------- Result Screen ----------
  if (screen === "result" && result) {
    const roundLabels: Record<string, string> = {
      kronoloji: "Kronoloji Yolu",
      "kavram-eslestirme": "Kavram Eşleştirme",
      "bilgi-yarismasi": "Kim-Ne-Nerede",
    };

    const minutes = Math.floor(result.elapsedSeconds / 60);
    const seconds = result.elapsedSeconds % 60;

    let badge = { label: "", color: "" };
    if (result.score >= 90) {
      badge = { label: "Tarih Kahramanı", color: "text-yellow-500" };
    } else if (result.score >= 70) {
      badge = { label: "Kavram Bilgini", color: "text-gray-400" };
    } else {
      badge = { label: "Genç Kaşif", color: "text-amber-600" };
    }

    return (
      <div className="flex flex-col items-center gap-5 py-8 px-4 max-w-md mx-auto text-center">
        {/* Skor dairesi */}
        <div className="relative w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-4xl font-extrabold text-primary">
            {result.score}
          </span>
          <span className="absolute bottom-2 text-[10px] font-medium text-muted-foreground">
            / 100
          </span>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-foreground">
            Tebrikler{playerName ? `, ${playerName}` : ""}!
          </h2>
          <p className={`text-sm font-semibold mt-1 ${badge.color}`}>
            {badge.label}
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="bg-secondary rounded-lg p-3">
            <p className="font-mono text-lg font-bold text-foreground">
              {result.correctAnswers}/{result.totalAttempts}
            </p>
            <p className="text-[10px] text-muted-foreground">Doğru / Toplam</p>
          </div>
          <div className="bg-secondary rounded-lg p-3">
            <p className="font-mono text-lg font-bold text-foreground">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
            <p className="text-[10px] text-muted-foreground">Süre</p>
          </div>
          <div className="bg-secondary rounded-lg p-3">
            <p className="font-mono text-lg font-bold text-foreground">
              {result.streak}
            </p>
            <p className="text-[10px] text-muted-foreground">En İyi Seri</p>
          </div>
        </div>

        {/* Tur detayları */}
        <div className="w-full bg-secondary rounded-lg p-4 text-left">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
            Tur Detayları
          </p>
          <div className="space-y-2">
            {result.rounds.map((r) => (
              <div
                key={r.key}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">
                  {roundLabels[r.key] ?? r.key}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-foreground">
                    {r.correct}/{r.total}
                  </span>
                  {r.timeBonus && (
                    <span className="text-[10px] text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded">
                      +Süre
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {submitting && (
          <p className="text-xs text-muted-foreground">Skor kaydediliyor...</p>
        )}

        {/* Aksiyonlar */}
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={handleReplay}
            className="flex-1 py-3 px-4 bg-primary text-primary-foreground font-bold rounded-lg shadow hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
          >
            Tekrar Oyna
          </button>
        </div>
      </div>
    );
  }

  return null;
}
