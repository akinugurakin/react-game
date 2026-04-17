"use client";

import React, { useEffect, useRef, useState } from "react";
import { haritaKaptaniConfig } from "./config";
import { Phase1Labels } from "./components/Phase1Labels";
import { Phase2Coords } from "./components/Phase2Coords";
import { Phase3Directions } from "./components/Phase3Directions";
import { sfx } from "./lib/sfx";

type Screen = "intro" | "phase1" | "phase2" | "phase3" | "result";

interface HaritaKaptaniProps {
  playerName?: string;
  onScoreSubmit?: (data: {
    gameId: string;
    score: number;
    elapsedSeconds: number;
    totalAttempts: number;
  }) => Promise<void>;
}

export default function HaritaKaptani({ playerName, onScoreSubmit }: HaritaKaptaniProps) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (screen === "intro" || screen === "result") return;
    if (startTimeRef.current === null) startTimeRef.current = Date.now();
    const id = window.setInterval(() => {
      if (startTimeRef.current !== null)
        setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [screen]);

  const handleStart = () => {
    setScore(0);
    setWrongAttempts(0);
    setElapsedSeconds(0);
    startTimeRef.current = Date.now();
    setScreen("phase1");
  };

  const addWrong = () => setWrongAttempts((w) => w + 1);

  const handlePhase1Done = () => {
    setScore((s) => s + 14 * 60); // 14 items × 60pts
    setScreen("phase2");
  };

  const handlePhase2Done = (stats: { totalScore: number }) => {
    setScore((s) => s + stats.totalScore);
    setScreen("phase3");
  };

  const handlePhase3Done = async (stats: { totalScore: number }) => {
    const finalScore = score + stats.totalScore;
    setScore(finalScore);
    const finalElapsed = startTimeRef.current
      ? Math.floor((Date.now() - startTimeRef.current) / 1000)
      : elapsedSeconds;
    setElapsedSeconds(finalElapsed);
    setScreen("result");
    setTimeout(() => sfx.victory(), 200);

    if (onScoreSubmit) {
      setSubmitting(true);
      try {
        await onScoreSubmit({
          gameId: haritaKaptaniConfig.id,
          score: finalScore,
          elapsedSeconds: finalElapsed,
          totalAttempts: 14 + 5 + 5 + wrongAttempts,
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const toggleMute = () => { const n = !muted; setMuted(n); sfx.setMuted(n); };

  const stars = wrongAttempts <= 2 ? 3 : wrongAttempts <= 5 ? 2 : wrongAttempts <= 10 ? 1 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4faf9] to-white">
      <div className="mx-auto max-w-4xl px-4 py-8">

        {/* ── INTRO ── */}
        {screen === "intro" && (
          <div className="space-y-6 rounded-2xl border-2 border-[#005C53]/15 bg-white p-8 shadow-sm">
            <div>
              <div className="inline-block rounded-full bg-[#005C53]/10 px-3 py-1 text-xs font-bold text-[#005C53]">
                Sosyal Bilgiler • 6. Sınıf • SB.6.2.1
              </div>
              <h1 className="mt-3 text-3xl font-extrabold text-[#042940]">
                {haritaKaptaniConfig.title} 🧭
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#042940]/70">
                Büyük bir fırtına eski deniz haritalarını yok etti! Kıtalar, okyanuslar
                ve koordinatlar kayboldu. Kaptanlar yolunu bulamıyor — tek çare sensin.
                Haritayı yeniden oluştur, dünyayı keşfet!
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border-l-4 border-[#005C53] bg-[#e6f5f3] p-4 text-sm text-[#042940]">
                <div className="mb-1 text-xs font-bold uppercase text-[#005C53]">Round 1</div>
                <strong>Haritayı Onar.</strong> Yönleri, kıtaları ve okyanusları bul.
              </div>
              <div className="rounded-xl border-l-4 border-[#845EC2] bg-[#f3effb] p-4 text-sm text-[#042940]">
                <div className="mb-1 text-xs font-bold uppercase text-[#845EC2]">Round 2</div>
                <strong>Koordinat Radarı.</strong> Enlem-boylam koordinatlarını haritada bul.
              </div>
              <div className="rounded-xl border-l-4 border-[#F4A261] bg-[#fff8f0] p-4 text-sm text-[#042940]">
                <div className="mb-1 text-xs font-bold uppercase text-[#F4A261]">Round 3</div>
                <strong>Kaptanın Sınavı.</strong> Hızlı sorulara cevap ver, bonus kazan!
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full rounded-xl bg-[#005C53] px-6 py-4 text-lg font-bold text-white shadow-md hover:bg-[#004d46] transition-colors"
            >
              Denize Açıl
            </button>
          </div>
        )}

        {/* ── GAMEPLAY ── */}
        {screen !== "intro" && screen !== "result" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
              <div className="text-sm font-bold text-[#042940]">{haritaKaptaniConfig.title}</div>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-lg bg-[#005C53] px-3 py-1 font-bold text-white">{score} puan</span>
                <span className="rounded-lg bg-[#e6f5f3] px-3 py-1 font-bold text-[#005C53]">⏱ {fmtTime(elapsedSeconds)}</span>
                <span className="rounded-lg bg-[#fff5f5] px-3 py-1 font-bold text-red-500">{wrongAttempts} hata</span>
                <button onClick={toggleMute} className="rounded-lg border border-[#005C53]/20 px-3 py-1 text-[#005C53] hover:bg-[#e6f5f3]">
                  {muted ? "🔇" : "🔊"}
                </button>
              </div>
            </div>

            {screen === "phase1" && <Phase1Labels onComplete={handlePhase1Done} onWrong={addWrong} />}
            {screen === "phase2" && <Phase2Coords onComplete={handlePhase2Done} onWrong={addWrong} />}
            {screen === "phase3" && <Phase3Directions onComplete={handlePhase3Done} onWrong={addWrong} />}
          </div>
        )}

        {/* ── RESULT ── */}
        {screen === "result" && (
          <div className="space-y-6 rounded-2xl border-2 border-[#005C53]/15 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">{stars === 3 ? "🏆" : stars === 2 ? "🧭" : stars === 1 ? "🗺️" : "⚓"}</div>
            <h2 className="text-2xl font-extrabold text-[#042940]">
              {stars === 3 ? "Efsane Kaptan!" : stars === 2 ? "Haritalar Hazır" : stars === 1 ? "Yol Biraz Şaştı" : "Tekrar Dene"}
            </h2>

            <div className="flex justify-center gap-2 text-4xl">
              {[1, 2, 3].map((i) => (
                <span key={i} className={i <= stars ? "hk-star" : "opacity-20"} style={{ animationDelay: `${i * 0.18}s` }}>⭐</span>
              ))}
            </div>

            <div className="mx-auto max-w-md rounded-xl bg-[#f4faf9] p-4 text-left text-sm leading-relaxed text-[#042940]/85">
              <div className="mb-1 text-xs font-bold uppercase text-[#005C53]">Sefer Raporu</div>
              <ul className="space-y-1">
                <li>• 4 yönü, 7 kıtayı ve 3 okyanusun haritasını çizdin</li>
                <li>• Koordinat görevlerini tamamladın</li>
                <li>• Kaptanın sınavını geçtin</li>
                <li>• {wrongAttempts === 0 ? "Hiç rota şaşmadı!" : `${wrongAttempts} kez rota şaştı`}</li>
                <li>• Toplam süre: <strong>{fmtTime(elapsedSeconds)}</strong></li>
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-[#005C53] p-4 text-white">
                <div className="text-xs opacity-80">Puan</div>
                <div className="text-3xl font-extrabold">{score}</div>
              </div>
              <div className="rounded-xl bg-[#f9fce8] p-4">
                <div className="text-xs text-[#042940]/60">Süre</div>
                <div className="text-3xl font-bold text-[#042940]">{fmtTime(elapsedSeconds)}</div>
              </div>
              <div className="rounded-xl bg-[#fff5f5] p-4">
                <div className="text-xs text-[#042940]/60">Hata</div>
                <div className="text-3xl font-bold text-red-500">{wrongAttempts}</div>
              </div>
            </div>

            {submitting && <div className="text-xs text-[#042940]/50">Skor kaydediliyor…</div>}

            <button onClick={handleStart} className="rounded-xl bg-[#005C53] px-6 py-3 font-bold text-white hover:bg-[#004d46]">
              Tekrar Oyna
            </button>

            <style>{`
              @keyframes hk-star { 0%{transform:scale(0) rotate(-180deg);opacity:0} 60%{transform:scale(1.3) rotate(20deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
              .hk-star { display:inline-block; animation:hk-star 0.5s cubic-bezier(.2,.8,.3,1.2) both; }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
