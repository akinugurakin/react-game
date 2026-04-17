"use client";

import React, { useEffect, useRef, useState } from "react";
import { esAnlamliHafizaConfig } from "./config";
import { pickRandomPairs, PAIRS_PER_GAME, type WordPair } from "./data";
import { Card } from "./components/Card";
import { LibraryBackground } from "./components/LibraryBackground";

type Screen = "intro" | "playing" | "result";

interface CardData {
  cardId: string;
  pairId: number;
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface EsAnlamliHafizaProps {
  playerName?: string;
  onScoreSubmit?: (data: {
    gameId: string;
    score: number;
    elapsedSeconds: number;
    totalAttempts: number;
  }) => Promise<void>;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(pairs: WordPair[]): CardData[] {
  const all: CardData[] = [];
  pairs.forEach((p) => {
    all.push({ cardId: `${p.id}-a`, pairId: p.id, word: p.wordA, isFlipped: false, isMatched: false });
    all.push({ cardId: `${p.id}-b`, pairId: p.id, word: p.wordB, isFlipped: false, isMatched: false });
  });
  return shuffle(all);
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
}

const MATCH_SCORE  = 100;
const WRONG_PENALTY = 10;
const TOTAL_PAIRS  = PAIRS_PER_GAME; // 10

// ── Ana Bileşen ───────────────────────────────────────────────────────────────

export default function EsAnlamliHafiza({ playerName, onScoreSubmit }: EsAnlamliHafizaProps) {
  const [screen, setScreen]             = useState<Screen>("intro");
  const [cards, setCards]               = useState<CardData[]>([]);
  const [selected, setSelected]         = useState<string[]>([]);
  const [wrongIds, setWrongIds]         = useState<string[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [totalFlips, setTotalFlips]     = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [score, setScore]               = useState(0);
  const [elapsed, setElapsed]           = useState(0);
  const [isChecking, setIsChecking]     = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const startRef = useRef<number | null>(null);

  // Sayaç
  useEffect(() => {
    if (screen !== "playing") return;
    const id = window.setInterval(() => {
      if (startRef.current) setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [screen]);

  const handleStart = () => {
    setCards(buildCards(pickRandomPairs()));
    setSelected([]);
    setWrongIds([]);
    setMatchedCount(0);
    setTotalFlips(0);
    setWrongAttempts(0);
    setScore(0);
    setElapsed(0);
    setIsChecking(false);
    startRef.current = Date.now();
    setScreen("playing");
  };

  const finishGame = (finalScore: number, finalFlips: number) => {
    const final = startRef.current ? Math.floor((Date.now() - startRef.current) / 1000) : 0;
    setElapsed(final);
    window.setTimeout(() => setScreen("result"), 700);
    if (onScoreSubmit) {
      setSubmitting(true);
      onScoreSubmit({ gameId: esAnlamliHafizaConfig.id, score: finalScore, elapsedSeconds: final, totalAttempts: finalFlips })
        .finally(() => setSubmitting(false));
    }
  };

  const handleCardClick = (cardId: string) => {
    if (isChecking) return;

    // Kart geçerli mi?
    const card = cards.find((c) => c.cardId === cardId);
    if (!card || card.isMatched || card.isFlipped) return;
    if (selected.includes(cardId) || selected.length >= 2) return;

    const newFlips = totalFlips + 1;
    setTotalFlips(newFlips);

    // Kartı aç
    const flipped = cards.map((c) => c.cardId === cardId ? { ...c, isFlipped: true } : c);
    const newSelected = [...selected, cardId];

    if (newSelected.length < 2) {
      // İlk kart seçildi — sadece aç ve bekle
      setCards(flipped);
      setSelected(newSelected);
      return;
    }

    // İkinci kart — eşleşme kontrolü
    const [id1, id2] = newSelected;
    const c1 = flipped.find((c) => c.cardId === id1)!;
    const c2 = flipped.find((c) => c.cardId === id2)!;

    if (c1.pairId === c2.pairId) {
      // ✅ Eşleşti
      const matched = flipped.map((c) =>
        c.cardId === id1 || c.cardId === id2 ? { ...c, isFlipped: false, isMatched: true } : c
      );
      const newScore = score + MATCH_SCORE;
      const newMatchedCount = matchedCount + 1;

      setCards(matched);
      setScore(newScore);
      setMatchedCount(newMatchedCount);
      setSelected([]);

      // Tüm çiftler bulundu mu?
      if (newMatchedCount === TOTAL_PAIRS) {
        finishGame(newScore, newFlips);
      }
    } else {
      // ❌ Eşleşmedi — kısa süre göster sonra kapat
      setCards(flipped);
      setSelected(newSelected);
      setIsChecking(true);
      setWrongIds([id1, id2]);
      window.setTimeout(() => {
        setCards((cs) => cs.map((c) =>
          c.cardId === id1 || c.cardId === id2 ? { ...c, isFlipped: false } : c
        ));
        setWrongAttempts((w) => w + 1);
        setScore((s) => Math.max(0, s - WRONG_PENALTY));
        setSelected([]);
        setWrongIds([]);
        setIsChecking(false);
      }, 900);
    }
  };

  const stars = wrongAttempts === 0 ? 3 : wrongAttempts <= 3 ? 2 : wrongAttempts <= 7 ? 1 : 0;
  const accuracy = totalFlips > 0
    ? Math.round((TOTAL_PAIRS / Math.max(TOTAL_PAIRS, totalFlips / 2)) * 100)
    : 100;

  // 3 satır × 4 sütun — iskambil oranı (2:3, yükseklik > genişlik)
  // row_h = (dvh - OFFSET - (ROWS-1)*GAP) / ROWS
  // col_w = row_h * 2/3
  // grid_w = COLS * col_w + (COLS-1) * GAP
  const ROWS   = 3;
  const COLS   = 4;
  const OFFSET = 108; // padding + HUD + gaps + progress bar
  const GAP    = 12;
  const rowHExpr = `(100dvh - ${OFFSET}px - ${(ROWS - 1) * GAP}px) / ${ROWS}`;
  const colW  = `calc((${rowHExpr}) * 2 / 3)`;
  const gridW = `calc(${COLS} * (${rowHExpr}) * 2 / 3 + ${(COLS - 1) * GAP}px)`;

  return (
    <div style={{ position: "relative", minHeight: "100dvh", overflow: "hidden" }}>
      <LibraryBackground />

      <div style={{ position: "relative", zIndex: 10, padding: "12px 16px" }}>

        {/* ── Giriş ── */}
        {screen === "intro" && (
          <div style={{ maxWidth: 680, margin: "40px auto", background: "white", borderRadius: 20, border: "2px solid rgba(0,92,83,0.12)", padding: 40, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "inline-block", borderRadius: 999, background: "rgba(159,193,49,0.18)", padding: "4px 14px", fontSize: 12, fontWeight: 700, color: "#005C53", marginBottom: 12 }}>
              Türkçe • 4-5. Sınıf • Eş Anlamlılar
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: "#042940", marginBottom: 10 }}>Eş Anlamlı Hafıza 📖</h1>
            <p style={{ fontSize: 15, color: "rgba(4,41,64,0.75)", lineHeight: 1.6, marginBottom: 24 }}>
              Kartların arkasında eş anlamlı kelimeler saklı! İki kart eş anlamlıysa eşleşir ve tabloda kalır.
              Her oyunda 163 kelime listesinden rastgele 6 çift seçilir.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Nasıl Oynanır?", color: "#005C53", bg: "#e6f5f3", text: "Bir kart aç, sonra bir tane daha. Eş anlamlılarsa kalır!" },
                { label: "Puan", color: "#6e8a22", bg: "#f9fce8", text: "Doğru eşleşme +100, her hata −10 puan." },
                { label: "Hedef", color: "#042940", bg: "#f0f4f8", text: "12 karttan 6 çifti bul. Hatasız = 3 yıldız!" },
              ].map((b) => (
                <div key={b.label} style={{ borderRadius: 14, borderLeft: `4px solid ${b.color}`, background: b.bg, padding: "14px 16px", fontSize: 13, color: "#042940" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: b.color, marginBottom: 4 }}>{b.label}</div>
                  {b.text}
                </div>
              ))}
            </div>
            {playerName && <p style={{ fontSize: 13, color: "rgba(4,41,64,0.45)", marginBottom: 16 }}>Hazır mısın, <strong>{playerName}</strong>? 🎯</p>}
            <button
              onClick={handleStart}
              style={{ width: "100%", borderRadius: 14, background: "#005C53", color: "white", fontWeight: 700, fontSize: 17, padding: "16px 0", border: "none", cursor: "pointer" }}
            >
              Oyunu Başlat
            </button>
          </div>
        )}

        {/* ── Oyun ── */}
        {screen === "playing" && (
          <div style={{ display: "flex", flexDirection: "column", height: `calc(100dvh - ${OFFSET - 84}px)`, gap: GAP }}>

            {/* HUD */}
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, background: "white", borderRadius: 14, padding: "10px 18px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#042940" }}>{esAnlamliHafizaConfig.title}</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { bg: "#005C53", color: "white",       text: `${score} puan` },
                  { bg: "#e6f5f3", color: "#005C53",     text: `✅ ${matchedCount}/${TOTAL_PAIRS}` },
                  { bg: "#f9fce8", color: "#6e8a22",     text: `⏱ ${fmtTime(elapsed)}` },
                  ...(wrongAttempts > 0 ? [{ bg: "#fff5f5", color: "#ef4444", text: `❌ ${wrongAttempts}` }] : []),
                ].map((b, i) => (
                  <span key={i} style={{ borderRadius: 8, background: b.bg, color: b.color, fontWeight: 700, fontSize: 13, padding: "5px 12px" }}>{b.text}</span>
                ))}
              </div>
            </div>

            {/* Kart ızgarası — 3 satır × 4 sütun, iskambil oranı, ortalanmış */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, ${colW})`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              gap: GAP,
              width: gridW,
              margin: "0 auto",
            }}>
              {cards.map((card) => (
                <div key={card.cardId} style={{ position: "relative" }}>
                  <Card
                    word={card.word}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    isWrong={wrongIds.includes(card.cardId)}
                    onClick={() => handleCardClick(card.cardId)}
                    disabled={isChecking || card.isFlipped || card.isMatched || selected.length >= 2}
                  />
                </div>
              ))}
            </div>

            {/* İlerleme çubuğu */}
            <div style={{ flexShrink: 0, height: 6, borderRadius: 999, overflow: "hidden", background: "rgba(0,92,83,0.1)" }}>
              <div style={{ height: "100%", borderRadius: 999, background: "#9FC131", width: `${(matchedCount / TOTAL_PAIRS) * 100}%`, transition: "width 0.5s" }} />
            </div>
          </div>
        )}

        {/* ── Sonuç ── */}
        {screen === "result" && (
          <div style={{ maxWidth: 560, margin: "40px auto", background: "white", borderRadius: 20, border: "2px solid rgba(0,92,83,0.12)", padding: 40, textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 52, marginBottom: 8 }}>{stars === 3 ? "🏆" : stars === 2 ? "🎉" : stars === 1 ? "💪" : "😅"}</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#042940", marginBottom: 16 }}>
              {stars === 3 ? "Mükemmel! Hatasız bitirdin!" : stars === 2 ? "Harika iş! Neredeyse mükemmeldi." : stars === 1 ? "İyi deneme! Tekrar dene." : "Biraz daha pratik yapalım!"}
            </h2>

            <div style={{ display: "flex", justifyContent: "center", gap: 12, fontSize: 44, marginBottom: 24 }}>
              {[1, 2, 3].map((i) => (
                <span key={i} className={i <= stars ? "star-in" : ""} style={{ opacity: i <= stars ? 1 : 0.2, animationDelay: `${i * 0.2}s` }}>⭐</span>
              ))}
            </div>

            <div style={{ background: "#f4faf9", borderRadius: 14, padding: "16px 20px", textAlign: "left", fontSize: 14, color: "rgba(4,41,64,0.8)", marginBottom: 20, lineHeight: 1.8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#005C53", marginBottom: 6 }}>📋 Oyun Özeti</div>
              <div>• 6 eş anlamlı çiftin hepsini buldun 🎯</div>
              <div>• {wrongAttempts === 0 ? "Hiç hata yapmadın — süpersonik hafıza!" : `${wrongAttempts} yanlış denemede düzelttik`}</div>
              <div>• Toplam süre: <strong>{fmtTime(elapsed)}</strong></div>
              <div>• Doğruluk oranı: <strong>%{accuracy}</strong></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[
                { bg: "#005C53", fg: "white",       label: "Puan",   val: String(score) },
                { bg: "#f9fce8", fg: "#6e8a22",     label: "Süre",   val: fmtTime(elapsed) },
                { bg: "#fff5f5", fg: "#ef4444",     label: "Hatalar",val: String(wrongAttempts) },
              ].map((c) => (
                <div key={c.label} style={{ background: c.bg, borderRadius: 14, padding: "14px 0" }}>
                  <div style={{ fontSize: 11, color: c.fg, opacity: 0.7 }}>{c.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: c.fg }}>{c.val}</div>
                </div>
              ))}
            </div>

            {submitting && <div style={{ fontSize: 12, color: "rgba(4,41,64,0.4)", marginBottom: 12 }}>Skor kaydediliyor…</div>}
            <button
              onClick={handleStart}
              style={{ width: "100%", borderRadius: 14, background: "#005C53", color: "white", fontWeight: 700, fontSize: 16, padding: "14px 0", border: "none", cursor: "pointer" }}
            >
              Tekrar Oyna
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes star-in {
          0%   { transform: scale(0) rotate(-200deg); opacity: 0; }
          60%  { transform: scale(1.3) rotate(15deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .star-in { display: inline-block; animation: star-in 0.5s cubic-bezier(.2,.8,.3,1.3) both; }
      `}</style>
    </div>
  );
}
