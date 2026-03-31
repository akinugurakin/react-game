"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Gamepad2,
  CreditCard,
  Shield,
  GraduationCap,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackgroundSymbols } from "@/components/ui/background-symbols";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  SSS VERİLERİ                                                       */
/* ------------------------------------------------------------------ */

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  // Genel
  {
    q: "LUMO nedir?",
    a: "LUMO, 1-8. sınıf öğrencileri için MEB müfredatına uygun, oyunlaştırılmış bir eğitim platformudur. Çocuklar oyun oynayarak Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler ve İngilizce derslerinde kendilerini geliştirir.",
    category: "Genel",
  },
  {
    q: "LUMO hangi yaş grubuna hitap ediyor?",
    a: "LUMO, ilkokul ve ortaokul (1-8. sınıf) öğrencileri için tasarlanmıştır. Oyunlar, her sınıf düzeyine uygun zorluk seviyelerinde sunulur.",
    category: "Genel",
  },
  {
    q: "Oyunlar hangi dersleri kapsıyor?",
    a: "Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler ve İngilizce derslerini kapsayan oyunlar sunuyoruz. Tüm içerikler MEB müfredatına uygundur.",
    category: "Genel",
  },
  {
    q: "LUMO'yu hangi cihazlarda kullanabilirim?",
    a: "LUMO web tarayıcısı üzerinden tüm cihazlarda (bilgisayar, tablet, telefon) kullanılabilir. Ayrıca iOS ve Android için mobil uygulamamız da yakında yayınlanacaktır.",
    category: "Genel",
  },
  // Ücretlendirme
  {
    q: "LUMO ücretsiz mi?",
    a: "LUMO'nun ücretsiz deneme sürümü mevcuttur. Tüm oyunlara ve özelliklere erişim için aylık veya yıllık abonelik planları sunuyoruz.",
    category: "Ücretlendirme",
  },
  {
    q: "Abonelik planları nelerdir?",
    a: "Aylık ve yıllık olmak üzere iki abonelik planımız bulunmaktadır. Yıllık planda önemli bir indirim sunuyoruz. Detaylı fiyat bilgisi için fiyatlandırma sayfamızı ziyaret edebilirsiniz.",
    category: "Ücretlendirme",
  },
  {
    q: "Aboneliğimi iptal edebilir miyim?",
    a: "Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal işlemi sonrasında mevcut dönem sonuna kadar erişiminiz devam eder.",
    category: "Ücretlendirme",
  },
  // Öğretmenler
  {
    q: "Öğretmenler platformu nasıl kullanabilir?",
    a: "Öğretmenler sınıf oluşturabilir, öğrencilerini ekleyebilir, ödev atayabilir ve detaylı ilerleme raporlarını takip edebilir. Öğretmen hesabı oluşturmak ücretsizdir.",
    category: "Öğretmenler",
  },
  {
    q: "Sınıfıma kaç öğrenci ekleyebilirim?",
    a: "Bir sınıfa en fazla 40 öğrenci ekleyebilirsiniz. Birden fazla sınıf oluşturabilir ve her birini ayrı ayrı yönetebilirsiniz.",
    category: "Öğretmenler",
  },
  {
    q: "Öğrenci ilerlemesini nasıl takip edebilirim?",
    a: "Öğretmen panelinden her öğrencinin oynadığı oyunları, skorlarını, doğru-yanlış oranlarını ve harcadığı süreyi detaylı olarak görebilirsiniz.",
    category: "Öğretmenler",
  },
  // Güvenlik
  {
    q: "Verilerimiz güvende mi?",
    a: "Evet. LUMO, KVKK (Kişisel Verilerin Korunması Kanunu) uyumlu çalışır. Çocuk verileri özel olarak korunur ve üçüncü taraflarla paylaşılmaz.",
    category: "Güvenlik",
  },
  {
    q: "Platformda reklam var mı?",
    a: "Hayır. LUMO tamamen reklamsız bir platformdur. Çocukların dikkatini dağıtacak hiçbir reklam içeriği bulunmaz.",
    category: "Güvenlik",
  },
  {
    q: "Çocuğumun ekran süresini kontrol edebilir miyim?",
    a: "Ebeveyn panelinden günlük ve haftalık ekran süresi limitleri belirleyebilirsiniz. Limit dolduğunda çocuğunuz otomatik olarak bilgilendirilir.",
    category: "Güvenlik",
  },
];

const CATEGORIES = [
  { key: "Tümü", icon: HelpCircle },
  { key: "Genel", icon: Gamepad2 },
  { key: "Ücretlendirme", icon: CreditCard },
  { key: "Öğretmenler", icon: GraduationCap },
  { key: "Güvenlik", icon: Shield },
];

/* ------------------------------------------------------------------ */
/*  ACCORDION ITEM                                                     */
/* ------------------------------------------------------------------ */

function FaqAccordion({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.04 }}
    >
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between p-5 text-left"
          >
            <h3 className="pr-4 text-sm font-bold text-[#042940]">{item.q}</h3>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-[#042940]/40 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#042940]/50">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function SSSPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filtered =
    activeCategory === "Tümü"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F4EF]">
      <BackgroundSymbols />
      <Header />
      <main className="relative z-10">
        <div className="container py-12">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#005C53]/10">
              <HelpCircle className="h-7 w-7 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940]">
              Sıkça Sorulan Sorular
            </h1>
            <p className="mt-3 text-lg text-[#042940]/50">
              LUMO hakkında merak ettiklerinize yanıt bulun
            </p>
          </motion.div>

          {/* Kategori Filtreleri */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                    activeCategory === cat.key
                      ? "bg-[#005C53] text-white shadow-md"
                      : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {cat.key}
                </button>
              );
            })}
          </motion.div>

          {/* SSS Listesi */}
          <div className="mx-auto max-w-2xl space-y-3">
            {filtered.map((item, index) => (
              <FaqAccordion key={item.q} item={item} index={index} />
            ))}
          </div>

          {/* Alt bilgi */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-10 text-center text-sm text-[#042940]/40"
          >
            Sorunuzun cevabını bulamadınız mı?{" "}
            <a
              href="mailto:iletisim@lumo.com.tr"
              className="font-medium text-[#005C53] hover:underline"
            >
              Bize yazın
            </a>
          </motion.p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
