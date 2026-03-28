"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Brain, CheckCircle, XCircle, Delete, Check, Star, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

// --- Types ---
type GamePhase = "name" | "countdown" | "playing" | "result";
type QuestionType = "normal" | "reverse";

interface Question {
  a: number;
  b: number;
  answer: number;
  type: QuestionType;
}

interface GameResult {
  correct: number;
  wrong: number;
  time: number;
  score: number;
}

interface Champion {
  name: string;
  score: number;
  correct: number;
  time: number;
}

const TOTAL_QUESTIONS = 10;
const COUNTDOWN_FROM = 5;

// --- Question Generator ---
function generateQuestion(): Question {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  const type: QuestionType = Math.random() > 0.3 ? "normal" : "reverse";
  return { a, b, answer: a * b, type };
}

function generateQuestions(): Question[] {
  return Array.from({ length: TOTAL_QUESTIONS }, generateQuestion);
}

// --- Confetti ---
function Confetti() {
  const colors = ["#6366f1", "#a855f7", "#f59e0b", "#10b981", "#ec4899", "#3b82f6"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: "-5%",
          }}
          animate={{
            y: [0, window?.innerHeight || 800],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// --- Numpad ---
function Numpad({
  onNumber,
  onDelete,
  onSubmit,
  disabled,
}: {
  onNumber: (n: number) => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((n) => (
        <button
          key={n}
          onClick={() => onNumber(n)}
          disabled={disabled}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border-2 border-gray-100 text-xl font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-200 active:scale-95 disabled:opacity-40"
        >
          {n}
        </button>
      ))}
      <button
        onClick={onDelete}
        disabled={disabled}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-400 text-white shadow-sm transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-40"
      >
        <Delete className="h-5 w-5" />
      </button>
      <button
        onClick={() => onNumber(0)}
        disabled={disabled}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border-2 border-gray-100 text-xl font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40"
      >
        0
      </button>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-400 text-white shadow-sm transition-all hover:bg-emerald-500 active:scale-95 disabled:opacity-40"
      >
        <Check className="h-6 w-6" />
      </button>
    </div>
  );
}

// --- Champions Panel ---
function ChampionsPanel({ champions }: { champions: Champion[] }) {
  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
      <div className="mb-3 flex items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-1.5">
        <Trophy className="h-4 w-4 text-amber-900" />
        <span className="text-sm font-bold text-amber-900">Şampiyonlar</span>
      </div>
      <div className="space-y-2">
        {champions.length === 0 && (
          <p className="text-center text-sm text-amber-600">Henüz kimse oynamadı</p>
        )}
        {champions.slice(0, 5).map((c, i) => (
          <div key={i} className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm">
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white",
              i === 0 ? "bg-amber-400" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-400" : "bg-gray-300"
            )}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{c.name}</p>
              <p className="text-[10px] text-muted-foreground">
                ✅ {c.correct}/{TOTAL_QUESTIONS} ⏱ {c.time}s
              </p>
            </div>
            <span className="text-lg font-extrabold text-amber-600">{c.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Component ---
export function MathQuiz() {
  const authUser = useAuthStore((s) => s.user);
  const [phase, setPhase] = useState<GamePhase>("name");
  const [playerName, setPlayerName] = useState(authUser?.username || "");
  const [countdown, setCountdown] = useState(COUNTDOWN_FROM);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<GameResult | null>(null);
  const [lastAnswer, setLastAnswer] = useState<{ correct: boolean; value: string } | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated, accessToken } = useAuthStore();

  // Load champions — API'den veya localStorage'dan
  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await api.get<Champion[]>("/games/1/leaderboard");
        if (data.length > 0) {
          setChampions(data.map((d: any) => ({
            name: d.username,
            score: d.score,
            correct: d.correct_count,
            time: d.duration_seconds,
          })));
          return;
        }
      } catch {}
      // Fallback: localStorage
      const saved = localStorage.getItem("math-champions");
      if (saved) setChampions(JSON.parse(saved));
    }
    loadLeaderboard();
  }, []);

  // Save champion — API + localStorage
  const saveChampion = useCallback(async (entry: Champion) => {
    // localStorage'a kaydet
    setChampions((prev) => {
      const next = [...prev, entry].sort((a, b) => b.score - a.score).slice(0, 10);
      localStorage.setItem("math-champions", JSON.stringify(next));
      return next;
    });

    // Giriş yapmışsa API'ye de kaydet
    if (isAuthenticated && accessToken) {
      try {
        await api.post("/games/1/session", {
          game_id: 1,
          score: entry.score,
          correct_count: entry.correct,
          wrong_count: TOTAL_QUESTIONS - entry.correct,
          duration_seconds: entry.time,
        }, accessToken);
      } catch (err) {
        // Sessizce geç — localStorage'da zaten kaydedildi
      }
    }
  }, [isAuthenticated, accessToken]);

  // Timer
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, startTime]);

  // Countdown
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      setPhase("playing");
      setStartTime(Date.now());
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  // Keyboard input
  useEffect(() => {
    if (phase !== "playing") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") handleNumber(parseInt(e.key));
      else if (e.key === "Backspace") handleDelete();
      else if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const startGame = () => {
    if (!playerName.trim()) return;
    setQuestions(generateQuestions());
    setCurrentQ(0);
    setCorrectCount(0);
    setWrongCount(0);
    setInput("");
    setElapsed(0);
    setResult(null);
    setLastAnswer(null);
    setCountdown(COUNTDOWN_FROM);
    setPhase("countdown");
  };

  const handleNumber = (n: number) => {
    if (input.length >= 3) return;
    setInput((prev) => prev + n);
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!input) return;
    const q = questions[currentQ];
    const userAnswer = parseInt(input);
    let correctAnswer: number;

    if (q.type === "normal") {
      correctAnswer = q.answer;
    } else {
      correctAnswer = q.a;
    }

    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((c) => c + 1);
    }

    setLastAnswer({ correct: isCorrect, value: input });

    // Next question or end
    setTimeout(() => {
      setLastAnswer(null);
      setInput("");

      if (currentQ + 1 >= TOTAL_QUESTIONS) {
        // End game
        if (timerRef.current) clearInterval(timerRef.current);
        const finalTime = Math.floor((Date.now() - startTime) / 1000);
        const finalCorrect = correctCount + (isCorrect ? 1 : 0);
        const score = Math.max(0, Math.round(finalCorrect * 10 - finalTime * 0.1));
        const gameResult: GameResult = {
          correct: finalCorrect,
          wrong: wrongCount + (isCorrect ? 0 : 1),
          time: finalTime,
          score,
        };
        setResult(gameResult);
        saveChampion({
          name: playerName,
          score,
          correct: finalCorrect,
          time: finalTime,
        });
        setPhase("result");
      } else {
        setCurrentQ((c) => c + 1);
      }
    }, 600);
  };

  const playAgain = () => {
    setPhase("name");
    setInput("");
  };

  // Current question
  const q = questions[currentQ];

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="grid w-full max-w-5xl gap-4 lg:grid-cols-[200px_1fr_220px]">

        {/* === SOL PANEL — Logo === */}
        <div className="hidden lg:flex flex-col items-center justify-center rounded-3xl bg-indigo-50 border border-indigo-100 p-6">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 text-white">
            <Brain className="h-8 w-8" />
          </div>
          <h3 className="text-center text-lg font-extrabold text-indigo-700">
            Matematik Macerası!
          </h3>
          <p className="mt-1 text-center text-xs text-indigo-400">
            Eğlenerek öğren
          </p>
        </div>

        {/* === ORTA PANEL === */}
        <div className="relative min-h-[500px] overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm">
          <AnimatePresence mode="wait">

            {/* İSİM GİRİŞİ */}
            {phase === "name" && (
              <motion.div
                key="name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex h-full min-h-[500px] flex-col items-center justify-center p-8"
              >
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                  <span className="text-2xl">👤</span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-800">Kim Oynuyor?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Adını yaz ve soruya başla!</p>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && startGame()}
                  placeholder="Adını Buraya Yaz"
                  className="mt-6 w-full max-w-xs rounded-xl border-2 border-indigo-200 px-4 py-3 text-center text-lg font-medium text-gray-700 placeholder:text-indigo-300 focus:border-indigo-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={startGame}
                  disabled={!playerName.trim()}
                  className="mt-6 rounded-xl bg-indigo-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  BAŞLA →
                </button>
              </motion.div>
            )}

            {/* GERİ SAYIM */}
            {phase === "countdown" && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[500px] flex-col items-center justify-center bg-indigo-500 rounded-3xl"
              >
                <h2 className="text-2xl font-extrabold text-white">
                  Hazır Ol, {playerName}!
                </h2>
                <motion.span
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="mt-6 text-8xl font-extrabold text-amber-400"
                >
                  {countdown}
                </motion.span>
              </motion.div>
            )}

            {/* OYUN */}
            {phase === "playing" && q && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[500px] flex-col"
              >
                {/* Üst bar */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">👤</span>
                    <span className="font-bold text-sm">{playerName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle className="h-4 w-4" /> {correctCount}
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="h-4 w-4" /> {wrongCount}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs">
                      ⏱ {elapsed}s
                    </span>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
                      📝 {currentQ + 1}/{TOTAL_QUESTIONS}
                    </span>
                  </div>
                </div>

                {/* Soru + Numpad */}
                <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6 lg:flex-row">
                  {/* Numpad (sol) */}
                  <div className="order-2 lg:order-1">
                    {/* Cevap göstergesi */}
                    <div className="mb-4 flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Cevabın</span>
                      <div className={cn(
                        "flex h-16 w-20 items-center justify-center rounded-xl border-2 text-3xl font-extrabold transition-colors",
                        lastAnswer
                          ? lastAnswer.correct
                            ? "border-emerald-400 bg-emerald-50 text-emerald-600"
                            : "border-red-400 bg-red-50 text-red-600"
                          : "border-gray-200 bg-gray-50 text-gray-800"
                      )}>
                        {input || "—"}
                        {lastAnswer && (
                          <span className="ml-1 text-lg">
                            {lastAnswer.correct ? "✓" : "✗"}
                          </span>
                        )}
                      </div>
                    </div>
                    <Numpad
                      onNumber={handleNumber}
                      onDelete={handleDelete}
                      onSubmit={handleSubmit}
                      disabled={!!lastAnswer}
                    />
                  </div>

                  {/* Soru (orta) */}
                  <div className="order-1 lg:order-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQ}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1 text-6xl font-extrabold lg:text-7xl"
                      >
                        {q.type === "normal" ? (
                          <>
                            <span className="text-indigo-600">{q.a}</span>
                            <span className="text-gray-400">×</span>
                            <span className="text-purple-600">{q.b}</span>
                            <span className="text-gray-400">=</span>
                            <span className="text-amber-500">?</span>
                          </>
                        ) : (
                          <>
                            <span className="text-amber-500">?</span>
                            <span className="text-gray-400">×</span>
                            <span className="text-purple-600">{q.b}</span>
                            <span className="text-gray-400">=</span>
                            <span className="text-indigo-600">{q.answer}</span>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    {/* Noktalı cevap çizgisi */}
                    <div className="mt-3 flex justify-center">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-2 w-2 rounded-full transition-colors",
                              i < input.length ? "bg-amber-400" : "bg-gray-200"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SONUÇ */}
            {phase === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="relative flex h-full min-h-[500px] flex-col items-center justify-center p-8"
              >
                <Confetti />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-5xl">🏆</span>
                  <h2 className="mt-3 text-3xl font-extrabold text-gray-800">Harika İş!</h2>
                  <p className="text-lg text-muted-foreground">{playerName}</p>

                  {/* Doğru / Yanlış */}
                  <div className="mt-6 flex gap-4">
                    <div className="flex h-20 w-28 flex-col items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <span className="text-3xl font-extrabold">{result.correct}</span>
                      <span className="text-xs font-bold uppercase">Doğru</span>
                    </div>
                    <div className="flex h-20 w-28 flex-col items-center justify-center rounded-2xl bg-red-100 text-red-600">
                      <span className="text-3xl font-extrabold">{result.wrong}</span>
                      <span className="text-xs font-bold uppercase">Yanlış</span>
                    </div>
                  </div>

                  {/* Süre + Puan */}
                  <div className="mt-4 flex gap-6 text-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Süre</p>
                      <p className="text-2xl font-extrabold">{result.time}s</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Puan</p>
                      <p className="text-2xl font-extrabold text-indigo-600">{result.score}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">&nbsp;</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "h-6 w-6",
                              result.correct >= s * 3
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={playAgain}
                    className="mt-8 flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-indigo-600 active:scale-95"
                  >
                    Yeniden Oyna <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* === SAĞ PANEL — Şampiyonlar === */}
        <div className="hidden lg:block">
          <ChampionsPanel champions={champions} />
        </div>
      </div>
    </div>
  );
}
