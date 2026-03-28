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
  Sparkles,
  Zap,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageLines } from "@/components/ui/page-lines";
import { TestimonialCarousel } from "@/components/ui/testimonial";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Hand-drawn SVG underline decoration                                */
/* ------------------------------------------------------------------ */
function HandDrawnUnderline({
  color = "#DBF227",
  width = "100%",
  className = "",
}: {
  color?: string;
  width?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width, display: "block" }}
      preserveAspectRatio="none"
    >
      <path
        d="M2 8.5C20 3.5 40 2 60 4.5C80 7 100 9.5 130 5C150 2 170 3 198 7"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10C30 5 70 3.5 100 6C130 8.5 165 4 195 8.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative wave separator                                          */
/* ------------------------------------------------------------------ */
function WaveSeparator({
  flip = false,
  fillClass = "fill-white",
  fill,
}: {
  flip?: boolean;
  fillClass?: string;
  fill?: string;
}) {
  return (
    <div className={`absolute ${flip ? "top-0 rotate-180" : "bottom-0"} left-0 right-0 leading-[0]`}>
      <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
        <path
          d="M0,50 C180,80 360,20 540,45 C720,70 900,15 1080,40 C1260,65 1350,30 1440,50 L1440,80 L0,80 Z"
          className={fill ? undefined : fillClass}
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative curved line accent                                      */
/* ------------------------------------------------------------------ */
function CurvedLineAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 30"
      fill="none"
      className={`pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 15 Q100 0 200 15 Q300 30 400 15"
        stroke="#9FC131"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <path
        d="M0 20 Q100 5 200 20 Q300 35 400 20"
        stroke="#DBF227"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data arrays                                                        */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    id: 1,
    name: "Ayse Yilmaz",
    avatar: "https://i.pravatar.cc/150?img=44",
    description:
      "Kizim bu platformu cok seviyor! Matematik oyunuyla carpim tablosunu ogrenmesi cok kolaylasti. Her gun oynamak istiyor.",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    avatar: "https://i.pravatar.cc/150?img=68",
    description:
      "Oglum icin guvenli bir egitim ortami ariyordum. React Game tam aradigim sey oldu. Ebeveyn kontrolu harika.",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    avatar: "https://i.pravatar.cc/150?img=47",
    description:
      "Ogretmen olarak sinifimda kullaniyorum. Cocuklar liderlik tablosunda yarismayı cok seviyor, motivasyonlari artti!",
  },
  {
    id: 4,
    name: "Ali Ozturk",
    avatar: "https://i.pravatar.cc/150?img=59",
    description:
      "Iki cocugum da bu platformda oynuyor. Ekran basinda gecirdikleri surenin verimli oldugunu bilmek beni mutlu ediyor.",
  },
  {
    id: 5,
    name: "Fatma Arslan",
    avatar: "https://i.pravatar.cc/150?img=45",
    description:
      "Reklamsiz ve guvenli bir ortam. Cocugumun verilerinin korundugunu bilmek cok degerli. Kesinlikle tavsiye ediyorum.",
  },
];

const features = [
  {
    icon: Brain,
    title: "Egitici Oyunlar",
    description:
      "Matematik, kelime ve hafiza oyunlariyla eglenerek ogrenme deneyimi.",
    gradient: "from-brand-teal to-brand-dark",
    accent: "#005C53",
  },
  {
    icon: Trophy,
    title: "Liderlik Tablosu",
    description:
      "Haftalik ve tum zamanlar siralamalariyla motivasyonu artir.",
    gradient: "from-brand-green to-brand-teal",
    accent: "#9FC131",
  },
  {
    icon: BarChart3,
    title: "Ilerleme Takibi",
    description:
      "Cocugunuzun gelisimini detayli istatistiklerle takip edin.",
    gradient: "from-brand-dark to-brand-teal",
    accent: "#042940",
  },
  {
    icon: Shield,
    title: "Guvenli Ortam",
    description:
      "Ebeveyn kontrolu ve yasa uygun iceriklerle guvenli bir platform.",
    gradient: "from-brand-teal to-brand-green",
    accent: "#005C53",
  },
];

const popularGames = [
  {
    id: 1,
    title: "Matematik Yarismasi",
    description: "Toplama ve cikarma ile hizini test et",
    icon: Calculator,
    image:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop",
    players: "1.2K",
    category: "Matematik",
  },
  {
    id: 2,
    title: "Kelime Avi",
    description: "Harflerden anlamli kelimeler olustur",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    players: "890",
    category: "Dil",
  },
  {
    id: 3,
    title: "Hafiza Kartlari",
    description: "Eslesen kartlari bul ve hafizani guclendir",
    icon: Brain,
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    players: "1.1K",
    category: "Hafiza",
  },
  {
    id: 4,
    title: "Bulmaca Dunyasi",
    description: "Sekilleri dogru yere yerlestir",
    icon: Puzzle,
    image:
      "https://images.unsplash.com/photo-1611996515299-d2a9b2e8b45c?w=400&h=300&fit=crop",
    players: "670",
    category: "Mantik",
  },
];

const topPlayers = [
  {
    username: "matKral42",
    initials: "MK",
    score: 12850,
    games: 156,
    rank: 1,
    gradient: "from-brand-lime to-brand-green",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    username: "zeynepOyun",
    initials: "ZO",
    score: 11200,
    games: 134,
    rank: 2,
    gradient: "from-brand-green to-brand-teal",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    username: "aliCoder",
    initials: "AC",
    score: 10750,
    games: 128,
    rank: 3,
    gradient: "from-brand-teal to-brand-dark",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    username: "elifStar",
    initials: "ES",
    score: 9800,
    games: 115,
    rank: 4,
    gradient: "from-brand-dark to-brand-teal",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    username: "canBey",
    initials: "CB",
    score: 9350,
    games: 108,
    rank: 5,
    gradient: "from-brand-teal to-brand-green",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

const steps = [
  {
    step: "1",
    title: "Kayit Ol",
    description: "Ucretsiz hesap olustur, sadece birkac saniye surer.",
    icon: Users,
    gradient: "from-brand-dark to-brand-teal",
  },
  {
    step: "2",
    title: "Oyun Sec",
    description: "Yasina uygun egitici oyunlar arasindan birini sec.",
    icon: Gamepad2,
    gradient: "from-brand-teal to-brand-green",
  },
  {
    step: "3",
    title: "Ogren & Kazan",
    description: "Oyna, puan topla ve liderlik tablosunda yuksel!",
    icon: Trophy,
    gradient: "from-brand-green to-brand-lime",
  },
];

const trustPoints = [
  "Yasa uygun, pedagojik acidan onaylanmis icerikler",
  "13 yas alti icin ebeveyn onayi zorunlulugu",
  "Kisisel veri guvenligi ve KVKK uyumu",
  "Reklamsiz, dikkat dagitmayan arayuz",
  "Oyun suresi takibi ve ebeveyn bildirimleri",
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <PageLines />
      <Header />

      <main className="flex-1">
        {/* ============================================================= */}
        {/*  1. HERO  --  Dark bg #042940                                  */}
        {/* ============================================================= */}
        <section className="relative overflow-hidden bg-brand-dark text-white">
          <FloatingIcons />

          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute -left-32 top-10 w-[600px] opacity-[0.06]"
              viewBox="0 0 300 300"
            >
              <circle cx="150" cy="150" r="140" fill="none" stroke="#9FC131" strokeWidth="1" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="#DBF227" strokeWidth="0.5" />
              <circle cx="150" cy="150" r="60" fill="none" stroke="#9FC131" strokeWidth="0.5" />
            </svg>
            <svg
              className="absolute right-0 -top-10 w-[500px] opacity-[0.05]"
              viewBox="0 0 200 200"
            >
              <path
                d="M 0 100 Q 50 30 100 100 Q 150 170 200 100"
                fill="none"
                stroke="#DBF227"
                strokeWidth="1.5"
              />
              <path
                d="M 0 120 Q 50 50 100 120 Q 150 190 200 120"
                fill="none"
                stroke="#9FC131"
                strokeWidth="1"
              />
            </svg>
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brand-teal/10 blur-[120px]" />
            <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand-green/8 blur-[100px]" />
          </div>

          <div className="container relative z-10 py-24 md:py-32 lg:py-36">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left column - Text */}
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-sm"
                >
                  <Sparkles className="h-4 w-4 text-brand-lime" />
                  <span className="text-sm font-medium text-white/80">
                    6-12 yas arasi cocuklar icin
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
                >
                  Eglenerek{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-brand-lime">Ogrenmenin</span>
                    <span className="absolute -bottom-2 left-0 right-0 z-0">
                      <HandDrawnUnderline color="#DBF227" />
                    </span>
                  </span>
                  <br />
                  En Guzel Yolu
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="mt-6 max-w-md text-lg leading-relaxed text-white/60"
                >
                  Egitici mini oyunlarla cocugunuzun matematik, dil ve problem
                  cozme becerilerini gelistirin. Guvenli, reklamsiz, eglencelil.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10 flex flex-col gap-4 sm:flex-row"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-lime text-brand-dark text-base px-8 py-6 shadow-lg shadow-brand-lime/20 hover:bg-brand-lime/90 font-bold rounded-xl"
                  >
                    <Link href="/register">
                      Ucretsiz Basla <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-base px-8 py-6 border-white/20 text-white hover:bg-white/10 rounded-xl"
                  >
                    <Link href="/login">Giris Yap</Link>
                  </Button>
                </motion.div>

                {/* Mini stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="mt-12 flex gap-10"
                >
                  {[
                    { value: "3.2K+", label: "Aktif Oyuncu", color: "text-brand-lime" },
                    { value: "4", label: "Egitici Oyun", color: "text-brand-green" },
                    { value: "50K+", label: "Oynanan Oyun", color: "text-brand-sand" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/40">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right column - Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  {/* Main image */}
                  <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/30">
                    <img
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=420&fit=crop"
                      alt="Cocuklar ogreniyor"
                      className="h-[400px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent rounded-3xl" />
                  </div>

                  {/* Floating card - Math */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute -left-8 top-8 rounded-2xl bg-white p-4 shadow-xl shadow-black/10 -rotate-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime/20">
                        <Calculator className="h-5 w-5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-dark">Matematik</p>
                        <p className="text-xs text-brand-dark/50">1.2K oyuncu</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating card - Trophy */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.95 }}
                    className="absolute -right-6 bottom-12 rounded-2xl bg-white p-4 shadow-xl shadow-black/10 rotate-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10">
                        <Trophy className="h-5 w-5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-dark">Liderlik</p>
                        <p className="text-xs text-brand-dark/50">Siralamaya gir!</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating small image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="absolute -right-10 -top-6 h-24 w-24 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg rotate-6"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=200&h=200&fit=crop"
                      alt="Cocuk tablet kullaniyor"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  {/* Score badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="absolute -left-4 bottom-16 flex items-center gap-2 rounded-full bg-brand-lime px-4 py-2 shadow-lg -rotate-2"
                  >
                    <Zap className="h-4 w-4 text-brand-dark" />
                    <span className="text-sm font-bold text-brand-dark">+250 puan!</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom wave */}
          <WaveSeparator fillClass="fill-background" />
        </section>

        {/* ============================================================= */}
        {/*  2. NASIL CALISIR  --  White bg                                */}
        {/* ============================================================= */}
        <section className="relative py-20 md:py-24 bg-background">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-14 text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-brand-teal/10 px-4 py-1.5 text-sm font-semibold text-brand-teal">
                Kolay Baslangic
              </span>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Nasil{" "}
                <span className="relative inline-block">
                  Calisir?
                  <span className="absolute -bottom-1 left-0 right-0">
                    <HandDrawnUnderline color="#005C53" width="100%" />
                  </span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
                3 kolay adimda ogrenmeye basla
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Connector line between steps */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+40px)] top-8 hidden w-[calc(100%-80px)] md:block">
                      <svg viewBox="0 0 200 2" className="w-full opacity-20">
                        <line
                          x1="0"
                          y1="1"
                          x2="200"
                          y2="1"
                          stroke="#005C53"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.icon className="h-7 w-7" />
                    <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-lime text-xs font-bold text-brand-dark shadow-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="max-w-[220px] text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Curved line accent */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[600px] opacity-40">
            <CurvedLineAccent />
          </div>
        </section>

        {/* ============================================================= */}
        {/*  3. POPULER OYUNLAR  --  Sand/cream bg                         */}
        {/* ============================================================= */}
        <section className="relative py-20 md:py-24 bg-[#D6D58E]/12 overflow-hidden">
          {/* Top decorative line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-sand/40 to-transparent" />

          <div className="container relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-14 text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-brand-teal/10 px-4 py-1.5 text-sm font-semibold text-brand-teal">
                Kesfet
              </span>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Populer{" "}
                <span className="relative inline-block">
                  Oyunlar
                  <span className="absolute -bottom-1 left-0 right-0">
                    <HandDrawnUnderline color="#9FC131" width="100%" />
                  </span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
                En cok oynanan egitici oyunlarimiz
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popularGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                >
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative overflow-hidden h-44">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      {/* Category badge */}
                      <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-dark backdrop-blur-sm">
                        {game.category}
                      </div>
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-lime shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-6 w-6 text-brand-dark ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-base font-bold text-brand-dark">{game.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {game.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          {game.players} oyuncu
                        </span>
                        <span className="text-xs font-semibold text-brand-teal group-hover:underline">
                          Oyna
                          <ArrowRight className="ml-1 inline h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mt-10 text-center"
            >
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-brand-dark/15 px-6 shadow-sm hover:bg-brand-dark hover:text-white transition-colors"
              >
                <Link href="/games">
                  Tum Oyunlari Gor <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/*  4. NEDEN REACT GAME  --  White bg                             */}
        {/* ============================================================= */}
        <section className="relative py-20 md:py-24 bg-background overflow-hidden">
          {/* Decorative dots pattern */}
          <div className="absolute right-0 top-20 opacity-[0.04] pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200">
              {Array.from({ length: 100 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(i % 10) * 20 + 10}
                  cy={Math.floor(i / 10) * 20 + 10}
                  r="2"
                  fill="#042940"
                />
              ))}
            </svg>
          </div>

          <div className="container relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-14 text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-brand-teal/10 px-4 py-1.5 text-sm font-semibold text-brand-teal">
                Ozellikler
              </span>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Neden{" "}
                <span className="relative inline-block">
                  React Game?
                  <span className="absolute -bottom-1 left-0 right-0">
                    <HandDrawnUnderline color="#DBF227" width="100%" />
                  </span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
                Cocugunuzun gelisimini destekleyen guclu ozellikler
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  className="group"
                >
                  <div className="relative flex flex-col items-center rounded-2xl border border-transparent bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-sand/30">
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-12 rounded-b-full transition-all duration-300 group-hover:w-20"
                      style={{ backgroundColor: feature.accent }}
                    />
                    <div
                      className={`mb-5 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/*  5. EN IYI OYUNCULAR  --  Sand bg                              */}
        {/* ============================================================= */}
        <section className="relative py-20 md:py-24 bg-[#D6D58E]/12 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-sand/40 to-transparent" />

          <div className="container relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-14 text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-brand-dark/10 px-4 py-1.5 text-sm font-semibold text-brand-dark">
                Siralama
              </span>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                En Iyi{" "}
                <span className="relative inline-block">
                  Oyuncular
                  <span className="absolute -bottom-1 left-0 right-0">
                    <HandDrawnUnderline color="#042940" width="100%" />
                  </span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
                Bu haftanin yildizlari
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3 md:grid-cols-5">
              {topPlayers.map((player, index) => (
                <motion.div
                  key={player.username}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                >
                  <Card className="group overflow-hidden border-0 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className={`h-16 bg-gradient-to-r ${player.gradient} relative`}>
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute left-1/2 top-0 h-12 w-[1px] rotate-[20deg] bg-white/20" />
                        <div className="absolute right-1/4 top-2 h-8 w-[1px] -rotate-[15deg] bg-white/10" />
                      </div>
                    </div>
                    <CardContent className="relative px-3 pb-5">
                      <div className="-mt-8 mb-3 flex justify-center">
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
                        <div className="mb-1.5 flex justify-center">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              player.rank === 1
                                ? "bg-brand-lime/20 text-brand-dark"
                                : player.rank === 2
                                ? "bg-brand-sand/40 text-brand-dark"
                                : "bg-brand-green/20 text-brand-dark"
                            }`}
                          >
                            {player.rank === 1 ? "1." : player.rank === 2 ? "2." : "3."} sira
                          </span>
                        </div>
                      )}
                      <h3 className="text-sm font-bold truncate">{player.username}</h3>
                      <p className="text-lg font-extrabold text-brand-teal">
                        {player.score.toLocaleString("tr-TR")}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{player.games} oyun</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mt-10 text-center"
            >
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-brand-dark/15 px-6 shadow-sm"
              >
                <Link href="/leaderboard">
                  Tum Siralamayı Gor <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/*  6. TESTIMONIALS  --  Dark bg #042940                          */}
        {/* ============================================================= */}
        <section className="relative py-20 md:py-24 bg-brand-dark text-white overflow-hidden">
          {/* Top wave */}
          <WaveSeparator flip fill="#042940" />

          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] opacity-[0.04]"
              viewBox="0 0 400 400"
            >
              <circle cx="200" cy="200" r="180" fill="none" stroke="#DBF227" strokeWidth="1" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="#9FC131" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="container relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-14 text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-brand-lime/15 px-4 py-1.5 text-sm font-semibold text-brand-lime">
                Kullanici Yorumlari
              </span>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Ebeveynler Ne{" "}
                <span className="relative inline-block">
                  Diyor?
                  <span className="absolute -bottom-1 left-0 right-0">
                    <HandDrawnUnderline color="#DBF227" width="100%" />
                  </span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-white/40">
                Platformumuzu kullanan ailelerden geri bildirimler
              </p>
            </motion.div>

            <TestimonialCarousel
              testimonials={testimonials}
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* Bottom wave */}
          <WaveSeparator fillClass="fill-background" />
        </section>

        {/* ============================================================= */}
        {/*  7. EBEVEYN GUVENLIGI  --  White bg                            */}
        {/* ============================================================= */}
        <section className="relative py-20 md:py-24 bg-background">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                className="text-center"
              >
                {/* Shield icon with decorative ring */}
                <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-brand-teal/10" />
                  <div className="absolute inset-2 rounded-full bg-brand-teal/5" />
                  <Shield className="relative h-10 w-10 text-brand-teal" />
                  {/* Decorative dots around shield */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="4" r="2" fill="#9FC131" opacity="0.5" />
                    <circle cx="90" cy="25" r="1.5" fill="#005C53" opacity="0.4" />
                    <circle cx="96" cy="50" r="2" fill="#DBF227" opacity="0.5" />
                    <circle cx="90" cy="75" r="1.5" fill="#9FC131" opacity="0.4" />
                    <circle cx="50" cy="96" r="2" fill="#005C53" opacity="0.5" />
                    <circle cx="10" cy="75" r="1.5" fill="#DBF227" opacity="0.4" />
                    <circle cx="4" cy="50" r="2" fill="#9FC131" opacity="0.5" />
                    <circle cx="10" cy="25" r="1.5" fill="#005C53" opacity="0.4" />
                  </svg>
                </div>

                <h2 className="text-3xl font-extrabold md:text-4xl">
                  Ebeveynler Icin{" "}
                  <span className="relative inline-block">
                    Guvenli
                    <span className="absolute -bottom-1 left-0 right-0">
                      <HandDrawnUnderline color="#005C53" width="100%" />
                    </span>
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
                  Cocugunuzun guvenligi bizim onceligimiz
                </p>
              </motion.div>

              <div className="mt-10 space-y-3">
                {trustPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20px" }}
                    variants={fadeUp}
                    className="group flex items-center gap-4 rounded-xl border border-brand-sand/20 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-teal/20"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/10 transition-colors duration-300 group-hover:bg-brand-green/20">
                      <CheckCircle2 className="h-5 w-5 text-brand-green" />
                    </div>
                    <span className="font-medium text-brand-dark/80">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA at the bottom */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mt-12 text-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-teal text-white text-base px-8 py-6 rounded-xl shadow-lg shadow-brand-teal/20 hover:bg-brand-teal/90 font-bold"
                >
                  <Link href="/register">
                    Guvenle Basla <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
