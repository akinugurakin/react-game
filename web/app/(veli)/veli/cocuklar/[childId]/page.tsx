"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Gamepad2, Trophy, Clock, TrendingUp, BookOpen, Calculator, FlaskConical, Globe, SpellCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const MOCK_DATA: Record<string, { name: string; sinif: number; avatar: string; totalGames: number; avgScore: number; totalTime: number; subjects: { name: string; icon: React.ElementType; games: number; avg: number; color: string }[]; recent: { game: string; score: number; date: string }[] }> = {
  "1": {
    name: "Ali", sinif: 5, avatar: "AL", totalGames: 87, avgScore: 78, totalTime: 1240,
    subjects: [
      { name: "Matematik", icon: Calculator, games: 32, avg: 82, color: "bg-[#9FC131]" },
      { name: "Türkçe", icon: BookOpen, games: 20, avg: 75, color: "bg-[#005C53]" },
      { name: "Fen Bilimleri", icon: FlaskConical, games: 18, avg: 80, color: "bg-[#042940]" },
      { name: "Sosyal Bilgiler", icon: Globe, games: 10, avg: 70, color: "bg-[#005C53]" },
      { name: "İngilizce", icon: SpellCheck, games: 7, avg: 76, color: "bg-[#9FC131]" },
    ],
    recent: [
      { game: "Matematik Yarışması", score: 92, date: "Bugün" },
      { game: "Tarih Yolculuğu", score: 75, date: "Bugün" },
      { game: "Canlılar Alemi", score: 80, date: "Dün" },
      { game: "Kelime Avı", score: 88, date: "Dün" },
      { game: "Kesir Ustası", score: 65, date: "2 gün önce" },
    ],
  },
  "2": {
    name: "Zeynep", sinif: 3, avatar: "ZE", totalGames: 54, avgScore: 85, totalTime: 780,
    subjects: [
      { name: "Türkçe", icon: BookOpen, games: 22, avg: 90, color: "bg-[#005C53]" },
      { name: "Matematik", icon: Calculator, games: 15, avg: 82, color: "bg-[#9FC131]" },
      { name: "Fen Bilimleri", icon: FlaskConical, games: 10, avg: 78, color: "bg-[#042940]" },
      { name: "İngilizce", icon: SpellCheck, games: 5, avg: 88, color: "bg-[#9FC131]" },
      { name: "Sosyal Bilgiler", icon: Globe, games: 2, avg: 80, color: "bg-[#005C53]" },
    ],
    recent: [
      { game: "Kelime Avı", score: 88, date: "Bugün" },
      { game: "Hafıza Kartları", score: 95, date: "Bugün" },
      { game: "Matematik Yarışması", score: 78, date: "Dün" },
      { game: "Vocabulary Builder", score: 90, date: "2 gün önce" },
    ],
  },
};

export default function ChildDetailPage({ params }: { params: { childId: string } }) {
  const child = MOCK_DATA[params.childId];
  if (!child) return <div className="container py-8"><p>Çocuk bulunamadı.</p></div>;

  return (
    <div className="container py-8">
      <Link href="/veli/cocuklar" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#042940]/50 hover:text-[#042940]">
        <ArrowLeft className="h-4 w-4" /> Çocuklarıma Dön
      </Link>

      {/* Profil */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#005C53]/10 text-xl font-bold text-[#005C53]">{child.avatar}</div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#042940]">{child.name}</h1>
            <p className="text-[#042940]/50">{child.sinif}. Sınıf</p>
          </div>
        </div>
      </motion.div>

      {/* Genel İstatistikler */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Toplam Oyun", value: child.totalGames.toString(), icon: Gamepad2, color: "bg-[#005C53]/10 text-[#005C53]" },
          { label: "Ortalama Başarı", value: `%${child.avgScore}`, icon: Trophy, color: "bg-[#9FC131]/10 text-[#9FC131]" },
          { label: "Toplam Süre", value: `${Math.round(child.totalTime / 60)} saat`, icon: Clock, color: "bg-[#042940]/10 text-[#042940]" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#042940]">{stat.value}</p>
                  <p className="text-xs text-[#042940]/40">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ders Bazlı İlerleme */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#042940]">Ders Bazlı İlerleme</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="space-y-4 p-5">
              {child.subjects.map((sub) => {
                const Icon = sub.icon;
                return (
                  <div key={sub.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#042940]/40" />
                        <span className="text-sm font-medium text-[#042940]">{sub.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#042940]/40">
                        <span>{sub.games} oyun</span>
                        <span className="font-bold text-[#042940]">%{sub.avg}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${sub.color}`} style={{ width: `${sub.avg}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Son Oyunlar */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#042940]">Son Oyunlar</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {child.recent.map((r, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-[#042940]/5 px-5 py-3.5 last:border-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#005C53]/10">
                    <TrendingUp className="h-4 w-4 text-[#005C53]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#042940]">{r.game}</p>
                    <p className="text-xs text-[#042940]/40">{r.date}</p>
                  </div>
                  <span className="text-sm font-bold text-[#042940]">{r.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
