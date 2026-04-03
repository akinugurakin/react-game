"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  GraduationCap,
  Gamepad2,
  Shield,
  Heart,
  Target,
  Users,
  Mail,
  ArrowRight,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackgroundSymbols } from "@/components/ui/background-symbols";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  VERİ                                                               */
/* ------------------------------------------------------------------ */

const MISSION_ITEMS = [
  {
    icon: GraduationCap,
    title: "MEB Müfredatına Uygun",
    description:
      "Tüm oyunlarımız Milli Eğitim Bakanlığı müfredatıyla uyumlu olarak tasarlanmıştır.",
  },
  {
    icon: Gamepad2,
    title: "Oyunla Öğrenme",
    description:
      "Çocuklar oyun oynarken farkında olmadan öğrenir. Eğlence ve eğitim bir arada.",
  },
  {
    icon: Shield,
    title: "Güvenli Ortam",
    description:
      "Reklamsız, çocuk dostu arayüz. Kişisel veriler KVKK uyumlu şekilde korunur.",
  },
  {
    icon: BarChart3,
    title: "İlerleme Takibi",
    description:
      "Öğrenciler ve öğretmenler, detaylı raporlarla gelişimi takip edebilir.",
  },
];

const STATS = [
  { value: "5+", label: "Ders Kategorisi" },
  { value: "20+", label: "Eğitsel Oyun" },
  { value: "3-8", label: "Sınıf Düzeyi" },
  { value: "7/24", label: "Erişim" },
];

const VALUES = [
  {
    icon: Heart,
    title: "Çocuk Odaklı",
    description:
      "Her kararımızda çocukların güvenliği, mutluluğu ve gelişimi ön plandadır.",
  },
  {
    icon: Target,
    title: "Erişilebilirlik",
    description:
      "Her çocuğun kaliteli eğitim içeriklerine ulaşabilmesi gerektiğine inanıyoruz.",
  },
  {
    icon: Lightbulb,
    title: "Sürekli Gelişim",
    description:
      "Eğitim bilimi ve teknolojideki gelişmeleri yakından takip ederek platformumuzu sürekli güncelliyoruz.",
  },
  {
    icon: Users,
    title: "Topluluk",
    description:
      "Öğretmenler, aileler ve öğrencilerden oluşan güçlü bir öğrenme topluluğu inşa ediyoruz.",
  },
];


/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const [akinExpanded, setAkinExpanded] = useState(false);
  const [gulerExpanded, setGulerExpanded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F4EF]">
      <BackgroundSymbols />
      <Header />
      <main className="relative z-10">
        {/* Hero */}
        <section className="container py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#005C53]/10">
              <Lightbulb className="h-8 w-8 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Eğitimi <span className="rounded-lg bg-[#DBF227] px-3 py-0.5">Eğlenceli</span> Hale Getiriyoruz
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              LUMO, Türkiye'deki ilkokul ve ortaokul öğrencileri için MEB müfredatına uygun,
              oyunlaştırılmış bir öğrenme platformudur.
            </p>
          </motion.div>
        </section>

        {/* İstatistikler */}
        <section className="container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-extrabold text-[#005C53]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-[#042940]/50">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </section>

        {/* Misyon */}
        <section className="container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <h2 className="mb-2 text-center text-2xl font-extrabold text-[#042940]">
              Neden <span className="rounded-lg bg-[#DBF227] px-2 py-0.5">LUMO</span>?
            </h2>
            <p className="mb-8 text-center text-sm text-[#042940]/50">
              Platformumuzun temel özellikleri
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MISSION_ITEMS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                >
                  <Card className="h-full border-0 shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#005C53]/10">
                        <item.icon className="h-6 w-6 text-[#005C53]" />
                      </div>
                      <h3 className="mb-2 text-base font-bold text-[#042940]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#042940]/50">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Değerlerimiz */}
        <section className="bg-[#042940]/[0.02] py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="mb-2 text-center text-2xl font-extrabold text-[#042940]">
                Değerlerimiz
              </h2>
              <p className="mb-8 text-center text-sm text-[#042940]/50">
                Bizi yönlendiren temel ilkeler
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {VALUES.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.08 }}
                    className="text-center"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <item.icon className="h-6 w-6 text-[#005C53]" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-[#042940]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#042940]/50">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Biz Kimiz */}
        <section className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="mb-2 text-center text-2xl font-extrabold text-[#042940]">
              Biz Kimiz?
            </h2>
            <p className="mb-10 text-center text-sm text-[#042940]/50">
              LUMO'nun arkasındaki ekip
            </p>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 items-start">
              {/* Kurucu 1 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-[#005C53]/10 bg-[#042940]/5 shadow-md">
                  {/* Fotoğraf buraya gelecek */}
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#005C53]/30">
                    AA
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#042940]">Akın Uğur Akın</h3>
                <p className="mt-1 text-sm font-medium text-[#005C53]">Matematik Öğretmeni · Eğitim Danışmanı</p>
                <p className="mt-2 max-w-[420px] text-sm leading-relaxed text-[#042940]/50">
                  Boğaziçi Üniversitesi'nde makine mühendisliği bölümünde başladığı lisans eğitimini İlköğretim Matematik Öğretmenliği bölümünden mezun olarak tamamladı.{akinExpanded ? " Yüksek lisans eğitiminde yine aynı üniversitede öğretmen farkındalığı ve matematiksel düşünme üzerine çalıştı. Ayrıca MEB müfredatını felsefi, tarihi, psikolojik ve sosyolojik açıdan derinlemesine incelemiş ve hâkim olduğu ulusal ve uluslararası müfredatlarla (Finlandiya, AP, IB, A Level ve GCSE) karşılaştırmalı analizlerini yapmıştır. Bugün hâlâ matematik öğretmeni olarak ilkokul seviyesinden üniversite seviyesine kadar matematik dersleri vermektedir." : ".."}
                  {" "}
                  <button
                    onClick={() => setAkinExpanded(!akinExpanded)}
                    className="inline text-[#005C53] font-medium hover:underline"
                  >
                    {akinExpanded ? <span className="text-2xl leading-none">‹</span> : "devamını oku"}
                  </button>
                </p>
              </motion.div>

              {/* Kurucu 2 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-[#005C53]/10 bg-[#042940]/5 shadow-md">
                  {/* Fotoğraf buraya gelecek */}
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#005C53]/30">
                    GA
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#042940]">Güler Ardıç</h3>
                <p className="mt-1 text-sm font-medium text-[#005C53]">Dilbilim Mühendisi · Yapay Zeka Uzmanı</p>
                <p className="mt-2 max-w-[420px] text-sm leading-relaxed text-[#042940]/50">
                  Kanada'da Meta bünyesinde Dilbilim Mühendisi ve Yapay Zeka Uzmanı olarak çalışmaktadır.{gulerExpanded ? " Detaylı biyografi bilgisi eklenecektir." : ".."}
                  {" "}
                  <button
                    onClick={() => setGulerExpanded(!gulerExpanded)}
                    className="inline text-[#005C53] font-medium hover:underline"
                  >
                    {gulerExpanded ? <span className="text-2xl leading-none">‹</span> : "devamını oku"}
                  </button>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* İletişim CTA */}
        <section className="container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="overflow-hidden border-0 bg-gradient-to-r from-[#042940] to-[#005C53] shadow-lg">
              <CardContent className="flex flex-col items-center gap-6 p-10 text-center sm:flex-row sm:text-left">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <Mail className="h-8 w-8 text-white/80" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold text-white">
                    Sorularınız mı var?
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    Bizimle iletişime geçin. Size en kısa sürede dönüş yapalım.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#DBF227] text-[#042940] hover:bg-[#DBF227]/90 font-bold"
                >
                  <a href="mailto:iletisim@lumo.com.tr">
                    Bize Yazın
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
