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
  { id: 1, title: "Matematik Yarışması", description: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.", icon: Calculator, color: "bg-brand-teal", minAge: 6, maxAge: 12, category: "Matematik", subject: "matematik", players: 1245, avgDuration: "3-5 dk", href: "/games/math", free: true },
  { id: 2, title: "Bulmaca Dünyası", description: "Geometrik şekilleri doğru yere yerleştir.", icon: Puzzle, color: "bg-brand-green", minAge: 6, maxAge: 12, category: "Geometri", subject: "matematik", players: 670, avgDuration: "5-8 dk", href: "#", free: false },
  { id: 3, title: "Kesir Ustası", description: "Kesirleri karşılaştır, topla ve çıkar.", icon: Layers, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Kesirler", subject: "matematik", players: 540, avgDuration: "4-6 dk", href: "#", free: false },
  // ── Fen Bilimleri ──
  { id: 4, title: "Atom Keşfi", description: "Atomun yapısını keşfet. Proton, nötron ve elektronları yerleştir!", icon: Atom, color: "bg-brand-teal", minAge: 10, maxAge: 12, category: "Fizik", subject: "fen", players: 380, avgDuration: "4-6 dk", href: "#", free: false },
  { id: 5, title: "Canlılar Alemi", description: "Canlıları sınıflandır, yaşam alanlarını keşfet.", icon: TreePine, color: "bg-brand-green", minAge: 6, maxAge: 10, category: "Biyoloji", subject: "fen", players: 720, avgDuration: "3-5 dk", href: "#", free: true },
  { id: 6, title: "Deney Labı", description: "Sanal laboratuvarda deneyler yap.", icon: FlaskConical, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Kimya", subject: "fen", players: 450, avgDuration: "5-7 dk", href: "#", free: false },
  // ── Sosyal Bilgiler ──
  { id: 7, title: "Tarih Yolculuğu", description: "Osmanlı'dan Cumhuriyet'e tarihte yolculuk yap.", icon: Landmark, color: "bg-brand-teal", minAge: 8, maxAge: 12, category: "Tarih", subject: "sosyal", players: 560, avgDuration: "4-6 dk", href: "#", free: false },
  { id: 8, title: "Harita Ustası", description: "Şehirleri, dağları ve nehirleri harita üzerinde bul.", icon: Map, color: "bg-brand-green", minAge: 8, maxAge: 12, category: "Coğrafya", subject: "sosyal", players: 430, avgDuration: "3-5 dk", href: "#", free: true },
  { id: 9, title: "Vatandaşlık Bilgisi", description: "Hak ve sorumluluklarını öğren.", icon: Globe, color: "bg-brand-dark", minAge: 10, maxAge: 12, category: "Vatandaşlık", subject: "sosyal", players: 310, avgDuration: "3-4 dk", href: "#", free: false },
  // ── Türkçe ──
  { id: 10, title: "Kelime Avı", description: "Karışık harflerden anlamlı kelimeler oluştur.", icon: BookOpen, color: "bg-brand-teal", minAge: 7, maxAge: 12, category: "Kelime", subject: "turkce", players: 890, avgDuration: "4-6 dk", href: "#", free: true },
  { id: 11, title: "Hafıza Kartları", description: "Kartları çevir ve eşleşen çiftleri bul.", icon: Brain, color: "bg-brand-green", minAge: 6, maxAge: 10, category: "Hafıza", subject: "turkce", players: 1100, avgDuration: "3-4 dk", href: "#", free: true },
  { id: 12, title: "Cümle Kurma", description: "Karışık kelimeleri doğru sıraya koy.", icon: MessageSquare, color: "bg-brand-dark", minAge: 7, maxAge: 12, category: "Dilbilgisi", subject: "turkce", players: 620, avgDuration: "3-5 dk", href: "#", free: false },
  { id: 13, title: "Yazım Kılavuzu", description: "Doğru yazım kurallarını öğren.", icon: Pen, color: "bg-brand-lime", minAge: 8, maxAge: 12, category: "Yazım", subject: "turkce", players: 340, avgDuration: "4-6 dk", href: "#", free: false },
  // ── İngilizce ──
  { id: 14, title: "Vocabulary Builder", description: "Resimlerle eşleştirerek İngilizce kelime öğren.", icon: SpellCheck, color: "bg-brand-teal", minAge: 7, maxAge: 12, category: "Kelime", subject: "ingilizce", players: 780, avgDuration: "3-5 dk", href: "#", free: true },
  { id: 15, title: "Grammar Quest", description: "İngilizce dilbilgisi kurallarını pekiştir!", icon: BookOpen, color: "bg-brand-green", minAge: 8, maxAge: 12, category: "Dilbilgisi", subject: "ingilizce", players: 520, avgDuration: "4-6 dk", href: "#", free: false },
  { id: 16, title: "Listening Lab", description: "Dinlediğini anla, soruları yanıtla.", icon: MessageSquare, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Dinleme", subject: "ingilizce", players: 390, avgDuration: "5-7 dk", href: "#", free: false },
];

const subjectLabels: Record<string, string> = {
  matematik: "Matematik",
  fen: "Fen Bilimleri",
  sosyal: "Sosyal Bilgiler",
  turkce: "Türkçe",
  ingilizce: "İngilizce",
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
    ? `${subjectLabels[subject]} dersine ait eğitici oyunlar`
    : "Eğitici oyunlarla eğlenerek öğren";

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
          {/* Ücretsiz oyunlar */}
          {freeGames.length > 0 && (
            <>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-6 rounded-full bg-brand-green" />
                <h2 className="text-lg font-bold">Ücretsiz Oyunlar</h2>
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
                    {game.minAge}-{game.maxAge} yaş
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
    <Suspense fallback={<div className="container py-8"><p className="text-muted-foreground">Yükleniyor...</p></div>}>
      <GamesContent />
    </Suspense>
  );
}
