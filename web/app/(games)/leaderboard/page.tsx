"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  MapPin,
  School,
  UsersRound,
  Calculator,
  BookOpen,
  FlaskConical,
  Globe,
  Languages,
  Gamepad2,
  ChevronDown,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

type Player = {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  games: number;
  isCurrentUser?: boolean;
};

const mockPlayers: Player[] = [
  { rank: 1, username: "EfeY\u0131ld\u0131z", avatar: "https://i.pravatar.cc/40?img=33", score: 9850, games: 142 },
  { rank: 2, username: "ZeynepKaya", avatar: "https://i.pravatar.cc/40?img=44", score: 9420, games: 138 },
  { rank: 3, username: "AliDemir", avatar: "https://i.pravatar.cc/40?img=68", score: 9100, games: 131 },
  { rank: 4, username: "EceArslan", avatar: "https://i.pravatar.cc/40?img=47", score: 8750, games: 125 },
  { rank: 5, username: "CanY\u0131lmaz", avatar: "https://i.pravatar.cc/40?img=59", score: 8500, games: 119 },
  { rank: 6, username: "DefneKo\u00e7", avatar: "https://i.pravatar.cc/40?img=45", score: 8200, games: 115 },
  { rank: 7, username: "EmreAk\u0131n", avatar: "https://i.pravatar.cc/40?img=52", score: 7900, games: 108 },
  { rank: 8, username: "Oyuncu", avatar: "https://i.pravatar.cc/40?img=12", score: 7650, games: 102, isCurrentUser: true },
  { rank: 9, username: "MertCan", avatar: "https://i.pravatar.cc/40?img=61", score: 7400, games: 98 },
  { rank: 10, username: "\u0130remSu", avatar: "https://i.pravatar.cc/40?img=46", score: 7100, games: 95 },
  { rank: 11, username: "BurakAy", avatar: "https://i.pravatar.cc/40?img=55", score: 6800, games: 90 },
  { rank: 12, username: "SedaT\u00fcrk", avatar: "https://i.pravatar.cc/40?img=48", score: 6500, games: 87 },
  { rank: 13, username: "Y\u0131ld\u0131zEla", avatar: "https://i.pravatar.cc/40?img=42", score: 6200, games: 82 },
  { rank: 14, username: "OnurBey", avatar: "https://i.pravatar.cc/40?img=57", score: 5900, games: 78 },
  { rank: 15, username: "NilayG\u00fcn", avatar: "https://i.pravatar.cc/40?img=41", score: 5600, games: 74 },
  { rank: 16, username: "Ay\u015feG\u00fcl", avatar: "https://i.pravatar.cc/40?img=43", score: 5300, games: 70 },
  { rank: 17, username: "KaanDe\u011fer", avatar: "https://i.pravatar.cc/40?img=56", score: 5000, games: 66 },
  { rank: 18, username: "Tu\u011f\u00e7eAk", avatar: "https://i.pravatar.cc/40?img=49", score: 4700, games: 62 },
  { rank: 19, username: "Umut\u015Een", avatar: "https://i.pravatar.cc/40?img=60", score: 4400, games: 58 },
  { rank: 20, username: "PelinAy", avatar: "https://i.pravatar.cc/40?img=50", score: 4100, games: 54 },
];

/* ------------------------------------------------------------------ */
/*  DISIPLIN & OYUN VERILERI                                           */
/* ------------------------------------------------------------------ */

type FilterOption = { value: string; label: string; icon: React.ElementType };

const filterOptions: FilterOption[] = [
  { value: "genel", label: "Genel S\u0131ralama", icon: Trophy },
  { value: "turkce", label: "T\u00fcrk\u00e7e", icon: BookOpen },
  { value: "matematik", label: "Matematik", icon: Calculator },
  { value: "fen", label: "Fen Bilimleri", icon: FlaskConical },
  { value: "sosyal", label: "Sosyal Bilgiler", icon: Globe },
  { value: "ingilizce", label: "\u0130ngilizce", icon: Languages },
];

const gamesBySubject: Record<string, { value: string; label: string }[]> = {
  turkce: [
    { value: "kelime-avi", label: "Kelime Av\u0131" },
    { value: "hafiza-kartlari", label: "Haf\u0131za Kartlar\u0131" },
    { value: "cumle-kurma", label: "C\u00fcmle Kurma" },
    { value: "yazim-kilavuzu", label: "Yaz\u0131m K\u0131lavuzu" },
  ],
  matematik: [
    { value: "matematik-yarismasi", label: "Matematik Yar\u0131\u015fmas\u0131" },
    { value: "bulmaca-dunyasi", label: "Bulmaca D\u00fcnyas\u0131" },
    { value: "kesir-ustasi", label: "Kesir Ustas\u0131" },
  ],
  fen: [
    { value: "atom-kesfi", label: "Atom Ke\u015ffi" },
    { value: "canlilar-alemi", label: "Canl\u0131lar Alemi" },
    { value: "deney-labi", label: "Deney Lab\u0131" },
  ],
  sosyal: [
    { value: "tarih-yolculugu", label: "Tarih Yolculu\u011fu" },
    { value: "harita-ustasi", label: "Harita Ustas\u0131" },
    { value: "vatandaslik", label: "Vatanda\u015fl\u0131k Bilgisi" },
  ],
  ingilizce: [
    { value: "vocabulary-builder", label: "Vocabulary Builder" },
    { value: "grammar-quest", label: "Grammar Quest" },
    { value: "listening-lab", label: "Listening Lab" },
  ],
};

const scopeLabels: Record<string, { label: string; icon: React.ElementType }> = {
  turkiye: { label: "T\u00fcrkiye Geneli", icon: MapPin },
  okul: { label: "Okul S\u0131ralamas\u0131", icon: School },
  sinif: { label: "S\u0131n\u0131f S\u0131ralamas\u0131", icon: UsersRound },
};

/* ------------------------------------------------------------------ */
/*  YARDIMCI                                                           */
/* ------------------------------------------------------------------ */

function getRankDisplay(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-sm font-bold text-[#042940]/40">#{rank}</span>;
}

function getRankBg(rank: number, isCurrentUser?: boolean) {
  if (isCurrentUser) return "bg-[#DBF227]/10";
  if (rank === 1) return "bg-amber-50/50";
  if (rank === 2) return "bg-gray-50/50";
  if (rank === 3) return "bg-orange-50/50";
  return "";
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

function LeaderboardContent() {
  const searchParams = useSearchParams();
  const scope = searchParams.get("scope") || "turkiye";
  const scopeInfo = scopeLabels[scope] || scopeLabels.turkiye;
  const ScopeIcon = scopeInfo.icon;

  const [selectedFilter, setSelectedFilter] = useState("genel");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showGameDropdown, setShowGameDropdown] = useState(false);

  const availableGames = selectedFilter !== "genel" ? gamesBySubject[selectedFilter] || [] : [];
  const currentUser = mockPlayers.find((p) => p.isCurrentUser);

  return (
    <div className="container py-8">
      {/* Baslik */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <ScopeIcon className="h-5 w-5 text-[#005C53]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#042940]">Liderlik Tablosu</h1>
            <p className="text-sm text-[#042940]/50">{scopeInfo.label}</p>
          </div>
        </div>
      </motion.div>

      {/* Kullanicinin kendi sirasi */}
      {currentUser && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-6"
        >
          <Card className="overflow-hidden border-0 border-l-4 border-l-[#9FC131] bg-[#DBF227]/5 shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9FC131]/20">
                <Star className="h-5 w-5 text-[#9FC131]" />
              </div>
              <img src={currentUser.avatar} alt="" className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#042940]">Senin S\u0131ralaman</p>
                <p className="text-xs text-[#042940]/40">{currentUser.games} oyun oynand\u0131</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-[#005C53]">#{currentUser.rank}</p>
                <p className="text-xs text-[#042940]/40">{currentUser.score.toLocaleString("tr-TR")} puan</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filtreler */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 space-y-4"
      >
        {/* Disiplin filtreleri */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => {
            const isSelected = selectedFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setSelectedFilter(opt.value);
                  setSelectedGame(null);
                  setShowGameDropdown(false);
                }}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  isSelected
                    ? "bg-[#005C53] text-white shadow-md"
                    : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
                )}
              >
                <opt.icon className="h-4 w-4" />
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Oyun secici — sadece disiplin secildiginde */}
        {selectedFilter !== "genel" && availableGames.length > 0 && (
          <div className="relative inline-block">
            <button
              onClick={() => setShowGameDropdown(!showGameDropdown)}
              className="flex items-center gap-2 rounded-xl border border-[#042940]/10 bg-white px-4 py-2 text-sm font-medium text-[#042940] transition-colors hover:bg-[#042940]/5"
            >
              <Gamepad2 className="h-4 w-4 text-[#042940]/40" />
              {selectedGame
                ? availableGames.find((g) => g.value === selectedGame)?.label
                : "T\u00fcm Oyunlar"}
              <ChevronDown className={cn("h-4 w-4 text-[#042940]/40 transition-transform", showGameDropdown && "rotate-180")} />
            </button>
            {showGameDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 w-56 rounded-xl border border-[#042940]/10 bg-white py-1 shadow-lg">
                <button
                  onClick={() => { setSelectedGame(null); setShowGameDropdown(false); }}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm transition-colors",
                    !selectedGame ? "bg-[#005C53]/10 font-medium text-[#005C53]" : "text-[#042940]/60 hover:bg-[#042940]/5"
                  )}
                >
                  T\u00fcm Oyunlar
                </button>
                {availableGames.map((game) => (
                  <button
                    key={game.value}
                    onClick={() => { setSelectedGame(game.value); setShowGameDropdown(false); }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm transition-colors",
                      selectedGame === game.value ? "bg-[#005C53]/10 font-medium text-[#005C53]" : "text-[#042940]/60 hover:bg-[#042940]/5"
                    )}
                  >
                    {game.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Top 3 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 grid gap-4 md:grid-cols-3"
      >
        {mockPlayers.slice(0, 3).map((player, i) => (
          <Card
            key={player.rank}
            className={cn(
              "overflow-hidden border-0 shadow-sm",
              i === 0 && "md:order-2",
              i === 1 && "md:order-1",
              i === 2 && "md:order-3",
              player.isCurrentUser && "ring-2 ring-[#9FC131]"
            )}
          >
            <CardContent className={cn("p-5 text-center", getRankBg(player.rank, player.isCurrentUser))}>
              <div className="mb-3 flex justify-center">{getRankDisplay(player.rank)}</div>
              <img src={player.avatar} alt={player.username} className="mx-auto mb-3 h-14 w-14 rounded-full" />
              <p className={cn("text-sm font-bold", player.isCurrentUser ? "text-[#9FC131]" : "text-[#042940]")}>
                {player.username} {player.isCurrentUser && "(Sen)"}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#005C53]">{player.score.toLocaleString("tr-TR")}</p>
              <p className="text-xs text-[#042940]/40">{player.games} oyun</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Liste */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-[#042940]/5">
              {mockPlayers.slice(3).map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                  className={cn("flex items-center gap-4 px-5 py-3.5", getRankBg(player.rank, player.isCurrentUser))}
                >
                  <div className="flex h-8 w-8 items-center justify-center">
                    {getRankDisplay(player.rank)}
                  </div>
                  <img src={player.avatar} alt={player.username} className="h-9 w-9 rounded-full" />
                  <div className="flex-1">
                    <p className={cn("text-sm font-bold", player.isCurrentUser ? "text-[#9FC131]" : "text-[#042940]")}>
                      {player.username} {player.isCurrentUser && "(Sen)"}
                    </p>
                    <p className="text-xs text-[#042940]/40">{player.games} oyun</p>
                  </div>
                  <p className="text-sm font-extrabold text-[#005C53]">{player.score.toLocaleString("tr-TR")}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<div className="container py-8"><p className="text-[#042940]/50">Y\u00fckleniyor...</p></div>}>
      <LeaderboardContent />
    </Suspense>
  );
}
