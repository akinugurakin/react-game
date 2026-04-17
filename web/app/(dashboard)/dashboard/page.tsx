"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { BadgeIcon, ALL_BADGES } from "@/components/ui/badge-icon";
import { AvatarPicker, BeanHeadAvatar } from "@/components/ui/avatar-picker";
import { SchoolPicker } from "@/components/ui/school-picker";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

const GAME_NAMES: Record<string, string> = {
  "math": "Matematik Yarışması",
  "es-anlamli-hafiza": "Eş Anlamlı Hafıza",
  "harita-kaptani": "Harita Kaptanı",
  "periyodik-tablo": "Periyodik Tablo",
};

const games = [
  {
    id: 1,
    title: "Matematik Yarışması",
    description: "Toplama ve çıkarma ile hızını test et",
    icon: Calculator,
    color: "bg-blue-500",
    href: "/games/math",
  },
  {
    id: 2,
    title: "Kelime Avı",
    description: "Harflerden anlamlı kelimeler oluştur",
    icon: BookOpen,
    color: "bg-emerald-500",
    href: "#",
  },
  {
    id: 3,
    title: "Hafıza Kartları",
    description: "Eşleşen kartları bul ve hafızanı güçlendir",
    icon: Brain,
    color: "bg-purple-500",
    href: "#",
  },
  {
    id: 4,
    title: "Bulmaca Dünyası",
    description: "Şekilleri doğru yere yerleştir",
    icon: Puzzle,
    color: "bg-orange-500",
    href: "#",
  },
];

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}sn`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return `${m}dk ${s}sn`;
  const h = Math.floor(m / 60);
  return `${h}s ${m % 60}dk`;
}

interface UserStats {
  student_id: number;
  first_name: string;
  total_games: number;
  best_score: number;
  total_time: number;
  total_correct: number;
  total_wrong: number;
  recent_sessions: {
    game_id: string;
    score: number;
    correct_count: number;
    wrong_count: number;
    duration_seconds: number;
    completed_at: string;
  }[];
}

export default function DashboardPage() {
  const { activeStudent, studentSessionToken } = useAuthStore();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const username = activeStudent?.first_name || "Misafir";
  const initials = username.slice(0, 2).toUpperCase();

  // Okul bilgisi
  const [schoolName, setSchoolName] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("lumo-school") || "";
    return "";
  });
  const [editingSchool, setEditingSchool] = useState(false);

  // Gizlilik ayarları
  const [showName, setShowName] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("lumo-show-name") !== "false";
    return true;
  });
  const [showSchool, setShowSchool] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("lumo-show-school") !== "false";
    return true;
  });
  const toggleShowName = () => {
    const next = !showName;
    setShowName(next);
    localStorage.setItem("lumo-show-name", String(next));
  };
  const toggleShowSchool = () => {
    const next = !showSchool;
    setShowSchool(next);
    localStorage.setItem("lumo-show-school", String(next));
  };

  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [avatarId, setAvatarId] = useState<string | null>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("lumo-avatar-id") || null;
    return null;
  });
  const [avatarBg, setAvatarBg] = useState<string>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("lumo-avatar-bg") || "#DBEAFE";
    return "#DBEAFE";
  });

  const handleAvatarSelect = (id: string, bgColor: string) => {
    setAvatarId(id);
    setAvatarBg(bgColor);
    localStorage.setItem("lumo-avatar-id", id);
    localStorage.setItem("lumo-avatar-bg", bgColor);
    // Sidebar'ı bilgilendir (aynı tab'da storage event tetiklenmez)
    window.dispatchEvent(new StorageEvent("storage", { key: "lumo-avatar-id", newValue: id }));
  };

  useEffect(() => {
    async function fetchStats() {
      if (!studentSessionToken) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.get<UserStats>("/games/my-stats", studentSessionToken);
        setStats(data);
      } catch {
        // Giriş yapılmamış veya API hatası
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [studentSessionToken]);

  const statCards = [
    {
      title: "Toplam Oyun",
      value: stats ? String(stats.total_games) : "0",
      icon: Gamepad2,
      color: "text-brand-teal",
      bgColor: "bg-primary/10",
    },
    {
      title: "En Yüksek Skor",
      value: stats ? stats.best_score.toLocaleString("tr-TR") : "0",
      icon: Trophy,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Toplam Süre",
      value: stats ? formatTime(stats.total_time) : "0sn",
      icon: Clock,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Doğru Cevap",
      value: stats ? String(stats.total_correct) : "0",
      icon: TrendingUp,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  // Rozet hesaplama
  const earnedBadgeIds: string[] = [];
  if (stats) {
    if (stats.total_games >= 1) earnedBadgeIds.push("first-game");
    if (stats.total_games >= 10) earnedBadgeIds.push("10-games");
    if (stats.total_games >= 50) earnedBadgeIds.push("50-games");
    if (stats.best_score >= 80) earnedBadgeIds.push("high-score");
    if (stats.best_score >= 500) earnedBadgeIds.push("champion");
    if (stats.total_correct > 0 && stats.total_wrong === 0) earnedBadgeIds.push("perfect");
  }

  return (
    <div className="container py-8">
      {/* Profil Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 overflow-hidden rounded-2xl"
      >
        <div className="relative h-36 bg-gradient-to-r from-brand-dark via-brand-teal to-brand-green">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute right-1/4 top-0 h-full w-[1px] rotate-[25deg] bg-gradient-to-b from-white/20 to-transparent" />
            <div className="absolute left-1/3 top-0 h-full w-[1px] rotate-[-15deg] bg-gradient-to-b from-white/10 to-transparent" />
          </div>
          <div className="absolute right-6 top-4 rounded-lg bg-black/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
            Seviye {stats ? Math.min(10, Math.floor(stats.total_games / 5) + 1) : 1}
          </div>
        </div>

        <div className="relative border-x border-b rounded-b-2xl bg-background px-6 pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <button
                onClick={() => setAvatarPickerOpen(true)}
                className="group relative shrink-0"
              >
                <div
                  className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ring-4 ring-background"
                  style={{ backgroundColor: avatarId ? avatarBg : undefined }}
                >
                  {avatarId ? (
                    <BeanHeadAvatar avatarId={avatarId} size={88} />
                  ) : (
                    <HexAvatar initials={initials} size="xl" online={true} borderColor="ring-background" />
                  )}
                </div>
                {/* Düzenleme ikonu */}
                <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#005C53] text-white shadow-md transition-transform group-hover:scale-110">
                  <Pencil className="h-3.5 w-3.5" />
                </div>
              </button>
              <div className="mb-1">
                <h1 className="text-2xl font-extrabold">{username}</h1>
                {schoolName ? (
                  <p className="text-sm font-medium text-muted-foreground/80">{schoolName}</p>
                ) : (
                  <button
                    onClick={() => {
                      setEditingSchool(true);
                      const el = document.getElementById("school-settings");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm font-medium text-[#005C53] hover:underline"
                  >
                    + Okul ekle
                  </button>
                )}
                <p className="text-sm text-muted-foreground">
                  {stats && stats.total_games > 0
                    ? `${stats.total_games} oyun oynandı`
                    : "Bugün ne oynamak istersin?"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {ALL_BADGES.map((badge) => ({
                ...badge,
                earned: earnedBadgeIds.includes(badge.id),
              }))
                .filter((b) => b.earned)
                .map((badge) => (
                  <BadgeIcon key={badge.id} badge={badge} size="sm" />
                ))}
            </div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* İstatistik Kartları */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
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
                <h2 className="text-xl font-bold">En Sevdiğin Oyunlar</h2>
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
                          <Button asChild size="sm" variant="ghost" className="opacity-0 transition-opacity group-hover:opacity-100">
                            <Link href={game.href}>
                              <Play className="mr-1 h-4 w-4" /> Oyna
                            </Link>
                          </Button>
                        </div>
                        <h3 className="font-bold">{game.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{game.description}</p>
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
                  <CardContent className="p-0">
                    {stats && stats.recent_sessions.length > 0 ? (
                      <div className="divide-y">
                        {stats.recent_sessions.map((session, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                            className="flex items-center justify-between p-4"
                          >
                            <div>
                              <p className="text-sm font-semibold">
                                {GAME_NAMES[session.game_id] || `Oyun #${session.game_id}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ✅ {session.correct_count}/10 • {session.duration_seconds}sn
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-brand-teal">{session.score}</p>
                              <p className="text-xs text-muted-foreground">puan</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-sm text-muted-foreground">
                        Henüz oyun oynamadın. Hadi başlayalım!
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-bold">Rozetler</h2>
                <Card>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-4 gap-3">
                      {ALL_BADGES.map((badge) => (
                        <BadgeIcon
                          key={badge.id}
                          badge={{ ...badge, earned: earnedBadgeIds.includes(badge.id) }}
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
        </>
      )}

      {/* Profil Ayarları */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="mt-8"
      >
        <h2 id="school-settings" className="mb-4 text-xl font-bold">Profil Ayarları</h2>
        <Card>
          <CardContent className="p-5 space-y-4">
            {/* Okul bilgisi */}
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Okulum</p>
                <button
                  onClick={() => setEditingSchool(!editingSchool)}
                  className="text-xs font-medium text-[#005C53] hover:underline"
                >
                  {editingSchool ? "Kapat" : "Değiştir"}
                </button>
              </div>
              {editingSchool ? (
                <div className="mt-2">
                  <SchoolPicker
                    value={schoolName}
                    onChange={(name) => {
                      setSchoolName(name);
                      localStorage.setItem("lumo-school", name);
                      setEditingSchool(false);
                    }}
                  />
                </div>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  {schoolName || "Henüz okul eklenmedi"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-4 mt-8 text-xl font-bold">Gizlilik Ayarları</h2>
        <Card>
          <CardContent className="p-5 space-y-4">
            <p className="text-sm text-muted-foreground">
              Liderlik tablosunda hangi bilgilerinizin görüneceğini seçin.
            </p>
            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div>
                <p className="text-sm font-semibold">Ad Soyad</p>
                <p className="text-xs text-muted-foreground">
                  {showName ? "Liderlik tablosunda adınız görünür" : "Adınız gizli — \"Anonim\" olarak görünür"}
                </p>
              </div>
              <button
                onClick={toggleShowName}
                className={`relative h-6 w-11 rounded-full transition-colors ${showName ? "bg-[#9FC131]" : "bg-muted-foreground/30"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${showName ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div>
                <p className="text-sm font-semibold">Okulum</p>
                <p className="text-xs text-muted-foreground">
                  {showSchool ? "Liderlik tablosunda okulunuz görünür" : "Okul bilginiz gizli"}
                </p>
              </div>
              <button
                onClick={toggleShowSchool}
                className={`relative h-6 w-11 rounded-full transition-colors ${showSchool ? "bg-[#9FC131]" : "bg-muted-foreground/30"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${showSchool ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AvatarPicker
        isOpen={avatarPickerOpen}
        onClose={() => setAvatarPickerOpen(false)}
        onSelect={handleAvatarSelect}
        currentAvatar={avatarId || undefined}
        currentBgColor={avatarBg}
      />
    </div>
  );
}
