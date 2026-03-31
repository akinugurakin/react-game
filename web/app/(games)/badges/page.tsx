"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Flame,
  Crown,
  Shield,
  Zap,
  Target,
  Award,
  Lock,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

/* ------------------------------------------------------------------ */
/*  ROZET TANIMLARI                                                    */
/* ------------------------------------------------------------------ */

interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  ringColor: string;
  category: "oyun" | "basari" | "topluluk";
  requirement: string;
  checkEarned: (stats: UserStats) => boolean;
  getProgress: (stats: UserStats) => number;
}

interface UserStats {
  total_games: number;
  best_score: number;
  total_time: number;
  total_correct: number;
  total_wrong: number;
  rank: number;
}

const BADGES: BadgeDef[] = [
  // Oyun rozetleri
  {
    id: "first-game",
    name: "İlk Adım",
    description: "İlk oyununu tamamla",
    icon: Star,
    color: "text-amber-400",
    bgColor: "bg-amber-400/15",
    ringColor: "ring-amber-400/30",
    category: "oyun",
    requirement: "1 oyun oyna",
    checkEarned: (s) => s.total_games >= 1,
    getProgress: (s) => Math.min(100, (s.total_games / 1) * 100),
  },
  {
    id: "10-games",
    name: "Meraklı Oyuncu",
    description: "10 oyun tamamla",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/15",
    ringColor: "ring-orange-500/30",
    category: "oyun",
    requirement: "10 oyun oyna",
    checkEarned: (s) => s.total_games >= 10,
    getProgress: (s) => Math.min(100, (s.total_games / 10) * 100),
  },
  {
    id: "50-games",
    name: "Azimli Kahraman",
    description: "50 oyun tamamla",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/15",
    ringColor: "ring-blue-500/30",
    category: "oyun",
    requirement: "50 oyun oyna",
    checkEarned: (s) => s.total_games >= 50,
    getProgress: (s) => Math.min(100, (s.total_games / 50) * 100),
  },
  {
    id: "100-games",
    name: "Oyun Ustası",
    description: "100 oyun tamamla",
    icon: Gamepad2,
    color: "text-violet-500",
    bgColor: "bg-violet-500/15",
    ringColor: "ring-violet-500/30",
    category: "oyun",
    requirement: "100 oyun oyna",
    checkEarned: (s) => s.total_games >= 100,
    getProgress: (s) => Math.min(100, (s.total_games / 100) * 100),
  },
  // Basari rozetleri
  {
    id: "high-score",
    name: "Yüksek Skor",
    description: "Bir oyunda 80+ puan al",
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/15",
    ringColor: "ring-yellow-500/30",
    category: "basari",
    requirement: "80+ puan",
    checkEarned: (s) => s.best_score >= 80,
    getProgress: (s) => Math.min(100, (s.best_score / 80) * 100),
  },
  {
    id: "perfect",
    name: "Mükemmel",
    description: "Bir oyunu sıfır hatayla bitir",
    icon: Target,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/15",
    ringColor: "ring-emerald-500/30",
    category: "basari",
    requirement: "0 hata ile bitir",
    checkEarned: (s) => s.total_correct > 0 && s.total_wrong === 0,
    getProgress: (s) => {
      if (s.total_correct === 0) return 0;
      const accuracy = s.total_correct / (s.total_correct + s.total_wrong);
      return Math.min(100, accuracy * 100);
    },
  },
  {
    id: "champion",
    name: "Şampiyon",
    description: "Liderlik tablosunda 1. ol",
    icon: Crown,
    color: "text-purple-500",
    bgColor: "bg-purple-500/15",
    ringColor: "ring-purple-500/30",
    category: "basari",
    requirement: "Sıralama #1",
    checkEarned: (s) => s.rank === 1,
    getProgress: (s) => (s.rank <= 10 ? Math.max(10, 100 - (s.rank - 1) * 10) : 5),
  },
  // Topluluk rozetleri
  {
    id: "defender",
    name: "Savunucu",
    description: "7 gün üst üste oyna",
    icon: Shield,
    color: "text-sky-500",
    bgColor: "bg-sky-500/15",
    ringColor: "ring-sky-500/30",
    category: "topluluk",
    requirement: "7 günlük seri",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  {
    id: "master",
    name: "Usta",
    description: "Tüm derslerde en az 1 oyun oyna",
    icon: Award,
    color: "text-rose-500",
    bgColor: "bg-rose-500/15",
    ringColor: "ring-rose-500/30",
    category: "topluluk",
    requirement: "5 farklı ders",
    checkEarned: () => false,
    getProgress: () => 0,
  },
];

const CATEGORIES = [
  { key: "all", label: "Tümü" },
  { key: "oyun", label: "Oyun" },
  { key: "basari", label: "Başarı" },
  { key: "topluluk", label: "Topluluk" },
] as const;

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function BadgesPage() {
  const { accessToken } = useAuthStore();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    async function fetchStats() {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.get<UserStats>("/games/my-stats", accessToken);
        setStats(data);
      } catch {
        // API hatası
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [accessToken]);

  const defaultStats: UserStats = {
    total_games: 0,
    best_score: 0,
    total_time: 0,
    total_correct: 0,
    total_wrong: 0,
    rank: 999,
  };

  const currentStats = stats || defaultStats;

  const filteredBadges =
    activeCategory === "all"
      ? BADGES
      : BADGES.filter((b) => b.category === activeCategory);

  const earnedCount = BADGES.filter((b) => b.checkEarned(currentStats)).length;

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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15">
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#042940]">Rozetler</h1>
            <p className="text-sm text-[#042940]/50">
              {earnedCount} / {BADGES.length} rozet kazanıldı
            </p>
          </div>
        </div>
      </motion.div>

      {/* Genel ilerleme */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#042940]">Genel İlerleme</p>
              <p className="text-sm font-bold text-[#005C53]">
                %{Math.round((earnedCount / BADGES.length) * 100)}
              </p>
            </div>
            <Progress
              value={(earnedCount / BADGES.length) * 100}
              className="h-3"
            />
            <div className="mt-3 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#9FC131]" />
                <span className="text-xs text-[#042940]/60">
                  {earnedCount} kazanıldı
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted" />
                <span className="text-xs text-[#042940]/60">
                  {BADGES.length - earnedCount} kilitli
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Kategori Filtreleri */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-all",
              activeCategory === cat.key
                ? "bg-[#005C53] text-white shadow-md"
                : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Rozet Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBadges.map((badge, index) => {
          const earned = badge.checkEarned(currentStats);
          const progress = badge.getProgress(currentStats);
          const Icon = badge.icon;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            >
              <Card
                className={cn(
                  "overflow-hidden border-0 shadow-sm transition-all duration-200 hover:shadow-md",
                  earned && "ring-2 " + badge.ringColor
                )}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* İkon */}
                    <div
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all",
                        earned ? badge.bgColor : "bg-muted",
                        !earned && "opacity-50 grayscale"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-7 w-7",
                          earned ? badge.color : "text-muted-foreground"
                        )}
                      />
                    </div>

                    {/* Bilgi */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={cn(
                            "text-sm font-bold",
                            earned ? "text-[#042940]" : "text-[#042940]/50"
                          )}
                        >
                          {badge.name}
                        </h3>
                        {!earned && (
                          <Lock className="h-3.5 w-3.5 text-[#042940]/30" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[#042940]/50">
                        {badge.description}
                      </p>
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-medium text-[#042940]/40">
                            {badge.requirement}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-bold",
                              earned ? "text-[#9FC131]" : "text-[#042940]/40"
                            )}
                          >
                            {earned ? "Kazanıldı!" : `%${Math.round(progress)}`}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + index * 0.05,
                              ease: "easeOut",
                            }}
                            className={cn(
                              "h-full rounded-full",
                              earned
                                ? "bg-[#9FC131]"
                                : "bg-[#005C53]/30"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bilgi notu */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-8 text-center text-xs text-[#042940]/40"
      >
        Oyun oynayarak ve başarılar elde ederek yeni rozetler kazanabilirsin!
      </motion.p>
    </div>
  );
}
