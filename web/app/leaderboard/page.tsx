"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Flame, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface LeaderboardPlayer {
  rank: number;
  username: string;
  score: number;
  correct_count: number;
  duration_seconds: number;
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
  return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
}

function getRankBg(rank: number) {
  if (rank === 1) return "bg-amber-50 border-amber-200";
  if (rank === 2) return "bg-gray-50 border-gray-200";
  if (rank === 3) return "bg-orange-50 border-orange-200";
  return "";
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

const gradients = [
  "from-amber-500 to-orange-400",
  "from-rose-500 to-pink-400",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-400",
  "from-blue-500 to-cyan-400",
  "from-indigo-500 to-blue-400",
  "from-pink-500 to-rose-400",
  "from-teal-500 to-emerald-400",
  "from-purple-500 to-violet-400",
  "from-cyan-500 to-blue-400",
];

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWithRetry(retries = 3): Promise<any[]> {
      for (let i = 0; i < retries; i++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          const res = await fetch("https://react-game-api.onrender.com/games/1/leaderboard", {
            signal: controller.signal,
            cache: "no-store",
          });
          clearTimeout(timeout);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          if (i === retries - 1) throw err;
          await new Promise(r => setTimeout(r, 2000));
        }
      }
      return [];
    }

    async function fetchLeaderboard() {
      try {
        const data = await fetchWithRetry();
        if (Array.isArray(data) && data.length > 0) {
          setPlayers(
            data.map((d: any, i: number) => ({
              rank: i + 1,
              username: d.username,
              score: d.score,
              correct_count: d.correct_count,
              duration_seconds: d.duration_seconds,
            }))
          );
        } else {
          setError("API boş veri döndü (length: " + (data?.length ?? "null") + ")");
        }
      } catch (err: any) {
        setError(err?.message || "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center"
          >
            <div className="mb-4 flex justify-center">
              <Trophy className="h-12 w-12 text-amber-400" />
            </div>
            <h1 className="text-3xl font-extrabold">Liderlik Tablosu</h1>
            <p className="mt-1 text-muted-foreground">
              En iyi oyuncular burada!
            </p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Veriler yükleniyor...</p>
            </div>
          ) : players.length === 0 ? (
            <div className="py-20 text-center">
              <Trophy className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
              <h2 className="text-xl font-bold text-muted-foreground">Henüz kimse oynamamış</h2>
              <p className="mt-2 text-muted-foreground">İlk skor sana ait olabilir!</p>
              {error && <p className="mt-4 text-sm text-red-500">Hata: {error}</p>}
            </div>
          ) : (
            <>
              {/* Top 3 */}
              {players.length >= 3 && (
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                  {players.slice(0, 3).map((player, index) => (
                    <motion.div
                      key={`top-${player.rank}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className={cn(index === 0 && "sm:order-2", index === 1 && "sm:order-1", index === 2 && "sm:order-3")}
                    >
                      <Card className={cn("text-center", getRankBg(player.rank))}>
                        <CardContent className="p-6">
                          <div className="mb-3 flex justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                          <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradients[index]} text-xl font-bold text-white ring-2 ring-background`}>
                            {getInitials(player.username)}
                          </div>
                          <h3 className="font-bold">{player.username}</h3>
                          <p className="text-2xl font-extrabold text-primary">
                            {player.score.toLocaleString("tr-TR")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ✅ {player.correct_count}/10 • ⏱ {player.duration_seconds}s
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Rest of list */}
              {players.length > 3 && (
                <Card>
                  <CardContent className="divide-y p-0">
                    {players.slice(3).map((player, index) => (
                      <motion.div
                        key={`rest-${player.rank}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex w-8 justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradients[(player.rank - 1) % gradients.length]} text-sm font-bold text-white`}>
                            {getInitials(player.username)}
                          </div>
                          <div>
                            <p className="font-semibold">{player.username}</p>
                            <p className="text-xs text-muted-foreground">
                              ✅ {player.correct_count}/10 • ⏱ {player.duration_seconds}s
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-bold">
                          {player.score.toLocaleString("tr-TR")}
                        </p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
