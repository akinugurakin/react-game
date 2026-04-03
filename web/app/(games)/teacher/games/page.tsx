"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, BookOpen, Brain, Puzzle, Play, Users, Clock,
  FlaskConical, Globe, Atom, TreePine, Landmark, Map, Pen,
  MessageSquare, Layers, SpellCheck, BarChart3, X, Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GameItem = {
  id: number; title: string; description: string; icon: React.ElementType;
  color: string; category: string; subject: string; players: number; avgDuration: string;
  info: string; href: string;
};

const allGames: GameItem[] = [
  { id: 1, title: "Matematik Yarışması", description: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.", icon: Calculator, color: "bg-brand-teal", category: "Matematik", subject: "matematik", players: 1245, avgDuration: "3-5 dk", href: "/games/math", info: "Dört işlem becerini zamana karşı test et. Her doğru cevap puan kazandırır, hızlı cevaplar bonus verir." },
  { id: 2, title: "Bulmaca Dünyası", description: "Geometrik şekilleri doğru yere yerleştir.", icon: Puzzle, color: "bg-brand-green", category: "Geometri", subject: "matematik", players: 670, avgDuration: "5-8 dk", href: "#", info: "Geometrik şekilleri tanıyarak doğru alanlara yerleştir. Uzamsal zeka ve şekil algısını geliştirir." },
  { id: 3, title: "Kesir Ustası", description: "Kesirleri karşılaştır, topla ve çıkar.", icon: Layers, color: "bg-brand-dark", category: "Kesirler", subject: "matematik", players: 540, avgDuration: "4-6 dk", href: "#", info: "Kesirleri görsel olarak anlama, karşılaştırma ve işlem yapma becerisi kazandırır." },
  { id: 4, title: "Atom Keşfi", description: "Atomun yapısını keşfet.", icon: Atom, color: "bg-brand-teal", category: "Fizik", subject: "fen", players: 380, avgDuration: "4-6 dk", href: "#", info: "Atom modelini interaktif olarak oluştur. Proton, nötron ve elektron sayılarını doğru yerleştir." },
  { id: 5, title: "Canlılar Alemi", description: "Canlıları sınıflandır, yaşam alanlarını keşfet.", icon: TreePine, color: "bg-brand-green", category: "Biyoloji", subject: "fen", players: 720, avgDuration: "3-5 dk", href: "#", info: "Canlıları bitkiler, hayvanlar ve mikroorganizmalar olarak sınıflandır. Ekosistem bilgini test et." },
  { id: 6, title: "Deney Labı", description: "Sanal laboratuvarda deneyler yap.", icon: FlaskConical, color: "bg-brand-dark", category: "Kimya", subject: "fen", players: 450, avgDuration: "5-7 dk", href: "#", info: "Güvenli sanal ortamda kimya ve fizik deneyleri gerçekleştir. Deney adımlarını doğru sırayla uygula." },
  { id: 7, title: "Tarih Yolculuğu", description: "Osmanlı'dan Cumhuriyet'e tarihte yolculuk yap.", icon: Landmark, color: "bg-brand-teal", category: "Tarih", subject: "sosyal", players: 560, avgDuration: "4-6 dk", href: "#", info: "Tarihi olayları kronolojik sıraya koy. Önemli kişileri ve dönemleri eşleştirerek tarih bilgini pekiştir." },
  { id: 8, title: "Harita Ustası", description: "Şehirleri, dağları ve nehirleri harita üzerinde bul.", icon: Map, color: "bg-brand-green", category: "Coğrafya", subject: "sosyal", players: 430, avgDuration: "3-5 dk", href: "#", info: "Türkiye ve dünya haritası üzerinde coğrafi konumları doğru işaretle. Bölge ve iklim bilgilerini öğren." },
  { id: 9, title: "Vatandaşlık Bilgisi", description: "Hak ve sorumluluklarını öğren.", icon: Globe, color: "bg-brand-dark", category: "Vatandaşlık", subject: "sosyal", players: 310, avgDuration: "3-4 dk", href: "#", info: "Temel hak ve özgürlükler, vatandaşlık sorumlulukları ve demokrasi kavramlarını interaktif olarak öğren." },
  { id: 10, title: "Kelime Avı", description: "Karışık harflerden anlamlı kelimeler oluştur.", icon: BookOpen, color: "bg-brand-teal", category: "Kelime", subject: "turkce", players: 890, avgDuration: "4-6 dk", href: "#", info: "Karışık harflerden anlamlı kelimeler oluşturarak kelime hazineni genişlet. Süreye karşı yarış!" },
  { id: 11, title: "Hafıza Kartları", description: "Kartları çevir ve eşleşen çiftleri bul.", icon: Brain, color: "bg-brand-green", category: "Hafıza", subject: "turkce", players: 1100, avgDuration: "3-4 dk", href: "#", info: "Kelime ve anlamlarını eşleştirerek hem hafızanı hem kelime bilgini güçlendir." },
  { id: 12, title: "Cümle Kurma", description: "Karışık kelimeleri doğru sıraya koy.", icon: MessageSquare, color: "bg-brand-dark", category: "Dilbilgisi", subject: "turkce", players: 620, avgDuration: "3-5 dk", href: "#", info: "Kelimeleri doğru sıraya koyarak anlamlı cümleler oluştur. Türkçe cümle yapısını pekiştir." },
  { id: 13, title: "Yazım Kılavuzu", description: "Doğru yazım kurallarını öğren.", icon: Pen, color: "bg-brand-lime", category: "Yazım", subject: "turkce", players: 340, avgDuration: "4-6 dk", href: "#", info: "Sık yapılan yazım hatalarını tespit et. Büyük harf, noktalama ve birleşik kelimeleri doğru yaz." },
  { id: 14, title: "Vocabulary Builder", description: "Resimlerle eşleştirerek İngilizce kelime öğren.", icon: SpellCheck, color: "bg-brand-teal", category: "Kelime", subject: "ingilizce", players: 780, avgDuration: "3-5 dk", href: "#", info: "Görseller ve kelimeler arasında bağ kurarak İngilizce kelime hazineni geliştir." },
  { id: 15, title: "Grammar Quest", description: "İngilizce dilbilgisi kurallarını pekiştir!", icon: BookOpen, color: "bg-brand-green", category: "Dilbilgisi", subject: "ingilizce", players: 520, avgDuration: "4-6 dk", href: "#", info: "Tense, article ve preposition gibi İngilizce dilbilgisi konularını oyunla öğren." },
  { id: 16, title: "Listening Lab", description: "Dinlediğini anla, soruları yanıtla.", icon: MessageSquare, color: "bg-brand-dark", category: "Dinleme", subject: "ingilizce", players: 390, avgDuration: "5-7 dk", href: "#", info: "İngilizce ses kayıtlarını dinle ve anlama sorularını yanıtla. Dinleme becerisini geliştir." },
];

const subjectLabels: Record<string, string> = {
  matematik: "Matematik", fen: "Fen Bilimleri", sosyal: "Sosyal Bilgiler", turkce: "Türkçe", ingilizce: "İngilizce",
};

function GameDetailModal({ game, onClose }: { game: GameItem; onClose: () => void }) {
  const Icon = game.icon;

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
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#042940]/40 transition-colors hover:bg-black/10 hover:text-[#042940]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center justify-center py-10 bg-gradient-to-b from-[#005C53]/10 to-transparent">
          <div className={cn(
            "flex h-24 w-24 items-center justify-center rounded-3xl",
            game.color,
            game.color === "bg-brand-lime" ? "text-brand-dark" : "text-white"
          )}>
            <Icon className="h-12 w-12" />
          </div>
          <span className="mt-3 rounded-full bg-muted px-3 py-0.5 text-xs font-medium">
            {game.category}
          </span>
        </div>

        <div className="px-6 pb-6">
          <h2 className="text-center text-lg font-extrabold text-[#042940]">{game.title}</h2>
          <p className="mt-1 text-center text-sm text-[#042940]/50">{game.description}</p>

          <div className="mt-5 rounded-xl bg-[#042940]/[0.03] p-4">
            <p className="text-sm leading-relaxed text-[#042940]/60">{game.info}</p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#042940]/40">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {game.players.toLocaleString("tr-TR")} oyuncu
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {game.avgDuration}
            </span>
          </div>

          <div className="mt-5 flex gap-3">
            <Button asChild className="flex-1 rounded-xl py-5 bg-[#005C53] text-white hover:bg-[#005C53]/90">
              <Link href={game.href}>
                <Play className="mr-2 h-4 w-4" /> Oyna
              </Link>
            </Button>
            <Button className="flex-1 rounded-xl py-5" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" /> İstatistik
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TeacherGamesContent() {
  const searchParams = useSearchParams();
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const subject = searchParams.get("subject");
  const filteredGames = subject ? allGames.filter((g) => g.subject === subject) : allGames;
  const pageTitle = subject ? subjectLabels[subject] || "Oyunlar" : "Oyunlar";
  const pageDesc = subject ? `${subjectLabels[subject]} dersine ait eğitici oyunlar` : "Tüm eğitici oyunlar";

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <BarChart3 className="h-5 w-5 text-[#005C53]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">{pageTitle}</h1>
            <p className="mt-1 text-muted-foreground">{pageDesc} — Öğretmen Görünümü</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filteredGames.map((game, index) => (
          <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }}>
            <Card className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-lg" onClick={() => setSelectedGame(game)}>
              {/* Soru işareti */}
              <button
                className="absolute right-4 top-3 z-10 text-[#042940]/25 transition-colors hover:text-[#042940]/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGame(game);
                }}
              >
                <span className="text-base font-bold leading-none">?</span>
              </button>

              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className={`flex items-center justify-center ${game.color} p-8 ${game.color === "bg-brand-lime" ? "text-brand-dark" : "text-white"} sm:w-48`}>
                    <game.icon className="h-16 w-16" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium">{game.category}</span>
                      </div>
                      <h3 className="text-xl font-bold">{game.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{game.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{game.players.toLocaleString("tr-TR")} oyuncu</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{game.avgDuration}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                        <BarChart3 className="mr-1 h-4 w-4" /> İstatistik
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedGame && (
          <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TeacherGamesPage() {
  return (
    <Suspense fallback={<div className="container py-8"><p className="text-muted-foreground">Yükleniyor...</p></div>}>
      <TeacherGamesContent />
    </Suspense>
  );
}
