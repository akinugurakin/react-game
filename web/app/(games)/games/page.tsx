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
  Languages,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

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
};

const allGames: GameItem[] = [
  // ── Matematik ──
  {
    id: 1,
    title: "Matematik Yar\u0131\u015fmas\u0131",
    description: "Toplama, \u00e7\u0131karma, \u00e7arpma ve b\u00f6lme ile h\u0131z\u0131n\u0131 test et. S\u00fcre bitmeden en \u00e7ok soruyu do\u011fru yan\u0131tla!",
    icon: Calculator,
    color: "bg-brand-teal",
    minAge: 6, maxAge: 12,
    category: "Matematik",
    subject: "matematik",
    players: 1245,
    avgDuration: "3-5 dk",
    href: "/games/math",
  },
  {
    id: 2,
    title: "Bulmaca D\u00fcnyas\u0131",
    description: "Geometrik \u015fekilleri do\u011fru yere yerle\u015ftir. Uzamsal zek\u00e2n\u0131 geli\u015ftir!",
    icon: Puzzle,
    color: "bg-brand-green",
    minAge: 6, maxAge: 12,
    category: "Geometri",
    subject: "matematik",
    players: 670,
    avgDuration: "5-8 dk",
    href: "#",
  },
  {
    id: 3,
    title: "Kesir Ustas\u0131",
    description: "Kesirleri kar\u015f\u0131la\u015ft\u0131r, topla ve \u00e7\u0131kar. G\u00f6rsel par\u00e7alarla \u00f6\u011fren!",
    icon: Layers,
    color: "bg-brand-dark",
    minAge: 8, maxAge: 12,
    category: "Kesirler",
    subject: "matematik",
    players: 540,
    avgDuration: "4-6 dk",
    href: "#",
  },
  // ── Fen Bilimleri ──
  {
    id: 4,
    title: "Atom Ke\u015ffi",
    description: "Atomun yap\u0131s\u0131n\u0131 ke\u015ffet. Proton, n\u00f6tron ve elektronlar\u0131 do\u011fru yere yerle\u015ftir!",
    icon: Atom,
    color: "bg-brand-teal",
    minAge: 10, maxAge: 12,
    category: "Fizik",
    subject: "fen",
    players: 380,
    avgDuration: "4-6 dk",
    href: "#",
  },
  {
    id: 5,
    title: "Canl\u0131lar Alemi",
    description: "Canl\u0131lar\u0131 s\u0131n\u0131fland\u0131r, ya\u015fam alanlar\u0131n\u0131 ke\u015ffet. Do\u011fay\u0131 tan\u0131!",
    icon: TreePine,
    color: "bg-brand-green",
    minAge: 6, maxAge: 10,
    category: "Biyoloji",
    subject: "fen",
    players: 720,
    avgDuration: "3-5 dk",
    href: "#",
  },
  {
    id: 6,
    title: "Deney Lab\u0131",
    description: "Sanal laboratuvarda deneyler yap. Maddenin hallerini ve kimyasal de\u011fi\u015fimleri g\u00f6zlemle!",
    icon: FlaskConical,
    color: "bg-brand-dark",
    minAge: 8, maxAge: 12,
    category: "Kimya",
    subject: "fen",
    players: 450,
    avgDuration: "5-7 dk",
    href: "#",
  },
  // ── Sosyal Bilgiler ──
  {
    id: 7,
    title: "Tarih Yolculu\u011fu",
    description: "Osmanl\u0131'dan Cumhuriyet'e tarihte yolculuk yap. Olaylar\u0131 kronolojik s\u0131rala!",
    icon: Landmark,
    color: "bg-brand-teal",
    minAge: 8, maxAge: 12,
    category: "Tarih",
    subject: "sosyal",
    players: 560,
    avgDuration: "4-6 dk",
    href: "#",
  },
  {
    id: 8,
    title: "Harita Ustas\u0131",
    description: "\u015Eehirleri, da\u011flar\u0131 ve nehirleri harita \u00fczerinde bul. Co\u011frafya bilgini test et!",
    icon: Map,
    color: "bg-brand-green",
    minAge: 8, maxAge: 12,
    category: "Co\u011frafya",
    subject: "sosyal",
    players: 430,
    avgDuration: "3-5 dk",
    href: "#",
  },
  {
    id: 9,
    title: "Vatanda\u015fl\u0131k Bilgisi",
    description: "Hak ve sorumluluklar\u0131n\u0131 \u00f6\u011fren. Demokrasi ve yurtta\u015fl\u0131k konular\u0131nda quiz!",
    icon: Globe,
    color: "bg-brand-dark",
    minAge: 10, maxAge: 12,
    category: "Vatanda\u015fl\u0131k",
    subject: "sosyal",
    players: 310,
    avgDuration: "3-4 dk",
    href: "#",
  },
  // ── T\u00fcrk\u00e7e ──
  {
    id: 10,
    title: "Kelime Av\u0131",
    description: "Kar\u0131\u015f\u0131k harflerden anlaml\u0131 kelimeler olu\u015ftur. Kelime hazineni geni\u015flet!",
    icon: BookOpen,
    color: "bg-brand-teal",
    minAge: 7, maxAge: 12,
    category: "Kelime",
    subject: "turkce",
    players: 890,
    avgDuration: "4-6 dk",
    href: "#",
  },
  {
    id: 11,
    title: "Haf\u0131za Kartlar\u0131",
    description: "Kartlar\u0131 \u00e7evir ve e\u015fle\u015fen \u00e7iftleri bul. Ne kadar az hamlede bitirirsen o kadar \u00e7ok puan!",
    icon: Brain,
    color: "bg-brand-green",
    minAge: 6, maxAge: 10,
    category: "Haf\u0131za",
    subject: "turkce",
    players: 1100,
    avgDuration: "3-4 dk",
    href: "#",
  },
  {
    id: 12,
    title: "C\u00fcmle Kurma",
    description: "Kar\u0131\u015f\u0131k kelimeleri do\u011fru s\u0131raya koy ve anlaml\u0131 c\u00fcmleler olu\u015ftur!",
    icon: MessageSquare,
    color: "bg-brand-dark",
    minAge: 7, maxAge: 12,
    category: "Dilbilgisi",
    subject: "turkce",
    players: 620,
    avgDuration: "3-5 dk",
    href: "#",
  },
  {
    id: 13,
    title: "Yaz\u0131m K\u0131lavuzu",
    description: "Do\u011fru yaz\u0131m kurallar\u0131n\u0131 \u00f6\u011fren. Yaz\u0131m hatalar\u0131n\u0131 bul ve d\u00fczelt!",
    icon: Pen,
    color: "bg-brand-lime",
    minAge: 8, maxAge: 12,
    category: "Yaz\u0131m",
    subject: "turkce",
    players: 340,
    avgDuration: "4-6 dk",
    href: "#",
  },
  // ── \u0130ngilizce ──
  {
    id: 14,
    title: "Vocabulary Builder",
    description: "Resimlerle e\u015fle\u015ftirerek \u0130ngilizce kelime \u00f6\u011fren. Her g\u00fcn yeni kelimeler!",
    icon: Languages,
    color: "bg-brand-teal",
    minAge: 7, maxAge: 12,
    category: "Kelime",
    subject: "ingilizce",
    players: 780,
    avgDuration: "3-5 dk",
    href: "#",
  },
  {
    id: 15,
    title: "Grammar Quest",
    description: "\u0130ngilizce dilbilgisi kurallar\u0131n\u0131 e\u011flenceli sorularla peki\u015ftir!",
    icon: BookOpen,
    color: "bg-brand-green",
    minAge: 8, maxAge: 12,
    category: "Dilbilgisi",
    subject: "ingilizce",
    players: 520,
    avgDuration: "4-6 dk",
    href: "#",
  },
  {
    id: 16,
    title: "Listening Lab",
    description: "Dinledi\u011fini anla, sorular\u0131 yan\u0131tla. Dinleme becerinizi geli\u015ftir!",
    icon: MessageSquare,
    color: "bg-brand-dark",
    minAge: 8, maxAge: 12,
    category: "Dinleme",
    subject: "ingilizce",
    players: 390,
    avgDuration: "5-7 dk",
    href: "#",
  },
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
  const subject = searchParams.get("subject");

  const filteredGames = subject
    ? allGames.filter((g) => g.subject === subject)
    : allGames;

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

      {filteredGames.length === 0 ? (
        <p className="text-muted-foreground">Bu kategoride hen\u00fcz oyun bulunmuyor.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Icon Area */}
                    <div
                      className={`flex items-center justify-center ${game.color} p-8 ${game.color === "bg-brand-lime" ? "text-brand-dark" : "text-white"} sm:w-48`}
                    >
                      <game.icon className="h-16 w-16" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium">
                            {game.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {game.minAge}-{game.maxAge} ya\u015f
                          </span>
                        </div>
                        <h3 className="text-xl font-bold">{game.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {game.description}
                        </p>
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
                        <Button asChild size="sm">
                          <Link href={game.href}>
                            <Play className="mr-1 h-4 w-4" /> Oyna
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense fallback={<div className="container py-8"><p className="text-muted-foreground">Y\u00fckleniyor...</p></div>}>
      <GamesContent />
    </Suspense>
  );
}
