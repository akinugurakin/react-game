"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Gamepad2,
  Trophy,
  Clock,
  ArrowRight,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/lib/auth";

const MOCK_CHILDREN = [
  { id: 1, name: "Ali", sinif: 5, avatar: "AL", gamesThisWeek: 12, avgScore: 78, timeThisWeek: 145 },
  { id: 2, name: "Zeynep", sinif: 3, avatar: "ZE", gamesThisWeek: 8, avgScore: 85, timeThisWeek: 95 },
];

const RECENT_ACTIVITY = [
  { child: "Ali", game: "Matematik Yarışması", score: 92, time: "15 dk önce" },
  { child: "Zeynep", game: "Kelime Avı", score: 88, time: "1 saat önce" },
  { child: "Ali", game: "Tarih Yolculuğu", score: 75, time: "3 saat önce" },
  { child: "Zeynep", game: "Hafıza Kartları", score: 95, time: "Dün" },
  { child: "Ali", game: "Canlılar Alemi", score: 80, time: "Dün" },
];

export default function VeliDashboard() {
  const { user } = useAuthStore();
  const username = user?.username || "Veli";

  const totalGamesWeek = MOCK_CHILDREN.reduce((s, c) => s + c.gamesThisWeek, 0);
  const avgScore = Math.round(MOCK_CHILDREN.reduce((s, c) => s + c.avgScore, 0) / MOCK_CHILDREN.length);
  const totalTimeWeek = MOCK_CHILDREN.reduce((s, c) => s + c.timeThisWeek, 0);

  const stats = [
    { label: "Çocuk Sayısı", value: MOCK_CHILDREN.length.toString(), icon: Users, color: "bg-[#E8634A]/10 text-[#E8634A]" },
    { label: "Bu Hafta Oynanan", value: `${totalGamesWeek} oyun`, icon: Gamepad2, color: "bg-[#005C53]/10 text-[#005C53]" },
    { label: "Ortalama Başarı", value: `%${avgScore}`, icon: Trophy, color: "bg-[#9FC131]/10 text-[#9FC131]" },
    { label: "Haftalık Ekran Süresi", value: `${totalTimeWeek} dk`, icon: Clock, color: "bg-[#042940]/10 text-[#042940]" },
  ];

  return (
    <div className="container py-8">
      {/* Hoşgeldin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold text-[#042940]">
          Hoş geldin, {username}
        </h1>
        <p className="mt-1 text-[#042940]/50">
          Çocuklarınızın öğrenme yolculuğunu buradan takip edin
        </p>
      </motion.div>

      {/* İstatistik Kartları */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Çocuklarım */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#042940]">Çocuklarım</h2>
            <Link href="/veli/cocuklar" className="flex items-center gap-1 text-sm font-medium text-[#005C53] hover:underline">
              Tümünü Gör <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_CHILDREN.map((child, i) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
              >
                <Link href={`/veli/cocuklar/${child.id}`}>
                  <Card className="border-0 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#005C53]/10 text-sm font-bold text-[#005C53]">
                        {child.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#042940]">{child.name}</p>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{child.sinif}. Sınıf</span>
                        </div>
                        <div className="mt-1 flex gap-4 text-xs text-[#042940]/40">
                          <span className="flex items-center gap-1"><Gamepad2 className="h-3 w-3" />{child.gamesThisWeek} oyun</span>
                          <span className="flex items-center gap-1"><Trophy className="h-3 w-3" />%{child.avgScore}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{child.timeThisWeek} dk</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#042940]/20" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Son Aktiviteler */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#042940]">Son Aktiviteler</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {RECENT_ACTIVITY.map((act, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-[#042940]/5 px-5 py-3 last:border-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#005C53]/10">
                    <TrendingUp className="h-4 w-4 text-[#005C53]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[#042940]">
                      <span className="font-bold">{act.child}</span> — {act.game}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#042940]/40">
                      <span>Skor: {act.score}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
