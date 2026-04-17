"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  Calculator,
  BookOpen,
  Brain,
  Globe,
  Loader2,
  Landmark,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

/* ------------------------------------------------------------------ */
/*  TYPES                                                               */
/* ------------------------------------------------------------------ */

interface LeaderboardEntry {
  display_name: string;
  avatar: string;
  score: number;
  correct_count: number;
  duration_seconds: number;
  completed_at: string;
}

interface RankedEntry extends LeaderboardEntry {
  rank: number;
}

/* ------------------------------------------------------------------ */
/*  OYUN TANIMI                                                         */
/* ------------------------------------------------------------------ */

const GAMES = [
  { id: "math", label: "Matematik Yarışması", icon: Calculator, color: "bg-blue-500" },
  { id: "es-anlamli-hafiza", label: "Eş Anlamlı Hafıza", icon: Brain, color: "bg-purple-500" },
  { id: "harita-kaptani", label: "Harita Kaptanı", icon: Globe, color: "bg-emerald-500" },
  { id: "periyodik-tablo", label: "Periyodik Tablo", icon: BookOpen, color: "bg-amber-500" },
  { id: "inkilap-yolu", label: "İnkılap Yolu", icon: Landmark, color: "bg-red-500" },
  { id: "soz-avcisi", label: "Söz Avcısı", icon: MessageSquare, color: "bg-teal-500" },
  { id: "world-explorer", label: "World Explorer", icon: Globe, color: "bg-indigo-500" },
];

/* ------------------------------------------------------------------ */
/*  AVATAR                                                              */
/* ------------------------------------------------------------------ */

const AVATAR_EMOJIS: Record<string, string> = {
  avatar_1: "🦁", avatar_2: "🐯", avatar_3: "🦊", avatar_4: "🐧",
  avatar_5: "🦋", avatar_6: "🐬", avatar_7: "🦄", avatar_8: "🐸",
  avatar_9: "🐼", avatar_10: "🦉", avatar_11: "🐙", avatar_12: "🦕",
};

function AvatarBubble({ avatar, size = 48 }: { avatar: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-[#005C53]/10 text-2xl"
      style={{ width: size, height: size, fontSize: size * 0.55 }}
    >
      {AVATAR_EMOJIS[avatar] ?? "🦁"}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  YARDIMCI                                                            */
/* ------------------------------------------------------------------ */

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}sn`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}dk ${s}sn`;
}

function getRankDisplay(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-sm font-bold text-[#042940]/40">#{rank}</span>;
}

function getRankBg(rank: number) {
  if (rank === 1) return "bg-amber-50/60";
  if (rank === 2) return "bg-gray-50/60";
  if (rank === 3) return "bg-orange-50/60";
  return "";
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                               */
/* ------------------------------------------------------------------ */

function LeaderboardContent() {
  const [selectedGameId, setSelectedGameId] = useState(GAMES[0].id);
  const [entries, setEntries] = useState<RankedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setEntries([]);
    api.get<LeaderboardEntry[]>(`/games/${selectedGameId}/leaderboard`)
      .then((data) => {
        setEntries(
          data.map((entry, i) => ({ ...entry, rank: i + 1 }))
        );
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [selectedGameId]);

  const selectedGame = GAMES.find((g) => g.id === selectedGameId)!;

  return (
    <div className="container py-8">
      {/* Başlık */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <Trophy className="h-5 w-5 text-[#005C53]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#042940]">Liderlik Tablosu</h1>
            <p className="text-sm text-[#042940]/50">
              {selectedGame.label} &middot; En iyi {entries.length} oyuncu
            </p>
          </div>
        </div>
      </motion.div>

      {/* Oyun seçici */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGameId(game.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              selectedGameId === game.id
                ? "bg-[#005C53] text-white shadow-md"
                : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
            )}
          >
            <game.icon className="h-4 w-4" />
            {game.label}
          </button>
        ))}
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : entries.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200 shadow-none">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <Trophy className="h-8 w-8 text-[#042940]/20" />
            <p className="font-semibold text-[#042940]">Henüz kimse oynamadı</p>
            <p className="text-sm text-[#042940]/50">
              Bu oyunu ilk oynayan sen ol!
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Top 3 podyum */}
          {entries.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-6 grid gap-4 md:grid-cols-3"
            >
              {entries.slice(0, 3).map((entry, i) => (
                <Card
                  key={entry.rank}
                  className={cn(
                    "overflow-hidden border-0 shadow-sm",
                    i === 0 && "md:order-2",
                    i === 1 && "md:order-1",
                    i === 2 && "md:order-3"
                  )}
                >
                  <CardContent className={cn("p-5 text-center", getRankBg(entry.rank))}>
                    <div className="mb-3 flex justify-center">{getRankDisplay(entry.rank)}</div>
                    <div className="mb-3 flex justify-center">
                      <AvatarBubble avatar={entry.avatar} size={56} />
                    </div>
                    <p className="text-sm font-bold text-[#042940]">{entry.display_name}</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#005C53]">
                      {entry.score.toLocaleString("tr-TR")}
                    </p>
                    <p className="text-xs text-[#042940]/40">
                      {entry.correct_count} doğru &middot; {formatTime(entry.duration_seconds)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Tam liste */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-[#042940]/5">
                  {(entries.length >= 3 ? entries.slice(3) : entries).map((entry, index) => (
                    <motion.div
                      key={`${entry.rank}-${entry.display_name}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                      className={cn("flex items-center gap-4 px-5 py-3.5", getRankBg(entry.rank))}
                    >
                      <div className="flex h-8 w-8 items-center justify-center">
                        {getRankDisplay(entry.rank)}
                      </div>
                      <AvatarBubble avatar={entry.avatar} size={36} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#042940]">{entry.display_name}</p>
                        <p className="text-xs text-[#042940]/40">
                          {entry.correct_count} doğru &middot; {formatTime(entry.duration_seconds)}
                        </p>
                      </div>
                      <p className="text-sm font-extrabold text-[#005C53]">
                        {entry.score.toLocaleString("tr-TR")}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<div className="container py-8"><p className="text-[#042940]/50">Yükleniyor...</p></div>}>
      <LeaderboardContent />
    </Suspense>
  );
}
