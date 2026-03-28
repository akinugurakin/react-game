"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  Clock,
  Star,
  TrendingUp,
  Play,
  Brain,
  Calculator,
  BookOpen,
  Puzzle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { BadgeIcon, ALL_BADGES } from "@/components/ui/badge-icon";
import { useAuthStore } from "@/lib/auth";

const stats = [
  {
    title: "Toplam Oyun",
    value: "47",
    icon: Gamepad2,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "En Yüksek Skor",
    value: "2,850",
    icon: Trophy,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Toplam Süre",
    value: "12s 35dk",
    icon: Clock,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Sıralama",
    value: "#12",
    icon: TrendingUp,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
];

const games = [
  {
    id: 1,
    title: "Matematik Yarışması",
    description: "Toplama ve çıkarma ile hızını test et",
    icon: Calculator,
    color: "bg-blue-500",
    plays: 23,
    bestScore: 1850,
    progress: 75,
  },
  {
    id: 2,
    title: "Kelime Avı",
    description: "Harflerden anlamlı kelimeler oluştur",
    icon: BookOpen,
    color: "bg-emerald-500",
    plays: 12,
    bestScore: 920,
    progress: 45,
  },
  {
    id: 3,
    title: "Hafıza Kartları",
    description: "Eşleşen kartları bul ve hafızanı güçlendir",
    icon: Brain,
    color: "bg-purple-500",
    plays: 8,
    bestScore: 650,
    progress: 30,
  },
  {
    id: 4,
    title: "Bulmaca Dünyası",
    description: "Şekilleri doğru yere yerleştir",
    icon: Puzzle,
    color: "bg-orange-500",
    plays: 4,
    bestScore: 430,
    progress: 15,
  },
];

const recentSessions = [
  { game: "Matematik Yarışması", score: 1200, date: "Bugün, 14:30", duration: "3dk 45sn" },
  { game: "Kelime Avı", score: 850, date: "Bugün, 11:15", duration: "5dk 20sn" },
  { game: "Hafıza Kartları", score: 650, date: "Dün, 19:45", duration: "4dk 10sn" },
  { game: "Matematik Yarışması", score: 1850, date: "Dün, 16:00", duration: "2dk 55sn" },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const username = user?.username || "Oyuncu";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="container py-8">
      {/* Profil Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 overflow-hidden rounded-2xl"
      >
        {/* Banner Gradient */}
        <div className="relative h-36 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute right-1/4 top-0 h-full w-[1px] rotate-[25deg] bg-gradient-to-b from-white/20 to-transparent" />
            <div className="absolute left-1/3 top-0 h-full w-[1px] rotate-[-15deg] bg-gradient-to-b from-white/10 to-transparent" />
            <div className="absolute right-1/2 top-0 h-full w-[1px] rotate-[35deg] bg-gradient-to-b from-white/15 to-transparent" />
          </div>
          <div className="absolute right-6 top-4 rounded-lg bg-black/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
            Seviye 5
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative border-x border-b rounded-b-2xl bg-background px-6 pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <HexAvatar
                initials={initials}
                size="xl"
                online={true}
                borderColor="border-background"
              />
              <div className="mb-1">
                <h1 className="text-2xl font-extrabold">{username}</h1>
                <p className="text-sm text-muted-foreground">
                  Bugün ne oynamak istersin?
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2">
              {ALL_BADGES.filter((b) => b.earned).map((badge) => (
                <BadgeIcon key={badge.id} badge={badge} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* İstatistik Kartları */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
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

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Oyunlar */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Oyunlar</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/games">Tümünü Gör</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="group cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`rounded-xl p-3 ${game.color} text-white`}>
                        <game.icon className="h-6 w-6" />
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Play className="mr-1 h-4 w-4" /> Oyna
                      </Button>
                    </div>
                    <h3 className="font-bold">{game.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {game.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">İlerleme</span>
                        <span className="font-medium">{game.progress}%</span>
                      </div>
                      <Progress value={game.progress} />
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                      <span>{game.plays} oyun</span>
                      <span>
                        <Star className="mr-0.5 inline h-3 w-3" />
                        {game.bestScore} puan
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Son Aktivite + Rozetler */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-bold">Son Aktivite</h2>
            <Card>
              <CardContent className="divide-y p-0">
                {recentSessions.map((session, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">{session.game}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.date} • {session.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{session.score}</p>
                      <p className="text-xs text-muted-foreground">puan</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Tüm Rozetler */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Rozetler</h2>
            <Card>
              <CardContent className="p-5">
                <div className="grid grid-cols-4 gap-3">
                  {ALL_BADGES.map((badge) => (
                    <BadgeIcon
                      key={badge.id}
                      badge={badge}
                      size="md"
                      showLabel
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
