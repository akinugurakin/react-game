"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, BarChart3, Users, Clock, Trophy, Target,
  TrendingUp, CheckCircle2, AlertCircle, GraduationCap,
  Calculator, BookOpen, Brain, Puzzle, FlaskConical, Globe,
  Atom, TreePine, Landmark, Map, Pen, MessageSquare, Layers,
  SpellCheck, Gamepad2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

type Kazanim = {
  code: string;
  description: string;
  grade: string;
};

type GameDef = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: string;
  subject: string;
  kazanimlar: Kazanim[];
};

type KazanimStat = {
  code: string;
  description: string;
  grade: string;
  totalAttempts: number;
  correctRate: number;      // 0-100
  avgScore: number;
  trend: "up" | "down" | "stable";
};

type StudentGameStat = {
  name: string;
  avatarIdx: number;
  playCount: number;
  bestScore: number;
  avgScore: number;
  lastPlayed: string;
  kazanimProgress: number;  // 0-100
};

/* ------------------------------------------------------------------ */
/*  GAME DEFINITIONS (with kazanımlar)                                 */
/* ------------------------------------------------------------------ */

const gameDefs: Record<number, GameDef> = {
  1: {
    id: 1, title: "Matematik Yarışması", description: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.",
    icon: Calculator, color: "bg-brand-teal", category: "Matematik", subject: "matematik",
    kazanimlar: [
      { code: "MAT.1.2.2", description: "Toplama ve çıkarma işlemlerinin sonuçlarını tahminde bulunarak ve zihinden işlem yaparak muhakeme edebilme", grade: "1. Sınıf" },
      { code: "MAT.2.2.4", description: "Çarpma ve bölme işlemlerini toplama ve çıkarma işlemlerine dayalı olarak çözümleyebilme", grade: "2. Sınıf" },
      { code: "MAT.2.2.5", description: "Çarpma ve bölme işlemlerinin sonuçlarını muhakeme edebilme", grade: "2. Sınıf" },
      { code: "MAT.3.2.3", description: "Çarpma ve bölme işlemlerinin sonuçlarını muhakeme edebilme", grade: "3. Sınıf" },
      { code: "MAT.3.2.4", description: "Çarpma ve bölme işlemlerini çözümleyebilme", grade: "3. Sınıf" },
    ],
  },
  2: {
    id: 2, title: "Bulmaca Dünyası", description: "Geometrik şekilleri doğru yere yerleştir.",
    icon: Puzzle, color: "bg-brand-green", category: "Geometri", subject: "matematik",
    kazanimlar: [
      { code: "MAT.1.3.1", description: "Geometrik şekilleri tanıma ve sınıflandırma", grade: "1. Sınıf" },
      { code: "MAT.2.3.2", description: "Düzlem şekillerinin özelliklerini belirleme", grade: "2. Sınıf" },
      { code: "MAT.3.3.1", description: "Uzamsal ilişkileri anlama ve açıklama", grade: "3. Sınıf" },
    ],
  },
  3: {
    id: 3, title: "Kesir Ustası", description: "Kesirleri karşılaştır, topla ve çıkar.",
    icon: Layers, color: "bg-brand-dark", category: "Kesirler", subject: "matematik",
    kazanimlar: [
      { code: "MAT.3.2.5", description: "Basit kesirleri karşılaştırma ve sıralama", grade: "3. Sınıf" },
      { code: "MAT.4.2.3", description: "Kesirlerle toplama ve çıkarma işlemleri yapma", grade: "4. Sınıf" },
    ],
  },
  4: {
    id: 4, title: "Atom Keşfi", description: "Atomun yapısını keşfet.",
    icon: Atom, color: "bg-brand-teal", category: "Fizik", subject: "fen",
    kazanimlar: [
      { code: "FEN.5.4.1", description: "Atomun temel yapısını ve bileşenlerini açıklama", grade: "5. Sınıf" },
      { code: "FEN.6.4.2", description: "Element ve bileşik kavramlarını ayırt etme", grade: "6. Sınıf" },
    ],
  },
  5: {
    id: 5, title: "Canlılar Alemi", description: "Canlıları sınıflandır, yaşam alanlarını keşfet.",
    icon: TreePine, color: "bg-brand-green", category: "Biyoloji", subject: "fen",
    kazanimlar: [
      { code: "FEN.3.5.1", description: "Canlıları benzerlik ve farklılıklarına göre sınıflandırma", grade: "3. Sınıf" },
      { code: "FEN.4.5.2", description: "Canlıların yaşam alanlarını ve adaptasyonlarını açıklama", grade: "4. Sınıf" },
    ],
  },
  6: {
    id: 6, title: "Deney Labı", description: "Sanal laboratuvarda deneyler yap.",
    icon: FlaskConical, color: "bg-brand-dark", category: "Kimya", subject: "fen",
    kazanimlar: [
      { code: "FEN.5.3.1", description: "Maddenin hallerini ve hal değişimlerini açıklama", grade: "5. Sınıf" },
      { code: "FEN.6.3.2", description: "Karışım ve çözeltileri ayırt etme", grade: "6. Sınıf" },
    ],
  },
  7: {
    id: 7, title: "Tarih Yolculuğu", description: "Osmanlı'dan Cumhuriyet'e tarihte yolculuk yap.",
    icon: Landmark, color: "bg-brand-teal", category: "Tarih", subject: "sosyal",
    kazanimlar: [
      { code: "SOS.4.1.1", description: "Türk tarihindeki önemli olayları kronolojik sıraya koyma", grade: "4. Sınıf" },
      { code: "SOS.5.1.2", description: "Cumhuriyet'in kuruluş sürecini açıklama", grade: "5. Sınıf" },
    ],
  },
  8: {
    id: 8, title: "Harita Ustası", description: "Şehirleri, dağları ve nehirleri harita üzerinde bul.",
    icon: Map, color: "bg-brand-green", category: "Coğrafya", subject: "sosyal",
    kazanimlar: [
      { code: "SOS.4.2.1", description: "Türkiye'nin coğrafi bölgelerini ve özelliklerini tanıma", grade: "4. Sınıf" },
      { code: "SOS.5.2.2", description: "Harita üzerinde konum belirleme ve yön bulma", grade: "5. Sınıf" },
    ],
  },
  9: {
    id: 9, title: "Vatandaşlık Bilgisi", description: "Hak ve sorumluluklarını öğren.",
    icon: Globe, color: "bg-brand-dark", category: "Vatandaşlık", subject: "sosyal",
    kazanimlar: [
      { code: "SOS.4.3.1", description: "Temel hak ve özgürlükleri bilme", grade: "4. Sınıf" },
      { code: "SOS.5.3.2", description: "Demokrasi ve vatandaşlık kavramlarını açıklama", grade: "5. Sınıf" },
    ],
  },
  10: {
    id: 10, title: "Kelime Avı", description: "Karışık harflerden anlamlı kelimeler oluştur.",
    icon: BookOpen, color: "bg-brand-teal", category: "Kelime", subject: "turkce",
    kazanimlar: [
      { code: "TUR.2.4.1", description: "Kelime hazinesini zenginleştirme ve kullanma", grade: "2. Sınıf" },
      { code: "TUR.3.4.2", description: "Kelimelerin anlamlarını bağlamdan çıkarma", grade: "3. Sınıf" },
    ],
  },
  11: {
    id: 11, title: "Hafıza Kartları", description: "Kartları çevir ve eşleşen çiftleri bul.",
    icon: Brain, color: "bg-brand-green", category: "Hafıza", subject: "turkce",
    kazanimlar: [
      { code: "TUR.1.4.1", description: "Kelime-anlam eşleştirmesi yapma", grade: "1. Sınıf" },
      { code: "TUR.2.4.3", description: "Eş anlamlı ve zıt anlamlı kelimeleri bulma", grade: "2. Sınıf" },
    ],
  },
  12: {
    id: 12, title: "Cümle Kurma", description: "Karışık kelimeleri doğru sıraya koy.",
    icon: MessageSquare, color: "bg-brand-dark", category: "Dilbilgisi", subject: "turkce",
    kazanimlar: [
      { code: "TUR.2.5.1", description: "Kurallı ve devrik cümleleri ayırt etme", grade: "2. Sınıf" },
      { code: "TUR.3.5.2", description: "Cümlenin öğelerini belirleme", grade: "3. Sınıf" },
    ],
  },
  13: {
    id: 13, title: "Yazım Kılavuzu", description: "Doğru yazım kurallarını öğren.",
    icon: Pen, color: "bg-brand-lime", category: "Yazım", subject: "turkce",
    kazanimlar: [
      { code: "TUR.3.6.1", description: "Yazım kurallarını doğru uygulama", grade: "3. Sınıf" },
      { code: "TUR.4.6.2", description: "Noktalama işaretlerini doğru kullanma", grade: "4. Sınıf" },
    ],
  },
  14: {
    id: 14, title: "Vocabulary Builder", description: "Resimlerle eşleştirerek İngilizce kelime öğren.",
    icon: SpellCheck, color: "bg-brand-teal", category: "Kelime", subject: "ingilizce",
    kazanimlar: [
      { code: "ING.2.1.1", description: "Temel İngilizce kelimeleri görsel eşleştirme ile öğrenme", grade: "2. Sınıf" },
      { code: "ING.3.1.2", description: "Günlük yaşamda kullanılan İngilizce kelimeleri tanıma", grade: "3. Sınıf" },
    ],
  },
  15: {
    id: 15, title: "Grammar Quest", description: "İngilizce dilbilgisi kurallarını pekiştir!",
    icon: BookOpen, color: "bg-brand-green", category: "Dilbilgisi", subject: "ingilizce",
    kazanimlar: [
      { code: "ING.4.2.1", description: "Temel İngilizce dilbilgisi yapılarını kullanma", grade: "4. Sınıf" },
      { code: "ING.5.2.2", description: "İngilizce cümle yapılarını doğru oluşturma", grade: "5. Sınıf" },
    ],
  },
  16: {
    id: 16, title: "Listening Lab", description: "Dinlediğini anla, soruları yanıtla.",
    icon: MessageSquare, color: "bg-brand-dark", category: "Dinleme", subject: "ingilizce",
    kazanimlar: [
      { code: "ING.3.3.1", description: "Basit İngilizce cümleleri dinleyerek anlama", grade: "3. Sınıf" },
      { code: "ING.4.3.2", description: "Kısa İngilizce diyalogları dinleyerek ana fikri çıkarma", grade: "4. Sınıf" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  MOCK STATS DATA                                                    */
/* ------------------------------------------------------------------ */

function getMockStats(gameId: number) {
  const game = gameDefs[gameId];
  if (!game) return null;

  const kazanimStats: KazanimStat[] = game.kazanimlar.map((k, i) => ({
    code: k.code,
    description: k.description,
    grade: k.grade,
    totalAttempts: 180 + i * 40,
    correctRate: Math.round(55 + Math.random() * 35),
    avgScore: Math.round(60 + Math.random() * 30),
    trend: (["up", "stable", "down"] as const)[i % 3],
  }));

  const students: StudentGameStat[] = [
    { name: "Efe Yıldız", avatarIdx: 0, playCount: 28, bestScore: 980, avgScore: 820, lastPlayed: "Bugün", kazanimProgress: 88 },
    { name: "Zeynep Kaya", avatarIdx: 1, playCount: 24, bestScore: 950, avgScore: 790, lastPlayed: "Bugün", kazanimProgress: 82 },
    { name: "Ali Demir", avatarIdx: 2, playCount: 22, bestScore: 910, avgScore: 750, lastPlayed: "Dün", kazanimProgress: 76 },
    { name: "Elif Çelik", avatarIdx: 3, playCount: 19, bestScore: 880, avgScore: 720, lastPlayed: "Dün", kazanimProgress: 71 },
    { name: "Burak Şahin", avatarIdx: 4, playCount: 16, bestScore: 850, avgScore: 680, lastPlayed: "2 gün önce", kazanimProgress: 65 },
    { name: "Ayşe Koç", avatarIdx: 5, playCount: 14, bestScore: 830, avgScore: 650, lastPlayed: "3 gün önce", kazanimProgress: 58 },
    { name: "Mehmet Arslan", avatarIdx: 0, playCount: 12, bestScore: 790, avgScore: 620, lastPlayed: "3 gün önce", kazanimProgress: 52 },
    { name: "Sude Yılmaz", avatarIdx: 1, playCount: 10, bestScore: 760, avgScore: 590, lastPlayed: "4 gün önce", kazanimProgress: 45 },
  ];

  return {
    game,
    overview: {
      totalPlays: 342,
      uniquePlayers: 28,
      avgScore: 724,
      avgDuration: "4.2 dk",
      bestScore: 980,
      completionRate: 87,
    },
    kazanimStats,
    students,
  };
}

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function getProgressColor(rate: number) {
  if (rate >= 80) return "bg-emerald-500";
  if (rate >= 60) return "bg-[#9FC131]";
  if (rate >= 40) return "bg-amber-400";
  return "bg-red-400";
}

function getProgressBg(rate: number) {
  if (rate >= 80) return "bg-emerald-500/10";
  if (rate >= 60) return "bg-[#9FC131]/10";
  if (rate >= 40) return "bg-amber-400/10";
  return "bg-red-400/10";
}

function getTrendIcon(trend: "up" | "down" | "stable") {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
  if (trend === "down") return <TrendingUp className="h-3.5 w-3.5 rotate-180 text-red-400" />;
  return <div className="h-3.5 w-3.5 flex items-center justify-center"><div className="h-0.5 w-3 rounded-full bg-[#042940]/30" /></div>;
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function GameStatsPage() {
  const params = useParams();
  const gameId = parseInt(params.gameId as string);
  const data = getMockStats(gameId);

  if (!data) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">Oyun bulunamadı.</p>
      </div>
    );
  }

  const { game, overview, kazanimStats, students } = data;
  const Icon = game.icon;

  return (
    <div className="container py-8">
      {/* Geri */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link href="/teacher/games" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Oyunlar
        </Link>
      </motion.div>

      {/* Başlık */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="mb-8">
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="h-2 bg-gradient-to-r from-[#042940] via-[#005C53] to-[#9FC131]" />
          <CardContent className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl",
                game.color,
                game.color === "bg-brand-lime" ? "text-brand-dark" : "text-white"
              )}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-[#042940]">{game.title}</h1>
                  <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium">{game.category}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{game.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Genel İstatistikler */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { title: "Toplam Oynama", value: overview.totalPlays.toLocaleString("tr-TR"), icon: Gamepad2, color: "bg-[#005C53]/10", iconColor: "text-[#005C53]" },
          { title: "Öğrenci Sayısı", value: overview.uniquePlayers.toString(), icon: Users, color: "bg-[#9FC131]/10", iconColor: "text-[#9FC131]" },
          { title: "Ortalama Skor", value: overview.avgScore.toString(), icon: BarChart3, color: "bg-[#042940]/10", iconColor: "text-[#042940]" },
          { title: "En Yüksek Skor", value: overview.bestScore.toString(), icon: Trophy, color: "bg-[#DBF227]/10", iconColor: "text-[#9FC131]" },
          { title: "Ort. Süre", value: overview.avgDuration, icon: Clock, color: "bg-[#005C53]/10", iconColor: "text-[#005C53]" },
          { title: "Tamamlama", value: `%${overview.completionRate}`, icon: Target, color: "bg-[#9FC131]/10", iconColor: "text-[#9FC131]" },
        ].map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-extrabold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Sol — Kazanım İstatistikleri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#005C53]" />
            <h2 className="text-xl font-bold">Kazanım İstatistikleri</h2>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                {kazanimStats.map((ks, i) => (
                  <motion.div
                    key={ks.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-[#005C53]/10 px-2 py-0.5 text-xs font-bold text-[#005C53]">
                            {ks.code}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {ks.grade}
                          </span>
                          {getTrendIcon(ks.trend)}
                        </div>
                        <p className="mt-1.5 text-sm text-[#042940]/70 leading-relaxed">
                          {ks.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Doğruluk Oranı</p>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${ks.correctRate}%` }}
                              transition={{ duration: 0.8, delay: 0.5 + i * 0.06 }}
                              className={`h-full rounded-full ${getProgressColor(ks.correctRate)}`}
                            />
                          </div>
                          <span className="text-xs font-bold">%{ks.correctRate}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Ort. Skor</p>
                        <p className="mt-1 text-lg font-extrabold text-[#042940]">{ks.avgScore}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Deneme Sayısı</p>
                        <p className="mt-1 text-lg font-extrabold text-[#042940]">{ks.totalAttempts}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Kazanım Özeti */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-6"
          >
            <h3 className="mb-3 text-sm font-bold text-[#042940]/60">Kazanım Özeti</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {(() => {
                const strong = kazanimStats.filter(k => k.correctRate >= 70);
                const medium = kazanimStats.filter(k => k.correctRate >= 50 && k.correctRate < 70);
                const weak = kazanimStats.filter(k => k.correctRate < 50);
                return [
                  { title: "Güçlü Kazanımlar", count: strong.length, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                  { title: "Geliştirilmeli", count: medium.length, icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-400/10" },
                  { title: "Zayıf Kazanımlar", count: weak.length, icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10" },
                ];
              })().map((item) => (
                <Card key={item.title} className="border-0 shadow-sm">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.bg}`}>
                      <item.icon className={`h-4.5 w-4.5 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.title}</p>
                      <p className="text-lg font-extrabold">{item.count}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Sağ — Öğrenci Performansları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-[#005C53]" />
            <h2 className="text-xl font-bold">Öğrenci Performansları</h2>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                {students.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005C53]/10 text-sm font-bold text-[#005C53]">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{s.name}</p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{s.playCount} oyun</span>
                        <span>En iyi: {s.bestScore}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.kazanimProgress}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.06 }}
                            className={`h-full rounded-full ${getProgressColor(s.kazanimProgress)}`}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#042940]/50">%{s.kazanimProgress}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-extrabold text-[#005C53]">{s.avgScore}</p>
                      <p className="text-[10px] text-muted-foreground">{s.lastPlayed}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
