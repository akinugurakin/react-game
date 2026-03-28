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
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    color: "bg-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    num: 2,
    icon: Gamepad2,
    title: "Oyun Oyna",
    desc: "MEB müfredatına uygun oyunlarla eğlenerek öğren",
    color: "bg-purple-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    num: 3,
    icon: Trophy,
    title: "İlerlemeni Takip Et",
    desc: "Rozet kazan, seviye atla, liderlik tablosunda yüksel",
    color: "bg-green-500",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const subjects = [
  {
    title: "Matematik",
    icon: Calculator,
    desc: "Sayılar, işlemler, geometri ve daha fazlası",
    emoji: "🧮",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Fen Bilimleri",
    icon: FlaskConical,
    desc: "Canlılar, madde, fiziksel olaylar",
    emoji: "🧪",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Sosyal Bilgiler",
    icon: Globe,
    desc: "Tarih, coğrafya, vatandaşlık",
    emoji: "🌍",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const features = [
  {
    icon: Brain,
    title: "MEB Müfredatına Uygun",
    desc: "Tüm oyunlar müfredat kazanımlarına bağlı olarak tasarlanmıştır.",
  },
  {
    icon: Trophy,
    title: "Oyunlaştırılmış Öğrenme",
    desc: "Rozet, puan ve liderlik tablosuyla sürdürülebilir motivasyon.",
  },
  {
    icon: BarChart3,
    title: "Ölçülebilir İlerleme",
    desc: "Ders bazlı ilerleme takibi ve detaylı analiz paneli.",
  },
  {
    icon: Shield,
    title: "Güvenli ve Reklamsız",
    desc: "Ebeveyn kontrolü, KVKK uyumlu, tamamen reklamsız.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Veli",
    avatar: "https://i.pravatar.cc/150?img=44",
    text: "Kızım LUMO sayesinde matematik dersinde çok ilerledi. Müfredata uygun olması beni çok rahatlattı.",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    role: "Veli",
    avatar: "https://i.pravatar.cc/150?img=68",
    text: "Oğlum için güvenli bir eğitim ortamı arıyordum. LUMO tam aradığım şey oldu. Reklamsız ve KVKK uyumlu.",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    role: "Öğretmen",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "Sınıfımda LUMO kullanıyorum. Çocuklar MEB müfredatına uygun oyunlarla öğrenirken motivasyonları arttı!",
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
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
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
    <div className="relative flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white pb-16 pt-24 md:pb-24 md:pt-32">
          {/* Subtle background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#DBF227]/10 blur-3xl" />
            <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#005C53]/5 blur-3xl" />
          </div>

          <div className="container relative">
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
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DBF227]/40 bg-[#DBF227]/10 px-4 py-1.5"
                >
                  <Sparkles className="h-4 w-4 text-[#9FC131]" />
                  <span className="text-sm font-semibold text-[#042940]">
                    MEB Müfredatına %100 Uygun
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={0.05}
                  className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#042940] md:text-5xl lg:text-6xl"
                >
                  Oyun Oyna,
                  <br />
                  Müfredat{" "}
                  <span className="inline-block rounded-full bg-[#DBF227] px-5 py-1">
                    Öğren!
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={0.15}
                  className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500"
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
                    className="rounded-full bg-[#042940] px-8 text-base font-bold text-white shadow-lg shadow-[#042940]/20 hover:bg-[#042940]/90"
                  >
                    <Link href="/register">
                      Ücretsiz Dene
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="rounded-full text-base font-semibold text-[#042940]"
                  >
                    <Link href="#nasil-calisir">Nasıl Çalışır?</Link>
                  </Button>
                </motion.div>

                {/* Social proof mini */}
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
                        className="h-9 w-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-[#DBF227] text-[#DBF227]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold text-[#042940]">1.200+</span>{" "}
                      aile LUMO&apos;yu tercih ediyor
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right — Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative mx-auto w-full max-w-md lg:max-w-none"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#042940]/10">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=700&fit=crop"
                    alt="Öğrenci tablet ile ders çalışıyor"
                    className="h-auto w-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#042940]/30 via-transparent to-transparent" />
                </div>

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute -left-6 top-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Calculator className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#042940]">
                      Matematik
                    </p>
                    <p className="text-xs text-gray-400">12 oyun</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -right-4 top-1/3 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBF227]/20">
                    <Trophy className="h-5 w-5 text-[#9FC131]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#042940]">
                      Rozet Kazandın!
                    </p>
                    <p className="text-xs text-gray-400">Matematik Ustası</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.8,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -left-2 bottom-16 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#042940]">
                      İlerleme
                    </p>
                    <div className="mt-0.5 h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TAGLINE + HOW IT WORKS                                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="nasil-calisir" className="bg-[#FAFAFA] py-20 md:py-28">
          <div className="container">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-16 max-w-xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-[#042940] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Nasıl Çalışır?
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#042940] md:text-4xl">
                Oyun oyna, öğren, ilerle.
                <br />
                <span className="text-gray-400">Bu kadar basit!</span>
              </h2>
            </motion.div>

            {/* Steps */}
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Step number */}
                  <span
                    className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full ${step.color} text-sm font-bold text-white shadow-lg`}
                  >
                    {step.num}
                  </span>
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${step.iconBg}`}
                  >
                    <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#042940]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  SUBJECTS                                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-14 max-w-xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-[#005C53]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#005C53]">
                Dersler
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#042940] md:text-4xl">
                Ders Bazlı Öğrenme
              </h2>
              <p className="mt-3 text-gray-500">
                Her ders için özel olarak tasarlanmış eğitsel oyunlar
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Top gradient bar */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${subject.gradient}`}
                  />
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#005C53]/10">
                      <subject.icon className="h-6 w-6 text-[#005C53]" />
                    </div>
                    <span className="text-3xl">{subject.emoji}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#042940]">
                    {subject.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {subject.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#005C53]">
                    <span>Oyunları Keşfet</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  WHY LUMO — Features                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#042940] py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-14 max-w-xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-[#DBF227]/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#DBF227]">
                Neden LUMO?
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
                LUMO&apos;yu Özel Yapan Ne?
              </h2>
              <p className="mt-3 text-gray-400">
                Eğitimi eğlenceli, ölçülebilir ve güvenli hale getiriyoruz
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DBF227]/20">
                    <feature.icon className="h-6 w-6 text-[#DBF227]" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TESTIMONIALS                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-14 max-w-xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-purple-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-purple-600">
                Yorumlar
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#042940] md:text-4xl">
                Aileler Ne Diyor?
              </h2>
              <p className="mt-3 text-gray-500">
                LUMO kullanan ailelerden geri bildirimler
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#DBF227] text-[#DBF227]"
                      />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
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
                      <p className="text-sm font-bold text-[#042940]">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  QUOTE BANNER                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#FAFAFA] py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#042940] via-[#005C53] to-[#042940] p-10 text-center md:p-14"
            >
              {/* Decorative blurs */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#DBF227]/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#9FC131]/15 blur-3xl" />

              <p className="relative text-2xl font-extrabold leading-snug text-white md:text-3xl">
                &ldquo;Oyun oyna, öğren —
                <br />
                eğitim az önce eğlenceli oldu.&rdquo;
              </p>
              <Button
                asChild
                size="lg"
                className="relative mt-8 rounded-full bg-[#DBF227] px-8 text-base font-bold text-[#042940] shadow-lg hover:bg-[#DBF227]/90"
              >
                <Link href="/register">
                  Hemen Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FOR TEACHERS                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2"
            >
              {/* Left — info */}
              <div>
                <span className="mb-3 inline-block rounded-full bg-purple-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-purple-600">
                  Öğretmenler İçin
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-[#042940] md:text-4xl">
                  Öğretmenler
                  <br />
                  İçin Ücretsiz
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-500">
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
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9FC131]" />
                      <span className="text-sm font-medium text-[#042940]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 rounded-full bg-[#042940] px-8 text-base font-bold text-white shadow-lg shadow-[#042940]/20 hover:bg-[#042940]/90"
                >
                  <Link href="/register?role=teacher">
                    Öğretmen Olarak Kaydol
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Right — visual */}
              <div className="relative">
                <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                  <div className="space-y-4">
                    {/* Mock dashboard cards */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-bold text-[#042940]">
                            5-A Sınıfı
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                          28 öğrenci
                        </span>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#042940]">
                          Ortalama İlerleme
                        </span>
                        <span className="text-sm font-bold text-[#9FC131]">
                          %78
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#9FC131] to-[#DBF227]" />
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#042940]">
                          Bu Hafta
                        </span>
                        <span className="text-xs font-medium text-gray-400">
                          En aktif
                        </span>
                      </div>
                      <div className="mt-3 flex -space-x-1">
                        {[44, 68, 47, 59].map((img) => (
                          <img
                            key={img}
                            src={`https://i.pravatar.cc/32?img=${img}`}
                            alt=""
                            className="h-7 w-7 rounded-full border-2 border-white"
                          />
                        ))}
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#005C53] text-[10px] font-bold text-white">
                          +24
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TRUST & SECURITY                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#FAFAFA] py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-12 max-w-xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-emerald-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                Güvenlik
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#042940] md:text-4xl">
                Güvenlik ve Gizlilik
              </h2>
              <p className="mt-3 text-gray-500">
                Çocuğunuzun güvenliği bizim önceliğimiz
              </p>
            </motion.div>

            <div className="mx-auto max-w-2xl space-y-3">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9FC131]/15">
                    <CheckCircle2 className="h-5 w-5 text-[#9FC131]" />
                  </div>
                  <span className="text-sm font-medium text-[#042940]">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CTA — FREE TRIAL                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-lg text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DBF227]/20">
                <Sparkles className="h-8 w-8 text-[#9FC131]" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                İlk Hafta Ücretsiz
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                Kredi kartı gerekmez. Hemen başlayın.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-[#9FC131] px-10 text-base font-bold text-white shadow-lg shadow-[#9FC131]/20 hover:bg-[#9FC131]/90"
              >
                <Link href="/register">
                  Hemen Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-gray-400">
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
