"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  FlaskConical,
  Globe,
  GraduationCap,
  Gamepad2,
  BarChart3,
  Brain,
  Trophy,
  Shield,
  CheckCircle2,
  Users,
  Star,
  Sparkles,
  BookOpen,
  Play,
  Clock,
  Puzzle,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    num: 1,
    icon: GraduationCap,
    title: "Sınıfını Seç",
    desc: "1-8. sınıf arasında çocuğunun seviyesini belirle",
    color: "bg-brand-teal",
  },
  {
    num: 2,
    icon: Gamepad2,
    title: "Oyun Oyna",
    desc: "MEB müfredatına uygun oyunlarla eğlenerek öğren",
    color: "bg-brand-green",
  },
  {
    num: 3,
    icon: Trophy,
    title: "İlerlemeni Takip Et",
    desc: "Rozet kazan, seviye atla, liderlik tablosunda yüksel",
    color: "bg-brand-dark",
  },
];

const featuredGames = [
  {
    title: "Matematik Yarışması",
    desc: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.",
    icon: Calculator,
    color: "bg-brand-teal",
    category: "Matematik",
    age: "6-12 yaş",
    players: 1245,
    duration: "3-5 dk",
  },
  {
    title: "Kelime Avı",
    desc: "Karışık harflerden anlamlı kelimeler oluştur.",
    icon: BookOpen,
    color: "bg-brand-green",
    category: "Dil",
    age: "7-12 yaş",
    players: 890,
    duration: "4-6 dk",
  },
  {
    title: "Hafıza Kartları",
    desc: "Kartları çevir ve eşleşen çiftleri bul.",
    icon: Brain,
    color: "bg-brand-dark",
    category: "Hafıza",
    age: "6-10 yaş",
    players: 1100,
    duration: "3-4 dk",
  },
  {
    title: "Bulmaca Dünyası",
    desc: "Geometrik şekilleri doğru yere yerleştir.",
    icon: Puzzle,
    color: "bg-brand-lime",
    category: "Mantık",
    age: "6-12 yaş",
    players: 670,
    duration: "5-8 dk",
  },
];

const features = [
  {
    icon: Brain,
    title: "MEB Müfredatına Uygun",
    desc: "Tüm oyunlar müfredat kazanımlarına bağlı olarak tasarlanmıştır.",
    color: "bg-brand-teal",
  },
  {
    icon: Trophy,
    title: "Oyunlaştırılmış Öğrenme",
    desc: "Rozet, puan ve liderlik tablosuyla sürdürülebilir motivasyon.",
    color: "bg-brand-green",
  },
  {
    icon: BarChart3,
    title: "Ölçülebilir İlerleme",
    desc: "Ders bazlı ilerleme takibi ve detaylı analiz paneli.",
    color: "bg-brand-dark",
  },
  {
    icon: Shield,
    title: "Güvenli ve Reklamsız",
    desc: "Ebeveyn kontrolü, KVKK uyumlu, tamamen reklamsız.",
    color: "bg-brand-lime",
  },
];

const testimonials = [
  {
    name: "Ayşe Yılmaz",
    role: "Veli",
    avatar: "https://i.pravatar.cc/150?img=44",
    text: "Kızım LUMO sayesinde matematik dersinde çok ilerledi. Müfredata uygun olması beni çok rahatlattı.",
  },
  {
    name: "Mehmet Kaya",
    role: "Veli",
    avatar: "https://i.pravatar.cc/150?img=68",
    text: "Oğlum için güvenli bir eğitim ortamı arıyordum. LUMO tam aradığım şey oldu. Reklamsız ve KVKK uyumlu.",
  },
  {
    name: "Zeynep Demir",
    role: "Öğretmen",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "Sınıfımda LUMO kullanıyorum. Çocuklar müfredatına uygun oyunlarla öğrenirken motivasyonları arttı!",
  },
];

const trustPoints = [
  "MEB müfredatına uygun, pedagojik açıdan onaylanmış içerikler",
  "KVKK uyumlu veri güvenliği ve çocuk gizliliği",
  "Tamamen reklamsız, dikkat dağıtıcı içerik yok",
  "Ebeveyn kontrol paneli ile süre ve içerik yönetimi",
  "13 yaş altı için ebeveyn onayı zorunluluğu",
];

/* ------------------------------------------------------------------ */
/*  ANIMATION                                                          */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const hydrated = useAuthHydrated();
  const router = useRouter();

  if (hydrated && isAuthenticated) {
    router.replace("/dashboard");
    return null;
  }
  if (!hydrated) return null;

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left — Text */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-lime/20 px-4 py-1.5"
                >
                  <Sparkles className="h-4 w-4 text-brand-green" />
                  <span className="text-sm font-semibold text-brand-dark">
                    MEB Müfredatına %100 Uygun
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={0.05}
                  className="text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-dark md:text-5xl lg:text-6xl"
                >
                  Oyun Oyna,
                  <br />
                  Müfredat{" "}
                  <span className="inline-block rounded-full bg-brand-lime px-5 py-1">
                    Öğren!
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={0.15}
                  className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
                >
                  Çocuğunuz eğlenceli oyunlarla dersleri pekiştirsin.
                  Matematik, Fen Bilimleri ve Sosyal Bilgiler — hepsi bir
                  arada.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  custom={0.25}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-brand-dark px-8 text-base font-bold text-white hover:bg-brand-dark/90"
                  >
                    <Link href="/register">
                      Ücretsiz Dene
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full text-base font-semibold"
                  >
                    <Link href="#nasil-calisir">Nasıl Çalışır?</Link>
                  </Button>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  variants={fadeUp}
                  custom={0.35}
                  className="mt-10 flex items-center gap-4"
                >
                  <div className="flex -space-x-2">
                    {[44, 68, 47, 59, 45].map((img) => (
                      <img
                        key={img}
                        src={`https://i.pravatar.cc/40?img=${img}`}
                        alt=""
                        className="h-9 w-9 rounded-full border-2 border-background object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-brand-lime text-brand-lime"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-bold text-brand-dark">1.200+</span>{" "}
                      aile LUMO&apos;yu tercih ediyor
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right — Hero visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto w-full max-w-md lg:max-w-none"
              >
                {/* Main card — mimics the game card style */}
                <Card className="overflow-hidden shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex items-center justify-center bg-brand-teal p-10 text-white sm:w-48">
                        <Gamepad2 className="h-20 w-20" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium">
                              Platform
                            </span>
                            <span className="text-xs text-muted-foreground">
                              1-8. sınıf
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            LUMO Eğitsel Oyunlar
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            MEB müfredatına uygun, oyunlaştırılmış öğrenme
                            platformu
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              1.200+ öğrenci
                            </span>
                            <span className="flex items-center gap-1">
                              <Gamepad2 className="h-3.5 w-3.5" />
                              20+ oyun
                            </span>
                          </div>
                          <Button asChild size="sm">
                            <Link href="/register">
                              <Play className="mr-1 h-4 w-4" /> Başla
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating mini cards */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -left-4 top-4 z-10"
                >
                  <Card className="shadow-md">
                    <CardContent className="flex items-center gap-2 p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-teal text-white">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">Matematik</p>
                        <p className="text-[10px] text-muted-foreground">12 oyun</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-4 bottom-20 z-10"
                >
                  <Card className="shadow-md">
                    <CardContent className="flex items-center gap-2 p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-white">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">Rozet!</p>
                        <p className="text-[10px] text-muted-foreground">Matematik Ustası</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HOW IT WORKS                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="nasil-calisir" className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Nasıl Çalışır?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Oyun oyna, öğren, ilerle. Bu kadar basit!
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col">
                        {/* Colored icon area — same style as game cards */}
                        <div
                          className={`flex items-center justify-center ${step.color} p-8 text-white`}
                        >
                          <step.icon className="h-12 w-12" />
                        </div>
                        <div className="p-6">
                          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                            {step.num}
                          </div>
                          <h3 className="text-lg font-bold text-foreground">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FEATURED GAMES — Same layout as games page                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12 flex items-end justify-between"
            >
              <div>
                <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                  Popüler Oyunlar
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Eğitici oyunlarla eğlenerek öğren
                </p>
              </div>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link href="/register">
                  Tümünü Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Game cards — identical style to games page */}
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredGames.map((game, index) => (
                <motion.div
                  key={game.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Icon Area */}
                        <div
                          className={`flex items-center justify-center ${game.color} p-8 text-white sm:w-48`}
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
                                {game.age}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground">
                              {game.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {game.desc}
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
                                {game.duration}
                              </span>
                            </div>
                            <Button asChild size="sm">
                              <Link href="/register">
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

            {/* Mobile CTA */}
            <div className="mt-6 text-center md:hidden">
              <Button asChild variant="outline">
                <Link href="/register">
                  Tümünü Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  WHY LUMO — Features                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-brand-dark py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                LUMO&apos;yu Özel Yapan Ne?
              </h2>
              <p className="mt-2 text-white/60">
                Eğitimi eğlenceli, ölçülebilir ve güvenli hale getiriyoruz
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-0">
                        {/* Colored icon strip */}
                        <div
                          className={`flex w-16 shrink-0 items-center justify-center self-stretch ${feature.color}`}
                        >
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="p-5">
                          <h3 className="text-base font-bold text-white">
                            {feature.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-white/60">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  SUBJECTS                                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Ders Bazlı Öğrenme
              </h2>
              <p className="mt-2 text-muted-foreground">
                Her ders için özel olarak tasarlanmış eğitsel oyunlar
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Matematik",
                  icon: Calculator,
                  desc: "Sayılar, işlemler, geometri ve daha fazlası",
                  color: "bg-brand-teal",
                  games: 12,
                },
                {
                  title: "Fen Bilimleri",
                  icon: FlaskConical,
                  desc: "Canlılar, madde, fiziksel olaylar",
                  color: "bg-brand-green",
                  games: 8,
                },
                {
                  title: "Sosyal Bilgiler",
                  icon: Globe,
                  desc: "Tarih, coğrafya, vatandaşlık",
                  color: "bg-brand-dark",
                  games: 6,
                },
              ].map((subject, index) => (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div
                        className={`flex items-center justify-center ${subject.color} p-10 text-white`}
                      >
                        <subject.icon className="h-14 w-14" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-foreground">
                          {subject.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {subject.desc}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {subject.games} oyun
                          </span>
                          <Button asChild variant="outline" size="sm">
                            <Link href="/register">
                              Keşfet
                              <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TESTIMONIALS                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Aileler Ne Diyor?
              </h2>
              <p className="mt-2 text-muted-foreground">
                LUMO kullanan ailelerden geri bildirimler
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="flex h-full flex-col p-6">
                      {/* Stars */}
                      <div className="mb-4 flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-brand-lime text-brand-lime"
                          />
                        ))}
                      </div>
                      {/* Quote */}
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {t.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  QUOTE BANNER                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-0 bg-brand-teal shadow-lg">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center gap-6 p-10 text-center md:p-14">
                    <p className="text-2xl font-extrabold leading-snug text-white md:text-3xl">
                      &ldquo;Oyun oyna, öğren —
                      <br />
                      eğitim az önce eğlenceli oldu.&rdquo;
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-brand-lime px-8 text-base font-bold text-brand-dark hover:bg-brand-lime/90"
                    >
                      <Link href="/register">
                        Hemen Başla
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FOR TEACHERS                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid items-center gap-10 md:grid-cols-2">
              {/* Left — Mock dashboard */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <Card className="overflow-hidden shadow-md">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-0">
                      <div className="flex w-14 shrink-0 items-center justify-center self-stretch bg-brand-teal">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-1 items-center justify-between p-4">
                        <span className="text-sm font-bold text-foreground">
                          5-A Sınıfı
                        </span>
                        <span className="text-xs text-muted-foreground">
                          28 öğrenci
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        Ortalama İlerleme
                      </span>
                      <span className="text-sm font-bold text-brand-green">
                        %78
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[78%] rounded-full bg-brand-green" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        Bu Hafta En Aktif
                      </span>
                    </div>
                    <div className="mt-3 flex -space-x-1">
                      {[44, 68, 47, 59].map((img) => (
                        <img
                          key={img}
                          src={`https://i.pravatar.cc/32?img=${img}`}
                          alt=""
                          className="h-7 w-7 rounded-full border-2 border-background"
                        />
                      ))}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-brand-teal text-[10px] font-bold text-white">
                        +24
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right — Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                  Öğretmenler İçin Ücretsiz
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Sınıfınızı oluşturun, öğrenci ilerlemesini kolayca takip
                  edin. LUMO öğretmenler için her zaman ücretsiz.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Sınıf oluşturma ve öğrenci ekleme",
                    "İlerleme analizi ve raporlama",
                    "Sınıf liderlik tablosu",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 rounded-full bg-brand-dark px-8 text-base font-bold text-white hover:bg-brand-dark/90"
                >
                  <Link href="/register?role=teacher">
                    Öğretmen Olarak Kaydol
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TRUST & SECURITY                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Güvenlik ve Gizlilik
              </h2>
              <p className="mt-2 text-muted-foreground">
                Çocuğunuzun güvenliği bizim önceliğimiz
              </p>
            </motion.div>

            <div className="max-w-2xl space-y-3">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                        <CheckCircle2 className="h-5 w-5 text-brand-green" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {point}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CTA — FREE TRIAL                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-lg text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-lime/20">
                <Sparkles className="h-8 w-8 text-brand-green" />
              </div>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                İlk Hafta Ücretsiz
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Kredi kartı gerekmez. Hemen başlayın.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-brand-green px-10 text-base font-bold text-white hover:bg-brand-green/90"
              >
                <Link href="/register">
                  Hemen Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                7 gün ücretsiz deneme &middot; İstediğin zaman iptal et
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
