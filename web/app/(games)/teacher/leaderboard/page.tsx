"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Trophy, Medal, Crown, MapPin, School,
  Calculator, BookOpen, FlaskConical, Globe, SpellCheck,
  Gamepad2, ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BeanHead } from "beanheads";
import { cn } from "@/lib/utils";

/* Avatar helper */
const avatarPool = [
  { skinTone: "light", hair: "short", hairColor: "brown", eyes: "happy", mouth: "grin", body: "chest" },
  { skinTone: "yellow", hair: "long", hairColor: "black", eyes: "normal", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "light", hair: "buzz", hairColor: "blonde", eyes: "content", mouth: "openSmile", body: "chest" },
  { skinTone: "light", hair: "bob", hairColor: "orange", eyes: "wink", mouth: "grin", body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "short", hairColor: "black", eyes: "happy", mouth: "tongue", body: "chest" },
  { skinTone: "light", hair: "pixie", hairColor: "brown", eyes: "normal", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "light", hair: "short", hairColor: "brown", eyes: "squint", mouth: "serious", body: "chest" },
  { skinTone: "light", hair: "bun", hairColor: "blonde", eyes: "happy", mouth: "lips", body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "buzz", hairColor: "brown", eyes: "content", mouth: "grin", body: "chest" },
  { skinTone: "light", hair: "long", hairColor: "pink", eyes: "heart", mouth: "openSmile", body: "breasts", lashes: true },
];

function PlayerAvatar({ idx, size = 36 }: { idx: number; size?: number }) {
  const d = avatarPool[idx % avatarPool.length] as any;
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE]" style={{ width: size, height: size }}>
      <div style={{ width: size, height: size }}>
        <BeanHead skinTone={d.skinTone} hair={d.hair} hairColor={d.hairColor} eyes={d.eyes} eyebrows="raised" mouth={d.mouth} body={d.body} clothing="shirt" clothingColor="blue" accessory="none" hat="none" hatColor="white" facialHair="none" graphic="none" lashes={d.lashes || false} lipColor="red" faceMaskColor="white" mask={false} faceMask={false} />
      </div>
    </div>
  );
}

/* Mock data */
type Player = { rank: number; username: string; avatarIdx: number; score: number; games: number };

const turkiyeData: Player[] = [
  { rank: 1, username: "Efe Yıldız", avatarIdx: 0, score: 9850, games: 142 },
  { rank: 2, username: "Zeynep Kaya", avatarIdx: 1, score: 9420, games: 138 },
  { rank: 3, username: "Ali Demir", avatarIdx: 2, score: 9100, games: 131 },
  { rank: 4, username: "Ece Arslan", avatarIdx: 3, score: 8750, games: 125 },
  { rank: 5, username: "Can Yılmaz", avatarIdx: 4, score: 8500, games: 119 },
  { rank: 6, username: "Defne Koç", avatarIdx: 5, score: 8200, games: 115 },
  { rank: 7, username: "Emre Akın", avatarIdx: 6, score: 7900, games: 108 },
  { rank: 8, username: "Ayşe Gül", avatarIdx: 7, score: 7650, games: 102 },
  { rank: 9, username: "Mert Can", avatarIdx: 8, score: 7400, games: 98 },
  { rank: 10, username: "İrem Su", avatarIdx: 9, score: 7100, games: 95 },
];

const okulData: Player[] = [
  { rank: 1, username: "Ece Arslan", avatarIdx: 3, score: 4850, games: 65 },
  { rank: 2, username: "Can Yılmaz", avatarIdx: 4, score: 4620, games: 61 },
  { rank: 3, username: "Emre Akın", avatarIdx: 6, score: 4380, games: 58 },
  { rank: 4, username: "Defne Koç", avatarIdx: 5, score: 3900, games: 52 },
  { rank: 5, username: "Mert Can", avatarIdx: 8, score: 3650, games: 48 },
  { rank: 6, username: "İrem Su", avatarIdx: 9, score: 3400, games: 45 },
  { rank: 7, username: "Burak Ay", avatarIdx: 0, score: 3200, games: 42 },
  { rank: 8, username: "Seda Türk", avatarIdx: 1, score: 2950, games: 39 },
  { rank: 9, username: "Yıldız Ela", avatarIdx: 2, score: 2700, games: 36 },
  { rank: 10, username: "Onur Bey", avatarIdx: 7, score: 2500, games: 33 },
];

const dataByScope: Record<string, Player[]> = { turkiye: turkiyeData, okul: okulData };

const scopeLabels: Record<string, { label: string; icon: React.ElementType }> = {
  turkiye: { label: "Türkiye Geneli", icon: MapPin },
  okul: { label: "Okulum", icon: School },
};

const filterOptions = [
  { value: "genel", label: "Genel Sıralama", icon: Trophy },
  { value: "turkce", label: "Türkçe", icon: BookOpen },
  { value: "matematik", label: "Matematik", icon: Calculator },
  { value: "fen", label: "Fen Bilimleri", icon: FlaskConical },
  { value: "sosyal", label: "Sosyal Bilgiler", icon: Globe },
  { value: "ingilizce", label: "İngilizce", icon: SpellCheck },
];

function getRankDisplay(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-sm font-bold text-[#042940]/40">#{rank}</span>;
}

function TeacherLeaderboardContent() {
  const searchParams = useSearchParams();
  const scope = searchParams.get("scope") || "turkiye";
  const scopeInfo = scopeLabels[scope] || scopeLabels.turkiye;
  const ScopeIcon = scopeInfo.icon;
  const players = dataByScope[scope] || turkiyeData;
  const [selectedFilter, setSelectedFilter] = useState("genel");

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <ScopeIcon className="h-5 w-5 text-[#005C53]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">Liderlik Tablosu</h1>
            <p className="text-sm text-muted-foreground">{scopeInfo.label} — Öğretmen Görünümü · {players.length} kişi</p>
          </div>
        </div>
      </motion.div>

      {/* Filtreler */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button key={opt.value} onClick={() => setSelectedFilter(opt.value)}
              className={cn("flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all", selectedFilter === opt.value ? "bg-[#005C53] text-white shadow-md" : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]")}>
              <opt.icon className="h-4 w-4" /> {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top 3 */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {players.slice(0, 3).map((p, i) => (
          <Card key={p.rank} className={cn("border-0 shadow-sm", i === 0 && "md:order-2", i === 1 && "md:order-1", i === 2 && "md:order-3")}>
            <CardContent className={cn("p-5 text-center", i === 0 && "bg-amber-50/50", i === 1 && "bg-gray-50/50", i === 2 && "bg-orange-50/50")}>
              <div className="mb-3 flex justify-center">{getRankDisplay(p.rank)}</div>
              <div className="mx-auto mb-3 flex justify-center"><PlayerAvatar idx={p.avatarIdx} size={56} /></div>
              <p className="text-sm font-bold text-[#042940]">{p.username}</p>
              <p className="mt-1 text-2xl font-extrabold text-[#005C53]">{p.score.toLocaleString("tr-TR")}</p>
              <p className="text-xs text-muted-foreground">{p.games} oyun</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste */}
      {players.length > 3 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-[#042940]/5">
              {players.slice(3).map((p) => (
                <div key={p.rank} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center">{getRankDisplay(p.rank)}</div>
                  <PlayerAvatar idx={p.avatarIdx} size={36} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#042940]">{p.username}</p>
                    <p className="text-xs text-muted-foreground">{p.games} oyun</p>
                  </div>
                  <p className="text-sm font-extrabold text-[#005C53]">{p.score.toLocaleString("tr-TR")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function TeacherLeaderboardPage() {
  return (
    <Suspense fallback={<div className="container py-8"><p className="text-muted-foreground">Yükleniyor...</p></div>}>
      <TeacherLeaderboardContent />
    </Suspense>
  );
}
