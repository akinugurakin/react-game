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
    q: "Lumo nedir?",
    a: "Lumo; ilkokul ve ortaokul çağındaki çocukların Türkçe, matematik, fen bilimleri, sosyal bilimler ve İngilizce derslerinde eğlenceli mini oyunlarla öğrenmesini destekleyen bir eğitim platformudur. Çocuklar oyunlarda başarı gösterdikçe rozetler kazanır, liderlik tablosunda sıralamalarını yükselterek arkadaşlarıyla yarışır.",
    category: "Genel",
  },
  {
    q: "Lumo hangi yaş grubuna uygundur?",
    a: "Lumo, ilkokul ve ortaokul (3-8. sınıf) öğrencileri için tasarlanmıştır. Temelini güçlendirmek isteyen lise öğrencileri de platformu kullanabilir.",
    category: "Genel",
  },
  {
    q: "Oyunlar kimler tarafından tasarlanıyor?",
    a: "Oyunlarımız, alanında uzman eğitimciler ve deneyimli oyun geliştiricilerinin iş birliğiyle hazırlanmaktadır. Her oyun pedagojik açıdan değerlendirilip onaylandıktan sonra platforma eklenir.",
    category: "Genel",
  },
  {
    q: "Hangi cihazlardan erişebilirim?",
    a: "Lumo'ya iOS ve Android tablet uygulamalarımızdan veya bilgisayar üzerinden web tarayıcısı aracılığıyla erişebilirsiniz.",
    category: "Genel",
  },
  // Ücretlendirme
  {
    q: "Ücretsiz deneme süresi var mı?",
    a: "Evet! Lumo'yu 7 gün boyunca ücretsiz deneyebilirsiniz. Deneme süresi boyunca tüm oyunlara ve özelliklere sınırsız erişim sağlayabilirsiniz. Deneme süresi sonunda onayınız olmadan otomatik ücretlendirme yapılmaz. Ayrıca her dersten birer ücretsiz oyunu dilediğiniz zaman oynayabilirsiniz.",
    category: "Ücretlendirme",
  },
  {
    q: "Kardeş paketi nedir?",
    a: "Tek abonelikle aynı evdeki birden fazla çocuk için ayrı profiller oluşturabilirsiniz. Her çocuğun ilerlemesi, rozetleri ve liderlik tablosu sıralaması kendine özeldir. İkinci çocuk için %50, üçüncü çocuk için %75 indirim uygulanır.",
    category: "Ücretlendirme",
  },
  // Eğitim & İçerik
  {
    q: "Çocuğumun gelişimini nasıl takip edebilirim?",
    a: "Ebeveyn panelinden çocuğunuzun hangi oyunları oynadığını, hangi konularda ilerlediğini ve geliştirilmesi gereken alanlarını takip edebilirsiniz. Aylık gelişim raporları ile çocuğunuzun öğrenme sürecini yakından izleyebilirsiniz.",
    category: "Eğitim & İçerik",
  },
  {
    q: "Oyunlar yeni müfredata ne kadar uyumlu?",
    a: "Oyunlarımız müfredatla yalnızca uyumlu değil, doğrudan müfredat kazanımları üzerine inşa edilmektedir. Her oyunun tasarım süreci, ilgili sınıf ve dersin MEB kazanımlarının belirlenmesiyle başlar. Bu sayede çocuğunuz oyun oynarken müfredatın hedeflediği becerileri doğrudan pekiştirir.",
    category: "Eğitim & İçerik",
  },
  {
    q: "Liderlik tablosu nedir?",
    a: "Liderlik tablosu, çocukların oyunlardaki skorlarına göre sıralandığı bir motivasyon aracıdır. Haftalık, aylık ve tüm zamanlar olmak üzere her oyun ve her ders için ayrı sıralamalar bulunur. Haftalık tablo her Pazartesi, aylık tablo her ayın başında sıfırlanır; böylece herkes yeniden şans yakalar.",
    category: "Eğitim & İçerik",
  },
  {
    q: "Rozet sistemi nasıl çalışır?",
    a: "Çocuklar oyunları tamamladıkça, belirli hedeflere ulaştıkça ve düzenli oynadıkça dijital rozetler kazanır. Matematik Profesörü, Harita Uzmanı, Sözcük Avcısı gibi rozetler profil sayfasında sergilenir ve çocukları düzenli oynamaya teşvik eder.",
    category: "Eğitim & İçerik",
  },
  // Kurumsal
  {
    q: "Öğretmenler için özel bir panel var mı?",
    a: "Evet! Öğretmenler sınıf genelindeki ilerlemeyi tek bir panelden takip edebilir ve öğrencilerine oyun atayabilir. Her öğrencinin istatistiklerine kolayca ulaşarak gelişim süreçlerini yakından gözlemleyebilir.",
    category: "Kurumsal",
  },
  {
    q: "Lumo'yu okulumuzda kullanmak istiyoruz, nasıl başlarız?",
    a: "Okullara özel kurumsal paketlerimiz mevcuttur. info@lumo.com.tr adresinden veya web sitemizdeki iletişim formundan bize ulaşarak okulunuza özel bir teklif alabilirsiniz.",
    category: "Kurumsal",
  },
  // Güvenlik & Gizlilik
  {
    q: "Çocuğumun verileri güvende mi?",
    a: "Çocuğunuzun güvenliği en büyük önceliğimizdir. Tüm veriler şifreli olarak saklanır ve KVKK mevzuatına tam uyum sağlanır. Çocuklara ait kişisel bilgileri üçüncü taraflarla paylaşmıyor, reklam amacıyla kullanmıyoruz. Platformda herhangi bir reklam bulunmaz.",
    category: "Güvenlik & Gizlilik",
  },
  {
    q: "Çocuklar diğer kullanıcılarla iletişim kurabilir mi?",
    a: "Hayır. Lumo'da çocuklar arası mesajlaşma, sohbet veya herhangi bir iletişim özelliği bulunmaz. Liderlik tablosunda yalnızca isim ve okul bilgileri görünür. Profil ayarlarından liderlik tablosundaki isim ve okul görünürlüğü kapatılabilir. Platform tamamen güvenli ve kapalı bir ortamda çalışır.",
    category: "Güvenlik & Gizlilik",
  },
];

const CATEGORIES = [
  { key: "Tümü", icon: HelpCircle },
  { key: "Genel", icon: Gamepad2 },
  { key: "Ücretlendirme", icon: CreditCard },
  { key: "Eğitim & İçerik", icon: GraduationCap },
  { key: "Kurumsal", icon: Users },
  { key: "Güvenlik & Gizlilik", icon: Shield },
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
