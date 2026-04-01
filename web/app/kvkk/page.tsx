"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  KVKK BÖLÜMLERİ                                                    */
/* ------------------------------------------------------------------ */

interface KvkkSection {
  id: string;
  title: string;
  content: string[];
}

const LAST_UPDATED = "31 Mart 2026";

const SECTIONS: KvkkSection[] = [
  {
    id: "amac",
    title: "1. Amaç",
    content: [
      'Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") Madde 10 ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ kapsamında hazırlanmıştır.',
      'LUMO Eğitim Teknolojileri A.Ş. ("Şirket") olarak, 6-14 yaş arası çocuklara yönelik eğitsel oyun platformumuz üzerinden kişisel verilerinizin işlenmesine ilişkin sizi bilgilendirmek amacıyla bu metni düzenledik.',
    ],
  },
  {
    id: "veri-sorumlusu",
    title: "2. Veri Sorumlusu",
    content: [
      "Unvan: LUMO Eğitim Teknolojileri A.Ş.",
      "Adres: İstanbul, Türkiye",
      "E-posta: kvkk@lumo.com.tr",
      "Telefon: 0850 123 45 67",
      "VERBİS Sicil Numarası: [Kayıt sonrası eklenecektir]",
    ],
  },
  {
    id: "islenen-veriler",
    title: "3. İşlenen Kişisel Veriler",
    content: [
      "Kimlik bilgileri:",
      "• Ad, soyad (yalnızca ebeveyn/veli)",
      "• Kullanıcı adı (çocuk — takma ad olabilir)",
      "• Yaş / sınıf düzeyi",
      "",
      "İletişim bilgileri:",
      "• E-posta adresi (ebeveyn/veli)",
      "• Telefon numarası (ebeveyn/veli, doğrulama amaçlı)",
      "",
      "Eğitim ve kullanım verileri:",
      "• Oyun skorları ve ilerleme kayıtları",
      "• Oturum süreleri",
      "• Oyun tercihleri ve tamamlanan aktiviteler",
      "",
      "İşlem güvenliği verileri:",
      "• Oturum bilgileri (JWT token)",
      "• Giriş/çıkış kayıtları",
      "• Cihaz türü ve tarayıcı bilgisi (anonim)",
      "",
      "Finansal veriler:",
      "• Ödeme işlem kayıtları (Stripe üzerinden — kart bilgileri Şirket tarafından saklanmaz)",
    ],
  },
  {
    id: "isleme-amaclari",
    title: "4. Kişisel Verilerin İşlenme Amaçları",
    content: [
      "Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:",
      "",
      "• Eğitsel oyun hizmetinin sunulması ve platform erişiminin sağlanması",
      "• Kullanıcı hesabının oluşturulması ve yönetilmesi",
      "• Öğrenme ilerlemesinin takip edilmesi ve ebeveyne raporlanması",
      "• Liderlik tablosu ve rozet sisteminin çalıştırılması",
      "• Abonelik ve ödeme işlemlerinin gerçekleştirilmesi",
      "• Platform güvenliğinin sağlanması ve kötüye kullanımın önlenmesi",
      "• Yasal yükümlülüklerin yerine getirilmesi (vergi, muhasebe)",
      "• Hizmet kalitesinin artırılması (anonim istatistikler)",
    ],
  },
  {
    id: "hukuki-sebepler",
    title: "5. Hukuki Sebepler",
    content: [
      "Kişisel verileriniz aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:",
      "",
      "KVKK Madde 5/1 — Açık rıza:",
      "• Çocuk kullanıcıların tüm kişisel verileri, ebeveyn/veli açık rızası ile işlenir",
      "• Ebeveyn/veli iletişim bilgileri, pazarlama dışı iletişim için açık rıza ile işlenir",
      "",
      "KVKK Madde 5/2-c — Sözleşmenin ifası:",
      "• Abonelik sözleşmesinin kurulması ve sürdürülmesi için gerekli veriler",
      "• Ödeme işlemlerinin gerçekleştirilmesi",
      "",
      "KVKK Madde 5/2-ç — Hukuki yükümlülük:",
      "• Vergi ve muhasebe mevzuatı gereği saklanan finansal kayıtlar",
      "• Yetkili makam taleplerine yanıt verilmesi",
      "",
      "KVKK Madde 5/2-f — Meşru menfaat:",
      "• Platform güvenliğinin sağlanması",
      "• Hizmet kalitesinin anonim istatistiklerle iyileştirilmesi",
    ],
  },
  {
    id: "aktarim",
    title: "6. Kişisel Verilerin Aktarılması",
    content: [
      "Kişisel verileriniz aşağıdaki taraflara, belirtilen amaçlarla aktarılabilir:",
      "",
      "Yurt içi aktarım:",
      "• Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarına",
      "",
      "Yurt dışı aktarım (KVKK Madde 9):",
      "• Stripe Inc. (ABD) — ödeme işlemlerinin gerçekleştirilmesi (yalnızca ebeveyn ödeme verileri)",
      "• Vercel Inc. (ABD) — web uygulamasının barındırılması",
      "• Supabase Inc. (ABD) — veritabanı hizmetinin sağlanması",
      "",
      "Yurt dışı aktarımlar, KVKK Madde 9 kapsamında açık rıza alınarak ve/veya yeterli koruma bulunan ülkelere yapılmaktadır. Aktarım yapılan taraflarla veri işleme sözleşmeleri imzalanmıştır.",
      "",
      "Çocuk kullanıcılara ait veriler hiçbir koşulda reklam, pazarlama veya profil oluşturma amaçlı üçüncü taraflara aktarılmaz.",
    ],
  },
  {
    id: "toplama-yontemi",
    title: "7. Veri Toplama Yöntemi",
    content: [
      "Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:",
      "",
      "• Platform üzerindeki kayıt formları (otomatik olmayan yol)",
      "• Ebeveyn onay formu (otomatik olmayan yol)",
      "• Platform kullanımı sırasında otomatik olarak oluşan veriler (otomatik yol)",
      "• Çerezler aracılığıyla (yalnızca zorunlu oturum çerezleri — otomatik yol)",
    ],
  },
  {
    id: "saklama-sureleri",
    title: "8. Veri Saklama Süreleri",
    content: [
      "Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır:",
      "",
      "• Çocuk hesap ve ilerleme verileri: Hesap aktif olduğu sürece, hesap kapatıldığında 30 gün içinde silinir",
      "• Ebeveyn kimlik ve iletişim bilgileri: Hesap aktif olduğu sürece + hesap kapatma sonrası 6 ay",
      "• Ödeme ve fatura kayıtları: 10 yıl (6102 sayılı TTK ve 213 sayılı VUK gereği)",
      "• Oturum ve giriş kayıtları: 30 gün",
      "• Çerez verileri: Oturum süresi ile sınırlı",
      "",
      "Saklama süresi dolan veriler, periyodik imha süreçleri kapsamında (6 aylık periyotlarla) silinir, yok edilir veya anonim hale getirilir.",
    ],
  },
  {
    id: "ilgili-kisi-haklari",
    title: "9. İlgili Kişi Hakları (KVKK Madde 11)",
    content: [
      "KVKK Madde 11 uyarınca aşağıdaki haklara sahipsiniz:",
      "",
      "a) Kişisel veri işlenip işlenmediğini öğrenme",
      "b) Kişisel verileri işlenmişse buna ilişkin bilgi talep etme",
      "c) Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme",
      "d) Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme",
      "e) Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme",
      "f) KVKK Madde 7 kapsamında kişisel verilerin silinmesini veya yok edilmesini isteme",
      "g) (e) ve (f) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme",
      "h) İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme",
      "ı) Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme",
    ],
  },
  {
    id: "basvuru",
    title: "10. Başvuru Yöntemi",
    content: [
      "Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerden biriyle başvurabilirsiniz:",
      "",
      "1. E-posta ile başvuru:",
      "kvkk@lumo.com.tr adresine, kimliğinizi tespit edici bilgiler ve talebinizi içeren bir e-posta gönderebilirsiniz.",
      "",
      "2. Platform üzerinden başvuru:",
      "Ebeveyn kontrol panelindeki \"Veri Taleplerim\" bölümünden başvuru oluşturabilirsiniz.",
      "",
      "3. Yazılı başvuru:",
      "Islak imzalı dilekçenizi şirket adresimize posta yoluyla gönderebilirsiniz.",
      "",
      "Başvurularınız, talebinizin niteliğine göre en kısa sürede ve en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi halinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.",
      "",
      "Kişisel Verileri Koruma Kurumu'na şikayet hakkınız saklıdır:",
      "Web: www.kvkk.gov.tr",
      "Telefon: 0312 216 50 50",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  İÇİNDEKİLER                                                       */
/* ------------------------------------------------------------------ */

function TableOfContents() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#042940]/70">
          İçindekiler
        </h2>
        <nav className="space-y-1.5">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-[#042940]/60 transition-colors hover:bg-[#005C53]/5 hover:text-[#005C53]"
            >
              <ChevronRight className="h-3 w-3 shrink-0" />
              {section.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function KvkkPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-[#042940]/[0.02]">
        {/* Hero */}
        <section className="container py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#005C53]/10">
              <FileText className="h-8 w-8 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              KVKK Aydınlatma Metni
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
              kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.
            </p>
            <p className="mt-3 text-sm text-[#042940]/30">
              Son güncelleme: {LAST_UPDATED}
            </p>
          </motion.div>
        </section>

        {/* İçerik */}
        <section className="container pb-16">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </motion.div>

            {/* Ana İçerik */}
            <div className="space-y-8">
              {SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.03 }}
                >
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 sm:p-8">
                      <h2 className="mb-4 text-lg font-bold text-[#042940]">
                        {section.title}
                      </h2>
                      <div className="space-y-2">
                        {section.content.map((line, i) => {
                          if (line === "") {
                            return <div key={i} className="h-3" />;
                          }
                          if (line.startsWith("•") || /^[a-ıA-Z]\)/.test(line)) {
                            return (
                              <p
                                key={i}
                                className="pl-4 text-sm leading-relaxed text-[#042940]/60"
                              >
                                {line}
                              </p>
                            );
                          }
                          return (
                            <p
                              key={i}
                              className="text-sm leading-relaxed text-[#042940]/60"
                            >
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* İlgili Sayfalar */}
        <section className="container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/gizlilik-politikasi"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/kullanim-kosullari"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Kullanım Koşulları
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
