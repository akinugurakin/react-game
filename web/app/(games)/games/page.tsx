"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";

type Kazanim = {
  code: string;
  description: string;
  grade: string;
};

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
  info: string;
  kazanimlar?: Kazanim[];
};

const allGames: GameItem[] = [
  // ── Matematik ──
  { id: 1, title: "Matematik Yarışması", description: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.", icon: Calculator, color: "bg-brand-teal", minAge: 6, maxAge: 12, category: "Matematik", subject: "matematik", players: 1245, avgDuration: "3-5 dk", href: "/games/math", free: true, info: "Dört işlem becerini zamana karşı test et. Her doğru cevap puan kazandırır, hızlı cevaplar bonus verir.", kazanimlar: [
    { code: "MAT.1.2.2", description: "Toplama ve çıkarma işlemlerinin sonuçlarını tahminde bulunarak ve zihinden işlem yaparak muhakeme edebilme", grade: "1. Sınıf" },
    { code: "MAT.2.2.4", description: "Çarpma ve bölme işlemlerini toplama ve çıkarma işlemlerine dayalı olarak çözümleyebilme", grade: "2. Sınıf" },
    { code: "MAT.2.2.5", description: "Çarpma ve bölme işlemlerinin sonuçlarını muhakeme edebilme", grade: "2. Sınıf" },
    { code: "MAT.3.2.3", description: "Çarpma ve bölme işlemlerinin sonuçlarını muhakeme edebilme", grade: "3. Sınıf" },
    { code: "MAT.3.2.4", description: "Çarpma ve bölme işlemlerini çözümleyebilme", grade: "3. Sınıf" },
  ] },
  { id: 2, title: "Bulmaca Dünyası", description: "Geometrik şekilleri doğru yere yerleştir.", icon: Puzzle, color: "bg-brand-green", minAge: 6, maxAge: 12, category: "Geometri", subject: "matematik", players: 670, avgDuration: "5-8 dk", href: "#", free: false, info: "Geometrik şekilleri tanıyarak doğru alanlara yerleştir. Uzamsal zeka ve şekil algısını geliştirir." },
  { id: 3, title: "Kesir Ustası", description: "Kesirleri karşılaştır, topla ve çıkar.", icon: Layers, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Kesirler", subject: "matematik", players: 540, avgDuration: "4-6 dk", href: "#", free: false, info: "Kesirleri görsel olarak anlama, karşılaştırma ve işlem yapma becerisi kazandırır." },
  // ── Fen Bilimleri ──
  { id: 4, title: "Periyodik Kaos", description: "Laboratuvarda patlama oldu! Periyodik tabloyu yeniden oluştur.", icon: Atom, color: "bg-brand-teal", minAge: 13, maxAge: 14, category: "Kimya", subject: "fen", players: 380, avgDuration: "5-8 dk", href: "/games/periyodik-tablo", free: true, info: "Metal, ametal, yarı metal ve soy gaz bloklarını yerleştir, ardından dağılan elementleri doğru hücrelere taşı.", kazanimlar: [
    { code: "FB.8.5.1.1", description: "Elementleri periyodik tablo üzerinde metal, ametal, yarımetal ve soy gaz olarak sınıflandırabilme", grade: "8. Sınıf" },
  ] },
  { id: 5, title: "Canlılar Alemi", description: "Canlıları sınıflandır, yaşam alanlarını keşfet.", icon: TreePine, color: "bg-brand-green", minAge: 6, maxAge: 10, category: "Biyoloji", subject: "fen", players: 720, avgDuration: "3-5 dk", href: "#", free: true, info: "Canlıları bitkiler, hayvanlar ve mikroorganizmalar olarak sınıflandır. Ekosistem bilgini test et." },
  { id: 6, title: "Deney Labı", description: "Sanal laboratuvarda deneyler yap.", icon: FlaskConical, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Kimya", subject: "fen", players: 450, avgDuration: "5-7 dk", href: "#", free: false, info: "Güvenli sanal ortamda kimya ve fizik deneyleri gerçekleştir. Deney adımlarını doğru sırayla uygula." },
  // ── Sosyal Bilgiler ──
  { id: 7, title: "İnkılap Yolu", description: "Samsun'dan Cumhuriyet'e uzanan yolculukta olayları sıraya diz!", icon: Landmark, color: "bg-brand-teal", minAge: 13, maxAge: 14, category: "Tarih", subject: "sosyal", players: 560, avgDuration: "4-6 dk", href: "/games/inkilap-yolu", free: false, info: "Millî Mücadele'nin dönüm noktalarını keşfet. Olayları kronolojik sıraya koy, kavramları eşleştir.", kazanimlar: [
    { code: "İTA.8.3.1", description: "Mondros Ateşkesi'ne Osmanlı'nın tepkisini açıklar", grade: "8. Sınıf" },
    { code: "İTA.8.3.2", description: "Millî Mücadele'nin başlamasını sağlayan gelişmeleri sıralar", grade: "8. Sınıf" },
    { code: "İTA.8.4.1", description: "Cumhuriyetin ilanını ve önemini açıklar", grade: "8. Sınıf" },
  ] },
  { id: 8, title: "Harita Kaptanı", description: "3D dünya modeli üzerinde kıtaları, okyanusları ve koordinatları keşfet.", icon: Map, color: "bg-brand-green", minAge: 11, maxAge: 12, category: "Coğrafya", subject: "sosyal", players: 430, avgDuration: "5-8 dk", href: "/games/harita-kaptani", free: true, info: "Eski deniz haritaları bir fırtınada kayboldu! Kıtaları, okyanusları işaretle, koordinatları bul, yön sorularını yanıtla.", kazanimlar: [
    { code: "SB.6.2.1", description: "Ülkemizin, kıtaların ve okyanusların konum özelliklerini belirleyebilme", grade: "6. Sınıf" },
  ] },
  { id: 9, title: "Vatandaşlık Bilgisi", description: "Hak ve sorumluluklarını öğren.", icon: Globe, color: "bg-brand-dark", minAge: 10, maxAge: 12, category: "Vatandaşlık", subject: "sosyal", players: 310, avgDuration: "3-4 dk", href: "#", free: false, info: "Temel hak ve özgürlükler, vatandaşlık sorumlulukları ve demokrasi kavramlarını interaktif olarak öğren." },
  // ── Türkçe ──
  { id: 10, title: "Kelime Avı", description: "Karışık harflerden anlamlı kelimeler oluştur.", icon: BookOpen, color: "bg-brand-teal", minAge: 7, maxAge: 12, category: "Kelime", subject: "turkce", players: 890, avgDuration: "4-6 dk", href: "#", free: true, info: "Karışık harflerden anlamlı kelimeler oluşturarak kelime hazineni genişlet. Süreye karşı yarış!" },
  { id: 11, title: "Eş Anlamlı Hafıza", description: "Kartları çevir, eş anlamlı kelime çiftlerini bul.", icon: Brain, color: "bg-brand-green", minAge: 8, maxAge: 12, category: "Hafıza", subject: "turkce", players: 1100, avgDuration: "3-5 dk", href: "/games/es-anlamli-hafiza", free: true, info: "24 kapalı kartın arkasında eş anlamlı kelimeler saklı. Çiftleri eşleştirerek hem hafızanı hem kelime hazineni güçlendir.", kazanimlar: [
    { code: "TDL.4.6.1", description: "Eş anlamlı ve zıt anlamlı kelimeleri fark edebilme ve kullanabilme", grade: "4. Sınıf" },
    { code: "TDL.5.6.1", description: "Kelimeler arasındaki anlam ilişkilerini (eş anlamlılık, zıt anlamlılık) kavrayabilme", grade: "5. Sınıf" },
  ] },
  { id: 12, title: "Söz Avcısı", description: "Kelime Ormanı'nda eş anlamlı, zıt anlamlı kelimeleri ve deyimleri eşleştir!", icon: MessageSquare, color: "bg-brand-dark", minAge: 11, maxAge: 12, category: "Söz Varlığı", subject: "turkce", players: 620, avgDuration: "3-5 dk", href: "/games/soz-avcisi", free: false, info: "Eş anlamlı ve zıt anlamlı kelimeleri, deyimleri doğru tanımlarıyla eşleştir. Türkçe söz varlığını pekiştir.", kazanimlar: [
    { code: "T.O.6.21", description: "Eş anlamlı ve zıt anlamlı kelimeleri kullanır", grade: "6. Sınıf" },
    { code: "T.O.6.22", description: "Deyimlerin anlamlarını kavrar", grade: "6. Sınıf" },
  ] },
  { id: 13, title: "Yazım Kılavuzu", description: "Doğru yazım kurallarını öğren.", icon: Pen, color: "bg-brand-lime", minAge: 8, maxAge: 12, category: "Yazım", subject: "turkce", players: 340, avgDuration: "4-6 dk", href: "#", free: false, info: "Sık yapılan yazım hatalarını tespit et. Büyük harf, noktalama ve birleşik kelimeleri doğru yaz." },
  // ── İngilizce ──
  { id: 14, title: "Vocabulary Builder", description: "Resimlerle eşleştirerek İngilizce kelime öğren.", icon: SpellCheck, color: "bg-brand-teal", minAge: 7, maxAge: 12, category: "Kelime", subject: "ingilizce", players: 780, avgDuration: "3-5 dk", href: "#", free: true, info: "Görseller ve kelimeler arasında bağ kurarak İngilizce kelime hazineni geliştir." },
  { id: 15, title: "World Explorer", description: "Dünyayı gez, simge yapıları eşleştir, İngilizce cümleler kur!", icon: BookOpen, color: "bg-brand-green", minAge: 12, maxAge: 13, category: "Kelime & Dilbilgisi", subject: "ingilizce", players: 520, avgDuration: "4-6 dk", href: "/games/world-explorer", free: false, info: "Dünya kültürlerini keşfet, İngilizce kelime hazineni genişlet ve present perfect zamanını pekiştir.", kazanimlar: [
    { code: "ENG.7.6.R3", description: "Dünya kültürlerine dair metinleri okur ve anlar", grade: "7. Sınıf" },
    { code: "ENG.7.6.V1", description: "Konu bağlamında sözcük dağarcığını genişletir", grade: "7. Sınıf" },
    { code: "ENG.7.6.G1", description: "Present perfect zamanı doğru kullanır", grade: "7. Sınıf" },
  ] },
  { id: 16, title: "Listening Lab", description: "Dinlediğini anla, soruları yanıtla.", icon: MessageSquare, color: "bg-brand-dark", minAge: 8, maxAge: 12, category: "Dinleme", subject: "ingilizce", players: 390, avgDuration: "5-7 dk", href: "#", free: false, info: "İngilizce ses kayıtlarını dinle ve anlama sorularını yanıtla. Dinleme becerisini geliştir." },
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
  const { isAuthenticated, hasActiveSubscription } = useAuthStore();
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const subject = searchParams.get("subject");
  // Ücretsiz oyunlar: abonelik yoksa veya giriş yapılmamışsa premium kilitli
  const isGuest = !isAuthenticated || !hasActiveSubscription;

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
                  <GameCard key={game.id} game={game} index={index} locked={false} onSelect={() => setSelectedGame(game)} />
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
                  <GameCard key={game.id} game={game} index={index} locked onSelect={() => setSelectedGame(game)} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        /* Giris yapmis kullanici — hepsi acik */
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} locked={false} onSelect={() => setSelectedGame(game)} />
          ))}
        </div>
      )}

      {/* Detay Modalı */}
      <AnimatePresence>
        {selectedGame && (
          <GameDetailModal
            game={selectedGame}
            locked={!isAuthenticated && !selectedGame.free}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function GameDetailModal({
  game,
  locked,
  onClose,
}: {
  game: GameItem;
  locked: boolean;
  onClose: () => void;
}) {
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
        className="relative w-full max-w-sm overflow-visible rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#042940]/40 transition-colors hover:bg-black/10 hover:text-[#042940]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Üst — Oyun görseli */}
        <div
          className={cn(
            "flex flex-col items-center justify-center py-10",
            `bg-gradient-to-b from-[#005C53]/10 to-transparent`
          )}
        >
          <div
            className={cn(
              "flex h-24 w-24 items-center justify-center rounded-3xl",
              game.color,
              game.color === "bg-brand-lime" ? "text-brand-dark" : "text-white"
            )}
          >
            <Icon className="h-12 w-12" />
          </div>
          <div className="mt-3 flex items-center gap-2">
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
        </div>

        {/* Alt — Bilgiler */}
        <div className="px-6 pb-6">
          <h2 className="text-center text-lg font-extrabold text-[#042940]">
            {game.title}
          </h2>
          <p className="mt-1 text-center text-sm text-[#042940]/50">
            {game.description}
          </p>

          <div className="mt-5 rounded-xl bg-[#042940]/[0.03] p-4">
            <p className="text-sm leading-relaxed text-[#042940]/60">
              {game.info}
            </p>
          </div>

          {/* Kazanımlar */}
          {game.kazanimlar && game.kazanimlar.length > 0 && (
            <div className="mt-4 rounded-xl bg-[#005C53]/[0.05] p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#042940]/70">
                <GraduationCap className="h-3.5 w-3.5" />
                Müfredat Kazanımları
              </div>
              <div className="flex flex-wrap gap-1.5">
                {game.kazanimlar.map((k) => (
                  <span
                    key={k.code}
                    className="group/tip relative cursor-default rounded-md bg-[#005C53]/10 px-2 py-1 text-[11px] font-semibold text-[#005C53] transition-colors hover:bg-[#005C53]/20"
                  >
                    {k.code}
                    <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-56 rounded-lg bg-[#042940] px-3 py-2 text-[11px] font-normal leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
                      <span className="block font-semibold text-[#9FC131]">{k.grade}</span>
                      {k.description}
                      <span className="absolute left-4 top-full border-4 border-transparent border-t-[#042940]" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* İstatistikler */}
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

          {/* Oyna butonu */}
          <div className="mt-5">
            {locked ? (
              <Button asChild className="w-full rounded-xl py-5" variant="outline">
                <Link href="/ucretlendirme">
                  <Lock className="mr-2 h-4 w-4" /> Abone Ol
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full rounded-xl bg-[#005C53] py-5 text-white hover:bg-[#005C53]/90">
                <Link href={game.href}>
                  <Play className="mr-2 h-4 w-4" /> Oyna
                </Link>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GameCard({ game, index, locked, onSelect }: { game: GameItem; index: number; locked: boolean; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className={`group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-lg ${locked ? "opacity-75" : ""}`} onClick={onSelect}>
        {/* Soru işareti */}
        <button
          className="absolute right-4 top-3 z-10 text-[#042940]/25 transition-colors hover:text-[#042940]/50"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <span className="text-base font-bold leading-none">?</span>
        </button>

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
                    <Link href="/ucretlendirme">
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
