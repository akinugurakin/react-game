"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import wordBankData from "../word-bank.json";

// ─── Types ───────────────────────────────────────────────

interface Pair { a: string; b: string }

interface Fruit {
  id: number;
  text: string;
  pairIndex: number;
  slotIndex: number;
  state: "hanging" | "falling" | "gone";
  /** Where the fruit is falling towards — basket x% or ground */
  fallTarget: { x: number; landed: "basket" | "ground" } | null;
}

interface Basket {
  id: number;
  word: string;
  pairIndex: number;
  side: "a" | "b";
  x: number;
  matched: boolean;
  missed: boolean;
}

export interface GameResult {
  score: number;
  totalAttempts: number;
  correctMatches: number;
  elapsedSeconds: number;
}

interface Props { onComplete: (r: GameResult) => void }

// ─── Constants ───────────────────────────────────────────

const FRUIT_COUNT = 8;
const BASKET_SPEED = 0.08;          // very slow cruise
const BASKET_SPAWN_INTERVAL = 5000;
const TOTAL_BASKETS = 18;
const FALL_MS = 700;                // fruit fall duration
const REPLACE_DELAY = 900;          // wait before new fruit appears

// Fruit positions on tree (percentage of game area)
const FRUIT_SLOTS: { x: number; y: number }[] = [
  { x: 25, y: 14 }, { x: 45, y: 9 },
  { x: 65, y: 13 }, { x: 78, y: 22 },
  { x: 18, y: 30 }, { x: 40, y: 26 },
  { x: 60, y: 29 }, { x: 77, y: 38 },
];

const GROUND_Y = 88; // % where ground starts
const BASKET_Y = 82; // % where basket tops are

// ─── Helpers ─────────────────────────────────────────────

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

// ─── Component ───────────────────────────────────────────

export function GameBoard({ onComplete }: Props) {
  const pairs = useRef<Pair[]>(shuffle(wordBankData.pairs));
  const nxtFruit = useRef(0);
  const nxtBasket = useRef(0);
  const bQueue = useRef<number[]>([]);
  const spawnCnt = useRef(0);

  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [over, setOver] = useState(false);

  // Floating feedbacks (multiple can exist)
  const [feedbacks, setFeedbacks] = useState<
    { id: number; type: "correct" | "wrong" | "miss"; x: number; y: number; text: string }[]
  >([]);

  // Ref to always have current baskets in callbacks
  const basketsRef = useRef<Basket[]>([]);

  const sRef = useRef(0);   // score
  const stRef = useRef(0);  // streak
  const aRef = useRef(0);   // attempts
  const cRef = useRef(0);   // correct
  const t0 = useRef(0);
  const raf = useRef(0);
  const bTmr = useRef<ReturnType<typeof setInterval> | null>(null);
  const cTmr = useRef<ReturnType<typeof setInterval> | null>(null);
  const fbId = useRef(0);

  // Keep basketsRef in sync
  useEffect(() => { basketsRef.current = baskets; }, [baskets]);

  // ── Make a random fruit for a slot ──
  const mkFruit = useCallback((slot: number, excl: number[] = []): Fruit => {
    const pool = pairs.current.map((_, i) => i).filter((i) => !excl.includes(i));
    const pi = pool[Math.floor(Math.random() * pool.length)];
    const p = pairs.current[pi];
    return {
      id: nxtFruit.current++,
      text: Math.random() > 0.5 ? p.a : p.b,
      pairIndex: pi,
      slotIndex: slot,
      state: "hanging",
      fallTarget: null,
    };
  }, []);

  // ── Make a specific fruit (for guaranteeing correct answer on tree) ──
  const mkSpecificFruit = useCallback((slot: number, pairIndex: number, text: string): Fruit => {
    return {
      id: nxtFruit.current++,
      text,
      pairIndex,
      slotIndex: slot,
      state: "hanging",
      fallTarget: null,
    };
  }, []);

  const initFruits = useCallback(() => {
    const used: number[] = [];
    const f: Fruit[] = [];
    for (let i = 0; i < FRUIT_COUNT; i++) {
      const fr = mkFruit(i, used);
      used.push(fr.pairIndex);
      f.push(fr);
    }
    setFruits(f);
  }, [mkFruit]);

  // ── Basket queue ──
  const fillQ = useCallback(() => {
    bQueue.current = shuffle(Array.from({ length: pairs.current.length }, (_, i) => i));
  }, []);

  const spawn = useCallback(() => {
    if (spawnCnt.current >= TOTAL_BASKETS) return;
    if (bQueue.current.length === 0) fillQ();

    const pi = bQueue.current.pop()!;
    const p = pairs.current[pi];
    const side: "a" | "b" = Math.random() > 0.5 ? "a" : "b";
    const basketWord = side === "a" ? p.a : p.b;
    const correctFruitWord = side === "a" ? p.b : p.a; // eş anlamlısı

    // ALWAYS ensure the correct answer fruit is on the tree
    setFruits((prev) => {
      const updated = [...prev];

      // Check if tree already has the correct match hanging
      const alreadyHasMatch = updated.some(
        (f) => f.pairIndex === pi && f.state === "hanging"
      );

      if (!alreadyHasMatch) {
        // Find a hanging fruit slot to replace
        const hangingIndices = updated
          .map((f, i) => (f.state === "hanging" ? i : -1))
          .filter((i) => i >= 0);

        if (hangingIndices.length > 0) {
          const replaceIdx = hangingIndices[Math.floor(Math.random() * hangingIndices.length)];
          updated[replaceIdx] = mkSpecificFruit(
            updated[replaceIdx].slotIndex,
            pi,
            correctFruitWord
          );
        }
      }

      return updated;
    });

    spawnCnt.current++;
    setBaskets((prev) => [
      ...prev,
      { id: nxtBasket.current++, word: basketWord, pairIndex: pi, side, x: -20, matched: false, missed: false },
    ]);
  }, [fillQ, mkSpecificFruit]);

  // ── Game loop ──
  const loop = useCallback(() => {
    setBaskets((prev) => {
      let ch = false;
      const n = prev.map((b) => {
        if (b.matched || b.missed) return b;
        const nx = b.x + BASKET_SPEED;
        if (nx > 108) { ch = true; return { ...b, x: nx, missed: true }; }
        if (nx !== b.x) ch = true;
        return { ...b, x: nx };
      }).filter((b) => b.x < 130);
      return ch ? n : prev;
    });
    raf.current = requestAnimationFrame(loop);
  }, []);

  // ── Start ──
  const start = useCallback(() => {
    setStarted(true);
    t0.current = Date.now();
    initFruits();
    fillQ();
    cTmr.current = setInterval(() => setElapsed(Math.floor((Date.now() - t0.current) / 1000)), 1000);
    setTimeout(() => {
      spawn();
      bTmr.current = setInterval(() => { if (spawnCnt.current < TOTAL_BASKETS) spawn(); }, BASKET_SPAWN_INTERVAL);
    }, 600);
    raf.current = requestAnimationFrame(loop);
  }, [initFruits, fillQ, spawn, loop]);

  // ── Cleanup ──
  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (bTmr.current) clearInterval(bTmr.current);
    if (cTmr.current) clearInterval(cTmr.current);
  }, []);

  // ── Game over check ──
  useEffect(() => {
    if (!started || over) return;
    const allSpawned = spawnCnt.current >= TOTAL_BASKETS;
    const allDone = baskets.length > 0 && baskets.every((b) => b.matched || b.missed || b.x > 105);
    if (allSpawned && allDone) {
      setOver(true);
      cancelAnimationFrame(raf.current);
      if (bTmr.current) clearInterval(bTmr.current);
      if (cTmr.current) clearInterval(cTmr.current);
      const fe = Math.floor((Date.now() - t0.current) / 1000);
      const acc = aRef.current > 0 ? cRef.current / aRef.current : 0;
      const tb = Math.max(0, 1 - fe / 300);
      setTimeout(() => onComplete({
        score: Math.min(100, Math.max(0, Math.round((acc * 0.7 + tb * 0.3) * 100))),
        totalAttempts: aRef.current, correctMatches: cRef.current, elapsedSeconds: fe,
      }), 800);
    }
  }, [baskets, started, over, onComplete]);

  // ── Add floating feedback ──
  const addFeedback = useCallback((type: "correct" | "wrong" | "miss", x: number, y: number, text: string) => {
    const id = fbId.current++;
    setFeedbacks((prev) => [...prev, { id, type, x, y, text }]);
    setTimeout(() => setFeedbacks((prev) => prev.filter((f) => f.id !== id)), 1200);
  }, []);

  // ── Handle fruit click ──
  const handleClick = useCallback((fruit: Fruit) => {
    if (fruit.state !== "hanging" || over) return;

    aRef.current++;
    setAttempts(aRef.current);

    const slot = FRUIT_SLOTS[fruit.slotIndex];

    // Find matching basket currently on screen (within catchable range)
    const match = baskets.find(
      (b) => !b.matched && !b.missed && b.pairIndex === fruit.pairIndex && b.x > 5 && b.x < 85
    );

    if (match) {
      // ── CORRECT: fruit falls INTO the basket ──
      cRef.current++;
      setCorrect(cRef.current);
      stRef.current++;
      setStreak(stRef.current);
      const bonus = Math.min(stRef.current - 1, 5) * 2;
      const pts = 10 + bonus;
      sRef.current += pts;
      setScore(sRef.current);

      // Animate fruit falling toward basket position
      setFruits((prev) =>
        prev.map((f) =>
          f.id === fruit.id
            ? { ...f, state: "falling", fallTarget: { x: match.x, landed: "basket" } }
            : f
        )
      );
      setBaskets((prev) => prev.map((b) => (b.id === match.id ? { ...b, matched: true } : b)));
      addFeedback("correct", slot.x, slot.y, `+${pts}`);
    } else {
      // ── WRONG: fruit falls to ground ──
      stRef.current = 0;
      setStreak(0);

      setFruits((prev) =>
        prev.map((f) =>
          f.id === fruit.id
            ? { ...f, state: "falling", fallTarget: { x: slot.x, landed: "ground" } }
            : f
        )
      );
      addFeedback("wrong", slot.x, slot.y, "Eşleşen sepet yok!");
    }

    // Replace fruit after fall animation
    setTimeout(() => {
      setFruits((prev) => {
        const updated = [...prev];
        const fallenIdx = updated.findIndex((f) => f.id === fruit.id);
        if (fallenIdx === -1) return prev;

        const hangingPairs = updated
          .filter((f, i) => f.state === "hanging" && i !== fallenIdx)
          .map((f) => f.pairIndex);

        // Check if any active basket needs its answer on the tree
        const activeBaskets = basketsRef.current.filter(
          (b) => !b.matched && !b.missed && b.x > -15 && b.x < 100
        );

        // Find a basket whose answer is NOT on the tree
        const needyBasket = activeBaskets.find(
          (b) => !hangingPairs.includes(b.pairIndex)
        );

        if (needyBasket) {
          // Place the correct answer for this basket
          const p = pairs.current[needyBasket.pairIndex];
          const correctWord = needyBasket.side === "a" ? p.b : p.a;
          updated[fallenIdx] = mkSpecificFruit(
            fruit.slotIndex,
            needyBasket.pairIndex,
            correctWord
          );
        } else {
          // No basket needs help — place a random fruit
          const used = hangingPairs;
          updated[fallenIdx] = mkFruit(fruit.slotIndex, used);
        }

        return updated;
      });
    }, FALL_MS + REPLACE_DELAY);
  }, [baskets, over, mkFruit, mkSpecificFruit, addFeedback]);

  // ── Render ──

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const prog = started ? Math.min(100, (baskets.filter((b) => b.matched || b.missed).length / TOTAL_BASKETS) * 100) : 0;

  if (!started) {
    return (
      <div className="flex items-center justify-center" style={{ height: "calc(100vh - 60px)" }}>
        <button type="button" onClick={start}
          className="px-10 py-4 bg-primary text-primary-foreground font-extrabold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95">
          Başla!
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 w-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-primary">{score}</span>
          <span className="text-xs text-muted-foreground font-medium">puan</span>
          {streak >= 2 && (
            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full animate-pulse">
              {streak}x seri!
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">{correct}/{TOTAL_BASKETS}</span>
          <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {mins}:{secs.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mx-auto">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700" style={{ width: `${prog}%` }} />
      </div>

      {/* ── Game Area ── */}
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: "calc(100vh - 90px)" }}>
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#7EC8E3] via-[#ADE4F0] to-[#D4F1D8]" />

        {/* Sun with glow */}
        <div className="absolute top-[3%] right-[7%]">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-[0_0_40px_12px_rgba(253,224,71,0.3)]" />
        </div>

        {/* Clouds */}
        <div className="absolute top-[6%] left-[5%] flex gap-0">
          <div className="w-12 h-7 bg-white/70 rounded-full" />
          <div className="w-16 h-9 bg-white/80 rounded-full -ml-4 -mt-1" />
          <div className="w-10 h-6 bg-white/60 rounded-full -ml-3 mt-1" />
        </div>
        <div className="absolute top-[10%] right-[20%] flex gap-0">
          <div className="w-10 h-6 bg-white/50 rounded-full" />
          <div className="w-14 h-8 bg-white/60 rounded-full -ml-3 -mt-1" />
        </div>

        {/* Distant hills */}
        <div className="absolute bottom-[12%] left-0 right-0 h-[18%]">
          <div className="absolute bottom-0 left-[-8%] w-[50%] h-full bg-[#7BC67E]/30 rounded-[50%]" />
          <div className="absolute bottom-0 right-[-8%] w-[55%] h-full bg-[#7BC67E]/20 rounded-[50%]" />
          <div className="absolute bottom-0 left-[30%] w-[40%] h-[80%] bg-[#7BC67E]/25 rounded-[50%]" />
        </div>

        {/* ── Tree (SVG) ── */}
        <svg
          viewBox="0 0 400 500"
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[85%]"
          style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.12))" }}
        >
          <defs>
            <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5C3A1E" />
              <stop offset="30%" stopColor="#7A5033" />
              <stop offset="70%" stopColor="#7A5033" />
              <stop offset="100%" stopColor="#5C3A1E" />
            </linearGradient>
            <radialGradient id="crown1" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#5CD87A" />
              <stop offset="100%" stopColor="#2E8B46" />
            </radialGradient>
            <radialGradient id="crown2" cx="40%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#4FD47A" />
              <stop offset="100%" stopColor="#2A7D3E" />
            </radialGradient>
            <radialGradient id="crownHL" cx="35%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#8AEEA0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#5CD87A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Roots */}
          <path d="M170 430 Q140 445 110 460" stroke="#5C3A1E" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M230 430 Q260 445 290 460" stroke="#5C3A1E" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M190 435 Q175 455 160 470" stroke="#5C3A1E" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Trunk */}
          <path d="M175 280 Q172 350 168 430 L232 430 Q228 350 225 280 Z" fill="url(#trunk)" />
          {/* Trunk knots */}
          <ellipse cx="195" cy="340" rx="8" ry="5" fill="#5C3A1E" opacity="0.3" />
          <ellipse cx="210" cy="380" rx="6" ry="4" fill="#5C3A1E" opacity="0.25" />
          {/* Bark texture */}
          <path d="M185 290 Q183 330 186 370" stroke="#5C3A1E" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M215 295 Q217 335 214 375" stroke="#5C3A1E" strokeWidth="1" fill="none" opacity="0.2" />

          {/* Main branches */}
          <path d="M178 290 Q130 270 85 240" stroke="#6B4226" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M222 285 Q270 265 320 235" stroke="#6B4226" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M180 310 Q145 295 105 280" stroke="#6B4226" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M220 308 Q255 292 300 275" stroke="#6B4226" strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* Upper branches */}
          <path d="M185 270 Q155 245 125 215" stroke="#6B4226" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M215 268 Q245 242 280 210" stroke="#6B4226" strokeWidth="7" fill="none" strokeLinecap="round" />

          {/* Crown — multiple layered ellipses for organic look */}
          <ellipse cx="200" cy="165" rx="175" ry="150" fill="url(#crown2)" />
          <ellipse cx="120" cy="190" rx="95" ry="80" fill="#34A053" />
          <ellipse cx="280" cy="190" rx="95" ry="80" fill="#34A053" />
          <ellipse cx="200" cy="140" rx="130" ry="110" fill="url(#crown1)" />
          <ellipse cx="150" cy="120" rx="70" ry="55" fill="#43C46A" opacity="0.7" />
          <ellipse cx="250" cy="125" rx="65" ry="50" fill="#43C46A" opacity="0.6" />
          <ellipse cx="200" cy="100" rx="80" ry="55" fill="#4FD47A" opacity="0.5" />
          {/* Highlight */}
          <ellipse cx="170" cy="95" rx="50" ry="35" fill="url(#crownHL)" />
          <ellipse cx="240" cy="105" rx="40" ry="28" fill="url(#crownHL)" />

          {/* Small leaf clusters at edges */}
          <circle cx="50" cy="200" r="22" fill="#38A85C" opacity="0.5" />
          <circle cx="350" cy="195" r="20" fill="#38A85C" opacity="0.5" />
          <circle cx="80" cy="145" r="18" fill="#43C46A" opacity="0.4" />
          <circle cx="320" cy="140" r="18" fill="#43C46A" opacity="0.4" />
        </svg>

        {/* ── Fruits ── */}
        {fruits.map((fruit) => {
          const slot = FRUIT_SLOTS[fruit.slotIndex];
          const isFalling = fruit.state === "falling";
          const isGone = fruit.state === "gone";
          if (isGone) return null;

          // Calculate fall destination
          let fallStyle: React.CSSProperties = {};
          if (isFalling && fruit.fallTarget) {
            const targetY = fruit.fallTarget.landed === "basket" ? BASKET_Y : GROUND_Y;
            fallStyle = {
              left: `${fruit.fallTarget.x}%`,
              top: `${targetY}%`,
              opacity: fruit.fallTarget.landed === "ground" ? 0.4 : 0,
              transform: fruit.fallTarget.landed === "ground"
                ? "scale(0.7) rotate(15deg)"
                : "scale(0.5)",
              transition: `all ${FALL_MS}ms cubic-bezier(0.4, 0, 0.9, 0.6)`,
            };
          }

          return (
            <button
              key={fruit.id}
              type="button"
              onClick={() => handleClick(fruit)}
              disabled={fruit.state !== "hanging" || over}
              className={`
                absolute z-20
                flex items-center justify-center
                text-sm sm:text-base font-bold text-white
                rounded-2xl px-3 py-2
                min-w-[56px] min-h-[44px]
                ${fruit.state === "hanging"
                  ? "bg-gradient-to-br from-rose-400 via-red-500 to-red-600 shadow-lg hover:shadow-xl hover:scale-110 hover:brightness-110 active:scale-95 cursor-pointer transition-transform duration-150"
                  : "pointer-events-none"
                }
              `}
              style={
                isFalling
                  ? fallStyle
                  : {
                      left: `${slot.x}%`,
                      top: `${slot.y}%`,
                      transition: "none",
                    }
              }
            >
              {/* Stem + leaf */}
              {fruit.state === "hanging" && (
                <>
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-green-700 rounded-full" />
                  <span className="absolute -top-2 left-[55%] w-3 h-2 bg-green-600 rounded-full rotate-45 origin-bottom-left" />
                </>
              )}
              {fruit.text}
            </button>
          );
        })}

        {/* ── Floating feedbacks ── */}
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className={`absolute z-40 pointer-events-none font-extrabold text-base whitespace-nowrap
              ${fb.type === "correct" ? "text-green-500" : "text-red-400"}
            `}
            style={{
              left: `${fb.x}%`,
              top: `${fb.y}%`,
              animation: "floatUp 1.2s ease-out forwards",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            {fb.text}
          </div>
        ))}

        {/* ── Ground ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[13%] bg-gradient-to-t from-[#3D6B35] via-[#4E8A42] to-[#68B058] rounded-b-2xl" />

        {/* Flowers on ground */}
        <div className="absolute bottom-[10%] left-[8%] text-lg">🌸</div>
        <div className="absolute bottom-[10%] left-[25%] text-sm">🌼</div>
        <div className="absolute bottom-[10%] right-[12%] text-lg">🌸</div>
        <div className="absolute bottom-[10%] right-[30%] text-sm">🌻</div>

        {/* ── Path for baskets ── */}
        <div className="absolute bottom-[1%] left-0 right-0 h-[10%] bg-gradient-to-t from-[#C4A46C]/50 to-[#D2B48C]/30 rounded-b-2xl border-t border-[#B8964A]/20" />

        {/* ── Baskets ── */}
        {baskets.map((basket) => {
          if (basket.x > 120) return null;
          return (
            <div
              key={basket.id}
              className={`absolute z-30 bottom-[0.5%] flex flex-col items-center
                ${basket.matched ? "transition-all duration-500 opacity-0 scale-75" : ""}
                ${basket.missed && !basket.matched ? "opacity-20" : ""}
              `}
              style={{ left: `${basket.x}%`, transform: "translateX(-50%)" }}
            >
              <svg width="120" height="65" viewBox="0 0 80 46" className="drop-shadow-lg">
                <defs>
                  <linearGradient id={`bg${basket.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8C88A" />
                    <stop offset="100%" stopColor="#C49A56" />
                  </linearGradient>
                </defs>
                {/* Handle */}
                <path d="M22 12 Q40 -6 58 12" stroke="#B08650" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Body */}
                <path d="M8 14 L14 42 Q40 48 66 42 L72 14 Z" fill={`url(#bg${basket.id})`} stroke="#A0784C" strokeWidth="1.5" />
                {/* Weave */}
                <line x1="12" y1="22" x2="68" y2="22" stroke="#B08650" strokeWidth="0.8" opacity="0.4" />
                <line x1="13" y1="30" x2="67" y2="30" stroke="#B08650" strokeWidth="0.8" opacity="0.4" />
                <line x1="14" y1="38" x2="66" y2="38" stroke="#B08650" strokeWidth="0.8" opacity="0.4" />
                <line x1="30" y1="15" x2="28" y2="42" stroke="#B08650" strokeWidth="0.6" opacity="0.3" />
                <line x1="50" y1="15" x2="52" y2="42" stroke="#B08650" strokeWidth="0.6" opacity="0.3" />
                {/* Rim */}
                <rect x="5" y="11" width="70" height="5" rx="2.5" fill="#B08650" />
              </svg>
              <span className={`absolute top-[24px] left-1/2 -translate-x-1/2 text-xs sm:text-sm font-extrabold whitespace-nowrap
                ${basket.matched ? "text-green-600" : "text-amber-900"}
              `}>
                {basket.word}
              </span>
            </div>
          );
        })}
      </div>

      {/* Instruction */}
      <p className="text-center text-xs text-muted-foreground px-2">
        Sepetteki kelimenin <span className="font-semibold text-foreground">eş anlamlısını</span> ağaçtan seç — sepet geçmeden yakala!
      </p>
    </div>
  );
}
