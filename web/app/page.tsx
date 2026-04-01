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
  SpellCheck,
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
/*  #9FC131 - Yeşil (brand-green)                                 */
/*  #DBF227 - Lime (brand-lime)                                        */
/*  #D6D58E - Kum (brand-sand)                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  VERİ                                                          */
/* ------------------------------------------------------------------ */

const adimlar = [
  {
    no: 1,
    icon: GraduationCap,
    baslik: "Sınıfını Seç",
    aciklama: "1–8. sınıf arasında çocuğunun seviyesini belirle",
    renk: "bg-[#005C53]",
  },
  {
    no: 2,
    icon: Gamepad2,
    baslik: "Oyun Oyna",
    aciklama: "MEB müfredatina uygun oyunlarla eğlenerek öğren",
    renk: "bg-[#9FC131]",
  },
  {
    no: 3,
    icon: Trophy,
    baslik: "İlerlemeni Takip Et",
    aciklama: "Rozet kazan, seviye atla, liderlik tablosunda yüksel",
    renk: "bg-[#042940]",
  },
];

const oneCikanOyunlar = [
  {
    baslik: "Matematik Yarışması",
    aciklama: "Toplama, çıkarma, çarpma ve bölme ile hızını test et.",
    icon: Calculator,
    renk: "bg-[#005C53]",
    kategori: "Matematik",
    yas: "6–12 yaş",
    oyuncu: 1245,
    sure: "3–5 dk",
  },
  {
    baslik: "Kelime Avı",
    aciklama: "Karışık harflerden anlamlı kelimeler oluştur.",
    icon: BookOpen,
    renk: "bg-[#9FC131]",
    kategori: "Dil",
    yas: "7–12 yaş",
    oyuncu: 890,
    sure: "4–6 dk",
  },
  {
    baslik: "Hafıza Kartları",
    aciklama: "Kartları çevir ve eşleşen çiftleri bul.",
    icon: Brain,
    renk: "bg-[#042940]",
    kategori: "Hafıza",
    yas: "6–10 yaş",
    oyuncu: 1100,
    sure: "3–4 dk",
  },
  {
    baslik: "Bulmaca Dünyası",
    aciklama: "Geometrik şekilleri doğru yere yerleştir.",
    icon: Puzzle,
    renk: "bg-[#DBF227]",
    kategori: "Mantık",
    yas: "6–12 yaş",
    oyuncu: 670,
    sure: "5–8 dk",
  },
];

const ozellikler = [
  {
    icon: Brain,
    baslik: "MEB Müfredatına Uygun",
    aciklama: "Tüm oyunlar müfredat kazanımlarına bağlı olarak tasarlanmıştır.",
    renk: "bg-[#005C53]",
  },
  {
    icon: Trophy,
    baslik: "Oyunlaştırılmış Öğrenme",
    aciklama: "Rozet, puan ve liderlik tablosuyla sürdürülebilir motivasyon.",
    renk: "bg-[#9FC131]",
  },
  {
    icon: BarChart3,
    baslik: "Ölçülebilir İlerleme",
    aciklama: "Ders bazlı ilerleme takibi ve detaylı analiz paneli.",
    renk: "bg-[#042940]",
  },
  {
    icon: Shield,
    baslik: "Güvenli ve Reklamsız",
    aciklama: "Ebeveyn kontrolü, KVKK uyumlu, tamamen reklamsız.",
    renk: "bg-[#DBF227]",
  },
];

const yorumlar = [
  {
    isim: "Ayşe Yılmaz",
    rol: "Veli",
    avatar: "https://i.pravatar.cc/150?img=44",
    yorum: "Kızım LUMO sayesinde matematik dersinde çok ilerledi. Müfredata uygun olması beni çok rahatlattı.",
  },
  {
    isim: "Mehmet Kaya",
    rol: "Veli",
    avatar: "https://i.pravatar.cc/150?img=68",
    yorum: "Oğlum için güvenli bir eğitim ortamı arıyordum. LUMO tam aradığım şey oldu.",
  },
  {
    isim: "Zeynep Demir",
    rol: "Öğretmen",
    avatar: "https://i.pravatar.cc/150?img=47",
    yorum: "Sınıfımda LUMO kullanıyorum. Çocuklar müfredata uygun oyunlarla öğrenirken motivasyonları arttı!",
  },
];

const guvenlikMaddeleri = [
  "MEB müfredatına uygun, pedagojik açıdan onaylanmış içerikler",
  "KVKK uyumlu veri güvenliği ve çocuk gizliliği",
  "Tamamen reklamsız, dikkat dağıtıcı içerik yok",
  "Ebeveyn kontrol paneli ile süre ve içerik yönetimi",
  "13 yaş altı için ebeveyn onayı zorunluluğu",
];

/* ------------------------------------------------------------------ */
/*  ANİMASYON                                                     */
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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#F5F4EF]">
      <BackgroundSymbols />
      <Header />

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pb-14 pt-16 md:pb-20 md:pt-20">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#DBF227]/20 px-5 py-2"
              >
                <Sparkles className="h-4 w-4 text-[#9FC131]" />
                <span className="text-sm font-semibold text-[#042940]">
                  MEB Müfredatına %100 Uygun
                </span>
              </motion.div>

              {/* Ana başlık — kelime kelime blur-in */}
              <motion.h1
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative text-4xl font-extrabold leading-[1.2] tracking-tight text-[#042940] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block"
                >
                  Öğrenmenin En
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="inline-block rounded-lg bg-[#DBF227] px-5 py-1"
                >
                  Eğlenceli
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="inline-block ml-3"
                >
                  Hali
                </motion.span>
              </motion.h1>

              {/* Alt yazı */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#042940]/60"
              >
                Çocuğunuz eğlenceli oyunlarla dersleri pekiştirsin.
                Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler
                ve İngilizce &#8212; hepsi bir arada.
              </motion.p>

              {/* Ders etiketleri */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="mt-10 flex flex-wrap justify-center gap-6"
              >
                {[
                  { icon: BookOpen, label: "Türkçe" },
                  { icon: Calculator, label: "Matematik" },
                  { icon: FlaskConical, label: "Fen Bilimleri" },
                  { icon: Globe, label: "Sosyal Bilgiler" },
                  { icon: SpellCheck, label: "İngilizce" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.4 + index * 0.12,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                    className="flex items-center gap-2 px-4"
                  >
                    <item.icon className="h-5 w-5 text-[#005C53]" />
                    <span className="text-sm font-semibold text-[#042940]">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA butonları */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.6, type: "spring", stiffness: 100, damping: 10 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#005C53] px-10 py-6 text-lg font-bold text-white shadow-lg hover:bg-[#005C53]/90"
                >
                  <Link href="/games">
                    Ücretsiz Oyunlar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#042940]/20 px-8 py-6 text-lg font-semibold text-[#042940] hover:bg-[#042940]/5"
                >
                  <Link href="#nasil-calisir">Nasıl Çalışır?</Link>
                </Button>
              </motion.div>

              {/* Sosyal kanıt */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="mt-12 flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-10 w-10 rounded-full border-2 border-[#F5F4EF] object-cover"
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
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  NASIL ÇALIŞIR                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="nasil-calisir" className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                Nasıl Çalışır?
              </h2>
              <p className="mt-2 text-[#042940]/50">
                Oyun oyna, öğren, ilerle. Bu kadar basit!
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
        {/*  POPÜLER OYUNLAR — ss38 kart yapısı    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
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
                  Popüler Oyunlar
                </h2>
                <p className="mt-2 text-[#042940]/50">
                  Eğitici oyunlarla eğlenerek öğren
                </p>
              </div>
              <Button asChild variant="outline" className="hidden border-[#042940]/20 text-[#042940] hover:bg-[#042940]/5 md:flex">
                <Link href="/register">
                  Tümünü Gör
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
                  Tümünü Gör
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
                LUMO&apos;yu Özel Yapan Ne?
              </h2>
              <p className="mt-2 text-white/50">
                Eğitimi eğlenceli, ölçülebilir ve güvenli hale getiriyoruz
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
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                Ders Bazlı Öğrenme
              </h2>
              <p className="mt-2 text-[#042940]/50">
                Her ders için özel olarak tasarlanmış eğitsel oyunlar
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {[
                { baslik: "Türkçe", icon: BookOpen, aciklama: "Kelime, dilbilgisi ve yazım oyunları", renk: "bg-[#005C53]", oyun: 4 },
                { baslik: "Matematik", icon: Calculator, aciklama: "Sayılar, işlemler, geometri ve daha fazlası", renk: "bg-[#9FC131]", oyun: 3 },
                { baslik: "Fen Bilimleri", icon: FlaskConical, aciklama: "Canlılar, madde, fiziksel olaylar", renk: "bg-[#042940]", oyun: 3 },
                { baslik: "Sosyal Bilgiler", icon: Globe, aciklama: "Tarih, coğrafya, vatandaşlık", renk: "bg-[#005C53]", oyun: 3 },
                { baslik: "İngilizce", icon: SpellCheck, aciklama: "Kelime, dilbilgisi ve dinleme", renk: "bg-[#9FC131]", oyun: 3 },
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
        {/*  YORUMLAR                                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
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
                    &ldquo;Oyun oyna, öğren &#8212;
                    <br />
                    eğitim az önce eğlenceli oldu.&rdquo;
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#DBF227] px-8 text-base font-bold text-[#042940] hover:bg-[#DBF227]/90"
                  >
                    <Link href="/register">
                      Hemen Başla
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  ÖĞRETMENLER                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid items-center gap-10 md:grid-cols-2">
              {/* Sol — Mock dashboard */}
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
                          5-A Sınıfı
                        </span>
                        <span className="text-xs text-[#042940]/40">
                          28 öğrenci
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#042940]">
                        Ortalama İlerleme
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

              {/* Sağ — Metin */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                  Öğretmenler İçin Ücretsiz
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[#042940]/50">
                  Sınıfınızı oluşturun, öğrenci ilerlemesini kolayca takip
                  edin. LUMO öğretmenler için her zaman ücretsiz.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Sınıf oluşturma ve öğrenci ekleme",
                    "İlerleme analizi ve raporlama",
                    "Sınıf liderlik tablosu",
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
                    Öğretmen Olarak Kaydol
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  GÜVENLİK                                        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="pt-16 pb-8 md:pt-20 md:pb-10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-extrabold text-[#042940] md:text-4xl">
                Güvenlik ve Gizlilik
              </h2>
              <p className="mt-2 text-[#042940]/50">
                Çocuğunuzun güvenliği bizim önceliğimiz
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
        {/*  ÜCRETSİZ DENEME CTA                            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="pt-4 pb-16 md:pt-6 md:pb-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-xl text-center"
            >
              <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-2xl bg-[#DBF227]/20" style={{ width: 72, height: 72 }}>
                <Sparkles className="h-10 w-10 text-[#9FC131]" />
              </div>
              <h2 className="text-4xl font-extrabold text-[#042940] md:text-5xl">
                İlk Hafta Ücretsiz
              </h2>
              <p className="mt-4 text-xl text-[#042940]/50">
                Onayınız olmadan ödeme alınmaz.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-[#9FC131] px-12 py-7 text-lg font-bold text-white hover:bg-[#9FC131]/90"
              >
                <Link href="/register">
                  Hemen Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-5 text-base text-[#042940]/40">
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
