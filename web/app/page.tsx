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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { BackgroundSymbols } from "@/components/ui/background-symbols";

/* ------------------------------------------------------------------ */
/*  RENK PALETI                                                        */
/*  #042940 - Koyu lacivert (brand-dark)                               */
/*  #005C53 - Teal (brand-teal)                                        */
/*  #9FC131 - Ye\u015Fil (brand-green)                                 */
/*  #DBF227 - Lime (brand-lime)                                        */
/*  #D6D58E - Kum (brand-sand)                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  VER\u0130                                                          */
/* ------------------------------------------------------------------ */

const adimlar = [
  {
    no: 1,
    icon: GraduationCap,
    baslik: "S\u0131n\u0131f\u0131n\u0131 Se\u00e7",
    aciklama: "1\u20138. s\u0131n\u0131f aras\u0131nda \u00e7ocu\u011funun seviyesini belirle",
    renk: "bg-[#005C53]",
  },
  {
    no: 2,
    icon: Gamepad2,
    baslik: "Oyun Oyna",
    aciklama: "MEB m\u00fcfredatina uygun oyunlarla e\u011flenerek \u00f6\u011fren",
    renk: "bg-[#9FC131]",
  },
  {
    no: 3,
    icon: Trophy,
    baslik: "\u0130lerlemeni Takip Et",
    aciklama: "Rozet kazan, seviye atla, liderlik tablosunda y\u00fcksel",
    renk: "bg-[#042940]",
  },
];

const oneCikanOyunlar = [
  {
    baslik: "Matematik Yar\u0131\u015fmas\u0131",
    aciklama: "Toplama, \u00e7\u0131karma, \u00e7arpma ve b\u00f6lme ile h\u0131z\u0131n\u0131 test et.",
    icon: Calculator,
    renk: "bg-[#005C53]",
    kategori: "Matematik",
    yas: "6\u201312 ya\u015f",
    oyuncu: 1245,
    sure: "3\u20135 dk",
  },
  {
    baslik: "Kelime Av\u0131",
    aciklama: "Kar\u0131\u015f\u0131k harflerden anlaml\u0131 kelimeler olu\u015ftur.",
    icon: BookOpen,
    renk: "bg-[#9FC131]",
    kategori: "Dil",
    yas: "7\u201312 ya\u015f",
    oyuncu: 890,
    sure: "4\u20136 dk",
  },
  {
    baslik: "Haf\u0131za Kartlar\u0131",
    aciklama: "Kartlar\u0131 \u00e7evir ve e\u015fle\u015fen \u00e7iftleri bul.",
    icon: Brain,
    renk: "bg-[#042940]",
    kategori: "Haf\u0131za",
    yas: "6\u201310 ya\u015f",
    oyuncu: 1100,
    sure: "3\u20134 dk",
  },
  {
    baslik: "Bulmaca D\u00fcnyas\u0131",
    aciklama: "Geometrik \u015fekilleri do\u011fru yere yerle\u015ftir.",
    icon: Puzzle,
    renk: "bg-[#DBF227]",
    kategori: "Mant\u0131k",
    yas: "6\u201312 ya\u015f",
    oyuncu: 670,
    sure: "5\u20138 dk",
  },
];

const ozellikler = [
  {
    icon: Brain,
    baslik: "MEB M\u00fcfredat\u0131na Uygun",
    aciklama: "T\u00fcm oyunlar m\u00fcfredat kazan\u0131mlar\u0131na ba\u011fl\u0131 olarak tasarlanm\u0131\u015ft\u0131r.",
    renk: "bg-[#005C53]",
  },
  {
    icon: Trophy,
    baslik: "Oyunla\u015ft\u0131r\u0131lm\u0131\u015f \u00d6\u011frenme",
    aciklama: "Rozet, puan ve liderlik tablosuyla s\u00fcrd\u00fcr\u00fclebilir motivasyon.",
    renk: "bg-[#9FC131]",
  },
  {
    icon: BarChart3,
    baslik: "\u00d6l\u00e7\u00fclebilir \u0130lerleme",
    aciklama: "Ders bazl\u0131 ilerleme takibi ve detayl\u0131 analiz paneli.",
    renk: "bg-[#042940]",
  },
  {
    icon: Shield,
    baslik: "G\u00fcvenli ve Reklams\u0131z",
    aciklama: "Ebeveyn kontrol\u00fc, KVKK uyumlu, tamamen reklams\u0131z.",
    renk: "bg-[#DBF227]",
  },
];

const yorumlar = [
  {
    isim: "Ay\u015fe Y\u0131lmaz",
    rol: "Veli",
    avatar: "https://i.pravatar.cc/150?img=44",
    yorum: "K\u0131z\u0131m LUMO sayesinde matematik dersinde \u00e7ok ilerledi. M\u00fcfredata uygun olmas\u0131 beni \u00e7ok rahatlatt\u0131.",
  },
  {
    isim: "Mehmet Kaya",
    rol: "Veli",
    avatar: "https://i.pravatar.cc/150?img=68",
    yorum: "O\u011flum i\u00e7in g\u00fcvenli bir e\u011fitim ortam\u0131 ar\u0131yordum. LUMO tam arad\u0131\u011f\u0131m \u015fey oldu.",
  },
  {
    isim: "Zeynep Demir",
    rol: "\u00d6\u011fretmen",
    avatar: "https://i.pravatar.cc/150?img=47",
    yorum: "S\u0131n\u0131f\u0131mda LUMO kullan\u0131yorum. \u00c7ocuklar m\u00fcfredata uygun oyunlarla \u00f6\u011frenirken motivasyonlar\u0131 artt\u0131!",
  },
];

const guvenlikMaddeleri = [
  "MEB m\u00fcfredat\u0131na uygun, pedagojik a\u00e7\u0131dan onaylanm\u0131\u015f i\u00e7erikler",
  "KVKK uyumlu veri g\u00fcvenli\u011fi ve \u00e7ocuk gizlili\u011fi",
  "Tamamen reklams\u0131z, dikkat da\u011f\u0131t\u0131c\u0131 i\u00e7erik yok",
  "Ebeveyn kontrol paneli ile s\u00fcre ve i\u00e7erik y\u00f6netimi",
  "13 ya\u015f alt\u0131 i\u00e7in ebeveyn onay\u0131 zorunlulu\u011fu",
];

/* ------------------------------------------------------------------ */
/*  AN\u0130MASYON                                                     */
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
/*  SAYFA                                                              */
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
    <div className="relative flex min-h-screen flex-col bg-[#F5F4EF]">
      <BackgroundSymbols />
      <Header />

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Sol \u2014 Metin */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#DBF227]/20 px-4 py-1.5"
                >
                  <Sparkles className="h-4 w-4 text-[#9FC131]" />
                  <span className="text-sm font-semibold text-[#042940]">
                    MEB M&#252;fredat&#305;na %100 Uygun
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={0.05}
                  className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#042940] md:text-5xl lg:text-6xl"
                >
                  Oyun Oyna,
                  <br />
                  M&#252;fredat{" "}
                  <span className="inline-block rounded-full bg-[#DBF227] px-5 py-1">
                    &#214;&#287;ren!
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={0.15}
                  className="mt-6 max-w-lg text-lg leading-relaxed text-[#042940]/60"
                >
                  &#199;ocu&#287;unuz e&#287;lenceli oyunlarla dersleri peki&#351;tirsin.
                  Matematik, Fen Bilimleri ve Sosyal Bilgiler &#8212; hepsi bir
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
                    className="rounded-full bg-[#005C53] px-8 text-base font-bold text-white hover:bg-[#005C53]/90"
                  >
                    <Link href="/register">
                      &#220;cretsiz Dene
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-[#042940]/20 text-base font-semibold text-[#042940] hover:bg-[#042940]/5"
                  >
                    <Link href="#nasil-calisir">Nas&#305;l &#199;al&#305;&#351;&#305;r?</Link>
                  </Button>
                </motion.div>

                {/* Sosyal kan&#305;t */}
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
                        className="h-9 w-9 rounded-full border-2 border-[#F5F4EF] object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-[#DBF227] text-[#DBF227]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#042940]/50">
                      <span className="font-bold text-[#042940]">1.200+</span>{" "}
                      aile LUMO&apos;yu tercih ediyor
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Sa&#287; \u2014 Hero kart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto w-full max-w-md lg:max-w-none"
              >
                {/* Ana oyun kart&#305; \u2014 ss38 tarz&#305; */}
                <Card className="overflow-hidden border-0 shadow-xl">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex items-center justify-center bg-[#005C53] p-10 text-white sm:w-48">
                        <Gamepad2 className="h-20 w-20" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between bg-white p-6">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-[#F5F4EF] px-3 py-0.5 text-xs font-medium text-[#042940]">
                              Platform
                            </span>
                            <span className="text-xs text-[#042940]/40">
                              1&#8211;8. s&#305;n&#305;f
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-[#042940]">
                            LUMO E&#287;itsel Oyunlar
                          </h3>
                          <p className="mt-2 text-sm text-[#042940]/50">
                            MEB m&#252;fredat&#305;na uygun, oyunla&#351;t&#305;r&#305;lm&#305;&#351; &#246;&#287;renme platformu
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex gap-4 text-xs text-[#042940]/40">
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              1.200+ &#246;&#287;renci
                            </span>
                            <span className="flex items-center gap-1">
                              <Gamepad2 className="h-3.5 w-3.5" />
                              20+ oyun
                            </span>
                          </div>
                          <Button asChild size="sm" className="bg-[#005C53] text-white hover:bg-[#005C53]/90">
                            <Link href="/register">
                              <Play className="mr-1 h-4 w-4" /> Ba&#351;la
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Y&#252;zen mini kartlar */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -left-4 top-4 z-10"
                >
                  <Card className="border-0 bg-white shadow-lg">
                    <CardContent className="flex items-center gap-2 p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#005C53] text-white">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#042940]">Matematik</p>
                        <p className="text-[10px] text-[#042940]/40">12 oyun</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-4 bottom-20 z-10"
                >
                  <Card className="border-0 bg-white shadow-lg">
                    <CardContent className="flex items-center gap-2 p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9FC131] text-white">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#042940]">Rozet!</p>
                        <p className="text-[10px] text-[#042940]/40">Matematik Ustas&#305;</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  NASIL &#199;ALI&#350;IR                                   */}
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
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                Nas&#305;l &#199;al&#305;&#351;&#305;r?
              </h2>
              <p className="mt-2 text-[#042940]/50">
                Oyun oyna, &#246;&#287;ren, ilerle. Bu kadar basit!
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {adimlar.map((adim, index) => (
                <motion.div
                  key={adim.no}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden border-0 bg-white shadow-sm transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col">
                        <div className={`flex items-center justify-center ${adim.renk} p-8 text-white`}>
                          <adim.icon className="h-12 w-12" />
                        </div>
                        <div className="p-6">
                          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F4EF] text-sm font-bold text-[#042940]">
                            {adim.no}
                          </div>
                          <h3 className="text-lg font-bold text-[#042940]">
                            {adim.baslik}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-[#042940]/50">
                            {adim.aciklama}
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
        {/*  POP&#220;LER OYUNLAR \u2014 ss38 kart yap&#305;s&#305;    */}
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
                <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                  Pop&#252;ler Oyunlar
                </h2>
                <p className="mt-2 text-[#042940]/50">
                  E&#287;itici oyunlarla e&#287;lenerek &#246;&#287;ren
                </p>
              </div>
              <Button asChild variant="outline" className="hidden border-[#042940]/20 text-[#042940] hover:bg-[#042940]/5 md:flex">
                <Link href="/register">
                  T&#252;m&#252;n&#252; G&#246;r
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              {oneCikanOyunlar.map((oyun, index) => (
                <motion.div
                  key={oyun.baslik}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden border-0 bg-white shadow-sm transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className={`flex items-center justify-center ${oyun.renk} p-8 ${oyun.renk === "bg-[#DBF227]" ? "text-[#042940]" : "text-white"} sm:w-48`}>
                          <oyun.icon className="h-16 w-16" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between bg-white p-6">
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <span className="rounded-full bg-[#F5F4EF] px-3 py-0.5 text-xs font-medium text-[#042940]">
                                {oyun.kategori}
                              </span>
                              <span className="text-xs text-[#042940]/40">
                                {oyun.yas}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#042940]">
                              {oyun.baslik}
                            </h3>
                            <p className="mt-2 text-sm text-[#042940]/50">
                              {oyun.aciklama}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-4 text-xs text-[#042940]/40">
                              <span className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                {oyun.oyuncu.toLocaleString("tr-TR")} oyuncu
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {oyun.sure}
                              </span>
                            </div>
                            <Button asChild size="sm" className="bg-[#005C53] text-white hover:bg-[#005C53]/90">
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

            <div className="mt-6 text-center md:hidden">
              <Button asChild variant="outline" className="border-[#042940]/20 text-[#042940]">
                <Link href="/register">
                  T&#252;m&#252;n&#252; G&#246;r
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  NEDEN LUMO                                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#042940] py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                LUMO&apos;yu &#214;zel Yapan Ne?
              </h2>
              <p className="mt-2 text-white/50">
                E&#287;itimi e&#287;lenceli, &#246;l&#231;&#252;lebilir ve g&#252;venli hale getiriyoruz
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {ozellikler.map((oz, index) => (
                <motion.div
                  key={oz.baslik}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                    <CardContent className="p-0">
                      <div className="flex items-start">
                        <div className={`flex w-16 shrink-0 items-center justify-center self-stretch ${oz.renk}`}>
                          <oz.icon className={`h-6 w-6 ${oz.renk === "bg-[#DBF227]" ? "text-[#042940]" : "text-white"}`} />
                        </div>
                        <div className="p-5">
                          <h3 className="text-base font-bold text-white">
                            {oz.baslik}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-white/50">
                            {oz.aciklama}
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
        {/*  DERSLER                                                   */}
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
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                Ders Bazl&#305; &#214;&#287;renme
              </h2>
              <p className="mt-2 text-[#042940]/50">
                Her ders i&#231;in &#246;zel olarak tasarlanm&#305;&#351; e&#287;itsel oyunlar
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { baslik: "Matematik", icon: Calculator, aciklama: "Say\u0131lar, i\u015flemler, geometri ve daha fazlas\u0131", renk: "bg-[#005C53]", oyun: 12 },
                { baslik: "Fen Bilimleri", icon: FlaskConical, aciklama: "Canl\u0131lar, madde, fiziksel olaylar", renk: "bg-[#9FC131]", oyun: 8 },
                { baslik: "Sosyal Bilgiler", icon: Globe, aciklama: "Tarih, co\u011frafya, vatanda\u015fl\u0131k", renk: "bg-[#042940]", oyun: 6 },
              ].map((ders, index) => (
                <motion.div
                  key={ders.baslik}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden border-0 bg-white shadow-sm transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className={`flex items-center justify-center ${ders.renk} p-10 text-white`}>
                        <ders.icon className="h-14 w-14" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#042940]">
                          {ders.baslik}
                        </h3>
                        <p className="mt-2 text-sm text-[#042940]/50">
                          {ders.aciklama}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-[#042940]/40">
                            {ders.oyun} oyun
                          </span>
                          <Button asChild variant="outline" size="sm" className="border-[#042940]/20 text-[#042940] hover:bg-[#042940]/5">
                            <Link href="/register">
                              Ke&#351;fet
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
        {/*  YORUMLAR                                                  */}
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
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                Aileler Ne Diyor?
              </h2>
              <p className="mt-2 text-[#042940]/50">
                LUMO kullanan ailelerden geri bildirimler
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {yorumlar.map((y, index) => (
                <motion.div
                  key={y.isim}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 bg-white shadow-sm transition-shadow hover:shadow-lg">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-4 flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-[#DBF227] text-[#DBF227]"
                          />
                        ))}
                      </div>
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-[#042940]/60">
                        &ldquo;{y.yorum}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={y.avatar}
                          alt={y.isim}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#042940]">
                            {y.isim}
                          </p>
                          <p className="text-xs text-[#042940]/40">{y.rol}</p>
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
        {/*  ALINTI BANNERI                                            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-0 bg-[#005C53] shadow-xl">
                <CardContent className="flex flex-col items-center gap-6 p-10 text-center md:p-14">
                  <p className="text-2xl font-extrabold leading-snug text-white md:text-3xl">
                    &ldquo;Oyun oyna, &#246;&#287;ren &#8212;
                    <br />
                    e&#287;itim az &#246;nce e&#287;lenceli oldu.&rdquo;
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#DBF227] px-8 text-base font-bold text-[#042940] hover:bg-[#DBF227]/90"
                  >
                    <Link href="/register">
                      Hemen Ba&#351;la
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  &#214;&#286;RETMENLER                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid items-center gap-10 md:grid-cols-2">
              {/* Sol \u2014 Mock dashboard */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <Card className="overflow-hidden border-0 bg-white shadow-md">
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      <div className="flex w-14 shrink-0 items-center justify-center self-stretch bg-[#005C53]">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-1 items-center justify-between p-4">
                        <span className="text-sm font-bold text-[#042940]">
                          5-A S&#305;n&#305;f&#305;
                        </span>
                        <span className="text-xs text-[#042940]/40">
                          28 &#246;&#287;renci
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#042940]">
                        Ortalama &#304;lerleme
                      </span>
                      <span className="text-sm font-bold text-[#9FC131]">
                        %78
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#F5F4EF]">
                      <div className="h-full w-[78%] rounded-full bg-[#9FC131]" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#042940]">
                        Bu Hafta En Aktif
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
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sa&#287; \u2014 Metin */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                  &#214;&#287;retmenler &#304;&#231;in &#220;cretsiz
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[#042940]/50">
                  S&#305;n&#305;f&#305;n&#305;z&#305; olu&#351;turun, &#246;&#287;renci ilerlemesini kolayca takip
                  edin. LUMO &#246;&#287;retmenler i&#231;in her zaman &#252;cretsiz.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "S\u0131n\u0131f olu\u015fturma ve \u00f6\u011frenci ekleme",
                    "\u0130lerleme analizi ve raporlama",
                    "S\u0131n\u0131f liderlik tablosu",
                  ].map((madde) => (
                    <li key={madde} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9FC131]" />
                      <span className="text-sm font-medium text-[#042940]">
                        {madde}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 rounded-full bg-[#042940] px-8 text-base font-bold text-white hover:bg-[#042940]/90"
                >
                  <Link href="/register?role=teacher">
                    &#214;&#287;retmen Olarak Kaydol
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  G&#220;VENL&#304;K                                        */}
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
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                G&#252;venlik ve Gizlilik
              </h2>
              <p className="mt-2 text-[#042940]/50">
                &#199;ocu&#287;unuzun g&#252;venli&#287;i bizim &#246;nceli&#287;imiz
              </p>
            </motion.div>

            <div className="max-w-2xl space-y-3">
              {guvenlikMaddeleri.map((madde, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9FC131]/15">
                        <CheckCircle2 className="h-5 w-5 text-[#9FC131]" />
                      </div>
                      <span className="text-sm font-medium text-[#042940]">
                        {madde}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  &#220;CRETS&#304;Z DENEME CTA                            */}
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
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DBF227]/20">
                <Sparkles className="h-8 w-8 text-[#9FC131]" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                &#304;lk Hafta &#220;cretsiz
              </h2>
              <p className="mt-3 text-lg text-[#042940]/50">
                Kredi kart&#305; gerekmez. Hemen ba&#351;lay&#305;n.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-[#9FC131] px-10 text-base font-bold text-white hover:bg-[#9FC131]/90"
              >
                <Link href="/register">
                  Hemen Ba&#351;la
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-[#042940]/40">
                7 g&#252;n &#252;cretsiz deneme &middot; &#304;stedi&#287;in zaman iptal et
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
