"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  Brain,
  Star,
  ArrowRight,
  Shield,
  BarChart3,
  Calculator,
  BookOpen,
  Puzzle,
  Users,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { BadgeIcon, ALL_BADGES } from "@/components/ui/badge-icon";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { WaveDivider, GlowOrb, GameIllustration } from "@/components/ui/decorative";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageLines } from "@/components/ui/page-lines";

const features = [
  {
    icon: Brain,
    title: "Eğitici Oyunlar",
    description: "Matematik, kelime ve hafıza oyunlarıyla eğlenerek öğrenme deneyimi.",
    gradient: "from-brand-teal to-brand-dark",
  },
  {
    icon: Trophy,
    title: "Liderlik Tablosu",
    description: "Haftalık ve tüm zamanlar sıralamalarıyla motivasyonu artır.",
    gradient: "from-brand-green to-brand-lime",
  },
  {
    icon: BarChart3,
    title: "İlerleme Takibi",
    description: "Çocuğunuzun gelişimini detaylı istatistiklerle takip edin.",
    gradient: "from-brand-teal to-brand-green",
  },
  {
    icon: Shield,
    title: "Güvenli Ortam",
    description: "Ebeveyn kontrolü ve yaşa uygun içeriklerle güvenli bir platform.",
    gradient: "from-brand-dark to-brand-teal",
  },
];

const popularGames = [
  {
    id: 1,
    title: "Matematik Yarışması",
    description: "Toplama ve çıkarma ile hızını test et",
    icon: Calculator,
    color: "bg-brand-teal",
    illustration: "math" as const,
    players: "1.2K",
  },
  {
    id: 2,
    title: "Kelime Avı",
    description: "Harflerden anlamlı kelimeler oluştur",
    icon: BookOpen,
    color: "bg-emerald-500",
    illustration: "words" as const,
    players: "890",
  },
  {
    id: 3,
    title: "Hafıza Kartları",
    description: "Eşleşen kartları bul ve hafızanı güçlendir",
    icon: Brain,
    color: "bg-purple-500",
    illustration: "memory" as const,
    players: "1.1K",
  },
  {
    id: 4,
    title: "Bulmaca Dünyası",
    description: "Şekilleri doğru yere yerleştir",
    icon: Puzzle,
    color: "bg-orange-500",
    illustration: "puzzle" as const,
    players: "670",
  },
];

const topPlayers = [
  { username: "matKral42", initials: "MK", score: 12850, games: 156, rank: 1, gradient: "from-brand-lime to-brand-green", avatar: "https://i.pravatar.cc/150?img=11" },
  { username: "zeynepOyun", initials: "ZO", score: 11200, games: 134, rank: 2, gradient: "from-brand-teal to-brand-dark", avatar: "https://i.pravatar.cc/150?img=5" },
  { username: "aliCoder", initials: "AC", score: 10750, games: 128, rank: 3, gradient: "from-brand-green to-brand-teal", avatar: "https://i.pravatar.cc/150?img=8" },
  { username: "elifStar", initials: "ES", score: 9800, games: 115, rank: 4, gradient: "from-brand-dark to-brand-teal", avatar: "https://i.pravatar.cc/150?img=9" },
  { username: "canBey", initials: "CB", score: 9350, games: 108, rank: 5, gradient: "from-brand-teal to-brand-green", avatar: "https://i.pravatar.cc/150?img=12" },
];

const steps = [
  {
    step: "1",
    title: "Kayıt Ol",
    description: "Ücretsiz hesap oluştur, sadece birkaç saniye sürer.",
    icon: Users,
    gradient: "from-brand-dark to-brand-teal",
  },
  {
    step: "2",
    title: "Oyun Seç",
    description: "Yaşına uygun eğitici oyunlar arasından birini seç.",
    icon: Gamepad2,
    gradient: "from-brand-dark to-brand-teal",
  },
  {
    step: "3",
    title: "Öğren & Kazan",
    description: "Oyna, puan topla ve liderlik tablosunda yüksel!",
    icon: Trophy,
    gradient: "from-brand-green to-brand-teal",
  },
];

const trustPoints = [
  "Yaşa uygun, pedagojik açıdan onaylanmış içerikler",
  "13 yaş altı için ebeveyn onayı zorunluluğu",
  "Kişisel veri güvenliği ve KVKK uyumu",
  "Reklamsız, dikkat dağıtmayan arayüz",
  "Oyun süresi takibi ve ebeveyn bildirimleri",
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PageLines />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <GlowOrb className="right-0 top-0" color="bg-brand-teal/8" size="w-[600px] h-[600px]" />
          <GlowOrb className="-left-32 bottom-0" color="bg-brand-green/8" size="w-[500px] h-[500px]" />
          <GlowOrb className="left-1/2 top-1/3" color="bg-brand-dark/5" size="w-[300px] h-[300px]" />
          <FloatingIcons />

          <div className="container relative py-24 md:py-32">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
              >
                <Star className="h-4 w-4 text-brand-lime" />
                <span className="text-sm font-medium">
                  6-12 yaş arası çocuklar için
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl"
              >
                Eğlenerek{" "}
                <span className="bg-gradient-to-r from-brand-dark via-brand-teal to-brand-green bg-clip-text text-transparent">
                  Öğrenmenin
                </span>{" "}
                En Güzel Yolu
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 max-w-2xl text-xl text-muted-foreground"
              >
                Eğitici mini oyunlarla çocuğunuzun matematik, dil ve problem
                çözme becerilerini geliştirin. Liderlik tablosuyla motivasyonu
                artırın.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button asChild size="lg" className="text-lg px-8 shadow-lg shadow-primary/25">
                  <Link href="/register">
                    Hemen Başla <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="/login">Giriş Yap</Link>
                </Button>
              </motion.div>

              {/* Mini stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16 flex flex-wrap justify-center gap-8 rounded-2xl border bg-background/60 px-8 py-5 shadow-sm backdrop-blur-sm"
              >
                <div>
                  <p className="text-3xl font-extrabold bg-gradient-to-r from-brand-dark to-brand-teal bg-clip-text text-transparent">3.2K+</p>
                  <p className="text-sm text-muted-foreground">Aktif Oyuncu</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-3xl font-extrabold bg-gradient-to-r from-brand-dark to-brand-teal bg-clip-text text-transparent">4</p>
                  <p className="text-sm text-muted-foreground">Eğitici Oyun</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-3xl font-extrabold bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">50K+</p>
                  <p className="text-sm text-muted-foreground">Oynanan Oyun</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wave Divider */}
        <WaveDivider />

        {/* Nasıl Çalışır */}
        <section className="relative bg-muted/30 py-24">
          <div className="container">
            <div className="mb-16 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary"
              >
                Kolay Başlangıç
              </motion.span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Nasıl Çalışır?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                3 kolay adımda öğrenmeye başla
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                    Adım {item.step}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider flip />

        {/* Popüler Oyunlar */}
        <section className="relative py-24">
          <GlowOrb className="-right-20 top-1/3" color="bg-brand-dark/5" size="w-[400px] h-[400px]" />
          <div className="container relative">
            <div className="mb-16 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary"
              >
                Keşfet
              </motion.span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Popüler Oyunlar
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                En çok oynanan eğitici oyunlarımız
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popularGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative overflow-hidden">
                      <GameIllustration type={game.illustration} />
                      <div className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 shadow-sm opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110">
                        <Play className="h-4 w-4 text-gray-800" />
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold">{game.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {game.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          {game.players} oyuncu
                        </span>
                        <Button size="sm" variant="ghost" className="h-8 gap-1 text-primary">
                          Oyna <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* En İyi Oyuncular */}
        <section className="relative overflow-hidden border-t bg-muted/30 py-24">
          <GlowOrb className="-left-20 top-1/4" color="bg-brand-lime/5" size="w-[300px] h-[300px]" />
          <div className="container relative">
            <div className="mb-16 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700"
              >
                🏆 Sıralama
              </motion.span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                En İyi Oyuncular
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Bu haftanın yıldızları
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 md:grid-cols-5">
              {topPlayers.map((player, index) => (
                <motion.div
                  key={player.username}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className={`h-14 bg-gradient-to-r ${player.gradient} relative`}>
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute left-1/2 top-0 h-10 w-[1px] rotate-[20deg] bg-white/20" />
                        <div className="absolute right-1/3 top-0 h-8 w-[1px] rotate-[-15deg] bg-white/15" />
                      </div>
                    </div>
                    <CardContent className="relative px-3 pb-5">
                      <div className="-mt-7 mb-3 flex justify-center">
                        <HexAvatar
                          initials={player.initials}
                          size="md"
                          borderColor="ring-background"
                          online={index < 3}
                          gradient={player.gradient}
                          image={player.avatar}
                        />
                      </div>
                      {player.rank <= 3 && (
                        <div className="mb-1 flex justify-center">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            player.rank === 1
                              ? "bg-amber-100 text-amber-700"
                              : player.rank === 2
                              ? "bg-gray-100 text-gray-600"
                              : "bg-orange-100 text-orange-700"
                          }`}>
                            {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"} {player.rank}.
                          </span>
                        </div>
                      )}
                      <h3 className="text-sm font-bold truncate">{player.username}</h3>
                      <p className="text-lg font-extrabold text-primary">
                        {player.score.toLocaleString("tr-TR")}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {player.games} oyun
                      </p>
                      <div className="mt-2 flex justify-center gap-1">
                        {ALL_BADGES.filter((b) => b.earned)
                          .slice(0, 3)
                          .map((badge) => (
                            <BadgeIcon key={badge.id} badge={badge} size="sm" />
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="shadow-sm">
                <Link href="/leaderboard">
                  Tüm Sıralamayı Gör <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Neden React Game */}
        <section className="relative py-24">
          <GlowOrb className="right-0 bottom-0" color="bg-brand-teal/5" size="w-[400px] h-[400px]" />
          <div className="container relative">
            <div className="mb-16 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary"
              >
                Özellikler
              </motion.span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Neden React Game?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Çocuğunuzun gelişimini destekleyen güçlü özellikler
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col items-center rounded-2xl border bg-background p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ebeveyn Güven Bölümü */}
        <section className="relative border-t bg-muted/30 py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                {/* Ebeveyn + çocuk sticker fotoğraf — cutout tarzı */}
                <div className="mx-auto mb-8 relative w-64 h-64">
                  {/* Ana fotoğraf — arka plan karışımlı, sticker efekti */}
                  <div className="relative mx-auto w-56 h-56 drop-shadow-2xl" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}>
                    <img
                      src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&h=500&fit=crop&crop=top"
                      alt="Ebeveyn ve çocuk"
                      className="h-full w-full object-cover rounded-[2rem] -rotate-2"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  {/* Kalp sticker */}
                  <div className="absolute -right-4 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg rotate-12 border border-gray-100">
                    <span className="text-3xl">💚</span>
                  </div>
                  {/* Kalkan sticker */}
                  <div className="absolute -left-4 bottom-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-white shadow-lg -rotate-12 border border-gray-100 p-3">
                    <Shield className="h-6 w-6 text-emerald-500" />
                  </div>
                  {/* Yıldız sticker */}
                  <div className="absolute right-2 bottom-0 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400 shadow-lg rotate-6">
                    <span className="text-xl">⭐</span>
                  </div>
                </div>
                <h2 className="text-3xl font-extrabold md:text-4xl">
                  Ebeveynler İçin Güvenli
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Çocuğunuzun güvenliği bizim önceliğimiz
                </p>
              </div>
              <div className="mt-10 space-y-3">
                {trustPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Son CTA */}
        <section className="py-24">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-dark via-brand-teal to-brand-green px-8 py-16 text-center text-white">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute right-1/4 top-0 h-full w-[1px] rotate-[25deg] bg-white/10" />
                <div className="absolute left-1/3 top-0 h-full w-[1px] rotate-[-15deg] bg-white/10" />
                <div className="absolute left-1/4 top-0 h-full w-[1px] rotate-[40deg] bg-white/5" />
                <div className="absolute right-1/3 top-0 h-full w-[1px] rotate-[-30deg] bg-white/5" />
              </div>

              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                >
                  <Gamepad2 className="h-10 w-10" />
                </motion.div>
                <h2 className="text-3xl font-extrabold md:text-4xl">
                  Öğrenme macerasına hazır mısın?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                  Hemen kayıt ol ve eğitici oyunlarla dolu dünyamızı keşfet.
                  Binlerce çocuk seni bekliyor!
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 bg-white text-lg px-8 text-brand-dark shadow-xl hover:bg-white/90"
                >
                  <Link href="/register">
                    Ücretsiz Başla <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
