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
  Languages,
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
    title: "Matematik Yar\u0131\u015fmas\u0131",
    description: "Toplama, \u00e7\u0131karma, \u00e7arpma ve b\u00f6lme ile h\u0131z\u0131n\u0131 test et.",
    icon: Calculator, color: "bg-[#005C53]", category: "Matematik", age: "6\u201312 ya\u015f", players: 1245, duration: "3\u20135 dk", free: true,
  },
  {
    id: 2,
    title: "Kelime Av\u0131",
    description: "Kar\u0131\u015f\u0131k harflerden anlaml\u0131 kelimeler olu\u015ftur.",
    icon: BookOpen, color: "bg-[#9FC131]", category: "T\u00fcrk\u00e7e", age: "7\u201312 ya\u015f", players: 890, duration: "4\u20136 dk", free: true,
  },
  {
    id: 3,
    title: "Haf\u0131za Kartlar\u0131",
    description: "Kartlar\u0131 \u00e7evir ve e\u015fle\u015fen \u00e7iftleri bul.",
    icon: Brain, color: "bg-[#042940]", category: "Haf\u0131za", age: "6\u201310 ya\u015f", players: 1100, duration: "3\u20134 dk", free: true,
  },
  {
    id: 4,
    title: "Vocabulary Builder",
    description: "Resimlerle e\u015fle\u015ftirerek \u0130ngilizce kelime \u00f6\u011fren.",
    icon: Languages, color: "bg-[#DBF227]", category: "\u0130ngilizce", age: "7\u201312 ya\u015f", players: 780, duration: "3\u20135 dk", free: true,
  },
];

const premiumGames: GameItem[] = [
  {
    id: 5,
    title: "Bulmaca D\u00fcnyas\u0131",
    description: "Geometrik \u015fekilleri do\u011fru yere yerle\u015ftir. Uzamsal zek\u00e2n\u0131 geli\u015ftir!",
    icon: Puzzle, color: "bg-[#9FC131]", category: "Geometri", age: "6\u201312 ya\u015f", players: 670, duration: "5\u20138 dk", free: false,
  },
  {
    id: 6,
    title: "Kesir Ustas\u0131",
    description: "Kesirleri kar\u015f\u0131la\u015ft\u0131r, topla ve \u00e7\u0131kar.",
    icon: Layers, color: "bg-[#042940]", category: "Matematik", age: "8\u201312 ya\u015f", players: 540, duration: "4\u20136 dk", free: false,
  },
  {
    id: 7,
    title: "Atom Ke\u015ffi",
    description: "Atomun yap\u0131s\u0131n\u0131 ke\u015ffet. Proton, n\u00f6tron ve elektronlar\u0131 yerle\u015ftir!",
    icon: Atom, color: "bg-[#005C53]", category: "Fizik", age: "10\u201312 ya\u015f", players: 380, duration: "4\u20136 dk", free: false,
  },
  {
    id: 8,
    title: "Canl\u0131lar Alemi",
    description: "Canl\u0131lar\u0131 s\u0131n\u0131fland\u0131r, ya\u015fam alanlar\u0131n\u0131 ke\u015ffet.",
    icon: TreePine, color: "bg-[#9FC131]", category: "Biyoloji", age: "6\u201310 ya\u015f", players: 720, duration: "3\u20135 dk", free: false,
  },
  {
    id: 9,
    title: "Deney Lab\u0131",
    description: "Sanal laboratuvarda deneyler yap. Kimyasal de\u011fi\u015fimleri g\u00f6zlemle!",
    icon: FlaskConical, color: "bg-[#042940]", category: "Kimya", age: "8\u201312 ya\u015f", players: 450, duration: "5\u20137 dk", free: false,
  },
  {
    id: 10,
    title: "Tarih Yolculu\u011fu",
    description: "Osmanl\u0131'dan Cumhuriyet'e tarihte yolculuk yap.",
    icon: Landmark, color: "bg-[#005C53]", category: "Tarih", age: "8\u201312 ya\u015f", players: 560, duration: "4\u20136 dk", free: false,
  },
  {
    id: 11,
    title: "Harita Ustas\u0131",
    description: "\u015Eehirleri, da\u011flar\u0131 ve nehirleri harita \u00fczerinde bul.",
    icon: Map, color: "bg-[#9FC131]", category: "Co\u011frafya", age: "8\u201312 ya\u015f", players: 430, duration: "3\u20135 dk", free: false,
  },
  {
    id: 12,
    title: "C\u00fcmle Kurma",
    description: "Kar\u0131\u015f\u0131k kelimeleri do\u011fru s\u0131raya koy.",
    icon: MessageSquare, color: "bg-[#042940]", category: "Dilbilgisi", age: "7\u201312 ya\u015f", players: 620, duration: "3\u20135 dk", free: false,
  },
  {
    id: 13,
    title: "Yaz\u0131m K\u0131lavuzu",
    description: "Do\u011fru yaz\u0131m kurallar\u0131n\u0131 \u00f6\u011fren. Hatalar\u0131 bul!",
    icon: Pen, color: "bg-[#005C53]", category: "Yaz\u0131m", age: "8\u201312 ya\u015f", players: 340, duration: "4\u20136 dk", free: false,
  },
  {
    id: 14,
    title: "Grammar Quest",
    description: "\u0130ngilizce dilbilgisi kurallar\u0131n\u0131 e\u011flenceli sorularla peki\u015ftir!",
    icon: BookOpen, color: "bg-[#9FC131]", category: "\u0130ngilizce", age: "8\u201312 ya\u015f", players: 520, duration: "4\u20136 dk", free: false,
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
          {/* Ba&#351;l&#305;k */}
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
              E&#287;itici oyunlarla e&#287;lenerek &#246;&#287;ren
            </p>
          </motion.div>

          {/* &#220;cretsiz Oyunlar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4"
          >
            <div className="mb-6 flex items-center gap-2">
              <div className="h-1 w-6 rounded-full bg-[#9FC131]" />
              <h2 className="text-xl font-bold text-[#042940]">
                &#220;cretsiz Oyunlar
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

          {/* &#220;cretli Oyunlar */}
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
                  T&#252;m oyunlara eri&#351;mek ister misin?
                </h3>
                <p className="text-white/60">
                  &#304;lk hafta &#252;cretsiz. Kredi kart&#305; gerekmez.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#DBF227] px-8 text-base font-bold text-[#042940] hover:bg-[#DBF227]/90"
                >
                  <Link href="/register">
                    Hemen Ba&#351;la
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
