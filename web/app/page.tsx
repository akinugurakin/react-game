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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageLines } from "@/components/ui/page-lines";
import { TestimonialCarousel } from "@/components/ui/testimonial";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    id: 1,
    name: "Ay\u015Fe Y\u0131lmaz",
    avatar: "https://i.pravatar.cc/150?img=44",
    description:
      "K\u0131z\u0131m LUMO sayesinde matematik dersinde \u00E7ok ilerledi. M\u00FCfredata uygun olmas\u0131 beni \u00E7ok rahatlatt\u0131, oyunlar\u0131 oynamak i\u00E7in her g\u00FCn heyecanlan\u0131yor.",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    avatar: "https://i.pravatar.cc/150?img=68",
    description:
      "O\u011Flum i\u00E7in g\u00FCvenli bir e\u011Fitim ortam\u0131 ar\u0131yordum. LUMO tam arad\u0131\u011F\u0131m \u015Fey oldu. Reklams\u0131z, KVKK uyumlu ve ebeveyn kontrol\u00FC harika.",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    avatar: "https://i.pravatar.cc/150?img=47",
    description:
      "\u00D6\u011Fretmen olarak s\u0131n\u0131f\u0131mda LUMO kullan\u0131yorum. \u00C7ocuklar MEB m\u00FCfredat\u0131na uygun oyunlarla \u00F6\u011Frenirken motivasyonlar\u0131 inan\u0131lmaz artt\u0131!",
  },
  {
    id: 4,
    name: "Ali \u00D6zt\u00FCrk",
    avatar: "https://i.pravatar.cc/150?img=59",
    description:
      "\u0130ki \u00E7ocu\u011Fum da LUMO'da oynuyor. Fen Bilimleri ve Matematik derslerinde notlar\u0131 g\u00F6zle g\u00F6r\u00FCl\u00FCr \u015Fekilde y\u00FCkseldi. Ekran s\u00FCresinin verimli ge\u00E7ti\u011Fini bilmek \u00E7ok de\u011Ferli.",
  },
  {
    id: 5,
    name: "Fatma Arslan",
    avatar: "https://i.pravatar.cc/150?img=45",
    description:
      "Reklams\u0131z ve g\u00FCvenli bir platform. \u00C7ocu\u011Fumun verilerinin korundu\u011Funu bilmek \u00E7ok de\u011Ferli. LUMO'yu t\u00FCm velilere tavsiye ediyorum.",
  },
];

const trustPoints = [
  "MEB m\u00FCfredat\u0131na uygun, pedagojik a\u00E7\u0131dan onaylanm\u0131\u015F i\u00E7erikler",
  "KVKK uyumlu veri g\u00FCvenli\u011Fi ve \u00E7ocuk gizlili\u011Fi",
  "Tamamen reklams\u0131z, dikkat da\u011F\u0131t\u0131c\u0131 i\u00E7erik yok",
  "Ebeveyn kontrol paneli ile s\u00FCre ve i\u00E7erik y\u00F6netimi",
  "13 ya\u015F alt\u0131 i\u00E7in ebeveyn onay\u0131 zorunlulu\u011Fu",
];

/* ------------------------------------------------------------------ */
/*  ANIMATION HELPERS                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
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
      <PageLines />
      <Header />

      <main className="flex-1">
        {/* ===== SECTION 1 : HERO ===== */}
        <section className="relative bg-white pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left — text */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.h1
                  variants={fadeUp}
                  custom={0}
                  className="text-4xl font-extrabold leading-tight tracking-tight text-[#042940] md:text-5xl lg:text-6xl"
                >
                  Oyun Oyna,
                  <br />
                  M\u00FCfredat
                  <br />
                  <span className="inline-block rounded-full bg-[#DBF227] px-5 py-1 mt-1">
                    \u00D6\u011Fren!
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={0.15}
                  className="mt-6 max-w-md text-lg text-gray-600"
                >
                  MEB m\u00FCfredat\u0131na uygun e\u011Fitsel oyunlarla
                  \u00E7ocu\u011Funuz e\u011Flenirken \u00F6\u011Frenir.
                </motion.p>

                <motion.div variants={fadeUp} custom={0.3} className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#9FC131] px-8 text-base font-bold text-white shadow-md hover:bg-[#9FC131]/90"
                  >
                    <Link href="/register">
                      \u00DCcretsiz Dene
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right — image + floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative mx-auto w-full max-w-md lg:max-w-none"
              >
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=700&fit=crop"
                    alt="Ders \u00E7al\u0131\u015Fan \u00F6\u011Frenci"
                    className="h-auto w-full object-cover"
                  />
                </div>

                {/* Floating emoji badges */}
                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -left-4 top-8 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl shadow-sm"
                >
                  🧮
                </motion.span>
                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -right-4 top-1/3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl shadow-sm"
                >
                  🧪
                </motion.span>
                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.8 }}
                  className="absolute -left-2 bottom-16 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl shadow-sm"
                >
                  🌍
                </motion.span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2 : TAGLINE ===== */}
        <section className="bg-white py-12">
          <div className="container text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-[#042940] md:text-3xl"
            >
              Oyun oyna, \u00F6\u011Fren, ilerle. Bu kadar basit!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-lg text-gray-500"
            >
              Nas\u0131l \u00C7al\u0131\u015F\u0131r?
            </motion.p>
          </div>
        </section>

        {/* ===== SECTION 3 : HOW IT WORKS ===== */}
        <section id="nasil-calisir" className="bg-[#FAFAFA] py-16 md:py-20">
          <div className="container">
            <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-3">
              {[
                {
                  num: 1,
                  icon: GraduationCap,
                  title: "S\u0131n\u0131f\u0131n\u0131 Se\u00E7",
                  desc: "1-8. s\u0131n\u0131f aras\u0131nda \u00E7ocu\u011Funun seviyesini belirle",
                  color: "bg-blue-50",
                  iconColor: "text-blue-600",
                },
                {
                  num: 2,
                  icon: Gamepad2,
                  title: "Oyun Oyna",
                  desc: "M\u00FCfredata uygun oyunlarla e\u011Flenerek \u00F6\u011Fren",
                  color: "bg-purple-50",
                  iconColor: "text-purple-600",
                },
                {
                  num: 3,
                  icon: BarChart3,
                  title: "\u0130lerlemeni Takip Et",
                  desc: "Rozet kazan, seviye atla, liderlik tablosunda y\u00FCksel",
                  color: "bg-green-50",
                  iconColor: "text-green-600",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Number */}
                  <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#042940] text-sm font-bold text-white">
                    {step.num}
                  </span>
                  {/* Icon circle */}
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${step.color}`}
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

        {/* ===== SECTION 4 : SUBJECTS ===== */}
        <section className="bg-white py-16 md:py-20">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center text-3xl font-extrabold text-[#042940] md:text-4xl"
            >
              Ders Bazl\u0131 \u00D6\u011Frenme
            </motion.h2>

            <div className="mx-auto max-w-4xl rounded-3xl bg-blue-50/60 p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Matematik",
                    icon: Calculator,
                    desc: "Say\u0131lar, i\u015Flemler, geometri ve daha fazlas\u0131",
                    bg: "bg-white",
                    badge: "🧮",
                  },
                  {
                    title: "Fen Bilimleri",
                    icon: FlaskConical,
                    desc: "Canl\u0131lar, madde, fiziksel olaylar",
                    bg: "bg-white",
                    badge: "🧪",
                  },
                  {
                    title: "Sosyal Bilgiler",
                    icon: Globe,
                    desc: "Tarih, co\u011Frafya, vatanda\u015Fl\u0131k",
                    bg: "bg-white",
                    badge: "🌍",
                  },
                ].map((subject, index) => (
                  <motion.div
                    key={subject.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className={`${subject.bg} group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
                        <subject.icon className="h-5 w-5 text-[#005C53]" />
                      </div>
                      <span className="text-xl">{subject.badge}</span>
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-[#042940]">
                      {subject.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {subject.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 5 : WHY LUMO ===== */}
        <section className="bg-[#FAFAFA] py-16 md:py-20">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center text-3xl font-extrabold text-[#042940] md:text-4xl"
            >
              LUMO&apos;yu \u00D6zel Yapan Ne?
            </motion.h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {[
                {
                  icon: Brain,
                  title: "MEB M\u00FCfredat\u0131na Uygun",
                  desc: "T\u00FCm oyunlar m\u00FCfredat kazan\u0131mlar\u0131na ba\u011Fl\u0131 olarak tasarlanm\u0131\u015Ft\u0131r.",
                },
                {
                  icon: Trophy,
                  title: "Oyunla\u015Ft\u0131r\u0131lm\u0131\u015F \u00D6\u011Frenme",
                  desc: "Rozet, puan ve liderlik tablosuyla s\u00FCrd\u00FCr\u00FClebilir motivasyon.",
                },
                {
                  icon: BarChart3,
                  title: "\u00D6l\u00E7\u00FClebilir \u0130lerleme",
                  desc: "Ders bazl\u0131 ilerleme takibi ve detayl\u0131 analiz paneli.",
                },
                {
                  icon: Shield,
                  title: "G\u00FCvenli ve Reklams\u0131z",
                  desc: "Ebeveyn kontrol\u00FC, KVKK uyumlu, tamamen reklams\u0131z.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#005C53]/10">
                    <feature.icon className="h-6 w-6 text-[#005C53]" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-[#042940]">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 6 : TESTIMONIALS ===== */}
        <section className="bg-white py-16 md:py-20">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-2 text-center text-3xl font-extrabold text-[#042940] md:text-4xl"
            >
              Aileler Ne Diyor?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10 text-center text-lg text-gray-500"
            >
              LUMO kullanan ailelerden geri bildirimler
            </motion.p>

            <TestimonialCarousel
              testimonials={testimonials}
              className="mx-auto max-w-sm"
            />
          </div>
        </section>

        {/* ===== SECTION 7 : FOR TEACHERS ===== */}
        <section className="bg-white py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl rounded-3xl bg-purple-50 p-8 text-center md:p-12"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#042940] md:text-3xl">
                \u00D6\u011Fretmenler \u0130\u00E7in \u00DCcretsiz
              </h2>
              <p className="mt-4 text-lg italic text-gray-600">
                &ldquo;S\u0131n\u0131f\u0131n\u0131z\u0131 olu\u015Fturun,
                \u00F6\u011Frenci ilerlemesini kolayca takip edin.&rdquo;
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 bg-[#042940] px-8 text-base font-bold text-white shadow-md hover:bg-[#042940]/90"
              >
                <Link href="/register?role=teacher">
                  \u00D6\u011Fretmen Olarak Kaydol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 8 : TRUST ===== */}
        <section className="bg-[#FAFAFA] py-16 md:py-20">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center text-3xl font-extrabold text-[#042940] md:text-4xl"
            >
              G\u00FCvenlik ve Gizlilik
            </motion.h2>

            <div className="mx-auto max-w-2xl space-y-3">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9FC131]" />
                  <span className="text-sm font-medium text-[#042940]">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 9 : PRICING ===== */}
        <section className="bg-white py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-sm rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-md"
            >
              <h2 className="text-2xl font-extrabold text-[#042940] md:text-3xl">
                \u0130lk Hafta \u00DCcretsiz
              </h2>
              <p className="mt-2 text-gray-500">Kredi kart\u0131 gerekmez</p>
              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-[#9FC131] text-base font-bold text-white shadow-md hover:bg-[#9FC131]/90"
              >
                <Link href="/register">
                  Hemen Ba\u015Fla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
