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
  Sparkles,
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
    name: "Ay\u015fe Y\u0131lmaz",
    avatar: "https://i.pravatar.cc/150?img=44",
    description:
      "K\u0131z\u0131m bu platformu \u00e7ok seviyor! Matematik oyunuyla \u00e7arp\u0131m tablosunu \u00f6\u011frenmesi \u00e7ok kolayla\u015ft\u0131. Her g\u00fcn oynamak istiyor.",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    avatar: "https://i.pravatar.cc/150?img=68",
    description:
      "O\u011flum i\u00e7in g\u00fcvenli bir e\u011fitim ortam\u0131 ar\u0131yordum. React Game tam arad\u0131\u011f\u0131m \u015fey oldu. Ebeveyn kontrol\u00fc harika.",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    avatar: "https://i.pravatar.cc/150?img=47",
    description:
      "\u00d6\u011fretmen olarak s\u0131n\u0131f\u0131mda kullan\u0131yorum. \u00c7ocuklar liderlik tablosunda yar\u0131\u015fmay\u0131 \u00e7ok seviyor, motivasyonlar\u0131 artt\u0131!",
  },
  {
    id: 4,
    name: "Ali \u00d6zt\u00fcrk",
    avatar: "https://i.pravatar.cc/150?img=59",
    description:
      "\u0130ki \u00e7ocu\u011fum da bu platformda oynuyor. Ekran ba\u015f\u0131nda ge\u00e7irdikleri s\u00fcrenin verimli oldu\u011funu bilmek beni mutlu ediyor.",
  },
  {
    id: 5,
    name: "Fatma Arslan",
    avatar: "https://i.pravatar.cc/150?img=45",
    description:
      "Reklams\u0131z ve g\u00fcvenli bir ortam. \u00c7ocu\u011fumun verilerinin korundu\u011funu bilmek \u00e7ok de\u011ferli. Kesinlikle tavsiye ediyorum.",
  },
];

const gameCards = [
  {
    title: "Matematik Yar\u0131\u015fmas\u0131",
    category: "Matematik",
    image:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=500&fit=crop",
  },
  {
    title: "Kelime Av\u0131",
    category: "Kelime",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop",
  },
  {
    title: "Haf\u0131za Kartlar\u0131",
    category: "Haf\u0131za",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=500&fit=crop",
  },
  {
    title: "Bulmaca D\u00fcnyas\u0131",
    category: "Bulmaca",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=500&fit=crop",
  },
  {
    title: "Say\u0131lar Oyunu",
    category: "Matematik",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=500&fit=crop",
  },
];

const features = [
  {
    icon: Brain,
    title: "E\u011fitici Oyunlar",
    description:
      "Matematik, kelime ve haf\u0131za oyunlar\u0131yla e\u011flenerek \u00f6\u011frenme deneyimi.",
  },
  {
    icon: Trophy,
    title: "Liderlik Tablosu",
    description:
      "Haftal\u0131k ve t\u00fcm zamanlar s\u0131ralamalar\u0131yla motivasyonu art\u0131r.",
  },
  {
    icon: BarChart3,
    title: "\u0130lerleme Takibi",
    description:
      "\u00c7ocu\u011funuzun geli\u015fimini detayl\u0131 istatistiklerle takip edin.",
  },
  {
    icon: Shield,
    title: "G\u00fcvenli Ortam",
    description:
      "Ebeveyn kontrol\u00fc ve ya\u015fa uygun i\u00e7eriklerle g\u00fcvenli bir platform.",
  },
];

const trustPoints = [
  "Ya\u015fa uygun, pedagojik a\u00e7\u0131dan onaylanm\u0131\u015f i\u00e7erikler",
  "13 ya\u015f alt\u0131 i\u00e7in ebeveyn onay\u0131 zorunlulu\u011fu",
  "Ki\u015fisel veri g\u00fcvenli\u011fi ve KVKK uyumu",
  "Reklams\u0131z, dikkat da\u011f\u0131tmayan aray\u00fcz",
  "Oyun s\u00fcresi takibi ve ebeveyn bildirimleri",
];

const collageImages = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
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
        {/* ===== SECTION 1: HERO (PulseFitHero style) ===== */}
        <section className="relative overflow-hidden bg-[#FAF8F5]">
          {/* Subtle gradient overlay */}
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
                <Sparkles className="h-4 w-4" />
                {"6-12 ya\u015f aras\u0131 \u00e7ocuklar i\u00e7in"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-3xl text-center text-4xl font-extrabold leading-tight tracking-tight text-[#042940] md:text-5xl lg:text-6xl"
            >
              {"E\u011flenerek \u00d6\u011frenmenin "}
              <span className="text-[#005C53]">{"En G\u00fczel Yolu"}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mx-auto mt-6 max-w-2xl text-center text-lg text-[#6B7280]"
            >
              {"E\u011fitici mini oyunlarla \u00e7ocu\u011funuzun matematik, dil ve problem \u00e7\u00f6zme becerilerini geli\u015ftirin. G\u00fcvenli, reklams\u0131z ve e\u011fitim odakl\u0131 bir platform."}
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
                  {"\u00dccretsiz Ba\u015fla"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#042940]/20 px-8 text-base font-semibold text-[#042940] hover:bg-[#042940]/5"
              >
                <Link href="#features">{"Oyunlar\u0131 Ke\u015ffet"}</Link>
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
                {"aile g\u00fcveniyor"}
              </span>
            </motion.div>

            {/* Horizontal scrolling game cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-14 flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
            >
              {gameCards.map((card, index) => (
                <div
                  key={index}
                  className="group relative min-w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-60 w-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="mb-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                      {card.category}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 2: HOW IT WORKS (FeatureHighlight style) ===== */}
        <section className="relative bg-[#F5F0EB] py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-3 inline-block rounded-full bg-[#005C53]/10 px-4 py-1 text-sm font-semibold text-[#005C53]"
              >
                {"Kolay Ba\u015flang\u0131\u00e7"}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-[#042940] md:text-4xl"
              >
                {"Her \u015eey \u00c7ok Kolay"}
              </motion.h2>

              <div className="mt-8 space-y-5">
                {[
                  "Kay\u0131t ol \uD83D\uDCDD ve hemen ba\u015fla.",
                  "Oyun se\u00e7 \uD83C\uDFAE ya\u015f\u0131na uygun.",
                  "\u00d6\u011fren \uD83E\uDDE0 ve liderlik tablosunda y\u00fcksel \uD83C\uDFC6",
                  "\u0130lerleme raporlar\u0131n\u0131 takip et \uD83D\uDCCA her an.",
                  "G\u00fcvenli ortamda \uD83D\uDD12 reklams\u0131z oyna.",
                ].map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-lg leading-relaxed text-[#042940]/75"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: STATS + IMAGES (HeroSection9 style) ===== */}
        <section className="relative overflow-hidden bg-white py-20 md:py-28">
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-20 h-24 w-24 rounded-full bg-[#9FC131]/10" />
            <div className="absolute bottom-16 right-20 h-32 w-32 rounded-3xl bg-[#005C53]/5 rotate-12" />
            <div className="absolute right-1/3 top-10 h-16 w-16 rounded-full bg-[#DBF227]/15" />
          </div>

          <div className="container relative">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left -- text + stats */}
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-3 inline-block rounded-full bg-[#005C53]/10 px-4 py-1 text-sm font-semibold text-[#005C53]"
                >
                  Rakamlarla Biz
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-extrabold text-[#042940] md:text-4xl"
                >
                  {"Binlerce \u00c7ocuk E\u011flenerek \u00d6\u011freniyor"}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-lg text-[#6B7280]"
                >
                  {"Platformumuz her g\u00fcn b\u00fcy\u00fcyor. Aileler ve \u00e7ocuklar i\u00e7in g\u00fcvenli bir \u00f6\u011frenme alan\u0131 sunuyoruz."}
                </motion.p>

                <div className="mt-10 grid grid-cols-3 gap-6">
                  {[
                    { value: "3.2K+", label: "Aktif Oyuncu" },
                    { value: "4", label: "E\u011fitici Oyun" },
                    { value: "50K+", label: "Oynanan Oyun" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    >
                      <p className="text-3xl font-extrabold text-[#005C53]">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-[#6B7280]">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right -- image collage */}
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="col-span-2 overflow-hidden rounded-2xl shadow-lg"
                  >
                    <img
                      src={collageImages[0]}
                      alt={"\u00c7ocuklar \u00f6\u011freniyor"}
                      className="h-48 w-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="overflow-hidden rounded-2xl shadow-lg"
                  >
                    <img
                      src={collageImages[1]}
                      alt={"E\u011fitim"}
                      className="h-40 w-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="overflow-hidden rounded-2xl shadow-lg"
                  >
                    <img
                      src={collageImages[2]}
                      alt={"\u00c7ocuklar"}
                      className="h-40 w-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Floating decorative shapes */}
                <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-[#9FC131]/20" />
                <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-2xl bg-[#DBF227]/25 rotate-12" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: FEATURES ===== */}
        <section id="features" className="relative bg-white py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-3 inline-block rounded-full bg-[#005C53]/10 px-4 py-1 text-sm font-semibold text-[#005C53]"
              >
                {"\u00d6zellikler"}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-[#042940] md:text-4xl"
              >
                Neden React Game?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-[#6B7280]"
              >
                {"\u00c7ocu\u011funuzun geli\u015fimini destekleyen g\u00fc\u00e7l\u00fc \u00f6zellikler"}
              </motion.p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col items-center rounded-2xl border border-[#D6D58E]/30 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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

        {/* ===== SECTION 5: TESTIMONIALS ===== */}
        <section className="relative bg-[#F5F0EB] py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-3 inline-block rounded-full bg-[#005C53]/10 px-4 py-1 text-sm font-semibold text-[#005C53]"
              >
                {"Kullan\u0131c\u0131 Yorumlar\u0131"}
              </motion.span>
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
                Platformumuzu kullanan ailelerden geri bildirimler
              </motion.p>
            </div>

            <TestimonialCarousel
              testimonials={testimonials}
              className="mx-auto max-w-2xl"
            />
          </div>
        </section>

        {/* ===== SECTION 6: TRUST / SAFETY ===== */}
        <section className="relative bg-white py-20 md:py-28">
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
                  {"Ebeveynler \u0130\u00e7in G\u00fcvenli"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-lg text-[#6B7280]"
                >
                  {"\u00c7ocu\u011funuzun g\u00fcvenli\u011fi bizim \u00f6nceli\u011fimiz"}
                </motion.p>
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

        {/* ===== SECTION 7: FINAL CTA ===== */}
        <section className="relative bg-[#042940] py-20 md:py-28">
          <div className="container text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold text-white md:text-4xl"
            >
              {"Hemen Ba\u015fla"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-white/60"
            >
              {"\u00c7ocu\u011funuzun e\u011fitim yolculu\u011funa bug\u00fcn ba\u015flay\u0131n."}
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
                  {"\u00dccretsiz Kay\u0131t Ol"}
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
