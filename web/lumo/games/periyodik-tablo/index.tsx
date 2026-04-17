"use client";

import React, { useEffect, useRef, useState } from "react";
import { periyodikTabloConfig } from "./config";
import { Phase1Blocks } from "./components/Phase1Blocks";
import { Phase2Elements } from "./components/Phase2Elements";
import { Confetti } from "./components/Confetti";
import { FloatingFx, ParticleBurst, type FloatingItem } from "./components/FloatingFx";
import { LabBackground } from "./components/LabBackground";
import { sfx } from "./lib/sfx";

type Screen = "intro" | "phase1" | "phase2" | "result";

interface PeriyodikTabloProps {
  playerName?: string;
  onScoreSubmit?: (data: {
    gameId: string;
    score: number;
    elapsedSeconds: number;
    totalAttempts: number;
  }) => Promise<void>;
}

const PHASE1_BASE = 100;   // her doğru blok yerleşimi (bloktaki hücre sayısıyla çarpılır)
const PHASE2_BASE = 50;    // her doğru element yerleşimi
const WRONG_PENALTY = 15;  // ufak bir kaza — ceza değil, "dağınıklık"

export default function PeriyodikTablo({ playerName, onScoreSubmit }: PeriyodikTabloProps) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [phase1Wrongs, setPhase1Wrongs] = useState(0);
  const [phase2Wrongs, setPhase2Wrongs] = useState(0);
  const [score, setScore] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [floats, setFloats] = useState<FloatingItem[]>([]);
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const fxIdRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  const spawnFloat = (x: number, y: number, text: string, color: string) => {
    const id = ++fxIdRef.current;
    setFloats((f) => [...f, { id, x, y, text, color }]);
  };
  const spawnBurst = (x: number, y: number, color: string) => {
    const id = ++fxIdRef.current;
    setBursts((b) => [...b, { id, x, y, color }]);
  };

  // Sayaç (sadece phase1/phase2 sırasında)
  useEffect(() => {
    if (screen !== "phase1" && screen !== "phase2") return;
    if (startTimeRef.current === null) startTimeRef.current = Date.now();
    const id = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [screen]);

  const handleStart = () => {
    setWrongAttempts(0);
    setPhase1Wrongs(0);
    setPhase2Wrongs(0);
    setScore(0);
    setElapsedSeconds(0);
    setCombo(0);
    setBestCombo(0);
    setFloats([]);
    setBursts([]);
    startTimeRef.current = Date.now();
    setScreen("phase1");
  };

  const handleWrong = (phase: 1 | 2, x: number, y: number) => {
    setWrongAttempts((w) => w + 1);
    if (phase === 1) setPhase1Wrongs((w) => w + 1);
    else setPhase2Wrongs((w) => w + 1);
    setCombo(0);
    spawnFloat(x, y - 20, "Vay!", "#ef4444");
  };

  const handleCorrect = (phase: 1 | 2, x: number, y: number, base: number) => {
    setCombo((c) => {
      const next = c + 1;
      setBestCombo((bc) => (next > bc ? next : bc));
      // multiplier: 1x, then +0.5 every 3 combo, max 3x
      const mult = Math.min(3, 1 + Math.floor(next / 3) * 0.5);
      const points = Math.round(base * mult);
      setScore((s) => s + points);
      const color = phase === 1 ? "#005C53" : "#9FC131";
      spawnFloat(x, y - 24, mult > 1 ? `+${points} ×${mult}` : `+${points}`, color);
      spawnBurst(x, y, color);
      return next;
    });
  };

  const handlePhase1Done = () => {
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 1800);
    setScreen("phase2");
  };

  const handlePhase2Done = async () => {
    // Skor zaten artımlı topluyor; sonunda hatalar için ufak kesinti uygula
    const penalty = wrongAttempts * WRONG_PENALTY;
    const finalScore = Math.max(0, score - penalty);
    setScore(finalScore);
    const finalElapsed = startTimeRef.current
      ? Math.floor((Date.now() - startTimeRef.current) / 1000)
      : elapsedSeconds;
    setElapsedSeconds(finalElapsed);
    setScreen("result");
    setShowConfetti(true);
    window.setTimeout(() => sfx.victory(), 200);
    window.setTimeout(() => setShowConfetti(false), 3500);

    if (onScoreSubmit) {
      setSubmitting(true);
      try {
        await onScoreSubmit({
          gameId: periyodikTabloConfig.id,
          score: finalScore,
          elapsedSeconds: finalElapsed,
          totalAttempts: 5 + 23 + wrongAttempts,
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  /** 0–3 yıldız */
  const stars = (() => {
    if (wrongAttempts === 0) return 3;
    if (wrongAttempts <= 3) return 2;
    if (wrongAttempts <= 6) return 1;
    return 0;
  })();

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    sfx.setMuted(next);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LabBackground />
      {showConfetti && <Confetti count={70} />}
      <FloatingFx items={floats} onDone={(id) => setFloats((f) => f.filter((x) => x.id !== id))} />
      {bursts.map((b) => (
        <ParticleBurst
          key={b.id}
          x={b.x}
          y={b.y}
          color={b.color}
          onDone={() => setBursts((arr) => arr.filter((x) => x.id !== b.id))}
        />
      ))}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8">
        {screen === "intro" && (
          <div className="space-y-6 rounded-2xl border-2 border-[#005C53]/15 bg-white p-8 shadow-sm">
            <div>
              <div className="inline-block rounded-full bg-[#9FC131]/20 px-3 py-1 text-xs font-bold text-[#005C53]">
                Fen Bilimleri • 8. Sınıf • FB.8.5.1.1
              </div>
              <h1 className="mt-3 text-3xl font-extrabold text-[#042940]">
                Periyodik Kaos 🧪
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#042940]/80">
                Lumo Laboratuvarı&apos;nda küçük bir patlama oldu. Periyodik tablo paramparça,
                elementler dört bir yana saçıldı! Elementlerin periyodik tablodaki yerlerini
                bilen tek kişi sensin. Önce bölgeleri yeniden işaretle, sonra dağılan
                elementleri yerine koy. Yoksa reaksiyonlar kontrolden çıkacak.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 border-[#005C53] bg-[#e6f5f3] p-4 text-sm text-[#042940]">
                <div className="mb-1 text-xs font-bold uppercase text-[#005C53]">Görev 1</div>
                <strong>Bölgeleri işaretle.</strong> Lego parçası gibi 5 madde grubunu
                tablonun doğru yerlerine yerleştir.
              </div>
              <div className="rounded-xl border-l-4 border-[#9FC131] bg-[#f9fce8] p-4 text-sm text-[#042940]">
                <div className="mb-1 text-xs font-bold uppercase text-[#6e8a22]">Görev 2</div>
                <strong>Elementleri kurtar.</strong> Tek tek beliren 23 elementi doğru
                hücreye taşı. Sembol var, ama atom numarası gizli — yerine koyunca açılacak.
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full rounded-xl bg-[#005C53] px-6 py-4 text-lg font-bold text-white shadow-md hover:bg-[#004d46] transition-colors"
            >
              Laboratuvara git
            </button>
          </div>
        )}

        {(screen === "phase1" || screen === "phase2") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
              <div className="text-sm font-bold text-[#042940]">
                {periyodikTabloConfig.title}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-lg bg-[#005C53] px-3 py-1 font-bold text-white">
                  {score} puan
                </span>
                {combo >= 2 && (
                  <span className="pt-combo-pop rounded-lg bg-gradient-to-r from-[#DBF227] to-[#9FC131] px-3 py-1 font-extrabold text-[#042940]">
                    {combo}× COMBO
                  </span>
                )}
                <span className="rounded-lg bg-[#e6f5f3] px-3 py-1 font-bold text-[#005C53]">
                  ⏱ {fmtTime(elapsedSeconds)}
                </span>
                <span className="rounded-lg bg-[#fff5f5] px-3 py-1 font-bold text-red-500">
                  💥 {wrongAttempts}
                </span>
                <button
                  onClick={toggleMute}
                  className="rounded-lg border border-[#005C53]/20 px-3 py-1 text-[#005C53] hover:bg-[#e6f5f3]"
                  title={muted ? "Sesi aç" : "Sesi kapat"}
                >
                  {muted ? "🔇" : "🔊"}
                </button>
              </div>
            </div>

            {screen === "phase1" && (
              <Phase1Blocks
                onComplete={handlePhase1Done}
                onWrongAttempt={(x, y) => handleWrong(1, x, y)}
                onCorrect={(x, y, blockSize) =>
                  handleCorrect(1, x, y, PHASE1_BASE * blockSize)
                }
              />
            )}
            {screen === "phase2" && (
              <Phase2Elements
                onComplete={handlePhase2Done}
                onWrongAttempt={(x, y) => handleWrong(2, x, y)}
                onCorrect={(x, y) => handleCorrect(2, x, y, PHASE2_BASE)}
              />
            )}

            <style>{`
              @keyframes pt-combo-pop {
                0% { transform: scale(0.8); }
                50% { transform: scale(1.15); }
                100% { transform: scale(1); }
              }
              .pt-combo-pop { animation: pt-combo-pop 0.3s ease-out; }
            `}</style>
          </div>
        )}

        {screen === "result" && (
          <div className="space-y-6 rounded-2xl border-2 border-[#005C53]/15 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">{stars === 3 ? "🏆" : stars === 2 ? "🎉" : stars === 1 ? "🔬" : "💪"}</div>
            <h2 className="text-2xl font-extrabold text-[#042940]">
              {stars === 3
                ? "Laboratuvar Mükemmel!"
                : stars === 2
                ? "Laboratuvar Restore Edildi"
                : stars === 1
                ? "Az Hasarla Atlattık"
                : "Tekrar Deneyelim"}
            </h2>

            {/* Yıldızlar */}
            <div className="flex justify-center gap-2 text-4xl">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={i <= stars ? "pt-star-in" : "opacity-20"}
                  style={{ animationDelay: `${i * 0.18}s` }}
                >
                  ⭐
                </span>
              ))}
            </div>

            {/* Anlatımsal rapor */}
            <div className="mx-auto max-w-md rounded-xl bg-[#f4faf9] p-4 text-left text-sm leading-relaxed text-[#042940]/85">
              <div className="mb-1 text-xs font-bold uppercase text-[#005C53]">📋 Görev Raporu</div>
              <ul className="space-y-1">
                <li>• 5 madde grubunu tabloya yerleştirdin</li>
                <li>• 23 elementi kurtardın</li>
                <li>
                  • {wrongAttempts === 0
                    ? "Hiç hata yapmadın — sıfır kaza!"
                    : `${wrongAttempts} ufak kaza geçirdik`}
                </li>
                <li>• En uzun combo serin: <strong>{bestCombo}×</strong></li>
                <li>• Toplam süre: <strong>{fmtTime(elapsedSeconds)}</strong></li>
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-[#005C53] p-4 text-white">
                <div className="text-xs opacity-80">Puan</div>
                <div className="text-3xl font-extrabold">{score}</div>
              </div>
              <div className="rounded-xl bg-[#f9fce8] p-4">
                <div className="text-xs text-[#042940]/60">En İyi Combo</div>
                <div className="text-3xl font-bold text-[#6e8a22]">{bestCombo}×</div>
              </div>
              <div className="rounded-xl bg-[#fff5f5] p-4">
                <div className="text-xs text-[#042940]/60">Kazalar</div>
                <div className="text-3xl font-bold text-red-500">{wrongAttempts}</div>
              </div>
            </div>

            {submitting && (
              <div className="text-xs text-[#042940]/50">Skor kaydediliyor…</div>
            )}
            <button
              onClick={handleStart}
              className="rounded-xl bg-[#005C53] px-6 py-3 font-bold text-white hover:bg-[#004d46]"
            >
              Tekrar Oyna
            </button>

            <style>{`
              @keyframes pt-star-in {
                0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                60% { transform: scale(1.3) rotate(20deg); opacity: 1; }
                100% { transform: scale(1) rotate(0); opacity: 1; }
              }
              .pt-star-in {
                display: inline-block;
                animation: pt-star-in 0.5s cubic-bezier(.2,.8,.3,1.2) both;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
