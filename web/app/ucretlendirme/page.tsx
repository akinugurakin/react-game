"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Users,
  Heart,
  Crown,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackgroundSymbols } from "@/components/ui/background-symbols";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  VERİ                                                               */
/* ------------------------------------------------------------------ */

const PLANS = [
  {
    id: "monthly",
    name: "Aylık Plan",
    price: 450,
    period: "ay",
    description: "Esnek kullanım, istediğin zaman iptal et",
    features: [
      "Tüm derslere sınırsız erişim",
      "20+ eğitsel oyun",
      "İlerleme takibi ve raporlar",
      "Liderlik tablosu",
      "Rozet ve ödül sistemi",
      "Ebeveyn paneli",
    ],
    popular: false,
    icon: Sparkles,
    color: "from-[#005C53] to-[#005C53]/80",
  },
  {
    id: "yearly",
    name: "Yıllık Plan",
    price: 300,
    period: "ay",
    originalPrice: 450,
    description: "En avantajlı plan, %33 tasarruf",
    features: [
      "Aylık plandaki her şey",
      "Yıllık %33 indirim",
      "Öncelikli yeni oyun erişimi",
      "Aylık gelişim raporu",
      "Özel rozetler",
      "Öncelikli destek",
    ],
    popular: true,
    icon: Crown,
    color: "from-[#042940] to-[#005C53]",
  },
];

const SIBLING_DISCOUNTS = [
  { child: "1. Çocuk", discount: "Tam ücret", price: "300 ₺/ay" },
  { child: "2. Çocuk", discount: "%50 indirim", price: "150 ₺/ay" },
  { child: "3. Çocuk", discount: "%75 indirim", price: "75 ₺/ay" },
];

const SCHOLARSHIP_FEATURES = [
  "Tüm oyun ve içeriklere tam erişim",
  "Ebeveyn ve öğretmen onayı gerekli",
  "Gelir durumu belgelendirmesi",
  "3 aylık dönemler hâlinde değerlendirme",
  "Akademik ilerleme takibi",
];

const FAQ_ITEMS = [
  {
    q: "Ücretsiz deneme nasıl çalışır?",
    a: "7 gün boyunca tüm özelliklere sınırsız erişim sağlarsınız. Deneme süresi sonunda onayınız olmadan ücretlendirme yapılmaz.",
  },
  {
    q: "İstediğim zaman iptal edebilir miyim?",
    a: "Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal ettiğiniz dönemin sonuna kadar erişiminiz devam eder.",
  },
  {
    q: "Kardeş paketi nasıl eklenir?",
    a: "Hesap ayarlarından yeni profil ekleyerek kardeş paketinden yararlanabilirsiniz. İndirim otomatik olarak uygulanır.",
  },
  {
    q: "Burs başvurusu ne kadar sürer?",
    a: "Başvurular genellikle 5 iş günü içinde değerlendirilir. Sonuç e-posta ile bildirilir.",
  },
];

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function UcretlendirmePage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activePlan = billing === "yearly" ? PLANS[1] : PLANS[0];
  const inactivePlan = billing === "yearly" ? PLANS[0] : PLANS[1];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F4EF]">
      <BackgroundSymbols />
      <Header />
      <main className="relative z-10">
        <div className="container py-16">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Basit ve Şeffaf Ücretlendirme
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#042940]/50">
              7 gün ücretsiz deneyin. Memnun kalmazsanız ödeme yapmazsınız.
            </p>

            {/* Aylık / Yıllık Toggle */}
            <div className="mt-8 inline-flex items-center rounded-2xl bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "rounded-xl px-6 py-2.5 text-sm font-semibold transition-all",
                  billing === "monthly"
                    ? "bg-[#042940] text-white shadow-md"
                    : "text-[#042940]/50 hover:text-[#042940]"
                )}
              >
                Aylık
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={cn(
                  "rounded-xl px-6 py-2.5 text-sm font-semibold transition-all",
                  billing === "yearly"
                    ? "bg-[#042940] text-white shadow-md"
                    : "text-[#042940]/50 hover:text-[#042940]"
                )}
              >
                Yıllık
                <span className="ml-2 rounded-lg bg-[#DBF227] px-2 py-0.5 text-xs font-bold text-[#042940]">
                  %33 tasarruf
                </span>
              </button>
            </div>
          </motion.div>

          {/* Plan Kartları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mb-20 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
          >
            {[activePlan, inactivePlan]
              .sort((a, b) => (a.id === "monthly" ? -1 : 1))
              .map((plan) => {
                const Icon = plan.icon;
                const isActive =
                  (billing === "yearly" && plan.id === "yearly") ||
                  (billing === "monthly" && plan.id === "monthly");

                return (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative rounded-3xl border-2 p-8 transition-all duration-300",
                      isActive
                        ? "border-[#005C53] bg-white shadow-xl shadow-[#005C53]/10 scale-[1.02]"
                        : "border-transparent bg-white/60 shadow-sm"
                    )}
                  >
                    {plan.popular && billing === "yearly" && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#DBF227] px-4 py-1 text-xs font-bold text-[#042940]">
                        En Popüler
                      </div>
                    )}

                    <div className="mb-6">
                      <div className={cn("mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white", plan.color)}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-[#042940]">{plan.name}</h3>
                      <p className="mt-1 text-sm text-[#042940]/40">{plan.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        {plan.originalPrice && billing === "yearly" && (
                          <span className="text-lg text-[#042940]/30 line-through">
                            {plan.originalPrice} ₺
                          </span>
                        )}
                        <span className="text-5xl font-extrabold text-[#042940]">
                          {plan.price}
                        </span>
                        <span className="text-lg text-[#042940]/40">₺/{plan.period}</span>
                      </div>
                      {billing === "yearly" && plan.id === "yearly" && (
                        <p className="mt-1 text-sm text-[#005C53] font-medium">
                          Yıllık toplamda {plan.price * 12} ₺
                        </p>
                      )}
                    </div>

                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#005C53]" />
                          <span className="text-sm text-[#042940]/60">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      className={cn(
                        "w-full rounded-xl py-6 text-base font-bold",
                        isActive
                          ? "bg-[#005C53] text-white hover:bg-[#005C53]/90"
                          : "bg-[#042940]/5 text-[#042940] hover:bg-[#042940]/10"
                      )}
                    >
                      <Link href={`/register?plan=${plan.id}`}>
                        7 Gün Ücretsiz Dene
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
          </motion.div>

          {/* Kardeş Paketi */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mb-20 max-w-4xl"
          >
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#005C53]/10">
                  <Users className="h-6 w-6 text-[#005C53]" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#042940]">Kardeş Paketi</h2>
                  <p className="text-sm text-[#042940]/50">
                    Tek abonelikle tüm çocuklarınız öğrensin
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {SIBLING_DISCOUNTS.map((item, index) => (
                  <div
                    key={item.child}
                    className={cn(
                      "rounded-2xl border p-5 text-center transition-all",
                      index === 0
                        ? "border-[#042940]/10 bg-[#F5F4EF]"
                        : index === 1
                        ? "border-[#005C53]/20 bg-[#005C53]/5"
                        : "border-[#005C53]/30 bg-[#005C53]/10"
                    )}
                  >
                    <p className="text-sm font-semibold text-[#042940]/60">{item.child}</p>
                    <p className="mt-1 text-lg font-extrabold text-[#042940]">{item.price}</p>
                    <p className="mt-0.5 text-xs font-medium text-[#005C53]">{item.discount}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center text-sm text-[#042940]/40">
                Her çocuğun ilerlemesi, rozetleri ve liderlik tablosu sıralaması kendine özeldir.
              </p>
            </div>
          </motion.section>

          {/* Burs Paketi */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mx-auto mb-20 max-w-4xl"
          >
            <div className="rounded-3xl bg-gradient-to-br from-[#042940] to-[#005C53] p-8 shadow-lg md:p-10">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Heart className="h-6 w-6 text-[#DBF227]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Burs Paketi</h2>
                    <p className="text-sm text-white/50">
                      Her çocuk kaliteli eğitimi hak eder
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/10 px-5 py-2">
                  <span className="text-3xl font-extrabold text-[#DBF227]">Ücretsiz</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SCHOLARSHIP_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#DBF227]" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/40">
                  Başvurular 5 iş günü içinde değerlendirilir.
                </p>
                <Button className="rounded-xl bg-[#DBF227] px-8 py-6 text-base font-bold text-[#042940] hover:bg-[#DBF227]/90">
                  Burs Başvurusu Yap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.section>

          {/* SSS */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mx-auto mb-16 max-w-2xl"
          >
            <h2 className="mb-6 text-center text-2xl font-extrabold text-[#042940]">
              Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="pr-4 text-sm font-bold text-[#042940]">{item.q}</span>
                    <HelpCircle className={cn(
                      "h-4 w-4 shrink-0 text-[#042940]/30 transition-colors",
                      openFaq === index && "text-[#005C53]"
                    )} />
                  </button>
                  {openFaq === index && (
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#042940]/50">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Alt CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-[#042940]/40">
              Okulunuz için kurumsal fiyatlandırma mı arıyorsunuz?{" "}
              <Link
                href="mailto:iletisim@lumo.com.tr"
                className="font-medium text-[#005C53] hover:underline"
              >
                Bizimle iletişime geçin
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
