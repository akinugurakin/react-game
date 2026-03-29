"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calculator, BookOpen, Brain, Puzzle, Play, Users, Clock,
  FlaskConical, Globe, Atom, TreePine, Landmark, Map, Pen,
  MessageSquare, Layers, SpellCheck, BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

type GameItem = {
  id: number; title: string; description: string; icon: React.ElementType;
  color: string; category: string; subject: string; players: number; avgDuration: string;
};

const allGames: GameItem[] = [
  { id: 1, title: "Matematik Yarışması", description: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.", icon: Calculator, color: "bg-brand-teal", category: "Matematik", subject: "matematik", players: 1245, avgDuration: "3-5 dk" },
  { id: 2, title: "Bulmaca Dünyası", description: "Geometrik şekilleri doğru yere yerleştir.", icon: Puzzle, color: "bg-brand-green", category: "Geometri", subject: "matematik", players: 670, avgDuration: "5-8 dk" },
  { id: 3, title: "Kesir Ustası", description: "Kesirleri karşılaştır, topla ve çıkar.", icon: Layers, color: "bg-brand-dark", category: "Kesirler", subject: "matematik", players: 540, avgDuration: "4-6 dk" },
  { id: 4, title: "Atom Keşfi", description: "Atomun yapısını keşfet.", icon: Atom, color: "bg-brand-teal", category: "Fizik", subject: "fen", players: 380, avgDuration: "4-6 dk" },
  { id: 5, title: "Canlılar Alemi", description: "Canlıları sınıflandır, yaşam alanlarını keşfet.", icon: TreePine, color: "bg-brand-green", category: "Biyoloji", subject: "fen", players: 720, avgDuration: "3-5 dk" },
  { id: 6, title: "Deney Labı", description: "Sanal laboratuvarda deneyler yap.", icon: FlaskConical, color: "bg-brand-dark", category: "Kimya", subject: "fen", players: 450, avgDuration: "5-7 dk" },
  { id: 7, title: "Tarih Yolculuğu", description: "Osmanlı'dan Cumhuriyet'e tarihte yolculuk yap.", icon: Landmark, color: "bg-brand-teal", category: "Tarih", subject: "sosyal", players: 560, avgDuration: "4-6 dk" },
  { id: 8, title: "Harita Ustası", description: "Şehirleri, dağları ve nehirleri harita üzerinde bul.", icon: Map, color: "bg-brand-green", category: "Coğrafya", subject: "sosyal", players: 430, avgDuration: "3-5 dk" },
  { id: 9, title: "Vatandaşlık Bilgisi", description: "Hak ve sorumluluklarını öğren.", icon: Globe, color: "bg-brand-dark", category: "Vatandaşlık", subject: "sosyal", players: 310, avgDuration: "3-4 dk" },
  { id: 10, title: "Kelime Avı", description: "Karışık harflerden anlamlı kelimeler oluştur.", icon: BookOpen, color: "bg-brand-teal", category: "Kelime", subject: "turkce", players: 890, avgDuration: "4-6 dk" },
  { id: 11, title: "Hafıza Kartları", description: "Kartları çevir ve eşleşen çiftleri bul.", icon: Brain, color: "bg-brand-green", category: "Hafıza", subject: "turkce", players: 1100, avgDuration: "3-4 dk" },
  { id: 12, title: "Cümle Kurma", description: "Karışık kelimeleri doğru sıraya koy.", icon: MessageSquare, color: "bg-brand-dark", category: "Dilbilgisi", subject: "turkce", players: 620, avgDuration: "3-5 dk" },
  { id: 13, title: "Yazım Kılavuzu", description: "Doğru yazım kurallarını öğren.", icon: Pen, color: "bg-brand-lime", category: "Yazım", subject: "turkce", players: 340, avgDuration: "4-6 dk" },
  { id: 14, title: "Vocabulary Builder", description: "Resimlerle eşleştirerek İngilizce kelime öğren.", icon: SpellCheck, color: "bg-brand-teal", category: "Kelime", subject: "ingilizce", players: 780, avgDuration: "3-5 dk" },
  { id: 15, title: "Grammar Quest", description: "İngilizce dilbilgisi kurallarını pekiştir!", icon: BookOpen, color: "bg-brand-green", category: "Dilbilgisi", subject: "ingilizce", players: 520, avgDuration: "4-6 dk" },
  { id: 16, title: "Listening Lab", description: "Dinlediğini anla, soruları yanıtla.", icon: MessageSquare, color: "bg-brand-dark", category: "Dinleme", subject: "ingilizce", players: 390, avgDuration: "5-7 dk" },
];

const subjectLabels: Record<string, string> = {
  matematik: "Matematik", fen: "Fen Bilimleri", sosyal: "Sosyal Bilgiler", turkce: "Türkçe", ingilizce: "İngilizce",
};

function TeacherGamesContent() {
  const searchParams = useSearchParams();
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
            <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
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
                      <Button size="sm" variant="outline">
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
