"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Calculator,
  BookOpen,
  FlaskConical,
  Globe,
  SpellCheck,
  X,
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
  detailText: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  ringColor: string;
  category: string;
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
  // Genel
  {
    id: "first-game",
    name: "İlk Adım",
    description: "İlk oyununu tamamla",
    detailText: "LUMO'daki ilk oyununu tamamladığında bu rozeti kazanırsın. Herhangi bir dersteki herhangi bir oyunu bitirmen yeterli!",
    icon: Star,
    color: "text-amber-400",
    bgColor: "bg-amber-400/15",
    ringColor: "ring-amber-400/30",
    category: "all",
    requirement: "1 oyun oyna",
    checkEarned: (s) => s.total_games >= 1,
    getProgress: (s) => Math.min(100, (s.total_games / 1) * 100),
  },
  {
    id: "10-games",
    name: "Meraklı Oyuncu",
    description: "10 oyun tamamla",
    detailText: "Toplam 10 oyun tamamladığında bu rozet senindir. Farklı derslerde oynamaya devam et!",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/15",
    ringColor: "ring-orange-500/30",
    category: "all",
    requirement: "10 oyun oyna",
    checkEarned: (s) => s.total_games >= 10,
    getProgress: (s) => Math.min(100, (s.total_games / 10) * 100),
  },
  {
    id: "50-games",
    name: "Azimli Kahraman",
    description: "50 oyun tamamla",
    detailText: "50 oyuna ulaşmak gerçek bir azim gerektirir. Bu rozet senin kararlılığını simgeler!",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/15",
    ringColor: "ring-blue-500/30",
    category: "all",
    requirement: "50 oyun oyna",
    checkEarned: (s) => s.total_games >= 50,
    getProgress: (s) => Math.min(100, (s.total_games / 50) * 100),
  },
  {
    id: "100-games",
    name: "Oyun Ustası",
    description: "100 oyun tamamla",
    detailText: "100 oyun! Artık gerçek bir LUMO ustasısın. Bu rozeti çok az kişi kazanabilir.",
    icon: Gamepad2,
    color: "text-violet-500",
    bgColor: "bg-violet-500/15",
    ringColor: "ring-violet-500/30",
    category: "all",
    requirement: "100 oyun oyna",
    checkEarned: (s) => s.total_games >= 100,
    getProgress: (s) => Math.min(100, (s.total_games / 100) * 100),
  },
  {
    id: "high-score",
    name: "Yüksek Skor",
    description: "Bir oyunda 80+ puan al",
    detailText: "Herhangi bir oyunda 80 veya üzeri puan aldığında bu rozeti kazanırsın. Hedefine odaklan!",
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/15",
    ringColor: "ring-yellow-500/30",
    category: "all",
    requirement: "80+ puan",
    checkEarned: (s) => s.best_score >= 80,
    getProgress: (s) => Math.min(100, (s.best_score / 80) * 100),
  },
  {
    id: "perfect",
    name: "Mükemmel",
    description: "Bir oyunu sıfır hatayla bitir",
    detailText: "Hiç hata yapmadan bir oyunu tamamla. Konsantrasyonunu koru ve mükemmelliğe ulaş!",
    icon: Target,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/15",
    ringColor: "ring-emerald-500/30",
    category: "all",
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
    detailText: "Liderlik tablosunun zirvesine çık! Türkiye geneli, okul veya sınıf sıralamasında 1. sıraya yerleş.",
    icon: Crown,
    color: "text-purple-500",
    bgColor: "bg-purple-500/15",
    ringColor: "ring-purple-500/30",
    category: "all",
    requirement: "Sıralama #1",
    checkEarned: (s) => s.rank === 1,
    getProgress: (s) => (s.rank <= 10 ? Math.max(10, 100 - (s.rank - 1) * 10) : 5),
  },
  {
    id: "defender",
    name: "Savunucu",
    description: "7 gün üst üste oyna",
    detailText: "7 gün art arda en az 1 oyun oyna. Düzenli çalışma alışkanlığın ödüllendirilir!",
    icon: Shield,
    color: "text-sky-500",
    bgColor: "bg-sky-500/15",
    ringColor: "ring-sky-500/30",
    category: "all",
    requirement: "7 günlük seri",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  {
    id: "master",
    name: "Usta",
    description: "Tüm derslerde en az 1 oyun oyna",
    detailText: "Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler ve İngilizce — her derste en az 1 oyun tamamla.",
    icon: Award,
    color: "text-rose-500",
    bgColor: "bg-rose-500/15",
    ringColor: "ring-rose-500/30",
    category: "all",
    requirement: "5 farklı ders",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  // Matematik
  {
    id: "math-beginner",
    name: "Sayı Avcısı",
    description: "İlk matematik oyununu tamamla",
    detailText: "Matematik dünyasına hoş geldin! İlk matematik oyununu bitirdiğinde bu rozet senin.",
    icon: Calculator,
    color: "text-blue-600",
    bgColor: "bg-blue-600/15",
    ringColor: "ring-blue-600/30",
    category: "matematik",
    requirement: "1 matematik oyunu",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  {
    id: "math-master",
    name: "Matematik Dehası",
    description: "Matematik oyunlarında 90+ puan al",
    detailText: "Bir matematik oyununda 90 veya üzeri puan al. Sayılarla aran çok iyi!",
    icon: Calculator,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/15",
    ringColor: "ring-indigo-500/30",
    category: "matematik",
    requirement: "90+ puan (matematik)",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  // Türkçe
  {
    id: "turkce-beginner",
    name: "Kelime Ustası",
    description: "İlk Türkçe oyununu tamamla",
    detailText: "Türkçe oyunlarına adım attın! Kelime hazineni geliştirmeye devam et.",
    icon: BookOpen,
    color: "text-rose-600",
    bgColor: "bg-rose-600/15",
    ringColor: "ring-rose-600/30",
    category: "turkce",
    requirement: "1 Türkçe oyunu",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  {
    id: "turkce-master",
    name: "Edebiyatçı",
    description: "Türkçe oyunlarında 90+ puan al",
    detailText: "Türkçe'de ustalaştın! 90+ puan alarak dil becerinizi kanıtla.",
    icon: BookOpen,
    color: "text-pink-500",
    bgColor: "bg-pink-500/15",
    ringColor: "ring-pink-500/30",
    category: "turkce",
    requirement: "90+ puan (Türkçe)",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  // Fen Bilimleri
  {
    id: "fen-beginner",
    name: "Genç Bilim İnsanı",
    description: "İlk Fen Bilimleri oyununu tamamla",
    detailText: "Bilim dünyasına hoş geldin! Keşfetmeye devam et, deneyler seni bekliyor.",
    icon: FlaskConical,
    color: "text-green-600",
    bgColor: "bg-green-600/15",
    ringColor: "ring-green-600/30",
    category: "fen",
    requirement: "1 Fen oyunu",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  {
    id: "fen-master",
    name: "Profesör",
    description: "Fen Bilimleri oyunlarında 90+ puan al",
    detailText: "Fen Bilimleri'nde 90+ puan! Gerçek bir bilim insanı gibi düşünüyorsun.",
    icon: FlaskConical,
    color: "text-teal-500",
    bgColor: "bg-teal-500/15",
    ringColor: "ring-teal-500/30",
    category: "fen",
    requirement: "90+ puan (Fen)",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  // Sosyal Bilgiler
  {
    id: "sosyal-beginner",
    name: "Kaşif",
    description: "İlk Sosyal Bilgiler oyununu tamamla",
    detailText: "Tarih ve coğrafya dünyasını keşfetmeye başladın! İlk adımın tamamlandı.",
    icon: Globe,
    color: "text-amber-600",
    bgColor: "bg-amber-600/15",
    ringColor: "ring-amber-600/30",
    category: "sosyal",
    requirement: "1 Sosyal Bilgiler oyunu",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  {
    id: "sosyal-master",
    name: "Tarihçi",
    description: "Sosyal Bilgiler oyunlarında 90+ puan al",
    detailText: "Tarih ve coğrafyada uzmanlaştın! 90+ puanla geçmişi çok iyi biliyorsun.",
    icon: Globe,
    color: "text-orange-600",
    bgColor: "bg-orange-600/15",
    ringColor: "ring-orange-600/30",
    category: "sosyal",
    requirement: "90+ puan (Sosyal)",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  // İngilizce
  {
    id: "ing-beginner",
    name: "Hello!",
    description: "İlk İngilizce oyununu tamamla",
    detailText: "İngilizce öğrenme yolculuğun başladı! Her oyun kelime hazneni genişletir.",
    icon: SpellCheck,
    color: "text-cyan-600",
    bgColor: "bg-cyan-600/15",
    ringColor: "ring-cyan-600/30",
    category: "ingilizce",
    requirement: "1 İngilizce oyunu",
    checkEarned: () => false,
    getProgress: () => 0,
  },
  {
    id: "ing-master",
    name: "Polyglot",
    description: "İngilizce oyunlarında 90+ puan al",
    detailText: "İngilizce'de harikasın! 90+ puanla dil becerini kanıtladın.",
    icon: SpellCheck,
    color: "text-sky-600",
    bgColor: "bg-sky-600/15",
    ringColor: "ring-sky-600/30",
    category: "ingilizce",
    requirement: "90+ puan (İngilizce)",
    checkEarned: () => false,
    getProgress: () => 0,
  },
];

const CATEGORIES = [
  { key: "all", label: "Tümü", icon: Award },
  { key: "matematik", label: "Matematik", icon: Calculator },
  { key: "turkce", label: "Türkçe", icon: BookOpen },
  { key: "fen", label: "Fen Bilimleri", icon: FlaskConical },
  { key: "sosyal", label: "Sosyal Bilgiler", icon: Globe },
  { key: "ingilizce", label: "İngilizce", icon: SpellCheck },
];

/* ------------------------------------------------------------------ */
/*  ROZET DETAY MODAL                                                  */
/* ------------------------------------------------------------------ */

function BadgeDetailModal({
  badge,
  earned,
  progress,
  onClose,
}: {
  badge: BadgeDef;
  earned: boolean;
  progress: number;
  onClose: () => void;
}) {
  const Icon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#042940]/40 transition-colors hover:bg-black/10 hover:text-[#042940]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Üst — Rozet görseli */}
        <div
          className={cn(
            "flex flex-col items-center justify-center py-10",
            earned
              ? "bg-gradient-to-b from-[#005C53]/10 to-transparent"
              : "bg-gradient-to-b from-muted/50 to-transparent"
          )}
        >
          <div
            className={cn(
              "flex h-24 w-24 items-center justify-center rounded-3xl transition-all",
              earned ? badge.bgColor : "bg-muted",
              !earned && "opacity-50 grayscale"
            )}
          >
            <Icon
              className={cn(
                "h-12 w-12",
                earned ? badge.color : "text-muted-foreground"
              )}
            />
          </div>
          {earned && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 rounded-full bg-[#9FC131]/15 px-3 py-1 text-xs font-bold text-[#9FC131]"
            >
              Kazanıldı!
            </motion.p>
          )}
          {!earned && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-[#042940]/40">
              <Lock className="h-3.5 w-3.5" />
              Henüz kazanılmadı
            </div>
          )}
        </div>

        {/* Alt — Bilgiler */}
        <div className="px-6 pb-6">
          <h2 className="text-center text-lg font-extrabold text-[#042940]">
            {badge.name}
          </h2>
          <p className="mt-1 text-center text-sm text-[#042940]/50">
            {badge.description}
          </p>

          <div className="mt-5 rounded-xl bg-[#042940]/[0.03] p-4">
            <p className="text-sm leading-relaxed text-[#042940]/60">
              {badge.detailText}
            </p>
          </div>

          {/* İlerleme */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-[#042940]/40">
                {badge.requirement}
              </span>
              <span
                className={cn(
                  "text-xs font-bold",
                  earned ? "text-[#9FC131]" : "text-[#042940]/40"
                )}
              >
                %{Math.round(progress)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full",
                  earned ? "bg-[#9FC131]" : "bg-[#005C53]/30"
                )}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function BadgesPage() {
  const { accessToken } = useAuthStore();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedBadge, setSelectedBadge] = useState<BadgeDef | null>(null);

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
      : BADGES.filter((b) => b.category === activeCategory || b.category === "all");

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
        {CATEGORIES.map((cat) => {
          const CatIcon = cat.icon;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                activeCategory === cat.key
                  ? "bg-[#005C53] text-white shadow-md"
                  : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
              )}
            >
              <CatIcon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
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
                  "cursor-pointer overflow-hidden border-0 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
                  earned && "ring-2 " + badge.ringColor
                )}
                onClick={() => setSelectedBadge(badge)}
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
                              earned ? "bg-[#9FC131]" : "bg-[#005C53]/30"
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

      {/* Rozet Detay Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <BadgeDetailModal
            badge={selectedBadge}
            earned={selectedBadge.checkEarned(currentStats)}
            progress={selectedBadge.getProgress(currentStats)}
            onClose={() => setSelectedBadge(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
