"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Trophy,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Gamepad2,
  Calculator,
  FlaskConical,
  Globe,
  Microscope,
  Users,
  BookOpen,
  Check,
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
    name: "Ayşe Yılmaz",
    avatar: "https://i.pravatar.cc/150?img=44",
    description:
      "Kızım LUMO sayesinde matematik dersinde çok ilerledi. Müfredata uygun olması beni çok rahatlattı, oyunları oynamak için her gün heyecanlanıyor.",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    avatar: "https://i.pravatar.cc/150?img=68",
    description:
      "Oğlum için güvenli bir eğitim ortamı arıyordum. LUMO tam aradığım şey oldu. Reklamsız, KVKK uyumlu ve ebeveyn kontrolü harika.",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    avatar: "https://i.pravatar.cc/150?img=47",
    description:
      "Öğretmen olarak sınıfımda LUMO kullanıyorum. Çocuklar MEB müfredatına uygun oyunlarla öğrenirken motivasyonları inanılmaz arttı!",
  },
  {
    id: 4,
    name: "Ali Öztürk",
    avatar: "https://i.pravatar.cc/150?img=59",
    description:
      "İki çocuğum da LUMO'da oynuyor. Fen Bilimleri ve Matematik derslerinde notları gözle görülür şekilde yükseldi. Ekran süresinin verimli geçtiğini bilmek çok değerli.",
  },
  {
    id: 5,
    name: "Fatma Arslan",
    avatar: "https://i.pravatar.cc/150?img=45",
    description:
      "Reklamsız ve güvenli bir platform. Çocuğumun verilerinin korunduğunu bilmek çok değerli. LUMO'yu tüm velilere tavsiye ediyorum.",
  },
];

const subjectCards = [
  {
    title: "Matematik",
    icon: Calculator,
    description: "Sayılar, işlemler, geometri ve daha fazlası",
    image:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop",
  },
  {
    title: "Fen Bilimleri",
    icon: FlaskConical,
    description: "Canlılar, madde, fiziksel olaylar",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
  },
  {
    title: "Sosyal Bilgiler",
    icon: Globe,
    description: "Tarih, coğrafya, vatandaşlık",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400&h=300&fit=crop",
  },
];

const howItWorksSteps = [
  {
    icon: GraduationCap,
    title: "Sınıfını Seç",
    description: "Çocuğunun sınıf seviyesini belirle",
  },
  {
    icon: Gamepad2,
    title: "Oyun Oyna",
    description: "Müfredata uygun oyunlarla öğren",
  },
  {
    icon: BarChart3,
    title: "İlerlemeni Takip Et",
    description: "Rozet kazan, seviye atla",
  },
];

const features = [
  {
    icon: Brain,
    title: "MEB Müfredatına Uygun",
    description:
      "Tüm oyunlar müfredat kazanımlarına bağlı olarak tasarlanmıştır.",
  },
  {
    icon: Trophy,
    title: "Oyunlaştırılmış Öğrenme",
    description:
      "Rozet, puan ve liderlik tablosuyla sürdürülebilir motivasyon.",
  },
  {
    icon: BarChart3,
    title: "Ölçülebilir İlerleme",
    description:
      "Ders bazlı ilerleme takibi ve detaylı analiz.",
  },
  {
    icon: Shield,
    title: "Güvenli ve Reklamsız",
    description:
      "Ebeveyn kontrolü, KVKK uyumlu, tamamen reklamsız.",
  },
];

const trustPoints = [
  "MEB müfredatına uygun, pedagojik açıdan onaylanmış içerikler",
  "13 yaş altı için ebeveyn onayı zorunluluğu",
  "KVKK uyumlu veri güvenliği",
  "Tamamen reklamsız platform",
  "Oyun süresi takibi ve ebeveyn bildirimleri",
];

const teacherFeatures = [
  { title: "Sınıf Oluşturma", description: "Sınıfınızı kolayca oluşturun ve öğrencilerinizi ekleyin" },
  { title: "İlerleme Takibi", description: "Her öğrencinin ders bazlı gelişimini takip edin" },
  { title: "Sınıf Liderlik Tablosu", description: "Sınıf içi rekabet ile motivasyonu artırın" },
];

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
    <div className="relative flex min-h-screen flex-col">
      <PageLines />
      <Header />

      <main className="flex-1">
        {/* ===== SECTION 1: HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-white">
          {/* Subtle gradient blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#DBF227]/10 blur-3xl" />
            <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#005C53]/5 blur-3xl" />
          </div>

          <div className="container relative pb-8 pt-24 md:pt-32 lg:pt-36">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#005C53]/15 bg-white px-4 py-1.5 text-sm font-medium text-[#005C53] shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-[#9FC131]" />
                MEB Müfredatına Uygun
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-3xl text-center text-4xl font-extrabold leading-tight tracking-tight text-[#042940] md:text-5xl lg:text-6xl"
            >
              Çocuklar Oyun Oynarken
              <br />
              Müfredata Uygun{" "}
              <span className="inline-block rounded-lg bg-[#DBF227] px-3 py-1">
                Öğrenir
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mx-auto mt-6 max-w-2xl text-center text-lg text-[#6B7280]"
            >
              1-8. sınıf öğrencileri için Matematik, Fen Bilimleri ve Sosyal
              Bilgiler derslerinde oyunlaştırılmış öğrenme deneyimi.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#042940] px-8 text-base font-bold text-white shadow-lg hover:bg-[#042940]/90"
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
                className="border-[#042940]/20 px-8 text-base font-semibold text-[#042940] hover:bg-[#042940]/5"
              >
                <Link href="#nasil-calisir">Nasıl Çalışır?</Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-10 flex items-center justify-center gap-3"
            >
              <div className="flex -space-x-2">
                {[44, 68, 47, 59].map((imgId) => (
                  <img
                    key={imgId}
                    src={`https://i.pravatar.cc/40?img=${imgId}`}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-[#6B7280]">
                <span className="font-bold text-[#042940]">3,200+</span>{" "}
                aile güveniyor
              </span>
            </motion.div>

            {/* Subject cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-14 grid gap-5 sm:grid-cols-3"
            >
              {subjectCards.map((card, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="mb-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                      1-8. Sınıf
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 2: HOW IT WORKS ===== */}
        <section id="nasil-calisir" className="relative bg-[#F5F0EB] py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-[#042940] md:text-4xl"
              >
                Nasıl Çalışır?
              </motion.h2>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#005C53]/10">
                    <step.icon className="h-8 w-8 text-[#005C53]" />
                  </div>
                  <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#042940] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-[#042940]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6B7280]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: WHY LUMO ===== */}
        <section className="relative bg-white py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-[#042940] md:text-4xl"
              >
                Neden LUMO?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-[#6B7280]"
              >
                Çocuğunuzun gelişimini destekleyen güçlü özellikler
              </motion.p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col items-center rounded-2xl border border-[#D6D58E]/30 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#005C53]/10 transition-colors duration-300 group-hover:bg-[#005C53]/15">
                    <feature.icon className="h-7 w-7 text-[#005C53]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#042940]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: SUBJECTS ===== */}
        <section className="relative bg-[#FAF8F5] py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-[#042940] md:text-4xl"
              >
                Ders Bazlı Öğrenme
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-[#6B7280]"
              >
                Her ders için müfredata uygun oyunlar
              </motion.p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {[
                {
                  title: "Matematik",
                  icon: Calculator,
                  description: "Sayılar, işlemler, geometri ve daha fazlası",
                  image:
                    "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&h=400&fit=crop",
                },
                {
                  title: "Fen Bilimleri",
                  icon: Microscope,
                  description: "Canlılar, madde, fiziksel olaylar",
                  image:
                    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
                },
                {
                  title: "Sosyal Bilgiler",
                  icon: Globe,
                  description: "Tarih, coğrafya, vatandaşlık",
                  image:
                    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=600&h=400&fit=crop",
                },
              ].map((subject, index) => (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group overflow-hidden rounded-2xl border border-[#D6D58E]/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={subject.image}
                      alt={subject.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#042940] backdrop-blur-sm">
                        1-8. Sınıf
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <subject.icon className="h-5 w-5 text-[#005C53]" />
                      <h3 className="text-lg font-bold text-[#042940]">
                        {subject.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      {subject.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 5: TESTIMONIALS ===== */}
        <section className="relative bg-white py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-[#042940] md:text-4xl"
              >
                Aileler Ne Diyor?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-[#6B7280]"
              >
                LUMO kullanan ailelerden geri bildirimler
              </motion.p>
            </div>

            <TestimonialCarousel
              testimonials={testimonials}
              className="mx-auto max-w-2xl"
            />
          </div>
        </section>

        {/* ===== SECTION 6: FOR TEACHERS ===== */}
        <section id="ogretmenler" className="relative bg-[#042940] py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-white md:text-4xl"
              >
                Öğretmenler İçin Ücretsiz
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-white/60"
              >
                Sınıfınızı oluşturun, öğrenci ilerlemesini takip edin
              </motion.p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {teacherFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                >
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 text-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#DBF227] px-8 text-base font-bold text-[#042940] shadow-lg hover:bg-[#DBF227]/90"
              >
                <Link href="/register?role=teacher">
                  Öğretmen Olarak Kaydol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 7: TRUST & SAFETY ===== */}
        <section id="veliler" className="relative bg-white py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#005C53]/10"
                >
                  <Shield className="h-10 w-10 text-[#005C53]" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-extrabold text-[#042940] md:text-4xl"
                >
                  Ebeveynler İçin Güvenli
                </motion.h2>
              </div>

              <div className="mt-10 space-y-3">
                {trustPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-center gap-3 rounded-xl border border-[#D6D58E]/30 bg-white p-4 transition-shadow hover:shadow-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9FC131]" />
                    <span className="font-medium text-[#042940]">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 8: PRICING TEASER ===== */}
        <section id="fiyatlandirma" className="relative bg-[#FAF8F5] py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-[#042940] md:text-4xl"
              >
                Basit ve Şeffaf Fiyatlandırma
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-[#6B7280]"
              >
                İlk hafta ücretsiz. Kredi kartı gerekmez.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-sm"
            >
              <div className="rounded-2xl border border-[#D6D58E]/30 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#005C53]">
                  Aylık Plan
                </p>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-[#042940]">
                    --
                  </span>
                  <span className="text-lg text-[#6B7280]">/ay</span>
                </div>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Tüm dersler ve oyunlara sınırsız erişim
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-6 w-full bg-[#042940] text-base font-bold text-white shadow-lg hover:bg-[#042940]/90"
                >
                  <Link href="/register">
                    Ücretsiz Dene
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 9: FINAL CTA ===== */}
        <section className="relative bg-[#042940] py-20 md:py-28">
          <div className="container text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold text-white md:text-4xl"
            >
              Öğrenme Macerasına Hazır mısın?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-white/60"
            >
              Hemen kayıt ol, ilk haftanı ücretsiz kullan.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#DBF227] px-10 text-base font-bold text-[#042940] shadow-lg hover:bg-[#DBF227]/90"
              >
                <Link href="/register">
                  Ücretsiz Başla
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
