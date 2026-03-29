"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Play,
  Users,
  Clock,
  FlaskConical,
  Globe,
  SpellCheck,
  Atom,
  TreePine,
  Landmark,
  Map,
  MessageSquare,
  Pen,
  Layers,
  Lock,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  OYUN VERILERI                                                      */
/* ------------------------------------------------------------------ */

type GameItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: string;
  age: string;
  players: number;
  duration: string;
  free: boolean;
};

const freeGames: GameItem[] = [
  {
    id: 1,
    title: "Matematik Yarışması",
    description: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.",
    icon: Calculator, color: "bg-[#005C53]", category: "Matematik", age: "6–12 yaş", players: 1245, duration: "3–5 dk", free: true,
  },
  {
    id: 2,
    title: "Kelime Avı",
    description: "Karışık harflerden anlamlı kelimeler oluştur.",
    icon: BookOpen, color: "bg-[#9FC131]", category: "Türkçe", age: "7–12 yaş", players: 890, duration: "4–6 dk", free: true,
  },
  {
    id: 3,
    title: "Hafıza Kartları",
    description: "Kartları çevir ve eşleşen çiftleri bul.",
    icon: Brain, color: "bg-[#042940]", category: "Hafıza", age: "6–10 yaş", players: 1100, duration: "3–4 dk", free: true,
  },
  {
    id: 4,
    title: "Vocabulary Builder",
    description: "Resimlerle eşleştirerek İngilizce kelime öğren.",
    icon: SpellCheck, color: "bg-[#DBF227]", category: "İngilizce", age: "7–12 yaş", players: 780, duration: "3–5 dk", free: true,
  },
];

const premiumGames: GameItem[] = [
  {
    id: 5,
    title: "Bulmaca Dünyası",
    description: "Geometrik şekilleri doğru yere yerleştir. Uzamsal zekânı geliştir!",
    icon: Puzzle, color: "bg-[#9FC131]", category: "Geometri", age: "6–12 yaş", players: 670, duration: "5–8 dk", free: false,
  },
  {
    id: 6,
    title: "Kesir Ustası",
    description: "Kesirleri karşılaştır, topla ve çıkar.",
    icon: Layers, color: "bg-[#042940]", category: "Matematik", age: "8–12 yaş", players: 540, duration: "4–6 dk", free: false,
  },
  {
    id: 7,
    title: "Atom Keşfi",
    description: "Atomun yapısını keşfet. Proton, nötron ve elektronları yerleştir!",
    icon: Atom, color: "bg-[#005C53]", category: "Fizik", age: "10–12 yaş", players: 380, duration: "4–6 dk", free: false,
  },
  {
    id: 8,
    title: "Canlılar Alemi",
    description: "Canlıları sınıflandır, yaşam alanlarını keşfet.",
    icon: TreePine, color: "bg-[#9FC131]", category: "Biyoloji", age: "6–10 yaş", players: 720, duration: "3–5 dk", free: false,
  },
  {
    id: 9,
    title: "Deney Labı",
    description: "Sanal laboratuvarda deneyler yap. Kimyasal değişimleri gözlemle!",
    icon: FlaskConical, color: "bg-[#042940]", category: "Kimya", age: "8–12 yaş", players: 450, duration: "5–7 dk", free: false,
  },
  {
    id: 10,
    title: "Tarih Yolculuğu",
    description: "Osmanlı'dan Cumhuriyet'e tarihte yolculuk yap.",
    icon: Landmark, color: "bg-[#005C53]", category: "Tarih", age: "8–12 yaş", players: 560, duration: "4–6 dk", free: false,
  },
  {
    id: 11,
    title: "Harita Ustası",
    description: "Şehirleri, dağları ve nehirleri harita üzerinde bul.",
    icon: Map, color: "bg-[#9FC131]", category: "Coğrafya", age: "8–12 yaş", players: 430, duration: "3–5 dk", free: false,
  },
  {
    id: 12,
    title: "Cümle Kurma",
    description: "Karışık kelimeleri doğru sıraya koy.",
    icon: MessageSquare, color: "bg-[#042940]", category: "Dilbilgisi", age: "7–12 yaş", players: 620, duration: "3–5 dk", free: false,
  },
  {
    id: 13,
    title: "Yazım Kılavuzu",
    description: "Doğru yazım kurallarını öğren. Hataları bul!",
    icon: Pen, color: "bg-[#005C53]", category: "Yazım", age: "8–12 yaş", players: 340, duration: "4–6 dk", free: false,
  },
  {
    id: 14,
    title: "Grammar Quest",
    description: "İngilizce dilbilgisi kurallarını eğlenceli sorularla pekiştir!",
    icon: BookOpen, color: "bg-[#9FC131]", category: "İngilizce", age: "8–12 yaş", players: 520, duration: "4–6 dk", free: false,
  },
];

/* ------------------------------------------------------------------ */
/*  OYUN KARTI                                                         */
/* ------------------------------------------------------------------ */

function GameCard({ game, index, locked }: { game: GameItem; index: number; locked?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className={`group overflow-hidden border-0 bg-white shadow-sm transition-shadow hover:shadow-lg ${locked ? "opacity-80" : ""}`}>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className={`relative flex items-center justify-center ${game.color} p-8 ${game.color === "bg-[#DBF227]" ? "text-[#042940]" : "text-white"} sm:w-48`}>
              <game.icon className="h-16 w-16" />
              {locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Lock className="h-8 w-8 text-white/80" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[#F5F4EF] px-3 py-0.5 text-xs font-medium text-[#042940]">
                    {game.category}
                  </span>
                  <span className="text-xs text-[#042940]/40">{game.age}</span>
                  {!game.free && (
                    <span className="rounded-full bg-[#042940] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#042940]">{game.title}</h3>
                <p className="mt-2 text-sm text-[#042940]/50">{game.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-4 text-xs text-[#042940]/40">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {game.players.toLocaleString("tr-TR")} oyuncu
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {game.duration}
                  </span>
                </div>
                {locked ? (
                  <Button asChild size="sm" variant="outline" className="border-[#042940]/20 text-[#042940]">
                    <Link href="/register">
                      <Lock className="mr-1 h-3.5 w-3.5" /> Abone Ol
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="sm" className="bg-[#005C53] text-white hover:bg-[#005C53]/90">
                    <Link href="/register">
                      <Play className="mr-1 h-4 w-4" /> Oyna
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function OyunlarPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F5F4EF]">
      <Header />

      <main className="flex-1">
        <div className="container py-10 md:py-16">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
                <Lightbulb className="h-5 w-5 text-[#005C53]" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                Oyunlar
              </h1>
            </div>
            <p className="text-[#042940]/50">
              Eğitici oyunlarla eğlenerek öğren
            </p>
          </motion.div>

          {/* Ücretsiz Oyunlar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4"
          >
            <div className="mb-6 flex items-center gap-2">
              <div className="h-1 w-6 rounded-full bg-[#9FC131]" />
              <h2 className="text-xl font-bold text-[#042940]">
                Ücretsiz Oyunlar
              </h2>
              <span className="rounded-full bg-[#9FC131]/15 px-2.5 py-0.5 text-xs font-bold text-[#9FC131]">
                Hemen Oyna
              </span>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 mb-14">
            {freeGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>

          {/* Ücretli Oyunlar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <div className="mb-6 flex items-center gap-2">
              <div className="h-1 w-6 rounded-full bg-[#042940]" />
              <h2 className="text-xl font-bold text-[#042940]">
                Premium Oyunlar
              </h2>
              <span className="rounded-full bg-[#042940]/10 px-2.5 py-0.5 text-xs font-bold text-[#042940]/60">
                Abonelik Gerekli
              </span>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 mb-10">
            {premiumGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} locked />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-0 bg-[#005C53] shadow-lg">
              <CardContent className="flex flex-col items-center gap-4 p-10 text-center md:p-14">
                <h3 className="text-2xl font-extrabold text-white md:text-3xl">
                  Tüm oyunlara erişmek ister misin?
                </h3>
                <p className="text-white/60">
                  İlk hafta ücretsiz. Kredi kartı gerekmez.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#DBF227] px-8 text-base font-bold text-[#042940] hover:bg-[#DBF227]/90"
                >
                  <Link href="/register">
                    Hemen Başla
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
