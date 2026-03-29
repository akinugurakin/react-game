"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

type Period = "weekly" | "alltime";

const leaderboardData = [
  { rank: 1, username: "matKral42", score: 12850, games: 156, avatar: "MK", photo: "https://i.pravatar.cc/150?img=11" },
  { rank: 2, username: "zeynepOyun", score: 11200, games: 134, avatar: "ZO", photo: "https://i.pravatar.cc/150?img=5" },
  { rank: 3, username: "aliCoder", score: 10750, games: 128, avatar: "AC", photo: "https://i.pravatar.cc/150?img=8" },
  { rank: 4, username: "elifStar", score: 9800, games: 115, avatar: "ES", photo: "https://i.pravatar.cc/150?img=9" },
  { rank: 5, username: "canBey", score: 9350, games: 108, avatar: "CB", photo: "https://i.pravatar.cc/150?img=12" },
  { rank: 6, username: "defneGamer", score: 8900, games: 99, avatar: "DG", photo: "https://i.pravatar.cc/150?img=25" },
  { rank: 7, username: "emreTop", score: 8400, games: 92, avatar: "ET", photo: "https://i.pravatar.cc/150?img=33" },
  { rank: 8, username: "sudeMatch", score: 7950, games: 87, avatar: "SM", photo: "https://i.pravatar.cc/150?img=16" },
  { rank: 9, username: "burakWin", score: 7500, games: 81, avatar: "BW", photo: "https://i.pravatar.cc/150?img=53" },
  { rank: 10, username: "melisPro", score: 7100, games: 76, avatar: "MP", photo: "https://i.pravatar.cc/150?img=23" },
];

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

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("weekly");

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

          {/* Period Toggle */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-muted p-1">
              <Button
                variant={period === "weekly" ? "default" : "ghost"}
                size="sm"
                className="rounded-lg"
                onClick={() => setPeriod("weekly")}
              >
                <Flame className="mr-1 h-4 w-4" />
                Bu Hafta
              </Button>
              <Button
                variant={period === "alltime" ? "default" : "ghost"}
                size="sm"
                className="rounded-lg"
                onClick={() => setPeriod("alltime")}
              >
                <Trophy className="mr-1 h-4 w-4" />
                Tüm Zamanlar
              </Button>
            </div>
          </div>

          {/* Top 3 */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {leaderboardData.slice(0, 3).map((player, index) => (
              <motion.div
                key={player.rank}
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
                    <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-background">
                      <img src={player.photo} alt={player.username} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="font-bold">{player.username}</h3>
                    <p className="text-2xl font-extrabold text-primary">
                      {player.score.toLocaleString("tr-TR")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {player.games} oyun
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Rest of list */}
          <Card>
            <CardContent className="divide-y p-0">
              {leaderboardData.slice(3).map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex w-8 justify-center">
                      {getRankIcon(player.rank)}
                    </div>
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <img src={player.photo} alt={player.username} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{player.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {player.games} oyun
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
