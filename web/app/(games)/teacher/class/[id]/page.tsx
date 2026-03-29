"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Users, Trophy, BarChart3, Gamepad2, TrendingUp,
  Plus, X, Crown, Medal, Star, BookOpen, Calculator,
  FlaskConical, Globe, SpellCheck, ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BeanHead } from "beanheads";

/* ------------------------------------------------------------------ */
/*  AVATAR                                                             */
/* ------------------------------------------------------------------ */

type AvatarDef = { skinTone: string; hair: string; hairColor: string; eyes: string; mouth: string; body: string; lashes?: boolean };

const avatarPool: AvatarDef[] = [
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
  { skinTone: "light", hair: "short", hairColor: "black", eyes: "normal", mouth: "openSmile", body: "chest" },
  { skinTone: "yellow", hair: "bob", hairColor: "brown", eyes: "happy", mouth: "grin", body: "breasts", lashes: true },
  { skinTone: "light", hair: "short", hairColor: "orange", eyes: "wink", mouth: "tongue", body: "chest" },
  { skinTone: "light", hair: "pixie", hairColor: "blue", eyes: "content", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "short", hairColor: "blonde", eyes: "happy", mouth: "grin", body: "chest" },
  { skinTone: "light", hair: "long", hairColor: "brown", eyes: "normal", mouth: "lips", body: "breasts", lashes: true },
];

function PlayerAvatar({ idx, size = 36 }: { idx: number; size?: number }) {
  const d = avatarPool[idx % avatarPool.length];
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE]" style={{ width: size, height: size }}>
      <div style={{ width: size, height: size }}>
        <BeanHead skinTone={d.skinTone as any} hair={d.hair as any} hairColor={d.hairColor as any} eyes={d.eyes as any} eyebrows="raised" mouth={d.mouth as any} body={d.body as any} clothing="shirt" clothingColor="blue" accessory="none" hat="none" hatColor="white" facialHair="none" graphic="none" lashes={d.lashes || false} lipColor="red" faceMaskColor="white" mask={false} faceMask={false} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

type StudentData = {
  id: number; ad: string; avatarIdx: number;
  haftalikPuan: number; aylikPuan: number; toplamPuan: number;
  oyunSayisi: number; rozetSayisi: number; enIyiDers: string; sonAktivite: string;
};

const siniflarData: Record<string, { ad: string; ogrenciler: StudentData[] }> = {
  "1": {
    ad: "5-A",
    ogrenciler: [
      { id: 1, ad: "Efe Y\u0131ld\u0131z", avatarIdx: 0, haftalikPuan: 850, aylikPuan: 3200, toplamPuan: 9850, oyunSayisi: 142, rozetSayisi: 12, enIyiDers: "Matematik", sonAktivite: "Bug\u00fcn" },
      { id: 2, ad: "Zeynep Kaya", avatarIdx: 1, haftalikPuan: 720, aylikPuan: 2900, toplamPuan: 9420, oyunSayisi: 138, rozetSayisi: 11, enIyiDers: "T\u00fcrk\u00e7e", sonAktivite: "Bug\u00fcn" },
      { id: 3, ad: "Ali Demir", avatarIdx: 2, haftalikPuan: 680, aylikPuan: 2750, toplamPuan: 9100, oyunSayisi: 131, rozetSayisi: 10, enIyiDers: "Fen Bilimleri", sonAktivite: "D\u00fcn" },
      { id: 4, ad: "Ece Arslan", avatarIdx: 3, haftalikPuan: 640, aylikPuan: 2600, toplamPuan: 8750, oyunSayisi: 125, rozetSayisi: 9, enIyiDers: "Matematik", sonAktivite: "Bug\u00fcn" },
      { id: 5, ad: "Can Y\u0131lmaz", avatarIdx: 4, haftalikPuan: 590, aylikPuan: 2400, toplamPuan: 8500, oyunSayisi: 119, rozetSayisi: 8, enIyiDers: "\u0130ngilizce", sonAktivite: "2 g\u00fcn \u00f6nce" },
      { id: 6, ad: "Defne Ko\u00e7", avatarIdx: 5, haftalikPuan: 560, aylikPuan: 2200, toplamPuan: 8200, oyunSayisi: 115, rozetSayisi: 8, enIyiDers: "T\u00fcrk\u00e7e", sonAktivite: "Bug\u00fcn" },
      { id: 7, ad: "Emre Ak\u0131n", avatarIdx: 6, haftalikPuan: 480, aylikPuan: 1900, toplamPuan: 7900, oyunSayisi: 108, rozetSayisi: 7, enIyiDers: "Sosyal Bilgiler", sonAktivite: "D\u00fcn" },
      { id: 8, ad: "Ay\u015fe G\u00fcl", avatarIdx: 7, haftalikPuan: 450, aylikPuan: 1800, toplamPuan: 7650, oyunSayisi: 102, rozetSayisi: 7, enIyiDers: "Matematik", sonAktivite: "Bug\u00fcn" },
      { id: 9, ad: "Mert Can", avatarIdx: 8, haftalikPuan: 420, aylikPuan: 1700, toplamPuan: 7400, oyunSayisi: 98, rozetSayisi: 6, enIyiDers: "Fen Bilimleri", sonAktivite: "3 g\u00fcn \u00f6nce" },
      { id: 10, ad: "\u0130rem Su", avatarIdx: 9, haftalikPuan: 390, aylikPuan: 1600, toplamPuan: 7100, oyunSayisi: 95, rozetSayisi: 6, enIyiDers: "\u0130ngilizce", sonAktivite: "Bug\u00fcn" },
      { id: 11, ad: "Burak Ay", avatarIdx: 10, haftalikPuan: 350, aylikPuan: 1400, toplamPuan: 6800, oyunSayisi: 90, rozetSayisi: 5, enIyiDers: "Matematik", sonAktivite: "D\u00fcn" },
      { id: 12, ad: "Seda T\u00fcrk", avatarIdx: 11, haftalikPuan: 320, aylikPuan: 1300, toplamPuan: 6500, oyunSayisi: 87, rozetSayisi: 5, enIyiDers: "T\u00fcrk\u00e7e", sonAktivite: "2 g\u00fcn \u00f6nce" },
      { id: 13, ad: "Y\u0131ld\u0131z Ela", avatarIdx: 12, haftalikPuan: 280, aylikPuan: 1100, toplamPuan: 6200, oyunSayisi: 82, rozetSayisi: 4, enIyiDers: "Sosyal Bilgiler", sonAktivite: "Bug\u00fcn" },
      { id: 14, ad: "Onur Bey", avatarIdx: 13, haftalikPuan: 250, aylikPuan: 1000, toplamPuan: 5900, oyunSayisi: 78, rozetSayisi: 4, enIyiDers: "Fen Bilimleri", sonAktivite: "4 g\u00fcn \u00f6nce" },
      { id: 15, ad: "Nilay G\u00fcn", avatarIdx: 14, haftalikPuan: 220, aylikPuan: 900, toplamPuan: 5600, oyunSayisi: 74, rozetSayisi: 3, enIyiDers: "\u0130ngilizce", sonAktivite: "D\u00fcn" },
      { id: 16, ad: "Kaan De\u011fer", avatarIdx: 15, haftalikPuan: 200, aylikPuan: 800, toplamPuan: 5300, oyunSayisi: 70, rozetSayisi: 3, enIyiDers: "Matematik", sonAktivite: "Bug\u00fcn" },
      { id: 17, ad: "Tu\u011f\u00e7e Ak", avatarIdx: 0, haftalikPuan: 180, aylikPuan: 720, toplamPuan: 4900, oyunSayisi: 65, rozetSayisi: 3, enIyiDers: "T\u00fcrk\u00e7e", sonAktivite: "3 g\u00fcn \u00f6nce" },
      { id: 18, ad: "Umut \u015een", avatarIdx: 1, haftalikPuan: 160, aylikPuan: 640, toplamPuan: 4600, oyunSayisi: 60, rozetSayisi: 2, enIyiDers: "Fen Bilimleri", sonAktivite: "D\u00fcn" },
      { id: 19, ad: "Pelin Ay", avatarIdx: 2, haftalikPuan: 140, aylikPuan: 560, toplamPuan: 4300, oyunSayisi: 55, rozetSayisi: 2, enIyiDers: "Sosyal Bilgiler", sonAktivite: "5 g\u00fcn \u00f6nce" },
      { id: 20, ad: "Bet\u00fcl \u00d6z", avatarIdx: 3, haftalikPuan: 120, aylikPuan: 480, toplamPuan: 4000, oyunSayisi: 50, rozetSayisi: 2, enIyiDers: "Matematik", sonAktivite: "2 g\u00fcn \u00f6nce" },
      { id: 21, ad: "Ahmet Can", avatarIdx: 4, haftalikPuan: 100, aylikPuan: 400, toplamPuan: 3700, oyunSayisi: 45, rozetSayisi: 1, enIyiDers: "\u0130ngilizce", sonAktivite: "Bug\u00fcn" },
      { id: 22, ad: "Elif Nur", avatarIdx: 5, haftalikPuan: 90, aylikPuan: 360, toplamPuan: 3400, oyunSayisi: 40, rozetSayisi: 1, enIyiDers: "T\u00fcrk\u00e7e", sonAktivite: "D\u00fcn" },
      { id: 23, ad: "Kerem Y\u0131l", avatarIdx: 6, haftalikPuan: 80, aylikPuan: 320, toplamPuan: 3100, oyunSayisi: 38, rozetSayisi: 1, enIyiDers: "Matematik", sonAktivite: "3 g\u00fcn \u00f6nce" },
      { id: 24, ad: "Ceren G\u00fcl", avatarIdx: 7, haftalikPuan: 70, aylikPuan: 280, toplamPuan: 2800, oyunSayisi: 35, rozetSayisi: 1, enIyiDers: "Fen Bilimleri", sonAktivite: "Bug\u00fcn" },
      { id: 25, ad: "Bar\u0131\u015f Efe", avatarIdx: 8, haftalikPuan: 60, aylikPuan: 240, toplamPuan: 2500, oyunSayisi: 30, rozetSayisi: 0, enIyiDers: "Sosyal Bilgiler", sonAktivite: "1 hafta \u00f6nce" },
      { id: 26, ad: "Melis Ada", avatarIdx: 9, haftalikPuan: 50, aylikPuan: 200, toplamPuan: 2200, oyunSayisi: 25, rozetSayisi: 0, enIyiDers: "\u0130ngilizce", sonAktivite: "4 g\u00fcn \u00f6nce" },
      { id: 27, ad: "Arda \u00c7elik", avatarIdx: 10, haftalikPuan: 40, aylikPuan: 160, toplamPuan: 1900, oyunSayisi: 20, rozetSayisi: 0, enIyiDers: "T\u00fcrk\u00e7e", sonAktivite: "D\u00fcn" },
      { id: 28, ad: "Su Deniz", avatarIdx: 11, haftalikPuan: 30, aylikPuan: 120, toplamPuan: 1600, oyunSayisi: 15, rozetSayisi: 0, enIyiDers: "Matematik", sonAktivite: "1 hafta \u00f6nce" },
    ],
  },
  "2": {
    ad: "5-B",
    ogrenciler: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1, ad: `\u00d6\u011frenci ${i + 1}`, avatarIdx: i % 16,
      haftalikPuan: 800 - i * 30, aylikPuan: 3000 - i * 100, toplamPuan: 9000 - i * 300,
      oyunSayisi: 140 - i * 5, rozetSayisi: Math.max(0, 12 - i), enIyiDers: ["Matematik", "T\u00fcrk\u00e7e", "Fen Bilimleri", "Sosyal Bilgiler", "\u0130ngilizce"][i % 5],
      sonAktivite: ["Bug\u00fcn", "D\u00fcn", "2 g\u00fcn \u00f6nce"][i % 3],
    })),
  },
  "3": {
    ad: "6-A",
    ogrenciler: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1, ad: `\u00d6\u011frenci ${i + 1}`, avatarIdx: i % 16,
      haftalikPuan: 750 - i * 25, aylikPuan: 2800 - i * 80, toplamPuan: 8500 - i * 250,
      oyunSayisi: 130 - i * 4, rozetSayisi: Math.max(0, 11 - i), enIyiDers: ["Matematik", "T\u00fcrk\u00e7e", "Fen Bilimleri", "Sosyal Bilgiler", "\u0130ngilizce"][i % 5],
      sonAktivite: ["Bug\u00fcn", "D\u00fcn", "3 g\u00fcn \u00f6nce"][i % 3],
    })),
  },
};

const dersIkonlari: Record<string, React.ElementType> = {
  "Matematik": Calculator, "T\u00fcrk\u00e7e": BookOpen, "Fen Bilimleri": FlaskConical,
  "Sosyal Bilgiler": Globe, "\u0130ngilizce": SpellCheck,
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

type Period = "haftalik" | "aylik" | "toplam";
const periodLabels: Record<Period, string> = { haftalik: "Haftal\u0131k", aylik: "Ayl\u0131k", toplam: "T\u00fcm Zamanlar" };

function getScore(s: StudentData, p: Period): number {
  return p === "haftalik" ? s.haftalikPuan : p === "aylik" ? s.aylikPuan : s.toplamPuan;
}
function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-sm font-bold text-[#042940]/40">#{rank}</span>;
}

const filterOptions = [
  { value: "genel", label: "Genel S\u0131ralama", icon: Trophy },
  { value: "turkce", label: "T\u00fcrk\u00e7e", icon: BookOpen },
  { value: "matematik", label: "Matematik", icon: Calculator },
  { value: "fen", label: "Fen Bilimleri", icon: FlaskConical },
  { value: "sosyal", label: "Sosyal Bilgiler", icon: Globe },
  { value: "ingilizce", label: "\u0130ngilizce", icon: SpellCheck },
];

const gamesBySubject: Record<string, { value: string; label: string }[]> = {
  turkce: [{ value: "kelime-avi", label: "Kelime Av\u0131" }, { value: "hafiza-kartlari", label: "Haf\u0131za Kartlar\u0131" }, { value: "cumle-kurma", label: "C\u00fcmle Kurma" }],
  matematik: [{ value: "matematik-yarismasi", label: "Matematik Yar\u0131\u015fmas\u0131" }, { value: "bulmaca-dunyasi", label: "Bulmaca D\u00fcnyas\u0131" }, { value: "kesir-ustasi", label: "Kesir Ustas\u0131" }],
  fen: [{ value: "atom-kesfi", label: "Atom Ke\u015ffi" }, { value: "canlilar-alemi", label: "Canl\u0131lar Alemi" }, { value: "deney-labi", label: "Deney Lab\u0131" }],
  sosyal: [{ value: "tarih-yolculugu", label: "Tarih Yolculu\u011fu" }, { value: "harita-ustasi", label: "Harita Ustas\u0131" }],
  ingilizce: [{ value: "vocabulary-builder", label: "Vocabulary Builder" }, { value: "grammar-quest", label: "Grammar Quest" }],
};

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function ClassDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const sinif = siniflarData[classId];

  const [period, setPeriod] = useState<Period>("haftalik");
  const [selectedFilter, setSelectedFilter] = useState("genel");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showGameDropdown, setShowGameDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ ad: "", email: "" });

  if (!sinif) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">S\u0131n\u0131f bulunamad\u0131.</p>
        <Link href="/teacher" className="mt-4 inline-flex items-center gap-1 text-sm text-[#005C53] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Geri d\u00f6n
        </Link>
      </div>
    );
  }

  const sorted = [...sinif.ogrenciler].sort((a, b) => getScore(b, period) - getScore(a, period));
  const toplamPuan = sinif.ogrenciler.reduce((a, s) => a + getScore(s, period), 0);
  const ortPuan = Math.round(toplamPuan / sinif.ogrenciler.length);
  const toplamOyun = sinif.ogrenciler.reduce((a, s) => a + s.oyunSayisi, 0);
  const toplamRozet = sinif.ogrenciler.reduce((a, s) => a + s.rozetSayisi, 0);
  const availableGames = selectedFilter !== "genel" ? gamesBySubject[selectedFilter] || [] : [];

  return (
    <div className="container py-8">
      {/* Ba\u015fl\u0131k */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <Link href="/teacher" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> \u00d6\u011fretmen Paneli
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">{sinif.ad} S\u0131n\u0131f\u0131</h1>
            <p className="mt-1 text-muted-foreground">{sinif.ogrenciler.length} \u00f6\u011frenci</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-[#005C53] text-white hover:bg-[#005C53]/90">
            <Plus className="mr-1 h-4 w-4" /> \u00d6\u011frenci Ekle
          </Button>
        </div>
      </motion.div>

      {/* Zaman filtresi */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-6">
        <div className="inline-flex rounded-xl bg-white p-1 shadow-sm">
          {(["haftalik", "aylik", "toplam"] as Period[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-all", period === p ? "bg-[#005C53] text-white shadow" : "text-[#042940]/60 hover:text-[#042940]")}>
              {periodLabels[p]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* \u0130statistikler */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Ortalama Puan", value: ortPuan.toLocaleString("tr-TR"), icon: TrendingUp, color: "bg-[#005C53]/10", iconColor: "text-[#005C53]" },
          { title: "Toplam Oyun", value: toplamOyun.toLocaleString("tr-TR"), icon: Gamepad2, color: "bg-[#9FC131]/10", iconColor: "text-[#9FC131]" },
          { title: "Kazan\u0131lan Rozet", value: toplamRozet.toString(), icon: Trophy, color: "bg-[#DBF227]/10", iconColor: "text-[#9FC131]" },
          { title: "\u00d6\u011frenci Say\u0131s\u0131", value: sinif.ogrenciler.length.toString(), icon: Users, color: "bg-[#042940]/10", iconColor: "text-[#042940]" },
        ].map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-extrabold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Disiplin + Oyun filtreleri */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button key={opt.value} onClick={() => { setSelectedFilter(opt.value); setSelectedGame(null); setShowGameDropdown(false); }}
              className={cn("flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all", selectedFilter === opt.value ? "bg-[#005C53] text-white shadow-md" : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]")}>
              <opt.icon className="h-4 w-4" /> {opt.label}
            </button>
          ))}
        </div>
        {selectedFilter !== "genel" && availableGames.length > 0 && (
          <div className="relative inline-block">
            <button onClick={() => setShowGameDropdown(!showGameDropdown)} className="flex items-center gap-2 rounded-xl border border-[#042940]/10 bg-white px-4 py-2 text-sm font-medium text-[#042940] hover:bg-[#042940]/5">
              <Gamepad2 className="h-4 w-4 text-[#042940]/40" />
              {selectedGame ? availableGames.find((g) => g.value === selectedGame)?.label : "T\u00fcm Oyunlar"}
              <ChevronDown className={cn("h-4 w-4 text-[#042940]/40 transition-transform", showGameDropdown && "rotate-180")} />
            </button>
            {showGameDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 w-56 rounded-xl border border-[#042940]/10 bg-white py-1 shadow-lg">
                <button onClick={() => { setSelectedGame(null); setShowGameDropdown(false); }} className={cn("w-full px-4 py-2 text-left text-sm", !selectedGame ? "bg-[#005C53]/10 font-medium text-[#005C53]" : "text-[#042940]/60 hover:bg-[#042940]/5")}>T\u00fcm Oyunlar</button>
                {availableGames.map((g) => (
                  <button key={g.value} onClick={() => { setSelectedGame(g.value); setShowGameDropdown(false); }} className={cn("w-full px-4 py-2 text-left text-sm", selectedGame === g.value ? "bg-[#005C53]/10 font-medium text-[#005C53]" : "text-[#042940]/60 hover:bg-[#042940]/5")}>{g.label}</button>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* \u00d6\u011frenci Listesi */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="hidden items-center gap-4 border-b px-5 py-3 text-xs font-bold uppercase text-muted-foreground sm:flex">
              <span className="w-8">#</span>
              <span className="w-10" />
              <span className="flex-1">\u00d6\u011frenci</span>
              <span className="w-24 text-right">{periodLabels[period]}</span>
              <span className="w-16 text-right">Oyun</span>
              <span className="w-16 text-right">Rozet</span>
              <span className="w-24 text-right">En \u0130yi Ders</span>
              <span className="w-24 text-right">Son Aktivite</span>
            </div>
            <div className="divide-y">
              {sorted.map((ogrenci, index) => {
                const DersIcon = dersIkonlari[ogrenci.enIyiDers] || BookOpen;
                return (
                  <motion.div key={ogrenci.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30">
                    <div className="flex h-8 w-8 items-center justify-center">{getRankIcon(index + 1)}</div>
                    <PlayerAvatar idx={ogrenci.avatarIdx} size={36} />
                    <div className="min-w-0 flex-1">
                      <Link href={`/teacher/class/${classId}/student/${ogrenci.id}`} className="truncate text-sm font-bold text-[#005C53] hover:underline">
                        {ogrenci.ad}
                      </Link>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {getScore(ogrenci, period).toLocaleString("tr-TR")} puan &middot; {ogrenci.oyunSayisi} oyun
                      </p>
                    </div>
                    <span className="hidden w-24 text-right text-sm font-extrabold text-[#005C53] sm:block">{getScore(ogrenci, period).toLocaleString("tr-TR")}</span>
                    <span className="hidden w-16 text-right text-sm text-muted-foreground sm:block">{ogrenci.oyunSayisi}</span>
                    <span className="hidden w-16 text-right text-sm sm:block"><span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 text-[#DBF227]" /> {ogrenci.rozetSayisi}</span></span>
                    <span className="hidden w-24 text-right sm:block"><span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><DersIcon className="h-3.5 w-3.5" /> {ogrenci.enIyiDers}</span></span>
                    <span className="hidden w-24 text-right text-xs text-muted-foreground sm:block">{ogrenci.sonAktivite}</span>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* \u00d6\u011frenci Ekleme Modal\u0131 */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#042940]">\u00d6\u011frenci Ekle</h2>
              <button onClick={() => setShowAddModal(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-[#042940]/40 hover:bg-[#042940]/5"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Ad Soyad</Label>
                <Input id="studentName" placeholder="Ahmet Y\u0131lmaz" value={newStudent.ad} onChange={(e) => setNewStudent({ ...newStudent, ad: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentEmail">\u00d6\u011frenci veya Veli E-postas\u0131</Label>
                <Input id="studentEmail" type="email" placeholder="veli@email.com" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
              </div>
              <p className="text-xs text-muted-foreground">\u00d6\u011frenciye davet e-postas\u0131 g\u00f6nderilecektir.</p>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>\u0130ptal</Button>
                <Button className="flex-1 bg-[#005C53] text-white hover:bg-[#005C53]/90" onClick={() => { setShowAddModal(false); setNewStudent({ ad: "", email: "" }); }}>Davet G\u00f6nder</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
