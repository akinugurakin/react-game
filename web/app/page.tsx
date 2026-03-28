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
import { GameIllustration } from "@/components/ui/decorative";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageLines } from "@/components/ui/page-lines";
import { TestimonialCarousel } from "@/components/ui/testimonial";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { useRouter } from "next/navigation";

const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    avatar: "https://i.pravatar.cc/150?img=44",
    description: "Kızım bu platformu çok seviyor! Matematik oyunuyla çarpım tablosunu öğrenmesi çok kolaylaştı. Her gün oynamak istiyor.",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    avatar: "https://i.pravatar.cc/150?img=68",
    description: "Oğlum için güvenli bir eğitim ortamı arıyordum. React Game tam aradığım şey oldu. Ebeveyn kontrolü harika.",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    avatar: "https://i.pravatar.cc/150?img=47",
    description: "Öğretmen olarak sınıfımda kullanıyorum. Çocuklar liderlik tablosunda yarışmayı çok seviyor, motivasyonları arttı!",
  },
  {
    id: 4,
    name: "Ali Öztürk",
    avatar: "https://i.pravatar.cc/150?img=59",
    description: "İki çocuğum da bu platformda oynuyor. Ekran başında geçirdikleri sürenin verimli olduğunu bilmek beni mutlu ediyor.",
  },
  {
    id: 5,
    name: "Fatma Arslan",
    avatar: "https://i.pravatar.cc/150?img=45",
    description: "Reklamsız ve güvenli bir ortam. Çocuğumun verilerinin korunduğunu bilmek çok değerli. Kesinlikle tavsiye ediyorum.",
  },
];

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
  const { isAuthenticated } = useAuthStore();
  const hydrated = useAuthHydrated();
  const router = useRouter();

  // Giriş yapmışsa dashboard'a yönlendir
  if (hydrated && isAuthenticated) {
    router.replace("/dashboard");
    return null;
  }

  if (!hydrated) return null;

  return (
    <div className="relative flex min-h-screen flex-col">
      <PageLines />
      <Header />

      <main className="flex-1">
        {/* ===== HERO — Koyu lacivert arka plan ===== */}
        <section className="relative overflow-hidden bg-brand-dark text-white">
          <FloatingIcons />
          {/* Dekoratif dalgalı çizgi */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute -left-20 top-20 w-[400px] opacity-10" viewBox="0 0 200 200"><path d="M 0 100 Q 50 50 100 100 Q 150 150 200 100" fill="none" stroke="#9FC131" strokeWidth="2"/></svg>
            <svg className="absolute right-10 bottom-20 w-[350px] opacity-10" viewBox="0 0 200 200"><path d="M 0 100 Q 50 150 100 100 Q 150 50 200 100" fill="none" stroke="#9FC131" strokeWidth="2"/></svg>
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-dark/10 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl" />
          </div>

          <div className="container relative py-20 md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Sol — Metin */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm"
                >
                  <Star className="h-4 w-4 text-brand-lime" />
                  <span className="text-sm font-medium text-white/90">
                    6-12 yaş arası çocuklar için
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
                >
                  Eğlenerek{" "}
                  <span className="text-brand-lime">Öğrenmenin</span>{" "}
                  En Güzel Yolu
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-6 max-w-lg text-lg text-white/70"
                >
                  Eğitici mini oyunlarla çocuğunuzun matematik, dil ve problem
                  çözme becerilerini geliştirin.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="mt-8 flex flex-col gap-4 sm:flex-row"
                >
                  <Button asChild size="lg" className="bg-brand-lime text-brand-dark text-lg px-8 shadow-lg shadow-brand-lime/25 hover:bg-brand-lime/90 font-bold">
                    <Link href="/register">
                      Hemen Başla <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
                    <Link href="/login">Giriş Yap</Link>
                  </Button>
                </motion.div>

                {/* Mini stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-10 flex gap-8"
                >
                  <div>
                    <p className="text-2xl font-extrabold text-brand-lime">3.2K+</p>
                    <p className="text-xs text-white/50">Aktif Oyuncu</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-brand-green">4</p>
                    <p className="text-xs text-white/50">Eğitici Oyun</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-brand-sand">50K+</p>
                    <p className="text-xs text-white/50">Oynanan Oyun</p>
                  </div>
                </motion.div>
              </div>

              {/* Sağ — Fotoğraflar */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                {/* Ana fotoğraf */}
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl border-2 border-white/10 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop"
                      alt="Çocuklar öğreniyor"
                      className="h-[350px] w-full object-cover"
                    />
                  </div>

                  {/* Küçük kart — sol üst */}
                  <div className="absolute -left-6 top-6 rounded-2xl bg-white p-3 shadow-xl -rotate-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-lime/20">
                        <Calculator className="h-5 w-5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-dark">Matematik</p>
                        <p className="text-[10px] text-gray-500">1.2K oyuncu</p>
                      </div>
                    </div>
                  </div>

                  {/* Küçük kart — sağ alt */}
                  <div className="absolute -right-4 bottom-8 rounded-2xl bg-white p-3 shadow-xl rotate-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-dark/10">
                        <Trophy className="h-5 w-5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-dark">Liderlik</p>
                        <p className="text-[10px] text-gray-500">Sıralamaya gir!</p>
                      </div>
                    </div>
                  </div>

                  {/* İkinci küçük fotoğraf — sağ üst */}
                  <div className="absolute -right-8 -top-4 h-20 w-20 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg rotate-6">
                    <img
                      src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=200&h=200&fit=crop"
                      alt="Çocuk tablet kullanıyor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero → beyaz dalga geçişi */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
              <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,70 1440,60 L1440,100 L0,100 Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* ===== NASIL ÇALIŞIR — Beyaz arka plan ===== */}
        <section className="relative py-24">
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

        {/* ===== POPÜLER OYUNLAR — Koyu yeşil arka plan ===== */}
        <section className="relative py-24 bg-brand-teal text-white overflow-hidden">
          {/* Dalga geçişi üst */}
          <div className="absolute top-0 left-0 right-0 rotate-180">
            <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
              <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" className="fill-background" />
            </svg>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute right-10 top-20 w-[300px] opacity-10" viewBox="0 0 200 200"><path d="M 0 100 Q 50 50 100 100 Q 150 150 200 100" fill="none" stroke="#9FC131" strokeWidth="2"/></svg>
          </div>
          <div className="container relative">
            <div className="mb-16 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 inline-block rounded-full bg-brand-lime/20 px-4 py-1 text-sm font-semibold text-brand-lime"
              >
                Keşfet
              </motion.span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl text-white">
                Popüler Oyunlar
              </h2>
              <p className="mt-4 text-lg text-white/60">
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

          {/* Dalga geçişi alt */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
              <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* ===== EN İYİ OYUNCULAR — Beyaz arka plan ===== */}
        <section className="relative overflow-hidden py-24">
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

        {/* ===== TESTIMONIALS — Kullanıcı yorumları ===== */}
        <section className="relative py-24 bg-brand-teal text-white overflow-hidden">
          {/* Üst dalga */}
          <div className="absolute top-0 left-0 right-0 rotate-180">
            <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
              <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" className="fill-background" />
            </svg>
          </div>

          <div className="container relative">
            <div className="mb-12 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 inline-block rounded-full bg-brand-lime/20 px-4 py-1 text-sm font-semibold text-brand-lime"
              >
                Kullanıcı Yorumları
              </motion.span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl text-white">
                Ebeveynler Ne Diyor?
              </h2>
              <p className="mt-4 text-lg text-white/60">
                Platformumuzu kullanan ailelerden geri bildirimler
              </p>
            </div>

            <TestimonialCarousel
              testimonials={testimonials}
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* Alt dalga */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
              <path d="M0,30 C480,0 960,60 1440,30 L1440,60 L0,60 Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* ===== NEDEN REACT GAME — Açık yeşil/sand bant ===== */}
        <section className="relative py-24 bg-brand-sand/20">
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

        {/* ===== EBEVEYN GÜVENLİĞİ — Koyu lacivert bant ===== */}
        <section className="relative py-24 bg-brand-dark text-white overflow-hidden">
          {/* Üst dalga */}
          <div className="absolute top-0 left-0 right-0 rotate-180">
            <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
              <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#D6D58E" fillOpacity="0.2" />
            </svg>
          </div>
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
                  <div className="absolute -left-4 bottom-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-teal shadow-lg -rotate-12 border border-brand-green/30 p-3">
                    <Shield className="h-6 w-6 text-brand-lime" />
                  </div>
                  {/* Yıldız sticker */}
                  <div className="absolute right-2 bottom-0 flex h-11 w-11 items-center justify-center rounded-full bg-brand-green shadow-lg rotate-6">
                    <span className="text-xl">⭐</span>
                  </div>
                </div>
                <h2 className="text-3xl font-extrabold md:text-4xl text-white">
                  Ebeveynler İçin Güvenli
                </h2>
                <p className="mt-4 text-lg text-white/60">
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
                    className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4 transition-colors hover:bg-white/10"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-lime" />
                    <span className="font-medium text-white/90">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Alt dalga */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
              <path d="M0,30 C480,0 960,60 1440,30 L1440,60 L0,60 Z" className="fill-background" />
            </svg>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
