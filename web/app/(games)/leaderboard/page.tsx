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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BeanHead } from "beanheads";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  AVATAR CONFIGS (sabit, her renderda ayni)                          */
/* ------------------------------------------------------------------ */

type AvatarDef = {
  skinTone: "light" | "yellow" | "red" | "brown" | "dark";
  hair: string;
  hairColor: string;
  eyes: string;
  mouth: string;
  body: string;
  lashes?: boolean;
  accessory?: string;
  hat?: string;
  hatColor?: string;
};

const avatarPool: AvatarDef[] = [
  { skinTone: "light", hair: "short", hairColor: "brown", eyes: "happy", mouth: "grin", body: "chest" },
  { skinTone: "yellow", hair: "long", hairColor: "black", eyes: "normal", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "light", hair: "buzz", hairColor: "blonde", eyes: "content", mouth: "openSmile", body: "chest" },
  { skinTone: "light", hair: "bob", hairColor: "orange", eyes: "wink", mouth: "grin", body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "short", hairColor: "black", eyes: "happy", mouth: "tongue", body: "chest" },
  { skinTone: "light", hair: "pixie", hairColor: "brown", eyes: "normal", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "red", hair: "short", hairColor: "brown", eyes: "squint", mouth: "serious", body: "chest" },
  { skinTone: "light", hair: "bun", hairColor: "blonde", eyes: "happy", mouth: "lips", body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "buzz", hairColor: "brown", eyes: "content", mouth: "grin", body: "chest" },
  { skinTone: "light", hair: "long", hairColor: "pink", eyes: "heart", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "light", hair: "short", hairColor: "black", eyes: "normal", mouth: "openSmile", body: "chest", accessory: "roundGlasses" },
  { skinTone: "yellow", hair: "bob", hairColor: "brown", eyes: "happy", mouth: "grin", body: "breasts", lashes: true },
  { skinTone: "light", hair: "short", hairColor: "orange", eyes: "wink", mouth: "tongue", body: "chest" },
  { skinTone: "light", hair: "pixie", hairColor: "blue", eyes: "content", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "short", hairColor: "blonde", eyes: "happy", mouth: "grin", body: "chest" },
  { skinTone: "light", hair: "long", hairColor: "brown", eyes: "normal", mouth: "lips", body: "breasts", lashes: true },
  { skinTone: "light", hair: "buzz", hairColor: "black", eyes: "squint", mouth: "serious", body: "chest", hat: "beanie", hatColor: "red" },
  { skinTone: "yellow", hair: "bob", hairColor: "black", eyes: "happy", mouth: "openSmile", body: "breasts", lashes: true, accessory: "tinyGlasses" },
  { skinTone: "light", hair: "short", hairColor: "brown", eyes: "content", mouth: "grin", body: "chest" },
  { skinTone: "light", hair: "long", hairColor: "white", eyes: "normal", mouth: "openSmile", body: "breasts", lashes: true },
];

function PlayerAvatar({ def, size = 36 }: { def: AvatarDef; size?: number }) {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE]" style={{ width: size, height: size }}>
      <div style={{ width: size, height: size }}>
        <BeanHead
          skinTone={def.skinTone as any}
          hair={def.hair as any}
          hairColor={def.hairColor as any}
          eyes={def.eyes as any}
          eyebrows="raised"
          mouth={def.mouth as any}
          body={def.body as any}
          clothing="shirt"
          clothingColor="blue"
          accessory={(def.accessory || "none") as any}
          hat={(def.hat || "none") as any}
          hatColor={(def.hatColor || "white") as any}
          facialHair="none"
          graphic="none"
          lashes={def.lashes || false}
          lipColor="red"
          faceMaskColor="white"
          mask={false}
          faceMask={false}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MOCK DATA - scope bazli                                            */
/* ------------------------------------------------------------------ */

type Player = {
  rank: number;
  username: string;
  avatarIdx: number;
  score: number;
  games: number;
  isCurrentUser?: boolean;
};

const turkiyeData: Player[] = [
  { rank: 1, username: "EfeY\u0131ld\u0131z", avatarIdx: 0, score: 9850, games: 142 },
  { rank: 2, username: "ZeynepKaya", avatarIdx: 1, score: 9420, games: 138 },
  { rank: 3, username: "AliDemir", avatarIdx: 2, score: 9100, games: 131 },
  { rank: 4, username: "EceArslan", avatarIdx: 3, score: 8750, games: 125 },
  { rank: 5, username: "CanY\u0131lmaz", avatarIdx: 4, score: 8500, games: 119 },
  { rank: 6, username: "DefneKo\u00e7", avatarIdx: 5, score: 8200, games: 115 },
  { rank: 7, username: "EmreAk\u0131n", avatarIdx: 6, score: 7900, games: 108 },
  { rank: 8, username: "MertCan", avatarIdx: 8, score: 7400, games: 98 },
  { rank: 9, username: "Ay\u015feG\u00fcl", avatarIdx: 7, score: 7100, games: 95 },
  { rank: 10, username: "\u0130remSu", avatarIdx: 9, score: 6800, games: 90 },
  { rank: 11, username: "BurakAy", avatarIdx: 10, score: 6500, games: 87 },
  { rank: 12, username: "SedaT\u00fcrk", avatarIdx: 11, score: 6200, games: 82 },
  { rank: 13, username: "Y\u0131ld\u0131zEla", avatarIdx: 12, score: 5900, games: 78 },
  { rank: 14, username: "OnurBey", avatarIdx: 13, score: 5600, games: 74 },
  { rank: 15, username: "NilayG\u00fcn", avatarIdx: 14, score: 5300, games: 70 },
  { rank: 16, username: "Oyuncu", avatarIdx: 15, score: 5000, games: 66, isCurrentUser: true },
  { rank: 17, username: "KaanDe\u011fer", avatarIdx: 16, score: 4700, games: 62 },
  { rank: 18, username: "Tu\u011f\u00e7eAk", avatarIdx: 17, score: 4400, games: 58 },
  { rank: 19, username: "Umut\u015Een", avatarIdx: 18, score: 4100, games: 54 },
  { rank: 20, username: "PelinAy", avatarIdx: 19, score: 3800, games: 50 },
];

const okulData: Player[] = [
  { rank: 1, username: "EceArslan", avatarIdx: 3, score: 4850, games: 65 },
  { rank: 2, username: "CanY\u0131lmaz", avatarIdx: 4, score: 4620, games: 61 },
  { rank: 3, username: "EmreAk\u0131n", avatarIdx: 6, score: 4380, games: 58 },
  { rank: 4, username: "Oyuncu", avatarIdx: 15, score: 4100, games: 55, isCurrentUser: true },
  { rank: 5, username: "DefneKo\u00e7", avatarIdx: 5, score: 3900, games: 52 },
  { rank: 6, username: "MertCan", avatarIdx: 8, score: 3650, games: 48 },
  { rank: 7, username: "\u0130remSu", avatarIdx: 9, score: 3400, games: 45 },
  { rank: 8, username: "BurakAy", avatarIdx: 10, score: 3200, games: 42 },
  { rank: 9, username: "SedaT\u00fcrk", avatarIdx: 11, score: 2950, games: 39 },
  { rank: 10, username: "Y\u0131ld\u0131zEla", avatarIdx: 12, score: 2700, games: 36 },
  { rank: 11, username: "OnurBey", avatarIdx: 13, score: 2500, games: 33 },
  { rank: 12, username: "NilayG\u00fcn", avatarIdx: 14, score: 2300, games: 30 },
  { rank: 13, username: "KaanDe\u011fer", avatarIdx: 16, score: 2100, games: 28 },
  { rank: 14, username: "Tu\u011f\u00e7eAk", avatarIdx: 17, score: 1900, games: 25 },
  { rank: 15, username: "Umut\u015Een", avatarIdx: 18, score: 1700, games: 22 },
  { rank: 16, username: "PelinAy", avatarIdx: 19, score: 1500, games: 20 },
  { rank: 17, username: "Ay\u015feG\u00fcl", avatarIdx: 7, score: 1300, games: 17 },
  { rank: 18, username: "ElifNur", avatarIdx: 1, score: 1100, games: 15 },
  { rank: 19, username: "AhmetCan", avatarIdx: 0, score: 900, games: 12 },
  { rank: 20, username: "Bet\u00fclAy", avatarIdx: 11, score: 700, games: 9 },
];

const sinifData: Player[] = [
  { rank: 1, username: "CanY\u0131lmaz", avatarIdx: 4, score: 2450, games: 32 },
  { rank: 2, username: "Oyuncu", avatarIdx: 15, score: 2280, games: 30, isCurrentUser: true },
  { rank: 3, username: "DefneKo\u00e7", avatarIdx: 5, score: 2100, games: 28 },
  { rank: 4, username: "MertCan", avatarIdx: 8, score: 1920, games: 25 },
  { rank: 5, username: "\u0130remSu", avatarIdx: 9, score: 1750, games: 23 },
  { rank: 6, username: "BurakAy", avatarIdx: 10, score: 1580, games: 21 },
  { rank: 7, username: "SedaT\u00fcrk", avatarIdx: 11, score: 1400, games: 18 },
  { rank: 8, username: "Y\u0131ld\u0131zEla", avatarIdx: 12, score: 1220, games: 16 },
];

const dataByScope: Record<string, Player[]> = {
  turkiye: turkiyeData,
  okul: okulData,
  sinif: sinifData,
};

/* ------------------------------------------------------------------ */
/*  FILTRE SECENEKLERI                                                 */
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
  okul: { label: "Okulum", icon: School },
  sinif: { label: "S\u0131n\u0131f\u0131m", icon: UsersRound },
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
  const players = dataByScope[scope] || turkiyeData;

  const [selectedFilter, setSelectedFilter] = useState("genel");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showGameDropdown, setShowGameDropdown] = useState(false);

  const availableGames = selectedFilter !== "genel" ? gamesBySubject[selectedFilter] || [] : [];

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
            <p className="text-sm text-[#042940]/50">{scopeInfo.label} &middot; {players.length} ki\u015fi</p>
          </div>
        </div>
      </motion.div>

      {/* Filtreler */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 space-y-4"
      >
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setSelectedFilter(opt.value); setSelectedGame(null); setShowGameDropdown(false); }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                selectedFilter === opt.value
                  ? "bg-[#005C53] text-white shadow-md"
                  : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
              )}
            >
              <opt.icon className="h-4 w-4" />
              {opt.label}
            </button>
          ))}
        </div>

        {selectedFilter !== "genel" && availableGames.length > 0 && (
          <div className="relative inline-block">
            <button
              onClick={() => setShowGameDropdown(!showGameDropdown)}
              className="flex items-center gap-2 rounded-xl border border-[#042940]/10 bg-white px-4 py-2 text-sm font-medium text-[#042940] transition-colors hover:bg-[#042940]/5"
            >
              <Gamepad2 className="h-4 w-4 text-[#042940]/40" />
              {selectedGame ? availableGames.find((g) => g.value === selectedGame)?.label : "T\u00fcm Oyunlar"}
              <ChevronDown className={cn("h-4 w-4 text-[#042940]/40 transition-transform", showGameDropdown && "rotate-180")} />
            </button>
            {showGameDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 w-56 rounded-xl border border-[#042940]/10 bg-white py-1 shadow-lg">
                <button
                  onClick={() => { setSelectedGame(null); setShowGameDropdown(false); }}
                  className={cn("w-full px-4 py-2 text-left text-sm transition-colors", !selectedGame ? "bg-[#005C53]/10 font-medium text-[#005C53]" : "text-[#042940]/60 hover:bg-[#042940]/5")}
                >
                  T\u00fcm Oyunlar
                </button>
                {availableGames.map((game) => (
                  <button
                    key={game.value}
                    onClick={() => { setSelectedGame(game.value); setShowGameDropdown(false); }}
                    className={cn("w-full px-4 py-2 text-left text-sm transition-colors", selectedGame === game.value ? "bg-[#005C53]/10 font-medium text-[#005C53]" : "text-[#042940]/60 hover:bg-[#042940]/5")}
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
        {players.slice(0, 3).map((player, i) => (
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
              <div className="mx-auto mb-3 flex justify-center">
                <PlayerAvatar def={avatarPool[player.avatarIdx % avatarPool.length]} size={56} />
              </div>
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
      {players.length > 3 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="overflow-hidden border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-[#042940]/5">
                {players.slice(3).map((player, index) => (
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
                    <PlayerAvatar def={avatarPool[player.avatarIdx % avatarPool.length]} size={36} />
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
      )}
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
