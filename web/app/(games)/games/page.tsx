"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Atom,
  TreePine,
  Landmark,
  Map,
  Pen,
  MessageSquare,
  Layers,
  SpellCheck,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { useAuthStore } from "@/lib/auth";

type GameItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  minAge: number;
  maxAge: number;
  category: string;
  subject: string;
  players: number;
  avgDuration: string;
  href: string;
  free: boolean;
};

const allGames: GameItem[] = [
  // ── Matematik ──
  { id: 1, title: "Matematik Yar\u0131\u015fmas\u0131", description: "Toplama, \u00e7\u0131karma, \u00e7arpma ve b\u00f6lme ile h\u0131z\u0131n\u0131 test et.", icon: Calculator, color: "bg-brand-teal", minAge: 6, maxAge: 12, category: "Matematik", subject: "matematik", players: 1245, avgDuration: "3-5 dk", href: "/games/math", free: true },
  { id: 2, title: "Bulmaca D\u00fcnyas\u0131", description: "Geometrik \u015fekilleri do\u011fru yere yerle\u015ftir.", icon: Puzzle, color: "bg-brand-green", minAge: 6, maxAge: 12, category: "Geometri", subject: "matematik", players: 670, avgDuration: "5-8 dk", href: "#", free: false },
  { id: 3, title: "Kesir Ustas\u0131", description: "Kesirleri kar\u015f\u0131la\u015ft\u0131r, topla ve \u00e7\u0131kar.", icon: Layers, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Kesirler", subject: "matematik", players: 540, avgDuration: "4-6 dk", href: "#", free: false },
  // ── Fen Bilimleri ──
  { id: 4, title: "Atom Ke\u015ffi", description: "Atomun yap\u0131s\u0131n\u0131 ke\u015ffet. Proton, n\u00f6tron ve elektronlar\u0131 yerle\u015ftir!", icon: Atom, color: "bg-brand-teal", minAge: 10, maxAge: 12, category: "Fizik", subject: "fen", players: 380, avgDuration: "4-6 dk", href: "#", free: false },
  { id: 5, title: "Canl\u0131lar Alemi", description: "Canl\u0131lar\u0131 s\u0131n\u0131fland\u0131r, ya\u015fam alanlar\u0131n\u0131 ke\u015ffet.", icon: TreePine, color: "bg-brand-green", minAge: 6, maxAge: 10, category: "Biyoloji", subject: "fen", players: 720, avgDuration: "3-5 dk", href: "#", free: true },
  { id: 6, title: "Deney Lab\u0131", description: "Sanal laboratuvarda deneyler yap.", icon: FlaskConical, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Kimya", subject: "fen", players: 450, avgDuration: "5-7 dk", href: "#", free: false },
  // ── Sosyal Bilgiler ──
  { id: 7, title: "Tarih Yolculu\u011fu", description: "Osmanl\u0131'dan Cumhuriyet'e tarihte yolculuk yap.", icon: Landmark, color: "bg-brand-teal", minAge: 8, maxAge: 12, category: "Tarih", subject: "sosyal", players: 560, avgDuration: "4-6 dk", href: "#", free: false },
  { id: 8, title: "Harita Ustas\u0131", description: "\u015Eehirleri, da\u011flar\u0131 ve nehirleri harita \u00fczerinde bul.", icon: Map, color: "bg-brand-green", minAge: 8, maxAge: 12, category: "Co\u011frafya", subject: "sosyal", players: 430, avgDuration: "3-5 dk", href: "#", free: true },
  { id: 9, title: "Vatanda\u015fl\u0131k Bilgisi", description: "Hak ve sorumluluklar\u0131n\u0131 \u00f6\u011fren.", icon: Globe, color: "bg-brand-dark", minAge: 10, maxAge: 12, category: "Vatanda\u015fl\u0131k", subject: "sosyal", players: 310, avgDuration: "3-4 dk", href: "#", free: false },
  // ── T\u00fcrk\u00e7e ──
  { id: 10, title: "Kelime Av\u0131", description: "Kar\u0131\u015f\u0131k harflerden anlaml\u0131 kelimeler olu\u015ftur.", icon: BookOpen, color: "bg-brand-teal", minAge: 7, maxAge: 12, category: "Kelime", subject: "turkce", players: 890, avgDuration: "4-6 dk", href: "#", free: true },
  { id: 11, title: "Haf\u0131za Kartlar\u0131", description: "Kartlar\u0131 \u00e7evir ve e\u015fle\u015fen \u00e7iftleri bul.", icon: Brain, color: "bg-brand-green", minAge: 6, maxAge: 10, category: "Haf\u0131za", subject: "turkce", players: 1100, avgDuration: "3-4 dk", href: "#", free: true },
  { id: 12, title: "C\u00fcmle Kurma", description: "Kar\u0131\u015f\u0131k kelimeleri do\u011fru s\u0131raya koy.", icon: MessageSquare, color: "bg-brand-dark", minAge: 7, maxAge: 12, category: "Dilbilgisi", subject: "turkce", players: 620, avgDuration: "3-5 dk", href: "#", free: false },
  { id: 13, title: "Yaz\u0131m K\u0131lavuzu", description: "Do\u011fru yaz\u0131m kurallar\u0131n\u0131 \u00f6\u011fren.", icon: Pen, color: "bg-brand-lime", minAge: 8, maxAge: 12, category: "Yaz\u0131m", subject: "turkce", players: 340, avgDuration: "4-6 dk", href: "#", free: false },
  // ── \u0130ngilizce ──
  { id: 14, title: "Vocabulary Builder", description: "Resimlerle e\u015fle\u015ftirerek \u0130ngilizce kelime \u00f6\u011fren.", icon: SpellCheck, color: "bg-brand-teal", minAge: 7, maxAge: 12, category: "Kelime", subject: "ingilizce", players: 780, avgDuration: "3-5 dk", href: "#", free: true },
  { id: 15, title: "Grammar Quest", description: "\u0130ngilizce dilbilgisi kurallar\u0131n\u0131 peki\u015ftir!", icon: BookOpen, color: "bg-brand-green", minAge: 8, maxAge: 12, category: "Dilbilgisi", subject: "ingilizce", players: 520, avgDuration: "4-6 dk", href: "#", free: false },
  { id: 16, title: "Listening Lab", description: "Dinledi\u011fini anla, sorular\u0131 yan\u0131tla.", icon: MessageSquare, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Dinleme", subject: "ingilizce", players: 390, avgDuration: "5-7 dk", href: "#", free: false },
];

const subjectLabels: Record<string, string> = {
  matematik: "Matematik",
  fen: "Fen Bilimleri",
  sosyal: "Sosyal Bilgiler",
  turkce: "T\u00fcrk\u00e7e",
  ingilizce: "\u0130ngilizce",
};

function GamesContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const subject = searchParams.get("subject");
  const isGuest = !isAuthenticated;

  const filteredGames = subject
    ? allGames.filter((g) => g.subject === subject)
    : allGames;

  // Misafir icin: once ucretsiz, sonra ucretli
  const freeGames = filteredGames.filter((g) => g.free);
  const premiumGames = filteredGames.filter((g) => !g.free);

  const pageTitle = subject ? subjectLabels[subject] || "Oyunlar" : "Oyunlar";
  const pageDesc = subject
    ? `${subjectLabels[subject]} dersine ait e\u011fitici oyunlar`
    : "E\u011fitici oyunlarla e\u011flenerek \u00f6\u011fren";

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold">{pageTitle}</h1>
        <p className="mt-1 text-muted-foreground">{pageDesc}</p>
      </motion.div>

      {isGuest ? (
        <>
          {/* \u00dccretsiz oyunlar */}
          {freeGames.length > 0 && (
            <>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-6 rounded-full bg-brand-green" />
                <h2 className="text-lg font-bold">&#220;cretsiz Oyunlar</h2>
                <span className="rounded-full bg-brand-green/15 px-2.5 py-0.5 text-xs font-bold text-brand-green">
                  Hemen Oyna
                </span>
              </div>
              <div className="mb-10 grid gap-6 sm:grid-cols-2">
                {freeGames.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} locked={false} />
                ))}
              </div>
            </>
          )}

          {/* Premium oyunlar */}
          {premiumGames.length > 0 && (
            <>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-6 rounded-full bg-brand-dark" />
                <h2 className="text-lg font-bold">Premium Oyunlar</h2>
                <span className="rounded-full bg-brand-dark/10 px-2.5 py-0.5 text-xs font-bold text-foreground/60">
                  Abonelik Gerekli
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {premiumGames.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} locked />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        /* Giris yapmis kullanici — hepsi acik */
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} locked={false} />
          ))}
        </div>
      )}
    </div>
  );
}

function GameCard({ game, index, locked }: { game: GameItem; index: number; locked: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className={`group overflow-hidden transition-shadow hover:shadow-lg ${locked ? "opacity-75" : ""}`}>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className={`relative flex items-center justify-center ${game.color} p-8 ${game.color === "bg-brand-lime" ? "text-brand-dark" : "text-white"} sm:w-48`}>
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
                  <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium">
                    {game.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {game.minAge}-{game.maxAge} ya\u015f
                  </span>
                  {locked && (
                    <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-bold text-background">
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold">{game.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{game.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {game.players.toLocaleString("tr-TR")} oyuncu
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {game.avgDuration}
                  </span>
                </div>
                {locked ? (
                  <Button asChild size="sm" variant="outline">
                    <Link href="/register">
                      <Lock className="mr-1 h-3.5 w-3.5" /> Abone Ol
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="sm">
                    <Link href={game.href}>
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

export default function GamesPage() {
  return (
    <Suspense fallback={<div className="container py-8"><p className="text-muted-foreground">Y\u00fckleniyor...</p></div>}>
      <GamesContent />
    </Suspense>
  );
}
